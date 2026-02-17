/**
 * DigitalBlob 로고 SVG path 기하학적 구조 분석 스크립트
 *
 * 두 filled path (logoGrad1, logoGrad2)의 좌표를 파싱하여
 * 원본 좌표 → viewBox 좌표로 변환하고, 로고의 선 구조(centerline)를 추출한다.
 *
 * 변환 공식: vx = ox * 4/3, vy = 1333.3333 - oy * 4/3
 */

import { readFileSync } from 'fs';

// ── 1. 파일에서 path d 속성 추출 ──
const src = readFileSync(
  '/Users/jojaeho/vibe_project/260215_digitalblob/src/components/shared/digitalblob-logo.tsx',
  'utf-8'
);

const pathDRegex = /\bd="((?:[^"\\]|\\.)*)"/g;
const allPaths = [];
let m;
while ((m = pathDRegex.exec(src)) !== null) {
  const val = m[1].trim();
  if (/^[mM]/.test(val)) {
    allPaths.push(val);
  }
}

// 가장 긴 두 path가 아이콘
const sorted = allPaths.map((p, i) => ({ idx: i, len: p.length, d: p })).sort((a, b) => b.len - a.len);
const path1D = sorted[0].d; // logoGrad1
const path2D = sorted[1].d; // logoGrad2

// ── 2. SVG path 명령어 파싱 ──
function tokenize(d) {
  const tokens = [];
  const re = /([a-zA-Z])|([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/g;
  let match;
  while ((match = re.exec(d)) !== null) {
    if (match[1]) {
      tokens.push({ type: 'cmd', value: match[1] });
    } else {
      tokens.push({ type: 'num', value: parseFloat(match[2]) });
    }
  }
  return tokens;
}

function parseNumbers(tokens, startIdx, count) {
  const nums = [];
  let idx = startIdx;
  while (nums.length < count && idx < tokens.length) {
    if (tokens[idx].type === 'num') {
      nums.push(tokens[idx].value);
    } else break;
    idx++;
  }
  return { nums, nextIdx: idx };
}

function parsePath(d) {
  const tokens = tokenize(d);
  const points = [];
  let cx = 0, cy = 0;
  let sx = 0, sy = 0;
  let i = 0;

  while (i < tokens.length) {
    if (tokens[i].type !== 'cmd') { i++; continue; }
    const cmd = tokens[i].value;
    i++;

    switch (cmd) {
      case 'M': {
        while (i < tokens.length && tokens[i].type === 'num') {
          const { nums, nextIdx } = parseNumbers(tokens, i, 2);
          if (nums.length < 2) break;
          cx = nums[0]; cy = nums[1];
          sx = cx; sy = cy;
          points.push({ x: cx, y: cy, cmd: 'M' });
          i = nextIdx;
        }
        break;
      }
      case 'm': {
        while (i < tokens.length && tokens[i].type === 'num') {
          const { nums, nextIdx } = parseNumbers(tokens, i, 2);
          if (nums.length < 2) break;
          cx += nums[0]; cy += nums[1];
          sx = cx; sy = cy;
          points.push({ x: cx, y: cy, cmd: 'm' });
          i = nextIdx;
        }
        break;
      }
      case 'L': {
        while (i < tokens.length && tokens[i].type === 'num') {
          const { nums, nextIdx } = parseNumbers(tokens, i, 2);
          if (nums.length < 2) break;
          cx = nums[0]; cy = nums[1];
          points.push({ x: cx, y: cy, cmd: 'L' });
          i = nextIdx;
        }
        break;
      }
      case 'l': {
        while (i < tokens.length && tokens[i].type === 'num') {
          const { nums, nextIdx } = parseNumbers(tokens, i, 2);
          if (nums.length < 2) break;
          cx += nums[0]; cy += nums[1];
          points.push({ x: cx, y: cy, cmd: 'l' });
          i = nextIdx;
        }
        break;
      }
      case 'H': {
        while (i < tokens.length && tokens[i].type === 'num') {
          cx = tokens[i].value;
          points.push({ x: cx, y: cy, cmd: 'H' });
          i++;
        }
        break;
      }
      case 'h': {
        while (i < tokens.length && tokens[i].type === 'num') {
          cx += tokens[i].value;
          points.push({ x: cx, y: cy, cmd: 'h' });
          i++;
        }
        break;
      }
      case 'V': {
        while (i < tokens.length && tokens[i].type === 'num') {
          cy = tokens[i].value;
          points.push({ x: cx, y: cy, cmd: 'V' });
          i++;
        }
        break;
      }
      case 'v': {
        while (i < tokens.length && tokens[i].type === 'num') {
          cy += tokens[i].value;
          points.push({ x: cx, y: cy, cmd: 'v' });
          i++;
        }
        break;
      }
      case 'C': {
        while (i < tokens.length && tokens[i].type === 'num') {
          const { nums, nextIdx } = parseNumbers(tokens, i, 6);
          if (nums.length < 6) break;
          cx = nums[4]; cy = nums[5];
          points.push({ x: cx, y: cy, cmd: 'C', cp1: { x: nums[0], y: nums[1] }, cp2: { x: nums[2], y: nums[3] } });
          i = nextIdx;
        }
        break;
      }
      case 'c': {
        while (i < tokens.length && tokens[i].type === 'num') {
          const { nums, nextIdx } = parseNumbers(tokens, i, 6);
          if (nums.length < 6) break;
          const endX = cx + nums[4];
          const endY = cy + nums[5];
          points.push({
            x: endX, y: endY, cmd: 'c',
            cp1: { x: cx + nums[0], y: cy + nums[1] },
            cp2: { x: cx + nums[2], y: cy + nums[3] }
          });
          cx = endX; cy = endY;
          i = nextIdx;
        }
        break;
      }
      case 'Z': case 'z': {
        cx = sx; cy = sy;
        points.push({ x: cx, y: cy, cmd: 'Z' });
        break;
      }
      default: {
        while (i < tokens.length && tokens[i].type === 'num') i++;
        break;
      }
    }
  }
  return points;
}

// ── 3. 좌표 변환 ──
function toVB(ox, oy) {
  return {
    vx: Math.round(ox * 4 / 3 * 100) / 100,
    vy: Math.round((1333.3333 - oy * 4 / 3) * 100) / 100
  };
}

function r(v) { return Math.round(v * 100) / 100; }

// ── 4. 파싱 실행 ──
const pts1 = parsePath(path1D);
const pts2 = parsePath(path2D);

// ── 5. 의미 있는 점만 필터 (거리 > threshold 또는 M/Z) ──
function filterSig(points, threshold = 1.0) {
  if (points.length === 0) return [];
  const result = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const prev = result[result.length - 1];
    const dx = Math.abs(points[i].x - prev.x);
    const dy = Math.abs(points[i].y - prev.y);
    if (dx > threshold || dy > threshold || points[i].cmd === 'M' || points[i].cmd === 'm' || points[i].cmd === 'Z') {
      result.push(points[i]);
    }
  }
  return result;
}

const sig1 = filterSig(pts1, 1.0);
const sig2 = filterSig(pts2, 1.0);

// ── 6. 원(dot) 감지 - 연속 곡선에서 원형 패턴 찾기 ──
// 원은 반지름 ~9.84의 4개 c 곡선으로 구성됨
// Path 1 끝부분: 4개 c 곡선이 원을 형성 (orig ~(105.548, 578.846) 중심)
// Path 2 중간부분: 4개 c 곡선이 원을 형성 (orig ~(170.989, 433.455) 중심)

function findCircleInPoints(sigPoints) {
  const circles = [];
  // 연속된 3-4개 c 곡선이 비슷한 거리로 이동하며 시작점 근처로 돌아오는 패턴
  for (let i = 0; i < sigPoints.length - 3; i++) {
    const p0 = sigPoints[i];
    const p1 = sigPoints[i + 1];
    const p2 = sigPoints[i + 2];
    const p3 = sigPoints[i + 3];

    // 모두 곡선인지 확인
    if (!['c', 'C'].includes(p1.cmd) || !['c', 'C'].includes(p2.cmd) || !['c', 'C'].includes(p3.cmd)) continue;

    // p3와 p0가 가까운지 (원이 닫힘)
    let p4 = null;
    if (i + 4 < sigPoints.length && ['c', 'C'].includes(sigPoints[i + 4].cmd)) {
      p4 = sigPoints[i + 4];
    }

    const closingPt = p4 || p3;
    const dist03 = Math.sqrt((closingPt.x - p0.x) ** 2 + (closingPt.y - p0.y) ** 2);

    // 각 이동 거리
    const d1 = Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2);
    const d2 = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    const d3 = Math.sqrt((p3.x - p2.x) ** 2 + (p3.y - p2.y) ** 2);

    // 이동 거리가 비슷하고 (원호 특성), 닫히는 경우
    const avgDist = (d1 + d2 + d3) / 3;
    if (avgDist > 5 && avgDist < 25 && dist03 < avgDist * 1.5) {
      // 범위 계산
      const allPts = [p0, p1, p2, p3];
      if (p4) allPts.push(p4);
      const xs = allPts.map(p => p.x);
      const ys = allPts.map(p => p.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const w = maxX - minX, h = maxY - minY;

      // 가로세로 비율이 원에 가까운지
      if (Math.abs(w - h) < Math.max(w, h) * 0.3 && w > 5) {
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        const radius = (w + h) / 4;
        const vb = toVB(cx, cy);
        circles.push({
          centerOrig: { x: r(cx), y: r(cy) },
          centerVB: { x: vb.vx, y: vb.vy },
          radiusOrig: r(radius),
          radiusVB: r(radius * 4 / 3),
          sigIdx: i,
          curveCount: p4 ? 4 : 3
        });
      }
    }
  }
  return circles;
}

const circles1 = findCircleInPoints(sig1);
const circles2 = findCircleInPoints(sig2);

console.log('========================================');
console.log('  DigitalBlob 로고 기하학적 구조 분석');
console.log('========================================');
console.log();

// ── 7. 원(dot) 위치 출력 ──
console.log('=== 원(dot/circle) 위치 ===');
console.log();

const allCircles = [
  ...circles1.map(c => ({ ...c, path: 'path1' })),
  ...circles2.map(c => ({ ...c, path: 'path2' }))
];

allCircles.forEach((c, i) => {
  console.log(`DOT ${i + 1} (${c.path}):`);
  console.log(`  중심 orig = (${c.centerOrig.x}, ${c.centerOrig.y})`);
  console.log(`  중심 viewBox = (${c.centerVB.x}, ${c.centerVB.y})`);
  console.log(`  반지름 orig = ${c.radiusOrig}, viewBox = ${c.radiusVB}`);
  console.log();
});

// ── 8. 가지선(branch) 분석 - 원과 연결되는 선 ──
console.log('=== 가지선(branch) - 원으로 이어지는 선 ===');
console.log();

// Path 1의 원: 마지막 부분에 있음
// sig1 끝부분을 보면: [50] l → (99.914, 570.787) 이후 4개 곡선이 원
// 즉 (99.914, 570.787)에서 원이 시작되고, 그 선의 시작은 (64.331, 550.242)
if (circles1.length > 0) {
  const c = circles1[0];
  const branchEnd = sig1[c.sigIdx]; // 원 시작 직전
  const branchStart = sig1[c.sigIdx - 1]; // 그 전 점 (가지선 시작)
  if (branchStart && branchEnd) {
    const bsVB = toVB(branchStart.x, branchStart.y);
    const beVB = toVB(branchEnd.x, branchEnd.y);
    console.log(`Path1 가지선 (DOT 1로 가는 선):`);
    console.log(`  시작: orig=(${r(branchStart.x)}, ${r(branchStart.y)}) viewBox=(${bsVB.vx}, ${bsVB.vy})`);
    console.log(`  끝(원 시작점): orig=(${r(branchEnd.x)}, ${r(branchEnd.y)}) viewBox=(${beVB.vx}, ${beVB.vy})`);
    console.log();
  }
}

if (circles2.length > 0) {
  const c = circles2[0];
  const branchEnd = sig2[c.sigIdx]; // 원 시작 직전
  const branchStart = sig2[c.sigIdx - 1]; // 그 전 점
  if (branchStart && branchEnd) {
    const bsVB = toVB(branchStart.x, branchStart.y);
    const beVB = toVB(branchEnd.x, branchEnd.y);
    console.log(`Path2 가지선 (DOT 2로 가는 선):`);
    console.log(`  시작: orig=(${r(branchStart.x)}, ${r(branchStart.y)}) viewBox=(${bsVB.vx}, ${bsVB.vy})`);
    console.log(`  끝(원 시작점): orig=(${r(branchEnd.x)}, ${r(branchEnd.y)}) viewBox=(${beVB.vx}, ${beVB.vy})`);
    console.log();
  }
}

// ── 9. 모든 큰 직선 이동 기반으로 edge 목록 추출 ──
console.log('=== 주요 엣지(선분) 목록 ===');
console.log();

function extractEdges(sigPoints, label) {
  const edges = [];
  for (let i = 1; i < sigPoints.length; i++) {
    const prev = sigPoints[i - 1];
    const curr = sigPoints[i];
    if (curr.cmd === 'Z') continue;

    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // 의미 있는 이동만 (거리 > 10)
    if (dist > 10) {
      const fromVB = toVB(prev.x, prev.y);
      const toVB2 = toVB(curr.x, curr.y);
      const isCurve = ['c', 'C'].includes(curr.cmd);

      edges.push({
        from: { ox: r(prev.x), oy: r(prev.y), vx: fromVB.vx, vy: fromVB.vy },
        to: { ox: r(curr.x), oy: r(curr.y), vx: toVB2.vx, vy: toVB2.vy },
        dist: r(dist),
        type: isCurve ? 'curve' : 'line',
        cmd: curr.cmd,
        sigIdx: i
      });
    }
  }
  return edges;
}

const edges1 = extractEdges(sig1, 'path1');
const edges2 = extractEdges(sig2, 'path2');

console.log('--- Path 1 (logoGrad1) 엣지 ---');
edges1.forEach((e, i) => {
  console.log(`  E1-${i}: [${e.type}] dist=${e.dist} orig(${e.from.ox},${e.from.oy})→(${e.to.ox},${e.to.oy}) vb(${e.from.vx},${e.from.vy})→(${e.to.vx},${e.to.vy})`);
});

console.log();
console.log('--- Path 2 (logoGrad2) 엣지 ---');
edges2.forEach((e, i) => {
  console.log(`  E2-${i}: [${e.type}] dist=${e.dist} orig(${e.from.ox},${e.from.oy})→(${e.to.ox},${e.to.oy}) vb(${e.from.vx},${e.from.vy})→(${e.to.vx},${e.to.vy})`);
});

// ── 10. 로고 구조 해석 ──
console.log('\n========================================');
console.log('  로고 선 구조(centerline) 종합 해석');
console.log('========================================\n');

// 두 path를 합쳐서 고유한 "노드" 좌표를 찾기 (가까운 점 병합)
function mergeNearbyPoints(allEdges, threshold = 3) {
  const allPts = [];
  allEdges.forEach(e => {
    allPts.push({ ox: e.from.ox, oy: e.from.oy, vx: e.from.vx, vy: e.from.vy });
    allPts.push({ ox: e.to.ox, oy: e.to.oy, vx: e.to.vx, vy: e.to.vy });
  });

  // 클러스터링
  const clusters = [];
  const assigned = new Set();
  for (let i = 0; i < allPts.length; i++) {
    if (assigned.has(i)) continue;
    const cluster = [allPts[i]];
    assigned.add(i);
    for (let j = i + 1; j < allPts.length; j++) {
      if (assigned.has(j)) continue;
      const dist = Math.sqrt((allPts[i].ox - allPts[j].ox) ** 2 + (allPts[i].oy - allPts[j].oy) ** 2);
      if (dist < threshold) {
        cluster.push(allPts[j]);
        assigned.add(j);
      }
    }
    const avgOx = cluster.reduce((s, p) => s + p.ox, 0) / cluster.length;
    const avgOy = cluster.reduce((s, p) => s + p.oy, 0) / cluster.length;
    const vb = toVB(avgOx, avgOy);
    clusters.push({
      ox: r(avgOx), oy: r(avgOy),
      vx: vb.vx, vy: vb.vy,
      count: cluster.length
    });
  }
  return clusters;
}

const allEdges = [...edges1, ...edges2];
const nodes = mergeNearbyPoints(allEdges);

console.log(`총 고유 노드(꼭짓점) 수: ${nodes.length}\n`);
console.log('모든 노드 좌표:');
nodes.forEach((n, i) => {
  console.log(`  N${i}: orig=(${n.ox}, ${n.oy}) viewBox=(${n.vx}, ${n.vy}) [연결수=${n.count}]`);
});

// ── 11. 노드에 라벨 부여 ──
console.log('\n=== 노드 역할 식별 ===\n');

// 육각형 꼭짓점 (가장 외곽 점들)
// 원의 중심
const dotCenters = allCircles.map(c => c.centerOrig);

nodes.forEach((n, i) => {
  let role = '';

  // 원의 중심 근처인지
  for (const dc of dotCenters) {
    if (Math.sqrt((n.ox - dc.x) ** 2 + (n.oy - dc.y) ** 2) < 15) {
      role = '(DOT 근처)';
    }
  }

  // 가장 왼쪽 점 (육각형 좌측 꼭짓점)
  if (n.ox < 60) role = '(육각형 좌측)';
  // 가장 오른쪽 점
  if (n.ox > 215) role = '(육각형 우측)';
  // 가장 위 (y가 큰 값 = 원본 좌표계에서 위)
  if (n.oy > 595) role = '(육각형 상단)';
  // 가장 아래
  if (n.oy < 415) role = '(육각형 하단)';
  // 중심 근처
  if (Math.abs(n.ox - 139.5) < 3 && Math.abs(n.oy - 506.8) < 5) role = '(중앙)';

  if (role) {
    console.log(`  N${i}: orig=(${n.ox}, ${n.oy}) viewBox=(${n.vx}, ${n.vy}) ${role}`);
  }
});

// ── 12. 구조적 엣지 분류 ──
console.log('\n=== 엣지 분류 ===\n');

function classifyEdge(e) {
  const { from, to } = e;
  // 수직선
  if (Math.abs(from.ox - to.ox) < 1) return '수직선';
  // 대각선 (약 30도 기울기 - 육각형 변)
  const angle = Math.atan2(Math.abs(to.oy - from.oy), Math.abs(to.ox - from.ox)) * 180 / Math.PI;
  if (angle > 25 && angle < 35) return '육각형 변(30도)';
  if (angle > 55 && angle < 65) return '내부 대각선(60도)';
  return `기타(${r(angle)}도)`;
}

console.log('Path 1 엣지 분류:');
edges1.forEach((e, i) => {
  const cls = classifyEdge(e);
  console.log(`  E1-${i}: ${cls} | dist=${e.dist} | vb(${e.from.vx},${e.from.vy})→(${e.to.vx},${e.to.vy})`);
});

console.log('\nPath 2 엣지 분류:');
edges2.forEach((e, i) => {
  const cls = classifyEdge(e);
  console.log(`  E2-${i}: ${cls} | dist=${e.dist} | vb(${e.from.vx},${e.from.vy})→(${e.to.vx},${e.to.vy})`);
});

// ── 13. B자 범프(bump) 분석 ──
console.log('\n=== B자 범프(bump) 분석 ===\n');

// B 모양의 범프: 오른쪽으로 볼록하게 나온 부분
// Path 2에서 오른쪽 꼭짓점들
// 범프 상단: (214.79, 550.242) → (214.79, 529.221) → (181.845, 510.2) [상단 범프 윗변]
// 범프 중간: (181.845, 503.417) → (214.79, 484.395) → (214.79, 463.374) [하단 범프 윗변]
// 범프 허리: (191.636, 506.808) = 중간 꺾임점

console.log('B자 범프 구조 (Path 2의 오른쪽 볼록 부분):');
console.log();
console.log('  상단 범프 (위):');
console.log('    우측 상단: orig=(214.79, 550.242) viewBox=(286.39, 599.68)');
console.log('    우측 하단: orig=(214.79, 529.221) viewBox=(286.39, 627.71)');
console.log('    좌측(허리): orig=(181.845, 510.2)  viewBox=(242.46, 653.07)');
console.log();
console.log('  하단 범프 (아래):');
console.log('    좌측(허리): orig=(181.845, 503.417) viewBox=(242.46, 662.11)');
console.log('    우측 상단: orig=(214.79, 484.395)  viewBox=(286.39, 687.47)');
console.log('    우측 하단: orig=(214.79, 463.374)  viewBox=(286.39, 715.50)');
console.log();
console.log('  범프 중심선(꺾임점):');
console.log('    좌: orig=(191.636, 506.808) viewBox=(255.51, 657.59)');
console.log('    우: orig=(220.665, 506.808) viewBox=(294.22, 657.59)  [상/하단 범프 사이]');
console.log('    (실제로 좌측에서 우측으로 → 다시 좌측으로 꺾이는 구조)');

// ── 14. 최종 엣지 리스트 (centerline) ──
console.log('\n========================================');
console.log('  최종 centerline 엣지 리스트');
console.log('========================================\n');

// 두 path가 함께 형성하는 filled shape의 중심선을 추출
// 이 로고는 "thick stroke"가 아니라 두 개의 독립된 filled shape이므로
// 각 path의 주요 경로가 곧 centerline

// 모든 큰 이동 엣지를 viewBox 좌표로 정리
const finalEdges = [];
let edgeId = 0;

function addEdge(from, to, type, source, hasDotStart = false, hasDotEnd = false) {
  finalEdges.push({
    id: edgeId++,
    from: { vx: from.vx, vy: from.vy },
    to: { vx: to.vx, vy: to.vy },
    type,
    source,
    hasDotStart,
    hasDotEnd
  });
}

// Path 1 주요 엣지 (선분 기반)
// 육각형 좌측 수직변
addEdge(toVB(56.498, 552.503), toVB(56.498, 461.113), '육각형 좌측 수직변', 'P1');
// 육각형 하좌 대각변
addEdge(toVB(58.457, 457.721), toVB(137.601, 412.027), '육각형 좌하 대각변', 'P1');
// 내부 수직선 (좌측 기둥)
addEdge(toVB(154.666, 421.931), toVB(154.666, 493.643), '내부 좌 기둥 하단', 'P1');
// 하단 범프 왼쪽으로 가는 대각선
addEdge(toVB(154.666, 493.643), toVB(199.125, 477.018), '하단 B범프 왼쪽 대각(상)→꺾임', 'P1');
// 하단 범프 오른쪽에서 돌아오는 대각선
addEdge(toVB(199.125, 477.018), toVB(154.666, 502.687), '하단 B범프 복귀 대각선', 'P1');
// 내부 수직선 (중간)
addEdge(toVB(154.666, 502.687), toVB(154.666, 560.053), '내부 좌 기둥 상단', 'P1');
// 상단 범프 왼쪽으로 가는 대각선
addEdge(toVB(154.666, 560.053), toVB(199.125, 543.429), '상단 B범프 왼쪽 대각(상)→꺾임', 'P1');
// 상단 범프 오른쪽에서 돌아오는 대각선
addEdge(toVB(199.125, 543.429), toVB(152.707, 570.227), '상단 B범프 복귀 대각선(→상단)', 'P1');
// 중앙 수직 기둥
addEdge(toVB(146.833, 566.836), toVB(146.833, 424.139), '중앙 수직 기둥', 'P1');
// 좌하 대각선
addEdge(toVB(139.56, 419.94), toVB(64.331, 463.374), '육각형 좌하 대각선(내부)', 'P1');
// 좌측 수직선
addEdge(toVB(64.331, 463.374), toVB(64.331, 550.242), '육각형 좌측 수직(내부)', 'P1');
// 가지선 → DOT 1
addEdge(toVB(64.331, 550.242), toVB(99.914, 570.787), '가지선→DOT1', 'P1', false, false);

// Path 2 주요 엣지
// 내부 수직선
addEdge(toVB(124.455, 591.701), toVB(124.455, 455.801), '내부 좌 기둥(P2)', 'P2');
// 좌하 대각선
addEdge(toVB(124.455, 455.801), toVB(85.87, 478.078), '좌하 대각(P2)', 'P2');
// 좌 수직선
addEdge(toVB(85.87, 478.078), toVB(85.87, 533.775), '좌 수직(P2)', 'P2');
// 대각선
addEdge(toVB(85.87, 533.775), toVB(113.637, 549.888), '대각(P2 상)', 'P2');
// 복귀
addEdge(toVB(109.718, 556.67), toVB(79.996, 539.421), '복귀 대각(P2)', 'P2');
// 좌 수직
addEdge(toVB(78.038, 535.972), toVB(78.038, 475.817), '좌 수직(P2 외곽)', 'P2');
// 좌하 대각
addEdge(toVB(79.996, 472.425), toVB(126.411, 445.627), '좌하 대각(P2 외곽)', 'P2');
// 중앙 기둥
addEdge(toVB(132.287, 449.018), toVB(132.287, 589.477), '중앙 기둥(P2)', 'P2');
// 우상 대각 (육각형 우상 변)
addEdge(toVB(139.56, 593.675), toVB(214.79, 550.242), '육각형 우상 대각변', 'P2');
// 우측 상단 수직
addEdge(toVB(214.79, 550.242), toVB(214.79, 529.221), 'B범프 상단 우측 수직', 'P2');
// B범프 상단 좌
addEdge(toVB(214.79, 529.221), toVB(181.845, 510.2), 'B범프 상단 좌 대각', 'P2');
// B범프 하단 좌
addEdge(toVB(181.845, 503.417), toVB(214.79, 484.395), 'B범프 하단 우 대각', 'P2');
// 우측 하단 수직
addEdge(toVB(214.79, 484.395), toVB(214.79, 463.374), 'B범프 하단 우측 수직', 'P2');
// 우하 대각 → DOT 2
addEdge(toVB(214.79, 463.374), toVB(176.755, 441.414), '가지선→DOT2', 'P2', false, false);
// DOT 2 뒤의 대각선
addEdge(toVB(180.749, 434.676), toVB(220.665, 457.721), '우하 대각(DOT2 이후)', 'P2');
// 우측 수직
addEdge(toVB(222.623, 461.113), toVB(222.623, 486.657), '육각형 우측 수직(하)', 'P2');
// 범프 허리 좌
addEdge(toVB(220.665, 490.048), toVB(191.636, 506.808), 'B범프 허리 좌 대각', 'P2');
// 범프 허리 우
addEdge(toVB(191.636, 506.808), toVB(220.665, 523.569), 'B범프 허리 우 대각', 'P2');
// 우측 수직
addEdge(toVB(222.623, 526.96), toVB(222.623, 552.503), '육각형 우측 수직(상)', 'P2');
// 우상 대각
addEdge(toVB(220.665, 555.895), toVB(141.52, 601.589), '육각형 우상 대각변(닫기)', 'P2');

console.log('총 엣지 수:', finalEdges.length);
console.log();

finalEdges.forEach(e => {
  console.log(`  [${e.id}] "${e.type}" (${e.source})`);
  console.log(`       from viewBox=(${e.from.vx}, ${e.from.vy})`);
  console.log(`       to   viewBox=(${e.to.vx}, ${e.to.vy})`);
});

// ── 15. DOT(원) 정보 최종 정리 ──
console.log('\n=== DOT(원) 최종 정보 ===\n');

if (allCircles.length > 0) {
  allCircles.forEach((c, i) => {
    console.log(`DOT ${i + 1}:`);
    console.log(`  위치: ${c.path}`);
    console.log(`  중심 orig = (${c.centerOrig.x}, ${c.centerOrig.y})`);
    console.log(`  중심 viewBox = (${c.centerVB.x}, ${c.centerVB.y})`);
    console.log(`  반지름 orig = ${c.radiusOrig}`);
    console.log(`  반지름 viewBox = ${c.radiusVB}`);
  });
} else {
  // 직접 식별 (파싱 데이터 기반)
  console.log('자동 감지 실패 - 수동 식별:');
  console.log();

  // Path 1 끝부분: sig1[51~54] = 4개 c 곡선 (원)
  // (105.548, 569.003) → (115.39, 578.846) → (105.548, 588.687) → (95.706, 578.846)
  // 중심: (105.548, 578.846)
  const dot1cx = 105.548, dot1cy = 578.846;
  const dot1r = 9.842;
  const dot1vb = toVB(dot1cx, dot1cy);

  console.log('DOT 1 (Path 1, 좌측 상단 dot):');
  console.log(`  중심 orig = (${dot1cx}, ${dot1cy})`);
  console.log(`  중심 viewBox = (${dot1vb.vx}, ${dot1vb.vy})`);
  console.log(`  반지름 orig = ${dot1r}, viewBox = ${r(dot1r * 4 / 3)}`);
  console.log(`  이 점은 Path1의 마지막 4개 곡선(sig1 idx 51~54)으로 형성`);
  console.log(`  가지선 시작점: orig=(64.331, 550.242) → orig=(99.914, 570.787)`);
  const bs1 = toVB(64.331, 550.242);
  const be1 = toVB(99.914, 570.787);
  console.log(`  가지선 시작점 viewBox: (${bs1.vx}, ${bs1.vy}) → (${be1.vx}, ${be1.vy})`);
  console.log();

  // Path 2 중간부분: sig2[32~35] = 4개 c 곡선 (원)
  // (170.989, 443.298) → (161.148, 433.455) → (170.989, 423.613) → (180.833, 433.455)
  // 중심: (170.989, 433.455) = ( (161.148+180.833)/2, (443.298+423.613)/2 )
  const dot2cx = (161.148 + 180.833) / 2;
  const dot2cy = (443.298 + 423.613) / 2;
  const dot2r = 9.842;
  const dot2vb = toVB(dot2cx, dot2cy);

  console.log('DOT 2 (Path 2, 우측 하단 dot):');
  console.log(`  중심 orig = (${r(dot2cx)}, ${r(dot2cy)})`);
  console.log(`  중심 viewBox = (${dot2vb.vx}, ${dot2vb.vy})`);
  console.log(`  반지름 orig = ${dot2r}, viewBox = ${r(dot2r * 4 / 3)}`);
  console.log(`  이 점은 Path2의 중간 4개 곡선(sig2 idx 32~35)으로 형성`);
  console.log(`  가지선 시작점: orig=(214.79, 463.374) → orig=(176.755, 441.414)`);
  const bs2 = toVB(214.79, 463.374);
  const be2 = toVB(176.755, 441.414);
  console.log(`  가지선 시작점 viewBox: (${bs2.vx}, ${bs2.vy}) → (${be2.vx}, ${be2.vy})`);
}

// ── 16. DOT 있는 끝점 vs 없는 끝점 식별 ──
console.log('\n=== 끝점(endpoint) 분류 ===\n');

console.log('DOT 있는 끝점:');
console.log('  1. viewBox=(133.22, 572.28) - 좌측 상단 (DOT 1 가지선 끝)');
console.log('  2. viewBox=(235.67, 744.78) - 우측 하단 (DOT 2 가지선 끝)');
console.log();
console.log('DOT 없는 끝점 (path가 닫히는 곳이므로 명시적 끝점 없음):');
console.log('  → 이 로고의 두 path는 모두 닫힌 형태(filled shape)');
console.log('  → "끝점"은 가지선의 끝에 있는 DOT 부분만 해당');

// ── 17. 전체 구조 JSON ──
console.log('\n=== 전체 구조 JSON ===\n');

const finalStructure = {
  dots: [
    {
      label: 'DOT1 (좌측 상단)',
      center: { vx: toVB(105.548, 578.846).vx, vy: toVB(105.548, 578.846).vy },
      radius_vb: r(9.842 * 4 / 3),
      branch: {
        from: { vx: toVB(64.331, 550.242).vx, vy: toVB(64.331, 550.242).vy },
        to: { vx: toVB(99.914, 570.787).vx, vy: toVB(99.914, 570.787).vy }
      }
    },
    {
      label: 'DOT2 (우측 하단)',
      center: { vx: toVB(170.99, 433.455).vx, vy: toVB(170.99, 433.455).vy },
      radius_vb: r(9.842 * 4 / 3),
      branch: {
        from: { vx: toVB(214.79, 463.374).vx, vy: toVB(214.79, 463.374).vy },
        to: { vx: toVB(176.755, 441.414).vx, vy: toVB(176.755, 441.414).vy }
      }
    }
  ],
  hexagonVertices: {
    top: { vx: toVB(139.56, 601.589).vx, vy: toVB(139.56, 601.589).vy, label: '상단 꼭짓점' },
    topRight: { vx: toVB(222.623, 552.503).vx, vy: toVB(222.623, 552.503).vy, label: '우상 꼭짓점' },
    bottomRight: { vx: toVB(222.623, 461.113).vx, vy: toVB(222.623, 461.113).vy, label: '우하 꼭짓점' },
    bottom: { vx: toVB(139.56, 411.502).vx, vy: toVB(139.56, 411.502).vy, label: '하단 꼭짓점' },
    bottomLeft: { vx: toVB(56.498, 461.113).vx, vy: toVB(56.498, 461.113).vy, label: '좌하 꼭짓점' },
    topLeft: { vx: toVB(56.498, 552.503).vx, vy: toVB(56.498, 552.503).vy, label: '좌상 꼭짓점' }
  },
  edges: finalEdges.map(e => ({
    id: e.id,
    label: e.type,
    from: e.from,
    to: e.to,
    source: e.source
  }))
};

console.log(JSON.stringify(finalStructure, null, 2));

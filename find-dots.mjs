import { readFileSync } from 'fs';

// Read the SVG file
const svgContent = readFileSync(
  '/Users/jojaeho/vibe_project/260215_digitalblob/project_digitalBlob/static/assets/images/digitalblob_CI_rgb_color.svg',
  'utf-8'
);

// ============================================================
// 1. Extract path d attributes with their style
// ============================================================
const pathRegex = /<path[^>]*style="([^"]*)"[^>]*d="([^"]*)"/g;
const paths = [];
let match;
while ((match = pathRegex.exec(svgContent)) !== null) {
  paths.push({ style: match[1], d: match[2] });
}
const pathRegex2 = /<path[^>]*d="([^"]*)"[^>]*style="([^"]*)"/g;
while ((match = pathRegex2.exec(svgContent)) !== null) {
  paths.push({ style: match[2], d: match[1] });
}

// Deduplicate
const seen = new Set();
const uniquePaths = paths.filter(p => {
  if (seen.has(p.d)) return false;
  seen.add(p.d);
  return true;
});

// 2. Filter for gradient-filled paths (icon shapes, not text)
const gradientPaths = uniquePaths.filter(p => p.style.includes('url(#linearGradient'));
console.log(`Found ${gradientPaths.length} gradient-filled icon paths.\n`);

// ============================================================
// 3. SVG path parser: tokenize and parse all commands
// ============================================================
function parsePath(d) {
  const commands = [];
  const tokens = d.match(/[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g);
  if (!tokens) return commands;

  let i = 0;
  let currentCmd = null;

  const nextNum = () => parseFloat(tokens[i++]);
  const peekIsNum = () => i < tokens.length && /^[-+]?(?:\d+\.?\d*|\.\d+)/.test(tokens[i]);

  while (i < tokens.length) {
    if (/^[a-zA-Z]$/.test(tokens[i])) {
      currentCmd = tokens[i++];
      if (currentCmd === 'z' || currentCmd === 'Z') {
        commands.push({ cmd: 'Z' });
        continue;
      }
    }
    if (!currentCmd || !peekIsNum()) { i++; continue; }

    switch (currentCmd) {
      case 'M': commands.push({ cmd: 'M', x: nextNum(), y: nextNum() }); currentCmd = 'L'; break;
      case 'm': commands.push({ cmd: 'm', dx: nextNum(), dy: nextNum() }); currentCmd = 'l'; break;
      case 'L': commands.push({ cmd: 'L', x: nextNum(), y: nextNum() }); break;
      case 'l': commands.push({ cmd: 'l', dx: nextNum(), dy: nextNum() }); break;
      case 'H': commands.push({ cmd: 'H', x: nextNum() }); break;
      case 'h': commands.push({ cmd: 'h', dx: nextNum() }); break;
      case 'V': commands.push({ cmd: 'V', y: nextNum() }); break;
      case 'v': commands.push({ cmd: 'v', dy: nextNum() }); break;
      case 'C': {
        const x1 = nextNum(), y1 = nextNum(), x2 = nextNum(), y2 = nextNum(), x = nextNum(), y = nextNum();
        commands.push({ cmd: 'C', x1, y1, x2, y2, x, y });
        break;
      }
      case 'c': {
        const dx1 = nextNum(), dy1 = nextNum(), dx2 = nextNum(), dy2 = nextNum(), dx = nextNum(), dy = nextNum();
        commands.push({ cmd: 'c', dx1, dy1, dx2, dy2, dx, dy });
        break;
      }
      default: i++; break;
    }
  }
  return commands;
}

// ============================================================
// 4. Convert to absolute coordinates, tracking current position
// ============================================================
function toAbsolute(commands) {
  const result = [];
  let cx = 0, cy = 0, sx = 0, sy = 0;

  for (const cmd of commands) {
    switch (cmd.cmd) {
      case 'M': cx = cmd.x; cy = cmd.y; sx = cx; sy = cy;
        result.push({ cmd: 'M', x: cx, y: cy }); break;
      case 'm': cx += cmd.dx; cy += cmd.dy; sx = cx; sy = cy;
        result.push({ cmd: 'M', x: cx, y: cy }); break;
      case 'L': cx = cmd.x; cy = cmd.y;
        result.push({ cmd: 'L', x: cx, y: cy }); break;
      case 'l': cx += cmd.dx; cy += cmd.dy;
        result.push({ cmd: 'L', x: cx, y: cy }); break;
      case 'H': cx = cmd.x;
        result.push({ cmd: 'L', x: cx, y: cy }); break;
      case 'h': cx += cmd.dx;
        result.push({ cmd: 'L', x: cx, y: cy }); break;
      case 'V': cy = cmd.y;
        result.push({ cmd: 'L', x: cx, y: cy }); break;
      case 'v': cy += cmd.dy;
        result.push({ cmd: 'L', x: cx, y: cy }); break;
      case 'C':
        result.push({ cmd: 'C', x1: cmd.x1, y1: cmd.y1, x2: cmd.x2, y2: cmd.y2,
                       x: cmd.x, y: cmd.y, fromX: cx, fromY: cy });
        cx = cmd.x; cy = cmd.y; break;
      case 'c':
        result.push({ cmd: 'C',
          x1: cx + cmd.dx1, y1: cy + cmd.dy1,
          x2: cx + cmd.dx2, y2: cy + cmd.dy2,
          x: cx + cmd.dx, y: cy + cmd.dy,
          fromX: cx, fromY: cy });
        cx += cmd.dx; cy += cmd.dy; break;
      case 'Z':
        result.push({ cmd: 'Z', fromX: cx, fromY: cy, x: sx, y: sy });
        cx = sx; cy = sy; break;
    }
  }
  return result;
}

// ============================================================
// 5. Find circle-approximating bezier sequences
// ============================================================
//
// A circle of radius r approximated by 4 cubic beziers produces
// quarter-arc segments with chord length = r * sqrt(2).
// We look for 3+ consecutive cubic beziers with this chord length
// (the paths contain 3 explicit arcs; the 4th arc is either the
// path's own starting moveto or continues elsewhere).
//
// Between the bezier arcs, the SVG has "v 0" zero-length moves
// (used as visual separators in the source). We filter these out
// by extracting only the C commands.

function findCircleDots(absCommands, targetRadius = 9.842) {
  // Extract only cubic bezier commands
  const beziers = absCommands.filter(c => c.cmd === 'C');
  const expectedChord = targetRadius * Math.sqrt(2); // ~13.92

  const results = [];

  // Find consecutive beziers whose chord matches a quarter-circle arc
  for (let i = 0; i < beziers.length; i++) {
    const chord = Math.sqrt((beziers[i].x - beziers[i].fromX)**2 + (beziers[i].y - beziers[i].fromY)**2);
    if (Math.abs(chord - expectedChord) > 1.5) continue;

    // Collect consecutive quarter-arc beziers
    const group = [beziers[i]];
    for (let j = i + 1; j < beziers.length && group.length < 4; j++) {
      const nb = beziers[j];
      const nc = Math.sqrt((nb.x - nb.fromX)**2 + (nb.y - nb.fromY)**2);
      if (Math.abs(nc - expectedChord) > 1.5) break;

      // Must be connected: end of previous = start of current
      const prev = group[group.length - 1];
      if (Math.sqrt((nb.fromX - prev.x)**2 + (nb.fromY - prev.y)**2) > 0.2) break;

      group.push(nb);
    }

    if (group.length >= 3) {
      // Collect the cardinal points (endpoints of each quarter arc)
      const points = [{ x: group[0].fromX, y: group[0].fromY }];
      for (const b of group) points.push({ x: b.x, y: b.y });

      // Calculate center from pairs of opposite cardinal points
      // p0 and p2 are diametrically opposite; p1 and p3 are diametrically opposite
      const cx = ((points[0].x + points[2].x) / 2 + (points[1].x + points[3].x) / 2) / 2;
      const cy = ((points[0].y + points[2].y) / 2 + (points[1].y + points[3].y) / 2) / 2;

      // Verify radii
      const radii = points.map(p => Math.sqrt((p.x - cx)**2 + (p.y - cy)**2));
      const avgR = radii.reduce((a, b) => a + b) / radii.length;

      if (avgR > 8 && avgR < 12) {
        results.push({ cx, cy, radius: avgR, radii, points, numArcs: group.length });
      }

      i += group.length - 1; // Skip past this group
    }
  }
  return results;
}

// ============================================================
// 6. Apply the group transform: matrix(1.3333333,0,0,-1.3333333,0,1333.3333)
//    x' = 1.3333333 * x + 0 * y + 0 = 1.3333333 * x
//    y' = 0 * x + (-1.3333333) * y + 1333.3333
// ============================================================
function applyTransform(x, y) {
  return {
    x: 1.3333333 * x,
    y: -1.3333333 * y + 1333.3333
  };
}

// ============================================================
// Process each gradient path and find circle dots
// ============================================================
const allDots = [];

for (let pathIdx = 0; pathIdx < gradientPaths.length; pathIdx++) {
  const pathData = gradientPaths[pathIdx];
  const commands = parsePath(pathData.d);
  const absCommands = toAbsolute(commands);
  const dots = findCircleDots(absCommands);

  for (const dot of dots) {
    allDots.push({ ...dot, pathIdx: pathIdx + 1 });
  }
}

// ============================================================
// Print results
// ============================================================
console.log('============================================================');
console.log('  DigitalBlob Logo - Small Circle (Dot) Positions');
console.log('============================================================\n');

for (let i = 0; i < allDots.length; i++) {
  const d = allDots[i];
  const viewBox = applyTransform(d.cx, d.cy);

  console.log(`Dot ${i + 1} (from gradient path ${d.pathIdx}, ${d.numArcs} bezier arcs):`);
  console.log(`  Cardinal points: ${d.points.map(p => `(${p.x.toFixed(3)}, ${p.y.toFixed(3)})`).join(', ')}`);
  console.log(`  Radii from center: ${d.radii.map(r => r.toFixed(3)).join(', ')}`);
  console.log();
  console.log(`  Dot ${i + 1} (original): x=${d.cx.toFixed(3)}, y=${d.cy.toFixed(3)} | Dot ${i + 1} (viewBox): x=${viewBox.x.toFixed(3)}, y=${viewBox.y.toFixed(3)}`);
  console.log();
}

console.log('============================================================');
console.log('  Summary');
console.log('============================================================\n');

for (let i = 0; i < allDots.length; i++) {
  const d = allDots[i];
  const vb = applyTransform(d.cx, d.cy);
  console.log(`Dot ${i + 1} (original): x=${d.cx.toFixed(3)}, y=${d.cy.toFixed(3)} | Dot ${i + 1} (viewBox): x=${vb.x.toFixed(3)}, y=${vb.y.toFixed(3)}`);
}

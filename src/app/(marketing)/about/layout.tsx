import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "digitalblob은 데이터와 크리에이티브의 융합으로 브랜드의 지속 가능한 성장을 만드는 퍼포먼스 마케팅 에이전시입니다.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

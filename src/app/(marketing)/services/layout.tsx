import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "퍼포먼스 마케팅, 브랜드 전략, 콘텐츠 마케팅, 데이터 분석. 비즈니스 성장을 위한 통합 마케팅 솔루션.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

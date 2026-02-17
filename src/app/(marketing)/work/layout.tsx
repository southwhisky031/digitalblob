import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "digitalblob의 성공 사례를 확인하세요. 데이터 기반 마케팅으로 만든 브랜드 성장 스토리.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

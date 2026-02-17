import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "다양한 분야의 클라이언트와 함께 성공적인 디지털마케팅 캠페인을 만들어가고 있습니다.",
};

export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요"),
  company: z.string().min(1, "회사명을 입력해 주세요"),
  email: z.string().email("올바른 이메일을 입력해 주세요"),
  website: z.string().url("올바른 URL을 입력해 주세요").optional().or(z.literal("")),
  budget: z.string().min(1, "예산 범위를 선택해 주세요"),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해 주세요"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your-resend-key") {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "digitalblob <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "hello@digitalblob.co",
        subject: `[문의] ${data.company} - ${data.name}`,
        html: `
          <h2>새로운 문의가 접수되었습니다</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;">이름</td><td style="padding:8px;">${data.name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">회사</td><td style="padding:8px;">${data.company}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">이메일</td><td style="padding:8px;">${data.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">웹사이트</td><td style="padding:8px;">${data.website || "-"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">예산</td><td style="padding:8px;">${data.budget}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">문의 내용</td><td style="padding:8px;">${data.message}</td></tr>
          </table>
        `,
      });
    } else {
      console.log("[Contact Form Submission]", data);
    }

    return NextResponse.json({
      success: true,
      message: "문의가 성공적으로 전송되었습니다.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

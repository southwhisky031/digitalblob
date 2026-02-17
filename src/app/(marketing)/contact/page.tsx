"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUDGET_OPTIONS, DUMMY_SITE_SETTINGS, SOCIAL_LINKS, COMPANY_INFO } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요"),
  company: z.string().min(1, "회사명을 입력해 주세요"),
  email: z.string().email("올바른 이메일을 입력해 주세요"),
  website: z.string().url("올바른 URL을 입력해 주세요").optional().or(z.literal("")),
  budget: z.string().min(1, "예산 범위를 선택해 주세요"),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해 주세요"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      website: "",
      budget: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      toast.success(
        "문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다."
      );
      reset();
    } catch {
      toast.error("전송에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 pb-0 md:pt-40 md:pb-0 lg:pt-44 lg:pb-0">
        <ScrollReveal>
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              프로젝트에 대해 이야기해 주세요
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Form + Info */}
      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left column - Form */}
          <ScrollReveal className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* 이름 */}
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    placeholder="홍길동"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* 회사명 */}
                <div className="space-y-2">
                  <Label htmlFor="company">회사명</Label>
                  <Input
                    id="company"
                    placeholder="회사명을 입력해 주세요"
                    {...register("company")}
                  />
                  {errors.company && (
                    <p className="text-sm text-destructive">
                      {errors.company.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* 이메일 */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@company.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 웹사이트 */}
                <div className="space-y-2">
                  <Label htmlFor="website">
                    웹사이트 <span className="text-muted-foreground">(선택)</span>
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://company.com"
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 월 예산 */}
              <div className="space-y-2">
                <Label htmlFor="budget">월 예산</Label>
                <Select
                  onValueChange={(value) => setValue("budget", value, { shouldValidate: true })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="예산 범위를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.budget && (
                  <p className="text-sm text-destructive">
                    {errors.budget.message}
                  </p>
                )}
              </div>

              {/* 문의 내용 */}
              <div className="space-y-2">
                <Label htmlFor="message">문의 내용</Label>
                <Textarea
                  id="message"
                  placeholder="프로젝트에 대해 자세히 알려주세요"
                  className="min-h-[140px]"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    전송 중...
                  </>
                ) : (
                  "문의하기"
                )}
              </Button>
            </form>
          </ScrollReveal>

          {/* Right column - Contact Info */}
          <ScrollReveal className="lg:col-span-2" delay={0.2}>
            <div className="glass rounded-2xl p-8 space-y-8">
              <div>
                <h2 className="font-display text-xl font-semibold mb-6">
                  연락처
                </h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <Mail className="mt-0.5 size-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone className="mt-0.5 size-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MapPin className="mt-0.5 size-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p>{COMPANY_INFO.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Clock className="mt-0.5 size-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Operating Hours
                      </p>
                      <p>월-금 09:00 - 18:00</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  평균 응답 시간:{" "}
                  <span className="font-semibold text-foreground">
                    2시간 이내
                  </span>
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex size-10 items-center justify-center rounded-lg hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex size-10 items-center justify-center rounded-lg hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}

"use client";

import { useEffect, useCallback } from "react";
import { Quote } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DUMMY_TESTIMONIALS } from "@/lib/constants";
import { useState } from "react";

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold">
          Client Testimonials
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          파트너들의 이야기
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Carousel
          opts={{ align: "center", loop: true }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent>
            {DUMMY_TESTIMONIALS.map((testimonial) => (
              <CarouselItem key={testimonial._id}>
                <div className="flex flex-col items-center px-4 py-8 text-center">
                  <Quote className="mb-6 size-10 text-primary/20" />
                  <blockquote className="text-lg italic leading-relaxed md:text-xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 h-px w-16 bg-border" />
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar size="lg">
                      <AvatarFallback>
                        {testimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-semibold">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="mt-4 flex justify-center gap-2">
          {DUMMY_TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

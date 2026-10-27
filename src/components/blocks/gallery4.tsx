"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  /** link externo abre em nova aba */
  external?: boolean;
  /** rótulo do link do cartão (ex.: "Ler o caso") */
  linkLabel?: string;
}

export interface Gallery4Labels {
  prev: string;
  next: string;
  goTo: string;
  readMore: string;
}

export interface Gallery4Props {
  id?: string;
  title: string;
  description: string;
  items: Gallery4Item[];
  labels: Gallery4Labels;
  /** conteúdo abaixo do carrossel (ex.: botão para o portfólio completo) */
  footer?: React.ReactNode;
}

/** Sobreposição escura na base do cartão, para o texto branco ler bem sobre a imagem. */
const overlay = {
  background:
    "linear-gradient(rgb(15 23 42 / 0), rgb(15 23 42 / 0.45), rgb(15 23 42 / 0.9) 100%)",
};

const Gallery4 = ({ id, title, description, items, labels, footer }: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-14">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 id={id ? `${id}-title` : undefined} className="text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
              {title}
            </h2>
            <p className="text-[1.125rem] leading-relaxed text-steel">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
              aria-label={labels.prev}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
              aria-label={labels.next}
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a
                  href={item.href}
                  className="group block rounded-xl"
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl bg-ink md:aspect-[5/4] lg:aspect-[16/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full" style={overlay} />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                      <div className="mb-2 pt-4 text-xl font-bold leading-snug md:mb-3">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 text-[15px] leading-relaxed text-white/85 md:mb-12 lg:mb-9">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm font-semibold">
                        {item.linkLabel ?? labels.readMore}
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-sign" : "bg-sign/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`${labels.goTo} ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {footer && (
        <div className="mx-auto mt-12 flex max-w-site justify-center px-4 sm:px-6 lg:px-8">{footer}</div>
      )}
    </section>
  );
};

export { Gallery4 };

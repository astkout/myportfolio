import { useRef, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ExternalLink, Github, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { projects } from "./data/projectsData";

interface Project {
  title: string;
  description: string;
  video?: string;
  link?: string;
  github?: string;
  tags: string[];
}

const Projects = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      const heights = cardRefs.current.map((el) => el?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights));
    };
    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  const handleHover = (index: number, play: boolean) => {
    const video = videoRefs.current[index];
    if (video && window.innerWidth >= 1024) {
      if (play) video.play().catch(() => {});
      else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent, url?: string) => {
    e.preventDefault();
    if (url?.startsWith("http"))
      window.open(url, "_blank", "noopener,noreferrer");
    else alert("Link is invalid or unavailable.");
  };

  const toggleAutoplay = () => {
    if (!swiperRef.current) return;
    if (autoplayEnabled) swiperRef.current.autoplay.stop();
    else swiperRef.current.autoplay.start();
    setAutoplayEnabled(!autoplayEnabled);
  };

  const onSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-bl from-background via-black to-background overflow-hidden"
    >
      {/* Floating blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl animate-blob mix-blend-multiply" />
      <div className="absolute -bottom-16 right-0 w-72 h-72 bg-cyan-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 mix-blend-multiply" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-4 text-4xl sm:text-6xl md:text-7xl font-bold text-center mb-4 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300"
        >
          Featured Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-4 text-center text-muted-foreground max-w-2xl mx-auto mb-12 sm:mb-14 text-base sm:text-lg md:text-xl"
        >
          Below are some of my recent projects showcasing my skills in web
          development and design.
        </motion.p>

        <div className="relative mt-2">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={false}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={onSlideChange}
          >
            {projects.map((project, i) => (
              <SwiperSlide key={i}>
                <Card
                  ref={(el) => (cardRefs.current[i] = el)}
                  style={{ height: maxHeight || "auto" }}
                  className="relative p-5 sm:p- bg-background/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 hover:border-primary/40 transition-all duration-500 group flex flex-col"
                  onMouseEnter={() => handleHover(i, true)}
                  onMouseLeave={() => handleHover(i, false)}
                >
                  <div className="h-36 sm:h-44 rounded-lg mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden relative group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-500">
                    {project.video ? (
                      <video
                        ref={(el) => (videoRefs.current[i] = el)}
                        src={project.video}
                        className="w-full h-full object-cover rounded-lg"
                        loop
                        playsInline
                        muted
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 border border-primary/30" />
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-1 text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 leading-snug">
                    {project.description}
                  </p>

                  <div className="flex-grow" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[0.65rem] px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 h-8 rounded-full border border-primary text-primary hover:bg-[hsl(var(--primary)/0.1)] transition-all text-sm flex items-center justify-center px-6"
                      onClick={(e) => handleButtonClick(e, project.link)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> View
                    </button>
                    <button
                      className="flex-1 h-8 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-600/20 transition-all text-sm flex items-center justify-center px-6"
                      onClick={(e) => handleButtonClick(e, project.github)}
                    >
                      <Github className="w-4 h-4 mr-2" /> Code
                    </button>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination + Play */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={toggleAutoplay}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                autoplayEnabled
                  ? "bg-purple-700 scale-110"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
              aria-label={autoplayEnabled ? "Pause autoplay" : "Start autoplay"}
            >
              {autoplayEnabled ? (
                <Pause size={10} className="text-white" />
              ) : (
                <Play size={10} className="text-white ml-[1px]" />
              )}
            </button>
            <div className="swiper-pagination flex items-center justify-center !static !w-auto" />
          </div>

          {/* Navigation (always rendered, hidden visually on small screens and first/last slide) */}
          <div className="hidden md:block">
            <div
              className={`swiper-prev absolute top-1/2 -translate-y-1/2 -left-14 z-20 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-500/40 transition-all ${
                activeIndex === 0
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <span className="text-white text-xl">‹</span>
            </div>
            <div
              className={`swiper-next absolute top-1/2 -translate-y-1/2 -right-14 z-20 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-500/40 transition-all ${
                activeIndex === projects.length - 1
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <span className="text-white text-xl">›</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

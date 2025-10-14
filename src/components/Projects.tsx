// import { useState, useEffect, useRef } from "react";
// import { Card } from "./ui/card";
// import { ExternalLink, Github } from "lucide-react";
// import { Button } from "./ui/button";
// import { motion } from "framer-motion";

// const projects = [
//   {
//     title: "GO G Cleaning Services",
//     description:
//       "A comprehensive cleaning service platform that connects users with local cleaning professionals.",
//     tags: ["React", "Tailwind CSS"],
//     link: "https://gogcleaning.co.uk/",
//     github: "https://github.com/astkout/GSCS",
//     video: "/assets/project/project0.mp4",
//   },
//   {
//     title: "Portfolio",
//     description:
//       "My old personal portfolio website showcasing my projects, skills, and experience. No longer in use due to performance issues.",
//     tags: ["React", "Tailwind CSS", "Three.js"],
//     link: "https://astkout.vercel.app/",
//     github: "https://github.com/astkout/tindog",
//     video: "/assets/project/project6.mp4",
//   },
//   {
//     title: "FINACE.",
//     description:
//       "A financial management platform mock-up to provide personalized insights and recommendations.",
//     tags: ["React", "Tailwind CSS"],
//     link: "https://finance-astkout.vercel.app//",
//     github: "https://github.com/astkout/finance",
//     video: "/assets/project/project1.mp4",
//   },
//   {
//     title: "BEACHES",
//     description:
//       "A mock-up travel booking platform with a focus on beach destinations, offering seamless booking experiences.",
//     tags: ["React", "Tailwind CSS"],
//     link: "https://beach-six.vercel.app/",
//     github: "https://github.com/astkout/beach",
//     video: "/assets/project/project2.mp4",
//   },
//   {
//     title: "Medicare",
//     description:
//       "A  modern healthcare website template designed for clinics and medical professionals.",
//     tags: ["React", "GSAP", "TailwindCSS"],
//     link: "https://medicare-iota-one.vercel.app/",
//     github: "https://github.com/astkout/medicare",
//     video: "/assets/project/project3.mp4",
//   },
//   {
//     title: "Besteats",
//     description:
//       "A mock-up  food delivery app  with a focus on user experience and seamless ordering process.",
//     tags: ["React", "TailwindCSS"],
//     link: "https://besteats-nu.vercel.app/",
//     github: "https://github.com/astkout/besteats",
//     video: "/assets/project/project4.mp4",
//   },
//   {
//     title: "Tindog",
//     description:
//       "My first ever webpage. A mock-up dog tinder app.",
//     tags: ["HTML", "CSS3"],
//     link: "https://astkout.vercel.app/",
//     github: "https://github.com/astkout/tindog",
//     video: "/assets/project/project5.mp4",
//   },
// ];

// const Projects = () => {
//   const [showAll, setShowAll] = useState(false);
//   const displayedProjects = showAll ? projects : projects.slice(0, 3);
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

//   useEffect(() => {
//     videoRefs.current.forEach((video) => video?.pause());
//   }, [showAll]);

//   const handleMouseEnter = (index: number) => {
//     const video = videoRefs.current[index];
//     if (window.innerWidth >= 768 && video) {
//       video.muted = true;
//       video.play().catch(() => {});
//     }
//   };

//   const handleMouseLeave = (index: number) => {
//     const video = videoRefs.current[index];
//     if (window.innerWidth >= 768 && video) {
//       video.pause();
//       video.currentTime = 0;
//     }
//   };

//   return (
//     <section
//       id="projects"
//       className="relative min-h-screen py-24 sm:py-32 lg:py-40 overflow-hidden flex flex-col justify-center bg-gradient-to-bl from-background via-black to-background"
//     >
//       {/* Floating blobs */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob mix-blend-multiply"></div>
//       <div className="absolute -bottom-20 right-0 w-96 h-96 bg-cyan-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 mix-blend-multiply"></div>

//       <div className="container mx-auto px-4 sm:px-6 relative z-10">
//         {/* Title */}
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true }}
//           className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300"
//         >
//           Featured Projects
//         </motion.h2>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
//           {displayedProjects.map((project, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.9, y: 40 }}
//               whileInView={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ delay: index * 0.1, duration: 0.6 }}
//               viewport={{ once: true }}
//               onMouseEnter={() => handleMouseEnter(index)}
//               onMouseLeave={() => handleMouseLeave(index)}
//             >
//               <Card className="relative p-6 sm:p-8 bg-background/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/10 hover:border-primary/40 transition-all duration-500 group">
//                 {/* Glow effect */}
//                 <div
//                   className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"
//                   style={{
//                     background:
//                       "radial-gradient(circle at center, rgba(139,92,246,0.25), transparent 70%)",
//                   }}
//                 ></div>

//                 {/* Video */}
//                 <div className="h-44 sm:h-56 rounded-xl mb-5 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-500">
//                   {project.video ? (
//                     <video
//                       ref={(el) => (videoRefs.current[index] = el)}
//                       src={project.video}
//                       className="autoplay-video w-full h-full object-cover rounded-xl"
//                       loop
//                       playsInline
//                       muted
//                     />
//                   ) : (
//                     <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/20 border border-primary/30" />
//                   )}
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">
//                   {project.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-muted-foreground text-sm sm:text-base mb-4 leading-relaxed">
//                   {project.description}
//                 </p>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {project.tags.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-3">
//                   <a
//                     href={project.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1"
//                   >
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="w-full border border-primary text-primary hover:text-primary hover:bg-[hsl(var(--primary)/0.1)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 relative overflow-hidden text-xs sm:text-sm"
//                     >
//                       <ExternalLink className="w-4 h-4 mr-1" /> View
//                     </Button>
//                   </a>

//                   <a
//                     href={project.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1"
//                   >
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="w-full border border-purple-500 text-purple-400 hover:bg-purple-600/20 hover:text-purple-400 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 relative overflow-hidden text-xs sm:text-sm"
//                     >
//                       <Github className="w-4 h-4 mr-1" /> Code
//                     </Button>
//                   </a>
//                 </div>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Show More / Less */}
//         {projects.length > 3 && (
//           <div className="flex justify-center mt-12  ">
//             <Button
//               size="lg"
//               variant="secondary"
//               onClick={() => setShowAll(!showAll)}
//               className="
//     px-6 py-3
//     border border-purple-500
//     text-purple-400
//     bg-transparent
//     relative
//     overflow-hidden
//     hover:text-purple-400
//     hover:bg-transparent
//     hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]
//     transition-all
//     duration-300"
//             >
//               {showAll ? "Show Less" : "Show More"}
//             </Button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Projects;

import { useRef, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import projects array from external file
import { projects } from "./data/projectsData";

const Projects = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  // Set all cards to the same height
  useEffect(() => {
    if (cardRefs.current.length) {
      const heights = cardRefs.current.map((el) => el?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights));
    }
  }, [projects]);

  // Validate project data
  useEffect(() => {
    projects.forEach((p, i) => {
      if (!p.link || !/^https?:\/\//.test(p.link)) console.warn(`Project ${i} (${p.title}) has invalid/missing link: ${p.link}`);
      if (!p.github || !/^https?:\/\//.test(p.github)) console.warn(`Project ${i} (${p.title}) has invalid/missing GitHub URL: ${p.github}`);
      if (!p.video) console.warn(`Project ${i} (${p.title}) missing video`);
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth >= 1024) {
      const video = videoRefs.current[index];
      if (video) {
        video.muted = true;
        video.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = (index: number) => {
    if (window.innerWidth >= 1024) {
      const video = videoRefs.current[index];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  // Handle button clicks to bypass Swiper
  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string | undefined, type: string, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Clicked ${type} button for ${title}:`, url);
    if (url && /^https?:\/\//.test(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.error(`Invalid ${type} URL for ${title}:`, url);
    }
  };

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 sm:pt-23 lg:py-36 overflow-hidden flex flex-col justify-center bg-gradient-to-bl from-background via-black to-background"
    >
      {/* Floating blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl animate-blob mix-blend-multiply"></div>
      <div className="absolute -bottom-16 right-0 w-72 h-72 bg-cyan-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 mix-blend-multiply"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300"
        >
          Featured Projects
        </motion.h2>

        <div className="relative">
          {/* Swiper */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{
              nextEl: ".custom-swiper-next",
              prevEl: ".custom-swiper-prev",
            }}
            pagination={{
              el: ".custom-swiper-pagination",
              clickable: true,
              renderBullet: (index: number, className: string) =>
                `<span class="${className} w-3 h-3 rounded-full mx-1 bg-purple-500 opacity-50 hover:opacity-100 transition-all cursor-pointer ${
                  className.includes("swiper-pagination-bullet-active") ? "bg-primary opacity-100 scale-125" : ""
                }" role="button" aria-label="Go to slide ${index + 1}"></span>`,
            }}
            preventClicks={false}
            preventClicksPropagation={false}
            allowTouchMove={true}
            onTouchStart={(swiper) => console.log("Touch started:", swiper)}
            breakpoints={{
              640: { slidesPerView: 1, allowTouchMove: true },
              768: { slidesPerView: 2, allowTouchMove: true },
              1024: { slidesPerView: 3, allowTouchMove: false },
            }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <Card
                  ref={(el) => (cardRefs.current[index] = el)}
                  style={{ height: maxHeight || "auto" }}
                  className="relative p-4 sm:p-5 bg-background/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 hover:border-primary/40 transition-all duration-500 group flex flex-col"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"
                    style={{
                      background: "radial-gradient(circle at center, rgba(139,92,246,0.25), transparent 70%)",
                    }}
                  ></div>

                  <div className="h-36 sm:h-44 rounded-lg mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden relative group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-500">
                    {project.video ? (
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={project.video}
                        className="autoplay-video w-full h-full object-cover rounded-lg"
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

                  {/* Spacer to push tags and buttons to the bottom */}
                  <div className="flex-grow"></div>

                  {/* Tags (Skills) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[0.65rem] px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={project.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 button-ignore-swiper"
                      onClick={(e) => handleButtonClick(e, project.link, "View", project.title)}
                      aria-label={`View project ${project.title}`}
                    >
                      <button
                        className="w-full h-6 sm:h-8 rounded-full border border-primary text-primary hover:text-primary hover:bg-[hsl(var(--primary)/0.1)] hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300 text-sm sm:text-base flex items-center justify-center px-6 py-3"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" /> View
                      </button>
                    </a>

                    <a
                      href={project.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 button-ignore-swiper"
                      onClick={(e) => handleButtonClick(e, project.github, "Code", project.title)}
                      aria-label={`View source code for ${project.title}`}
                    >
                      <button
                        className="w-full h-6 sm:h-8 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-600/20 hover:text-purple-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 text-sm sm:text-base flex items-center justify-center px-6 py-3"
                      >
                        <Github className="w-5 h-5 mr-2" /> Code
                      </button>
                    </a>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination container */}
          <div className="custom-swiper-pagination mt-6 flex justify-center items-center z-20"></div>

          {/* Navigation arrows (hidden on mobile & tablet) */}
          <div
            className="hidden lg:flex custom-swiper-prev absolute top-1/2 -translate-y-1/2 -left-14 z-20 w-12 h-12 bg-purple-500/20 rounded-full items-center justify-center cursor-pointer hover:bg-purple-500/40 transition-all"
            aria-label="Previous slide"
          >
            <span className="text-white text-xl">‹</span>
          </div>
          <div
            className="hidden lg:flex custom-swiper-next absolute top-1/2 -translate-y-1/2 -right-14 z-20 w-12 h-12 bg-purple-500/20 rounded-full items-center justify-center cursor-pointer hover:bg-purple-500/40 transition-all"
            aria-label="Next slide"
          >
            <span className="text-white text-xl">›</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Projects;
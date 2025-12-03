import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHtml5, FaCss3Alt, FaReact, FaGit } from "react-icons/fa";
import { SiJavascript, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "HTML", icon: <FaHtml5 className="inline-block mr-2" /> },
    { name: "CSS", icon: <FaCss3Alt className="inline-block mr-2" /> },
    {
      name: "JavaScript",
      icon: <SiJavascript className="inline-block mr-2" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="inline-block mr-2" />,
    },
    { name: "React.js", icon: <FaReact className="inline-block mr-2" /> },
    { name: "Github", icon: <FaGit className="inline-block mr-2" /> },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text fade-up animation
      gsap.fromTo(
        ".about-animate",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
          },
        }
      );

      // Image soft entrance
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, rotateY: 10 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  // Subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = -(e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(imageRef.current, {
        rotationY: x,
        rotationX: y,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-black to-background overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      {/* Subtle Accent Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left max-w-2xl space-y-10">
          <h2 className="about-animate text-5xl sm:text-6xl font-extrabold text-gradient">
            About Me
          </h2>

          <p className="about-animate text-lg sm:text-xl text-muted-foreground leading-relaxed">
            I’m{" "}
            <span className="text-gradient font-semibold">
              Asterios Koutoulidis
            </span>
            , a passionate front-end developer focused on transforming ideas
            into immersive digital experiences that merge design and technology.
          </p>

          <p className="about-animate text-lg sm:text-xl text-muted-foreground leading-relaxed">
            With a strong eye for{" "}
            <span className="text-gradient font-semibold">
              modern, minimal design
            </span>{" "}
            and a drive for clean, efficient code, I aim to create projects that
            feel as smooth as they look.
          </p>

          <p className="about-animate text-lg sm:text-xl text-muted-foreground leading-relaxed">
            I’m constantly exploring{" "}
            <span className="text-gradient font-semibold">
              motion, 3D, and emerging web technologies
            </span>{" "}
            to push creative boundaries while maintaining functional precision.
          </p>

          <h2 className="about-animate mt-10 text-center md:text-left text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
            Technologies I Use
          </h2>

          {/* Tech Highlights */}
          <div className="about-animate flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="flex items-center px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/10 hover:bg-primary/20 transition-all duration-300"
              >
                {skill.icon}
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Profile Image */}
        <div
          ref={imageRef}
          className="flex-shrink-0 w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <div
            className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/10 bg-background/50 backdrop-blur-lg"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="/assets/grid1.png"
              alt="Profile"
              className="w-full h-full object-cover select-none opacity-90"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
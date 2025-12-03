import { useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import HeroSpline from "./HeroSpline"; // loads immediately
import gsap from "gsap";
import HeroTyping from "./HeroTyping";

const roles = [
  "Frontend Developer",
  "UI/UX Designer",
  "Tech Enthusiast",
  "Developer & Designer",
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // GSAP fade-in animations for hero content
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-bl from-background via-black to-background"
    >
      {/* Floating gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 z-0" />

      {/* Hero Spline */}
      <HeroSpline />

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl text-center px-6 space-y-6 sm:space-y-8">
        <p className="text-muted-foreground text-base sm:text-2xl fade-in">
          Hello, I'm
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gradient whitespace-nowrap fade-in">
          Asterios&nbsp;Koutoulidis
        </h1>

        {/* Typing Effect */}
        <p className="text-lg sm:text-2xl text-muted-foreground font-light fade-in">
          <HeroTyping roles={roles} speed={120} pause={1000} />
        </p>

        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed fade-in">
          Crafting digital experiences at the intersection of art and technology.
          Specializing in web design, development, and creative problem-solving.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 fade-in">
          <Button
            size="lg"
            className="bg-transparent border border-primary text-primary hover:bg-[hsl(var(--primary)/0.1)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 w-full sm:w-auto"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Work
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-400 w-full sm:w-auto hover:bg-purple-600/20 hover:text-purple-400 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Scroll Arrow */}
      <button
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-30 fade-in"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
      </button>
    </section>
  );
};

export default Hero;

import { FaHtml5, FaCss3Alt, FaReact, FaGitAlt } from "react-icons/fa";
import { SiJavascript, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";

const techData = [
  {
    name: "HTML5",
    icon: <FaHtml5 />,
    color: "#F06529",
    description: "Semantic and accessible markup to structure modern web pages.",
  },
  {
    name: "CSS3",
    icon: <FaCss3Alt />,
    color: "#2965F1",
    description: "Beautiful, responsive layouts with flexible design control.",
  },
  {
    name: "JavaScript",
    icon: <SiJavascript />,
    color: "#F7DF1E",
    description: "Dynamic, interactive functionality using ES6+ modern syntax.",
  },
  {
    name: "React",
    icon: <FaReact />,
    color: "#61DBFB",
    description: "Component-driven UIs and seamless single-page experiences.",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "#38BDF8",
    description: "Utility-first CSS for rapid, responsive UI development.",
  },
  {
    name: "Git",
    icon: <FaGitAlt />,
    color: "#F1502F",
    description: "Version control and collaboration for professional workflow.",
  },
];

const Technologies = () => {
  return (
    <section
      id="skills"
      className="relative min-h-screen py-28 sm:py-36 lg:py-44 overflow-hidden flex flex-col justify-center bg-gradient-to-b from-background via-black/95 to-background"
    >
      {/* --- Matching About Section Background --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 z-0" />

      {/* Ambient floating blobs (same as About section) */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob mix-blend-multiply"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-cyan-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 mix-blend-multiply"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 z-10"
      >
        Technologies I Work With
      </motion.h2>

      {/* Tech Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
        {techData.map((tech, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="relative group rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white/20 hover:shadow-2xl transition-all duration-300"
          >
            {/* Glow hover effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-3xl"
              style={{
                background: `radial-gradient(circle at center, ${tech.color}40, transparent 70%)`,
              }}
            ></div>

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 4 }}
              className="text-6xl mb-5 mx-auto transition-transform duration-300"
              style={{ color: tech.color }}
            >
              {tech.icon}
            </motion.div>

            {/* Name */}
            <h3 className="text-2xl font-semibold text-white mb-3">
              {tech.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              {tech.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;

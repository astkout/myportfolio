import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  const socials = [
    { icon: Github, href: "https://github.com/astkout", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/astkout/", label: "LinkedIn" },
  ];

  return (
    <footer className="py-6 sm:py-8 border-t border-border bg-gradient-to-br from-background via-black to-background">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
        {/* Footer Text */}
        <div className="text-center text-muted-foreground text-sm sm:text-base">
          © {new Date().getFullYear()} Asterios Koutoulidis. Crafted with precision and passion.
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-2">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-primary hover:bg-primary/30 hover:text-white transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

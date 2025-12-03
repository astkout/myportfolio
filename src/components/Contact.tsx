import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !formRef.current) return;

      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(formRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        { name, email },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-black to-background py-24 px-4"
    >
      {/* Toast */}
      <Toaster
        position="bottom-right"
        containerStyle={{ bottom: "100px" }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f1f1f",
            color: "#fff",
            fontSize: "0.95rem",
            borderRadius: "12px",
            padding: "10px 14px",
          },
        }}
      />

      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 mb-4">
          Let's Connect
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to collaborate. Send me a message!
        </p>
      </div>

      {/* Form */}
      <div
        id="contact-form"
        ref={formRef}
        className="w-full max-w-md sm:max-w-2xl bg-background/20 backdrop-blur-lg p-5 sm:p-10 rounded-3xl shadow-2xl flex flex-col gap-4 sm:gap-5"
      >
        <div className="flex flex-col">
          <label className="mb-2 text-white font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl bg-background/20 text-white placeholder:text-white/70 border-2 border-purple-500 focus:border-purple-500 focus:ring-0"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-white font-semibold">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl bg-background/20 text-white placeholder:text-white/70 border-2 border-purple-500 focus:border-purple-500 focus:ring-0"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-white font-semibold">Message</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl bg-background/20 text-white placeholder:text-white/70 border-2 border-purple-500 resize-none h-32 sm:h-48 focus:border-purple-500 focus:ring-0"
          />
        </div>

        <Button
          size="lg"
          onClick={handleSendMessage}
          disabled={loading}
          className="w-full py-3 sm:py-5 text-base sm:text-lg border-2 border-purple-500 text-purple-400 bg-transparent hover:bg-purple-500/20 hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] transition-all duration-300 rounded-xl"
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;

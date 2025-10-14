import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const handleSendMessage = async () => {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      // Send to your email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Auto-reply to user
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
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-black to-background py-24 sm:py-32"
    >
      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        style={{ bottom: "250px" }}
      />

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 mb-6">
          Let's Connect
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          I'm always open to discussing new projects, creative ideas, or opportunities to collaborate. Send me a message!
        </p>
      </div>

      {/* Form */}
      <div
        ref={formRef}
        className="w-full max-w-2xl bg-background/20 backdrop-blur-lg p-6 sm:p-10 rounded-3xl shadow-2xl flex flex-col gap-5"
      >
        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-2 text-white font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-transparent text-white placeholder:text-white/70 border-2 border-purple-500 focus:border-purple-400 focus:ring-0 transition-all"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-2 text-white font-semibold">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-transparent text-white placeholder:text-white/70 border-2 border-purple-500 focus:border-purple-400 focus:ring-0 transition-all"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="mb-2 text-white font-semibold">Message</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-transparent text-white placeholder:text-white/70 border-2 border-purple-500 focus:border-purple-400 focus:ring-0 transition-all resize-none h-40 sm:h-48"
          />
        </div>

        {/* Submit */}
        <Button
          size="lg"
          onClick={handleSendMessage}
          disabled={loading}
          className="w-full p-5 text-lg border-2 border-purple-500 text-purple-400 bg-transparent hover:bg-purple-500/20 hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] transition-all duration-300"
        >
          Send Message
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;

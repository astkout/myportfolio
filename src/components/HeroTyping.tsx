import { useState, useEffect } from "react";

interface HeroTypingProps {
  roles: string[];
  speed?: number; // typing speed in ms
  pause?: number; // pause after a role finishes
}

const HeroTyping: React.FC<HeroTypingProps> = ({ roles, speed = 100, pause = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  // Typing effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (subIndex < roles[index].length) {
      timeout = setTimeout(() => {
        setDisplayedText(roles[index].substring(0, subIndex + 1));
        setSubIndex(subIndex + 1);
      }, speed);
    } else {
      // Pause before next role
      timeout = setTimeout(() => {
        setSubIndex(0);
        setIndex((prev) => (prev + 1) % roles.length);
      }, pause);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, index, roles, speed, pause]);

  // Blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <>
      {displayedText}
      <span className="ml-1">{blink ? "|" : " "}</span>
    </>
  );
};

export default HeroTyping;

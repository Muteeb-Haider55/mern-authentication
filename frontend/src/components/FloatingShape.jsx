import { motion } from "framer-motion";
import React from "react";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${size} ${color} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true" // fixed typo: area-hidden → aria-hidden
    />
  );
};

export default FloatingShape;

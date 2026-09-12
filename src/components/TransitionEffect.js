import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const TransitionEffect = () => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-30 pointer-events-none bg-primary"
      initial={{ opacity: 0.2, scaleX: 1 }}
      animate={{ opacity: 0, scaleX: 0 }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformOrigin: "right center",
        willChange: "transform, opacity",
      }}
    />
  );
};

export default TransitionEffect;

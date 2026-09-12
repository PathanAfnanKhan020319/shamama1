import AnimatedText from "@/components/AnimatedText";
import Layout from "../components/Layout";
import Head from "next/head";
import Image from "next/image";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import profilePic from "../../public/images/profile/fine.png";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";

import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";

/* =========================================================
   ANIMATED NUMBER
========================================================= */

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    stiffness: 55,
    damping: 18,
    mass: 0.8,
  });

  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  const decimal = String(value).includes(".");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (!ref.current) return;

      ref.current.textContent = decimal
        ? Math.min(latest, value).toFixed(1)
        : Math.min(latest, value).toFixed(0);
    });

    return unsubscribe;
  }, [springValue, value, decimal]);

  return <span ref={ref}>0</span>;
};

/* =========================================================
   3D DATA PARTICLE
========================================================= */

function DataParticle({ start, end, offset = 0, speed = 0.12 }) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t =
      (state.clock.elapsedTime * speed + offset) % 1;

    ref.current.position.lerpVectors(start, end, t);

    const scale =
      0.5 + Math.sin(t * Math.PI) * 1.8;

    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.026, 12, 12]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

/* =========================================================
   ORBITING SATELLITE
========================================================= */

function OrbitNode({
  radius = 2,
  speed = 0.2,
  offset = 0,
  vertical = 0,
}) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t =
      state.clock.elapsedTime * speed + offset;

    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y =
      Math.sin(t * 1.7) * 0.25 + vertical;

    const pulse =
      0.85 + Math.sin(t * 3) * 0.2;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />

      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={3}
      />
    </mesh>
  );
}

/* =========================================================
   ADVANCED NEURAL FIELD
========================================================= */

function NeuralField() {
  const group = useRef(null);
  const innerRing = useRef(null);
  const middleRing = useRef(null);
  const outerRing = useRef(null);

  const nodes = useMemo(() => {
    const result = [];

    for (let i = 0; i < 64; i++) {
      const phi =
        Math.acos(1 - (2 * (i + 0.5)) / 64);

      const theta =
        Math.PI * (1 + Math.sqrt(5)) * i;

      const radius =
        2.05 + ((i * 19) % 25) / 80;

      const x =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      const y =
        radius *
        Math.cos(phi) *
        1.12;

      const z =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      result.push(new THREE.Vector3(x, y, z));
    }

    return result;
  }, []);

  const connections = useMemo(() => {
    const result = [];

    for (let i = 0; i < nodes.length; i++) {
      const distances = [];

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;

        distances.push({
          j,
          d: nodes[i].distanceTo(nodes[j]),
        });
      }

      distances.sort((a, b) => a.d - b.d);

      distances.slice(0, 2).forEach(({ j }) => {
        if (i < j) {
          result.push([nodes[i], nodes[j]]);
        }
      });
    }

    return result.slice(0, 100);
  }, [nodes]);

  const pulses = useMemo(
    () =>
      connections
        .filter((_, i) => i % 8 === 0)
        .slice(0, 10),
    [connections]
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y += delta * 0.018;

      group.current.rotation.x =
        THREE.MathUtils.lerp(
          group.current.rotation.x,
          state.pointer.y * 0.12,
          0.025
        );

      group.current.rotation.z =
        THREE.MathUtils.lerp(
          group.current.rotation.z,
          -state.pointer.x * 0.07,
          0.025
        );

      const breathe =
        1 + Math.sin(time * 0.8) * 0.018;

      group.current.scale.setScalar(breathe);
    }

    if (innerRing.current) {
      innerRing.current.rotation.z += delta * 0.055;
      innerRing.current.rotation.x += delta * 0.018;
    }

    if (middleRing.current) {
      middleRing.current.rotation.z -= delta * 0.035;
      middleRing.current.rotation.y += delta * 0.02;
    }

    if (outerRing.current) {
      outerRing.current.rotation.x -= delta * 0.018;
      outerRing.current.rotation.y -= delta * 0.025;
    }
  });

  return (
    <group ref={group}>
      {/* Neural connections */}

      {connections.map(([start, end], index) => (
        <Line
          key={`connection-${index}`}
          points={[start, end]}
          color="#777777"
          transparent
          opacity={index % 7 === 0 ? 0.26 : 0.07}
          lineWidth={index % 7 === 0 ? 0.65 : 0.3}
        />
      ))}

      {/* Neural nodes */}

      {nodes.map((position, index) => {
        const active = index % 9 === 0;

        return (
          <mesh
            key={`node-${index}`}
            position={position}
          >
            <sphereGeometry
              args={[
                active ? 0.045 : 0.017,
                10,
                10,
              ]}
            />

            <meshStandardMaterial
              color={active ? "#ffffff" : "#666666"}
              emissive={active ? "#ffffff" : "#111111"}
              emissiveIntensity={active ? 2.8 : 0.2}
            />
          </mesh>
        );
      })}

      {/* Traveling information */}

      {pulses.map(([start, end], index) => (
        <DataParticle
          key={`data-${index}`}
          start={start}
          end={end}
          offset={index / pulses.length}
          speed={0.11 + (index % 3) * 0.025}
        />
      ))}

      {/* Inner ring */}

      <mesh
        ref={innerRing}
        rotation={[0.5, 0.2, 0.5]}
      >
        <torusGeometry args={[1.72, 0.005, 8, 180]} />

        <meshBasicMaterial
          color="#888888"
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Middle ring */}

      <mesh
        ref={middleRing}
        rotation={[1.2, 0.45, 0.15]}
      >
        <torusGeometry args={[2.25, 0.004, 8, 180]} />

        <meshBasicMaterial
          color="#777777"
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Outer ring */}

      <mesh
        ref={outerRing}
        rotation={[0.75, 1.1, 0.8]}
      >
        <torusGeometry args={[2.75, 0.003, 8, 180]} />

        <meshBasicMaterial
          color="#777777"
          transparent
          opacity={0.08}
        />
      </mesh>

      <OrbitNode
        radius={1.72}
        speed={0.25}
      />

      <OrbitNode
        radius={2.25}
        speed={-0.17}
        offset={2}
      />

      <OrbitNode
        radius={2.72}
        speed={0.11}
        offset={4}
      />
    </group>
  );
}

/* =========================================================
   3D CAMERA
========================================================= */

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x =
      THREE.MathUtils.lerp(
        state.camera.position.x,
        state.pointer.x * 0.38,
        0.025
      );

    state.camera.position.y =
      THREE.MathUtils.lerp(
        state.camera.position.y,
        state.pointer.y * 0.28,
        0.025
      );

    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

/* =========================================================
   3D CANVAS
========================================================= */

function NeuralUniverse() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 6.7],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.7} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
        />

        <pointLight
          position={[-3, 2, 4]}
          intensity={8}
          color="#ffffff"
        />

        <NeuralField />

        <Sparkles
          count={42}
          scale={[7, 7, 5]}
          size={1.1}
          speed={0.07}
          opacity={0.13}
          color="#777777"
        />

        <CameraRig />
      </Canvas>
    </div>
  );
}

/* =========================================================
   CURSOR AMBIENT LIGHT
========================================================= */

function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  const smoothX = useSpring(x, {
    stiffness: 90,
    damping: 25,
  });

  const smoothY = useSpring(y, {
    stiffness: 90,
    damping: 25,
  });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 250);
      y.set(event.clientY - 250);
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className="
        fixed
        left-0
        top-0
        z-[1]

        w-[500px]
        h-[500px]

        rounded-full

        bg-[radial-gradient(circle,rgba(0,0,0,0.045)_0%,rgba(0,0,0,0.015)_32%,transparent_68%)]

        dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.015)_32%,transparent_68%)]

        pointer-events-none
        lg:hidden
      "
    />
  );
}

/* =========================================================
   HOLOGRAPHIC PORTRAIT
========================================================= */

function HolographicPortrait() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 100,
    damping: 18,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 100,
    damping: 18,
  });

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-7, 7]
  );

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [6, -6]
  );

  const imageX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-5, 5]
  );

  const imageY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-4, 4]
  );

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;

    const rect =
      containerRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const reset = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className="
        relative
        w-full
        max-w-[430px]
        mx-auto
      "
    >
      {/* =============================================
          NEURAL UNIVERSE BEHIND
      ============================================= */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 0.8,
          scale: 1,
        }}
        transition={{
          duration: 1.6,
          delay: 0.35,
        }}
        className="
          absolute
          z-[1]

          -left-[38%]
          -top-[28%]

          w-[176%]
          h-[160%]

          pointer-events-none

          md:hidden
        "
      >
        <NeuralUniverse />
      </motion.div>

      {/* =============================================
          RADAR RINGS
      ============================================= */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          z-[2]

          -inset-[10%]

          rounded-full

          border
          border-dashed
          border-dark/[0.08]

          dark:border-light/[0.1]

          pointer-events-none

          md:hidden
        "
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 70,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          z-[2]

          -inset-[20%]

          rounded-full

          border
          border-dark/[0.04]

          dark:border-light/[0.07]

          pointer-events-none

          md:hidden
        "
      >
        <span
          className="
            absolute
            top-1/2
            -right-[3px]

            w-1.5
            h-1.5

            rounded-full

            bg-dark
            dark:bg-light

            shadow-[0_0_15px_currentColor]
          "
        />
      </motion.div>

      {/* =============================================
          CARD SHADOW / BACK PLATE
      ============================================= */}

      <div
        className="
          absolute
          z-[4]

          left-5
          top-5

          w-full
          h-full

          rounded-[1.75rem]

          border
          border-dark/20

          bg-dark

          dark:border-light/20
          dark:bg-light

          pointer-events-none
        "
      />

      {/* =============================================
          MAIN GLASS FRAME
      ============================================= */}

      <motion.div
        style={{
          x: imageX,
          y: imageY,
          translateZ: 45,
        }}
        className="
          relative
          z-10

          overflow-hidden

          rounded-[1.75rem]

          border
          border-dark/10

          bg-light/80

          p-3

          shadow-[0_35px_90px_rgba(0,0,0,0.18)]

          backdrop-blur-xl

          dark:border-light/10
          dark:bg-dark/80
        "
      >
        {/* CORNER BRACKETS */}

        <span
          className="
            absolute
            z-30
            left-5
            top-5

            w-8
            h-8

            border-l
            border-t
            border-dark/30

            dark:border-light/30

            pointer-events-none
          "
        />

        <span
          className="
            absolute
            z-30
            right-5
            top-5

            w-8
            h-8

            border-r
            border-t
            border-dark/30

            dark:border-light/30

            pointer-events-none
          "
        />

        <span
          className="
            absolute
            z-30
            left-5
            bottom-5

            w-8
            h-8

            border-l
            border-b
            border-dark/30

            dark:border-light/30

            pointer-events-none
          "
        />

        <span
          className="
            absolute
            z-30
            right-5
            bottom-5

            w-8
            h-8

            border-r
            border-b
            border-dark/30

            dark:border-light/30

            pointer-events-none
          "
        />

        {/* PORTRAIT */}

        <Image
          src={profilePic}
          alt="Syeda Shamama Afeef"
          priority
          sizes="
            (max-width: 760px) 100vw,
            (max-width: 1100px) 50vw,
            33vw
          "
          className="
            relative
            z-10

            w-full
            h-auto

            rounded-[1.25rem]
          "
        />

        {/* =============================================
            SCANNING BEAM
        ============================================= */}

        <motion.div
          initial={{
            top: "-10%",
          }}
          animate={{
            top: ["-10%", "110%", "-10%"],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
          className="
            absolute
            z-20

            left-[5%]

            w-[90%]
            h-[2px]

            bg-dark/30
            dark:bg-light/35

            shadow-[0_0_20px_currentColor]

            pointer-events-none
          "
        />

        {/* SCAN GRADIENT */}

        <motion.div
          initial={{ top: "-20%" }}
          animate={{
            top: ["-20%", "105%", "-20%"],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
          className="
            absolute
            z-[19]

            left-0

            w-full
            h-24

            bg-gradient-to-b
            from-transparent
            via-white/[0.07]
            to-transparent

            pointer-events-none
          "
        />

        {/* =============================================
            IDENTITY HUD
        ============================================= */}

        <div
          className="
            absolute
            z-30

            left-7
            right-7
            bottom-7

            flex
            items-center
            justify-between

            px-4
            py-3

            rounded-xl

            border
            border-white/30

            bg-white/75

            shadow-[0_12px_35px_rgba(0,0,0,0.12)]

            backdrop-blur-xl

            dark:border-white/10
            dark:bg-black/60
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold

                text-dark
                dark:text-light
              "
            >
              Syeda Shamama Afeef
            </p>

            <p
              className="
                mt-1

                text-[8px]
                font-bold

                uppercase
                tracking-[0.14em]

                text-dark/45
                dark:text-light/45
              "
            >
              AI Engineer • Data Scientist
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.span
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.15, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                w-2
                h-2

                rounded-full

                bg-dark
                dark:bg-light

                shadow-[0_0_12px_currentColor]
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.1em]

                text-dark/40
                dark:text-light/40

                sm:hidden
              "
            >
              AI SYSTEM ONLINE
            </span>
          </div>
        </div>
      </motion.div>

      {/* =============================================
          FLOATING HUD LABELS
          Kept OUTSIDE the face.
      ============================================= */}

      <FloatingHUD
        className="-left-[18%] top-[13%]"
        title="LLM"
        subtitle="Reason"
        delay={0.4}
      />

      <FloatingHUD
        className="-right-[22%] top-[27%]"
        title="AGENT"
        subtitle="Act"
        delay={0.7}
      />

      <FloatingHUD
        className="-left-[20%] bottom-[25%]"
        title="MLOPS"
        subtitle="Scale"
        delay={1}
      />

      <FloatingHUD
        className="-right-[18%] bottom-[13%]"
        title="CLOUD"
        subtitle="Deploy"
        delay={1.3}
      />
    </motion.div>
  );
}

/* =========================================================
   FLOATING HUD
========================================================= */

function FloatingHUD({
  title,
  subtitle,
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        y: 10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -7, 0],
      }}
      transition={{
        opacity: {
          duration: 0.7,
          delay,
        },

        scale: {
          duration: 0.7,
          delay,
        },

        y: {
          duration: 5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`
        absolute
        z-40

        min-w-[84px]

        rounded-xl

        border
        border-dark/[0.08]

        bg-white/80

        px-3
        py-2

        shadow-[0_10px_35px_rgba(0,0,0,0.08)]

        backdrop-blur-xl

        dark:border-light/10
        dark:bg-dark/80

        pointer-events-none

        md:hidden

        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        <span
          className="
            w-1
            h-1

            rounded-full

            bg-dark
            dark:bg-light
          "
        />

        <span
          className="
            text-[9px]
            font-black

            tracking-[0.12em]

            text-dark
            dark:text-light
          "
        >
          {title}
        </span>
      </div>

      <p
        className="
          mt-1
          ml-3

          text-[7px]
          font-semibold

          uppercase
          tracking-[0.14em]

          text-dark/40
          dark:text-light/40
        "
      >
        {subtitle}
      </p>
    </motion.div>
  );
}

/* =========================================================
   BIOGRAPHY REVEAL
========================================================= */

function BioParagraph({
  children,
  delay = 0,
  strong = false,
}) {
  return (
    <motion.p
      initial={{
        opacity: 0,
        y: 24,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        font-medium
        leading-[1.8]

        ${
          strong
            ? "text-lg font-semibold text-dark dark:text-light md:text-base"
            : "text-base text-dark/65 dark:text-light/65 md:text-sm"
        }
      `}
    >
      {children}
    </motion.p>
  );
}

/* =========================================================
   TECH CHIP
========================================================= */

function TechChip({ children, index = 0 }) {
  return (
    <motion.span
      initial={{
        opacity: 0,
        y: 10,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
      }}
      whileHover={{
        y: -4,
        scale: 1.04,
      }}
      className="
        relative
        overflow-hidden

        px-3
        py-2

        rounded-full

        border
        border-dark/10

        bg-light/70

        text-[9px]
        font-bold

        uppercase
        tracking-[0.12em]

        text-dark/60

        backdrop-blur-md

        shadow-[0_6px_18px_rgba(0,0,0,0.04)]

        dark:border-light/10
        dark:bg-light/[0.04]
        dark:text-light/60

        cursor-default
      "
    >
      {children}
    </motion.span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  value,
  suffix = "+",
  label,
  sublabel,
  index = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 35,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      className="
        group
        relative

        w-full

        overflow-hidden

        rounded-2xl

        border
        border-dark/[0.08]

        bg-light/70

        p-5

        shadow-[0_18px_50px_rgba(0,0,0,0.06)]

        backdrop-blur-xl

        dark:border-light/10
        dark:bg-light/[0.035]

        xl:w-[31%]
        md:p-4
        sm:w-full
      "
    >
      {/* Number */}

      <div className="relative z-10 flex items-end">
        <span
          className="
            text-5xl
            font-black

            tracking-[-0.06em]

            md:text-4xl
          "
        >
          <AnimatedNumbers value={value} />
        </span>

        <span
          className="
            mb-1
            ml-1

            text-xl
            font-bold

            text-dark/40
            dark:text-light/40
          "
        >
          {suffix}
        </span>
      </div>

      <h3
        className="
          relative
          z-10

          mt-2

          text-sm
          font-bold

          capitalize
        "
      >
        {label}
      </h3>

      <p
        className="
          relative
          z-10

          mt-1

          text-[9px]
          font-semibold

          uppercase
          tracking-[0.1em]

          text-dark/35
          dark:text-light/35
        "
      >
        {sublabel}
      </p>

      {/* Animated corner circle */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute

          -right-10
          -top-10

          w-28
          h-28

          rounded-full

          border
          border-dashed
          border-dark/[0.07]

          dark:border-light/[0.08]

          pointer-events-none
        "
      />

      {/* Hover sweep */}

      <div
        className="
          absolute
          inset-0

          translate-x-[-110%]

          bg-gradient-to-r
          from-transparent
          via-dark/[0.025]
          to-transparent

          transition-transform
          duration-700

          group-hover:translate-x-[110%]

          dark:via-light/[0.04]

          pointer-events-none
        "
      />
    </motion.div>
  );
}

/* =========================================================
   DYNAMIC AI PHILOSOPHY
========================================================= */

function PhilosophyTicker() {
  const items = [
    {
      word: "THINK",
      text: "Reason over knowledge",
    },
    {
      word: "ACT",
      text: "Execute through tools",
    },
    {
      word: "LEARN",
      text: "Adapt from feedback",
    },
    {
      word: "SCALE",
      text: "Operate in production",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div
      className="
        relative

        mt-7

        w-full

        overflow-hidden

        rounded-2xl

        border
        border-dark/[0.08]

        bg-dark
        text-light

        px-5
        py-4

        dark:bg-light
        dark:text-dark
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p
            className="
              text-[8px]
              font-bold

              uppercase
              tracking-[0.18em]

              opacity-40
            "
          >
            Engineering Philosophy
          </p>

          <div className="mt-2 h-[28px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={items[active].word}
                initial={{
                  opacity: 0,
                  y: 15,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  filter: "blur(4px)",
                }}
                transition={{
                  duration: 0.35,
                }}
                className="flex items-center gap-3"
              >
                <span
                  className="
                    text-sm
                    font-black

                    tracking-[0.14em]
                  "
                >
                  {items[active].word}
                </span>

                <span className="opacity-30">→</span>

                <span
                  className="
                    text-[10px]
                    font-medium

                    opacity-60
                  "
                >
                  {items[active].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-1.5">
          {items.map((_, index) => (
            <motion.span
              key={index}
              animate={{
                width: index === active ? 20 : 4,
                opacity: index === active ? 1 : 0.25,
              }}
              className="
                h-1
                rounded-full

                bg-light

                dark:bg-dark
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ABOUT PAGE
========================================================= */

const About = () => {
  return (
    <>
      <Head>
        <title>
          Syeda Shamama Afeef | AI Engineer • Data Scientist • About
        </title>

        <meta
          name="description"
          content="About Syeda Shamama Afeef, an AI Engineer and Data Scientist specializing in Agentic AI, Generative AI, LLMs, RAG, Machine Learning and production AI systems."
        />

        <meta
          name="keywords"
          content="Syeda Shamama Afeef, AI Engineer, Data Scientist, Agentic AI, Generative AI, LLM, RAG, Machine Learning, MLOps, Cloud AI"
        />
      </Head>

      <TransitionEffect />

      <main
        className="
          relative

          flex
          w-full
          flex-col

          items-center
          justify-center

          overflow-hidden

          text-dark
          dark:text-light
        "
      >
        {/* =================================================
            AMBIENT CURSOR
        ================================================= */}

        <CursorGlow />

        {/* =================================================
            BACKGROUND GRID
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            z-0

            opacity-[0.018]
            dark:opacity-[0.035]

            bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            bg-[size:64px_64px]

            pointer-events-none
          "
        />

        {/* BACKGROUND RADIAL FADE */}

        <div
          className="
            absolute
            inset-0
            z-[1]

            bg-[radial-gradient(circle_at_50%_12%,transparent_0%,white_72%)]

            dark:bg-[radial-gradient(circle_at_50%_12%,transparent_0%,#1b1b1b_78%)]

            pointer-events-none
          "
        />

        {/* MASSIVE BACKGROUND TEXT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1.4,
            delay: 0.3,
          }}
          className="
            absolute

            right-[-3%]
            top-[3%]

            z-[1]

            text-[13vw]
            font-black

            leading-none
            tracking-[-0.09em]

            text-dark/[0.018]

            dark:text-light/[0.018]

            select-none
            pointer-events-none

            lg:hidden
          "
        >
          INTELLIGENCE
        </motion.div>

        <Layout className="relative z-10 pt-16">
          {/* =================================================
              HERO TITLE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <AnimatedText
              text="Passion Fuels Purpose!"
              className="
                !text-7xl

                lg:!text-6xl
                sm:!text-5xl
                xs:!text-4xl
              "
            />
          </motion.div>

          {/* HERO EYEBROW */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="
              mt-5
              mb-20

              flex
              items-center
              justify-center

              gap-3

              md:mb-14
            "
          >
            <motion.span
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.35, 1, 0.35],
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
              }}
              className="
                w-1.5
                h-1.5

                rounded-full

                bg-dark
                dark:bg-light

                shadow-[0_0_12px_currentColor]
              "
            />

            <p
              className="
                text-[10px]
                font-bold

                uppercase
                tracking-[0.2em]

                text-dark/45
                dark:text-light/45

                sm:text-[8px]
              "
            >
              Building AI that can reason • act • learn • scale
            </p>
          </motion.div>

          {/* =================================================
              ABOUT GRID
          ================================================= */}

          <div
            className="
              relative

              grid
              w-full
              grid-cols-12

              items-center

              gap-12

              xl:gap-8
              lg:grid-cols-8
              md:gap-14
            "
          >
            {/* =================================================
                BIOGRAPHY
            ================================================= */}

            <div
              className="
                col-span-4

                lg:col-span-4

                md:order-2
                md:col-span-8
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                }}
                className="
                  flex
                  items-center

                  gap-3

                  mb-6
                "
              >
                <span
                  className="
                    w-10
                    h-px

                    bg-dark/30
                    dark:bg-light/30
                  "
                />

                <h2
                  className="
                    text-xs
                    font-black

                    uppercase
                    tracking-[0.2em]

                    text-dark/50
                    dark:text-light/50
                  "
                >
                  Biography
                </h2>
              </motion.div>

              <div className="space-y-4">
                <BioParagraph strong>
                  Hi, I&apos;m{" "}
                  <span className="font-black">
                    Syeda Shamama Afeef
                  </span>
                  , an AI Engineer and Data Scientist
                  focused on engineering intelligent
                  systems that connect advanced AI
                  research with measurable real-world
                  impact.
                </BioParagraph>

                <BioParagraph delay={0.08}>
                  My work spans machine learning, deep
                  learning, NLP, computer vision, LLMs,
                  Generative AI, Agentic AI and MLOps —
                  with a focus on systems that can
                  retrieve knowledge, reason over
                  context, use tools and execute
                  workflows.
                </BioParagraph>

                <BioParagraph delay={0.16}>
                  I build end-to-end AI solutions across
                  AWS, Azure and GCP, combining model
                  development with APIs, cloud
                  infrastructure, Docker, Kubernetes,
                  observability and production-grade
                  deployment practices.
                </BioParagraph>

                <BioParagraph delay={0.24}>
                  My goal is to create AI that goes
                  beyond prediction: systems that
                  understand context, collaborate,
                  adapt and reliably turn intelligence
                  into action.
                </BioParagraph>
              </div>

              {/* TECH STACK */}

              <div
                className="
                  flex
                  flex-wrap

                  gap-2

                  mt-7
                "
              >
                {[
                  "Agentic AI",
                  "Generative AI",
                  "LLMs",
                  "RAG",
                  "Machine Learning",
                  "MLOps",
                  "GCP",
                  "Azure",
                  "AWS",
                ].map((item, index) => (
                  <TechChip
                    key={item}
                    index={index}
                  >
                    {item}
                  </TechChip>
                ))}
              </div>

              <PhilosophyTicker />
            </div>

            {/* =================================================
                HOLOGRAPHIC PORTRAIT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                col-span-5

                lg:col-span-4

                md:order-1
                md:col-span-8
              "
            >
              <HolographicPortrait />
            </motion.div>

            {/* =================================================
                STATS
            ================================================= */}

            <div
              className="
                col-span-3

                flex
                flex-col

                gap-4

                lg:col-span-8
                lg:flex-row

                md:order-3

                sm:flex-col
              "
            >
              <StatCard
                value={56}
                suffix="+"
                label="Projects Completed"
                sublabel="AI • ML • LLM • Automation"
                index={0}
              />

              <StatCard
                value={3.5}
                suffix="+"
                label="Years Experience"
                sublabel="Applied AI Engineering"
                index={1}
              />

              <StatCard
                value={3}
                suffix=""
                label="Cloud Platforms"
                sublabel="AWS • Azure • GCP"
                index={2}
              />
            </div>
          </div>

          {/* =================================================
              SECTION TRANSITION
          ================================================= */}

          <div
            className="
              relative

              mt-32
              mb-8

              flex
              items-center

              gap-5
            "
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
              }}
              className="
                h-px
                flex-1

                origin-left

                bg-dark/10
                dark:bg-light/10
              "
            />

            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
              }}
              className="
                flex
                items-center

                gap-2

                text-[8px]
                font-bold

                uppercase
                tracking-[0.2em]

                text-dark/35
                dark:text-light/35
              "
            >
              <motion.span
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  w-1
                  h-1

                  rounded-full

                  bg-dark
                  dark:bg-light
                "
              />

              Explore the system
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
              }}
              className="
                h-px
                flex-1

                origin-right

                bg-dark/10
                dark:bg-light/10
              "
            />
          </div>

          {/* =================================================
              EXISTING SECTIONS
          ================================================= */}

          <Skills />

          <Experience />

          <Education />
        </Layout>
      </main>
    </>
  );
};

export default About;
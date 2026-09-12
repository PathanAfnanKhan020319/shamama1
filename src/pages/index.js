import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Line,
  Sparkles,
  Html,
} from "@react-three/drei";

import profilePic from "../../public/images/profile/bebo 3.png";

import { LinkArrow } from "@/components/Icon";
import HireMe from "@/components/HireMe";
import TransitionEffect from "@/components/TransitionEffect";

/* =========================================================
   DATA
========================================================= */

const skills = [
  {
    label: "LLMs",
    detail: "OpenAI • Gemini • Claude",
    radius: 2.25,
    speed: 0.18,
    offset: 0,
  },
  {
    label: "RAG",
    detail: "Embeddings • Vector Search",
    radius: 2.25,
    speed: 0.18,
    offset: Math.PI / 3,
  },
  {
    label: "AGENTS",
    detail: "LangGraph • Tool Calling",
    radius: 2.25,
    speed: 0.18,
    offset: (Math.PI * 2) / 3,
  },
  {
    label: "ML",
    detail: "PyTorch • TensorFlow",
    radius: 2.25,
    speed: 0.18,
    offset: Math.PI,
  },
  {
    label: "MLOPS",
    detail: "MLflow • Docker • K8s",
    radius: 2.25,
    speed: 0.18,
    offset: (Math.PI * 4) / 3,
  },
  {
    label: "CLOUD",
    detail: "GCP • Azure • AWS",
    radius: 2.25,
    speed: 0.18,
    offset: (Math.PI * 5) / 3,
  },
];

/* =========================================================
   ORBITAL SKILL
========================================================= */

function OrbitalSkill({
  label,
  detail,
  radius,
  speed,
  offset,
  index,
}) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;

    const time =
      state.clock.elapsedTime * speed + offset;

    ref.current.position.x =
      Math.cos(time) * radius;

    ref.current.position.z =
      Math.sin(time) * radius * 0.65;

    ref.current.position.y =
      Math.sin(time * 1.7 + index) * 0.55;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3}
        />
      </mesh>

      <Html
        center
        distanceFactor={7}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            transform: "translateY(-30px)",
            whiteSpace: "nowrap",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(0,0,0,0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            color: "#111",
            fontSize: "9px",
            fontWeight: "800",
            letterSpacing: "0.12em",
          }}
        >
          {label}

          <span
            style={{
              display: "block",
              marginTop: "2px",
              fontSize: "6px",
              fontWeight: "600",
              opacity: 0.55,
              letterSpacing: "0.04em",
            }}
          >
            {detail}
          </span>
        </div>
      </Html>
    </group>
  );
}

/* =========================================================
   DATA PULSE
========================================================= */

function DataPulse({
  start,
  end,
  delay,
  speed = 0.35,
}) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;

    const time =
      (state.clock.elapsedTime * speed + delay) % 1;

    ref.current.position.lerpVectors(
      start,
      end,
      time
    );

    const pulse =
      0.8 + Math.sin(time * Math.PI) * 1.5;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.022, 10, 10]} />

      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

/* =========================================================
   NEURAL AI SYSTEM
========================================================= */

function NeuralSystem() {
  const systemRef = useRef(null);
  const coreRef = useRef(null);
  const innerCoreRef = useRef(null);
  const shellRef = useRef(null);

  const ring1 = useRef(null);
  const ring2 = useRef(null);
  const ring3 = useRef(null);

  const nodes = useMemo(() => {
    const points = [];

    // Deterministic-ish distribution
    for (let i = 0; i < 72; i++) {
      const radius =
        1.35 + ((i * 17) % 100) / 65;

      const theta =
        i * 2.399963229728653;

      const y =
        1 - (i / 71) * 2;

      const horizontal =
        Math.sqrt(1 - y * y);

      points.push(
        new THREE.Vector3(
          Math.cos(theta) *
            horizontal *
            radius,
          y * radius,
          Math.sin(theta) *
            horizontal *
            radius
        )
      );
    }

    return points;
  }, []);

  const connections = useMemo(() => {
    const result = [];

    for (let i = 0; i < nodes.length; i++) {
      for (
        let j = i + 1;
        j < nodes.length;
        j++
      ) {
        const distance =
          nodes[i].distanceTo(nodes[j]);

        if (
          distance < 0.95 &&
          result.length < 145
        ) {
          result.push([
            nodes[i],
            nodes[j],
          ]);
        }
      }
    }

    return result;
  }, [nodes]);

  const pulseConnections = useMemo(() => {
    return connections
      .filter((_, index) => index % 9 === 0)
      .slice(0, 14);
  }, [connections]);

  useFrame((state, delta) => {
    const time =
      state.clock.elapsedTime;

    if (systemRef.current) {
      systemRef.current.rotation.y +=
        delta * 0.035;

      systemRef.current.rotation.x =
        THREE.MathUtils.lerp(
          systemRef.current.rotation.x,
          state.pointer.y * 0.15,
          0.025
        );

      systemRef.current.rotation.z =
        THREE.MathUtils.lerp(
          systemRef.current.rotation.z,
          -state.pointer.x * 0.08,
          0.025
        );
    }

    if (coreRef.current) {
      coreRef.current.rotation.x +=
        delta * 0.16;

      coreRef.current.rotation.y +=
        delta * 0.22;

      const scale =
        1 +
        Math.sin(time * 2.5) * 0.055;

      coreRef.current.scale.setScalar(
        scale
      );
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -=
        delta * 0.25;

      innerCoreRef.current.rotation.y +=
        delta * 0.35;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -=
        delta * 0.08;

      shellRef.current.rotation.z +=
        delta * 0.06;
    }

    if (ring1.current) {
      ring1.current.rotation.z +=
        delta * 0.08;
    }

    if (ring2.current) {
      ring2.current.rotation.x +=
        delta * 0.055;

      ring2.current.rotation.z -=
        delta * 0.04;
    }

    if (ring3.current) {
      ring3.current.rotation.y -=
        delta * 0.065;
    }
  });

  return (
    <group ref={systemRef}>
      {/* =============================================
          NETWORK CONNECTIONS
      ============================================= */}

      {connections.map(
        ([start, end], index) => (
          <Line
            key={`line-${index}`}
            points={[start, end]}
            color="#777777"
            transparent
            opacity={
              index % 7 === 0
                ? 0.28
                : 0.1
            }
            lineWidth={
              index % 7 === 0
                ? 0.7
                : 0.35
            }
          />
        )
      )}

      {/* =============================================
          NETWORK NODES
      ============================================= */}

      {nodes.map((position, index) => {
        const primary =
          index % 11 === 0;

        return (
          <mesh
            key={`node-${index}`}
            position={position}
          >
            <sphereGeometry
              args={[
                primary
                  ? 0.052
                  : 0.022,
                12,
                12,
              ]}
            />

            <meshStandardMaterial
              color={
                primary
                  ? "#ffffff"
                  : "#7d7d7d"
              }
              emissive={
                primary
                  ? "#ffffff"
                  : "#111111"
              }
              emissiveIntensity={
                primary ? 3 : 0.35
              }
            />
          </mesh>
        );
      })}

      {/* =============================================
          TRAVELLING SIGNALS
      ============================================= */}

      {pulseConnections.map(
        ([start, end], index) => (
          <DataPulse
            key={`pulse-${index}`}
            start={start}
            end={end}
            delay={index / 14}
            speed={
              0.2 +
              (index % 4) * 0.035
            }
          />
        )
      )}

      {/* =============================================
          AI CORE
      ============================================= */}

      <Float
        speed={1.3}
        rotationIntensity={0.12}
        floatIntensity={0.25}
      >
        {/* Outer glass shell */}

        <mesh
          ref={shellRef}
          scale={1.35}
        >
          <icosahedronGeometry
            args={[0.6, 2]}
          />

          <meshPhysicalMaterial
            color="#777777"
            wireframe
            transparent
            opacity={0.09}
          />
        </mesh>

        {/* Main metallic core */}

        <mesh ref={coreRef}>
          <icosahedronGeometry
            args={[0.62, 4]}
          />

          <meshPhysicalMaterial
            color="#111111"
            metalness={0.92}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Wireframe */}

        <mesh
          ref={innerCoreRef}
          scale={1.12}
        >
          <icosahedronGeometry
            args={[0.62, 2]}
          />

          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* White intelligence center */}

        <mesh scale={0.25}>
          <sphereGeometry
            args={[0.7, 24, 24]}
          />

          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={5}
          />
        </mesh>

        {/* Core aura */}

        <mesh scale={1.5}>
          <sphereGeometry
            args={[0.7, 32, 32]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.018}
            side={THREE.BackSide}
          />
        </mesh>
      </Float>

      {/* =============================================
          ORBIT RINGS
      ============================================= */}

      <mesh
        ref={ring1}
        rotation={[1.1, 0.3, 0.2]}
      >
        <torusGeometry
          args={[
            1.75,
            0.006,
            10,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#777777"
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh
        ref={ring2}
        rotation={[0.6, 1.1, 0.5]}
      >
        <torusGeometry
          args={[
            2.2,
            0.004,
            10,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#999999"
          transparent
          opacity={0.17}
        />
      </mesh>

      <mesh
        ref={ring3}
        rotation={[1.4, 0.8, 1.2]}
      >
        <torusGeometry
          args={[
            2.65,
            0.003,
            10,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#888888"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* =============================================
          ORBITING SKILLS
      ============================================= */}

      {skills.map((skill, index) => (
        <OrbitalSkill
          key={skill.label}
          {...skill}
          index={index}
        />
      ))}
    </group>
  );
}

/* =========================================================
   CAMERA RIG
========================================================= */

function CameraRig() {
  useFrame((state) => {
    const targetX =
      state.pointer.x * 0.42;

    const targetY =
      state.pointer.y * 0.28;

    state.camera.position.x =
      THREE.MathUtils.lerp(
        state.camera.position.x,
        targetX,
        0.025
      );

    state.camera.position.y =
      THREE.MathUtils.lerp(
        state.camera.position.y,
        targetY,
        0.025
      );

    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

/* =========================================================
   3D UNIVERSE
========================================================= */

function AIUniverse() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference:
            "high-performance",
        }}
      >
        <ambientLight intensity={0.7} />

        <directionalLight
          position={[4, 5, 6]}
          intensity={1.8}
        />

        <pointLight
          position={[3, 3, 5]}
          intensity={15}
          color="#ffffff"
        />

        <pointLight
          position={[-3, -2, 3]}
          intensity={6}
          color="#777777"
        />

        <NeuralSystem />

        {/* Deep particles */}

        <Sparkles
          count={110}
          scale={[9, 7, 5]}
          size={1.25}
          speed={0.12}
          opacity={0.16}
          color="#777777"
        />

        <CameraRig />
      </Canvas>
    </div>
  );
}

/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function MagneticButton({
  children,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 170,
    damping: 14,
  });

  const springY = useSpring(y, {
    stiffness: 170,
    damping: 14,
  });

  const handleMouseMove = (event) => {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    x.set(
      (event.clientX -
        rect.left -
        rect.width / 2) *
        0.22
    );

    y.set(
      (event.clientY -
        rect.top -
        rect.height / 2) *
        0.22
    );
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   CURSOR SPOTLIGHT
========================================================= */

function CursorSpotlight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  const smoothX = useSpring(x, {
    stiffness: 90,
    damping: 22,
  });

  const smoothY = useSpring(y, {
    stiffness: 90,
    damping: 22,
  });

  return (
    <motion.div
      onPointerMove={(event) => {
        x.set(event.clientX - 250);
        y.set(event.clientY - 250);
      }}
      onPointerLeave={() => {
        x.set(-500);
        y.set(-500);
      }}
      className="
        absolute
        inset-0
        z-[1]
        pointer-events-auto
        lg:hidden
      "
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          rounded-full
          pointer-events-none
          bg-[radial-gradient(circle,rgba(0,0,0,0.035)_0%,rgba(0,0,0,0.012)_35%,transparent_70%)]
          dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.015)_35%,transparent_70%)]
        "
      />
    </motion.div>
  );
}

/* =========================================================
   ANIMATED WORD
========================================================= */

function ActionWord({
  children,
  delay,
}) {
  return (
    <motion.span
      initial={{
        opacity: 0,
        y: 18,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -3,
      }}
      className="
        relative
        inline-block
        cursor-default
      "
    >
      {children}
    </motion.span>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [loaded, setLoaded] =
    useState(false);

  return (
    <>
      <Head>
        <title>
          Syeda Shamama Afeef | AI Engineer • Data Scientist • Agentic AI • Generative AI
        </title>

        <meta
          name="description"
          content="Portfolio of Syeda Shamama Afeef, an AI Engineer and Data Scientist specializing in Agentic AI, Generative AI, LLMs, RAG, Machine Learning, and production-grade AI systems."
        />

        <meta
          name="keywords"
          content="Syeda Shamama Afeef, AI Engineer, Data Scientist, Agentic AI Engineer, Generative AI Engineer, LLM Engineer, Machine Learning Engineer, RAG, LangGraph, LangChain, MLOps, GCP, Azure"
        />

        <meta
          name="author"
          content="Syeda Shamama Afeef"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          property="og:title"
          content="Syeda Shamama Afeef | AI Engineer & Data Scientist"
        />

        <meta
          property="og:description"
          content="Building intelligent AI systems that think, act, and scale."
        />

        <meta
          property="og:type"
          content="website"
        />

        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <TransitionEffect />

      <main
        onMouseEnter={() =>
          setLoaded(true)
        }
        className="
          relative
          flex
          items-center
          w-full
          min-h-screen
          overflow-hidden
          text-dark
          dark:text-light
          selection:bg-dark
          selection:text-light
          dark:selection:bg-light
          dark:selection:text-dark
        "
      >
        {/* =================================================
            BACKGROUND GRID
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            z-0
            pointer-events-none
            opacity-[0.022]
            dark:opacity-[0.045]
            bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            bg-[size:52px_52px]
          "
        />

        {/* Grid fade */}

        <div
          className="
            absolute
            inset-0
            z-0
            pointer-events-none
            bg-[radial-gradient(circle_at_center,transparent_10%,white_75%)]
            dark:bg-[radial-gradient(circle_at_center,transparent_10%,#1b1b1b_80%)]
          "
        />

        {/* =================================================
            CURSOR LIGHT
        ================================================= */}

        <CursorSpotlight />

        {/* =================================================
            GIANT BACKGROUND TYPOGRAPHY
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1.8,
            delay: 0.4,
          }}
          className="
            absolute
            z-[1]
            right-[-2%]
            bottom-[-3%]
            text-[15vw]
            leading-none
            font-black
            tracking-[-0.09em]
            text-dark/[0.025]
            dark:text-light/[0.025]
            pointer-events-none
            select-none
            lg:hidden
          "
        >
          AI
        </motion.div>

        {/* =================================================
            3D WORLD BEHIND PORTRAIT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 0.72,
            scale: 1,
          }}
          transition={{
            duration: 1.8,
            delay: 0.2,
          }}
          className="
            absolute
            z-[2]
            left-[-9%]
            top-[2%]
            w-[67vw]
            h-[92vh]
            dark:opacity-90
            lg:hidden
          "
        >
          <AIUniverse />
        </motion.div>

        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div
            className="
              relative
              z-10
              flex
              items-center
              justify-between
              w-full
              lg:flex-col
            "
          >
            {/* =================================================
                LEFT / PORTRAIT
            ================================================= */}

            <div
              className="
                relative
                w-1/2
                md:w-full
              "
            >
              {/* Halo */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 55,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  z-[3]
                  left-[8%]
                  top-[9%]
                  w-[78%]
                  aspect-square
                  rounded-full
                  border
                  border-dark/[0.06]
                  dark:border-light/[0.09]
                  lg:hidden
                "
              >
                <div
                  className="
                    absolute
                    left-1/2
                    top-[-4px]
                    w-2
                    h-2
                    rounded-full
                    bg-dark
                    dark:bg-light
                    shadow-[0_0_15px_currentColor]
                  "
                />
              </motion.div>

              {/* Portrait */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -80,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 1.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  relative
                  z-[7]
                "
              >
                <Image
                  src={profilePic}
                  alt="Syeda Shamama Afeef - AI Engineer and Data Scientist"
                  priority
                  onLoad={() =>
                    setLoaded(true)
                  }
                  sizes="
                    (max-width: 700px) 100vw,
                    (max-width: 1000px) 50vw,
                    50vw
                  "
                  className="
                    w-full
                    h-auto
                    lg:hidden
                    md:inline-block
                    md:w-full
                    drop-shadow-[0_35px_40px_rgba(0,0,0,0.16)]
                  "
                />
              </motion.div>

              {/* Foreground particles */}

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  x: [0, 6, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  z-[9]
                  top-[31%]
                  left-[18%]
                  w-2
                  h-2
                  rounded-full
                  bg-dark/50
                  dark:bg-light/70
                  shadow-[0_0_20px_currentColor]
                  lg:hidden
                "
              />

              <motion.div
                animate={{
                  y: [0, 14, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  z-[9]
                  top-[45%]
                  right-[14%]
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-dark/40
                  dark:bg-light/60
                  shadow-[0_0_18px_currentColor]
                  lg:hidden
                "
              />
            </div>

            {/* =================================================
                RIGHT / CONTENT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 70,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative
                z-20
                w-1/2
                flex
                flex-col
                items-center
                self-center
                lg:w-full
                lg:text-center
              "
            >
              {/* ROLE */}

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
                  delay: 0.35,
                }}
                className="
                  flex
                  items-center
                  w-full
                  mb-4
                  lg:justify-center
                "
              >
                <motion.span
                  animate={{
                    opacity: [
                      0.4,
                      1,
                      0.4,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    inline-block
                    w-2
                    h-2
                    mr-3
                    rounded-full
                    bg-dark
                    dark:bg-light
                    shadow-[0_0_12px_currentColor]
                  "
                />

                <p
                  className="
                    text-sm
                    font-semibold
                    tracking-[0.18em]
                    uppercase
                    text-dark/70
                    dark:text-light/70
                    sm:text-xs
                  "
                >
                  AI Engineer • Data Scientist • Agentic AI • Generative AI
                </p>
              </motion.div>

              {/* =================================================
                  MAIN HEADING
              ================================================= */}

              <div className="w-full">
                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="
                    text-[4.1rem]
                    leading-[0.95]
                    font-bold
                    tracking-[-0.045em]
                    text-left
                    xl:text-5xl
                    lg:text-center
                    lg:text-6xl
                    md:text-5xl
                    sm:text-3xl
                  "
                >
                  Building Intelligent
                  <br />

                  <span
                    className="
                      relative
                      inline-block
                    "
                  >
                    AI Systems
                  </span>
                </motion.h1>

                {/* THINK ACT SCALE */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mt-4
                    text-lg
                    font-semibold
                    tracking-[0.12em]
                    uppercase
                    text-dark/55
                    dark:text-light/55
                    lg:justify-center
                    md:text-base
                    sm:text-sm
                    sm:gap-2
                  "
                >
                  <ActionWord delay={0.8}>
                    Think
                  </ActionWord>

                  <span>•</span>

                  <ActionWord delay={1}>
                    Act
                  </ActionWord>

                  <span>•</span>

                  <ActionWord delay={1.2}>
                    Scale
                  </ActionWord>
                </div>
              </div>

              {/* STACK */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.75,
                }}
                className="
                  w-full
                  mt-5
                  text-base
                  font-semibold
                  text-dark/80
                  dark:text-light/80
                  lg:text-center
                  md:text-sm
                "
              >
                LLMs • RAG • Multi-Agent Systems • Machine Learning • MLOps
              </motion.p>

              {/* DESCRIPTION */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                }}
                className="
                  my-6
                  text-base
                  font-medium
                  leading-relaxed
                  text-dark/75
                  dark:text-light/75
                  md:text-sm
                  sm:text-xs
                "
              >
                Hi, I&apos;m{" "}
                <span
                  className="
                    font-semibold
                    text-dark
                    dark:text-light
                  "
                >
                  Syeda Shamama Afeef
                </span>
                , an AI Engineer and Data Scientist specializing in Agentic AI,
                Generative AI, LLMs, RAG, Machine Learning, and production-grade
                AI systems. I build intelligent solutions that go beyond
                predictions — systems that retrieve knowledge, reason, make
                decisions, use tools, and execute real-world workflows across
                enterprise and healthcare environments.
              </motion.p>

              {/* =================================================
                  CTA
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1.05,
                }}
                className="
                  flex
                  items-center
                  self-start
                  mt-1
                  lg:self-center
                "
              >
                <MagneticButton>
                  <Link
                    href="/Resum_syeda_shamama_afeef123.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      flex
                      items-center
                      bg-dark
                      text-light
                      p-2.5
                      px-6
                      rounded-lg
                      text-lg
                      font-semibold
                      border-2
                      border-solid
                      border-transparent
                      shadow-[0_12px_35px_rgba(0,0,0,0.16)]

                      hover:bg-light
                      hover:text-dark
                      hover:border-dark

                      dark:bg-light
                      dark:text-dark

                      hover:dark:bg-dark
                      hover:dark:text-light
                      hover:dark:border-light

                      md:p-2
                      md:px-4
                      md:text-base

                      transition-all
                      duration-300
                    "
                  >
                    Resume

                    <motion.span
                      className="inline-flex"
                      whileHover={{
                        x: 3,
                        y: -3,
                      }}
                    >
                      <LinkArrow className="w-6 ml-1" />
                    </motion.span>
                  </Link>
                </MagneticButton>

                <motion.div
                  whileHover={{
                    x: 5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                  }}
                >
                  <Link
                    href="mailto:syedashamama459@gmail.com"
                    className="
                      ml-4
                      text-lg
                      font-medium
                      capitalize
                      text-dark
                      underline
                      underline-offset-4
                      dark:text-light
                      md:text-base
                    "
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>

              {/* =================================================
                  MINI STATUS BAR
              ================================================= */}

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
                  duration: 0.8,
                  delay: 1.2,
                }}
                className="
                  w-full
                  flex
                  items-center
                  flex-wrap
                  gap-x-3
                  gap-y-2
                  mt-8
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-dark/45
                  dark:text-light/45
                  lg:justify-center
                  sm:hidden
                "
              >
                <span>
                  Production AI
                </span>

                <span>•</span>

                <span>
                  Healthcare AI
                </span>

                <span>•</span>

                <span>
                  Agentic Systems
                </span>

                <span>•</span>

                <span>
                  Cloud AI
                </span>
              </motion.div>
            </motion.div>
          </div>
        </Layout>

        {/* =================================================
            HIRE ME
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.65,
            rotate: -20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1,
            delay: 1.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-30"
        >
          <HireMe />
        </motion.div>
      </main>
    </>
  );
}
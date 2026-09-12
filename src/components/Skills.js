"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Line,
  PointMaterial,
  Points,
  Sparkles,
} from "@react-three/drei";
import useMediaQuery from "@/components/hooks/useMediaQuery";

/* ============================================================
   SKILLS DATA
============================================================ */

const CAPABILITIES = [
  {
    id: "agentic",
    number: "01",
    short: "AGENTS",
    eyebrow: "AUTONOMOUS SYSTEMS",
    title1: "AGENTIC",
    title2: "AI.",
    statement: "REASON / PLAN / ACT",
    description:
      "I design intelligent AI systems that reason over context, retrieve knowledge, call tools, maintain state, and coordinate multi-step workflows.",
    stack: [
      "LangGraph",
      "LangChain",
      "CrewAI",
      "RAG",
      "Tool Calling",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "LLM Evals",
    ],
    metric: "MULTI-AGENT",
    metricLabel: "SYSTEM DESIGN",
    proof:
      "Production-oriented agent architectures combining retrieval, orchestration, tool execution, memory, and reliable structured outputs.",
    shape: "helix",
  },

  {
    id: "genai",
    number: "02",
    short: "GEN AI",
    eyebrow: "GENERATIVE INTELLIGENCE",
    title1: "GENERATIVE",
    title2: "AI.",
    statement: "RETRIEVE / GROUND / GENERATE",
    description:
      "I build grounded LLM applications using retrieval, embeddings, structured prompting, vector search, and production-grade conversational AI patterns.",
    stack: [
      "LLMs",
      "Azure OpenAI",
      "Gemini",
      "Claude",
      "Embeddings",
      "Vector Search",
      "RAG Pipelines",
      "Structured Generation",
    ],
    metric: "21+",
    metricLabel: "STRUCTURED AI PROMPTS",
    proof:
      "Designed structured prompt systems and analytical frameworks for domain-aware AI applications with factual grounding and guardrails.",
    shape: "wave",
  },

  {
    id: "ml",
    number: "03",
    short: "ML",
    eyebrow: "PREDICTIVE INTELLIGENCE",
    title1: "MACHINE",
    title2: "LEARNING.",
    statement: "LEARN / PREDICT / OPTIMIZE",
    description:
      "From classical machine learning to deep neural networks, I build models across structured data, NLP, computer vision, forecasting, and predictive analytics.",
    stack: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost",
      "Deep Learning",
      "NLP",
      "Computer Vision",
    ],
    metric: "END-TO-END",
    metricLabel: "ML LIFECYCLE",
    proof:
      "Hands-on across feature engineering, experimentation, training, evaluation, optimization, deployment, and production inference.",
    shape: "brain",
  },

  {
    id: "data",
    number: "04",
    short: "DATA",
    eyebrow: "DATA FOUNDATION",
    title1: "DATA",
    title2: "ENGINEERING.",
    statement: "INGEST / TRANSFORM / MODEL",
    description:
      "I engineer reliable modelling layers, feature stores, validation workflows, and scalable pipelines that transform complex raw datasets into ML-ready intelligence.",
    stack: [
      "SQL",
      "BigQuery",
      "Apache Spark",
      "Kafka",
      "ETL Pipelines",
      "Feature Engineering",
      "EDA",
      "Data Validation",
    ],
    metric: "471",
    metricLabel: "ENGINEERED FEATURES",
    proof:
      "Built modelling-ready healthcare datasets by integrating clinical, analytical, and ML-derived feature sources in BigQuery.",
    shape: "grid",
  },

  {
    id: "cloud",
    number: "05",
    short: "CLOUD",
    eyebrow: "DISTRIBUTED INTELLIGENCE",
    title1: "CLOUD",
    title2: "AI.",
    statement: "DEPLOY / SERVE / SCALE",
    description:
      "I deploy AI workloads across cloud-native infrastructure using managed ML platforms, scalable APIs, containerized services, and production data systems.",
    stack: [
      "GCP",
      "Vertex AI",
      "BigQuery",
      "Cloud Run",
      "Azure",
      "Azure OpenAI",
      "AWS",
      "GKE",
    ],
    metric: "3",
    metricLabel: "MAJOR CLOUDS",
    proof:
      "Production and project experience spanning Google Cloud, Microsoft Azure, and AWS across AI, data, and deployment workloads.",
    shape: "cloud",
  },

  {
    id: "mlops",
    number: "06",
    short: "MLOPS",
    eyebrow: "PRODUCTION ENGINEERING",
    title1: "MLOPS",
    title2: "& SYSTEMS.",
    statement: "SHIP / OBSERVE / IMPROVE",
    description:
      "I build the infrastructure around AI: deployment, orchestration, observability, CI/CD, monitoring, and reliability engineering for production systems.",
    stack: [
      "Docker",
      "Kubernetes",
      "MLflow",
      "Airflow",
      "GitHub Actions",
      "Evidently AI",
      "FastAPI",
      "CI/CD",
    ],
    metric: "60–70%",
    metricLabel: "LESS MANUAL DEBUGGING",
    proof:
      "Designed monitoring and automation workflows focused on faster recovery, scalable deployment, observability, and reliable model operations.",
    shape: "tunnel",
  },
];

/* ============================================================
   CONSTANTS
============================================================ */

const PARTICLE_COUNT = 720;
const TAU = Math.PI * 2;

const seededRandom = (seed) => {
  const x =
    Math.sin(seed * 12.9898) *
    43758.5453123;

  return x - Math.floor(x);
};

/* ============================================================
   RESPONSIVE WEBGL MODE
============================================================ */

function useWebGLMode() {
  const [mode, setMode] =
    useState("desktop");

  useEffect(() => {
    const update = () => {
      const width =
        window.innerWidth;

      if (width < 768) {
        setMode("mobile");
      } else if (width < 1100) {
        setMode("tablet");
      } else {
        setMode("desktop");
      }
    };

    update();

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      window.removeEventListener(
        "resize",
        update
      );
    };
  }, []);

  return mode;
}

/* ============================================================
   PARTICLE FORMATIONS
============================================================ */

function createFormation(
  type,
  count = PARTICLE_COUNT
) {
  const positions =
    new Float32Array(
      count * 3
    );

  for (
    let i = 0;
    i < count;
    i++
  ) {
    const t =
      i / count;

    let x = 0;
    let y = 0;
    let z = 0;

    /* AGENTIC AI */

    if (type === "helix") {
      const strand =
        i % 2 === 0
          ? 1
          : -1;

      const angle =
        t *
          Math.PI *
          15 +
        (strand === -1
          ? Math.PI
          : 0);

      const radius =
        1.25;

      x =
        Math.cos(angle) *
        radius;

      y =
        (t - 0.5) *
        4.8;

      z =
        Math.sin(angle) *
        radius;

      x +=
        (seededRandom(
          i + 1
        ) -
          0.5) *
        0.08;

      z +=
        (seededRandom(
          i + 10
        ) -
          0.5) *
        0.08;
    }

    /* GENERATIVE AI */

    else if (
      type === "wave"
    ) {
      const columns = 32;

      const row =
        Math.floor(
          i / columns
        );

      const column =
        i % columns;

      x =
        (column /
          (columns - 1) -
          0.5) *
        5.2;

      y =
        (row /
          Math.ceil(
            count /
              columns
          ) -
          0.5) *
        4.2;

      z =
        Math.sin(
          x * 1.8
        ) *
          0.65 +
        Math.cos(
          y * 2.1
        ) *
          0.42 +
        Math.sin(
          (x + y) *
            1.35
        ) *
          0.2;
    }

    /* MACHINE LEARNING */

    else if (
      type === "brain"
    ) {
      const phi =
        Math.acos(
          1 - 2 * t
        );

      const theta =
        Math.PI *
        (1 +
          Math.sqrt(5)) *
        i;

      const noise =
        Math.sin(
          theta * 3
        ) *
          0.11 +
        Math.sin(
          phi * 8
        ) *
          0.09;

      const radius =
        1.62 + noise;

      x =
        radius *
        Math.sin(phi) *
        Math.cos(theta) *
        1.12;

      y =
        radius *
        Math.cos(phi);

      z =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      if (x > 0) {
        x += 0.08;
      } else {
        x -= 0.08;
      }
    }

    /* DATA ENGINEERING */

    else if (
      type === "grid"
    ) {
      const side =
        Math.ceil(
          Math.cbrt(
            count
          )
        );

      const ix =
        i % side;

      const iy =
        Math.floor(
          i / side
        ) % side;

      const iz =
        Math.floor(
          i /
            (side *
              side)
        );

      const center =
        (side - 1) / 2;

      x =
        (ix - center) *
        0.42;

      y =
        (iy - center) *
        0.42;

      z =
        (iz - center) *
        0.42;

      x +=
        Math.sin(
          iy * 0.6 +
            iz
        ) *
        0.035;

      y +=
        Math.sin(
          ix * 0.7
        ) *
        0.035;
    }

    /* CLOUD AI */

    else if (
      type === "cloud"
    ) {
      const r1 =
        seededRandom(
          i + 12
        );

      const r2 =
        seededRandom(
          i + 32
        );

      const r3 =
        seededRandom(
          i + 52
        );

      const cluster =
        i % 5;

      const clusterAngle =
        (cluster / 5) *
        TAU;

      const cx =
        Math.cos(
          clusterAngle
        ) *
        1.1;

      const cz =
        Math.sin(
          clusterAngle
        ) *
        0.65;

      const angle =
        r1 * TAU;

      const radius =
        Math.pow(
          r2,
          0.5
        ) *
        1.5;

      x =
        cx +
        Math.cos(
          angle
        ) *
          radius;

      z =
        cz +
        Math.sin(
          angle
        ) *
          radius;

      y =
        (r3 - 0.5) *
        2.1 *
        (1 -
          radius /
            3.5);

      x *= 1.25;
    }

    /* MLOPS */

    else {
      const angle =
        t *
        Math.PI *
        26;

      const depth =
        (t - 0.5) *
        6;

      const radius =
        1.05 +
        Math.sin(
          t *
            Math.PI *
            12
        ) *
          0.22;

      x =
        Math.cos(
          angle
        ) *
        radius;

      y =
        Math.sin(
          angle
        ) *
        radius;

      z = depth;
    }

    positions[
      i * 3
    ] = x;

    positions[
      i * 3 + 1
    ] = y;

    positions[
      i * 3 + 2
    ] = z;
  }

  return positions;
}

/* ============================================================
   MORPHING PARTICLES
============================================================ */

const MorphingIntelligence =
  memo(
    function MorphingIntelligence({
      active,
      reducedMotion,
      quality,
    }) {
      const points =
        useRef(null);

      const count =
        quality ===
        "desktop"
          ? PARTICLE_COUNT
          : quality ===
            "tablet"
          ? 500
          : 260;

      const formations =
        useMemo(
          () =>
            CAPABILITIES.map(
              (item) =>
                createFormation(
                  item.shape,
                  count
                )
            ),
          [count]
        );

      const initialPositions =
        useMemo(
          () =>
            new Float32Array(
              formations[0]
            ),
          [formations]
        );

      const target =
        useRef(
          formations[0]
        );

      useEffect(() => {
        target.current =
          formations[
            active
          ];
      }, [
        active,
        formations,
      ]);

      useFrame(
        (
          state,
          delta
        ) => {
          if (
            !points.current
          )
            return;

          const attribute =
            points.current
              .geometry
              .attributes
              .position;

          const array =
            attribute.array;

          const targetArray =
            target.current;

          const morphSpeed =
            reducedMotion
              ? 0.16
              : 0.075;

          for (
            let i = 0;
            i <
            array.length;
            i++
          ) {
            array[i] +=
              (targetArray[
                i
              ] -
                array[i]) *
              morphSpeed;
          }

          attribute.needsUpdate =
            true;

          if (
            !reducedMotion
          ) {
            points.current.rotation.y +=
              delta *
              0.035;

            points.current.rotation.x =
              THREE.MathUtils.lerp(
                points
                  .current
                  .rotation
                  .x,
                state
                  .pointer
                  .y *
                  0.12,
                0.03
              );

            points.current.rotation.z =
              THREE.MathUtils.lerp(
                points
                  .current
                  .rotation
                  .z,
                -state
                  .pointer
                  .x *
                  0.08,
                0.03
              );

            const breathing =
              1 +
              Math.sin(
                state
                  .clock
                  .elapsedTime *
                  1.1
              ) *
                0.012;

            points.current.scale.setScalar(
              breathing
            );
          }
        }
      );

      return (
        <Points
          ref={points}
          positions={
            initialPositions
          }
          stride={3}
          frustumCulled={
            false
          }
        >
          <PointMaterial
            transparent
            color="#8b8b8b"
            size={
              quality ===
              "mobile"
                ? 0.045
                : 0.035
            }
            sizeAttenuation
            depthWrite={
              false
            }
            opacity={
              0.88
            }
          />
        </Points>
      );
    }
  );

/* ============================================================
   NEURAL NETWORK
============================================================ */

function buildNetworkNodes(
  count
) {
  const nodes = [];

  for (
    let i = 0;
    i < count;
    i++
  ) {
    const phi =
      Math.acos(
        1 -
          (2 *
            (i +
              0.5)) /
            count
      );

    const theta =
      Math.PI *
      (1 +
        Math.sqrt(5)) *
      i;

    const radius =
      2.1 +
      ((i * 13) %
        24) /
        100;

    nodes.push(
      new THREE.Vector3(
        radius *
          Math.sin(
            phi
          ) *
          Math.cos(
            theta
          ),

        radius *
          Math.cos(
            phi
          ),

        radius *
          Math.sin(
            phi
          ) *
          Math.sin(
            theta
          )
      )
    );
  }

  return nodes;
}

/* ============================================================
   DATA PULSE
============================================================ */

const DataPulse = memo(
  function DataPulse({
    start,
    end,
    offset,
    reducedMotion,
  }) {
    const ref =
      useRef(null);

    useFrame(
      (state) => {
        if (
          !ref.current ||
          reducedMotion
        )
          return;

        const progress =
          (state.clock
            .elapsedTime *
            0.1 +
            offset) %
          1;

        ref.current.position.lerpVectors(
          start,
          end,
          progress
        );

        const pulse =
          0.75 +
          Math.sin(
            progress *
              Math.PI
          ) *
            1.1;

        ref.current.scale.setScalar(
          pulse
        );
      }
    );

    return (
      <mesh
        ref={ref}
      >
        <sphereGeometry
          args={[
            0.032,
            8,
            8,
          ]}
        />

        <meshBasicMaterial
          color="#bcbcbc"
        />
      </mesh>
    );
  }
);

/* ============================================================
   SATELLITE
============================================================ */

const Satellite = memo(
  function Satellite({
    radius,
    speed,
    offset,
    tilt = 1,
    reducedMotion,
  }) {
    const ref =
      useRef(null);

    useFrame(
      (state) => {
        if (
          !ref.current
        )
          return;

        const time =
          reducedMotion
            ? offset
            : state
                .clock
                .elapsedTime *
                speed +
              offset;

        ref.current.position.set(
          Math.cos(
            time
          ) *
            radius,

          Math.sin(
            time *
              tilt
          ) *
            0.5,

          Math.sin(
            time
          ) *
            radius
        );
      }
    );

    return (
      <mesh
        ref={ref}
      >
        <sphereGeometry
          args={[
            0.045,
            10,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#bcbcbc"
          emissive="#888888"
          emissiveIntensity={
            1.2
          }
        />
      </mesh>
    );
  }
);

/* ============================================================
   NEURAL UNIVERSE
============================================================ */

const NeuralUniverse =
  memo(
    function NeuralUniverse({
      reducedMotion,
      quality,
    }) {
      const group =
        useRef(null);

      const nodeCount =
        quality ===
        "desktop"
          ? 46
          : quality ===
            "tablet"
          ? 34
          : 22;

      const nodes =
        useMemo(
          () =>
            buildNetworkNodes(
              nodeCount
            ),
          [nodeCount]
        );

      const connections =
        useMemo(() => {
          const result =
            [];

          nodes.forEach(
            (
              node,
              index
            ) => {
              const nearest =
                [];

              nodes.forEach(
                (
                  other,
                  otherIndex
                ) => {
                  if (
                    index ===
                    otherIndex
                  )
                    return;

                  nearest.push(
                    {
                      index:
                        otherIndex,

                      distance:
                        node.distanceTo(
                          other
                        ),
                    }
                  );
                }
              );

              nearest.sort(
                (
                  a,
                  b
                ) =>
                  a.distance -
                  b.distance
              );

              nearest
                .slice(
                  0,
                  2
                )
                .forEach(
                  (
                    item
                  ) => {
                    if (
                      index <
                      item.index
                    ) {
                      result.push(
                        [
                          node,
                          nodes[
                            item
                              .index
                          ],
                        ]
                      );
                    }
                  }
                );
            }
          );

          return result.slice(
            0,
            quality ===
              "desktop"
              ? 62
              : 38
          );
        }, [
          nodes,
          quality,
        ]);

      const pulses =
        useMemo(
          () =>
            connections
              .filter(
                (
                  _,
                  index
                ) =>
                  index %
                    7 ===
                  0
              )
              .slice(
                0,
                quality ===
                  "mobile"
                  ? 3
                  : 8
              ),
          [
            connections,
            quality,
          ]
        );

      useFrame(
        (
          state,
          delta
        ) => {
          if (
            !group.current ||
            reducedMotion
          )
            return;

          group.current.rotation.y +=
            delta *
            0.018;

          group.current.rotation.x =
            THREE.MathUtils.lerp(
              group
                .current
                .rotation
                .x,
              state
                .pointer
                .y *
                0.1,
              0.025
            );

          group.current.rotation.z =
            THREE.MathUtils.lerp(
              group
                .current
                .rotation
                .z,
              -state
                .pointer
                .x *
                0.06,
              0.025
            );
        }
      );

      return (
        <group
          ref={group}
        >
          {connections.map(
            (
              [
                start,
                end,
              ],
              index
            ) => (
              <Line
                key={`connection-${index}`}
                points={[
                  start,
                  end,
                ]}
                color="#888888"
                transparent
                opacity={
                  index %
                    7 ===
                  0
                    ? 0.16
                    : 0.055
                }
                lineWidth={
                  0.35
                }
              />
            )
          )}

          {nodes.map(
            (
              position,
              index
            ) => {
              const activeNode =
                index %
                  8 ===
                0;

              return (
                <mesh
                  key={`node-${index}`}
                  position={
                    position
                  }
                >
                  <sphereGeometry
                    args={[
                      activeNode
                        ? 0.042
                        : 0.017,
                      8,
                      8,
                    ]}
                  />

                  <meshStandardMaterial
                    color={
                      activeNode
                        ? "#bcbcbc"
                        : "#666666"
                    }
                    emissive={
                      activeNode
                        ? "#888888"
                        : "#111111"
                    }
                    emissiveIntensity={
                      activeNode
                        ? 1.6
                        : 0.1
                    }
                  />
                </mesh>
              );
            }
          )}

          {pulses.map(
            (
              [
                start,
                end,
              ],
              index
            ) => (
              <DataPulse
                key={`pulse-${index}`}
                start={
                  start
                }
                end={end}
                offset={
                  index /
                  Math.max(
                    pulses.length,
                    1
                  )
                }
                reducedMotion={
                  reducedMotion
                }
              />
            )
          )}

          <mesh
            rotation={[
              0.4,
              0.5,
              0.2,
            ]}
          >
            <torusGeometry
              args={[
                2.5,
                0.004,
                6,
                100,
              ]}
            />

            <meshBasicMaterial
              transparent
              opacity={
                0.11
              }
              color="#777777"
            />
          </mesh>

          {quality !==
            "mobile" && (
            <mesh
              rotation={[
                1.1,
                0.3,
                0.7,
              ]}
            >
              <torusGeometry
                args={[
                  2.9,
                  0.003,
                  6,
                  120,
                ]}
              />

              <meshBasicMaterial
                transparent
                opacity={
                  0.07
                }
                color="#777777"
              />
            </mesh>
          )}

          <Satellite
            radius={
              2.5
            }
            speed={
              0.22
            }
            offset={0}
            reducedMotion={
              reducedMotion
            }
          />

          {quality !==
            "mobile" && (
            <Satellite
              radius={
                2.9
              }
              speed={
                -0.15
              }
              offset={2}
              tilt={
                1.35
              }
              reducedMotion={
                reducedMotion
              }
            />
          )}
        </group>
      );
    }
  );

/* ============================================================
   CAMERA
============================================================ */

function CameraRig({
  mode,
  reducedMotion,
  quality,
}) {
  useFrame(
    (state) => {
      if (
        reducedMotion
      ) {
        state.camera.lookAt(
          0,
          0,
          0
        );

        return;
      }

      const pointerMultiplier =
        quality ===
        "mobile"
          ? 0.08
          : 0.24;

      state.camera.position.x =
        THREE.MathUtils.lerp(
          state.camera
            .position.x,

          state.pointer.x *
            pointerMultiplier,

          0.025
        );

      state.camera.position.y =
        THREE.MathUtils.lerp(
          state.camera
            .position.y,

          state.pointer.y *
            pointerMultiplier *
            0.7,

          0.025
        );

      const targetZ =
        mode ===
        "universe"
          ? quality ===
            "mobile"
            ? 7.8
            : 7.1
          : quality ===
            "mobile"
          ? 7.4
          : 6.7;

      state.camera.position.z =
        THREE.MathUtils.lerp(
          state.camera
            .position.z,
          targetZ,
          0.025
        );

      state.camera.lookAt(
        0,
        0,
        0
      );
    }
  );

  return null;
}

/* ============================================================
   CANVAS
============================================================ */

const IntelligenceCanvas =
  memo(
    function IntelligenceCanvas({
      active = 0,
      mode = "morph",
      quality = "desktop",
      reducedMotion = false,
    }) {
      const dpr =
        quality ===
        "desktop"
          ? [
              1,
              1.5,
            ]
          : quality ===
            "tablet"
          ? [
              1,
              1.25,
            ]
          : [1, 1];

      return (
        <Canvas
          frameloop={
            reducedMotion
              ? "demand"
              : "always"
          }
          camera={{
            position: [
              0,
              0,

              mode ===
              "universe"
                ? 7.1
                : 6.7,
            ],

            fov:
              quality ===
              "mobile"
                ? 48
                : 43,
          }}
          dpr={dpr}
          gl={{
            alpha: true,

            antialias:
              quality !==
              "mobile",

            powerPreference:
              "high-performance",
          }}
        >
          <ambientLight
            intensity={
              0.7
            }
          />

          <directionalLight
            position={[
              5,
              5,
              5,
            ]}
            intensity={
              0.8
            }
          />

          {mode ===
          "universe" ? (
            <NeuralUniverse
              reducedMotion={
                reducedMotion
              }
              quality={
                quality
              }
            />
          ) : (
            <MorphingIntelligence
              active={
                active
              }
              reducedMotion={
                reducedMotion
              }
              quality={
                quality
              }
            />
          )}

          {quality !==
            "mobile" && (
            <Sparkles
              count={
                quality ===
                "desktop"
                  ? 28
                  : 16
              }
              scale={[
                7,
                7,
                5,
              ]}
              size={
                0.7
              }
              speed={
                reducedMotion
                  ? 0
                  : 0.06
              }
              opacity={
                0.08
              }
              color="#777777"
            />
          )}

          <CameraRig
            mode={mode}
            reducedMotion={
              reducedMotion
            }
            quality={
              quality
            }
          />
        </Canvas>
      );
    }
  );

/* ============================================================
   SECTION LABEL
============================================================ */

function SectionLabel() {
  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      <motion.span
        animate={{
          opacity: [
            0.3,
            1,
            0.3,
          ],

          scale: [
            0.8,
            1.15,
            0.8,
          ],
        }}
        transition={{
          duration:
            2.2,

          repeat:
            Infinity,
        }}
        className="
          block
          h-1.5
          w-1.5
          rounded-full
          bg-dark
          dark:bg-light
        "
      />

      <span
        className="
          text-[8px]
          font-black
          uppercase
          tracking-[0.22em]
          text-dark/35
          dark:text-light/35
        "
      >
        AI ENGINEERING
        UNIVERSE
      </span>
    </div>
  );
}

/* ============================================================
   CENTRAL CORE
============================================================ */

function CentralCore() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-20
        flex
        h-40
        w-40
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-dark/10
        bg-light/75
        shadow-[0_25px_80px_rgba(0,0,0,0.12)]
        backdrop-blur-xl
        dark:border-light/10
        dark:bg-dark/75
        xl:h-36
        xl:w-36
      "
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 28,
          repeat:
            Infinity,
          ease:
            "linear",
        }}
        className="
          absolute
          -inset-4
          rounded-full
          border
          border-dashed
          border-dark/10
          dark:border-light/10
        "
      />

      <motion.div
        animate={{
          rotate:
            -360,
        }}
        transition={{
          duration: 18,
          repeat:
            Infinity,
          ease:
            "linear",
        }}
        className="
          absolute
          inset-3
          rounded-full
          border
          border-dark/[0.07]
          dark:border-light/[0.08]
        "
      >
        <span
          className="
            absolute
            left-1/2
            top-[-3px]
            h-1.5
            w-1.5
            rounded-full
            bg-dark
            shadow-[0_0_12px_currentColor]
            dark:bg-light
          "
        />
      </motion.div>

      <div
        className="
          relative
          z-10
          text-center
        "
      >
        <motion.span
          animate={{
            opacity: [
              0.35,
              1,
              0.35,
            ],
          }}
          transition={{
            duration: 2,
            repeat:
              Infinity,
          }}
          className="
            mx-auto
            mb-3
            block
            h-2
            w-2
            rounded-full
            bg-dark
            dark:bg-light
          "
        />

        <p
          className="
            text-[7px]
            font-black
            uppercase
            tracking-[0.2em]
            text-dark/35
            dark:text-light/35
          "
        >
          CORE
        </p>

        <p
          className="
            mt-1
            text-lg
            font-black
            leading-[0.95]
            tracking-[-0.05em]
          "
        >
          AI
          <br />
          ENGINEERING
        </p>

        <p
          className="
            mt-2
            text-[6px]
            font-bold
            uppercase
            tracking-[0.13em]
            text-dark/35
            dark:text-light/35
          "
        >
          THINK • ACT •
          SCALE
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   DOMAIN NODE
============================================================ */

function DomainNode({
  capability,
  index,
  onSelect,
}) {
  const positions = [
    "left-[7%] top-[20%]",
    "right-[7%] top-[20%]",
    "left-[3%] top-[48%]",
    "right-[3%] top-[48%]",
    "left-[13%] bottom-[13%]",
    "right-[13%] bottom-[13%]",
  ];

  return (
    <motion.button
      type="button"
      onClick={() =>
        onSelect(index)
      }
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay:
          index *
          0.07,

        duration:
          0.6,

        type:
          "spring",
      }}
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className={`
        absolute
        z-30
        ${positions[index]}
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-dark/10
        bg-light/75
        px-4
        py-3
        text-left
        shadow-[0_15px_40px_rgba(0,0,0,0.07)]
        backdrop-blur-xl
        dark:border-light/10
        dark:bg-dark/75
      `}
    >
      <span
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-dark/10
          dark:border-light/10
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-dark/60
            transition-transform
            duration-300
            group-hover:scale-150
            dark:bg-light/60
          "
        />
      </span>

      <span>
        <span
          className="
            block
            text-[9px]
            font-black
            uppercase
            tracking-[0.14em]
          "
        >
          {
            capability.short
          }
        </span>

        <span
          className="
            mt-0.5
            block
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-dark/40
            dark:text-light/40
          "
        >
          {capability.statement.replaceAll(
            "/",
            " • "
          )}
        </span>
      </span>

      <span
        className="
          ml-1
          text-[9px]
          text-dark/20
          transition-transform
          group-hover:translate-x-1
          dark:text-light/20
        "
      >
        ↘
      </span>
    </motion.button>
  );
}

/* ============================================================
   UNIVERSE INTRO
============================================================ */

function UniverseIntro({
  onSelect,
  quality,
  reducedMotion,
  isDesktop,
  ready,
}) {
  return (
    <div
      className="
        relative
        pb-28
        pt-24
        md:pb-20
        md:pt-16
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration:
            0.8,
        }}
        className="
          text-center
        "
      >
        <div
          className="
            flex
            justify-center
          "
        >
          <SectionLabel />
        </div>

        <h2
          className="
            mt-6
            text-[clamp(4rem,10vw,9rem)]
            font-black
            leading-[0.78]
            tracking-[-0.08em]
          "
        >
          SKILLS
        </h2>

        <p
          className="
            mx-auto
            mt-8
            max-w-xl
            text-sm
            font-medium
            leading-[1.8]
            text-dark/50
            dark:text-light/50
            md:px-5
            md:text-xs
          "
        >
          An interactive map
          of the systems I
          build — from
          autonomous agents
          and generative AI to
          machine learning,
          data platforms,
          cloud, and
          production MLOps.
        </p>
      </motion.div>

      {/* DESKTOP UNIVERSE */}

      {ready && isDesktop && (
      <div
        className="
          relative
          mt-16
          h-[760px]
          w-full
          overflow-hidden
          rounded-[2.5rem]
          border
          border-dark/[0.07]
          bg-light/40
          shadow-[inset_0_0_120px_rgba(0,0,0,0.025)]
          dark:border-light/[0.08]
          dark:bg-dark/40
          xl:h-[680px]
          md:hidden
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            bg-[size:48px_48px]
            opacity-[0.022]
            dark:opacity-[0.04]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            whitespace-nowrap
            text-[12vw]
            font-black
            tracking-[-0.09em]
            text-dark/[0.018]
            dark:text-light/[0.018]
          "
        >
          INTELLIGENCE
        </div>

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[82%]
            w-[76%]
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <IntelligenceCanvas
            mode="universe"
            quality={
              quality
            }
            reducedMotion={
              reducedMotion
            }
          />
        </div>

        <CentralCore />

        {CAPABILITIES.map(
          (
            capability,
            index
          ) => (
            <DomainNode
              key={
                capability.id
              }
              capability={
                capability
              }
              index={
                index
              }
              onSelect={
                onSelect
              }
            />
          )
        )}

        <div
          className="
            absolute
            left-6
            top-6
            text-[7px]
            font-black
            uppercase
            tracking-[0.18em]
            text-dark/30
            dark:text-light/30
          "
        >
          NEURAL SKILL MAP
          / 01
        </div>

        <div
          className="
            absolute
            right-6
            top-6
            text-[7px]
            font-black
            uppercase
            tracking-[0.18em]
            text-dark/25
            dark:text-light/25
          "
        >
          SELECT A DOMAIN
        </div>

        <motion.div
          animate={{
            y: [
              0,
              5,
              0,
            ],
          }}
          transition={{
            duration: 2,
            repeat:
              Infinity,
          }}
          className="
            absolute
            bottom-6
            left-1/2
            -translate-x-1/2
            text-center
          "
        >
          <p
            className="
              text-[7px]
              font-black
              uppercase
              tracking-[0.2em]
              text-dark/25
              dark:text-light/25
            "
          >
            SCROLL TO ENTER
            THE SYSTEM
          </p>

          <p
            className="
              mt-2
              text-xs
              text-dark/25
              dark:text-light/25
            "
          >
            ↓
          </p>
        </motion.div>
      </div>
      )}

      {/* MOBILE UNIVERSE */}

      {ready && !isDesktop && (
      <div
        className="
          mt-12
          hidden
          md:block
        "
      >
        <div
          className="
            relative
            h-[340px]
            overflow-hidden
            rounded-[2rem]
            border
            border-dark/[0.07]
            dark:border-light/[0.08]
          "
        >
          <div
            className="
              absolute
              inset-0
            "
          >
            <IntelligenceCanvas
              mode="universe"
              quality="mobile"
              reducedMotion={
                reducedMotion
              }
            />
          </div>

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-dark/10
              bg-light/70
              px-6
              py-5
              text-center
              backdrop-blur-xl
              dark:border-light/10
              dark:bg-dark/70
            "
          >
            <p
              className="
                text-[7px]
                font-black
                uppercase
                tracking-[0.18em]
                text-dark/35
                dark:text-light/35
              "
            >
              CORE
            </p>

            <p
              className="
                mt-1
                text-sm
                font-black
                tracking-[-0.04em]
              "
            >
              AI ENGINEERING
            </p>
          </div>
        </div>

        <div
          className="
            mt-4
            grid
            grid-cols-2
            gap-2
            xs:grid-cols-1
          "
        >
          {CAPABILITIES.map(
            (
              capability,
              index
            ) => (
              <button
                key={
                  capability.id
                }
                type="button"
                onClick={() =>
                  onSelect(
                    index
                  )
                }
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-dark/[0.08]
                  px-4
                  py-4
                  text-left
                  dark:border-light/[0.09]
                "
              >
                <span>
                  <span
                    className="
                      block
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                    "
                  >
                    {
                      capability.short
                    }
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-[6px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-dark/35
                      dark:text-light/35
                    "
                  >
                    {
                      capability.number
                    }{" "}
                    / 06
                  </span>
                </span>

                <span
                  className="
                    text-xs
                    text-dark/25
                    dark:text-light/25
                  "
                >
                  ↓
                </span>
              </button>
            )
          )}
        </div>
      </div>
      )}
    </div>
  );
}

/* ============================================================
   TECH GRID
============================================================ */

function TechGrid({
  stack,
}) {
  return (
    <div
      className="
        mt-7
        grid
        grid-cols-2
        gap-x-8
        sm:grid-cols-1
      "
    >
      {stack.map(
        (
          tech,
          index
        ) => (
          <motion.div
            key={tech}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay:
                index *
                0.035,
            }}
            whileHover={{
              x: 4,
            }}
            className="
              group
              flex
              items-center
              justify-between
              border-b
              border-dark/[0.07]
              py-2.5
              dark:border-light/[0.08]
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                text-dark/55
                transition-colors
                group-hover:text-dark
                dark:text-light/55
                dark:group-hover:text-light
              "
            >
              {tech}
            </span>

            <span
              className="
                text-[8px]
                text-dark/15
                transition-all
                group-hover:translate-x-0.5
                group-hover:text-dark/50
                dark:text-light/15
                dark:group-hover:text-light/50
              "
            >
              ↗
            </span>
          </motion.div>
        )
      )}
    </div>
  );
}

/* ============================================================
   CAPABILITY CONTENT
============================================================ */

function CapabilityContent({
  capability,
}) {
  return (
    <AnimatePresence
      mode="wait"
    >
      <motion.div
        key={
          capability.id
        }
        initial={{
          opacity: 0,
          y: 28,
          filter:
            "blur(8px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter:
            "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: -20,
          filter:
            "blur(7px)",
        }}
        transition={{
          duration:
            0.46,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <motion.span
            animate={{
              opacity: [
                0.3,
                1,
                0.3,
              ],
            }}
            transition={{
              duration: 2,
              repeat:
                Infinity,
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-dark
              dark:bg-light
            "
          />

          <span
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[0.22em]
              text-dark/35
              dark:text-light/35
            "
          >
            {
              capability.eyebrow
            }
          </span>
        </div>

        <div
          className="
            mt-6
          "
        >
          <h3
            className="
              text-[clamp(3.2rem,6.2vw,7.2rem)]
              font-black
              uppercase
              leading-[0.76]
              tracking-[-0.075em]
            "
          >
            {
              capability.title1
            }
          </h3>

          <h3
            className="
              text-[clamp(3.2rem,6.2vw,7.2rem)]
              font-black
              uppercase
              leading-[0.88]
              tracking-[-0.075em]
              text-dark/20
              dark:text-light/20
            "
          >
            {
              capability.title2
            }
          </h3>
        </div>

        <p
          className="
            mt-7
            text-[8px]
            font-black
            uppercase
            tracking-[0.2em]
            text-dark/35
            dark:text-light/35
          "
        >
          {
            capability.statement
          }
        </p>

        <p
          className="
            mt-5
            max-w-[500px]
            text-xs
            font-medium
            leading-[1.85]
            text-dark/55
            dark:text-light/55
          "
        >
          {
            capability.description
          }
        </p>

        <TechGrid
          stack={
            capability.stack
          }
        />
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   PROOF PANEL
============================================================ */

function ProofPanel({
  capability,
}) {
  return (
    <AnimatePresence
      mode="wait"
    >
      <motion.div
        key={
          capability.id
        }
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -12,
        }}
        transition={{
          duration:
            0.35,
        }}
        className="
          pointer-events-none
          absolute
          bottom-7
          left-7
          right-7
          z-20
          flex
          items-end
          justify-between
          gap-7
        "
      >
        <div
          className="
            max-w-[250px]
          "
        >
          <p
            className="
              text-[7px]
              font-black
              uppercase
              tracking-[0.2em]
              text-dark/30
              dark:text-light/30
            "
          >
            PROOF OF WORK
          </p>

          <p
            className="
              mt-2
              text-[9px]
              font-medium
              leading-relaxed
              text-dark/50
              dark:text-light/50
            "
          >
            {
              capability.proof
            }
          </p>
        </div>

        <div
          className="
            text-right
          "
        >
          <p
            className="
              text-2xl
              font-black
              tracking-[-0.05em]
            "
          >
            {
              capability.metric
            }
          </p>

          <p
            className="
              mt-1
              text-[6px]
              font-black
              uppercase
              tracking-[0.18em]
              text-dark/30
              dark:text-light/30
            "
          >
            {
              capability.metricLabel
            }
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   PROGRESS RAIL
============================================================ */

function ProgressRail({
  active,
  onSelect,
}) {
  return (
    <nav
      aria-label="Skills navigation"
      className="
        absolute
        right-5
        top-1/2
        z-[80]
        flex
        -translate-y-1/2
        items-stretch
        gap-4
        lg:right-3
      "
    >
      {/* VERTICAL PROGRESS */}

      <div
        className="
          relative
          w-[2px]
          overflow-hidden
          rounded-full
          bg-dark/10
          dark:bg-light/10
        "
      >
        <motion.div
          animate={{
            scaleY:
              (active +
                1) /
              CAPABILITIES.length,
          }}
          transition={{
            duration:
              0.35,

            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="
            absolute
            inset-0
            origin-top
            bg-dark
            dark:bg-light
          "
        />
      </div>

      {/* NUMBERS */}

      <div
        className="
          flex
          flex-col
          justify-center
          gap-3
        "
      >
        {CAPABILITIES.map(
          (
            item,
            index
          ) => {
            const selected =
              active ===
              index;

            return (
              <button
                key={
                  item.id
                }
                type="button"
                onClick={() =>
                  onSelect(
                    index
                  )
                }
                aria-label={`Show ${item.title1} ${item.title2}`}
                className="
                  group
                  flex
                  min-h-[46px]
                  items-center
                  justify-end
                  gap-3
                "
              >
                <span
                  className={`
                    hidden
                    whitespace-nowrap
                    text-[7px]
                    font-black
                    uppercase
                    tracking-[0.15em]
                    transition-all
                    2xl:block

                    ${
                      selected
                        ? "translate-x-0 opacity-50"
                        : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-30"
                    }
                  `}
                >
                  {
                    item.short
                  }
                </span>

                <motion.span
                  animate={{
                    opacity:
                      selected
                        ? 1
                        : 0.28,

                    scale:
                      selected
                        ? 1
                        : 0.78,
                  }}
                  transition={{
                    duration:
                      0.25,
                  }}
                  className={`
                    block
                    min-w-[46px]
                    origin-right
                    text-right
                    font-black
                    leading-none
                    tracking-[-0.07em]

                    ${
                      selected
                        ? "text-[32px]"
                        : "text-[18px]"
                    }
                  `}
                >
                  {
                    item.number
                  }
                </motion.span>
              </button>
            );
          }
        )}
      </div>
    </nav>
  );
}

/* ============================================================
   CHAPTER TRIGGER
============================================================ */

function ChapterTrigger({
  index,
  registerChapter,
}) {
  const ref =
    useRef(null);

  useEffect(() => {
    registerChapter(
      index,
      ref.current
    );

    return () =>
      registerChapter(
        index,
        null
      );
  }, [
    index,
    registerChapter,
  ]);

  return (
    <div
      ref={ref}
      className="
        h-[82vh]
        min-h-[620px]
      "
      aria-hidden="true"
    />
  );
}

/* ============================================================
   CINEMATIC DESKTOP
============================================================ */

function CinematicDesktop({
  active,
  setActive,
  chapterRefs,
  registerChapter,
  quality,
  reducedMotion,
}) {
  const cinematicRef =
    useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target:
      cinematicRef,

    offset: [
      "start start",
      "end end",
    ],
  });

  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 90,
        damping: 30,
        mass: 0.4,
      }
    );

  const ghostY =
    useTransform(
      smoothProgress,
      [0, 1],
      [
        "5%",
        "-25%",
      ]
    );

  const ghostOpacity =
    useTransform(
      smoothProgress,
      [
        0,
        0.08,
        0.9,
        1,
      ],
      [
        0.015,
        0.045,
        0.045,
        0.012,
      ]
    );

  /*
    NORMAL MANUAL SCROLL
    STILL CONTROLS THE STORY.
  */

  useEffect(() => {
    let raf = null;

    const calculate =
      () => {
        raf = null;

        const center =
          window.innerHeight *
          0.5;

        let closest =
          0;

        let distance =
          Infinity;

        chapterRefs.current.forEach(
          (
            element,
            index
          ) => {
            if (
              !element
            )
              return;

            const rect =
              element.getBoundingClientRect();

            const chapterCenter =
              rect.top +
              rect.height /
                2;

            const diff =
              Math.abs(
                chapterCenter -
                  center
              );

            if (
              diff <
              distance
            ) {
              distance =
                diff;

              closest =
                index;
            }
          }
        );

        setActive(
          (
            current
          ) =>
            current ===
            closest
              ? current
              : closest
        );
      };

    const onScroll =
      () => {
        if (
          raf !== null
        )
          return;

        raf =
          requestAnimationFrame(
            calculate
          );
      };

    calculate();

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );

      if (
        raf !== null
      ) {
        cancelAnimationFrame(
          raf
        );
      }
    };
  }, [
    chapterRefs,
    setActive,
  ]);

  /*
    IMPORTANT FIX:

    RIGHT-SIDE NUMBERS DO NOT SCROLL.

    They work as tabs and only update
    the visible skill + 3D formation.
  */

  const selectSkill =
    useCallback(
      (index) => {
        setActive(
          index
        );
      },
      [setActive]
    );

  return (
    <div
      ref={
        cinematicRef
      }
      className="
        relative
      "
    >
      {/* STICKY SCREEN */}

      <div
        id="skills-cinematic-stage"
        className="
          sticky
          top-0
          z-10
          h-screen
          min-h-[680px]
          overflow-hidden
          bg-light
          dark:bg-dark
        "
      >
        {/* GRID */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            bg-[size:55px_55px]
            opacity-[0.018]
            dark:opacity-[0.035]
          "
        />

        {/* BACKGROUND WORD */}

        <motion.div
          style={{
            y: ghostY,

            opacity:
              ghostOpacity,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[45%]
            z-0
            -translate-x-1/2
            -translate-y-1/2
            select-none
            whitespace-nowrap
            text-[17vw]
            font-black
            tracking-[-0.09em]
          "
        >
          INTELLIGENCE
        </motion.div>

        {/* TOP HUD */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-50
            flex
            items-center
            justify-between
            border-b
            border-dark/[0.08]
            py-5
            dark:border-light/[0.08]
          "
        >
          <div
            className="
              flex
              items-center
              gap-5
            "
          >
            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.25em]
              "
            >
              02 / SKILLS
            </span>

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-dark/25
                dark:text-light/25
                lg:hidden
              "
            >
              AI ENGINEERING
              CAPABILITIES
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <motion.span
              animate={{
                opacity: [
                  0.25,
                  1,
                  0.25,
                ],
              }}
              transition={{
                duration: 2,
                repeat:
                  Infinity,
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-dark
                dark:bg-light
              "
            />

            <span
              className="
                text-[7px]
                font-black
                uppercase
                tracking-[0.2em]
                text-dark/30
                dark:text-light/30
              "
            >
              SYSTEM ONLINE
            </span>
          </div>
        </div>

        {/* CONTENT GRID */}

        <div
          className="
            relative
            z-10
            grid
            h-full
            grid-cols-12
            pt-16
          "
        >
          {/* LEFT SIDE */}

          <div
            className="
              relative
              z-20
              col-span-6
              flex
              items-center
              pr-12
              xl:col-span-7
              xl:pr-8
            "
          >
            <CapabilityContent
              capability={
                CAPABILITIES[
                  active
                ]
              }
            />
          </div>

          {/* RIGHT 3D */}

          <div
            className="
              relative
              col-span-6
              border-l
              border-dark/[0.06]
              dark:border-light/[0.07]
              xl:col-span-5
            "
          >
            <AnimatePresence
              mode="wait"
            >
              <motion.div
                key={
                  CAPABILITIES[
                    active
                  ].number
                }
                initial={{
                  opacity: 0,
                  y: -15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 15,
                }}
                transition={{
                  duration:
                    0.35,
                }}
                className="
                  absolute
                  left-7
                  top-7
                  z-30
                  flex
                  items-end
                  gap-2
                "
              >
                <span
                  className="
                    text-6xl
                    font-black
                    tracking-[-0.07em]
                    xl:text-5xl
                  "
                >
                  {
                    CAPABILITIES[
                      active
                    ].number
                  }
                </span>

                <span
                  className="
                    mb-1
                    text-[8px]
                    font-black
                    text-dark/25
                    dark:text-light/25
                  "
                >
                  / 06
                </span>
              </motion.div>
            </AnimatePresence>

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-10
              "
            >
              <IntelligenceCanvas
                active={
                  active
                }
                mode="morph"
                quality={
                  quality
                }
                reducedMotion={
                  reducedMotion
                }
              />
            </div>

            <ProofPanel
              capability={
                CAPABILITIES[
                  active
                ]
              }
            />
          </div>
        </div>

        {/* RIGHT NAVIGATION */}

        <ProgressRail
          active={
            active
          }
          onSelect={
            selectSkill
          }
        />

        {/* SCROLL PROGRESS */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            z-50
            h-[2px]
            bg-dark/[0.05]
            dark:bg-light/[0.06]
          "
        >
          <motion.div
            style={{
              scaleX:
                smoothProgress,
            }}
            className="
              h-full
              w-full
              origin-left
              bg-dark
              dark:bg-light
            "
          />
        </div>
      </div>

      {/* SCROLL STORY TRIGGERS

          THESE ARE USED ONLY
          FOR MANUAL WHEEL/TRACKPAD
          SCROLLING.

          BUTTONS NEVER NAVIGATE
          TO THESE ELEMENTS.
      */}

      <div
        className="
          relative
          z-0
          -mt-[100vh]
        "
      >
        {CAPABILITIES.map(
          (
            capability,
            index
          ) => (
            <ChapterTrigger
              key={
                capability.id
              }
              index={
                index
              }
              registerChapter={
                registerChapter
              }
            />
          )
        )}
      </div>
    </div>
  );
}

/* ============================================================
   MOBILE SKILL CARD
============================================================ */

function MobileSkillCard({
  capability,
  index,
  register,
}) {
  const ref =
    useRef(null);

  useEffect(() => {
    register(
      index,
      ref.current
    );

    return () =>
      register(
        index,
        null
      );
  }, [
    index,
    register,
  ]);

  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration:
          0.55,
      }}
      className="
        border-t
        border-dark/10
        py-12
        dark:border-light/10
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            text-[8px]
            font-black
            tracking-[0.2em]
            text-dark/30
            dark:text-light/30
          "
        >
          {
            capability.number
          }{" "}
          / 06
        </span>

        <span
          className="
            text-right
            text-[7px]
            font-black
            uppercase
            tracking-[0.15em]
            text-dark/25
            dark:text-light/25
          "
        >
          {
            capability.eyebrow
          }
        </span>
      </div>

      <div
        className="
          relative
          mt-7
          h-[220px]
          overflow-hidden
          rounded-[1.5rem]
          border
          border-dark/[0.07]
          dark:border-light/[0.08]
        "
      >
        <IntelligenceCanvas
          active={
            index
          }
          mode="morph"
          quality="mobile"
          reducedMotion
        />

        <div
          className="
            pointer-events-none
            absolute
            left-4
            top-4
            text-[7px]
            font-black
            uppercase
            tracking-[0.15em]
            text-dark/30
            dark:text-light/30
          "
        >
          LIVE MODEL /{" "}
          {
            capability.number
          }
        </div>
      </div>

      <h3
        className="
          mt-8
          text-[clamp(2.7rem,13vw,5rem)]
          font-black
          uppercase
          leading-[0.82]
          tracking-[-0.07em]
        "
      >
        {
          capability.title1
        }
      </h3>

      <h3
        className="
          text-[clamp(2.7rem,13vw,5rem)]
          font-black
          uppercase
          leading-[0.9]
          tracking-[-0.07em]
          text-dark/20
          dark:text-light/20
        "
      >
        {
          capability.title2
        }
      </h3>

      <p
        className="
          mt-6
          text-[8px]
          font-black
          uppercase
          tracking-[0.17em]
          text-dark/35
          dark:text-light/35
        "
      >
        {
          capability.statement
        }
      </p>

      <p
        className="
          mt-4
          text-xs
          font-medium
          leading-[1.8]
          text-dark/55
          dark:text-light/55
        "
      >
        {
          capability.description
        }
      </p>

      <TechGrid
        stack={
          capability.stack
        }
      />

      <div
        className="
          mt-8
          flex
          items-end
          justify-between
          gap-5
        "
      >
        <p
          className="
            max-w-[65%]
            text-[9px]
            font-medium
            leading-relaxed
            text-dark/40
            dark:text-light/40
          "
        >
          {
            capability.proof
          }
        </p>

        <div
          className="
            text-right
          "
        >
          <p
            className="
              text-xl
              font-black
              tracking-[-0.04em]
            "
          >
            {
              capability.metric
            }
          </p>

          <p
            className="
              mt-1
              text-[6px]
              font-black
              uppercase
              tracking-[0.15em]
              text-dark/25
              dark:text-light/25
            "
          >
            {
              capability.metricLabel
            }
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   MOBILE EXPERIENCE
============================================================ */

function MobileExperience({
  register,
}) {
  return (
    <div
      className="
        hidden
        pb-20
        md:block
      "
    >
      <div
        className="
          mb-10
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            text-[8px]
            font-black
            uppercase
            tracking-[0.22em]
          "
        >
          02 / SKILLS
        </span>

        <span
          className="
            text-[7px]
            font-black
            uppercase
            tracking-[0.16em]
            text-dark/30
            dark:text-light/30
          "
        >
          TECHNICAL
          CAPABILITIES
        </span>
      </div>

      {CAPABILITIES.map(
        (
          capability,
          index
        ) => (
          <MobileSkillCard
            key={
              capability.id
            }
            capability={
              capability
            }
            index={
              index
            }
            register={
              register
            }
          />
        )
      )}
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

const Skills = () => {
  const reducedMotion =
    useReducedMotion();

  const {
    matches: isDesktop,
    ready,
  } = useMediaQuery(
    "(min-width: 768px)"
  );

  const quality =
    useWebGLMode();

  const [
    active,
    setActive,
  ] = useState(0);

  const chapterRefs =
    useRef([]);

  const mobileRefs =
    useRef([]);

  const registerChapter =
    useCallback(
      (
        index,
        element
      ) => {
        chapterRefs.current[
          index
        ] = element;
      },
      []
    );

  const registerMobile =
    useCallback(
      (
        index,
        element
      ) => {
        mobileRefs.current[
          index
        ] = element;
      },
      []
    );

  /*
    TOP AI UNIVERSE NAVIGATION
  */

  const scrollToCapability =
    useCallback(
      (index) => {
        if (
          typeof window ===
          "undefined"
        )
          return;

        const mobile =
          window.innerWidth <
          768;

        /*
          MOBILE:

          Mobile can safely
          scroll to real cards,
          because those cards
          contain visible content.
        */

        if (mobile) {
          const target =
            mobileRefs.current[
              index
            ];

          if (
            !target
          )
            return;

          target.scrollIntoView({
            behavior:
              reducedMotion
                ? "auto"
                : "smooth",

            block:
              "start",
          });

          return;
        }

        /*
          DESKTOP:

          NEVER SCROLL TO
          ChapterTrigger.

          Move only to the
          visible cinematic stage.
        */

        const stage =
          document.getElementById(
            "skills-cinematic-stage"
          );

        if (stage) {
          const stageTop =
            window.scrollY +
            stage
              .getBoundingClientRect()
              .top;

          /*
            AUTO IS INTENTIONAL.

            Smooth scrolling here
            would fire multiple
            intermediate scroll
            events and could reset
            the selected skill.
          */

          window.scrollTo({
            top:
              stageTop,

            behavior:
              "auto",
          });
        }

        /*
          Apply chosen capability
          after the browser has
          settled on the visible
          cinematic screen.
        */

        requestAnimationFrame(
          () => {
            requestAnimationFrame(
              () => {
                setActive(
                  index
                );
              }
            );
          }
        );
      },
      [
        reducedMotion,
      ]
    );

  return (
    <section
      id="skills"
      className="
        relative
        mt-64
        w-full
        md:mt-32
      "
    >
      {/* AI UNIVERSE INTRO */}

      <UniverseIntro
        onSelect={
          scrollToCapability
        }
        quality={
          quality
        }
        reducedMotion={Boolean(
          reducedMotion
        )}
        isDesktop={
          isDesktop
        }
        ready={ready}
      />

      {/* DESKTOP / LAPTOP */}

      {ready && isDesktop ? (
        <div
          className="
            md:hidden
          "
        >
          <CinematicDesktop
            active={active}
            setActive={setActive}
            chapterRefs={chapterRefs}
            registerChapter={registerChapter}
            quality={quality}
            reducedMotion={Boolean(reducedMotion)}
          />
        </div>
      ) : null}

      {/* PHONE / SMALL TABLET */}

      {ready && !isDesktop ? (
        <MobileExperience
          register={registerMobile}
        />
      ) : null}
    </section>
  );
};

export default Skills;
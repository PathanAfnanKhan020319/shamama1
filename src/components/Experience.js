import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import useMediaQuery from "@/components/hooks/useMediaQuery";

/* ============================================================
   EXPERIENCE DATA
============================================================ */

const EXPERIENCES = [
  {
    id: "aviato",
    number: "01",
    year: "2025—2026",
    position: "AI Engineer",
    company: "Aviato Consulting",
    companyLink: "https://www.aviato.consulting/",
    time: "DECEMBER 2025 — JULY 2026",
    address: "India",
    type: "Healthcare AI / Google Cloud",

    summary:
      "Collaborated directly with Google Cloud, Google Data Science, and Google AI Engineering teams to deliver the Population Health AI platform for Latrobe Health Service in Australia. Authored the PHAI Implementation Guide adopted by Google and Aviato as a primary project delivery reference.",

    highlights: [
      "Designed and consolidated a modelling-ready healthcare feature store in BigQuery with 471 engineered features across LHS clinical, SISU, and Google PDFM datasets.",
      "Contributed to the Autoencoder → Embedding → K-Means (k=6) pipeline and enabled population-health intelligence across 57 Australian SA4 regions.",
      "Designed 21 structured system prompts and 9 analytical frameworks for a multi-persona LLM-powered Population Health Insight Engine.",
      "Built BigQuery Conversational AI Agents to review 52+ AI-generated insight tables with 100% factual grounding and supported secure cross-project migrations with zero data loss.",
    ],

    tech: [
      "Google Cloud",
      "BigQuery",
      "LLMs",
      "Agentic AI",
      "K-Means",
      "Autoencoders",
      "Healthcare AI",
      "SQL",
    ],

    metrics: [
      {
        value: "471",
        label: "Engineered Features",
      },
      {
        value: "57",
        label: "SA4 Regions",
      },
      {
        value: "21",
        label: "System Prompts",
      },
      {
        value: "52+",
        label: "AI Insight Tables",
      },
    ],

    visual: "orbit",
  },

  {
    id: "gwen",
    number: "02",
    year: "2023—2025",
    position: "Data Scientist",
    company: "GWEN AI",
    companyLink: "https://Gwen.ai.com",
    time: "MARCH 2023 — DECEMBER 2025",
    address: "Aurangabad, Maharashtra, India",
    type: "AI Products / Machine Learning",

    summary:
      "Led development of AI-powered business intelligence platforms, virtual assistants, and automation systems for enterprise applications, spanning predictive ML, computer vision, and LLM-driven conversational intelligence.",

    highlights: [
      "Built and deployed fraud-detection, object-recognition, and LLM conversational systems using PyTorch and TensorFlow.",
      "Engineered scalable cloud pipelines and production deployments using AWS, Docker, and Kubernetes.",
      "Integrated REST APIs and microservices to support interoperable, low-latency model inference.",
      "Focused on converting raw data into actionable intelligence that improved operational efficiency and business decision-making.",
    ],

    tech: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "AWS",
      "Docker",
      "Kubernetes",
      "REST APIs",
      "LLMs",
    ],

    metrics: [
      {
        value: "AI",
        label: "Enterprise Products",
      },
      {
        value: "ML",
        label: "Production Systems",
      },
      {
        value: "CV",
        label: "Computer Vision",
      },
    ],

    visual: "network",
  },

  {
    id: "mindrift",
    number: "03",
    year: "FREELANCE",
    position: "Agentic AI Developer / LLM Fine Tuner",
    company: "Mindrift",
    companyLink: "https://mindrift.com",
    time: "PARALLEL FREELANCE WORK",
    address: "Remote",
    type: "Agentic AI / LLMs",

    summary:
      "Parallel freelance engagement in an Agentic AI Developer and LLM Fine Tuner capacity, performed remotely alongside primary professional responsibilities.",

    highlights: [],

    tech: [
      "Agentic AI",
      "LLMs",
      "Fine-Tuning",
      "Prompt Engineering",
    ],

    metrics: [
      {
        value: "LLM",
        label: "Fine-Tuning",
      },
      {
        value: "AI",
        label: "Agent Systems",
      },
    ],

    visual: "agent",
  },

  {
    id: "bcg",
    number: "04",
    year: "2022—2023",
    position: "Data Scientist Intern",
    company: "Boston Consulting Group (BCG)",
    companyLink: "https://www.bcg.com/",
    time: "DECEMBER 2022 — FEBRUARY 2023",
    address: "Remote",
    type: "Forecasting / Analytics",

    summary:
      "Contributed to AI-driven forecasting and analytics frameworks supporting strategic decision-making for global clients.",

    highlights: [
      "Designed LSTM and RNN time-series models for financial trends and KPI forecasting, improving forecast accuracy by 20%.",
      "Automated interactive KPI dashboards using Power BI and Tableau, reducing manual reporting time by 60%.",
      "Worked with cross-functional business and analytics teams to translate complex datasets into actionable insights.",
    ],

    tech: [
      "LSTM",
      "RNN",
      "Forecasting",
      "Power BI",
      "Tableau",
      "Analytics",
    ],

    metrics: [
      {
        value: "20%",
        label: "Forecast Accuracy",
      },
      {
        value: "60%",
        label: "Less Reporting Time",
      },
    ],

    visual: "wave",
  },

  {
    id: "cognizant",
    number: "05",
    year: "2022",
    position: "Artificial Intelligence Intern",
    company: "Cognizant",
    companyLink: "https://www.cognizant.com",
    time: "AUGUST 2022 — NOVEMBER 2022",
    address: "Remote",
    type: "NLP / MLOps",

    summary:
      "Worked on scalable machine-learning pipelines and Transformer-based NLP systems with a focus on inference optimization and enterprise AI integration.",

    highlights: [
      "Applied model pruning and hyperparameter optimization to reduce inference latency by 35%.",
      "Built Transformer-based NLP systems using BERT and DistilBERT for automated text classification.",
      "Contributed to automated data reporting, validation, and enterprise AI integration workflows.",
    ],

    tech: [
      "BERT",
      "DistilBERT",
      "NLP",
      "MLOps",
      "Model Pruning",
      "Deep Learning",
    ],

    metrics: [
      {
        value: "35%",
        label: "Lower Latency",
      },
      {
        value: "BERT",
        label: "Transformer NLP",
      },
    ],

    visual: "transformer",
  },

  {
    id: "pwc",
    number: "06",
    year: "2022",
    position: "Data Analytics Intern",
    company: "PwC",
    companyLink: "https://www.pwc.com",
    time: "MARCH 2022 — JUNE 2022",
    address: "Remote",
    type: "Risk Analytics / BI",

    summary:
      "Worked on financial analytics, AI-powered risk modelling, predictive analytics, and executive-facing data visualization.",

    highlights: [
      "Designed and validated risk models supporting more informed financial decision-making.",
      "Built interactive Tableau dashboards for real-time monitoring of KPIs, trends, and anomalies.",
      "Applied analytics and machine-learning techniques to real-world financial and consulting problems.",
    ],

    tech: [
      "Predictive Analytics",
      "Risk Modeling",
      "Tableau",
      "Data Analytics",
      "Machine Learning",
    ],

    metrics: [
      {
        value: "BI",
        label: "Executive Dashboards",
      },
      {
        value: "ML",
        label: "Risk Analytics",
      },
    ],

    visual: "radar",
  },

  {
    id: "technohacks",
    number: "07",
    year: "2021—2022",
    position: "Data Scientist Freelancer",
    company: "TechnoHacks",
    companyLink: "https://technohacks.com",
    time: "PARALLEL FREELANCE WORK | 2021 — 2022",
    address: "Nashik, Maharashtra, India",
    type: "Fraud Detection / Data Engineering",

    summary:
      "Built fraud-detection, anomaly-analysis, ETL, and business-intelligence workflows combining machine learning with production-oriented data engineering.",

    highlights: [
      "Engineered real-time fraud detection using XGBoost and anomaly-detection techniques, achieving over 95% accuracy.",
      "Streamlined SQL and Python ETL workflows, improving operational throughput by 40%.",
      "Developed BI dashboards for financial anomaly tracking and faster data-driven decision-making.",
    ],

    tech: [
      "XGBoost",
      "Python",
      "SQL",
      "ETL",
      "Anomaly Detection",
      "BI",
    ],

    metrics: [
      {
        value: "95%+",
        label: "Fraud Accuracy",
      },
      {
        value: "40%",
        label: "Higher Throughput",
      },
    ],

    visual: "pulse",
  },
];

/* ============================================================
   3D TILT CARD
============================================================ */

const TiltCard = ({ children, className = "" }) => {
  const rotateX = useSpring(
    useMotionValue(0),
    {
      stiffness: 160,
      damping: 18,
    }
  );

  const rotateY = useSpring(
    useMotionValue(0),
    {
      stiffness: 160,
      damping: 18,
    }
  );

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    const y =
      event.clientY -
      rect.top;

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    const rotateXValue =
      ((y - centerY) /
        centerY) *
      -5;

    const rotateYValue =
      ((x - centerX) /
        centerX) *
      5;

    rotateX.set(
      rotateXValue
    );

    rotateY.set(
      rotateYValue
    );
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={
        handleMouseMove
      }
      onMouseLeave={
        reset
      }
      style={{
        rotateX,
        rotateY,
        transformPerspective:
          1200,
        transformStyle:
          "preserve-3d",
      }}
      className={
        className
      }
    >
      {children}
    </motion.div>
  );
};

/* ============================================================
   CINEMATIC BACKGROUND VISUAL
============================================================ */

const CinematicVisual = ({
  type,
}) => {
  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      "
    >
      {/* GRID */}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)]

          bg-[size:42px_42px]

          dark:opacity-50
        "
      />

      {/* COMMON ORBIT */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2

          h-[430px]
          w-[430px]

          -translate-x-1/2
          -translate-y-1/2

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
            top-[-4px]

            h-2
            w-2

            rounded-full

            bg-dark/50
            dark:bg-light/50
          "
        />
      </motion.div>

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2

          h-[320px]
          w-[320px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-dashed
          border-dark/[0.09]
          dark:border-light/[0.09]
        "
      />

      {/* AVIATO */}

      {type ===
        "orbit" && (
        <>
          {[0, 1, 2, 3].map(
            (index) => (
              <motion.div
                key={
                  index
                }
                animate={{
                  scale: [
                    0.8,
                    1.05,
                    0.8,
                  ],
                  opacity: [
                    0.15,
                    0.45,
                    0.15,
                  ],
                }}
                transition={{
                  duration:
                    3 +
                    index,
                  repeat:
                    Infinity,
                  delay:
                    index *
                    0.3,
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2

                  rounded-full

                  border
                  border-dark/10
                  dark:border-light/10
                "
                style={{
                  width:
                    100 +
                    index *
                      70,
                  height:
                    100 +
                    index *
                      70,
                  marginLeft:
                    -(
                      50 +
                      index *
                        35
                    ),
                  marginTop:
                    -(
                      50 +
                      index *
                        35
                    ),
                }}
              />
            )
          )}
        </>
      )}

      {/* GWEN NETWORK */}

      {type ===
        "network" && (
        <>
          {[
            [25, 25],
            [70, 20],
            [35, 68],
            [72, 70],
            [50, 48],
          ].map(
            (
              [
                left,
                top,
              ],
              index
            ) => (
              <motion.span
                key={
                  index
                }
                animate={{
                  scale: [
                    0.7,
                    1.4,
                    0.7,
                  ],
                  opacity: [
                    0.3,
                    1,
                    0.3,
                  ],
                }}
                transition={{
                  duration:
                    2.2 +
                    index *
                      0.3,
                  repeat:
                    Infinity,
                }}
                className="
                  absolute

                  h-3
                  w-3

                  rounded-full

                  bg-dark/35
                  dark:bg-light/45
                "
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              />
            )
          )}
        </>
      )}

      {/* AGENT */}

      {type ===
        "agent" && (
        <motion.div
          animate={{
            rotate: [
              0,
              360,
            ],
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
            left-1/2
            top-1/2

            h-52
            w-52

            -translate-x-1/2
            -translate-y-1/2

            rounded-[35%]

            border
            border-dark/15
            dark:border-light/15
          "
        >
          <motion.div
            animate={{
              rotate:
                -360,
            }}
            transition={{
              duration: 12,
              repeat:
                Infinity,
              ease:
                "linear",
            }}
            className="
              absolute
              inset-10

              rounded-full

              border
              border-dashed
              border-dark/20
              dark:border-light/20
            "
          />
        </motion.div>
      )}

      {/* BCG WAVE */}

      {type ===
        "wave" && (
        <div
          className="
            absolute
            left-[10%]
            right-[10%]
            top-1/2

            flex
            items-end
            justify-between

            gap-2
          "
        >
          {Array.from({
            length: 24,
          }).map(
            (
              _,
              index
            ) => (
              <motion.span
                key={
                  index
                }
                animate={{
                  height: [
                    20,
                    50 +
                      ((index *
                        13) %
                        100),
                    20,
                  ],
                }}
                transition={{
                  duration:
                    2 +
                    (index %
                      5) *
                      0.25,
                  repeat:
                    Infinity,
                }}
                className="
                  w-[2px]

                  bg-dark/20
                  dark:bg-light/20
                "
              />
            )
          )}
        </div>
      )}

      {/* TRANSFORMER */}

      {type ===
        "transformer" && (
        <div
          className="
            absolute
            inset-[18%]

            grid
            grid-cols-6
            gap-6
          "
        >
          {Array.from({
            length: 30,
          }).map(
            (
              _,
              index
            ) => (
              <motion.span
                key={
                  index
                }
                animate={{
                  opacity: [
                    0.12,
                    0.75,
                    0.12,
                  ],
                  scale: [
                    0.8,
                    1.3,
                    0.8,
                  ],
                }}
                transition={{
                  duration:
                    2,
                  delay:
                    (index %
                      8) *
                    0.1,
                  repeat:
                    Infinity,
                }}
                className="
                  mx-auto

                  h-2
                  w-2

                  rounded-full

                  bg-dark/30
                  dark:bg-light/30
                "
              />
            )
          )}
        </div>
      )}

      {/* PWC RADAR */}

      {type ===
        "radar" && (
        <>
          {[1, 2, 3].map(
            (ring) => (
              <motion.div
                key={
                  ring
                }
                animate={{
                  scale: [
                    0.92,
                    1.05,
                    0.92,
                  ],
                }}
                transition={{
                  duration:
                    3 +
                    ring,
                  repeat:
                    Infinity,
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2

                  -translate-x-1/2
                  -translate-y-1/2

                  rounded-full

                  border
                  border-dark/10
                  dark:border-light/10
                "
                style={{
                  width:
                    ring *
                    110,
                  height:
                    ring *
                    110,
                }}
              />
            )
          )}

          <motion.span
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 6,
              repeat:
                Infinity,
              ease:
                "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2

              h-[1px]
              w-[170px]

              origin-left

              bg-dark/20
              dark:bg-light/20
            "
          />
        </>
      )}

      {/* TECHNOHACKS */}

      {type ===
        "pulse" && (
        <div
          className="
            absolute
            left-[10%]
            right-[10%]
            top-1/2

            h-px

            bg-dark/10
            dark:bg-light/10
          "
        >
          <motion.div
            animate={{
              left: [
                "0%",
                "100%",
              ],
            }}
            transition={{
              duration: 3,
              repeat:
                Infinity,
              ease:
                "linear",
            }}
            className="
              absolute
              -top-1

              h-2
              w-2

              rounded-full

              bg-dark
              dark:bg-light

              shadow-[0_0_25px_currentColor]
            "
          />
        </div>
      )}
    </div>
  );
};

/* ============================================================
   METRIC
============================================================ */

const Metric = ({
  metric,
  index,
}) => {
  return (
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
        delay:
          0.1 +
          index *
            0.08,
      }}
      className="
        border-l
        border-dark/10
        dark:border-light/10

        pl-4
      "
    >
      <p
        className="
          text-[clamp(1.6rem,2.5vw,3rem)]
          font-black

          leading-none
          tracking-[-0.06em]
        "
      >
        {metric.value}
      </p>

      <p
        className="
          mt-2

          text-[7px]
          font-black

          uppercase
          tracking-[0.15em]

          text-dark/35
          dark:text-light/35
        "
      >
        {metric.label}
      </p>
    </motion.div>
  );
};

/* ============================================================
   SCENE CONTENT
============================================================ */

const ExperienceScene = ({
  experience,
}) => {
  return (
    <AnimatePresence
      mode="wait"
    >
      <motion.div
        key={
          experience.id
        }
        initial={{
          opacity: 0,
          y: 35,
          filter:
            "blur(10px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter:
            "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: -25,
          filter:
            "blur(8px)",
        }}
        transition={{
          duration: 0.5,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="
          w-full
        "
      >
        {/* META */}

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
              text-[8px]
              font-black

              uppercase
              tracking-[0.2em]

              text-dark/35
              dark:text-light/35
            "
          >
            {
              experience.type
            }
          </span>
        </div>

        {/* ROLE */}

        <h3
          className="
            mt-6

            text-[clamp(3rem,5vw,6.3rem)]
            font-black

            leading-[0.85]
            tracking-[-0.07em]
          "
        >
          {
            experience.position
          }
        </h3>

        {/* COMPANY */}

        <a
          href={
            experience.companyLink
          }
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-3
            inline-block

            text-[clamp(1.8rem,3vw,3.6rem)]
            font-black

            tracking-[-0.055em]

            text-dark/25
            dark:text-light/25

            transition-colors

            hover:text-dark
            dark:hover:text-light
          "
        >
          @
          {
            experience.company
          }
        </a>

        {/* DATE */}

        <div
          className="
            mt-6

            flex
            flex-wrap
            items-center

            gap-x-4
            gap-y-2
          "
        >
          <span
            className="
              text-[8px]
              font-black

              uppercase
              tracking-[0.16em]
            "
          >
            {
              experience.time
            }
          </span>

          <span
            className="
              text-dark/20
              dark:text-light/20
            "
          >
            /
          </span>

          <span
            className="
              text-[8px]
              font-bold

              uppercase
              tracking-[0.14em]

              text-dark/40
              dark:text-light/40
            "
          >
            {
              experience.address
            }
          </span>
        </div>

        {/* SUMMARY */}

        <p
          className="
            mt-6

            max-w-3xl

            text-sm
            font-medium

            leading-[1.8]

            text-dark/60
            dark:text-light/60

            xl:text-xs
          "
        >
          {
            experience.summary
          }
        </p>

        {/* HIGHLIGHTS */}

        {experience
          .highlights
          .length >
          0 && (
          <div
            className="
              mt-6

              grid
              grid-cols-2

              gap-x-8
              gap-y-3

              xl:grid-cols-1
            "
          >
            {experience.highlights.map(
              (
                highlight,
                index
              ) => (
                <motion.div
                  key={
                    index
                  }
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      0.08 +
                      index *
                        0.06,
                  }}
                  className="
                    flex
                    gap-3

                    border-t
                    border-dark/[0.07]
                    dark:border-light/[0.08]

                    pt-3
                  "
                >
                  <span
                    className="
                      mt-[5px]

                      h-1
                      w-1

                      shrink-0

                      rounded-full

                      bg-dark/50
                      dark:bg-light/50
                    "
                  />

                  <p
                    className="
                      text-[10px]
                      font-medium

                      leading-[1.55]

                      text-dark/50
                      dark:text-light/50
                    "
                  >
                    {
                      highlight
                    }
                  </p>
                </motion.div>
              )
            )}
          </div>
        )}

        {/* TECH */}

        <div
          className="
            mt-6

            flex
            flex-wrap

            gap-2
          "
        >
          {experience.tech.map(
            (
              technology
            ) => (
              <span
                key={
                  technology
                }
                className="
                  rounded-full

                  border
                  border-dark/[0.08]
                  dark:border-light/[0.1]

                  px-3
                  py-1.5

                  text-[7px]
                  font-black

                  uppercase
                  tracking-[0.12em]

                  text-dark/45
                  dark:text-light/45
                "
              >
                {
                  technology
                }
              </span>
            )
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ============================================================
   EXPERIENCE NAV
============================================================ */

const ExperienceNavigator = ({
  active,
  onSelect,
}) => {
  return (
    <nav
      className="
        absolute
        right-5
        top-1/2

        z-[90]

        flex
        -translate-y-1/2
        flex-col

        items-end

        gap-3

        xl:right-2
      "
    >
      {EXPERIENCES.map(
        (
          experience,
          index
        ) => {
          const selected =
            active ===
            index;

          return (
            <button
              key={
                experience.id
              }
              type="button"
              onClick={() =>
                onSelect(
                  index
                )
              }
              className="
                group
                flex
                min-h-[42px]
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
                  tracking-[0.14em]

                  transition-all

                  2xl:block

                  ${
                    selected
                      ? "opacity-50 translate-x-0"
                      : "opacity-0 translate-x-3 group-hover:opacity-30 group-hover:translate-x-0"
                  }
                `}
              >
                {
                  experience.company
                }
              </span>

              <motion.span
                animate={{
                  opacity:
                    selected
                      ? 1
                      : 0.22,

                  scale:
                    selected
                      ? 1
                      : 0.75,
                }}
                className={`
                  min-w-[40px]

                  text-right

                  font-black
                  leading-none

                  tracking-[-0.06em]

                  ${
                    selected
                      ? "text-[28px]"
                      : "text-[16px]"
                  }
                `}
              >
                {
                  experience.number
                }
              </motion.span>
            </button>
          );
        }
      )}
    </nav>
  );
};

/* ============================================================
   DESKTOP CINEMATIC TRAILER
============================================================ */

const DesktopExperience =
  () => {
    const sectionRef =
      useRef(null);

    const [
      active,
      setActive,
    ] = useState(0);

    const reducedMotion =
      Boolean(
        useReducedMotion()
      );

    const {
      scrollYProgress,
    } = useScroll({
      target:
        sectionRef,

      offset: [
        "start start",
        "end end",
      ],
    });

    const progress =
      useSpring(
        scrollYProgress,
        {
          stiffness: 100,
          damping: 30,
          mass: 0.4,
        }
      );

    /*
      Scroll controls active scene.

      No hidden DOM chapters.
      No scrollIntoView.
      No negative-margin hack.
    */

    useEffect(() => {
      const unsubscribe =
        scrollYProgress.on(
          "change",
          (
            latest
          ) => {
            const safe =
              Math.max(
                0,
                Math.min(
                  0.99999,
                  latest
                )
              );

            const index =
              Math.min(
                EXPERIENCES.length -
                  1,

                Math.floor(
                  safe *
                    EXPERIENCES.length
                )
              );

            setActive(
              (
                current
              ) =>
                current ===
                index
                  ? current
                  : index
            );
          }
        );

      return () =>
        unsubscribe();
    }, [
      scrollYProgress,
    ]);

    const experience =
      EXPERIENCES[
        active
      ];

    /*
      Right-side numbers are TABS.

      They DO NOT navigate
      to blank spacer sections.

      Same cinematic screen,
      different experience.
    */

    const selectScene =
      useCallback(
        (index) => {
          setActive(
            index
          );
        },
        []
      );

    return (
      <div
        ref={
          sectionRef
        }
        className="
          relative

          h-[700vh]
        "
      >
        <div
          className="
            sticky
            top-0

            h-screen
            min-h-[700px]

            overflow-hidden

            bg-light
            dark:bg-dark
          "
        >
          {/* CINEMATIC LETTERBOX */}

          <div
            className="
              absolute
              left-0
              right-0
              top-0

              z-[100]

              h-[6px]

              bg-dark
              dark:bg-light
            "
          />

          {/* BACKGROUND COMPANY */}

          <AnimatePresence
            mode="wait"
          >
            <motion.div
              key={
                experience.company
              }
              initial={{
                opacity: 0,
                scale:
                  1.05,
                y: 35,
              }}
              animate={{
                opacity:
                  0.025,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -30,
              }}
              transition={{
                duration:
                  0.6,
              }}
              className="
                pointer-events-none

                absolute
                left-1/2
                top-1/2

                z-0

                -translate-x-1/2
                -translate-y-1/2

                whitespace-nowrap

                text-[12vw]
                font-black

                uppercase

                tracking-[-0.09em]
              "
            >
              {
                experience.company
              }
            </motion.div>
          </AnimatePresence>

          {/* TOP HEADER */}

          <header
            className="
              absolute
              left-0
              right-0
              top-[6px]

              z-[70]

              flex
              h-[66px]
              items-center
              justify-between

              border-b
              border-dark/[0.08]
              dark:border-light/[0.08]

              bg-light/70
              dark:bg-dark/70

              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                items-center
                gap-6
              "
            >
              <span
                className="
                  text-[9px]
                  font-black

                  uppercase
                  tracking-[0.24em]
                "
              >
                03 /
                EXPERIENCE
              </span>

              <span
                className="
                  text-[7px]
                  font-black

                  uppercase
                  tracking-[0.18em]

                  text-dark/25
                  dark:text-light/25
                "
              >
                CAREER
                TRAILER /
                PLAYING
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
                    0.2,
                    1,
                    0.2,
                  ],
                }}
                transition={{
                  duration:
                    1.5,
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
                  tracking-[0.18em]

                  text-dark/30
                  dark:text-light/30
                "
              >
                SCENE{" "}
                {
                  experience.number
                }{" "}
                / 07
              </span>
            </div>
          </header>

          {/* MAIN */}

          <div
            className="
              relative
              z-10

              grid
              h-full
              grid-cols-12

              pt-[72px]
            "
          >
            {/* LEFT */}

            <div
              className="
                col-span-7

                flex
                items-center

                pr-14

                xl:col-span-7
                xl:pr-8
              "
            >
              <ExperienceScene
                experience={
                  experience
                }
              />
            </div>

            {/* RIGHT */}

            <div
              className="
                relative

                col-span-5

                flex
                items-center
                justify-center

                border-l
                border-dark/[0.07]
                dark:border-light/[0.08]
              "
            >
              <TiltCard
                className="
                  relative

                  h-[72%]
                  w-[76%]

                  overflow-hidden

                  rounded-[2rem]

                  border
                  border-dark/[0.1]
                  dark:border-light/[0.1]

                  bg-light/40
                  dark:bg-dark/40

                  shadow-[0_35px_100px_rgba(0,0,0,0.12)]

                  backdrop-blur-sm
                "
              >
                <CinematicVisual
                  type={
                    experience.visual
                  }
                />

                {/* GLASS CORE */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2

                    z-20

                    w-[70%]

                    -translate-x-1/2
                    -translate-y-1/2

                    rounded-[1.5rem]

                    border
                    border-dark/[0.08]
                    dark:border-light/[0.1]

                    bg-light/70
                    dark:bg-dark/70

                    p-7

                    shadow-xl

                    backdrop-blur-xl
                  "
                  style={{
                    transform:
                      "translateZ(60px)",
                  }}
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[7px]
                          font-black

                          uppercase
                          tracking-[0.18em]

                          text-dark/30
                          dark:text-light/30
                        "
                      >
                        CAREER
                        SCENE
                      </p>

                      <p
                        className="
                          mt-1

                          text-5xl
                          font-black

                          tracking-[-0.08em]
                        "
                      >
                        {
                          experience.number
                        }
                      </p>
                    </div>

                    <p
                      className="
                        text-right

                        text-[8px]
                        font-black

                        uppercase
                        tracking-[0.14em]

                        text-dark/35
                        dark:text-light/35
                      "
                    >
                      {
                        experience.year
                      }
                    </p>
                  </div>

                  <div
                    className="
                      mt-8

                      grid
                      grid-cols-2

                      gap-x-5
                      gap-y-7
                    "
                  >
                    {experience.metrics.map(
                      (
                        metric,
                        index
                      ) => (
                        <Metric
                          key={
                            metric.label
                          }
                          metric={
                            metric
                          }
                          index={
                            index
                          }
                        />
                      )
                    )}
                  </div>

                  <div
                    className="
                      mt-8

                      flex
                      items-center
                      justify-between

                      border-t
                      border-dark/[0.08]
                      dark:border-light/[0.08]

                      pt-4
                    "
                  >
                    <span
                      className="
                        text-[7px]
                        font-black

                        uppercase
                        tracking-[0.15em]

                        text-dark/30
                        dark:text-light/30
                      "
                    >
                      {
                        experience.company
                      }
                    </span>

                    <span
                      className="
                        text-[7px]
                        font-black

                        uppercase
                        tracking-[0.15em]

                        text-dark/30
                        dark:text-light/30
                      "
                    >
                      ACTIVE
                      RECORD
                    </span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* RIGHT NAV */}

          <ExperienceNavigator
            active={
              active
            }
            onSelect={
              selectScene
            }
          />

          {/* BOTTOM FILM STRIP */}

          <div
            className="
              absolute
              bottom-5
              left-0
              z-50

              flex
              items-center

              gap-5
            "
          >
            <span
              className="
                text-[7px]
                font-black

                uppercase
                tracking-[0.2em]

                text-dark/25
                dark:text-light/25
              "
            >
              SCROLL TO
              CONTINUE
            </span>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              {EXPERIENCES.map(
                (
                  item,
                  index
                ) => (
                  <motion.span
                    key={
                      item.id
                    }
                    animate={{
                      width:
                        active ===
                        index
                          ? 28
                          : 7,

                      opacity:
                        active ===
                        index
                          ? 0.8
                          : 0.12,
                    }}
                    className="
                      block
                      h-[2px]

                      bg-dark
                      dark:bg-light
                    "
                  />
                )
              )}
            </div>
          </div>

          {/* PROGRESS */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0

              z-[110]

              h-[3px]

              bg-dark/[0.05]
              dark:bg-light/[0.07]
            "
          >
            <motion.div
              style={{
                scaleX:
                  progress,
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
      </div>
    );
  };

/* ============================================================
   MOBILE EXPERIENCE CARD
============================================================ */

const MobileExperienceCard = ({
  experience,
  index,
}) => {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration:
          0.55,
      }}
      className="
        relative

        border-t
        border-dark/10
        dark:border-light/10

        py-12
      "
    >
      {/* NUMBER */}

      <div
        className="
          flex
          items-end
          justify-between
        "
      >
        <div
          className="
            flex
            items-end
            gap-1
          "
        >
          <span
            className="
              text-4xl
              font-black

              tracking-[-0.07em]
            "
          >
            {
              experience.number
            }
          </span>

          <span
            className="
              mb-1
              text-[7px]

              text-dark/25
              dark:text-light/25
            "
          >
            /07
          </span>
        </div>

        <span
          className="
            text-[7px]
            font-black

            uppercase
            tracking-[0.15em]

            text-dark/30
            dark:text-light/30
          "
        >
          {
            experience.year
          }
        </span>
      </div>

      {/* VISUAL */}

      <div
        className="
          relative

          mt-7
          h-[260px]

          overflow-hidden

          rounded-[1.7rem]

          border
          border-dark/[0.08]
          dark:border-light/[0.09]
        "
      >
        <CinematicVisual
          type={
            experience.visual
          }
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2

            z-20

            -translate-x-1/2
            -translate-y-1/2

            rounded-xl

            border
            border-dark/10
            dark:border-light/10

            bg-light/70
            dark:bg-dark/70

            px-6
            py-5

            text-center

            backdrop-blur-xl
          "
        >
          <p
            className="
              text-[7px]
              font-black

              uppercase
              tracking-[0.15em]

              text-dark/30
              dark:text-light/30
            "
          >
            CAREER SCENE
          </p>

          <p
            className="
              mt-2
              text-4xl
              font-black

              tracking-[-0.07em]
            "
          >
            {
              experience.number
            }
          </p>
        </div>
      </div>

      {/* CONTENT */}

      <p
        className="
          mt-8

          text-[7px]
          font-black

          uppercase
          tracking-[0.17em]

          text-dark/35
          dark:text-light/35
        "
      >
        {
          experience.type
        }
      </p>

      <h3
        className="
          mt-3

          text-[clamp(2.4rem,10vw,4rem)]
          font-black

          leading-[0.88]
          tracking-[-0.06em]
        "
      >
        {
          experience.position
        }
      </h3>

      <a
        href={
          experience.companyLink
        }
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-2
          inline-block

          text-xl
          font-black

          tracking-[-0.04em]

          text-dark/30
          dark:text-light/30
        "
      >
        @
        {
          experience.company
        }
      </a>

      <p
        className="
          mt-4

          text-[8px]
          font-black

          uppercase
          tracking-[0.13em]

          text-dark/35
          dark:text-light/35
        "
      >
        {
          experience.time
        }
      </p>

      <p
        className="
          mt-6

          text-xs
          font-medium

          leading-[1.8]

          text-dark/55
          dark:text-light/55
        "
      >
        {
          experience.summary
        }
      </p>

      {/* METRICS */}

      <div
        className="
          mt-7

          grid
          grid-cols-2

          gap-5
        "
      >
        {experience.metrics.map(
          (
            metric,
            metricIndex
          ) => (
            <Metric
              key={
                metric.label
              }
              metric={
                metric
              }
              index={
                metricIndex
              }
            />
          )
        )}
      </div>

      {/* HIGHLIGHTS */}

      {experience
        .highlights
        .length >
        0 && (
        <div
          className="
            mt-8
          "
        >
          {experience.highlights.map(
            (
              highlight,
              highlightIndex
            ) => (
              <div
                key={
                  highlightIndex
                }
                className="
                  flex
                  gap-3

                  border-t
                  border-dark/[0.08]
                  dark:border-light/[0.09]

                  py-3
                "
              >
                <span
                  className="
                    mt-[5px]

                    h-1
                    w-1

                    shrink-0

                    rounded-full

                    bg-dark/50
                    dark:bg-light/50
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-medium

                    leading-[1.6]

                    text-dark/50
                    dark:text-light/50
                  "
                >
                  {
                    highlight
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* TECH */}

      <div
        className="
          mt-6

          flex
          flex-wrap

          gap-2
        "
      >
        {experience.tech.map(
          (
            technology
          ) => (
            <span
              key={
                technology
              }
              className="
                rounded-full

                border
                border-dark/[0.08]
                dark:border-light/[0.09]

                px-3
                py-1.5

                text-[7px]
                font-black

                uppercase
                tracking-[0.11em]

                text-dark/40
                dark:text-light/40
              "
            >
              {
                technology
              }
            </span>
          )
        )}
      </div>
    </motion.article>
  );
};

/* ============================================================
   MOBILE EXPERIENCE
============================================================ */

const MobileExperience =
  () => {
    return (
      <div
        className="
          hidden
          md:block
        "
      >
        {EXPERIENCES.map(
          (
            experience,
            index
          ) => (
            <MobileExperienceCard
              key={
                experience.id
              }
              experience={
                experience
              }
              index={
                index
              }
            />
          )
        )}
      </div>
    );
  };

/* ============================================================
   CINEMATIC INTRO
============================================================ */

const ExperienceIntro =
  () => {
    return (
      <div
        className="
          relative

          pb-28
          pt-20

          text-center

          md:pb-16
        "
      >
        {/* TOP LABEL */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            flex
            items-center
            justify-center

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
              text-[8px]
              font-black

              uppercase
              tracking-[0.22em]

              text-dark/35
              dark:text-light/35
            "
          >
            CAREER TRAILER /
            2021 → 2026
          </span>
        </motion.div>

        {/* GIANT TITLE */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 50,
            filter:
              "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter:
              "blur(0px)",
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="
            mt-7

            text-[clamp(4.5rem,10vw,10rem)]
            font-black

            leading-[0.75]
            tracking-[-0.085em]
          "
        >
          EXPERIENCE
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            mx-auto
            mt-9

            max-w-2xl

            text-sm
            font-medium

            leading-[1.8]

            text-dark/50
            dark:text-light/50

            md:px-4
            md:text-xs
          "
        >
          Engineering
          intelligence across
          data, machine
          learning, agentic AI,
          cloud, healthcare,
          and production
          systems.
        </motion.p>

        {/* FILM TIMELINE */}

        <div
          className="
            mx-auto
            mt-12

            flex
            max-w-xl
            items-center
          "
        >
          <span
            className="
              text-[7px]
              font-black

              tracking-[0.15em]

              text-dark/30
              dark:text-light/30
            "
          >
            2021
          </span>

          <div
            className="
              mx-4
              h-px
              flex-1

              bg-dark/10
              dark:bg-light/10
            "
          >
            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.5,
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

          <span
            className="
              text-[7px]
              font-black

              tracking-[0.15em]

              text-dark/30
              dark:text-light/30
            "
          >
            2026
          </span>
        </div>

        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat:
              Infinity,
          }}
          className="
            mt-10
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
            SCROLL TO PLAY
          </p>

          <p
            className="
              mt-2

              text-sm

              text-dark/25
              dark:text-light/25
            "
          >
            ↓
          </p>
        </motion.div>
      </div>
    );
  };

/* ============================================================
   MAIN EXPERIENCE
============================================================ */

const Experience = () => {
  const {
    matches: isDesktop,
    ready,
  } = useMediaQuery("(min-width: 768px)");

  return (
    <section
      id="experience"
      className="
        relative
        my-64
        w-full
        md:my-32
      "
    >
      {/* CINEMATIC TRAILER INTRO */}
      <ExperienceIntro />

      {/* Only one responsive experience tree is mounted. */}
      {ready ? (
        isDesktop ? (
          <div className="md:hidden">
            <DesktopExperience />
          </div>
        ) : (
          <MobileExperience />
        )
      ) : (
        <div
          aria-hidden="true"
          className="h-[45vh] w-full md:h-[30vh]"
        />
      )}

      {/* TRAILER END */}
      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-dark/[0.08]
          dark:border-light/[0.08]
          py-8
        "
      >
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
          CAREER ARCHIVE
        </span>

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
          07 / 07 — TRAILER COMPLETE
        </span>
      </div>
    </section>
  );
};

export default Experience;
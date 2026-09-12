import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* ============================================================
   EDUCATION DATA
============================================================ */

const EDUCATION_DATA = [
  {
    id: "mba",
    number: "01",
    year: "2025—2027",
    status: "CURRENT",
    degree: "MBA in Information Technology",
    institution:
      "Deogiri Institute of Management Studies (DIMS)",
    type: "POSTGRADUATE / MANAGEMENT + TECHNOLOGY",

    description:
      "Specialized in Information Technology with a strong focus on data-driven decision-making, enterprise systems, and modern AI technologies. Gained hands-on experience in data science, machine learning, cloud computing, and software engineering through academic and industry projects. Developed skills in IT management, system design, and technology-driven business strategies — enabling me to bridge technical innovation with organizational goals and deliver scalable, intelligent solutions.",

    subjects: [
      "Information Technology",
      "AI Strategy",
      "Data Science",
      "Enterprise Systems",
      "Technology Management",
      "Cloud Computing",
      "Business Analytics",
      "System Design",
    ],

    metric: "MBA",
    metricLabel: "Information Technology",

    visual: "orbit",
  },

  {
    id: "btech",
    number: "02",
    year: "2021—2025",
    status: "COMPLETED",
    degree:
      "B.Tech in Computer Science and Engineering",
    institution:
      "People's Education Society (P.E.S)",
    type: "UNDERGRADUATE / COMPUTER SCIENCE",

    description:
      "Developed a comprehensive foundation in data science, machine learning, deep learning, and software engineering. Gained hands-on experience through multiple academic and industry projects involving AI development, predictive modeling, and cloud deployment pipelines. My journey here strengthened my technical problem-solving, programming, and analytical abilities — empowering me to bridge the gap between data-driven innovation and real-world applications in AI and intelligent systems.",

    subjects: [
      "Computer Science",
      "Machine Learning",
      "Deep Learning",
      "Data Science",
      "Software Engineering",
      "Cloud Computing",
      "Programming",
      "Algorithms",
    ],

    metric: "9.0",
    metricLabel: "CGPA / 10",

    visual: "core",
  },

  {
    id: "coursework",
    number: "03",
    year: "2021—2025",
    status: "CONTINUOUS",
    degree:
      "Online Coursework / Certification",
    institution:
      "Coursera, Udemy, edX and other Online Platforms",
    type: "CONTINUOUS LEARNING / SPECIALIZATION",

    description:
      "Completed coursework in advanced topics such as Data Science, Data Analysis, Data Engineering, Machine Learning, Artificial Intelligence, Deep Learning, Cloud Computing (AWS, Azure), Programming Languages, DevOps, Cyber Security, Internet of Things, Linux OS, Computer Vision, Natural Language Processing, and many more.",

    subjects: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Data Engineering",
      "AWS / Azure",
      "DevOps",
      "Cyber Security",
      "Computer Vision",
      "NLP",
      "Linux",
      "IoT",
      "Programming",
    ],

    metric: "∞",
    metricLabel: "Continuous Learning",

    visual: "network",
  },
];

/* ============================================================
   3D TILT CARD
============================================================ */

const TiltCard = ({
  children,
  className = "",
}) => {
  const reducedMotion =
    useReducedMotion();

  const rotateX =
    useMotionValue(0);

  const rotateY =
    useMotionValue(0);

  const springX =
    useSpring(
      rotateX,
      {
        stiffness: 150,
        damping: 18,
      }
    );

  const springY =
    useSpring(
      rotateY,
      {
        stiffness: 150,
        damping: 18,
      }
    );

  const handleMouseMove =
    (event) => {
      if (
        reducedMotion
      )
        return;

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

      rotateX.set(
        ((y -
          centerY) /
          centerY) *
          -4
      );

      rotateY.set(
        ((x -
          centerX) /
          centerX) *
          5
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
        rotateX:
          springX,
        rotateY:
          springY,
        transformPerspective:
          1300,
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
   KNOWLEDGE ORBIT
============================================================ */

const knowledgeNodes = [
  {
    label: "AI",
    position:
      "left-[10%] top-[18%]",
  },
  {
    label: "DATA",
    position:
      "right-[10%] top-[18%]",
  },
  {
    label: "ML",
    position:
      "left-[4%] top-[48%]",
  },
  {
    label: "CLOUD",
    position:
      "right-[4%] top-[48%]",
  },
  {
    label: "SYSTEMS",
    position:
      "left-[12%] bottom-[12%]",
  },
  {
    label: "BUSINESS",
    position:
      "right-[12%] bottom-[12%]",
  },
];

const KnowledgeOrbit = () => {
  const reducedMotion =
    useReducedMotion();

  return (
    <div
      className="
        relative
        mx-auto
        mt-16

        h-[520px]
        max-w-5xl

        overflow-hidden

        rounded-[2.5rem]

        border
        border-dark/[0.07]
        dark:border-light/[0.08]

        bg-light/30
        dark:bg-dark/30

        md:h-[420px]
        sm:h-[360px]
      "
    >
      {/* GRID */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)]

          bg-[size:40px_40px]

          dark:opacity-40
        "
      />

      {/* GHOST TEXT */}

      <div
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          whitespace-nowrap

          text-[11vw]
          font-black

          tracking-[-0.08em]

          text-dark/[0.018]
          dark:text-light/[0.025]

          select-none
        "
      >
        KNOWLEDGE
      </div>

      {/* ORBIT RING 1 */}

      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                rotate:
                  360,
              }
        }
        transition={{
          duration: 35,
          repeat:
            Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2

          h-[330px]
          w-[330px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-dark/[0.09]
          dark:border-light/[0.09]

          md:h-[270px]
          md:w-[270px]

          sm:h-[220px]
          sm:w-[220px]
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

            bg-dark
            dark:bg-light

            shadow-[0_0_18px_currentColor]
          "
        />
      </motion.div>

      {/* ORBIT RING 2 */}

      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                rotate:
                  -360,
              }
        }
        transition={{
          duration: 25,
          repeat:
            Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2

          h-[250px]
          w-[250px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-dashed
          border-dark/[0.12]
          dark:border-light/[0.12]

          md:h-[205px]
          md:w-[205px]

          sm:h-[170px]
          sm:w-[170px]
        "
      />

      {/* CENTER CORE */}

      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                scale: [
                  1,
                  1.025,
                  1,
                ],
              }
        }
        transition={{
          duration: 3,
          repeat:
            Infinity,
        }}
        className="
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
          dark:border-light/10

          bg-light/75
          dark:bg-dark/75

          shadow-[0_25px_80px_rgba(0,0,0,0.12)]

          backdrop-blur-xl

          md:h-32
          md:w-32

          sm:h-28
          sm:w-28
        "
      >
        <div
          className="
            text-center
          "
        >
          <motion.span
            animate={
              reducedMotion
                ? {}
                : {
                    opacity:
                      [
                        0.3,
                        1,
                        0.3,
                      ],
                    scale:
                      [
                        0.7,
                        1.3,
                        0.7,
                      ],
                  }
            }
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
            KNOWLEDGE CORE
          </p>

          <p
            className="
              mt-1

              text-lg
              font-black

              tracking-[-0.05em]

              md:text-sm
            "
          >
            EDUCATION
          </p>
        </div>
      </motion.div>

      {/* DESKTOP NODES */}

      <div
        className="
          md:hidden
        "
      >
        {knowledgeNodes.map(
          (
            node,
            index
          ) => (
            <motion.div
              key={
                node.label
              }
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay:
                  index *
                  0.08,
              }}
              whileHover={{
                scale: 1.08,
                y: -3,
              }}
              className={`
                absolute
                z-30
                ${node.position}

                flex
                items-center
                gap-2

                rounded-full

                border
                border-dark/10
                dark:border-light/10

                bg-light/70
                dark:bg-dark/70

                px-4
                py-2.5

                backdrop-blur-xl
              `}
            >
              <motion.span
                animate={
                  reducedMotion
                    ? {}
                    : {
                        opacity:
                          [
                            0.25,
                            1,
                            0.25,
                          ],
                      }
                }
                transition={{
                  duration:
                    2 +
                    index *
                      0.25,
                  repeat:
                    Infinity,
                }}
                className="
                  h-1.5
                  w-1.5

                  rounded-full

                  bg-dark/60
                  dark:bg-light/60
                "
              />

              <span
                className="
                  text-[8px]
                  font-black

                  uppercase
                  tracking-[0.15em]
                "
              >
                {
                  node.label
                }
              </span>
            </motion.div>
          )
        )}
      </div>

      {/* MOBILE LABELS */}

      <div
        className="
          absolute
          bottom-5
          left-1/2

          hidden
          -translate-x-1/2

          flex-wrap
          justify-center

          gap-2

          md:flex
        "
      >
        {knowledgeNodes.map(
          (node) => (
            <span
              key={
                node.label
              }
              className="
                rounded-full

                border
                border-dark/10
                dark:border-light/10

                px-2.5
                py-1.5

                text-[6px]
                font-black

                uppercase
                tracking-[0.12em]
              "
            >
              {
                node.label
              }
            </span>
          )
        )}
      </div>
    </div>
  );
};

/* ============================================================
   SCORE / METRIC
============================================================ */

const AcademicMetric = ({
  value,
  label,
}) => {
  return (
    <div
      className="
        relative

        flex
        h-36
        w-36

        shrink-0

        items-center
        justify-center

        rounded-full

        border
        border-dark/10
        dark:border-light/10

        md:h-28
        md:w-28
      "
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat:
            Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-2

          rounded-full

          border
          border-dashed
          border-dark/10
          dark:border-light/10
        "
      />

      <div
        className="
          relative
          z-10

          text-center
        "
      >
        <p
          className="
            text-3xl
            font-black

            tracking-[-0.06em]

            md:text-2xl
          "
        >
          {value}
        </p>

        <p
          className="
            mt-2

            max-w-[80px]

            text-[6px]
            font-black

            uppercase
            tracking-[0.13em]

            text-dark/35
            dark:text-light/35
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
};

/* ============================================================
   KNOWLEDGE VISUAL
============================================================ */

const KnowledgeVisual = ({
  visual,
  number,
}) => {
  return (
    <div
      className="
        relative

        h-full
        w-full

        overflow-hidden
      "
    >
      {/* GRID */}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]

          bg-[size:34px_34px]

          dark:opacity-40
        "
      />

      {/* MBA ORBIT */}

      {visual ===
        "orbit" && (
        <>
          {[
            110,
            170,
            230,
          ].map(
            (
              size,
              index
            ) => (
              <motion.div
                key={
                  size
                }
                animate={{
                  rotate:
                    index %
                      2 ===
                    0
                      ? 360
                      : -360,
                }}
                transition={{
                  duration:
                    18 +
                    index *
                      7,
                  repeat:
                    Infinity,
                  ease:
                    "linear",
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
                    size,
                  height:
                    size,
                }}
              >
                <span
                  className="
                    absolute
                    left-1/2
                    top-[-3px]

                    h-1.5
                    w-1.5

                    rounded-full

                    bg-dark/50
                    dark:bg-light/50
                  "
                />
              </motion.div>
            )
          )}
        </>
      )}

      {/* BTECH CORE */}

      {visual ===
        "core" && (
        <>
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat:
                Infinity,
              ease:
                "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2

              h-56
              w-56

              -translate-x-1/2
              -translate-y-1/2

              rounded-[32%]

              border
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
              duration: 20,
              repeat:
                Infinity,
              ease:
                "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2

              h-40
              w-40

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              border
              border-dashed
              border-dark/15
              dark:border-light/15
            "
          />
        </>
      )}

      {/* COURSE NETWORK */}

      {visual ===
        "network" && (
        <>
          {Array.from({
            length: 18,
          }).map(
            (
              _,
              index
            ) => {
              const left =
                12 +
                ((index *
                  37) %
                  78);

              const top =
                10 +
                ((index *
                  53) %
                  80);

              return (
                <motion.span
                  key={
                    index
                  }
                  animate={{
                    scale:
                      [
                        0.7,
                        1.4,
                        0.7,
                      ],
                    opacity:
                      [
                        0.2,
                        0.8,
                        0.2,
                      ],
                  }}
                  transition={{
                    duration:
                      2 +
                      (index %
                        5) *
                        0.35,
                    repeat:
                      Infinity,
                  }}
                  className="
                    absolute

                    h-2
                    w-2

                    rounded-full

                    bg-dark/35
                    dark:bg-light/35
                  "
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                  }}
                />
              );
            }
          )}
        </>
      )}

      {/* CENTER NUMBER */}

      <div
        className="
          absolute
          left-1/2
          top-1/2

          z-20

          flex
          h-28
          w-28

          -translate-x-1/2
          -translate-y-1/2

          items-center
          justify-center

          rounded-full

          border
          border-dark/10
          dark:border-light/10

          bg-light/70
          dark:bg-dark/70

          backdrop-blur-xl
        "
      >
        <div
          className="
            text-center
          "
        >
          <p
            className="
              text-[6px]
              font-black

              uppercase
              tracking-[0.15em]

              text-dark/30
              dark:text-light/30
            "
          >
            ACADEMIC NODE
          </p>

          <p
            className="
              mt-1

              text-4xl
              font-black

              tracking-[-0.07em]
            "
          >
            {number}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   EDUCATION CARD
============================================================ */

const EducationCard = ({
  education,
  index,
}) => {
  const cardRef =
    useRef(null);

  const inView =
    useInView(
      cardRef,
      {
        once: true,
        amount: 0.18,
      }
    );

  return (
    <motion.article
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 60,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay:
          index * 0.08,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
      className="
        relative

        grid
        grid-cols-12

        gap-12

        border-t
        border-dark/[0.08]
        dark:border-light/[0.08]

        py-20

        xl:gap-8

        md:block
        md:py-14
      "
    >
      {/* LEFT INDEX */}

      <div
        className="
          col-span-2

          md:mb-8
        "
      >
        <div
          className="
            sticky
            top-28

            md:static
          "
        >
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
            ACADEMIC NODE
          </p>

          <p
            className="
              mt-2

              text-6xl
              font-black

              tracking-[-0.08em]

              xl:text-5xl

              md:text-4xl
            "
          >
            {
              education.number
            }
          </p>

          <p
            className="
              mt-4

              text-[8px]
              font-black

              uppercase
              tracking-[0.15em]

              text-dark/35
              dark:text-light/35
            "
          >
            {
              education.year
            }
          </p>

          <div
            className="
              mt-5

              inline-flex
              items-center

              gap-2

              rounded-full

              border
              border-dark/10
              dark:border-light/10

              px-3
              py-2
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
                duration:
                  2,
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
                text-[6px]
                font-black

                uppercase
                tracking-[0.14em]
              "
            >
              {
                education.status
              }
            </span>
          </div>
        </div>
      </div>

      {/* CENTER CONTENT */}

      <div
        className="
          col-span-6

          md:mb-10
        "
      >
        <motion.p
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {}
          }
          transition={{
            delay: 0.1,
          }}
          className="
            text-[7px]
            font-black

            uppercase
            tracking-[0.2em]

            text-dark/35
            dark:text-light/35
          "
        >
          {
            education.type
          }
        </motion.p>

        <h3
          className="
            mt-5

            text-[clamp(2.5rem,4vw,5rem)]
            font-black

            leading-[0.9]
            tracking-[-0.06em]
          "
        >
          {
            education.degree
          }
        </h3>

        <p
          className="
            mt-4

            text-lg
            font-black

            tracking-[-0.03em]

            text-dark/30
            dark:text-light/30

            md:text-base
          "
        >
          @{" "}
          {
            education.institution
          }
        </p>

        <p
          className="
            mt-7

            max-w-3xl

            text-sm
            font-medium

            leading-[1.85]

            text-dark/55
            dark:text-light/55

            md:text-xs
          "
        >
          {
            education.description
          }
        </p>

        {/* SUBJECTS */}

        <div
          className="
            mt-8

            flex
            flex-wrap

            gap-2
          "
        >
          {education.subjects.map(
            (
              subject,
              subjectIndex
            ) => (
              <motion.span
                key={
                  subject
                }
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  delay:
                    0.12 +
                    subjectIndex *
                      0.035,
                }}
                whileHover={{
                  y: -3,
                  scale:
                    1.04,
                }}
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

                  text-dark/45
                  dark:text-light/45
                "
              >
                {subject}
              </motion.span>
            )
          )}
        </div>

        {/* MOBILE METRIC */}

        <div
          className="
            mt-8
            hidden

            md:block
          "
        >
          <AcademicMetric
            value={
              education.metric
            }
            label={
              education.metricLabel
            }
          />
        </div>
      </div>

      {/* RIGHT VISUAL */}

      <div
        className="
          col-span-4

          md:col-span-12
        "
      >
        <TiltCard
          className="
            relative

            h-[430px]
            w-full

            overflow-hidden

            rounded-[2rem]

            border
            border-dark/[0.08]
            dark:border-light/[0.09]

            bg-light/40
            dark:bg-dark/40

            shadow-[0_30px_80px_rgba(0,0,0,0.08)]

            md:h-[300px]
          "
        >
          <KnowledgeVisual
            visual={
              education.visual
            }
            number={
              education.number
            }
          />

          {/* DESKTOP METRIC */}

          <div
            className="
              absolute
              bottom-6
              right-6

              z-30

              md:hidden
            "
            style={{
              transform:
                "translateZ(60px)",
            }}
          >
            <AcademicMetric
              value={
                education.metric
              }
              label={
                education.metricLabel
              }
            />
          </div>

          {/* HUD */}

          <div
            className="
              absolute
              left-5
              top-5

              z-30

              text-[6px]
              font-black

              uppercase
              tracking-[0.16em]

              text-dark/30
              dark:text-light/30
            "
          >
            KNOWLEDGE SYSTEM /
            {
              education.number
            }
          </div>
        </TiltCard>
      </div>
    </motion.article>
  );
};

/* ============================================================
   EDUCATION INTRO
============================================================ */

const EducationIntro = () => {
  return (
    <div
      className="
        relative

        text-center
      "
    >
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
        transition={{
          duration: 0.6,
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
          ACADEMIC INTELLIGENCE /
          2021 → 2027
        </span>
      </motion.div>

      <motion.h2
        initial={{
          opacity: 0,
          y: 45,
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

          leading-[0.76]
          tracking-[-0.085em]
        "
      >
        EDUCATION
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
          delay: 0.25,
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
        A journey from computer
        science foundations to
        advanced AI engineering,
        cloud technologies,
        enterprise systems and
        technology-driven business
        leadership.
      </motion.p>

      <KnowledgeOrbit />
    </div>
  );
};

/* ============================================================
   SCROLL ENERGY RAIL
============================================================ */

const AcademicRail = ({
  reference,
}) => {
  const {
    scrollYProgress,
  } = useScroll({
    target: reference,
    offset: [
      "start 85%",
      "end 25%",
    ],
  });

  const smooth =
    useSpring(
      scrollYProgress,
      {
        stiffness: 90,
        damping: 25,
        mass: 0.4,
      }
    );

  return (
    <div
      className="
        absolute
        left-0
        top-0
        bottom-0

        hidden
        w-[2px]

        bg-dark/[0.07]
        dark:bg-light/[0.08]

        lg:block
      "
    >
      <motion.div
        style={{
          scaleY:
            smooth,
        }}
        className="
          absolute
          inset-0

          origin-top

          bg-dark
          dark:bg-light
        "
      />

      <motion.span
        style={{
          top: useTransform(
            smooth,
            [
              0,
              1,
            ],
            [
              "0%",
              "100%",
            ]
          ),
        }}
        className="
          absolute
          left-1/2

          h-3
          w-3

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-dark
          dark:bg-light

          shadow-[0_0_22px_currentColor]
        "
      />
    </div>
  );
};

/* ============================================================
   MAIN EDUCATION
============================================================ */

const Education = () => {
  const educationRef =
    useRef(null);

  return (
    <section
      id="education"
      className="
        relative

        my-64

        w-full

        md:my-32
      "
    >
      {/* INTRO */}

      <EducationIntro />

      {/* KNOWLEDGE JOURNEY */}

      <div
        ref={
          educationRef
        }
        className="
          relative

          mt-32

          lg:pl-8

          md:mt-20
          md:pl-0
        "
      >
        <AcademicRail
          reference={
            educationRef
          }
        />

        {EDUCATION_DATA.map(
          (
            education,
            index
          ) => (
            <EducationCard
              key={
                education.id
              }
              education={
                education
              }
              index={
                index
              }
            />
          )
        )}
      </div>

      {/* ====================================================
          FINAL ACADEMIC SIGNAL
      ==================================================== */}

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
          duration: 0.7,
        }}
        className="
          relative

          mt-20

          overflow-hidden

          rounded-[2rem]

          border
          border-dark/[0.08]
          dark:border-light/[0.09]

          px-10
          py-12

          md:px-6
          md:py-10
        "
      >
        {/* GRID */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]

            bg-[size:34px_34px]
          "
        />

        <div
          className="
            relative
            z-10

            flex
            items-center
            justify-between

            gap-10

            md:flex-col
            md:items-start
          "
        >
          <div>
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
              ACADEMIC SYSTEM /
              CONTINUOUS
            </p>

            <h3
              className="
                mt-4

                max-w-3xl

                text-[clamp(2.3rem,4vw,5rem)]
                font-black

                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Learning never
              reaches a final
              version.
            </h3>

            <p
              className="
                mt-5

                max-w-2xl

                text-xs
                font-medium

                leading-[1.8]

                text-dark/50
                dark:text-light/50
              "
            >
              Each academic stage
              expanded the system —
              computer science built
              the foundation,
              continuous technical
              learning deepened the
              engineering layer, and
              postgraduate study adds
              business and technology
              leadership.
            </p>
          </div>

          <div
            className="
              relative

              flex
              h-32
              w-32

              shrink-0

              items-center
              justify-center

              rounded-full

              border
              border-dark/10
              dark:border-light/10
            "
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 15,
                repeat:
                  Infinity,
                ease:
                  "linear",
              }}
              className="
                absolute
                inset-2

                rounded-full

                border
                border-dashed
                border-dark/15
                dark:border-light/15
              "
            />

            <div
              className="
                text-center
              "
            >
              <p
                className="
                  text-4xl
                  font-black

                  tracking-[-0.08em]
                "
              >
                ∞
              </p>

              <p
                className="
                  mt-1

                  text-[6px]
                  font-black

                  uppercase
                  tracking-[0.14em]

                  text-dark/35
                  dark:text-light/35
                "
              >
                LEARNING
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION END */}

      <div
        className="
          mt-16

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
          KNOWLEDGE ARCHIVE
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
          03 / 03 — SYSTEM ACTIVE
        </span>
      </div>
    </section>
  );
};

export default Education;
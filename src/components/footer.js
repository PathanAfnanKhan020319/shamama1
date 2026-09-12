"use client";

import React, {
  useRef,
} from "react";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import Layout from "./Layout";

/* ============================================================
   MAGNETIC LINK
============================================================ */

const MagneticLink = ({
  href,
  children,
  className = "",
}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(
    x,
    {
      stiffness: 180,
      damping: 18,
    }
  );

  const springY = useSpring(
    y,
    {
      stiffness: 180,
      damping: 18,
    }
  );

  const handleMouseMove = (
    event
  ) => {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    const centerX =
      rect.left +
      rect.width / 2;

    const centerY =
      rect.top +
      rect.height / 2;

    x.set(
      (event.clientX -
        centerX) *
        0.18
    );

    y.set(
      (event.clientY -
        centerY) *
        0.18
    );
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={
        handleMouseMove
      }
      onMouseLeave={reset}
      style={{
        x: springX,
        y: springY,
      }}
      className="inline-block"
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
};

/* ============================================================
   CURSOR SPOTLIGHT
============================================================ */

const CursorSpotlight = () => {
  const x = useMotionValue(
    -500
  );

  const y = useMotionValue(
    -500
  );

  const smoothX = useSpring(
    x,
    {
      stiffness: 70,
      damping: 22,
    }
  );

  const smoothY = useSpring(
    y,
    {
      stiffness: 70,
      damping: 22,
    }
  );

  const background = useTransform(
    [smoothX, smoothY],
    ([latestX, latestY]) =>
      `radial-gradient(
        420px circle at ${latestX}px ${latestY}px,
        rgba(120,120,120,0.11),
        transparent 65%
      )`
  );

  return (
    <motion.div
      onMouseMove={(
        event
      ) => {
        const rect =
          event.currentTarget.getBoundingClientRect();

        x.set(
          event.clientX -
            rect.left
        );

        y.set(
          event.clientY -
            rect.top
        );
      }}
      style={{
        background,
      }}
      className="
        pointer-events-auto
        absolute
        inset-0
        z-[1]
        hidden
        lg:block
      "
    />
  );
};

/* ============================================================
   SIGNAL DOT
============================================================ */

const SignalDot = () => {
  return (
    <span
      className="
        relative
        flex
        h-3
        w-3
        items-center
        justify-center
      "
    >
      <motion.span
        animate={{
          scale: [
            1,
            2.4,
            1,
          ],
          opacity: [
            0.35,
            0,
            0.35,
          ],
        }}
        transition={{
          duration: 2,
          repeat:
            Infinity,
        }}
        className="
          absolute
          h-full
          w-full
          rounded-full
          bg-dark/30
          dark:bg-light/30
        "
      />

      <motion.span
        animate={{
          opacity: [
            0.4,
            1,
            0.4,
          ],
        }}
        transition={{
          duration:
            1.6,
          repeat:
            Infinity,
        }}
        className="
          relative
          h-1.5
          w-1.5
          rounded-full
          bg-dark
          dark:bg-light
        "
      />
    </span>
  );
};

/* ============================================================
   BACK TO TOP
============================================================ */

const BackToTop = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={goToTop}
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        group
        flex
        items-center
        gap-3

        text-[8px]
        font-black

        uppercase
        tracking-[0.17em]

        text-dark/45
        dark:text-light/45
      "
    >
      <span>
        BACK TO TOP
      </span>

      <span
        className="
          flex
          h-9
          w-9

          items-center
          justify-center

          rounded-full

          border
          border-dark/10
          dark:border-light/10

          transition-all
          duration-300

          group-hover:-translate-y-1

          group-hover:bg-dark
          group-hover:text-light

          dark:group-hover:bg-light
          dark:group-hover:text-dark
        "
      >
        ↑
      </span>
    </motion.button>
  );
};

/* ============================================================
   FOOTER
============================================================ */

const Footer = () => {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer
      className="
        relative

        mt-40
        w-full

        overflow-hidden

        border-t
        border-dark/[0.09]
        dark:border-light/[0.1]

        bg-light
        dark:bg-dark

        md:mt-24
      "
    >
      {/* ======================================================
          BACKGROUND GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)]

          bg-[size:48px_48px]

          dark:opacity-40
        "
      />

      {/* ======================================================
          GIANT BACKGROUND TEXT
      ====================================================== */}

      <motion.div
        animate={{
          x: [
            "-2%",
            "2%",
            "-2%",
          ],
        }}
        transition={{
          duration: 18,
          repeat:
            Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none

          absolute
          left-1/2
          top-[42%]

          z-0

          -translate-x-1/2
          -translate-y-1/2

          select-none
          whitespace-nowrap

          text-[17vw]
          font-black

          uppercase
          tracking-[-0.1em]

          text-dark/[0.018]
          dark:text-light/[0.02]
        "
      >
        LET&apos;S BUILD
      </motion.div>

      {/* ======================================================
          SCANNING LINE
      ====================================================== */}

      <motion.div
        animate={{
          top: [
            "0%",
            "100%",
          ],
        }}
        transition={{
          duration: 9,
          repeat:
            Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none

          absolute
          left-0
          right-0

          z-[2]

          h-px

          bg-gradient-to-r
          from-transparent
          via-dark/10
          to-transparent

          dark:via-light/10
        "
      />

      {/* ======================================================
          CURSOR SPOTLIGHT
      ====================================================== */}

      <CursorSpotlight />

      <Layout
        className="
          relative
          z-10

          pb-8
          pt-20

          md:pt-14
        "
      >
        {/* ====================================================
            SYSTEM HUD
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-dark/[0.07]
            dark:border-light/[0.08]

            pb-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <SignalDot />

            <span
              className="
                text-[8px]
                font-black

                uppercase
                tracking-[0.22em]

                text-dark/40
                dark:text-light/40
              "
            >
              CONNECTION
              CHANNEL OPEN
            </span>
          </div>

          <span
            className="
              text-[7px]
              font-black

              uppercase
              tracking-[0.18em]

              text-dark/25
              dark:text-light/25

              md:hidden
            "
          >
            FINAL SYSTEM /
            PORTFOLIO END
          </span>
        </div>

        {/* ====================================================
            MAIN CTA
        ==================================================== */}

        <div
          className="
            relative

            py-24

            md:py-16
          "
        >
          {/* SMALL LABEL */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
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
              gap-3
            "
          >
            <motion.span
              animate={{
                width: [
                  20,
                  44,
                  20,
                ],
              }}
              transition={{
                duration: 3,
                repeat:
                  Infinity,
              }}
              className="
                block
                h-px

                bg-dark/40
                dark:bg-light/40
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
              NEXT PROJECT /
              NEXT SYSTEM /
              NEXT IDEA
            </span>
          </motion.div>

          {/* GIANT TITLE */}

          <div
            className="
              mt-9

              overflow-hidden
            "
          >
            <motion.h2
              initial={{
                y: "110%",
              }}
              whileInView={{
                y: "0%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                text-[clamp(4.2rem,10vw,10rem)]
                font-black

                uppercase

                leading-[0.75]
                tracking-[-0.085em]
              "
            >
              LET&apos;S BUILD
            </motion.h2>
          </div>

          <div
            className="
              overflow-hidden
            "
          >
            <motion.h2
              initial={{
                y: "110%",
              }}
              whileInView={{
                y: "0%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                text-[clamp(4.2rem,10vw,10rem)]
                font-black

                uppercase

                leading-[0.83]
                tracking-[-0.085em]

                text-dark/20
                dark:text-light/20
              "
            >
              SOMETHING
            </motion.h2>
          </div>

          <div
            className="
              overflow-hidden
            "
          >
            <motion.h2
              initial={{
                y: "110%",
              }}
              whileInView={{
                y: "0%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                delay: 0.16,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                text-[clamp(4.2rem,10vw,10rem)]
                font-black

                uppercase

                leading-[0.83]
                tracking-[-0.085em]
              "
            >
              INTELLIGENT.
            </motion.h2>
          </div>

          {/* DESCRIPTION + CTA */}

          <div
            className="
              mt-12

              grid
              grid-cols-12

              gap-8

              md:block
            "
          >
            <motion.p
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
                delay: 0.25,
                duration: 0.6,
              }}
              className="
                col-span-6

                max-w-xl

                text-sm
                font-medium

                leading-[1.85]

                text-dark/50
                dark:text-light/50

                md:text-xs
              "
            >
              Interested in
              building intelligent
              products, production
              AI systems, agentic
              workflows, machine
              learning platforms,
              or something that
              does not exist yet?
              Start the
              conversation.
            </motion.p>

            <div
              className="
                col-span-6

                flex
                items-center
                justify-end

                md:mt-10
                md:justify-start
              "
            >
              <MagneticLink
                href="https://www.linkedin.com/in/syeda-shamama-afeef/"
                className="
                  group

                  relative

                  inline-flex
                  items-center
                  gap-8

                  overflow-hidden

                  rounded-full

                  border
                  border-dark/15
                  dark:border-light/15

                  px-8
                  py-5

                  text-sm
                  font-black

                  uppercase
                  tracking-[0.12em]

                  transition-colors
                  duration-300

                  hover:bg-dark
                  hover:text-light

                  dark:hover:bg-light
                  dark:hover:text-dark

                  md:px-6
                  md:py-4
                  md:text-xs
                "
              >
                <span
                  className="
                    relative
                    z-10
                  "
                >
                  LET&apos;S
                  CONNECT
                </span>

                <motion.span
                  animate={{
                    x: [
                      0,
                      5,
                      0,
                    ],
                    y: [
                      0,
                      -5,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat:
                      Infinity,
                  }}
                  className="
                    relative
                    z-10

                    text-xl
                  "
                >
                  ↗
                </motion.span>
              </MagneticLink>
            </div>
          </div>
        </div>

        {/* ====================================================
            CONTACT STRIP
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-3

            border-y
            border-dark/[0.08]
            dark:border-light/[0.08]

            md:grid-cols-1
          "
        >
          {/* LINKEDIN */}

          <MagneticLink
            href="https://www.linkedin.com/in/syeda-shamama-afeef/"
            className="
              group

              flex
              min-h-[115px]

              items-center
              justify-between

              border-r
              border-dark/[0.08]
              dark:border-light/[0.08]

              px-6

              transition-all

              hover:bg-dark/[0.025]
              dark:hover:bg-light/[0.035]

              md:border-b
              md:border-r-0
            "
          >
            <span>
              <span
                className="
                  block

                  text-[7px]
                  font-black

                  uppercase
                  tracking-[0.18em]

                  text-dark/30
                  dark:text-light/30
                "
              >
                PROFESSIONAL
              </span>

              <span
                className="
                  mt-2
                  block

                  text-xl
                  font-black

                  tracking-[-0.04em]
                "
              >
                LinkedIn
              </span>
            </span>

            <span
              className="
                text-xl

                transition-transform

                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            >
              ↗
            </span>
          </MagneticLink>

          {/* IDENTITY */}

          <div
            className="
              flex
              min-h-[115px]

              items-center
              justify-between

              border-r
              border-dark/[0.08]
              dark:border-light/[0.08]

              px-6

              md:border-b
              md:border-r-0
            "
          >
            <span>
              <span
                className="
                  block

                  text-[7px]
                  font-black

                  uppercase
                  tracking-[0.18em]

                  text-dark/30
                  dark:text-light/30
                "
              >
                CREATED BY
              </span>

              <span
                className="
                  mt-2
                  block

                  text-xl
                  font-black

                  tracking-[-0.04em]
                "
              >
                Syeda Shamama
                Afeef
              </span>
            </span>

            <motion.span
              animate={{
                rotate: [
                  0,
                  360,
                ],
              }}
              transition={{
                duration: 15,
                repeat:
                  Infinity,
                ease: "linear",
              }}
              className="
                flex
                h-10
                w-10

                items-center
                justify-center

                rounded-full

                border
                border-dark/10
                dark:border-light/10

                text-xs
              "
            >
              ✦
            </motion.span>
          </div>

          {/* BACK TO TOP */}

          <div
            className="
              flex
              min-h-[115px]

              items-center
              justify-end

              px-6

              md:justify-start
            "
          >
            <BackToTop />
          </div>
        </div>

        {/* ====================================================
            FINAL BAR
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            gap-6

            pt-8

            md:flex-col
            md:items-start
          "
        >
          <div
            className="
              flex
              items-center
              gap-5

              md:flex-wrap
            "
          >
            <span
              className="
                text-[8px]
                font-black

                uppercase
                tracking-[0.16em]

                text-dark/35
                dark:text-light/35
              "
            >
              {currentYear}
              {" "}
              © ALL RIGHTS
              RESERVED
            </span>

            <span
              className="
                h-1
                w-1

                rounded-full

                bg-dark/20
                dark:bg-light/20

                md:hidden
              "
            />

            <span
              className="
                text-[8px]
                font-black

                uppercase
                tracking-[0.16em]

                text-dark/25
                dark:text-light/25
              "
            >
              PORTFOLIO /
              SYSTEM COMPLETE
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                text-[8px]
                font-medium

                text-dark/35
                dark:text-light/35
              "
            >
              Built with
            </span>

            <motion.span
              animate={{
                scale: [
                  1,
                  1.25,
                  1,
                ],
              }}
              transition={{
                duration:
                  1.4,
                repeat:
                  Infinity,
              }}
              className="
                text-lg
              "
            >
              ♡
            </motion.span>

            <span
              className="
                text-[8px]
                font-medium

                text-dark/35
                dark:text-light/35
              "
            >
              & intelligence
            </span>
          </div>
        </div>
      </Layout>

      {/* ======================================================
          VERY BOTTOM FILM / SYSTEM STRIP
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mt-6

          overflow-hidden

          border-t
          border-dark/[0.06]
          dark:border-light/[0.07]

          py-3
        "
      >
        <motion.div
          animate={{
            x: [
              "0%",
              "-50%",
            ],
          }}
          transition={{
            duration: 28,
            repeat:
              Infinity,
            ease: "linear",
          }}
          className="
            flex
            w-max

            whitespace-nowrap
          "
        >
          {[
            "AGENTIC AI",
            "GENERATIVE AI",
            "MACHINE LEARNING",
            "DATA ENGINEERING",
            "CLOUD AI",
            "MLOPS",
            "INTELLIGENT SYSTEMS",
            "AGENTIC AI",
            "GENERATIVE AI",
            "MACHINE LEARNING",
            "DATA ENGINEERING",
            "CLOUD AI",
            "MLOPS",
            "INTELLIGENT SYSTEMS",
          ].map(
            (
              item,
              index
            ) => (
              <div
                key={`${item}-${index}`}
                className="
                  flex
                  items-center
                "
              >
                <span
                  className="
                    px-5

                    text-[7px]
                    font-black

                    uppercase
                    tracking-[0.2em]

                    text-dark/25
                    dark:text-light/25
                  "
                >
                  {item}
                </span>

                <span
                  className="
                    text-dark/15
                    dark:text-light/15
                  "
                >
                  ✦
                </span>
              </div>
            )
          )}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
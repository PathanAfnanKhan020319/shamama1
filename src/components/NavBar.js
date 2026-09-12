"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import Logo from "./Logo";

import {
  DribbbleIcon,
  GithubIcon,
  LinkedInIcon,
  SunIcon,
  MoonIcon,
  TwitterIcon,
} from "./Icon";

import useThemeSwitcher from "./hooks/useThemeSwitcher";

/* ============================================================
   NAVIGATION DATA
============================================================ */

const NAV_ITEMS = [
  {
    href: "/",
    title: "Home",
    number: "01",
  },
  {
    href: "/about",
    title: "About",
    number: "02",
  },
  {
    href: "/projects",
    title: "Projects",
    number: "03",
  },
  {
    href: "/articles",
    title: "Articles",
    number: "04",
  },
];

const SOCIALS = [
  {
    name: "X",
    href: "https://x.com/syeda_shamama19",
    Icon: TwitterIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/shamamaafeef2003",
    Icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/syeda-shamama-afeef/",
    Icon: LinkedInIcon,
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/",
    Icon: DribbbleIcon,
  },
];

/* ============================================================
   ACTIVE ROUTE
============================================================ */

const isRouteActive = (
  currentPath,
  href
) => {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath.startsWith(
    href
  );
};

/* ============================================================
   MAGNETIC SOCIAL
============================================================ */

const MagneticSocial = ({
  href,
  name,
  Icon,
  inverted = false,
}) => {
  const ref =
    useRef(null);

  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const springX =
    useSpring(x, {
      stiffness: 180,
      damping: 18,
    });

  const springY =
    useSpring(y, {
      stiffness: 180,
      damping: 18,
    });

  const handleMove = (
    event
  ) => {
    if (!ref.current)
      return;

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
        0.14
    );

    y.set(
      (event.clientY -
        centerY) *
        0.14
    );
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      title={name}
      onMouseMove={
        handleMove
      }
      onMouseLeave={
        reset
      }
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.9,
      }}
      className={`
        group
        relative

        flex
        h-10
        w-10

        shrink-0

        items-center
        justify-center

        overflow-hidden

        rounded-full

        border

        transition-colors
        duration-300

        ${
          inverted
            ? `
              border-light/15
              bg-light/[0.06]
              text-light

              hover:bg-light
              hover:text-dark

              dark:border-dark/15
              dark:bg-dark/[0.06]
              dark:text-dark

              dark:hover:bg-dark
              dark:hover:text-light
            `
            : `
              border-dark/[0.09]
              bg-light/60
              text-dark

              hover:bg-dark
              hover:text-light

              dark:border-light/[0.1]
              dark:bg-dark/60
              dark:text-light

              dark:hover:bg-light
              dark:hover:text-dark
            `
        }
      `}
    >
      <motion.span
        initial={{
          scale: 0,
          opacity: 0,
        }}
        whileHover={{
          scale: 2,
          opacity: 0.06,
        }}
        className="
          pointer-events-none
          absolute

          h-full
          w-full

          rounded-full

          bg-current
        "
      />

      <span
        className="
          relative
          z-10

          flex
          h-[18px]
          w-[18px]

          items-center
          justify-center
        "
      >
        <Icon />
      </span>
    </motion.a>
  );
};

/* ============================================================
   DESKTOP LINK
============================================================ */

const DesktopNavLink = ({
  item,
  currentPath,
}) => {
  const active =
    isRouteActive(
      currentPath,
      item.href
    );

  return (
    <Link
      href={item.href}
      className="
        group
        relative

        flex
        items-center

        gap-2

        px-3
        py-2
      "
    >
      <motion.span
        animate={{
          scale:
            active
              ? 1
              : 0,

          opacity:
            active
              ? 1
              : 0,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          h-1
          w-1

          rounded-full

          bg-dark
          dark:bg-light
        "
      />

      <span
        className={`
          relative

          text-[11px]
          font-semibold

          tracking-[-0.01em]

          transition-opacity

          ${
            active
              ? "opacity-100"
              : "opacity-45 group-hover:opacity-100"
          }
        `}
      >
        {item.title}

        <motion.span
          initial={false}
          animate={{
            scaleX:
              active
                ? 1
                : 0,
          }}
          className="
            absolute
            -bottom-1
            left-0

            h-px
            w-full

            origin-left

            bg-dark
            dark:bg-light

            transition-transform

            group-hover:scale-x-100
          "
        />
      </span>
    </Link>
  );
};

/* ============================================================
   THEME BUTTON
============================================================ */

const ThemeButton = ({
  mode,
  setMode,
  inverted = false,
}) => {
  const toggleTheme =
    () => {
      setMode(
        mode === "light"
          ? "dark"
          : "light"
      );
    };

  return (
    <motion.button
      type="button"
      aria-label="Toggle theme"
      onClick={
        toggleTheme
      }
      whileHover={{
        rotate: 8,
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.9,
      }}
      className={`
        relative

        flex
        h-10
        w-10

        items-center
        justify-center

        overflow-hidden

        rounded-full

        border

        ${
          inverted
            ? `
              border-light/15
              bg-light/[0.06]
              text-light

              dark:border-dark/15
              dark:bg-dark/[0.06]
              dark:text-dark
            `
            : `
              border-dark/[0.09]
              bg-light/70

              dark:border-light/[0.1]
              dark:bg-dark/70
            `
        }
      `}
    >
      <AnimatePresence
        mode="wait"
      >
        {mode ===
        "dark" ? (
          <motion.span
            key="sun"
            initial={{
              opacity: 0,
              rotate: -90,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: 90,
              scale: 0.5,
            }}
            transition={{
              duration:
                0.25,
            }}
            className="
              flex
              h-5
              w-5

              items-center
              justify-center
            "
          >
            <SunIcon />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{
              opacity: 0,
              rotate: 90,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: -90,
              scale: 0.5,
            }}
            transition={{
              duration:
                0.25,
            }}
            className="
              flex
              h-5
              w-5

              items-center
              justify-center
            "
          >
            <MoonIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

/* ============================================================
   HAMBURGER
============================================================ */

const MenuButton = ({
  isOpen,
  onClick,
}) => {
  return (
    <motion.button
      type="button"
      aria-label={
        isOpen
          ? "Close menu"
          : "Open menu"
      }
      aria-expanded={
        isOpen
      }
      onClick={onClick}
      whileTap={{
        scale: 0.92,
      }}
      className="
        relative

        hidden
        h-11
        w-11

        flex-col
        items-center
        justify-center

        rounded-full

        border
        border-dark/10
        dark:border-light/10

        bg-light/70
        dark:bg-dark/70

        backdrop-blur-xl

        lg:flex
      "
    >
      <motion.span
        animate={
          isOpen
            ? {
                rotate: 45,
                y: 5,
              }
            : {
                rotate: 0,
                y: -4,
              }
        }
        transition={{
          duration: 0.25,
        }}
        className="
          block

          h-[1.5px]
          w-5

          rounded-full

          bg-dark
          dark:bg-light
        "
      />

      <motion.span
        animate={
          isOpen
            ? {
                opacity: 0,
                scaleX: 0,
              }
            : {
                opacity: 1,
                scaleX: 1,
              }
        }
        transition={{
          duration: 0.2,
        }}
        className="
          block

          h-[1.5px]
          w-5

          rounded-full

          bg-dark
          dark:bg-light
        "
      />

      <motion.span
        animate={
          isOpen
            ? {
                rotate:
                  -45,
                y: -5,
              }
            : {
                rotate: 0,
                y: 4,
              }
        }
        transition={{
          duration: 0.25,
        }}
        className="
          block

          h-[1.5px]
          w-5

          rounded-full

          bg-dark
          dark:bg-light
        "
      />
    </motion.button>
  );
};

/* ============================================================
   MOBILE ROUTE
============================================================ */

const MobileRoute = ({
  item,
  index,
  currentPath,
  closeMenu,
}) => {
  const active =
    isRouteActive(
      currentPath,
      item.href
    );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          0.12 +
          index * 0.06,

        duration:
          0.45,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
    >
      <Link
        href={
          item.href
        }
        onClick={
          closeMenu
        }
        className="
          group

          flex
          w-full

          items-end
          justify-between

          border-b
          border-light/[0.09]

          py-5

          dark:border-dark/[0.09]
        "
      >
        <div
          className="
            flex
            items-end
            gap-4
          "
        >
          <span
            className="
              mb-1

              text-[8px]
              font-black

              tracking-[0.16em]

              text-light/30
              dark:text-dark/30
            "
          >
            {item.number}
          </span>

          <span
            className={`
              text-[clamp(2.6rem,11vw,5rem)]

              font-black
              uppercase

              leading-[0.8]
              tracking-[-0.07em]

              transition-opacity

              ${
                active
                  ? "opacity-100"
                  : "opacity-45 group-hover:opacity-100"
              }
            `}
          >
            {item.title}
          </span>
        </div>

        <motion.span
          whileHover={{
            x: 5,
            y: -5,
          }}
          className="
            mb-1

            text-xl

            text-light/40
            dark:text-dark/40
          "
        >
          ↗
        </motion.span>
      </Link>
    </motion.div>
  );
};

/* ============================================================
   MOBILE MENU
============================================================ */

const MobileMenu = ({
  isOpen,
  closeMenu,
  mode,
  setMode,
  currentPath,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,

            clipPath:
              "circle(0% at 10% 5%)",
          }}
          animate={{
            opacity: 1,

            clipPath:
              "circle(150% at 10% 5%)",
          }}
          exit={{
            opacity: 0,

            clipPath:
              "circle(0% at 10% 5%)",
          }}
          transition={{
            duration:
              0.65,

            ease: [
              0.76,
              0,
              0.24,
              1,
            ],
          }}
          className="
            fixed
            inset-0

            z-[900]

            hidden

            overflow-y-auto

            bg-dark/[0.97]
            text-light

            backdrop-blur-2xl

            dark:bg-light/[0.97]
            dark:text-dark

            lg:block
          "
        >
          {/* BACKGROUND GRID */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]

              bg-[size:42px_42px]

              opacity-50

              dark:bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
            "
          />

          {/* GIANT NAV GHOST */}

          <motion.div
            animate={{
              x: [
                "-2%",
                "2%",
                "-2%",
              ],
            }}
            transition={{
              duration: 14,
              repeat:
                Infinity,
              ease:
                "easeInOut",
            }}
            className="
              pointer-events-none

              absolute

              left-1/2
              top-1/2

              -translate-x-1/2
              -translate-y-1/2

              whitespace-nowrap

              text-[28vw]
              font-black

              uppercase
              tracking-[-0.1em]

              text-light/[0.025]
              dark:text-dark/[0.025]
            "
          >
            NAV
          </motion.div>

          <div
            className="
              relative
              z-10

              flex
              min-h-screen
              flex-col

              px-12
              py-8

              sm:px-7
            "
          >
            {/* MENU HEADER */}

            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-light/[0.1]

                pb-6

                dark:border-dark/[0.1]
              "
            >
              <div>
                <p
                  className="
                    text-[7px]
                    font-black

                    uppercase
                    tracking-[0.2em]

                    text-light/35
                    dark:text-dark/35
                  "
                >
                  NAVIGATION
                  SYSTEM
                </p>

                <p
                  className="
                    mt-1

                    text-xs
                    font-black

                    uppercase
                    tracking-[0.12em]
                  "
                >
                  COMMAND
                  CENTER
                </p>
              </div>

              <motion.button
                type="button"
                aria-label="Close menu"
                onClick={
                  closeMenu
                }
                whileHover={{
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="
                  flex
                  h-11
                  w-11

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-light/15

                  text-xl

                  dark:border-dark/15
                "
              >
                ×
              </motion.button>
            </div>

            {/* ROUTES */}

            <nav
              className="
                my-auto
                py-12
              "
            >
              {NAV_ITEMS.map(
                (
                  item,
                  index
                ) => (
                  <MobileRoute
                    key={
                      item.href
                    }
                    item={item}
                    index={
                      index
                    }
                    currentPath={
                      currentPath
                    }
                    closeMenu={
                      closeMenu
                    }
                  />
                )
              )}
            </nav>

            {/* SOCIALS */}

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
                delay: 0.35,
              }}
              className="
                border-t
                border-light/[0.1]

                pt-6

                dark:border-dark/[0.1]
              "
            >
              <div
                className="
                  flex

                  items-center
                  justify-between

                  gap-5

                  sm:flex-col
                  sm:items-start
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  {SOCIALS.map(
                    ({
                      name,
                      href,
                      Icon,
                    }) => (
                      <MagneticSocial
                        key={name}
                        name={name}
                        href={href}
                        Icon={Icon}
                        inverted
                      />
                    )
                  )}

                  <ThemeButton
                    mode={mode}
                    setMode={
                      setMode
                    }
                    inverted
                  />
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
                      duration:
                        1.8,

                      repeat:
                        Infinity,
                    }}
                    className="
                      h-1.5
                      w-1.5

                      rounded-full

                      bg-light
                      dark:bg-dark
                    "
                  />

                  <span
                    className="
                      text-[7px]
                      font-black

                      uppercase
                      tracking-[0.18em]

                      text-light/35
                      dark:text-dark/35
                    "
                  >
                    SYSTEM ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   NAVBAR
============================================================ */

const NavBar = () => {
  const router =
    useRouter();

  const [
    mode,
    setMode,
  ] =
    useThemeSwitcher();

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  /* ==========================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ========================================================== */

  useEffect(() => {
    const close =
      () => {
        setIsOpen(
          false
        );
      };

    router.events.on(
      "routeChangeStart",
      close
    );

    return () => {
      router.events.off(
        "routeChangeStart",
        close
      );
    };
  }, [
    router.events,
  ]);

  /* ==========================================================
     ESC + BODY LOCK
  ========================================================== */

  useEffect(() => {
    const handleKey =
      (event) => {
        if (
          event.key ===
          "Escape"
        ) {
          setIsOpen(
            false
          );
        }
      };

    if (isOpen) {
      document.body.style.overflow =
        "hidden";

      window.addEventListener(
        "keydown",
        handleKey
      );
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [
    isOpen,
  ]);

  const toggleMenu =
    () => {
      setIsOpen(
        (current) =>
          !current
      );
    };

  const closeMenu =
    () => {
      setIsOpen(
        false
      );
    };

  return (
    <>
      {/* ======================================================
          MAIN NAVBAR

          IMPORTANT:
          relative = normal page flow

          NO sticky
          NO fixed
          NO top-0

          Isliye scroll karte hi navbar page ke saath upar chala jayega.
      ====================================================== */}

      <header
        className="
          relative

          z-[80]

          w-full

          px-8
          pt-5

          font-medium

          lg:px-8
          md:px-6
          sm:px-4
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration:
              0.55,

            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="
            relative

            mx-auto

            flex
            w-full
            max-w-[1400px]

            items-center
            justify-between

            border
            border-transparent

            bg-transparent

            px-3
            py-3
          "
        >
          {/* ==================================================
              DESKTOP NAVBAR
          ================================================== */}

          <div
            className="
              grid
              w-full

              grid-cols-[1fr_auto_1fr]

              items-center

              lg:hidden
            "
          >
            {/* LEFT NAV */}

            <div
              className="
                flex
                items-center
              "
            >
              <nav
                className="
                  flex
                  items-center

                  rounded-full

                  border
                  border-dark/[0.07]

                  bg-light/45

                  px-2
                  py-1

                  backdrop-blur-xl

                  dark:border-light/[0.08]
                  dark:bg-dark/45
                "
              >
                {NAV_ITEMS.map(
                  (item) => (
                    <DesktopNavLink
                      key={
                        item.href
                      }
                      item={item}
                      currentPath={
                        router.asPath
                      }
                    />
                  )
                )}
              </nav>
            </div>

            {/* CENTER LOGO */}

            <motion.div
              whileHover={{
                scale: 1.06,
                rotate: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="
                relative

                flex
                items-center
                justify-center

                px-10
              "
            >
              {/* ROTATING LOGO ORBIT */}

              <motion.span
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 22,

                  repeat:
                    Infinity,

                  ease:
                    "linear",
                }}
                className="
                  pointer-events-none

                  absolute
                  left-1/2
                  top-1/2

                  h-14
                  w-14

                  -translate-x-1/2
                  -translate-y-1/2

                  rounded-full

                  border
                  border-dashed
                  border-dark/[0.08]

                  dark:border-light/[0.09]
                "
              />

              <Logo />
            </motion.div>

            {/* RIGHT SIDE */}

            <div
              className="
                flex
                items-center
                justify-end

                gap-2
              "
            >
              {/* STATUS */}

              <div
                className="
                  mr-2

                  hidden
                  2xl:flex

                  items-center
                  gap-2

                  rounded-full

                  border
                  border-dark/[0.07]

                  px-3
                  py-2

                  dark:border-light/[0.08]
                "
              >
                <motion.span
                  animate={{
                    opacity: [
                      0.25,
                      1,
                      0.25,
                    ],

                    scale: [
                      0.8,
                      1.15,
                      0.8,
                    ],
                  }}
                  transition={{
                    duration:
                      1.8,

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
                    tracking-[0.16em]

                    text-dark/35
                    dark:text-light/35
                  "
                >
                  SYSTEM ONLINE
                </span>
              </div>

              {/* SOCIALS */}

              {SOCIALS.map(
                ({
                  name,
                  href,
                  Icon,
                }) => (
                  <MagneticSocial
                    key={name}
                    name={name}
                    href={href}
                    Icon={Icon}
                  />
                )
              )}

              {/* THEME */}

              <ThemeButton
                mode={mode}
                setMode={
                  setMode
                }
              />
            </div>
          </div>

          {/* ==================================================
              MOBILE / TABLET NAVBAR
          ================================================== */}

          <div
            className="
              relative

              hidden
              w-full

              items-center
              justify-between

              lg:flex
            "
          >
            <MenuButton
              isOpen={
                isOpen
              }
              onClick={
                toggleMenu
              }
            />

            {/* CENTER LOGO */}

            <div
              className="
                absolute
                left-1/2
                top-1/2

                -translate-x-1/2
                -translate-y-1/2
              "
            >
              <Logo />
            </div>

            <ThemeButton
              mode={mode}
              setMode={
                setMode
              }
            />
          </div>
        </motion.div>
      </header>

      {/* ======================================================
          MOBILE MENU

          Ye fixed hi rehna chahiye because menu kholne ke baad
          full-screen overlay hona hai.

          Main navbar itself fixed/sticky nahi hai.
      ====================================================== */}

      <MobileMenu
        isOpen={
          isOpen
        }
        closeMenu={
          closeMenu
        }
        mode={mode}
        setMode={
          setMode
        }
        currentPath={
          router.asPath
        }
      />
    </>
  );
};

export default NavBar;
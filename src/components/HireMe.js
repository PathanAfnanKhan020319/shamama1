import React from "react";
import Link from "next/link";
import { CustomSVG } from "./Icon";

const HireMe = () => {
  return (
    <div
      className="
        fixed
        left-4
        bottom-4
        z-50

        flex
        items-center
        justify-center

        md:right-8
        md:left-auto
        md:top-0
        md:bottom-auto
        md:absolute

        sm:right-0

        pointer-events-none
      "
    >
      <div
        className="
          relative
          w-48
          h-auto

          flex
          items-center
          justify-center

          md:w-24

          pointer-events-none
        "
      >
        <CustomSVG
          className="
            fill-dark
            animate-spin-slow
            dark:fill-light

            pointer-events-none
          "
        />

        <Link
          href="mailto:syedashamama459@gmail.com"
          className="
            absolute
            left-1/2
            top-1/2

            -translate-x-1/2
            -translate-y-1/2

            flex
            items-center
            justify-center

            w-20
            h-20

            rounded-full

            bg-dark
            text-light

            shadow-md

            border
            border-solid
            border-dark

            font-semibold

            hover:bg-light
            hover:text-dark

            dark:bg-light
            dark:text-dark

            hover:dark:bg-dark
            hover:dark:text-light
            hover:dark:border-light

            md:w-12
            md:h-12
            md:text-[10px]

            pointer-events-auto
            cursor-pointer

            transition-all
            duration-300
          "
        >
          Hire Me
        </Link>
      </div>
    </div>
  );
};

export default HireMe;
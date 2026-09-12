"use client";

import React, {
  useMemo,
  useRef,
  useState,
} from "react";

import Head from "next/head";
import Layout from "../components/Layout";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  GithubIcon,
} from "@/components/Icon";

/* ============================================================
   PROJECT DATA
============================================================ */

const PROJECTS = [
  {
    title:
      "PPG SPO2 & Heart Rate Estimation Using Deep Learning",
    img:
      "/images/projects/ppg spo2.png",
    summary:
      "A deep learning–based system designed to estimate SPO2 and heart rate from photoplethysmogram (PPG) signals with high accuracy. The project leverages convolutional and recurrent neural network architectures for real-time vital sign estimation. It includes preprocessing pipelines for noise filtering, signal normalization, and feature extraction. The model demonstrates robust performance across varying skin tones, lighting conditions, and motion artifacts, making it suitable for remote healthcare and wearable IoT applications.",
    link:
      "https://github.com/shamamaafeef2003/assignment_ppg_spo2_estimation2",
    github:
      "https://github.com/shamamaafeef2003/assignment_ppg_spo2_estimation2",
    type:
      "AI / Deep Learning / Healthcare",
    category:
      "Healthcare",
    featured: true,
  },

  {
    title:
      "AI- Heart Beat monitoring System",
    img:
      "/images/projects/heart-beat.png",
    summary:
      "An intelligent real-time heartbeat monitoring system built using AI and sensor-based signal processing. The project utilizes machine learning algorithms to detect and classify heart rate patterns from PPG or ECG signals, enabling anomaly detection such as tachycardia and bradycardia. The system includes live data visualization, threshold-based alerts, and integration capabilities for IoT wearable devices, aiming to improve remote patient monitoring and preventive healthcare analytics.",
    link:
      "https://github.com/shamamaafeef2003/Heart_Beat_Monitor_AK",
    github:
      "https://github.com/shamamaafeef2003/Heart_Beat_Monitor_AK",
    type:
      "AI / IoT / Healthcare",
    category:
      "Healthcare",
  },

  {
    title:
      "Personalized Nutrition Notification System",
    img:
      "/images/projects/ppg spo.png",
    link:
      "https://github.com/shamamaafeef2003/nutrition_ai_agent",
    github:
      "https://github.com/shamamaafeef2003/nutrition_ai_agent",
    type:
      "AI / NLP / Healthcare",
    category:
      "Healthcare",
  },

  {
    title:
      "ChatBot for Changi Airport",
    img:
      "/images/projects/changi-chatbot.png",
    summary:
      "An intelligent AI-powered virtual assistant designed for Changi Airport to enhance passenger experience and streamline airport operations. The chatbot uses Natural Language Processing and machine learning to handle queries related to flight schedules, baggage tracking, airport navigation, and facility information in real time. It supports multilingual communication, context retention, and sentiment-based responses to ensure natural, human-like interactions with travelers.",
    link:
      "https://colab.research.google.com/drive/1KK2iMKDndBUdeY0CNyTaK_1e6uaBG0IS?usp=sharing",
    github:
      "https://colab.research.google.com/drive/1KK2iMKDndBUdeY0CNyTaK_1e6uaBG0IS?usp=sharing",
    type:
      "AI / NLP / Customer Experience",
    category:
      "AI / LLM",
    featured: true,
  },

  {
    title:
      "Realtime User Intent Detection Conversational AI",
    img:
      "/images/projects/ai2.png",
    link:
      "https://shamama-convo11.vercel.app/",
    github:
      "https://github.com/shamamaafeef2003/Convo-Ai-syeda-shamama-afeef",
    type:
      "AI / NLP / Conversational Systems",
    category:
      "AI / LLM",
  },

  {
    title:
      "Realtime Conversational AI Chatbot",
    img:
      "/images/projects/afs2.png",
    link:
      "https://conversation-chatbot-ivory.vercel.app/",
    github:
      "https://github.com/afeef2003/conversation-chatbot",
    type:
      "Finance / Business Intelligence",
    category:
      "AI / LLM",
  },

  {
    title:
      "Transcription App",
    img:
      "/images/projects/app2.png",
    summary:
      "An advanced AI-powered transcription application that converts speech to text in real-time using state-of-the-art NLP and speech recognition models. It supports multiple languages, speaker differentiation, and provides a clean, intuitive interface for editing and exporting transcriptions seamlessly.",
    link:
      "https://github.com/shamamaafeef2003/Transcription-app",
    github:
      "https://github.com/shamamaafeef2003/Transcription-app",
    type:
      "AI / NLP / Speech Recognition",
    category:
      "AI / LLM",
    featured: true,
  },

  {
    title:
      "Transaction Processing System",
    img:
      "/images/projects/tran.png",
    link:
      "https://github.com/shamamaafeef2003/assifnement",
    github:
      "https://github.com/shamamaafeef2003/assifnement",
    type:
      "Finance / Business Intelligence",
    category:
      "Data / BI",
  },

  {
    title:
      "Performance Analysis",
    img:
      "/images/projects/tran2.png",
    link:
      "https://github.com/shamamaafeef2003/Internshaala-project",
    github:
      "https://github.com/shamamaafeef2003/Internshaala-project",
    type:
      "Data Analytics / Business Intelligence",
    category:
      "Data / BI",
  },

  {
    title:
      "AI- OCR Extractor System",
    img:
      "/images/projects/ai-ocr.png",
    summary:
      "An AI-powered Optical Character Recognition system that accurately extracts and processes text from scanned documents and images in real-time. Built using deep learning and natural language processing, it automates document digitization with high precision and structured data output.",
    link:
      "https://github.com/shamamaafeef2003/AI_OCR_Extractor-Syeda_Shamama_Afeef",
    github:
      "https://github.com/shamamaafeef2003/AI_OCR_Extractor-Syeda_Shamama_Afeef",
    type:
      "AI / Computer Vision / NLP",
    category:
      "Computer Vision",
    featured: true,
  },

  {
    title:
      "AI-OCR PDF Extractor System",
    img:
      "/images/projects/ai-ocr2.png",
    link:
      "https://github.com/shamamaafeef2003/ai-ocr-pdf-extractor-Syeda_Shamama",
    github:
      "https://github.com/shamamaafeef2003/ai-ocr-pdf-extractor-Syeda_Shamama",
    type:
      "Finance / Backend System / AI",
    category:
      "Automation",
  },

  {
    title:
      "QA Agent AI-Powered Testing System",
    img:
      "/images/projects/qa2.png",
    link:
      "https://github.com/shamamaafeef2003/QA-Agent-Task---AK",
    github:
      "https://github.com/shamamaafeef2003/QA-Agent-Task---AK",
    type:
      "AI / QA Automation / Software Testing",
    category:
      "Automation",
  },

  {
    title:
      "Langie - LangGraph Customer Support Agent",
    img:
      "/images/projects/lang2.png",
    summary:
      "An AI-powered multilingual customer support agent built using LangGraph and Large Language Models. Langie automates customer interactions, provides contextual responses, and supports dynamic workflows such as ticket generation, FAQ resolution, and sentiment-based routing — all in real time.",
    link:
      "https://github.com/shamamaafeef2003/Lang-Graph-Agent--Syeda-Shamama-Afeef",
    github:
      "https://github.com/shamamaafeef2003/Lang-Graph-Agent--Syeda-Shamama-Afeef",
    type:
      "AI / NLP / Customer Support Automation",
    category:
      "AI / LLM",
    featured: true,
  },

  {
    title:
      "Registration Login Form",
    img:
      "/images/projects/login.png",
    summary:
      "A secure and responsive user authentication system built with HTML, CSS, JavaScript, and Python Flask. Features include user registration, encrypted password storage, session management, and form validation for a smooth login experience.",
    link:
      "https://github.com/shamamaafeef2003/registeration-login-form",
    github:
      "https://github.com/shamamaafeef2003/registeration-login-form",
    type:
      "Web Development / Authentication System",
    category:
      "Web / Systems",
    featured: true,
  },

  {
    title:
      "ISTM Data-Pipeline System",
    img:
      "/images/projects/istm2.png",
    link:
      "https://github.com/shamamaafeef2003/istm_data_pipeline_by_syeda_shamama_afeef",
    github:
      "https://github.com/shamamaafeef2003/istm_data_pipeline_by_syeda_shamama_afeef",
    type:
      "Data Engineering / Automation",
    category:
      "Data / BI",
  },

  {
    title:
      "PDF Parser Pipeline",
    img:
      "/images/projects/odp2.png",
    link:
      "https://github.com/shamamaafeef2003/Od-parser_pipeline-assesment_by_Syeda_shamama_afeef",
    github:
      "https://github.com/shamamaafeef2003/Od-parser_pipeline-assesment_by_Syeda_shamama_afeef",
    type:
      "AI / EdTech / NLP",
    category:
      "AI / LLM",
  },

  {
    title:
      "eCOURT India Scraper",
    img:
      "/images/projects/court2.png",
    summary:
      "A modern, real-time web scraping system designed to fetch cause lists from Indian eCourts. Built with Python, Selenium, and BeautifulSoup, featuring dynamic dropdown navigation for states, districts, and courts. Includes bulk and single court downloads, automated PDF generation, and an interactive React-based dashboard for visualization.",
    link:
      "https://github.com/shamamaafeef2003/Ecourt-scraper-shamama",
    github:
      "https://github.com/shamamaafeef2003/Ecourt-scraper-shamama",
    type:
      "Web Scraping / Automation / LegalTech",
    category:
      "Automation",
    featured: true,
  },

  {
    title:
      "Team Project Planner",
    img:
      "/images/projects/team2.png",
    summary:
      "A comprehensive Python-based project management and collaboration tool that allows users to create teams, manage boards, and assign tasks. Features include user and team management, JSON-based data persistence, hierarchical admin roles, automated board reporting, and error handling with custom validations.",
    link:
      "https://github.com/shamamaafeef2003/Factwise_Assignment_AK",
    github:
      "https://github.com/shamamaafeef2003/Factwise_Assignment_AK",
    type:
      "Project Management / Python / Collaboration Tool",
    category:
      "Web / Systems",
    featured: true,
  },

  {
    title:
      "MATH Question Generator",
    img:
      "/images/projects/math2.png",
    link:
      "https://github.com/afeef2003/Questin_generator_Syeda_Shamama_Afeef2-",
    github:
      "https://github.com/afeef2003/Questin_generator_Syeda_Shamama_Afeef2-",
    type:
      "AI / Education / Automation",
    category:
      "Automation",
  },

  {
    title:
      "Real-Time Simulator & Event Trigger System",
    img:
      "/images/projects/tri2.png",
    link:
      "https://colab.research.google.com/drive/1gz2ktYf5KliZeiEApYfa2-giYgdNEO1_?usp=sharing",
    github:
      "https://colab.research.google.com/drive/1gz2ktYf5KliZeiEApYfa2-giYgdNEO1_?usp=sharing",
    type:
      "AI / Automation / Simulation",
    category:
      "Automation",
  },

  {
    title:
      "Multi Language Translation System",
    img:
      "/images/projects/multi2.png",
    summary:
      "An AI-powered multilingual translation system built using NLP and LangChain, capable of translating text across multiple global languages in real time. The system leverages transformer-based models and prompt engineering for context-aware, accurate, and natural translations.",
    link:
      "https://colab.research.google.com/drive/1AjF_mGghq-SigP-fxVkAaNUO17Q-hUUY?usp=sharing",
    github:
      "https://colab.research.google.com/drive/1AjF_mGghq-SigP-fxVkAaNUO17Q-hUUY?usp=sharing",
    type:
      "AI / NLP / Language Processing",
    category:
      "AI / LLM",
    featured: true,
  },

  {
    title:
      "Resume Analyzer Using LangChain & LangFlow",
    img:
      "/images/projects/resume.jpg",
    summary:
      "An AI-powered resume analysis tool built using LangChain and LangFlow. It intelligently extracts key information, evaluates candidate fit, and provides insights using LLMs. Designed to streamline recruitment and enhance candidate screening with an interactive LangFlow interface.",
    link:
      "https://github.com/afeef2003/Resume-analyzer",
    github:
      "https://github.com/afeef2003/Resume-analyzer",
    type:
      "AI / NLP / HR Tech",
    category:
      "AI / LLM",
    featured: true,
  },

  {
    title:
      "Transaction Processing System",
    img:
      "/images/projects/TPS.jpg",
    link:
      "https://github.com/afeef2003/Transaction-Processing-Assignment",
    github:
      "https://github.com/afeef2003/Transaction-Processing-Assignment",
    type:
      "Finance / Backend System",
    category:
      "Web / Systems",
  },

  {
    title:
      "Statistical Analysis",
    img:
      "/images/projects/stati.jpeg",
    link:
      "https://github.com/afeef2003/task-4/blob/main/task_04.ipynb",
    github:
      "https://github.com/afeef2003/task-4/blob/main/task_04.ipynb",
    type:
      "Finance / Backend System",
    category:
      "Data / BI",
  },

  {
    title:
      "HTS Agent Recommendation System",
    img:
      "/images/projects/HTS.jpg",
    summary:
      "An autonomous AI assistant built using Python and LangChain. The HTS Agent simulates decision-making, web browsing, and multi-step task execution from a single prompt for automation, research, and productivity workflows.",
    link:
      "https://github.com/afeef2003/HTS_Agent",
    github:
      "https://github.com/afeef2003/HTS_Agent",
    type:
      "AI Agent / Automation",
    category:
      "AI / LLM",
    featured: true,
  },

  {
    title:
      "Ecommerce Sales Dashboard-BI",
    img:
      "/images/projects/Power-BI-Sales.jpg",
    link:
      "https://github.com/afeef2003/Ecommerce-Sales-Dashboard-PowerBI",
    github:
      "https://github.com/afeef2003/Ecommerce-Sales-Dashboard-PowerBI",
    type:
      "Business Intelligence",
    category:
      "Data / BI",
  },

  {
    title:
      "Feature Engineering",
    img:
      "/images/projects/Fea.jpeg",
    link:
      "https://github.com/afeef2003/task-5/blob/main/tasks_05.ipynb",
    github:
      "https://github.com/afeef2003/task-5/blob/main/tasks_05.ipynb",
    type:
      "Software / Feature Engineering",
    category:
      "Data / BI",
  },

  {
    title:
      "Facial Emotion Recognition System",
    img:
      "/images/projects/Emotion-recognition.jpg",
    summary:
      "A machine learning system that detects and classifies human emotions from facial expressions in real time using deep learning and computer vision techniques.",
    link:
      "https://github.com/afeef2003/Facial-Emotion-Recognition-sytem",
    github:
      "https://github.com/afeef2003/Facial-Emotion-Recognition-sytem",
    type:
      "Computer Vision",
    category:
      "Computer Vision",
    featured: true,
  },

  {
    title:
      "Credit Card Fraud Detection System",
    img:
      "/images/projects/Credit-Card.jpg",
    link:
      "https://github.com/afeef2003/Credit-card-Fraud-Detection",
    github:
      "https://github.com/afeef2003/Credit-card-Fraud-Detection",
    type:
      "Machine Learning",
    category:
      "Data / BI",
  },

  {
    title:
      "Social Media Sentiment Analysis",
    img:
      "/images/projects/Socialmedia-Sentiment.jpg",
    link:
      "https://github.com/afeef2003/Social-Media-Sentiment-Analysis",
    github:
      "https://github.com/afeef2003/Social-Media-Sentiment-Analysis",
    type:
      "Natural Language Processing",
    category:
      "AI / LLM",
  },

  {
    title:
      "Bebo AI Chatbot",
    img:
      "/images/projects/Chat-bot.jpg",
    summary:
      "An intelligent conversational AI chatbot powered by natural language processing and machine learning, capable of understanding and responding to user queries in a human-like manner.",
    link:
      "https://github.com/AFNANSH552/my-chatbot",
    github:
      "https://github.com/AFNANSH552/my-chatbot",
    type:
      "Artificial Intelligence",
    category:
      "AI / LLM",
    featured: true,
  },

  {
    title:
      "Spam Email Detection System",
    img:
      "/images/projects/Spam-email.jpg",
    link:
      "https://github.com/afeef2003/spam-email",
    github:
      "https://github.com/afeef2003/email-spam",
    type:
      "Natural Language Processing",
    category:
      "AI / LLM",
  },

  {
    title:
      "Titanic Survival Classification System",
    img:
      "/images/projects/T2.png",
    link:
      "https://github.com/afeef2003/TITANI",
    github:
      "https://github.com/afeef2003/TITANI",
    type:
      "Data Science",
    category:
      "Data / BI",
  },

  {
    title:
      "Real-Time Object Detection System",
    img:
      "/images/projects/Object-Detection.jpg",
    summary:
      "A computer vision system that detects and classifies multiple objects in real-time video streams using deep learning models optimized for performance.",
    link:
      "https://github.com/afeef2003/Real-time-Object-detection-system",
    github:
      "https://github.com/afeef2003/Real-time-Object-detection-system",
    type:
      "Computer Vision",
    category:
      "Computer Vision",
    featured: true,
  },

  {
    title:
      "Netflix Stock Price Prediction",
    img:
      "/images/projects/Netflix-Stock.jpg",
    link:
      "https://github.com/afeef2003/TITANI/blob/main/NFLX.ipynb",
    github:
      "https://github.com/afeef2003/TITANI/blob/main/NFLX.ipynb",
    type:
      "Time Series Analysis",
    category:
      "Data / BI",
  },

  {
    title:
      "Amazon Stock Prediction Dashboard",
    img:
      "/images/projects/Amazon.jpg",
    link:
      "https://github.com/afeef2003/Amazon-Stock-Dashboard",
    github:
      "https://github.com/afeef2003/Amazon-Stock-Dashboard",
    type:
      "Finance / Business Intelligence",
    category:
      "Data / BI",
  },
];

/* ============================================================
   FILTERS
============================================================ */

const FILTERS = [
  "All",
  "AI / LLM",
  "Healthcare",
  "Computer Vision",
  "Data / BI",
  "Automation",
  "Web / Systems",
];

/* ============================================================
   3D TILT
============================================================ */

const Tilt = ({
  children,
  className = "",
}) => {
  const reducedMotion =
    useReducedMotion();

  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const rotateX =
    useSpring(x, {
      stiffness: 150,
      damping: 20,
    });

  const rotateY =
    useSpring(y, {
      stiffness: 150,
      damping: 20,
    });

  const move = (
    event
  ) => {
    if (
      reducedMotion
    )
      return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const px =
      (event.clientX -
        rect.left) /
      rect.width;

    const py =
      (event.clientY -
        rect.top) /
      rect.height;

    x.set(
      (py - 0.5) * -5
    );

    y.set(
      (px - 0.5) * 5
    );
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={move}
      onMouseLeave={
        reset
      }
      style={{
        rotateX,
        rotateY,
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
   PROJECT BUTTON
============================================================ */

const ProjectButton = ({
  href,
  children,
  primary = false,
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className={`
        group

        inline-flex
        items-center
        justify-center

        gap-3

        rounded-full

        border

        px-5
        py-3

        text-[8px]
        font-black

        uppercase
        tracking-[0.15em]

        transition-colors
        duration-300

        ${
          primary
            ? `
              border-dark
              bg-dark
              text-light

              hover:bg-transparent
              hover:text-dark

              dark:border-light
              dark:bg-light
              dark:text-dark

              dark:hover:bg-transparent
              dark:hover:text-light
            `
            : `
              border-dark/10
              text-dark/55

              hover:border-dark/30

              dark:border-light/10
              dark:text-light/55

              dark:hover:border-light/30
            `
        }
      `}
    >
      {children}
    </motion.a>
  );
};

/* ============================================================
   PROJECT IMAGE
============================================================ */

const ProjectImage = ({
  project,
  featured,
}) => {
  return (
    <div
      className={`
        group/image
        relative

        w-full

        overflow-hidden

        ${
          featured
            ? "h-[540px] xl:h-[470px] lg:h-[400px] md:h-[330px] sm:h-[250px]"
            : "h-[330px] lg:h-[290px] md:h-[250px]"
        }
      `}
    >
      <motion.img
        src={
          project.img
        }
        alt={
          project.title
        }
        whileHover={{
          scale: 1.045,
        }}
        transition={{
          duration: 0.7,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="
          h-full
          w-full

          object-cover
          object-center
        "
      />

      {/* DARK GRADIENT */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-gradient-to-t
          from-black/45
          via-transparent
          to-transparent

          opacity-60
        "
      />

      {/* GRID */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]

          bg-[size:44px_44px]

          opacity-0

          transition-opacity
          duration-500

          group-hover/image:opacity-30
        "
      />

      {/* SCANNER */}

      <motion.div
        animate={{
          y: [
            "-100%",
            "800%",
          ],
        }}
        transition={{
          duration: 7,
          repeat:
            Infinity,
          ease: "linear",
          repeatDelay:
            2,
        }}
        className="
          pointer-events-none

          absolute
          left-0
          right-0
          top-0

          h-20

          bg-gradient-to-b
          from-transparent
          via-white/[0.08]
          to-transparent
        "
      />

      <div
        className="
          absolute
          bottom-5
          left-5

          flex
          items-center
          gap-2

          rounded-full

          border
          border-white/20

          bg-black/20

          px-3
          py-2

          text-[7px]
          font-black

          uppercase
          tracking-[0.16em]

          text-white

          backdrop-blur-xl
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
              1.8,
            repeat:
              Infinity,
          }}
          className="
            h-1
            w-1

            rounded-full

            bg-white
          "
        />

        PROJECT VISUAL
      </div>
    </div>
  );
};

/* ============================================================
   FEATURED PROJECT CARD
============================================================ */

const FeaturedProject = ({
  project,
  number,
}) => {
  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 45,
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
        duration: 0.7,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
      className="
        col-span-12
      "
    >
      <Tilt
        className="
          group

          relative

          grid
          grid-cols-12

          overflow-hidden

          rounded-[2.5rem]

          border
          border-dark/[0.09]
          dark:border-light/[0.1]

          bg-light/40
          dark:bg-dark/40

          shadow-[0_35px_100px_rgba(0,0,0,0.08)]

          lg:block

          md:rounded-[2rem]
        "
      >
        {/* NUMBER */}

        <div
          className="
            pointer-events-none

            absolute
            right-6
            top-3

            z-20

            text-[clamp(5rem,10vw,10rem)]
            font-black

            leading-none
            tracking-[-0.09em]

            text-dark/[0.025]
            dark:text-light/[0.025]
          "
        >
          {number}
        </div>

        {/* IMAGE */}

        <div
          className="
            col-span-7
          "
        >
          <ProjectImage
            project={
              project
            }
            featured
          />
        </div>

        {/* CONTENT */}

        <div
          className="
            relative

            col-span-5

            flex
            flex-col

            justify-between

            p-10

            xl:p-8
            lg:p-8
            sm:p-6
          "
          style={{
            transform:
              "translateZ(40px)",
          }}
        >
          <div>
            <div
              className="
                flex
                items-center
                justify-between

                gap-4
              "
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
                    text-[7px]
                    font-black

                    uppercase
                    tracking-[0.2em]

                    text-dark/35
                    dark:text-light/35
                  "
                >
                  SELECTED SYSTEM
                </span>
              </div>

              <span
                className="
                  text-[7px]
                  font-black

                  tracking-[0.17em]

                  text-dark/25
                  dark:text-light/25
                "
              >
                {number}
              </span>
            </div>

            <p
              className="
                mt-10

                text-[8px]
                font-black

                uppercase
                tracking-[0.18em]

                text-dark/35
                dark:text-light/35
              "
            >
              {
                project.type
              }
            </p>

            <h2
              className="
                mt-4

                text-[clamp(2.5rem,4.2vw,5.5rem)]
                font-black

                leading-[0.9]
                tracking-[-0.065em]
              "
            >
              {
                project.title
              }
            </h2>

            {project.summary && (
              <p
                className="
                  mt-7

                  text-xs
                  font-medium

                  leading-[1.85]

                  text-dark/50
                  dark:text-light/50
                "
              >
                {
                  project.summary
                }
              </p>
            )}
          </div>

          <div
            className="
              mt-10

              flex
              flex-wrap

              items-center

              gap-3
            "
          >
            <ProjectButton
              href={
                project.link
              }
              primary
            >
              OPEN PROJECT
              <span>
                ↗
              </span>
            </ProjectButton>

            <ProjectButton
              href={
                project.github
              }
            >
              <span
                className="
                  h-4
                  w-4
                "
              >
                <GithubIcon />
              </span>

              SOURCE
            </ProjectButton>
          </div>
        </div>

        {/* BOTTOM ACCENT */}

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
            duration:
              1.2,
          }}
          className="
            absolute
            bottom-0
            left-0

            h-px
            w-full

            origin-left

            bg-gradient-to-r
            from-dark
            via-dark/20
            to-transparent

            dark:from-light
            dark:via-light/20
          "
        />
      </Tilt>
    </motion.article>
  );
};

/* ============================================================
   STANDARD PROJECT CARD
============================================================ */

const ProjectCard = ({
  project,
  number,
}) => {
  return (
    <motion.article
      layout
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
        amount: 0.12,
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
        col-span-6

        sm:col-span-12
      "
    >
      <Tilt
        className="
          group

          relative

          h-full

          overflow-hidden

          rounded-[2rem]

          border
          border-dark/[0.08]
          dark:border-light/[0.09]

          bg-light/40
          dark:bg-dark/40

          transition-shadow

          hover:shadow-[0_30px_80px_rgba(0,0,0,0.09)]
        "
      >
        <ProjectImage
          project={
            project
          }
        />

        <div
          className="
            relative

            p-7

            md:p-6
          "
          style={{
            transform:
              "translateZ(32px)",
          }}
        >
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between

              gap-4
            "
          >
            <span
              className="
                text-[7px]
                font-black

                uppercase
                tracking-[0.17em]

                text-dark/30
                dark:text-light/30
              "
            >
              PROJECT /
              {number}
            </span>

            <motion.span
              animate={{
                opacity: [
                  0.25,
                  0.8,
                  0.25,
                ],
              }}
              transition={{
                duration:
                  2.2,
                repeat:
                  Infinity,
              }}
              className="
                h-1
                w-1

                rounded-full

                bg-dark
                dark:bg-light
              "
            />
          </div>

          <p
            className="
              mt-6

              text-[7px]
              font-black

              uppercase
              tracking-[0.16em]

              text-dark/35
              dark:text-light/35
            "
          >
            {
              project.type
            }
          </p>

          <h3
            className="
              mt-3

              text-[clamp(1.8rem,3vw,3.3rem)]
              font-black

              leading-[0.95]
              tracking-[-0.055em]
            "
          >
            {
              project.title
            }
          </h3>

          <p
            className="
              mt-5

              text-[10px]
              font-medium

              leading-[1.75]

              text-dark/45
              dark:text-light/45
            "
          >
            {project.summary
              ? project.summary
              : "Open the project to inspect the implementation, source code and technical details."}
          </p>

          {/* FOOTER */}

          <div
            className="
              mt-8
              pt-5

              flex
              items-center
              justify-between

              gap-4

              border-t
              border-dark/[0.07]

              dark:border-light/[0.08]
            "
          >
            <motion.a
              href={
                project.link
              }
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                x: 4,
              }}
              className="
                group/link

                flex
                items-center
                gap-3

                text-[8px]
                font-black

                uppercase
                tracking-[0.14em]
              "
            >
              VIEW SYSTEM

              <span
                className="
                  transition-transform
                  group-hover/link:-translate-y-1
                "
              >
                ↗
              </span>
            </motion.a>

            <motion.a
              href={
                project.github
              }
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.9,
              }}
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
              "
            >
              <span
                className="
                  h-4
                  w-4
                "
              >
                <GithubIcon />
              </span>
            </motion.a>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
};

/* ============================================================
   HERO BACKGROUND
============================================================ */

const HeroBackground = () => {
  const x =
    useMotionValue(-500);

  const y =
    useMotionValue(-500);

  const smoothX =
    useSpring(x, {
      stiffness: 75,
      damping: 25,
    });

  const smoothY =
    useSpring(y, {
      stiffness: 75,
      damping: 25,
    });

  const background =
    useTransform(
      [smoothX, smoothY],
      ([mx, my]) =>
        `radial-gradient(
          520px circle at ${mx}px ${my}px,
          rgba(120,120,120,0.10),
          transparent 68%
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
        absolute
        inset-0

        z-[1]

        md:hidden
      "
    />
  );
};

/* ============================================================
   HERO
============================================================ */

const ProjectsHero = () => {
  const featuredCount =
    PROJECTS.filter(
      (project) =>
        project.featured
    ).length;

  const domainCount =
    new Set(
      PROJECTS.map(
        (project) =>
          project.category
      )
    ).size;

  return (
    <section
      className="
        relative

        overflow-hidden

        rounded-[3rem]

        border
        border-dark/[0.07]
        dark:border-light/[0.08]

        bg-light/30
        dark:bg-dark/30

        px-12
        pb-16
        pt-14

        xl:px-10
        md:rounded-[2rem]
        md:px-7
        md:pb-12
        md:pt-10

        sm:px-5
      "
    >
      {/* GRID */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)]

          bg-[size:50px_50px]

          dark:opacity-40
        "
      />

      {/* HUGE BACKGROUND TYPE */}

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
          ease:
            "easeInOut",
        }}
        className="
          pointer-events-none

          absolute

          bottom-[-4%]
          left-1/2

          -translate-x-1/2

          whitespace-nowrap

          text-[17vw]
          font-black

          tracking-[-0.1em]

          text-dark/[0.018]
          dark:text-light/[0.02]

          select-none
        "
      >
        PROJECTS
      </motion.div>

      {/* CURSOR FIELD */}

      <HeroBackground />

      <div
        className="
          relative
          z-10
        "
      >
        {/* TOP BAR */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-dark/[0.07]
            dark:border-light/[0.08]

            pb-6
          "
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
                  0.25,
                  1,
                  0.25,
                ],
                scale: [
                  0.8,
                  1.2,
                  0.8,
                ],
              }}
              transition={{
                duration:
                  1.9,
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

                text-dark/40
                dark:text-light/40
              "
            >
              PROJECT SYSTEMS
              ARCHIVE
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
            "
          >
            BUILD /
            EXPERIMENT /
            SHIP
          </span>
        </div>

        {/* MAIN TITLE */}

        <div
          className="
            pt-20

            md:pt-14
          "
        >
          <div
            className="
              overflow-hidden
            "
          >
            <motion.h1
              initial={{
                y: "110%",
              }}
              animate={{
                y: "0%",
              }}
              transition={{
                duration: 1,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                text-[clamp(5rem,12vw,12rem)]
                font-black

                leading-[0.72]
                tracking-[-0.09em]
              "
            >
              PROJECTS
            </motion.h1>
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
              animate={{
                y: "0%",
              }}
              transition={{
                duration: 1,
                delay: 0.08,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                text-[clamp(3rem,7vw,8rem)]
                font-black

                leading-[0.85]
                tracking-[-0.075em]

                text-dark/20
                dark:text-light/20
              "
            >
              BUILT TO SHIP.
            </motion.h2>
          </div>
        </div>

        {/* COPY + STATS */}

        <div
          className="
            mt-14

            grid
            grid-cols-12

            gap-10

            md:block
          "
        >
          <motion.p
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
              col-span-6

              max-w-xl

              text-sm
              font-medium

              leading-[1.9]

              text-dark/50
              dark:text-light/50

              md:text-xs
            "
          >
            A collection of AI,
            machine learning,
            agentic systems,
            healthcare
            intelligence,
            automation, data
            platforms and
            experimental software
            built across real-world
            problem spaces.
          </motion.p>

          <div
            className="
              col-span-6

              grid
              grid-cols-3

              gap-3

              md:mt-10

              sm:grid-cols-1
            "
          >
            {[
              {
                value:
                  PROJECTS.length,
                label:
                  "PROJECT BUILDS",
              },
              {
                value:
                  domainCount,
                label:
                  "SYSTEM DOMAINS",
              },
              {
                value:
                  featuredCount,
                label:
                  "SELECTED WORKS",
              },
            ].map(
              (
                item,
                index
              ) => (
                <motion.div
                  key={
                    item.label
                  }
                  initial={{
                    opacity:
                      0,
                    y: 20,
                  }}
                  animate={{
                    opacity:
                      1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      0.4 +
                      index *
                        0.08,
                  }}
                  className="
                    rounded-[1.5rem]

                    border
                    border-dark/[0.08]
                    dark:border-light/[0.08]

                    p-5
                  "
                >
                  <p
                    className="
                      text-3xl
                      font-black

                      tracking-[-0.06em]
                    "
                  >
                    {
                      item.value
                    }
                  </p>

                  <p
                    className="
                      mt-2

                      text-[6px]
                      font-black

                      uppercase
                      tracking-[0.15em]

                      text-dark/30
                      dark:text-light/30
                    "
                  >
                    {
                      item.label
                    }
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* SCROLL INDICATOR */}

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
            mt-14

            flex
            items-center

            gap-3
          "
        >
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
            ENTER ARCHIVE
          </span>

          <span
            className="
              text-dark/30
              dark:text-light/30
            "
          >
            ↓
          </span>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   FILTER BAR
============================================================ */

const FilterBar = ({
  active,
  setActive,
  visibleCount,
}) => {
  return (
    <div
      className="
        mt-20

        border-y
        border-dark/[0.08]
        dark:border-light/[0.08]

        py-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          gap-8

          lg:flex-col
          lg:items-start
        "
      >
        <div
          className="
            flex
            flex-wrap

            gap-2
          "
        >
          {FILTERS.map(
            (
              filter
            ) => {
              const selected =
                active ===
                filter;

              return (
                <motion.button
                  key={
                    filter
                  }
                  type="button"
                  onClick={() =>
                    setActive(
                      filter
                    )
                  }
                  whileTap={{
                    scale:
                      0.96,
                  }}
                  className={`
                    relative

                    rounded-full

                    border

                    px-4
                    py-2.5

                    text-[7px]
                    font-black

                    uppercase
                    tracking-[0.14em]

                    transition-colors

                    ${
                      selected
                        ? `
                          border-dark
                          bg-dark
                          text-light

                          dark:border-light
                          dark:bg-light
                          dark:text-dark
                        `
                        : `
                          border-dark/[0.08]
                          text-dark/40

                          hover:text-dark

                          dark:border-light/[0.08]
                          dark:text-light/40

                          dark:hover:text-light
                        `
                    }
                  `}
                >
                  {
                    filter
                  }
                </motion.button>
              );
            }
          )}
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
              h-1
              w-1

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
            {String(
              visibleCount
            ).padStart(
              2,
              "0"
            )}{" "}
            SYSTEMS VISIBLE
          </span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ARCHIVE END
============================================================ */

const ArchiveEnd = () => {
  return (
    <motion.section
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

        mt-28

        overflow-hidden

        rounded-[2.5rem]

        border
        border-dark/[0.08]
        dark:border-light/[0.09]

        px-10
        py-14

        md:px-7
      "
    >
      {/* GRID */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]

          bg-[size:40px_40px]
        "
      />

      <div
        className="
          relative
          z-10

          flex
          items-end
          justify-between

          gap-10

          md:block
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
            PROJECT ARCHIVE /
            CONTINUOUS
          </p>

          <h2
            className="
              mt-5

              max-w-4xl

              text-[clamp(3rem,6vw,7rem)]
              font-black

              leading-[0.85]
              tracking-[-0.075em]
            "
          >
            BUILD.
            <br />
            TEST.
            <br />

            <span
              className="
                text-dark/20
                dark:text-light/20
              "
            >
              ITERATE.
            </span>
          </h2>

          <p
            className="
              mt-7

              max-w-xl

              text-xs
              font-medium

              leading-[1.8]

              text-dark/50
              dark:text-light/50
            "
          >
            The archive keeps
            evolving as new
            experiments move from
            ideas into working
            systems.
          </p>
        </div>

        <motion.div
          animate={{
            rotate:
              360,
          }}
          transition={{
            duration: 18,
            repeat:
              Infinity,
            ease: "linear",
          }}
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
            border-dashed
            border-dark/15

            dark:border-light/15

            md:mt-10
          "
        >
          <div
            className="
              text-center
            "
          >
            <p
              className="
                text-3xl
                font-black

                tracking-[-0.07em]
              "
            >
              {PROJECTS.length}
            </p>

            <p
              className="
                mt-1

                text-[6px]
                font-black

                uppercase
                tracking-[0.15em]

                text-dark/30
                dark:text-light/30
              "
            >
              BUILDS
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ============================================================
   PROJECTS PAGE
============================================================ */

const Projects = () => {
  const [
    activeFilter,
    setActiveFilter,
  ] = useState("All");

  const {
    scrollYProgress,
  } = useScroll();

  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 100,
        damping: 25,
        mass: 0.25,
      }
    );

  const filteredProjects =
    useMemo(() => {
      if (
        activeFilter ===
        "All"
      ) {
        return PROJECTS;
      }

      return PROJECTS.filter(
        (project) =>
          project.category ===
          activeFilter
      );
    }, [
      activeFilter,
    ]);

  return (
    <>
      <Head>
        <title>
          Syeda Shamama Afeef |
          AI & Engineering
          Projects
        </title>

        <meta
          name="description"
          content="Explore AI, machine learning, agentic AI, data science, automation, computer vision, healthcare and software engineering projects by Syeda Shamama Afeef."
        />
      </Head>

      {/* ======================================================
          GLOBAL PAGE PROGRESS
      ====================================================== */}

      <motion.div
        style={{
          scaleX:
            smoothProgress,
        }}
        className="
          fixed
          left-0
          right-0
          top-0

          z-[950]

          h-[2px]

          origin-left

          bg-dark
          dark:bg-light
        "
      />

      <main
        className="
          relative

          w-full

          overflow-hidden

          text-dark
          dark:text-light
        "
      >
        {/* PAGE GRID */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]

            bg-[size:72px_72px]

            opacity-[0.012]

            dark:opacity-[0.025]
          "
        />

        <Layout
          className="
            relative
            z-10

            pb-28
            pt-12

            md:pb-20
          "
        >
          {/* HERO */}

          <ProjectsHero />

          {/* FILTER */}

          <FilterBar
            active={
              activeFilter
            }
            setActive={
              setActiveFilter
            }
            visibleCount={
              filteredProjects.length
            }
          />

          {/* ====================================================
              ARCHIVE LABEL
          ==================================================== */}

          <div
            className="
              mt-20

              flex
              items-end
              justify-between

              gap-8

              md:block
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
                SYSTEM INDEX
              </p>

              <h2
                className="
                  mt-4

                  text-[clamp(3.5rem,7vw,8rem)]
                  font-black

                  leading-[0.8]
                  tracking-[-0.08em]
                "
              >
                SELECTED
                <br />

                <span
                  className="
                    text-dark/20
                    dark:text-light/20
                  "
                >
                  BUILDS.
                </span>
              </h2>
            </div>

            <p
              className="
                max-w-sm

                text-right

                text-xs
                font-medium

                leading-[1.8]

                text-dark/45
                dark:text-light/45

                md:mt-6
                md:text-left
              "
            >
              Filter the archive by
              engineering domain or
              explore the complete
              collection.
            </p>
          </div>

          {/* ====================================================
              PROJECT GRID
          ==================================================== */}

          <motion.div
            layout
            className="
              mt-16

              grid
              grid-cols-12

              gap-8
              gap-y-10

              md:gap-6
              md:gap-y-8
            "
          >
            <AnimatePresence
              mode="popLayout"
            >
              {filteredProjects.map(
                (
                  project
                ) => {
                  const originalIndex =
                    PROJECTS.indexOf(
                      project
                    );

                  const number =
                    String(
                      originalIndex +
                        1
                    ).padStart(
                      2,
                      "0"
                    );

                  return project.featured ? (
                    <FeaturedProject
                      key={`${project.title}-${project.link}`}
                      project={
                        project
                      }
                      number={
                        number
                      }
                    />
                  ) : (
                    <ProjectCard
                      key={`${project.title}-${project.link}`}
                      project={
                        project
                      }
                      number={
                        number
                      }
                    />
                  );
                }
              )}
            </AnimatePresence>
          </motion.div>

          {/* EMPTY FILTER STATE */}

          {filteredProjects.length ===
            0 && (
            <div
              className="
                py-28
                text-center
              "
            >
              <p
                className="
                  text-xs
                  font-black

                  uppercase
                  tracking-[0.2em]

                  text-dark/30
                  dark:text-light/30
                "
              >
                NO SYSTEMS FOUND
              </p>
            </div>
          )}

          {/* ARCHIVE END */}

          <ArchiveEnd />

          {/* ====================================================
              FINAL SYSTEM LINE
          ==================================================== */}

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
              PROJECT SYSTEMS
              ARCHIVE
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
              {PROJECTS.length} /
              {PROJECTS.length} —
              ARCHIVE ACTIVE
            </span>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;
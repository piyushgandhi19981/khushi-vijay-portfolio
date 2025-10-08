import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import profileImage from "../assets/profile.jpeg";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Custom cursor effect
    if (typeof window !== "undefined") {
      const cursor = cursorRef.current;
      const cursorText = cursorTextRef.current;

      if (cursor && cursorText) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const updateCursor = () => {
          cursorX += (mouseX - cursorX) * 0.15;
          cursorY += (mouseY - cursorY) * 0.15;
          gsap.set(cursor, { x: cursorX, y: cursorY });
        };

        window.addEventListener("mousemove", (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        gsap.ticker.add(updateCursor);

        // Show/hide cursor
        document.addEventListener("mouseenter", () => {
          gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
        });

        document.addEventListener("mouseleave", () => {
          gsap.to(cursor, { scale: 0, duration: 0.3, ease: "power3.out" });
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll("[data-cursor-view]");
        hoverElements.forEach((element) => {
          element.addEventListener("mouseenter", () => {
            gsap.to(cursor, {
              duration: 0.3,
              scale: 4,
              backgroundColor: "#26d137",
              ease: "power3.out",
            });
            gsap.to(cursorText, {
              duration: 0.25,
              opacity: 1,
              color: "#ffffff",
              ease: "power3.out",
            });
          });

          element.addEventListener("mouseleave", () => {
            gsap.to(cursor, {
              duration: 0.3,
              scale: 1,
              backgroundColor: "#39ff14",
              ease: "power3.out",
            });
            gsap.to(cursorText, {
              duration: 0.25,
              opacity: 0,
              ease: "power3.out",
            });
          });
        });

        // Smooth scroll navigation
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            if (targetId) {
              const targetElement = document.querySelector(targetId);

              if (targetElement) {
                gsap.to(window, {
                  duration: 1.2,
                  scrollTo: {
                    y: targetElement,
                    offsetY: 80,
                  },
                  ease: "power2.inOut",
                });
              }
            }
          });
        });
      }

      // Initial animations
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
      });

      tl.fromTo(
        ".gsap-fade-up",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 }
      );

      // Glitch effect for hero name
      const heroName = document.getElementById("hero-name");
      if (heroName) {
        const originalText = heroName.textContent?.trim() || "";
        const glitchChars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*{}[]<>/\\|";

        const glitchEffect = (
          element: HTMLElement,
          text: string,
          duration: number = 1000
        ) => {
          const startTime = performance.now();
          element.classList.add("glitch");

          const animate = (currentTime: number) => {
            const progress = Math.min(
              1,
              Math.max(0, (currentTime - startTime) / duration)
            );
            if (progress < 1) {
              let glitchedText = "";
              for (let i = 0; i < text.length; i++) {
                const char = text[i];
                glitchedText +=
                  char === " "
                    ? " "
                    : glitchChars[
                        Math.floor(Math.random() * glitchChars.length)
                      ];
              }
              element.textContent = glitchedText;
              requestAnimationFrame(animate);
            } else {
              element.textContent = text;
              element.classList.remove("glitch");
            }
          };

          requestAnimationFrame(animate);
        };

        // Trigger glitch effect after initial load
        setTimeout(() => {
          glitchEffect(heroName, originalText, 400);
        }, 1000);
      }

      // Scroll-triggered animations
      gsap.utils.toArray("section:not(#home)").forEach((section) => {
        const elements = (section as Element).querySelectorAll(".gsap-fade-up");
        if (elements.length > 0) {
          gsap.fromTo(
            elements,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section as Element,
                start: "top 80%",
                toggleActions: "restart none restart none",
              },
            }
          );
        }
      });

      // Section title animations
      gsap.utils.toArray(".gsap-section-title").forEach((title) => {
        gsap.set(title as Element, { opacity: 0, y: 30 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: (title as Element).closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        tl.to(title as Element, {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
        }).to(title as Element, { y: -80, ease: "none" }, ">");
      });

      // Header scroll effect
      const header = document.getElementById("main-header");
      const headerInitialLeft = document.getElementById("header-initial-left");
      const headerInitialRight = document.getElementById(
        "header-initial-right"
      );
      const headerScrolledLeft = document.getElementById(
        "header-scrolled-left"
      );
      const headerScrolledRight = document.getElementById(
        "header-scrolled-right"
      );

      if (
        header &&
        headerInitialLeft &&
        headerInitialRight &&
        headerScrolledLeft &&
        headerScrolledRight
      ) {
        ScrollTrigger.create({
          trigger: "#home",
          start: "bottom top",
          onEnter: () => {
            headerScrolledLeft?.classList.remove("pointer-events-none");
            headerScrolledRight?.classList.remove("pointer-events-none");
            headerInitialLeft?.classList.add("pointer-events-none");
            headerInitialRight?.classList.add("pointer-events-none");
            gsap.to([headerInitialLeft, headerInitialRight], {
              opacity: 0,
              duration: 0.3,
            });
            gsap.to([headerScrolledLeft, headerScrolledRight], {
              opacity: 1,
              duration: 0.3,
              delay: 0.1,
            });
            gsap.to(header, { backgroundColor: "#1c1c1c", duration: 0.4 });
            header.setAttribute("data-theme", "dark");
          },
          onLeaveBack: () => {
            headerInitialLeft?.classList.remove("pointer-events-none");
            headerInitialRight?.classList.remove("pointer-events-none");
            headerScrolledLeft?.classList.add("pointer-events-none");
            headerScrolledRight?.classList.add("pointer-events-none");
            gsap.to([headerScrolledLeft, headerScrolledRight], {
              opacity: 0,
              duration: 0.3,
            });
            gsap.to([headerInitialLeft, headerInitialRight], {
              opacity: 1,
              duration: 0.3,
              delay: 0.1,
            });
            gsap.to(header, { backgroundColor: "transparent", duration: 0.4 });
            header.removeAttribute("data-theme");
          },
        });
      }

      // Footer character fill animation
      const footerChars = document.querySelectorAll(".footer-char-fill");
      if (footerChars.length > 0) {
        gsap.to(footerChars, {
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: "#contact",
            start: "center 80%",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          CA Khushi Vijay - Chartered Accountant & Business Consultant
        </title>
        <meta
          name="description"
          content="Results-oriented Chartered Accountant with experience in business consulting, financial transformation, and risk management."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="cursor-dot hidden md:flex items-center justify-center"
      >
        <span ref={cursorTextRef} className="cursor-text" />
      </div>

      <main>
        {/* Header */}
        <header
          id="main-header"
          className="fixed top-0 left-0 w-full p-8 lg:p-12 z-[100] transition-colors duration-500"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="relative">
              <div id="header-initial-left" className="flex gap-x-6 text-black">
                <a
                  href="#work"
                  data-cursor-view
                  className="hover:text-gray-500 transition-colors"
                >
                  Work
                </a>
                <a
                  href="#about"
                  data-cursor-view
                  className="hover:text-gray-500 transition-colors"
                >
                  About
                </a>
                <a
                  href="#services"
                  data-cursor-view
                  className="hover:text-gray-500 transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#education"
                  data-cursor-view
                  className="hover:text-gray-500 transition-colors"
                >
                  Education
                </a>
                <a
                  href="#certificates"
                  data-cursor-view
                  className="hover:text-gray-500 transition-colors"
                >
                  Certificates
                </a>
                <a
                  href="#contact"
                  data-cursor-view
                  className="hover:text-gray-500 transition-colors"
                >
                  Contact
                </a>
              </div>
              <p
                id="header-scrolled-left"
                className="absolute top-0 left-0 font-bold text-brand-light opacity-0 pointer-events-none"
              >
                <span className="md:inline hidden">khushi vijay</span>
                <span className="md:hidden inline">khushivijay</span>
              </p>
            </div>
            <div className="relative">
              <p
                id="header-initial-right"
                className="text-black hidden md:block"
              >
                Chartered Accountant
              </p>
              <div
                id="header-scrolled-right"
                className="absolute top-1/2 -translate-y-1/2 md:top-0 md:translate-y-0 right-0 flex gap-x-6 text-brand-light opacity-0 pointer-events-none"
              >
                <a
                  href="#work"
                  data-cursor-view
                  className="hover:text-gray-400 transition-colors"
                >
                  Work
                </a>
                <a
                  href="#about"
                  data-cursor-view
                  className="hover:text-gray-400 transition-colors"
                >
                  About
                </a>
                <a
                  href="#network"
                  data-cursor-view
                  className="hover:text-gray-500 transition-colors"
                >
                  Network
                </a>
                <a
                  href="#contact"
                  data-cursor-view
                  className="hover:text-gray-400 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Home Section */}
        <section
          id="home"
          data-section-name="home"
          className="relative min-h-screen w-full p-8 lg:p-12 text-black flex items-center"
          style={{ backgroundColor: "#fff9f0" }}
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-y-16 pt-32">
            <div className="md:col-span-3">
              <h1
                id="hero-name"
                className="text-6xl sm:text-8xl md:text-9xl font-semibold tracking-tighter leading-none gsap-fade-up text-black"
              >
                KHUSHI VIJAY
              </h1>
            </div>
            <div className="md:col-span-3">
              <p className="text-4xl lg:text-5xl max-w-3xl gsap-fade-up text-black font-medium">
                Results-oriented Chartered Accountant with experience in
                business consulting, financial transformation, and risk
                management.
              </p>
            </div>
            <div className="md:col-start-4 md:col-span-2 flex flex-col gap-8 text-lg text-gray-700">
              <p className="gsap-fade-up">
                Proven expertise in leading end-to-end project lifecycles, from
                solution design to implementation. Skilled at managing globally
                dispersed teams and driving cost savings through process
                automation.
              </p>
              <p className="gsap-fade-up">
                I transform complex financial data into strategic insights, all
                while ensuring compliance and delivering high-quality solutions
                within timelines and budget.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          data-section-name="about"
          className="relative min-h-screen w-full px-8 py-16 md:px-16 lg:px-24 flex items-center"
          data-theme="dark"
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 gap-8 md:gap-16 items-start">
            <h2 className="text-6xl md:text-8xl text-gray-500 gsap-section-title font-bold">
              About
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-3xl md:text-4xl text-white gsap-fade-up">
                hello, I&apos;m CA Khushi Vijay 👋 a Chartered Accountant based
                in India. I specialize in financial transformation, risk
                management, and business consulting.
              </p>
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-fit h-fit lg:h-64 bg-gray-800 rounded-md gsap-fade-up overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="CA Khushi Vijay - Chartered Accountant"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover rounded-md"
                    priority
                  />
                </div>
                <div className="md:w-1/2 text-brand-gray gsap-fade-up space-y-4">
                  <p>
                    Throughout my career, I&apos;ve successfully managed
                    large-scale engagements, led cross-functional teams, and
                    provided strategic financial guidance to senior leadership.
                    I specialize in project lifecycles, team management, and
                    delivering cost-effective solutions that exceed client
                    expectations.
                  </p>
                  <p>
                    My approach combines strong analytical skills with excellent
                    communication abilities, ensuring that complex financial
                    concepts are clearly understood by stakeholders at all
                    levels. I&apos;m committed to maintaining the highest
                    standards of professional and ethical conduct while
                    delivering integrated business perspectives that drive
                    sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section
          id="work"
          data-section-name="work"
          className="relative min-h-screen w-full px-8 py-16 md:px-16 lg:px-24 flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 gap-8 md:gap-16 items-start">
            <h2 className="text-6xl md:text-8xl text-gray-500 gsap-section-title font-bold">
              Experience
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
              <p className="text-3xl md:text-4xl text-white gsap-fade-up h-fit lg:sticky top-[10rem]">
                Check out what I&apos;ve been working on.
              </p>
              <div className="flex flex-col">
                <a
                  href="https://www.linkedin.com/in/khushivijay"
                  data-cursor-view
                  className="block py-12 border-b border-gray-800 gsap-fade-up group hover-lift"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-4xl lg:text-sm text-gray-600 mb-4 block">
                    Sept 2024 — Present
                  </span>
                  <h3 className="text-3xl md:text-5xl xl:text-7xl font-medium text-white mb-4 transition-colors group-hover:text-brand-green">
                    Business Development & Strategic Financial Analysis
                  </h3>
                  <p className="text-brand-gray mb-2 font-semibold">
                    Jones Lang Lasalle · India
                  </p>
                  <p className="text-brand-gray max-w-md">
                    Leading strategic initiatives to expand business
                    opportunities and drive revenue growth through innovative
                    financial solutions and client relationship management.
                    Conducting comprehensive financial analysis to support
                    strategic decision-making and identify opportunities for
                    operational improvements.
                  </p>
                  <div className="mt-4 text-sm text-brand-gray">
                    <p className="mb-2">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Identified new business opportunities and created
                        financial models for investment decisions
                      </li>
                      <li>
                        Translated complex P&L insights into strategic
                        recommendations for performance gains
                      </li>
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Financial Modeling
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Strategic Analysis
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Business Development
                      </span>
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/khushivijay"
                  data-cursor-view
                  className="block py-12 border-b border-gray-800 gsap-fade-up group hover-lift"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-4xl lg:text-sm text-gray-600 mb-4 block">
                    Mar 2021 — Sept 2024
                  </span>
                  <h3 className="text-3xl md:text-5xl xl:text-7xl font-medium text-white mb-4 transition-colors group-hover:text-brand-green">
                    Risk & Financial Reporting Specialist
                  </h3>
                  <p className="text-brand-gray mb-2 font-semibold">
                    Ernst and Young LLP · India
                  </p>
                  <p className="text-brand-gray max-w-md">
                    Managed comprehensive risk assessment processes and ensured
                    compliance with financial reporting standards across
                    multiple client engagements. Led cross-functional teams and
                    spearheaded digital transformation initiatives, modernizing
                    financial processes and implementing best practices.
                  </p>
                  <div className="mt-4 text-sm text-brand-gray">
                    <p className="mb-2">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Performed data analysis for risk identification and
                        cost-saving opportunities under federal and state laws
                      </li>
                      <li>
                        Led a team of 5 on M&A and HR Integration projects,
                        coordinating with clients and stakeholders across 25+
                        countries
                      </li>
                      <li>
                        Designed a tax calculator for 3 European countries for
                        cost optimization
                      </li>
                      <li>
                        Spearheaded a project for 100% automation over 7500+
                        compliances, reducing non-compliance risk and saving
                        hours annually
                      </li>
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Risk Management
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Financial Reporting
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Team Leadership
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Process Automation
                      </span>
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/khushivijay"
                  data-cursor-view
                  className="block py-12 border-b border-gray-800 gsap-fade-up group hover-lift"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-4xl lg:text-sm text-gray-600 mb-4 block">
                    Feb 2018 — Feb 2021
                  </span>
                  <h3 className="text-3xl md:text-5xl xl:text-7xl font-medium text-white mb-4 transition-colors group-hover:text-brand-green">
                    Financial Reporting & Compliance Manager
                  </h3>
                  <p className="text-brand-gray mb-2 font-semibold">
                    VKG and Company · India
                  </p>
                  <p className="text-brand-gray max-w-md">
                    Ensured accurate financial reporting and maintained
                    compliance with regulatory requirements, implementing robust
                    internal controls and audit procedures. Developed and
                    maintained comprehensive internal control systems to
                    safeguard assets and ensure the integrity of financial
                    information.
                  </p>
                  <div className="mt-4 text-sm text-brand-gray">
                    <p className="mb-2">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Prepared and finalized financial statements and tax
                        returns for multiple clients
                      </li>
                      <li>
                        Formulated and managed statutory audits to improve
                        operational efficiency and strengthen internal control
                      </li>
                      <li>
                        Successfully resolved complex statutory demands and
                        regulatory issues, ensuring full compliance and
                        minimizing potential penalties
                      </li>
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Financial Reporting
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Tax Compliance
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Internal Controls
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        Statutory Audits
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          data-section-name="services"
          className="relative w-full px-8 py-16 md:px-16 lg:px-24 flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 gap-8 items-start">
            <h2 className="text-6xl md:text-8xl text-gray-500 gsap-section-title font-bold">
              Skills
            </h2>
            <div>
              <p className="text-3xl md:text-4xl text-white gsap-fade-up">
                Comprehensive expertise across multiple domains of accounting,
                finance, and business consulting 👇
              </p>
              <div className="flex flex-col gap-24 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gsap-fade-up">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600 mb-4">01</span>
                    <h3 className="font-mono text-4xl md:text-5xl text-white">
                      Communication & Leadership
                    </h3>
                    <p className="text-brand-gray mt-4 text-sm">
                      Excellent communication, client relationship management,
                      and stakeholder management skills. Proven ability to lead
                      and manage teams of 8-10 resources, delivering projects
                      within timelines and budget while driving high-quality
                      solutions.
                    </p>
                  </div>
                  <ul className="md:col-span-2 flex flex-col">
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Team Leadership</span>
                      <span className="text-gray-600">👥</span>
                    </li>
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Client Relations</span>
                      <span className="text-gray-600">💼</span>
                    </li>
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Stakeholder Management</span>
                      <span className="text-gray-600">🤝</span>
                    </li>
                    <li className="flex justify-between items-center py-4 hover:text-brand-green transition-colors">
                      <span className="text-lg">Project Management</span>
                      <span className="text-gray-600">📋</span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gsap-fade-up">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600 mb-4">02</span>
                    <h3 className="font-mono text-4xl md:text-5xl text-white">
                      Business Development
                    </h3>
                    <p className="text-brand-gray mt-4 text-sm">
                      Proactive and self-motivated with strong abilities in
                      business development, design to deploy methodologies, and
                      large-scale engagement management with diverse teams.
                    </p>
                  </div>
                  <ul className="md:col-span-2 flex flex-col">
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Business Development</span>
                      <span className="text-gray-600">🚀</span>
                    </li>
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Strategic Planning</span>
                      <span className="text-gray-600">📊</span>
                    </li>
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Process Automation</span>
                      <span className="text-gray-600">⚙️</span>
                    </li>
                    <li className="flex justify-between items-center py-4 hover:text-brand-green transition-colors">
                      <span className="text-lg">Cost Optimization</span>
                      <span className="text-gray-600">💰</span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gsap-fade-up">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600 mb-4">03</span>
                    <h3 className="font-display text-5xl md:text-6xl text-white">
                      Analytical & Technical
                    </h3>
                    <p className="text-brand-gray mt-4 text-sm">
                      Proficient in data visualization with strong analytical
                      and problem-solving skills for business insights.
                      Expertise in delivering projects within timelines and
                      budget constraints.
                    </p>
                  </div>
                  <ul className="md:col-span-2 flex flex-col">
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Data Analysis</span>
                      <span className="text-gray-600">📊</span>
                    </li>
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Financial Modeling</span>
                      <span className="text-gray-600">📈</span>
                    </li>
                    <li className="flex justify-between items-center py-4 border-b border-gray-800 hover:text-brand-green transition-colors">
                      <span className="text-lg">Risk Assessment</span>
                      <span className="text-gray-600">⚠️</span>
                    </li>
                    <li className="flex justify-between items-center py-4 hover:text-brand-green transition-colors">
                      <span className="text-lg">Problem Solving</span>
                      <span className="text-gray-600">🧩</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          data-section-name="education"
          className="relative w-full px-8 py-16 md:px-16 lg:px-24 flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 gap-8 items-start">
            <h2 className="text-6xl md:text-8xl text-gray-500 gsap-section-title font-bold">
              Education
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
              <p className="text-3xl md:text-4xl text-white gsap-fade-up h-fit lg:sticky top-[10rem]">
                Academic achievements and professional qualifications.
              </p>
              <div className="flex flex-col">
                <div className="block py-12 border-b border-gray-800 gsap-fade-up group">
                  <span className="text-4xl lg:text-sm text-gray-600 mb-4 block">
                    Feb 2021
                  </span>
                  <h3 className="text-3xl md:text-5xl xl:text-7xl font-medium text-white mb-4 transition-colors group-hover:text-brand-green">
                    Chartered Accountant (ICAI)
                  </h3>
                  <p className="text-brand-gray mb-2 font-semibold">
                    Institute of Chartered Accountants of India
                  </p>
                  <p className="text-brand-gray max-w-md">
                    Successfully completed the rigorous Chartered Accountancy
                    program from the Institute of Chartered Accountants of
                    India, demonstrating exceptional dedication and academic
                    excellence by clearing all examinations in the first
                    attempt.
                  </p>
                  <div className="mt-4 text-sm text-brand-gray">
                    <p className="mb-2">Achievement:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Cleared in first attempt</li>
                      <li>
                        Demonstrated exceptional dedication and academic
                        excellence
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          data-section-name="certificates"
          className="relative w-full px-8 py-16 md:px-16 lg:px-24 flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 gap-8 items-start">
            <h2 className="text-6xl md:text-8xl text-gray-500 gsap-section-title font-bold">
              Certificates
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
              <p className="text-3xl md:text-4xl text-white gsap-fade-up h-fit lg:sticky top-[10rem]">
                Professional certifications and specialized training.
              </p>
              <div className="flex flex-col space-y-8">
                <div className="block py-8 border-b border-gray-800 gsap-fade-up group">
                  <h3 className="text-xl text-white mb-2 transition-colors group-hover:text-brand-green">
                    Data Visualization Certificate
                  </h3>
                  <p className="text-brand-gray text-sm">
                    Advanced certification in Analytics and Data visualization.
                  </p>
                  <a
                    href="https://drive.google.com/uc?export=download&id=1XLSAIT97xyxtv37W3eI3LVwpEyCqMLmt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-green text-sm hover:text-white transition-colors"
                  >
                    View Certificate
                  </a>
                </div>
                <div className="block py-8 border-b border-gray-800 gsap-fade-up group">
                  <h3 className="text-xl text-white mb-2 transition-colors group-hover:text-brand-green">
                    Data Strategy Excellence
                  </h3>
                  <p className="text-brand-gray text-sm">
                    Certification demonstrating expertise in data strategy and
                    data management.
                  </p>
                  <a
                    href="https://drive.google.com/uc?export=download&id=1C3DqILOnw1uhBDPs2gJD2ko9eFnLEj3d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-green text-sm hover:text-white transition-colors"
                  >
                    View Certificate
                  </a>
                </div>
                <div className="block py-8 border-b border-gray-800 gsap-fade-up group">
                  <h3 className="text-xl text-white mb-2 transition-colors group-hover:text-brand-green">
                    Generative AI Mastermind
                  </h3>
                  <p className="text-brand-gray text-sm">
                    Advanced certification in AI technologies and Generative AI.
                  </p>
                  <a
                    href="https://drive.google.com/uc?export=download&id=12wYGfxmaNLrNZWM5mRNRKvd-7jU_tTH9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-green text-sm hover:text-white transition-colors"
                  >
                    View Certificate
                  </a>
                </div>
                <div className="block py-8 border-b border-gray-800 gsap-fade-up group">
                  <h3 className="text-xl text-white mb-2 transition-colors group-hover:text-brand-green">
                    Effective Dashboards
                  </h3>
                  <p className="text-brand-gray text-sm">
                    Certification in effective dashboards and data visualization
                  </p>
                  <a
                    href="https://drive.google.com/uc?export=download&id=1A_Ucs1xsZNQkO_HDNWf0IB5dtp4K7qYi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-green text-sm hover:text-white transition-colors"
                  >
                    View Certificate
                  </a>
                </div>
                <div className="block py-8 gsap-fade-up group">
                  <h3 className="text-xl text-white mb-2 transition-colors group-hover:text-brand-green">
                    Advanced Financial Modeling
                  </h3>
                  <p className="text-brand-gray text-sm">
                    Specialized certification in advanced financial modeling and
                    analysis techniques.
                  </p>
                  <a
                    href="https://drive.google.com/uc?export=download&id=1tlS1kFFSe2nQ6blLUgMahW37ARYluzeI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-green text-sm hover:text-white transition-colors"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          data-section-name="contact"
          className="min-h-[50svh] lg:min-h-[60vh] flex flex-col p-8 lg:p-12 relative"
        >
          <div className="flex flex-col items-center justify-center gap-16 pt-8 w-full flex-grow">
            <nav className="w-full">
              <ul
                className="flex justify-center items-center gap-x-8 text-brand-gray gsap-fade-up"
                aria-label="Contact information"
              >
                {[
                  {
                    name: "Phone",
                    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                    url: "tel:+918947982161",
                  },
                  {
                    name: "Email",
                    icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
                    url: "mailto:khushivj07@gmail.com",
                  },
                  {
                    name: "LinkedIn",
                    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                    url: "https://www.linkedin.com/in/khushivijay",
                  },
                ].map((social) => (
                  <li key={social.name} className="text-xs shrink-0">
                    <a
                      className="block hover:text-white transition-colors hover-glow"
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${social.name} (opens in a new tab)`}
                      title={social.name}
                      data-cursor-view
                    >
                      <span className="sr-only">{social.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8"
                        aria-hidden="true"
                      >
                        <path d={social.icon} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="w-full text-center pb-4 mt-8">
            <p className="text-sm text-brand-gray">
              © {new Date().getFullYear()} CA Khushi Vijay. All Rights Reserved.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useSection } from "@context/section";
import useOnScreen from "@hooks/useOnScreen";
import useScrollActive from "@hooks/useScrollActive";

import satNaing from "@public/satnaing.webp";
import AboutBgSvg from "@components/AboutBgSvg";
import EduGroup from "@components/EduGroup";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);
  const [mounted, setMounted] = useState(false);

  // 在客户端挂载后设置 mounted 为 true
  useEffect(() => {
    setMounted(true);

    const q = gsap.utils.selector(sectionRef);
    gsap.registerPlugin(ScrollTrigger);

    // profile-picture
    gsap.fromTo(
      q(".profile-picture"),
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q(".profile-picture"),
          start: "20% bottom",
        },
      }
    );

    const fromAnimation = { y: 100, opacity: 0 };
    const toAnimation = (triggerTarget: string) => ({
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: q(`.${triggerTarget}`),
        start: "top bottom",
      },
    });

    // about-intro
    gsap.fromTo(q(".about-intro"), fromAnimation, toAnimation("about-intro"));
    // edu-bg
    gsap.fromTo(q(".edu-bg"), fromAnimation, toAnimation("edu-bg"));

    // bg svg parallax effect
    gsap.fromTo(
      q(".bg-svg"),
      { y: -80 },
      {
        scrollTrigger: { trigger: q(".bg-svg"), scrub: true },
        y: 65,
        duration: 3,
      }
    );

    // image bg svg parallax effect
    gsap.fromTo(
      q(".img-svg"),
      { y: -30 },
      {
        scrollTrigger: { trigger: q(".img-svg"), start: "80% 75%", scrub: true },
        y: 30,
      }
    );
  }, []);

  const { theme } = useTheme();
  const themeColor = mounted
    ? theme === "light"
      ? "rgb(0, 122, 122)"
      : "rgb(5 206 145)"
    : "";

  const eduRef = useRef<HTMLDivElement>(null);
  const aboutSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  return (
    <div ref={sectionRef} className="about-panel bg-white dark:bg-[#1B2731] relative">
      <section id="whoami" className="section">
        <div className="text-center">
          {mounted ? (
            <h2 
            className="section-heading" 
            style={{ 
              borderBottom: "2px solid var(--primary-color)",
              display: 'inline-block'
            }}
            >
            Who am I?
            </h2>
          ) : (
            <h2 className="section-heading">Who am I?</h2>
          )}
        </div>
        <div className="md:grid grid-rows-5 lg:grid-rows-6 grid-cols-5">
          <div className="col-start-1 col-end-3 row-start-1 row-end-4 lg:row-end-7 lg:col-start-1 lg:col-end-3 flex justify-center items-center py-4 lg:mb-[20%]">
            <div className="relative w-72">
              <svg
                width="96"
                height="21"
                viewBox="0 0 96 21"
                aria-hidden="true"
                className="img-svg hidden lg:block fill-marrsgreen dark:fill-carrigreen absolute -top-14 -left-14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M79.2202 0.959991L62.7802 17.32L46.3301 0.959991L29.8902 17.32L13.4501 0.959991L0.410156 13.94L0.400146 17.58L13.4501 4.58999L29.8902 20.95L46.3301 4.58999L62.7802 20.95L79.2202 4.58999L93.7302 19.02L95.5402 17.19L79.2202 0.959991Z" />
              </svg>

              <div className="profile-picture overflow-hidden md:overflow-visible rounded-md md:shadow-2xl">
                <Image
                  src={satNaing}
                  width={1700}
                  height={1790}
                  priority
                  alt="Felix profile picture"
                  className="rounded-md"
                />
              </div>

              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                aria-hidden="true"
                className="img-svg hidden lg:block fill-marrsgreen dark:fill-carrigreen absolute bottom-8 -right-12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.68 11.51L9.23 7.05998L13.68 2.61C14.24 2.05 14.24 1.12999 13.68 0.569994C13.12 0.00999391 12.2 0.00999391 11.64 0.569994L7.19002 5.02001L2.74001 0.569994C2.18001 0.00999391 1.26003 0.00999391 0.700029 0.569994C0.140029 1.12999 0.140029 2.05 0.700029 2.61L5.15004 7.05998L0.700029 11.51C0.140029 12.07 0.140029 12.99 0.700029 13.55C1.26003 14.11 2.18001 14.11 2.74001 13.55L7.19002 9.09999L11.64 13.55C12.2 14.11 13.12 14.11 13.68 13.55C14.24 12.99 14.24 12.08 13.68 11.51Z" />
              </svg>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="img-svg hidden lg:block fill-[#FF9D00] absolute -bottom-10 right-6 scale-150"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.6799 5.68002C11.6799 8.65002 9.27994 11.05 6.30994 11.05C3.33994 11.05 0.939941 8.65002 0.939941 5.68002C0.939941 2.71002 3.33994 0.309998 6.30994 0.309998C9.27994 0.309998 11.6799 2.71002 11.6799 5.68002Z" />
              </svg>
            </div>
          </div>

          <p className="col-start-1 col-end-3 row-start-4 row-end-6 lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-6 lg:ml-8 lg:mt-auto about-intro">
            With 4+ years of experience in embedded systems and AI, I have honed my skills in both low-level programming and intelligent systems 🛠️. In addition to my hands-on experience in automotive embedded development, my education in Artificial Intelligence and Communication Engineering has provided a solid foundation for my career 🚀.
          </p>

          <div
            className="col-start-3 col-end-6 row-start-1 row-end-6 lg:row-start-2 lg:row-end-7 md:ml-8 place-content-end"
            ref={eduRef}
          >
            <p className="edu-bg my-4">Here is my educational background.</p>
            {educationInfo.map((edu) => (
              <EduGroup edu={edu} key={edu.id} />
            ))}
          </div>
        </div>
      </section>

      <AboutBgSvg />
    </div>
  );
};

const educationInfo = [
  {
    id: 1,
    title: "Master of Artificial Intelligence",
    subTitle: "Monash University | 2024 ~ 2026",
    list: [
      "Studied Deep Learning, Machine Learning, Computer Vision, and Natural Language Processing",
      "Graduated with First Class Honours",
      "Got merit in 7 modules out of 9",
    ],
  },
  {
    id: 2,
    title: "HND in Computing & System Development",
    subTitle: "Info Myanmar University | 2016 - 2018",
    list: [
      "Studied modules specializing in software development",
      "Passed HND with overall Merit",
    ],
  },
  {
    id: 3,
    title: "PTE",
    subTitle: "British Council Myanmar | 2017",
    list: ["Got overall band score 6.5."],
  },
];

export default AboutSection;

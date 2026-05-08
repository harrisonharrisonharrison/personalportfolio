import React from "react";
import TerminalBox from "../Experience/TerminalBox";
import AboutSubSection from "./AboutSubsection";
import HoverSkill from "./HoverSkill";

const skillsData = [
  {
    main: "Frontend Development",
    sub: ["HTML", "CSS", "React", "Tailwind", "TypeScript", "JavaScript"],
  },
  {
    main: "Backend Development",
    sub: ["Node.js", "Express.js", "SQL"],
  },
  {
    main: "General Programming",
    sub: ["Python", "C++", "Java", "Git"],
  },
  {
    main: "UI/UX Design",
    sub: ["Figma", "Sketch", "Prototyping", "User Testing"],
  },
  {
    main: "Game Design",
    sub: ["Godot", "Storytelling", "Mechanics"],
  },
  {
    main: "Collaboration",
    sub: ["Agile", "Scrum", "Code Reviews", "Pair Programming"],
  },
  {
    main: "Laughing",
    sub: ["Lollygagging", "Teeheeing"],
  },
];

const hobbiesData = [
  "Guitar",
  "Thrifting",
  "Video Games",
  "Lifting",
  "Driving",
  "Music",
  "Instagram Reels",
];

export default function About({ isOverride }) {
  return (
    <TerminalBox className="w-full flex flex-col shrink-0 max-h-[50vh] md:max-h-full" isOverride={isOverride}>
      <div className="relative flex-1 min-h-0">
        <div className={`overflow-y-auto h-full pb-12 ${isOverride ? "custom-scrollbar-green" : "custom-scrollbar"}`}>
          <AboutSubSection title="ABOUT">
            <p className="mb-4 text-lg font-fraktion-sans">
              I'm a full stack developer at UCI, and this is my personal website/portfolio.
            </p>
            <p className="mb-4 text-lg font-fraktion-sans">
              In my free time, I like to lift, play video games, loredrop, play guitar, and listen to music. I like all genres of music, but my favorites are rnb, prog rock, and indie. 
            </p>
            <p className="last:mb-0 text-lg font-fraktion-sans">
              I really like meeting new people, so feel free to talk to me!
            </p>
          </AboutSubSection>

          <AboutSubSection title="SKILLS">
            <div className="flex flex-col gap-2">
              {skillsData.map((skill) => (
                <HoverSkill
                  key={skill.main}
                  mainSkill={skill.main}
                  subSkills={skill.sub}
                  isOverride={isOverride}
                />
              ))}
            </div>
          </AboutSubSection>

          <AboutSubSection title="HOBBIES">
            <div className="flex flex-col gap-2 font-fraktion-sans">
              {hobbiesData.map((hobby) => (
                <div
                  key={hobby}
                  className="flex items-center gap-2 group min-h-0"
                >
                  <span className="text-xs sm:text-base leading-none">
                    {"> "}
                    {hobby}
                  </span>
                </div>
              ))}
            </div>
          </AboutSubSection>
        </div>

        {!isOverride && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-black to-transparent pointer-events-none z-10" />
        )}
      </div>
    </TerminalBox>
  );
}
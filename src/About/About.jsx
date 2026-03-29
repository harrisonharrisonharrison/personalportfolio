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
    sub: ["Node.js", "Express.js", "MongoDB", "SQL", "Docker", "Nginx"],
  },
  {
    main: "General Programming",
    sub: ["Python", "C++", "Java", "Go", "Git"],
  },
  {
    main: "UI/UX Design",
    sub: ["Figma", "Sketch", "Prototyping", "User Testing"],
  },
  {
    main: "Game Design",
    sub: ["Unity", "Godot", "Storytelling", "Mechanics"],
  },
  {
    main: "Collaboration",
    sub: ["Agile", "Scrum", "Code Reviews", "Pair Programming"],
  },
  {
    main: "Laughing",
    sub: ["Lollygagginf", "Teeheeing"],
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

export default function About() {
  return (
    <TerminalBox className="w-full flex flex-col shrink-0 max-h-[50vh] md:max-h-full">
      <AboutSubSection title="ABOUT">
        <p className="mb-4 font-fraktion-sans">
          I'm a full stack developer at UCI catering a variety of projects to a
          variety of users. It's important that my projects develop my
          understanding of code, people, or even life in some way.
        </p>
        <p className="mb-4 font-fraktion-sans">
          I put an emphasis on collaboration to make the best work possible,
          whether that be through working together, teaching someone else, or
          being mentored.
        </p>
        <p className="last:mb-0 font-fraktion-sans">Feel free to reach out.</p>
      </AboutSubSection>

      <AboutSubSection title="SKILLS">
        <div className="flex flex-col gap-2">
          {skillsData.map((skill) => (
            <HoverSkill
              key={skill.main}
              mainSkill={skill.main}
              subSkills={skill.sub}
            />
          ))}
        </div>
      </AboutSubSection>

      <AboutSubSection title="HOBBIES">
        <div className="flex flex-col gap-2 font-fraktion-sans">
          {hobbiesData.map((hobby) => (
            <div key={hobby} className="flex items-center gap-2 group min-h-0">
              <span className="text-xs sm:text-base leading-none">
                {"> "}
                {hobby}
              </span>
            </div>
          ))}
        </div>
      </AboutSubSection>
    </TerminalBox>
  );
}

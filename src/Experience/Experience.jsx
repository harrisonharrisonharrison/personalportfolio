import React, { useState } from "react";
import TerminalBox from "./TerminalBox";
import DetailPane from "./DetailPane";
// TODO: split into separate files and import data from JSON, fix tags, add colors, fix highlight color, update pngs, fix square layout
const organizationsData = [
  {
    id: "ctc",
    name: "COMMIT THE CHANGE",
    site: "https://ctc-uci.com",
    type: "Present",
    picture: "/ctc.png",
    imageShape: "wide",
    tags: ["React", "ExpressJS", "AWS S3", "PostgreSQL", "Firebase"],
    abstract:
      "Commit the Change (CTC) is a collaborative development team that specializes in building software for nonprofit organizations.\n\nI am currently working on a management dashboard for Global Creation Foundation, a nonprofit focused on arts education in underserved communities that has reached 300+ students across 5 continents.\n\nI've integrated media uploads through AWS S3 buckets, created reusable ExpressJS routes, and much more through working with a 14 person Agile Scrum team. ",
  },
  {
    id: "fusion",
    name: "FUSION ICS PROJECT",
    site: "https://github.com/JasonNguyen067/PinoyPort",
    type: "Present",
    picture: "/fusion.png",
    imageShape: "square",
    tags: ["React", "Supabase"],
    abstract:
      "Commit the Change (CTC) is a collaborative development team that specializes in building software for nonprofit organizations.\n\nI am currently working on a management dashboard for Global Creation Foundation, a nonprofit focused on arts education in underserved communities that has reached 300+ students across 5 continents.\n\nI've integrated media uploads through AWS S3 buckets, created reusable ExpressJS routes, and much more through working with a 14 person Agile Scrum team. ",
  },
  {
    id: "zotbins",
    name: "ZotBins",
    site: "https://github.com/zotbins",
    type: "Present",
    picture: "/zotbins.png",
    imageShape: "vertical",
    tags: ["Supabase"],
    abstract:
      "Commit the Change (CTC) is a collaborative development team that specializes in building software for nonprofit organizations.\n\nI am currently working on a management dashboard for Global Creation Foundation, a nonprofit focused on arts education in underserved communities that has reached 300+ students across 5 continents.\n\nI've integrated media uploads through AWS S3 buckets, created reusable ExpressJS routes, and much more through working with a 14 person Agile Scrum team. ",
  },
  {
    id: "game",
    name: "Video Game Design",
    site: "https://vgdc-uci.framer.website/",
    type: "2026",
    picture: "/vgdc.png",
    imageShape: "square",
    tags: [],
    abstract:
      "Commit the Change (CTC) is a collaborative development team that specializes in building software for nonprofit organizations.\n\nI am currently working on a management dashboard for Global Creation Foundation, a nonprofit focused on arts education in underserved communities that has reached 300+ students across 5 continents.\n\nI've integrated media uploads through AWS S3 buckets, created reusable ExpressJS routes, and much more through working with a 14 person Agile Scrum team. ",
  },
  {
    id: "design",
    name: "Design @ UCI",
    site: "https://designatuci.com/",
    type: "2025",
    picture: "/dau.png",
    imageShape: "square",
    tags: [],
    abstract:
      "Commit the Change (CTC) is a collaborative development team that specializes in building software for nonprofit organizations.\n\nI am currently working on a management dashboard for Global Creation Foundation, a nonprofit focused on arts education in underserved communities that has reached 300+ students across 5 continents.\n\nI've integrated media uploads through AWS S3 buckets, created reusable ExpressJS routes, and much more through working with a 14 person Agile Scrum team. ",
  },
];

const projectsData = [
  {
    id: "lucifer",
    name: "LUCIFER'S COLOSSEUM",
    site: "https://checkmatechris1.itch.io/lucifers-colosseum",
    type: "GAME",
    picture: "/lc.png",
    imageShape: "wide",
    tags: ["GDScript", "Blender", "Audacity", "Godot"],
    abstract:
      "Lucifer's Colosseum is a round-based, rogue-like, and arena-based FPS game built in Godot. It was a submission to the UCI Winter 2026 Video Game Design Club Games.\n\nI participated in a 11 person team of programmers, 3D/2D artists, audio engineers, UI/UX designers, and game designers using the Kanban system.",
  },
  {
    id: "pcos",
    name: "PCOSPositive",
    site: "https://example.com",
    type: "web",
    picture: "/pcos.png",
    imageShape: "square",
    tags: ["Swift", "CoreData", "Figma"],
    abstract:
      "This is an example of a vertical image layout where the badges run down the middle column and the text sits on the far right. Notice how the grid completely morphs to accommodate the mobile aspect ratio!",
  },
  {
    id: "crosswalk",
    name: "CrossWalk",
    site: "https://example.com",
    type: "Mobile",
    picture: "/cw.png",
    imageShape: "vertical",
    tags: ["Figma"],
    abstract:
      "This is an example of a vertical image layout where the badges run down the middle column and the text sits on the far right. Notice how the grid completely morphs to accommodate the mobile aspect ratio!",
  },
  {
    id: "stamps",
    name: "fu-stamps",
    site: "https://example.com",
    type: "Web",
    picture: "/stamps.png",
    imageShape: "wide",
    tags: ["Swift", "CoreData", "Figma"],
    abstract:
      "This is an example of a vertical image layout where the badges run down the middle column and the text sits on the far right. Notice how the grid completely morphs to accommodate the mobile aspect ratio!",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    site: "",
    type: "?",
    picture: "/page.png",
    imageShape: "wide",
    tags: ["Tailwind", "React", "Figma"],
    abstract:
      "This is an example of a vertical image layout where the badges run down the middle column and the text sits on the far right. Notice how the grid completely morphs to accommodate the mobile aspect ratio!",
  },
];

function SplitSection({ titleLeft, titleRight, items }) {
  const [activeItem, setActiveItem] = useState(
    items && items.length > 0 ? items[0] : null
  );

  return (
    <div className="flex-1 flex gap-0 min-h-0">
      <TerminalBox
        borders={["top", "bottom", "left", "right"]}
        className="w-[30%] flex flex-col"
      >
        <h2 className="opacity-50 border-b-2 tracking-widest shrink-0 uppercase pb-2 mb-2">
          {titleLeft}
        </h2>
        <div className="overflow-y-auto flex-1 no-scrollbar min-h-0 pr-4">
          <div className="flex flex-col">
            {items?.map((item) => {
              const isActive = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-red-500/30 last:border-none py-1"
                >
                  <div
                    onMouseEnter={() => setActiveItem(item)}
                    className={`cursor-pointer transition-all duration-200 flex items-center justify-between py-1 uppercase 
                      ${
                        isActive
                          ? "text-white"
                          : "text-red-500 hover:text-red-400"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg leading-none ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        [
                      </span>
                      <span>{item.name}</span>
                      <span
                        className={`text-lg leading-none ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        ]
                      </span>
                    </div>

                    <span className="text-[10px] opacity-50 tracking-widest shrink-0">
                      {item.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TerminalBox>

      <TerminalBox
        borders={["top", "bottom", "right"]}
        className="w-[70%] flex flex-col"
      >
        <div className="flex justify-between items-center border-b-2 opacity-50 mb-4 tracking-widest shrink-0">
          <h2>{titleRight}</h2>
          {activeItem?.site && (
            <a
              href={activeItem.site}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer hover:text-white transition-colors shrink-0"
            >
              SITE ↗
            </a>
          )}
        </div>
        <div className="overflow-y-auto flex-1 no-scrollbar min-h-0">
          <DetailPane item={activeItem} />
        </div>
      </TerminalBox>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-black text-red-500 px-8 pt-20 pb-2 h-screen overflow-hidden flex flex-col gap-6 font-fraktion-mono text-xs sm:text-sm"
    >
      <TerminalBox
        padding="py-2"
        className="text-center text-xl font-bold font-fraktion-sans tracking-widest shrink-0"
      >
        YOU ARE VISITOR #103.
      </TerminalBox>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        <TerminalBox className="w-full md:w-[23%] flex flex-col shrink-0">
          <h2 className="opacity-50 mb-4 tracking-widest shrink-0">ABOUT</h2>
          <div className="overflow-y-auto flex-1 no-scrollbar space-y-4 min-h-0">
            <p>[ ABOUT ME TEXT ]</p>
            <p>[ SKILLS LIST ]</p>
            <p>[ HOBBIES LIST ]</p>
          </div>
        </TerminalBox>

        <div className="flex-1 flex flex-col gap-6 min-h-0">
          <SplitSection
            titleLeft="ORGANIZATIONS"
            titleRight="DETAIL"
            items={organizationsData}
          />

          <SplitSection
            titleLeft="PROJECTS"
            titleRight="DETAIL"
            items={projectsData}
          />
        </div>
      </div>

      <TerminalBox borders={["top"]} padding="py-4" className="mt-2 shrink-0">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="w-full md:w-[23%] flex shrink-0">
            <span className="text-green-500">CONTACT</span>
          </div>
          <div className="flex-1 flex gap-0">
            <div className="w-[40%]">
              <div className="grid grid-cols-2 gap-y-2">
                <span className="cursor-pointer hover:text-white transition-colors">
                  GITHUB
                </span>
                <span>HOME ADDRESS</span>
                <span className="cursor-pointer hover:text-white transition-colors">
                  LINKEDIN
                </span>
              </div>
            </div>
            <div className="w-[60%] flex flex-col items-center justify-center">
              <div className="flex flex-col gap-2">
                <span>P: +1 714.260.1097</span>
                <span>E: HARRISONTRAN357@GMAIL.COM</span>
              </div>
            </div>
          </div>
        </div>
      </TerminalBox>
    </section>
  );
}

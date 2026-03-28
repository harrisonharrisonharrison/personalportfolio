import React from "react";
import TerminalBox from "./TerminalBox";

export default function Header() {
  return (
    <TerminalBox
      padding="py-2"
      className="text-center text-xl font-bold font-fraktion-sans tracking-widest shrink-0"
    >
      YOU ARE VISITOR #103.
    </TerminalBox>
  );
}

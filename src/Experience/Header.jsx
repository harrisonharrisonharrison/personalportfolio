import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import TerminalBox from "./TerminalBox";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Header( { isOverride } ) {
  const [visitorCount, setVisitorCount] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    
    hasFetched.current = true; 

    async function trackVisit() {
      const { data, error } = await supabase.rpc("increment_visitor_count");
      
      if (error) {
        console.error("Failed to increment visitor count:", error);
      } else {
        setVisitorCount(data);
      }
    }

    trackVisit();
  }, []); 

  return (
    <TerminalBox
      padding="py-2"
      className="text-center text-xl font-bold font-fraktion-sans tracking-widest shrink-0"
      isOverride={isOverride}
    >
      YOU ARE VISITOR #{visitorCount === null ? "..." : visitorCount}.
    </TerminalBox>
  );
}
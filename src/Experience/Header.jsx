import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import TerminalBox from "./TerminalBox";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Header({ isOverride }) {
  const [visitorCount, setVisitorCount] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function trackVisit() {
      let locationData = null;

      try {
        const response = await fetch("https://ipapi.co/json/");
        locationData = await response.json();
      } catch (err) {
        console.error("Failed to fetch location data:", err);
      }

      const MY_IP = "1.1.1.1"; 
      if (locationData && locationData.ip === MY_IP) {
        return; 
      }

      const { data, error } = await supabase.rpc("increment_visitor_count");

      if (error) {
        console.error("Failed to increment visitor count:", error);
      } else {
        setVisitorCount(data);
      }

      if (!sessionStorage.getItem("hasVisited") && locationData) {
        const { error: insertError } = await supabase
          .from("site_visits")
          .insert([
            {
              city: locationData.city,
              region: locationData.region,
              country: locationData.country_name,
              referrer: document.referrer || "Direct Link",
              ip_address: locationData.ip,
            },
          ]);

        if (!insertError) {
          sessionStorage.setItem("hasVisited", "true");
        }
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

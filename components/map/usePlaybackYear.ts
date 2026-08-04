"use client";
import { useEffect, useState } from "react";
import { TIMELINE_END_YEAR, TIMELINE_START_YEAR } from "@/lib/historicalDates";

// Timeline playback: advances one campaign year per tick and stops at the end of
// the last era.
export function usePlaybackYear() {
  const [year, setYear] = useState(TIMELINE_START_YEAR);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1200);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setYear((current) => {
      if (current >= TIMELINE_END_YEAR) { setPlaying(false); return TIMELINE_END_YEAR; }
      return current + 1;
    }), speed);
    return () => window.clearInterval(timer);
  }, [playing, speed]);

  return { year, setYear, playing, setPlaying, speed, setSpeed };
}

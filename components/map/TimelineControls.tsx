"use client";

import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { formatHistoricalYear, WAR_END_YEAR, WAR_START_YEAR } from "@/lib/historicalDates";

interface Props {
  year: number;
  playing: boolean;
  speed: number;
  onYearChange: (year: number) => void;
  onPlayingChange: (playing: boolean) => void;
  onSpeedChange: (speed: number) => void;
}

const startLabel = String(Math.abs(WAR_START_YEAR));
const endLabel = formatHistoricalYear(WAR_END_YEAR);

export function TimelineControls({ year, playing, speed, onYearChange, onPlayingChange, onSpeedChange }: Props) {
  const atEnd = year === WAR_END_YEAR;

  return (
    <section className="timeline" aria-label="Campaign timeline">
      <div className="timeline-primary">
        <button className="icon-button" onClick={() => onYearChange(WAR_START_YEAR)} aria-label={`Return to ${formatHistoricalYear(WAR_START_YEAR)}`}><RotateCcw size={16} /></button>
        <button className="icon-button" onClick={() => onYearChange(Math.max(WAR_START_YEAR, year - 1))} aria-label="Previous year"><SkipBack size={17} /></button>
        <button className="play-button" onClick={() => onPlayingChange(!playing)} aria-label={playing ? "Pause timeline" : atEnd ? "Replay timeline" : "Play timeline"}>
          {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}<span>{playing ? "Pause" : atEnd ? "Replay" : "Play"}</span>
        </button>
        <button className="icon-button" onClick={() => onYearChange(Math.min(WAR_END_YEAR, year + 1))} aria-label="Next year"><SkipForward size={17} /></button>
        <div className="current-year" aria-live="polite"><span>Campaign year</span><strong>{formatHistoricalYear(year)}</strong></div>
      </div>
      <div className="slider-wrap">
        <span aria-hidden="true">{startLabel}</span>
        <input aria-label={`Selected year, from ${startLabel} to ${endLabel}`} type="range" min={WAR_START_YEAR} max={WAR_END_YEAR} step={1} value={year} onChange={(event) => onYearChange(Number(event.target.value))} style={{ "--timeline-progress": `${((year - WAR_START_YEAR) / (WAR_END_YEAR - WAR_START_YEAR)) * 100}%` } as React.CSSProperties} />
        <span aria-hidden="true">{endLabel}</span>
      </div>
      <div className="speed-control" aria-label="Playback speed"><span>Speed</span>{[2000, 1200, 650].map((value, index) => <button key={value} className={speed === value ? "active" : ""} onClick={() => onSpeedChange(value)} aria-pressed={speed === value}>{index === 0 ? "½×" : index === 1 ? "1×" : "2×"}</button>)}</div>
    </section>
  );
}

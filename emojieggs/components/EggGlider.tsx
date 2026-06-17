"use client";
import { useEffect, useRef, useState } from "react";
import { EggWithFace } from "./FaceEmoji";

const FACE_IDS = ["happy","wink","love","cool","laugh","surprised","nervous","smirk"];

export default function EggGlider() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);
  const [faceId, setFaceId] = useState("happy");

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % FACE_IDS.length;
      setFaceId(FACE_IDS[idx]);
    }, 2200);

    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const loop = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.1;
      current.current.y += (pos.current.y - current.current.y) * 0.1;
      if (ref.current) {
        ref.current.style.left = `${current.current.x - 28}px`;
        ref.current.style.top  = `${current.current.y - 35}px`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={ref} className="glider" style={{ left: -200, top: -200, opacity: 0.8 }}>
      <EggWithFace faceId={faceId} eggWidth={56} eggHeight={70} />
    </div>
  );
}

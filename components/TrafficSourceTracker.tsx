"use client";

import { useEffect } from "react";
import { captureTrafficSource } from "@/lib/trafficSource";

/** Mounted once in the root layout: notes ?from=tiktok / ?from=instagram on arrival. */
export default function TrafficSourceTracker() {
  useEffect(() => {
    captureTrafficSource();
  }, []);
  return null;
}

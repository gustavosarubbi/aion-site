"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem("aion:debug:web-vitals") !== "1") return;

    console.log("[web-vitals]", {
      name: metric.name,
      value: Number(metric.value.toFixed(2)),
      rating: metric.rating,
      navigationType: metric.navigationType,
    });
  });

  return null;
}

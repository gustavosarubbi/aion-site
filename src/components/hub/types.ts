"use client";

export interface Integration {
  name: string;
  desc: string;
  icon: string;
  accent: string;
}

export interface ConnectionPath {
  id: number;
  path: string;
  cx: number;
  cy: number;
  hx: number;
  hy: number;
}

export interface FlowPathData {
  pathD: string;
  thickness: number;
  opacity: number;
  speed: number;
  isThick: boolean;
  pIdx: number;
}

export interface Feature {
  title: string;
  desc: string;
  icon: string;
  color: string;
  bg: string;
}

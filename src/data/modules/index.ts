import { module1 } from "./module1";
import { module2 } from "./module2";
import { module3 } from "./module3";
import { module4 } from "./module4";
import { module5 } from "./module5";
import { module6 } from "./module6";
import { module7 } from "./module7";
import { module8 } from "./module8";
import { recoveryA } from "./recoveryA";
import { recoveryB } from "./recoveryB";
import type { Module } from "@/types/curriculum";

export const ALL_MODULES: Record<string, Module> = {
  "1": module1,
  "2": module2,
  "3": module3,
  "4": module4,
  "5": module5,
  "6": module6,
  "7": module7,
  "8": module8,
  "recovery-a": recoveryA,
  "recovery-b": recoveryB,
};

export const ORDERED_MODULES = ["1", "2", "3", "4", "recovery-a", "recovery-b", "5", "6", "7", "8"];

export function getModule(id: string): Module | undefined {
  return ALL_MODULES[id];
}

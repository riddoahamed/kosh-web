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
import { moduleZ2_1, moduleZ2_2, moduleZ2_3, moduleZ2_4, moduleZ2_5 } from "./zone2";
import { moduleZ3_1, moduleZ3_2, moduleZ3_3, moduleZ3_4, moduleZ3_5 } from "./zone3";
import { moduleZ4_1, moduleZ4_2, moduleZ4_3, moduleZ4_4, moduleZ4_5 } from "./zone4";
import { moduleZ5_1, moduleZ5_2, moduleZ5_3, moduleZ5_4, moduleZ5_5 } from "./zone5";
import type { Module } from "@/types/curriculum";

export const ALL_MODULES: Record<string, Module> = {
  // Zone 1 (original)
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
  // Zone 2
  "z2-1": moduleZ2_1,
  "z2-2": moduleZ2_2,
  "z2-3": moduleZ2_3,
  "z2-4": moduleZ2_4,
  "z2-5": moduleZ2_5,
  // Zone 3
  "z3-1": moduleZ3_1,
  "z3-2": moduleZ3_2,
  "z3-3": moduleZ3_3,
  "z3-4": moduleZ3_4,
  "z3-5": moduleZ3_5,
  // Zone 4
  "z4-1": moduleZ4_1,
  "z4-2": moduleZ4_2,
  "z4-3": moduleZ4_3,
  "z4-4": moduleZ4_4,
  "z4-5": moduleZ4_5,
  // Zone 5
  "z5-1": moduleZ5_1,
  "z5-2": moduleZ5_2,
  "z5-3": moduleZ5_3,
  "z5-4": moduleZ5_4,
  "z5-5": moduleZ5_5,
};

export const ORDERED_MODULES = ["1", "2", "3", "4", "recovery-a", "recovery-b", "5", "6", "7", "8"];

// Zone-ordered lists (first module in each zone is the entry point)
export const ZONE_MODULE_ORDER: Record<string, string[]> = {
  "zone-1": ["1", "2", "3", "4", "recovery-a", "recovery-b", "5", "6", "7", "8"],
  "zone-2": ["z2-1", "z2-2", "z2-3", "z2-4", "z2-5"],
  "zone-3": ["z3-1", "z3-2", "z3-3", "z3-4", "z3-5"],
  "zone-4": ["z4-1", "z4-2", "z4-3", "z4-4", "z4-5"],
  "zone-5": ["z5-1", "z5-2", "z5-3", "z5-4", "z5-5"],
};

export function getModule(id: string): Module | undefined {
  return ALL_MODULES[id];
}

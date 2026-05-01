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
import { moduleZ6_1, moduleZ6_2, moduleZ6_3, moduleZ6_4, moduleZ6_5 } from "./zone6";
import { moduleZ7_1, moduleZ7_2, moduleZ7_3, moduleZ7_4, moduleZ7_5 } from "./zone7";
import { moduleZ8_1, moduleZ8_2, moduleZ8_3, moduleZ8_4, moduleZ8_5 } from "./zone8";
import { moduleZ9_1, moduleZ9_2, moduleZ9_3, moduleZ9_4, moduleZ9_5 } from "./zone9";
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
  // Zone 6
  "z6-1": moduleZ6_1,
  "z6-2": moduleZ6_2,
  "z6-3": moduleZ6_3,
  "z6-4": moduleZ6_4,
  "z6-5": moduleZ6_5,
  // Zone 7
  "z7-1": moduleZ7_1,
  "z7-2": moduleZ7_2,
  "z7-3": moduleZ7_3,
  "z7-4": moduleZ7_4,
  "z7-5": moduleZ7_5,
  // Zone 8
  "z8-1": moduleZ8_1,
  "z8-2": moduleZ8_2,
  "z8-3": moduleZ8_3,
  "z8-4": moduleZ8_4,
  "z8-5": moduleZ8_5,
  // Zone 9
  "z9-1": moduleZ9_1,
  "z9-2": moduleZ9_2,
  "z9-3": moduleZ9_3,
  "z9-4": moduleZ9_4,
  "z9-5": moduleZ9_5,
};

export const ORDERED_MODULES = ["1", "2", "3", "4", "recovery-a", "recovery-b", "5", "6", "7", "8"];

// Zone-ordered lists (first module in each zone is the entry point)
export const ZONE_MODULE_ORDER: Record<string, string[]> = {
  "zone-1": ["1", "2", "3", "4", "recovery-a", "recovery-b", "5", "6", "7", "8"],
  "zone-2": ["z2-1", "z2-2", "z2-3", "z2-4", "z2-5"],
  "zone-3": ["z3-1", "z3-2", "z3-3", "z3-4", "z3-5"],
  "zone-4": ["z4-1", "z4-2", "z4-3", "z4-4", "z4-5"],
  "zone-5": ["z5-1", "z5-2", "z5-3", "z5-4", "z5-5"],
  "zone-6": ["z6-1", "z6-2", "z6-3", "z6-4", "z6-5"],
  "zone-7": ["z7-1", "z7-2", "z7-3", "z7-4", "z7-5"],
  "zone-8": ["z8-1", "z8-2", "z8-3", "z8-4", "z8-5"],
  "zone-9": ["z9-1", "z9-2", "z9-3", "z9-4", "z9-5"],
};

export function getModule(id: string): Module | undefined {
  return ALL_MODULES[id];
}

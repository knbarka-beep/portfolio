import type { Locale } from "@/lib/site";
import type { Content } from "./types";
import { en } from "./en";
import { da } from "./da";
import { no } from "./no";

const content: Record<Locale, Content> = { en, da, no };

export const getContent = (locale: Locale): Content => content[locale];

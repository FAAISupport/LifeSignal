export type BuilderTier = "starter" | "growth" | "pro" | "enterprise";

export type BuilderNeeds = {
  attendeeCount: number;
  hasCareTeam: boolean;
  needsIncidentTracking: boolean;
  needsAutomations: boolean;
};

export type BuilderPricing = {
  monthly: number;
  annual: number;
  tier: BuilderTier;
};

export type BuilderRecommendation = {
  key: string;
  reasoning: string;
  priority: "high" | "medium" | "low";
};

export type BuilderLocalSession = {
  sessionId: string;
  createdAt: string;
  source: "local" | "server";
  selectedModules: string[];
  needsAssessment: BuilderNeeds;
  pricing: BuilderPricing;
  recommendationSummary: string;
  recommendations: BuilderRecommendation[];
  proposalSummary: string;
};

export const BUILDER_STORAGE_KEY = "churchos_builder_last_session";

export function createLocalSessionId() {
  return `local-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export function saveBuilderSessionToStorage(session: BuilderLocalSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(session));
}

export function readBuilderSessionFromStorage(): BuilderLocalSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(BUILDER_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as BuilderLocalSession;
  } catch {
    return null;
  }
}


import { env } from "@/lib/env";

type OpenAIRecommendationResponse = {
  recommendedModules: Array<{
    key: string;
    reasoning: string;
    priority: "high" | "medium" | "low";
  }>;
  summary: string;
};

export async function requestRecommendationsFromOpenAI(input: {
  attendeeCount: number;
  hasCareTeam: boolean;
  needsIncidentTracking: boolean;
  needsAutomations: boolean;
  selectedModules: string[];
}): Promise<OpenAIRecommendationResponse> {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL ?? "gpt-4.1-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a ChurchOS implementation advisor. Output strict JSON with keys: recommendedModules (array of {key,reasoning,priority}) and summary. Use priorities: high|medium|low.",
        },
        {
          role: "user",
          content: JSON.stringify(input),
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${body}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string | null;
      };
    }>;
  };

  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response");
  }

  const parsed = JSON.parse(content) as OpenAIRecommendationResponse;
  if (!Array.isArray(parsed.recommendedModules) || typeof parsed.summary !== "string") {
    throw new Error("OpenAI returned invalid JSON shape");
  }

  return parsed;
}

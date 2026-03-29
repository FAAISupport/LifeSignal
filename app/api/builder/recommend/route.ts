import { NextResponse } from "next/server";
import { z } from "zod";

import { generateRecommendations } from "@/lib/recommendations";

const recommendationSchema = z.object({
  attendeeCount: z.number().int().min(0),
  hasCareTeam: z.boolean(),
  needsIncidentTracking: z.boolean(),
  needsAutomations: z.boolean(),
  selectedModules: z.array(z.string()).default([]),
});

export async function POST(request: Request) {
  try {
    const payload = recommendationSchema.parse(await request.json());
    const recommendations = await generateRecommendations(payload);

    return NextResponse.json(
      {
        ok: true,
        recommendedModules: recommendations.recommendedModules,
        summary: recommendations.summary,
        source: recommendations.source,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid request payload",
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to generate recommendations",
        recommendedModules: [],
        summary: "",
      },
      { status: 500 },
    );
  }
}

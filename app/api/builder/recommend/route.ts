import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAIRecommendations } from '@/lib/openai';
import { suggestTier } from '@/lib/pricing';

const schema = z.object({
  profile: z.object({ churchName: z.string().min(2), ministryFocus: z.string().min(2) }),
  pains: z.array(z.string()),
  selectedModules: z.array(z.string()),
});

export async function POST(req: Request) {
  try {
    const input = schema.parse(await req.json());
    const prompt = `You are a church operations architect. Return JSON with keys modules, rationale, confidenceNote. church=${input.profile.churchName}; focus=${input.profile.ministryFocus}; pains=${input.pains.join(',')}; selected=${input.selectedModules.join(',')}`;
    const raw = await getAIRecommendations(prompt);
    const parsed = JSON.parse(raw) as { modules?: string[]; rationale?: string[]; confidenceNote?: string };
    return NextResponse.json({
      recommendation: {
        modules: parsed.modules ?? input.selectedModules.slice(0, 8),
        rationale: parsed.rationale ?? ['Balanced for care coverage and staff capacity.'],
        suggestedTier: suggestTier(input.selectedModules.length),
        confidenceNote: parsed.confidenceNote ?? 'High confidence based on declared pain points and ministry focus.',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Recommendation failed' }, { status: 400 });
  }
}

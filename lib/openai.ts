import { env } from '@/lib/env';

export async function getAIRecommendations(prompt: string) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: prompt,
      text: { format: { type: 'json_object' } },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { output_text?: string };
  return data.output_text ?? '{}';
}

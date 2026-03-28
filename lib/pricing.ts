import type { ModuleCatalogItem } from '@/types/builder';

const categories = [
  'Care',
  'Safety',
  'Engagement',
  'Operations',
  'Intelligence',
  'Recovery',
  'Volunteer Coordination',
  'Communication',
  'Analytics',
] as const;

export const moduleCatalog: ModuleCatalogItem[] = Array.from({ length: 54 }, (_, i) => {
  const idx = i + 1;
  const category = categories[i % categories.length];
  return {
    key: `module_${idx.toString().padStart(2, '0')}`,
    label: `${category} Module ${idx}`,
    description: `Operational workflow ${idx} for ${category.toLowerCase()} outcomes and consistent follow-through.`,
    outcome: `Improves ${category.toLowerCase()} response speed and pastoral visibility for at-risk members.`,
    category,
    monthlyPrice: 19 + (i % 6) * 10,
    audienceFit: i % 2 === 0 ? 'Small-to-mid church teams' : 'Large ministry operations',
    implementationComplexity: i % 3 === 0 ? 'low' : i % 3 === 1 ? 'medium' : 'high',
  };
});

export function calculateMonthlyPrice(selectedModules: string[]) {
  const selected = moduleCatalog.filter((m) => selectedModules.includes(m.key));
  const subtotal = selected.reduce((sum, m) => sum + m.monthlyPrice, 0);
  const platformBase = 199;
  return {
    subtotal,
    platformBase,
    total: subtotal + platformBase,
  };
}

export function suggestTier(moduleCount: number): 'starter' | 'growth' | 'enterprise' {
  if (moduleCount <= 10) return 'starter';
  if (moduleCount <= 25) return 'growth';
  return 'enterprise';
}

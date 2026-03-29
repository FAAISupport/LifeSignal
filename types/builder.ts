export type AttendanceBand =
  | 'under_100'
  | '100_250'
  | '250_500'
  | '500_1000'
  | '1000_plus';

export type ModuleCategory =
  | 'Care'
  | 'Safety'
  | 'Engagement'
  | 'Operations'
  | 'Intelligence'
  | 'Recovery'
  | 'Volunteer Coordination'
  | 'Communication'
  | 'Analytics';

export interface BuilderChurchProfile {
  churchName: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  cityState: string;
  attendanceBand: AttendanceBand;
  ministryFocus: string;
}

export interface ModuleCatalogItem {
  key: string;
  label: string;
  description: string;
  outcome: string;
  category: ModuleCategory;
  monthlyPrice: number;
  audienceFit: string;
  implementationComplexity: 'low' | 'medium' | 'high';
}

export interface BuilderRecommendation {
  modules: string[];
  rationale: string[];
  suggestedTier: 'starter' | 'growth' | 'enterprise';
  confidenceNote: string;
}

export interface BuilderSessionPayload {
  profile: BuilderChurchProfile;
  pains: string[];
  selectedModules: string[];
  referralCode?: string;
}

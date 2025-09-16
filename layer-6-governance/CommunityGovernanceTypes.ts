/**
 * Community Governance Layer Types (Layer 4 ONLY)
 * CRITICAL: Contains ONLY governance decision types - NO storage, NO infrastructure
 */

export enum GovernanceDecisionType {
  CONTENT_APPROVAL = 'content_approval',
  CREATOR_SOVEREIGNTY = 'creator_sovereignty',
  COMMUNITY_CONSENT = 'community_consent',
  LIBERATION_VALIDATION = 'liberation_validation',
  ANTI_OPPRESSION_CHECK = 'anti_oppression_check',
  COMMUNITY_VOTE = 'community_vote',
  GOVERNANCE_RULE_UPDATE = 'governance_rule_update'
}

export enum LiberationPrincipleType {
  EMPOWERS_BLACK_QUEERNESS = 'empowers_black_queerness',
  ADVANCES_COMMUNITY_LIBERATION = 'advances_community_liberation',
  RESISTS_OPPRESSION_SYSTEMS = 'resists_oppression_systems',
  STRENGTHENS_COMMUNITY_POWER = 'strengthens_community_power',
  SUPPORTS_MUTUAL_AID = 'supports_mutual_aid'
}

export enum VotingRuleType {
  SIMPLE_MAJORITY = 'simple_majority',
  SUPERMAJORITY = 'supermajority',
  CONSENSUS = 'consensus',
  LIBERATION_WEIGHTED = 'liberation_weighted'
}

export enum OppressionType {
  RACIST = 'racist',
  HOMOPHOBIC = 'homophobic',
  TRANSPHOBIC = 'transphobic',
  CLASSIST = 'classist',
  SEXIST = 'sexist',
  ABLEIST = 'ableist',
  EXPLOITATION = 'exploitation'
}

// ===== GOVERNANCE REQUEST TYPES =====

export interface GovernanceRequest {
  requestId: string;
  requestType: GovernanceDecisionType;
  operation: PlatformOperation;
  creatorAction?: CreatorAction;
  data?: CommunityData;
  content?: ContentItem;
  requesterId: string;
  timestamp: Date;
}

export interface PlatformOperation {
  operationId: string;
  type: string;
  description: string;
  impact: {
    community: string[];
    creators: string[];
    economic: EconomicImpact;
    liberation: LiberationImpact;
  };
  requiredPermissions: string[];
}

export interface CreatorAction {
  actionId: string;
  creatorId: string;
  actionType: string;
  contentImpact: ContentImpact;
  economicImpact: EconomicImpact;
  narrativeControl: NarrativeControl;
  consentStatus: ConsentStatus;
}

export interface CommunityData {
  dataId: string;
  dataType: string;
  sensitivity: 'public' | 'community' | 'private';
  creatorIds: string[];
  communityIds: string[];
  consentRequired: boolean;
}

export interface ContentItem {
  contentId: string;
  type: string;
  text?: string;
  media?: string[];
  tags: string[];
  creatorId: string;
  communityContext: string[];
}

// ===== GOVERNANCE DECISION TYPES =====

export interface GovernanceDecision {
  decisionId: string;
  approved: boolean;
  timestamp: Date;
  decisionType: GovernanceDecisionType;
  liberationPrinciples: LiberationValidation;
  creatorSovereignty: SovereigntyDecision;
  communityConsent: ConsentValidation;
  antiOppression: OppressionCheck;
  reasons: DecisionReason[];
  requiredActions?: string[];
  appealable: boolean;
  appealDeadline?: Date;
}

export interface LiberationValidation {
  valid: boolean;
  score: number;
  principles: Record<LiberationPrincipleType, number>;
  feedback: string[];
  recommendations: string[];
  liberationThreshold: number;
  passedPrinciples: LiberationPrincipleType[];
  failedPrinciples: LiberationPrincipleType[];
}

export interface SovereigntyDecision {
  approved: boolean;
  revenueShareCompliant: boolean;
  narrativeControlMaintained: boolean;
  creatorConsentObtained: boolean;
  minimumRevenueShare: number;
  actualRevenueShare?: number;
  narrativeControlScore: number;
  consentScore: number;
  requiredActions: string[];
}

export interface ConsentValidation {
  approved: boolean;
  consentType: 'explicit' | 'implied' | 'community_standard';
  consentLevel: number;
  requiredConsent: string[];
  obtainedConsent: string[];
  missingConsent: string[];
  consentExpiryDate?: Date;
}

export interface OppressionCheck {
  safe: boolean;
  detectedOppression: OppressionType[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  recommendations: string[];
  automaticRejection: boolean;
}

export interface DecisionReason {
  type: 'approval' | 'rejection' | 'conditional';
  principle: string;
  explanation: string;
  evidence: string[];
  weight: number;
}

// ===== COMMUNITY VOTING TYPES =====

export interface CommunityProposal {
  proposalId: string;
  title: string;
  description: string;
  proposalType: 'governance_rule' | 'platform_change' | 'creator_dispute' | 'liberation_standard';
  proposerId: string;
  liberationImpact: LiberationImpact;
  requiredVoteType: VotingRuleType;
  deadline: Date;
  attachments?: string[];
}

export interface VoteResult {
  approved: boolean;
  votingRules: VotingRules;
  requiredQuorum: number;
  passingThreshold: number;
  proposalValidation: ProposalValidation;
  voteEligibility: VoteEligibility;
  reason?: string;
}

export interface VotingRules {
  ruleType: VotingRuleType;
  quorumPercentage: number;
  passingThreshold: number;
  votingPeriodDays: number;
  eligibilityRequirements: string[];
  liberationWeighting: boolean;
}

export interface ProposalValidation {
  valid: boolean;
  liberationCompliant: boolean;
  communityBeneficial: boolean;
  democraticProcess: boolean;
  validationErrors: string[];
  requiredImprovements: string[];
}

export interface VoteEligibility {
  eligibleVoters: string[];
  ineligibleVoters: string[];
  eligibilityRequirements: string[];
  specialVotingRights: Record<string, string[]>;
}

// ===== IMPACT ASSESSMENT TYPES =====

export interface EconomicImpact {
  creatorRevenueShare: number;
  communityRevenueShare: number;
  platformCosts: number;
  mutualAidContribution: number;
  liberationInvestment: number;
}

export interface LiberationImpact {
  blackQueerEmpowerment: number;
  communityLiberation: number;
  oppressionResistance: number;
  communityPowerBuilding: number;
  mutualAidSupport: number;
  overallLiberationScore: number;
}

export interface ContentImpact {
  narrativeControl: number;
  culturalSignificance: number;
  communityResonance: number;
  liberationMessaging: number;
}

export interface NarrativeControl {
  creatorOwnership: boolean;
  editingRights: string[];
  distributionControl: boolean;
  contextualFraming: string;
  culturalAuthenticity: number;
}

export interface ConsentStatus {
  explicit: boolean;
  informed: boolean;
  ongoing: boolean;
  withdrawable: boolean;
  consentDate: Date;
  consentScope: string[];
}

// ===== GOVERNANCE RULE TYPES =====

export interface GovernanceRules {
  ruleId: string;
  version: string;
  effectiveDate: Date;
  liberationPrinciples: LiberationPrincipleRule[];
  votingRules: VotingRules[];
  sovereigntyRules: SovereigntyRule[];
  consentRules: ConsentRule[];
  antiOppressionRules: OppressionRule[];
  lastUpdated: Date;
  updateReason: string;
}

export interface LiberationPrincipleRule {
  principle: LiberationPrincipleType;
  minimumScore: number;
  weight: number;
  required: boolean;
  assessmentCriteria: string[];
}

export interface SovereigntyRule {
  minimumRevenueShare: number;
  narrativeControlThreshold: number;
  consentRequirements: string[];
  exemptions: string[];
}

export interface ConsentRule {
  dataTypes: string[];
  consentType: 'explicit' | 'implied' | 'community_standard';
  renewalPeriod: number;
  withdrawalProcess: string[];
}

export interface OppressionRule {
  oppressionType: OppressionType;
  detectionThreshold: number;
  automaticAction: 'reject' | 'review' | 'community_vote';
  appealable: boolean;
}

// ===== ASSEMBLY GOVERNANCE TYPES =====

export interface CommunityAssemblyDecision {
  assemblyId: string;
  decisionType: GovernanceDecisionType;
  participationRate: number;
  democraticProcess: boolean;
  liberationAligned: boolean;
  consensusLevel: number;
  dissent: DissentRecord[];
  implementationRequirements: string[];
}

export interface DissentRecord {
  voterType: string;
  dissentReason: string;
  liberationConcern: boolean;
  alternativeProposal?: string;
}

// ===== ERROR AND VALIDATION TYPES =====

export interface GovernanceValidationError {
  errorCode: string;
  errorType: 'liberation_violation' | 'sovereignty_violation' | 'consent_violation' | 'oppression_detected' | 'process_violation';
  severity: 'warning' | 'error' | 'critical';
  message: string;
  suggestedFix: string[];
  blocksApproval: boolean;
}

export interface RuleUpdateResult {
  success: boolean;
  newRuleVersion: string;
  changesApplied: string[];
  validationErrors: GovernanceValidationError[];
  communityNotificationRequired: boolean;
  effectiveDate: Date;
}
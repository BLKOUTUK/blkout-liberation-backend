/**
 * Community Governance Interface (Layer 4 ONLY)
 * CRITICAL: Defines ONLY governance decision interfaces - NO storage, NO infrastructure
 * 
 * Layer Separation Contract:
 * - Layer 4: Makes governance decisions (THIS INTERFACE)
 * - Layer 5: Stores governance decisions and data
 * - Layer 6: Provides infrastructure for voting systems
 * - Layer 3: Implements business logic based on governance decisions
 */

import {
  GovernanceRequest,
  GovernanceDecision,
  CommunityProposal,
  VoteResult,
  PlatformOperation,
  LiberationValidation,
  CreatorAction,
  SovereigntyDecision,
  CommunityData,
  ConsentValidation,
  ContentItem,
  OppressionCheck,
  GovernanceRules,
  RuleUpdateResult,
  CommunityAssemblyDecision,
  GovernanceValidationError
} from './CommunityGovernanceTypes';

/**
 * Primary Community Governance Service Interface
 * RESPONSIBILITY: Makes governance decisions ONLY - delegates implementation to other layers
 */
export interface CommunityGovernanceService {
  // ===== CORE GOVERNANCE DECISIONS =====
  
  /**
   * Makes a comprehensive governance decision
   * NOTE: Does NOT store the decision - Layer 5 handles storage
   * NOTE: Does NOT implement the decision - Layer 3 handles implementation
   */
  makeGovernanceDecision(request: GovernanceRequest): Promise<GovernanceDecision>;
  
  /**
   * Validates liberation principles for any platform operation
   * RETURNS: Decision on whether operation aligns with liberation principles
   */
  validateLiberationPrinciples(operation: PlatformOperation): Promise<LiberationValidation>;
  
  /**
   * Assesses creator sovereignty compliance
   * RETURNS: Decision on creator sovereignty requirements
   */
  assessCreatorSovereignty(action: CreatorAction): Promise<SovereigntyDecision>;
  
  /**
   * Validates community consent requirements
   * RETURNS: Decision on consent compliance
   */
  validateCommunityConsent(data: CommunityData): Promise<ConsentValidation>;
  
  /**
   * Conducts community vote process
   * NOTE: Returns voting decision - Layer 5 stores actual votes
   */
  conductCommunityVote(proposal: CommunityProposal): Promise<VoteResult>;
  
  // ===== ANTI-OPPRESSION PROTECTION =====
  
  /**
   * Checks content for oppressive elements
   * RETURNS: Decision on content safety
   */
  checkAntiOppression(content: ContentItem): Promise<OppressionCheck>;
  
  /**
   * Validates content meets liberation standards
   * RETURNS: Liberation compliance decision
   */
  validateContentLiberation(content: ContentItem): Promise<LiberationValidation>;
  
  // ===== GOVERNANCE RULE MANAGEMENT =====
  
  /**
   * Updates governance rules through democratic process
   * NOTE: Returns rule update decision - Layer 5 stores new rules
   */
  updateGovernanceRules(newRules: GovernanceRules): Promise<RuleUpdateResult>;
  
  /**
   * Gets current governance rules
   * NOTE: Delegates to Layer 5 for actual rule storage/retrieval
   */
  getGovernanceRules(): Promise<GovernanceRules>;
  
  /**
   * Validates proposed rule changes meet liberation criteria
   */
  validateRuleChange(currentRules: GovernanceRules, proposedRules: GovernanceRules): Promise<GovernanceValidationError[]>;
  
  // ===== DECISION VALIDATION =====
  
  /**
   * Validates a governance decision meets all criteria
   */
  validateGovernanceDecision(decision: GovernanceDecision): Promise<GovernanceValidationError[]>;
  
  /**
   * Gets decision appeal eligibility
   */
  assessDecisionAppealability(decision: GovernanceDecision): Promise<boolean>;
}

/**
 * Community Assembly Governance Interface
 * RESPONSIBILITY: Democratic voting and assembly decision logic ONLY
 */
export interface CommunityAssemblyGovernance {
  /**
   * Conducts community assembly vote
   * NOTE: Returns voting process decision - does NOT store votes
   */
  conductCommunityVote(proposal: CommunityProposal): Promise<VoteResult>;
  
  /**
   * Validates proposal meets democratic and liberation criteria
   */
  validateProposal(proposal: CommunityProposal): Promise<{
    valid: boolean;
    liberationCompliant: boolean;
    democraticProcess: boolean;
    errors: string[];
  }>;
  
  /**
   * Gets voting rules for proposal type
   */
  getVotingRules(): Promise<import('./CommunityGovernanceTypes').VotingRules>;
  
  /**
   * Determines vote eligibility
   * NOTE: Returns eligibility decision - Layer 5 manages voter records
   */
  determineVoteEligibility(proposal: CommunityProposal): Promise<import('./CommunityGovernanceTypes').VoteEligibility>;
  
  /**
   * Makes assembly-level governance decision
   */
  makeAssemblyDecision(proposal: CommunityProposal): Promise<CommunityAssemblyDecision>;
}

/**
 * Liberation Principles Validation Interface
 * RESPONSIBILITY: Liberation principle assessment ONLY - no enforcement
 */
export interface LiberationPrinciplesValidator {
  /**
   * Validates liberation principles for any operation
   */
  validateLiberationPrinciples(operation: PlatformOperation): Promise<LiberationValidation>;
  
  /**
   * Assesses Black queer empowerment impact
   */
  assessBlackQueerEmpowerment(operation: PlatformOperation): Promise<number>;
  
  /**
   * Assesses community liberation advancement
   */
  assessCommunityLiberation(operation: PlatformOperation): Promise<number>;
  
  /**
   * Assesses oppression system resistance
   */
  assessOppressionResistance(operation: PlatformOperation): Promise<number>;
  
  /**
   * Assesses community power building
   */
  assessCommunityPowerBuilding(operation: PlatformOperation): Promise<number>;
  
  /**
   * Assesses mutual aid support
   */
  assessMutualAidSupport(operation: PlatformOperation): Promise<number>;
  
  /**
   * Generates liberation feedback
   */
  generateLiberationFeedback(principles: Record<string, number>): string[];
  
  /**
   * Generates improvement recommendations
   */
  generateImprovementRecommendations(principles: Record<string, number>): string[];
}

/**
 * Creator Sovereignty Decision Engine Interface
 * RESPONSIBILITY: Creator sovereignty assessment ONLY - no economic implementation
 */
export interface CreatorSovereigntyDecisionEngine {
  /**
   * Assesses creator sovereignty for any action
   */
  assessCreatorSovereignty(action: CreatorAction): Promise<SovereigntyDecision>;
  
  /**
   * Validates revenue share meets 75% minimum
   * NOTE: Makes decision only - Layer 3 implements payment logic
   */
  validateRevenueShare(economicImpact: import('./CommunityGovernanceTypes').EconomicImpact): Promise<{
    approved: boolean;
    currentShare: number;
    requiredShare: number;
    recommendations: string[];
  }>;
  
  /**
   * Validates creator narrative control
   * NOTE: Makes decision only - Layer 3 implements content control
   */
  validateNarrativeControl(contentImpact: import('./CommunityGovernanceTypes').ContentImpact): Promise<{
    approved: boolean;
    controlLevel: number;
    requiredLevel: number;
    recommendations: string[];
  }>;
  
  /**
   * Validates creator consent
   */
  validateCreatorConsent(creatorId: string, action: CreatorAction): Promise<{
    approved: boolean;
    consentLevel: number;
    consentType: string;
    missingConsent: string[];
  }>;
  
  /**
   * Compiles required actions for sovereignty compliance
   */
  compileRequiredActions(decisions: Array<{ approved: boolean; recommendations: string[] }>): string[];
}

/**
 * Interface for Layer Integration
 * RESPONSIBILITY: Defines how other layers interact with governance decisions
 */
export interface LayerIntegrationContract {
  // What Layer 4 provides TO other layers
  governance: CommunityGovernanceService;
  assembly: CommunityAssemblyGovernance;
  liberation: LiberationPrinciplesValidator;
  sovereignty: CreatorSovereigntyDecisionEngine;
  
  // What Layer 4 expects FROM other layers
  expectedDataLayer: {
    storeGovernanceDecision(decision: GovernanceDecision): Promise<void>;
    retrieveGovernanceRules(): Promise<GovernanceRules>;
    storeVoteResult(result: VoteResult): Promise<void>;
  };
  
  expectedInfrastructureLayer: {
    provideVotingInfrastructure(): Promise<void>;
    provideDecisionNotifications(): Promise<void>;
  };
  
  expectedBusinessLogicLayer: {
    implementGovernanceDecision(decision: GovernanceDecision): Promise<void>;
    enforceCreatorSovereignty(decision: SovereigntyDecision): Promise<void>;
  };
}

/**
 * Governance Decision Factory Interface
 * RESPONSIBILITY: Creates governance decisions based on layer-specific logic
 */
export interface GovernanceDecisionFactory {
  createGovernanceDecision(
    liberationValidation: LiberationValidation,
    sovereigntyDecision: SovereigntyDecision,
    consentValidation: ConsentValidation,
    oppressionCheck: OppressionCheck
  ): GovernanceDecision;
  
  generateDecisionId(): string;
  compileDecisionReasons(validations: Array<any>): import('./CommunityGovernanceTypes').DecisionReason[];
}
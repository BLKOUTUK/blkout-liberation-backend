/**
 * Community Governance Service (Layer 4 ONLY)
 * CRITICAL: Contains ONLY governance decision logic - NO storage, NO infrastructure
 * 
 * LAYER SEPARATION COMPLIANCE:
 * ✅ Makes governance decisions ONLY
 * ❌ NO data storage operations (delegates to Layer 5)
 * ❌ NO infrastructure concerns (delegates to Layer 6)
 * ❌ NO business logic implementation (delegates to Layer 3)
 */

import {
  CommunityGovernanceService as ICommunityGovernanceService,
  GovernanceDecisionFactory,
  LiberationPrinciplesValidator,
  CreatorSovereigntyDecisionEngine
} from './CommunityGovernanceInterface';
import {
  GovernanceRequest,
  GovernanceDecision,
  GovernanceDecisionType,
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
  DecisionReason,
  GovernanceValidationError,
  LiberationPrincipleType,
  OppressionType
} from './CommunityGovernanceTypes';

/**
 * Core Community Governance Service
 * RESPONSIBILITY: Makes liberation-focused governance decisions ONLY
 */
export class CommunityGovernanceService implements ICommunityGovernanceService {
  private liberationValidator: LiberationPrinciplesValidator;
  private sovereigntyEngine: CreatorSovereigntyDecisionEngine;
  private decisionFactory: GovernanceDecisionFactory;
  
  constructor(
    liberationValidator: LiberationPrinciplesValidator,
    sovereigntyEngine: CreatorSovereigntyDecisionEngine,
    decisionFactory: GovernanceDecisionFactory
  ) {
    this.liberationValidator = liberationValidator;
    this.sovereigntyEngine = sovereigntyEngine;
    this.decisionFactory = decisionFactory;
  }

  /**
   * Makes comprehensive governance decision
   * LAYER 4 ONLY: Decision-making logic - delegates storage to Layer 5
   */
  async makeGovernanceDecision(request: GovernanceRequest): Promise<GovernanceDecision> {
    // 1. Validate liberation principles (DECISION ONLY)
    const liberationValidation = await this.validateLiberationPrinciples(request.operation);
    
    // 2. Assess creator sovereignty (DECISION ONLY)
    const sovereigntyDecision = request.creatorAction 
      ? await this.assessCreatorSovereignty(request.creatorAction)
      : this.createDefaultSovereigntyDecision();
    
    // 3. Check community consent requirements (DECISION ONLY)
    const consentValidation = request.data 
      ? await this.validateCommunityConsent(request.data)
      : this.createDefaultConsentValidation();
    
    // 4. Apply anti-oppression protection (DECISION ONLY)
    const oppressionCheck = request.content 
      ? await this.checkAntiOppression(request.content)
      : this.createDefaultOppressionCheck();
    
    // 5. Create governance decision (NO STORAGE - Layer 5's responsibility)
    const decision = this.decisionFactory.createGovernanceDecision(
      liberationValidation,
      sovereigntyDecision,
      consentValidation,
      oppressionCheck
    );

    // 6. Final decision logic based on all validations
    decision.approved = this.calculateFinalApproval(
      liberationValidation,
      sovereigntyDecision,
      consentValidation,
      oppressionCheck
    );

    decision.reasons = this.decisionFactory.compileDecisionReasons([
      liberationValidation,
      sovereigntyDecision,
      consentValidation,
      oppressionCheck
    ]);

    return decision;
  }

  /**
   * Validates liberation principles for platform operation
   * DECISION ONLY - no implementation or enforcement
   */
  async validateLiberationPrinciples(operation: PlatformOperation): Promise<LiberationValidation> {
    return await this.liberationValidator.validateLiberationPrinciples(operation);
  }

  /**
   * Assesses creator sovereignty compliance
   * DECISION ONLY - no economic implementation
   */
  async assessCreatorSovereignty(action: CreatorAction): Promise<SovereigntyDecision> {
    return await this.sovereigntyEngine.assessCreatorSovereignty(action);
  }

  /**
   * Validates community consent requirements
   * DECISION ONLY - no consent enforcement
   */
  async validateCommunityConsent(data: CommunityData): Promise<ConsentValidation> {
    const requiredConsent = this.determineRequiredConsent(data);
    const obtainedConsent = this.assessObtainedConsent(data);
    const missingConsent = requiredConsent.filter(consent => !obtainedConsent.includes(consent));

    const consentLevel = obtainedConsent.length / requiredConsent.length;
    const approved = consentLevel >= 0.8 && missingConsent.length === 0; // 80% consent threshold

    return {
      approved,
      consentType: data.sensitivity === 'private' ? 'explicit' : 'community_standard',
      consentLevel,
      requiredConsent,
      obtainedConsent,
      missingConsent,
      consentExpiryDate: this.calculateConsentExpiry(data)
    };
  }

  /**
   * Conducts community vote process
   * DECISION ONLY - Layer 5 stores actual votes, Layer 6 provides voting infrastructure
   */
  async conductCommunityVote(proposal: CommunityProposal): Promise<VoteResult> {
    // Import CommunityAssemblyGovernance to handle voting logic
    const { CommunityAssemblyGovernance } = await import('./CommunityAssemblyGovernance');
    const assemblyGovernance = new CommunityAssemblyGovernance();
    
    return await assemblyGovernance.conductCommunityVote(proposal);
  }

  /**
   * Checks content for oppressive elements
   * DECISION ONLY - no content moderation implementation
   */
  async checkAntiOppression(content: ContentItem): Promise<OppressionCheck> {
    const detectedOppression = await this.detectOppressionTypes(content);
    const severity = this.calculateOppressionSeverity(detectedOppression);
    const confidence = this.calculateDetectionConfidence(content, detectedOppression);

    const safe = detectedOppression.length === 0 || (severity === 'low' && confidence < 0.7);
    const automaticRejection = severity === 'critical' || (severity === 'high' && confidence > 0.8);

    return {
      safe,
      detectedOppression,
      severity,
      confidence,
      recommendations: this.generateOppressionRecommendations(detectedOppression, severity),
      automaticRejection
    };
  }

  /**
   * Updates governance rules through democratic process
   * DECISION ONLY - Layer 5 stores new rules
   */
  async updateGovernanceRules(newRules: GovernanceRules): Promise<RuleUpdateResult> {
    // Get current rules (delegate to Layer 5)
    const currentRules = await this.getGovernanceRules();
    
    // Validate rule changes
    const validationErrors = await this.validateRuleChange(currentRules, newRules);
    
    if (validationErrors.length > 0) {
      return {
        success: false,
        newRuleVersion: currentRules.version,
        changesApplied: [],
        validationErrors,
        communityNotificationRequired: false,
        effectiveDate: new Date()
      };
    }

    // Determine changes applied
    const changesApplied = this.determineRuleChanges(currentRules, newRules);
    
    return {
      success: true,
      newRuleVersion: this.generateNewRuleVersion(currentRules.version),
      changesApplied,
      validationErrors: [],
      communityNotificationRequired: true,
      effectiveDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    };
  }

  /**
   * Gets current governance rules
   * DELEGATES to Layer 5 for storage retrieval
   */
  async getGovernanceRules(): Promise<GovernanceRules> {
    // This method delegates to Layer 5 - actual implementation would inject data layer
    throw new Error('getGovernanceRules must be implemented by injecting Layer 5 data service');
  }

  /**
   * Validates proposed rule changes meet liberation criteria
   */
  async validateRuleChange(currentRules: GovernanceRules, proposedRules: GovernanceRules): Promise<GovernanceValidationError[]> {
    const errors: GovernanceValidationError[] = [];

    // Validate liberation principles are not weakened
    for (const principle of proposedRules.liberationPrinciples) {
      const currentPrinciple = currentRules.liberationPrinciples.find(p => p.principle === principle.principle);
      if (currentPrinciple && principle.minimumScore < currentPrinciple.minimumScore) {
        errors.push({
          errorCode: 'LIBERATION_WEAKENED',
          errorType: 'liberation_violation',
          severity: 'critical',
          message: `Liberation principle ${principle.principle} score lowered from ${currentPrinciple.minimumScore} to ${principle.minimumScore}`,
          suggestedFix: ['Maintain or increase liberation principle scores', 'Provide community justification for changes'],
          blocksApproval: true
        });
      }
    }

    // Validate creator sovereignty is not reduced
    if (proposedRules.sovereigntyRules.length > 0 && currentRules.sovereigntyRules.length > 0) {
      const currentMinRevenue = currentRules.sovereigntyRules[0].minimumRevenueShare;
      const proposedMinRevenue = proposedRules.sovereigntyRules[0].minimumRevenueShare;
      
      if (proposedMinRevenue < currentMinRevenue) {
        errors.push({
          errorCode: 'SOVEREIGNTY_REDUCED',
          errorType: 'sovereignty_violation',
          severity: 'critical',
          message: `Creator revenue share reduced from ${currentMinRevenue} to ${proposedMinRevenue}`,
          suggestedFix: ['Maintain minimum 75% creator revenue share', 'Justify any reductions through community vote'],
          blocksApproval: true
        });
      }
    }

    return errors;
  }

  /**
   * Validates governance decision meets all criteria
   */
  async validateGovernanceDecision(decision: GovernanceDecision): Promise<GovernanceValidationError[]> {
    const errors: GovernanceValidationError[] = [];

    // Validate liberation compliance
    if (decision.liberationPrinciples.score < 0.7) {
      errors.push({
        errorCode: 'LOW_LIBERATION_SCORE',
        errorType: 'liberation_violation',
        severity: 'error',
        message: `Liberation score ${decision.liberationPrinciples.score} below required 0.7`,
        suggestedFix: ['Improve liberation alignment', 'Provide community justification'],
        blocksApproval: true
      });
    }

    // Validate creator sovereignty
    if (!decision.creatorSovereignty.approved) {
      errors.push({
        errorCode: 'SOVEREIGNTY_VIOLATION',
        errorType: 'sovereignty_violation',
        severity: 'error',
        message: 'Creator sovereignty requirements not met',
        suggestedFix: decision.creatorSovereignty.requiredActions,
        blocksApproval: true
      });
    }

    return errors;
  }

  /**
   * Assesses decision appeal eligibility
   */
  async assessDecisionAppealability(decision: GovernanceDecision): Promise<boolean> {
    // Decisions are appealable if:
    // 1. They were rejected
    // 2. Liberation score was borderline (0.6-0.7)
    // 3. No critical oppression was detected
    return !decision.approved && 
           decision.liberationPrinciples.score >= 0.6 && 
           !decision.antiOppression.automaticRejection;
  }

  // ===== PRIVATE HELPER METHODS =====

  private calculateFinalApproval(
    liberation: LiberationValidation,
    sovereignty: SovereigntyDecision,
    consent: ConsentValidation,
    oppression: OppressionCheck
  ): boolean {
    return liberation.valid && 
           sovereignty.approved && 
           consent.approved && 
           oppression.safe;
  }

  private createDefaultSovereigntyDecision(): SovereigntyDecision {
    return {
      approved: true,
      revenueShareCompliant: true,
      narrativeControlMaintained: true,
      creatorConsentObtained: true,
      minimumRevenueShare: 0.75,
      narrativeControlScore: 1.0,
      consentScore: 1.0,
      requiredActions: []
    };
  }

  private createDefaultConsentValidation(): ConsentValidation {
    return {
      approved: true,
      consentType: 'community_standard',
      consentLevel: 1.0,
      requiredConsent: [],
      obtainedConsent: [],
      missingConsent: []
    };
  }

  private createDefaultOppressionCheck(): OppressionCheck {
    return {
      safe: true,
      detectedOppression: [],
      severity: 'low',
      confidence: 0,
      recommendations: [],
      automaticRejection: false
    };
  }

  private determineRequiredConsent(data: CommunityData): string[] {
    const consent: string[] = [];
    
    if (data.sensitivity === 'private') {
      consent.push('explicit_creator_consent', 'explicit_community_consent');
    } else if (data.sensitivity === 'community') {
      consent.push('community_consent');
    }
    
    if (data.creatorIds.length > 1) {
      consent.push('multi_creator_consent');
    }
    
    return consent;
  }

  private assessObtainedConsent(data: CommunityData): string[] {
    // This would typically check against Layer 5 consent records
    // For now, return mock consent based on data properties
    const obtained: string[] = [];
    
    if (data.consentRequired) {
      obtained.push('community_consent');
    }
    
    return obtained;
  }

  private calculateConsentExpiry(data: CommunityData): Date | undefined {
    if (data.sensitivity === 'private') {
      // Private data consent expires in 1 year
      return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }
    return undefined;
  }

  private async detectOppressionTypes(content: ContentItem): Promise<OppressionType[]> {
    const detected: OppressionType[] = [];
    const text = content.text?.toLowerCase() || '';
    
    // Basic keyword detection (real implementation would use ML/AI)
    const oppressionKeywords = {
      [OppressionType.RACIST]: ['racist', 'racial slur', 'discrimination'],
      [OppressionType.HOMOPHOBIC]: ['homophobic', 'anti-gay', 'heteronormative'],
      [OppressionType.TRANSPHOBIC]: ['transphobic', 'anti-trans', 'cisnormative'],
      [OppressionType.CLASSIST]: ['classist', 'poverty shaming', 'elitist'],
      [OppressionType.SEXIST]: ['sexist', 'misogynistic', 'patriarchal'],
      [OppressionType.ABLEIST]: ['ableist', 'disability discrimination'],
      [OppressionType.EXPLOITATION]: ['exploitative', 'predatory', 'extractive']
    };

    for (const [type, keywords] of Object.entries(oppressionKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        detected.push(type as OppressionType);
      }
    }

    return detected;
  }

  private calculateOppressionSeverity(detectedOppression: OppressionType[]): 'low' | 'medium' | 'high' | 'critical' {
    if (detectedOppression.length === 0) return 'low';
    if (detectedOppression.length === 1) return 'medium';
    if (detectedOppression.length === 2) return 'high';
    return 'critical';
  }

  private calculateDetectionConfidence(content: ContentItem, detectedOppression: OppressionType[]): number {
    // Mock confidence calculation - real implementation would use ML confidence scores
    const baseConfidence = 0.8;
    const communityContextBonus = content.communityContext.length > 0 ? 0.1 : 0;
    return Math.min(baseConfidence + communityContextBonus, 1.0);
  }

  private generateOppressionRecommendations(detectedOppression: OppressionType[], severity: string): string[] {
    const recommendations: string[] = [];
    
    if (detectedOppression.length > 0) {
      recommendations.push('Review content for oppressive language');
      recommendations.push('Consider community impact of messaging');
    }
    
    if (severity === 'high' || severity === 'critical') {
      recommendations.push('Require community review before approval');
      recommendations.push('Provide content warning if approved');
    }
    
    return recommendations;
  }

  private determineRuleChanges(currentRules: GovernanceRules, newRules: GovernanceRules): string[] {
    const changes: string[] = [];
    
    // Compare liberation principles
    if (currentRules.liberationPrinciples.length !== newRules.liberationPrinciples.length) {
      changes.push('Liberation principles count changed');
    }
    
    // Compare voting rules  
    if (currentRules.votingRules.length !== newRules.votingRules.length) {
      changes.push('Voting rules updated');
    }
    
    // Compare sovereignty rules
    if (currentRules.sovereigntyRules.length !== newRules.sovereigntyRules.length) {
      changes.push('Creator sovereignty rules modified');
    }
    
    return changes;
  }

  private generateNewRuleVersion(currentVersion: string): string {
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    return `${major}.${minor}.${patch + 1}`;
  }
}

/**
 * Governance Decision Factory Implementation
 * RESPONSIBILITY: Creates governance decisions with proper structure
 */
export class GovernanceDecisionFactory implements GovernanceDecisionFactory {
  createGovernanceDecision(
    liberationValidation: LiberationValidation,
    sovereigntyDecision: SovereigntyDecision,
    consentValidation: ConsentValidation,
    oppressionCheck: OppressionCheck
  ): GovernanceDecision {
    return {
      decisionId: this.generateDecisionId(),
      approved: false, // Will be calculated by service
      timestamp: new Date(),
      decisionType: GovernanceDecisionType.CONTENT_APPROVAL,
      liberationPrinciples: liberationValidation,
      creatorSovereignty: sovereigntyDecision,
      communityConsent: consentValidation,
      antiOppression: oppressionCheck,
      reasons: [], // Will be compiled by service
      appealable: true,
      appealDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    };
  }

  generateDecisionId(): string {
    return `gov_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  compileDecisionReasons(validations: Array<any>): DecisionReason[] {
    const reasons: DecisionReason[] = [];
    
    for (const validation of validations) {
      if (validation.valid || validation.approved) {
        reasons.push({
          type: 'approval',
          principle: validation.type || 'general',
          explanation: 'Validation passed requirements',
          evidence: validation.feedback || validation.recommendations || [],
          weight: 1.0
        });
      } else {
        reasons.push({
          type: 'rejection',
          principle: validation.type || 'general',
          explanation: 'Validation failed requirements',
          evidence: validation.feedback || validation.recommendations || [],
          weight: 1.0
        });
      }
    }
    
    return reasons;
  }
}
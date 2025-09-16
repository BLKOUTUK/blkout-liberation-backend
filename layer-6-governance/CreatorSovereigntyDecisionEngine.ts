/**
 * Creator Sovereignty Decision Engine (Layer 4 ONLY)
 * CRITICAL: Contains ONLY creator sovereignty decision logic - NO economic implementation, NO storage
 * 
 * LAYER SEPARATION COMPLIANCE:
 * ✅ Makes creator sovereignty decisions ONLY
 * ❌ NO economic payment implementation (delegates to Layer 3)
 * ❌ NO sovereignty enforcement (delegates to Layer 3)
 * ❌ NO storage of sovereignty data (delegates to Layer 5)
 */

import {
  CreatorSovereigntyDecisionEngine as ICreatorSovereigntyDecisionEngine
} from './CommunityGovernanceInterface';
import {
  CreatorAction,
  SovereigntyDecision,
  EconomicImpact,
  ContentImpact,
  NarrativeControl,
  ConsentStatus
} from './CommunityGovernanceTypes';

/**
 * Creator Sovereignty Assessment Engine
 * RESPONSIBILITY: Makes creator sovereignty decisions ONLY - no economic/content implementation
 */
export class CreatorSovereigntyDecisionEngine implements ICreatorSovereigntyDecisionEngine {
  
  private readonly MINIMUM_REVENUE_SHARE = 0.75; // 75% minimum to creators
  private readonly MINIMUM_NARRATIVE_CONTROL = 0.8; // 80% narrative control required
  private readonly MINIMUM_CONSENT_LEVEL = 0.9; // 90% consent compliance required

  /**
   * Assesses creator sovereignty for any action
   * DECISION ONLY: Returns sovereignty decision - no economic/content implementation
   */
  async assessCreatorSovereignty(action: CreatorAction): Promise<SovereigntyDecision> {
    // 1. Validate 75% minimum creator revenue (DECISION ONLY)
    const revenueShareDecision = await this.validateRevenueShare(action.economicImpact);
    
    // 2. Validate creator narrative control (DECISION ONLY)
    const narrativeControlDecision = await this.validateNarrativeControl(action.contentImpact);
    
    // 3. Validate creator consent (DECISION ONLY)
    const consentDecision = await this.validateCreatorConsent(action.creatorId, action);
    
    // 4. Compile required actions for sovereignty compliance
    const requiredActions = this.compileRequiredActions([
      revenueShareDecision,
      narrativeControlDecision,
      consentDecision
    ]);

    const approved = revenueShareDecision.approved && 
                    narrativeControlDecision.approved && 
                    consentDecision.approved;

    return {
      approved,
      revenueShareCompliant: revenueShareDecision.approved,
      narrativeControlMaintained: narrativeControlDecision.approved,
      creatorConsentObtained: consentDecision.approved,
      minimumRevenueShare: this.MINIMUM_REVENUE_SHARE,
      actualRevenueShare: action.economicImpact.creatorRevenueShare,
      narrativeControlScore: narrativeControlDecision.controlLevel,
      consentScore: consentDecision.consentLevel,
      requiredActions
    };
  }

  /**
   * Validates revenue share meets 75% minimum
   * DECISION ONLY: Makes decision - Layer 3 implements payment logic
   */
  async validateRevenueShare(economicImpact: EconomicImpact): Promise<{
    approved: boolean;
    currentShare: number;
    requiredShare: number;
    recommendations: string[];
  }> {
    const currentShare = economicImpact.creatorRevenueShare;
    const approved = currentShare >= this.MINIMUM_REVENUE_SHARE;
    const recommendations: string[] = [];

    if (!approved) {
      const deficit = this.MINIMUM_REVENUE_SHARE - currentShare;
      recommendations.push(`Increase creator revenue share by ${Math.round(deficit * 100)}% to meet 75% minimum`);
      recommendations.push('Reduce platform operational costs to enable higher creator share');
      recommendations.push('Consider community fundraising to subsidize creator payments');
    }

    // Additional sovereignty recommendations
    if (currentShare < 0.8) {
      recommendations.push('Consider increasing to 80% share for enhanced creator sovereignty');
    }

    if (economicImpact.platformCosts > economicImpact.creatorRevenueShare * 0.3) {
      recommendations.push('Platform costs should not exceed 30% of creator revenue');
    }

    // Validate liberation investment doesn't come from creator share
    if (economicImpact.liberationInvestment > 0 && currentShare < 0.8) {
      recommendations.push('Liberation investment should come from platform/community share, not creator share');
    }

    return {
      approved,
      currentShare,
      requiredShare: this.MINIMUM_REVENUE_SHARE,
      recommendations
    };
  }

  /**
   * Validates creator narrative control
   * DECISION ONLY: Makes decision - Layer 3 implements content control
   */
  async validateNarrativeControl(contentImpact: ContentImpact): Promise<{
    approved: boolean;
    controlLevel: number;
    requiredLevel: number;
    recommendations: string[];
  }> {
    const controlLevel = contentImpact.narrativeControl;
    const approved = controlLevel >= this.MINIMUM_NARRATIVE_CONTROL;
    const recommendations: string[] = [];

    if (!approved) {
      const deficit = this.MINIMUM_NARRATIVE_CONTROL - controlLevel;
      recommendations.push(`Increase creator narrative control by ${Math.round(deficit * 100)}% to meet 80% minimum`);
    }

    // Assess specific narrative control elements
    const narrativeElements = this.assessNarrativeControlElements(contentImpact);
    
    if (narrativeElements.editingControlDeficit > 0) {
      recommendations.push('Provide creators with final edit approval rights');
      recommendations.push('Limit platform editorial changes without creator consent');
    }

    if (narrativeElements.contextControlDeficit > 0) {
      recommendations.push('Ensure creators control how their content is contextualized');
      recommendations.push('Prevent content misrepresentation through platform framing');
    }

    if (narrativeElements.distributionControlDeficit > 0) {
      recommendations.push('Give creators control over content distribution channels');
      recommendations.push('Allow creators to restrict or approve content usage');
    }

    if (contentImpact.culturalSignificance >= 0.7 && controlLevel < 0.9) {
      recommendations.push('High cultural significance content requires enhanced creator control (90%+)');
    }

    return {
      approved,
      controlLevel,
      requiredLevel: this.MINIMUM_NARRATIVE_CONTROL,
      recommendations
    };
  }

  /**
   * Validates creator consent
   * DECISION ONLY: Makes consent decision - no consent enforcement
   */
  async validateCreatorConsent(creatorId: string, action: CreatorAction): Promise<{
    approved: boolean;
    consentLevel: number;
    consentType: string;
    missingConsent: string[];
  }> {
    const consentStatus = action.consentStatus;
    const missingConsent: string[] = [];
    
    // Validate explicit consent requirements
    if (!consentStatus.explicit) {
      missingConsent.push('explicit_consent');
    }
    
    // Validate informed consent requirements
    if (!consentStatus.informed) {
      missingConsent.push('informed_consent');
    }
    
    // Validate ongoing consent requirements
    if (!consentStatus.ongoing) {
      missingConsent.push('ongoing_consent');
    }
    
    // Validate withdrawable consent requirements
    if (!consentStatus.withdrawable) {
      missingConsent.push('withdrawable_consent');
    }

    // Check consent scope coverage
    const requiredConsentScope = this.determineRequiredConsentScope(action);
    const missingScope = requiredConsentScope.filter(scope => 
      !consentStatus.consentScope.includes(scope)
    );
    missingConsent.push(...missingScope);

    // Check consent expiry
    const consentExpired = this.isConsentExpired(consentStatus);
    if (consentExpired) {
      missingConsent.push('consent_renewal');
    }

    // Calculate consent level based on missing elements
    const totalRequired = 4 + requiredConsentScope.length; // 4 basic + scope requirements
    const totalMissing = missingConsent.length;
    const consentLevel = Math.max(0, (totalRequired - totalMissing) / totalRequired);
    
    const approved = consentLevel >= 0.9 && missingConsent.length === 0;

    return {
      approved,
      consentLevel,
      consentType: this.determineConsentType(action),
      missingConsent
    };
  }

  /**
   * Compiles required actions for sovereignty compliance
   */
  compileRequiredActions(decisions: Array<{ approved: boolean; recommendations: string[] }>): string[] {
    const allActions: string[] = [];
    
    for (const decision of decisions) {
      if (!decision.approved) {
        allActions.push(...decision.recommendations);
      }
    }
    
    // Add sovereignty-specific actions
    if (allActions.length > 0) {
      allActions.push('Schedule creator sovereignty compliance review');
      allActions.push('Update creator agreements to reflect sovereignty requirements');
    }
    
    // Remove duplicates and return
    return [...new Set(allActions)];
  }

  // ===== PRIVATE HELPER METHODS =====

  private assessNarrativeControlElements(contentImpact: ContentImpact): {
    editingControlDeficit: number;
    contextControlDeficit: number;
    distributionControlDeficit: number;
  } {
    // Mock assessment - real implementation would analyze specific control metrics
    const editingControl = Math.min(contentImpact.narrativeControl + 0.1, 1.0);
    const contextControl = contentImpact.narrativeControl;
    const distributionControl = Math.max(contentImpact.narrativeControl - 0.1, 0);
    
    return {
      editingControlDeficit: Math.max(0, this.MINIMUM_NARRATIVE_CONTROL - editingControl),
      contextControlDeficit: Math.max(0, this.MINIMUM_NARRATIVE_CONTROL - contextControl),
      distributionControlDeficit: Math.max(0, this.MINIMUM_NARRATIVE_CONTROL - distributionControl)
    };
  }

  private determineRequiredConsentScope(action: CreatorAction): string[] {
    const scope: string[] = [];
    
    // Basic content consent
    scope.push('content_creation', 'content_distribution', 'content_monetization');
    
    // Economic impact consent
    if (action.economicImpact.creatorRevenueShare > 0) {
      scope.push('revenue_sharing', 'economic_terms');
    }
    
    // Cultural significance consent
    if (action.contentImpact.culturalSignificance >= 0.7) {
      scope.push('cultural_representation', 'community_impact');
    }
    
    // Liberation messaging consent
    if (action.contentImpact.liberationMessaging >= 0.5) {
      scope.push('liberation_alignment', 'political_messaging');
    }
    
    // Narrative control consent
    if (action.narrativeControl.creatorOwnership) {
      scope.push('narrative_ownership', 'editorial_control');
    }
    
    return scope;
  }

  private isConsentExpired(consentStatus: ConsentStatus): boolean {
    if (!consentStatus.ongoing) return false; // One-time consent doesn't expire
    
    const consentAge = Date.now() - consentStatus.consentDate.getTime();
    const oneYear = 365 * 24 * 60 * 60 * 1000; // One year in milliseconds
    
    // Ongoing consent expires after one year without renewal
    return consentAge > oneYear;
  }

  private determineConsentType(action: CreatorAction): string {
    // Determine consent type based on action characteristics
    if (action.contentImpact.culturalSignificance >= 0.8 || 
        action.economicImpact.creatorRevenueShare >= 0.8) {
      return 'enhanced_explicit'; // High-stakes content requires enhanced consent
    }
    
    if (action.contentImpact.liberationMessaging >= 0.7) {
      return 'political_explicit'; // Political content requires political consent
    }
    
    if (action.economicImpact.creatorRevenueShare > 0) {
      return 'economic_explicit'; // Revenue-generating requires economic consent
    }
    
    return 'standard_explicit';
  }
}

/**
 * Creator Sovereignty Validation Utilities
 * RESPONSIBILITY: Utility functions for sovereignty assessment
 */
export class CreatorSovereigntyValidationUtils {
  
  /**
   * Validates sovereignty compliance across multiple creators
   */
  static async validateMultiCreatorSovereignty(
    actions: CreatorAction[],
    sovereigntyEngine: CreatorSovereigntyDecisionEngine
  ): Promise<{
    overallCompliant: boolean;
    creatorDecisions: Record<string, SovereigntyDecision>;
    conflictingRequirements: string[];
  }> {
    const creatorDecisions: Record<string, SovereigntyDecision> = {};
    const conflictingRequirements: string[] = [];
    
    // Assess each creator's sovereignty
    for (const action of actions) {
      const decision = await sovereigntyEngine.assessCreatorSovereignty(action);
      creatorDecisions[action.creatorId] = decision;
    }
    
    // Check for conflicts between creators
    const allRequiredActions = Object.values(creatorDecisions)
      .flatMap(decision => decision.requiredActions);
    
    // Detect conflicting requirements
    const actionCounts = allRequiredActions.reduce((counts, action) => {
      counts[action] = (counts[action] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
    
    for (const [action, count] of Object.entries(actionCounts)) {
      if (count > 1 && action.includes('exclusive')) {
        conflictingRequirements.push(`Conflicting exclusive requirement: ${action}`);
      }
    }
    
    const overallCompliant = Object.values(creatorDecisions)
      .every(decision => decision.approved) && 
      conflictingRequirements.length === 0;
    
    return {
      overallCompliant,
      creatorDecisions,
      conflictingRequirements
    };
  }

  /**
   * Calculates sovereignty score for prioritization
   */
  static calculateSovereigntyPriorityScore(decision: SovereigntyDecision): number {
    let score = 0;
    
    // Revenue share weight (40% of score)
    if (decision.actualRevenueShare) {
      score += (decision.actualRevenueShare / decision.minimumRevenueShare) * 0.4;
    }
    
    // Narrative control weight (30% of score)
    score += decision.narrativeControlScore * 0.3;
    
    // Consent compliance weight (30% of score)
    score += decision.consentScore * 0.3;
    
    return Math.min(score, 1);
  }

  /**
   * Generates sovereignty improvement roadmap
   */
  static generateSovereigntyRoadmap(decision: SovereigntyDecision): {
    immediateActions: string[];
    shortTermActions: string[];
    longTermActions: string[];
  } {
    const immediate: string[] = [];
    const shortTerm: string[] = [];
    const longTerm: string[] = [];
    
    if (!decision.revenueShareCompliant) {
      immediate.push('Adjust revenue sharing to meet 75% minimum');
      immediate.push('Review platform operational costs');
    }
    
    if (!decision.narrativeControlMaintained) {
      shortTerm.push('Implement enhanced creator editorial controls');
      shortTerm.push('Update content management systems');
    }
    
    if (!decision.creatorConsentObtained) {
      immediate.push('Obtain required creator consent');
      shortTerm.push('Implement ongoing consent tracking system');
    }
    
    // Long-term sovereignty enhancements
    if (decision.approved) {
      longTerm.push('Explore increasing creator revenue share beyond 75%');
      longTerm.push('Implement creator governance participation');
      longTerm.push('Develop creator sovereignty metrics dashboard');
    }
    
    return {
      immediateActions: immediate,
      shortTermActions: shortTerm,
      longTermActions: longTerm
    };
  }
}
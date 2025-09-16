/**
 * Liberation Principles Validator (Layer 4 ONLY)
 * CRITICAL: Contains ONLY liberation principle validation logic - NO enforcement, NO storage
 * 
 * LAYER SEPARATION COMPLIANCE:
 * ✅ Makes liberation validation decisions ONLY
 * ❌ NO liberation enforcement (delegates to Layer 3)
 * ❌ NO principle storage (delegates to Layer 5)
 * ❌ NO infrastructure concerns (delegates to Layer 6)
 */

import {
  LiberationPrinciplesValidator as ILiberationPrinciplesValidator
} from './CommunityGovernanceInterface';
import {
  PlatformOperation,
  LiberationValidation,
  LiberationPrincipleType,
  LiberationImpact,
  EconomicImpact
} from './CommunityGovernanceTypes';

/**
 * Liberation Principles Validation Engine
 * RESPONSIBILITY: Validates operations against liberation principles ONLY - no enforcement
 */
export class LiberationPrinciplesValidator implements ILiberationPrinciplesValidator {
  
  private readonly LIBERATION_THRESHOLD = 0.7; // 70% liberation score required
  private readonly PRINCIPLE_WEIGHTS = {
    [LiberationPrincipleType.EMPOWERS_BLACK_QUEERNESS]: 0.25,
    [LiberationPrincipleType.ADVANCES_COMMUNITY_LIBERATION]: 0.25,
    [LiberationPrincipleType.RESISTS_OPPRESSION_SYSTEMS]: 0.20,
    [LiberationPrincipleType.STRENGTHENS_COMMUNITY_POWER]: 0.20,
    [LiberationPrincipleType.SUPPORTS_MUTUAL_AID]: 0.10
  };

  /**
   * Validates liberation principles for any platform operation
   * DECISION ONLY: Returns validation decision - no enforcement implementation
   */
  async validateLiberationPrinciples(operation: PlatformOperation): Promise<LiberationValidation> {
    // Assess each liberation principle
    const principles = {
      [LiberationPrincipleType.EMPOWERS_BLACK_QUEERNESS]: await this.assessBlackQueerEmpowerment(operation),
      [LiberationPrincipleType.ADVANCES_COMMUNITY_LIBERATION]: await this.assessCommunityLiberation(operation),
      [LiberationPrincipleType.RESISTS_OPPRESSION_SYSTEMS]: await this.assessOppressionResistance(operation),
      [LiberationPrincipleType.STRENGTHENS_COMMUNITY_POWER]: await this.assessCommunityPowerBuilding(operation),
      [LiberationPrincipleType.SUPPORTS_MUTUAL_AID]: await this.assessMutualAidSupport(operation)
    };

    // Calculate weighted overall score
    const overallScore = this.calculateWeightedLiberationScore(principles);
    
    // Determine passed/failed principles
    const passedPrinciples = Object.entries(principles)
      .filter(([_, score]) => score >= 0.6)
      .map(([principle, _]) => principle as LiberationPrincipleType);
    
    const failedPrinciples = Object.entries(principles)
      .filter(([_, score]) => score < 0.6)
      .map(([principle, _]) => principle as LiberationPrincipleType);

    // Generate feedback and recommendations
    const feedback = this.generateLiberationFeedback(principles);
    const recommendations = this.generateImprovementRecommendations(principles);

    return {
      valid: overallScore >= this.LIBERATION_THRESHOLD,
      score: overallScore,
      principles,
      feedback,
      recommendations,
      liberationThreshold: this.LIBERATION_THRESHOLD,
      passedPrinciples,
      failedPrinciples
    };
  }

  /**
   * Assesses Black queer empowerment impact
   * DECISION ONLY: Returns empowerment score - no empowerment implementation
   */
  async assessBlackQueerEmpowerment(operation: PlatformOperation): Promise<number> {
    let score = 0;
    
    // Economic empowerment assessment
    if (operation.impact.economic) {
      // High creator revenue share empowers Black queer creators
      if (operation.impact.economic.creatorRevenueShare >= 0.75) {
        score += 0.3; // 30% of score for fair revenue
      }
      
      // Community revenue reinvestment empowers community
      if (operation.impact.economic.communityRevenueShare >= 0.15) {
        score += 0.2; // 20% of score for community investment
      }
      
      // Liberation-specific investment
      if (operation.impact.economic.liberationInvestment > 0) {
        score += 0.2; // 20% of score for liberation funding
      }
    }
    
    // Cultural empowerment assessment
    const culturalEmpowerment = this.assessCulturalEmpowerment(operation);
    score += culturalEmpowerment * 0.3; // 30% of score for cultural impact
    
    // Ensure score is between 0 and 1
    return Math.min(Math.max(score, 0), 1);
  }

  /**
   * Assesses community liberation advancement
   * DECISION ONLY: Returns liberation score - no liberation implementation
   */
  async assessCommunityLiberation(operation: PlatformOperation): Promise<number> {
    let score = 0;
    
    // Assess community self-determination
    const selfDetermination = this.assessSelfDetermination(operation);
    score += selfDetermination * 0.4; // 40% of score
    
    // Assess collective ownership patterns
    const collectiveOwnership = this.assessCollectiveOwnership(operation);
    score += collectiveOwnership * 0.3; // 30% of score
    
    // Assess democratic participation enhancement
    const democraticParticipation = this.assessDemocraticParticipation(operation);
    score += democraticParticipation * 0.3; // 30% of score
    
    return Math.min(Math.max(score, 0), 1);
  }

  /**
   * Assesses oppression system resistance
   * DECISION ONLY: Returns resistance score - no resistance implementation
   */
  async assessOppressionResistance(operation: PlatformOperation): Promise<number> {
    let score = 0;
    
    // Assess anti-racist elements
    const antiRacist = this.assessAntiRacistElements(operation);
    score += antiRacist * 0.3; // 30% of score
    
    // Assess anti-homophobic/transphobic elements  
    const antiQueerphobic = this.assessAntiQueerphobicElements(operation);
    score += antiQueerphobic * 0.3; // 30% of score
    
    // Assess anti-capitalist/exploitative elements
    const antiExploitative = this.assessAntiExploitativeElements(operation);
    score += antiExploitative * 0.2; // 20% of score
    
    // Assess systemic change potential
    const systemicChange = this.assessSystemicChangeImpact(operation);
    score += systemicChange * 0.2; // 20% of score
    
    return Math.min(Math.max(score, 0), 1);
  }

  /**
   * Assesses community power building
   * DECISION ONLY: Returns power building score - no power building implementation
   */
  async assessCommunityPowerBuilding(operation: PlatformOperation): Promise<number> {
    let score = 0;
    
    // Assess resource distribution to community
    const resourceDistribution = this.assessResourceDistribution(operation);
    score += resourceDistribution * 0.3; // 30% of score
    
    // Assess skill/knowledge sharing
    const knowledgeSharing = this.assessKnowledgeSharing(operation);
    score += knowledgeSharing * 0.25; // 25% of score
    
    // Assess network building
    const networkBuilding = this.assessNetworkBuilding(operation);
    score += networkBuilding * 0.25; // 25% of score
    
    // Assess collective organizing potential
    const organizingPotential = this.assessOrganizingPotential(operation);
    score += organizingPotential * 0.2; // 20% of score
    
    return Math.min(Math.max(score, 0), 1);
  }

  /**
   * Assesses mutual aid support
   * DECISION ONLY: Returns mutual aid score - no mutual aid implementation
   */
  async assessMutualAidSupport(operation: PlatformOperation): Promise<number> {
    let score = 0;
    
    // Assess direct mutual aid contribution
    if (operation.impact.economic) {
      const mutualAidContribution = operation.impact.economic.mutualAidContribution || 0;
      if (mutualAidContribution > 0) {
        score += 0.4; // 40% of score for direct contribution
      }
    }
    
    // Assess community care elements
    const communityCare = this.assessCommunityCareElements(operation);
    score += communityCare * 0.3; // 30% of score
    
    // Assess resource sharing facilitation
    const resourceSharing = this.assessResourceSharingFacilitation(operation);
    score += resourceSharing * 0.3; // 30% of score
    
    return Math.min(Math.max(score, 0), 1);
  }

  /**
   * Generates liberation feedback based on principle scores
   */
  generateLiberationFeedback(principles: Record<string, number>): string[] {
    const feedback: string[] = [];
    
    for (const [principle, score] of Object.entries(principles)) {
      const principleType = principle as LiberationPrincipleType;
      
      if (score >= 0.8) {
        feedback.push(`Excellent ${this.formatPrincipleName(principleType)} alignment (${Math.round(score * 100)}%)`);
      } else if (score >= 0.6) {
        feedback.push(`Good ${this.formatPrincipleName(principleType)} alignment (${Math.round(score * 100)}%)`);
      } else if (score >= 0.4) {
        feedback.push(`Moderate ${this.formatPrincipleName(principleType)} alignment (${Math.round(score * 100)}%) - room for improvement`);
      } else {
        feedback.push(`Low ${this.formatPrincipleName(principleType)} alignment (${Math.round(score * 100)}%) - significant improvement needed`);
      }
    }
    
    return feedback;
  }

  /**
   * Generates improvement recommendations based on principle scores
   */
  generateImprovementRecommendations(principles: Record<string, number>): string[] {
    const recommendations: string[] = [];
    
    for (const [principle, score] of Object.entries(principles)) {
      const principleType = principle as LiberationPrincipleType;
      
      if (score < 0.6) {
        switch (principleType) {
          case LiberationPrincipleType.EMPOWERS_BLACK_QUEERNESS:
            recommendations.push('Increase creator revenue share to 75% minimum');
            recommendations.push('Add explicit Black queer cultural elements');
            recommendations.push('Ensure Black queer voices lead decision-making');
            break;
            
          case LiberationPrincipleType.ADVANCES_COMMUNITY_LIBERATION:
            recommendations.push('Add democratic governance components');
            recommendations.push('Increase community ownership elements');
            recommendations.push('Strengthen collective decision-making');
            break;
            
          case LiberationPrincipleType.RESISTS_OPPRESSION_SYSTEMS:
            recommendations.push('Add explicit anti-oppression measures');
            recommendations.push('Challenge extractive economic models');
            recommendations.push('Include systemic change messaging');
            break;
            
          case LiberationPrincipleType.STRENGTHENS_COMMUNITY_POWER:
            recommendations.push('Increase resource distribution to community');
            recommendations.push('Add skill-sharing components');
            recommendations.push('Facilitate network building');
            break;
            
          case LiberationPrincipleType.SUPPORTS_MUTUAL_AID:
            recommendations.push('Add direct mutual aid contribution');
            recommendations.push('Include community care elements');
            recommendations.push('Facilitate resource sharing');
            break;
        }
      }
    }
    
    return recommendations;
  }

  // ===== PRIVATE ASSESSMENT METHODS =====

  private calculateWeightedLiberationScore(principles: Record<string, number>): number {
    let weightedScore = 0;
    
    for (const [principle, score] of Object.entries(principles)) {
      const weight = this.PRINCIPLE_WEIGHTS[principle as LiberationPrincipleType] || 0;
      weightedScore += score * weight;
    }
    
    return weightedScore;
  }

  private assessCulturalEmpowerment(operation: PlatformOperation): number {
    let score = 0;
    
    // Check for explicit Black queer cultural elements
    const description = operation.description.toLowerCase();
    const blackQueerKeywords = ['black', 'queer', 'lgbtq', 'transgender', 'gay', 'lesbian', 'bisexual'];
    const culturalKeywords = ['culture', 'art', 'music', 'storytelling', 'narrative', 'voice'];
    
    const hasBlackQueerFocus = blackQueerKeywords.some(keyword => description.includes(keyword));
    const hasCulturalElements = culturalKeywords.some(keyword => description.includes(keyword));
    
    if (hasBlackQueerFocus && hasCulturalElements) {
      score += 0.8;
    } else if (hasBlackQueerFocus || hasCulturalElements) {
      score += 0.4;
    }
    
    return Math.min(score, 1);
  }

  private assessSelfDetermination(operation: PlatformOperation): number {
    let score = 0;
    
    // Check for community control elements
    const hasGovernance = operation.requiredPermissions.includes('community_governance');
    const hasDemocracy = operation.description.toLowerCase().includes('democratic');
    const hasConsent = operation.description.toLowerCase().includes('consent');
    
    if (hasGovernance) score += 0.4;
    if (hasDemocracy) score += 0.4;
    if (hasConsent) score += 0.2;
    
    return Math.min(score, 1);
  }

  private assessCollectiveOwnership(operation: PlatformOperation): number {
    let score = 0;
    
    // Check economic model for collective elements
    if (operation.impact.economic) {
      const communityShare = operation.impact.economic.communityRevenueShare;
      if (communityShare >= 0.25) score += 0.6; // 25%+ community ownership
      else if (communityShare >= 0.15) score += 0.4; // 15%+ community ownership
      else if (communityShare > 0) score += 0.2; // Some community ownership
    }
    
    const description = operation.description.toLowerCase();
    const collectiveKeywords = ['collective', 'cooperative', 'shared', 'community-owned'];
    if (collectiveKeywords.some(keyword => description.includes(keyword))) {
      score += 0.4;
    }
    
    return Math.min(score, 1);
  }

  private assessDemocraticParticipation(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const democraticKeywords = ['vote', 'democratic', 'participate', 'consensus', 'assembly'];
    const participatoryKeywords = ['input', 'feedback', 'involvement', 'engagement'];
    
    const hasDemocracy = democraticKeywords.some(keyword => description.includes(keyword));
    const hasParticipation = participatoryKeywords.some(keyword => description.includes(keyword));
    
    if (hasDemocracy) score += 0.6;
    if (hasParticipation) score += 0.4;
    
    return Math.min(score, 1);
  }

  private assessAntiRacistElements(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const antiRacistKeywords = ['anti-racist', 'racial justice', 'black liberation', 'decolonize'];
    const racialEmpowermentKeywords = ['black-owned', 'black creators', 'racial equity'];
    
    if (antiRacistKeywords.some(keyword => description.includes(keyword))) {
      score += 0.6;
    }
    
    if (racialEmpowermentKeywords.some(keyword => description.includes(keyword))) {
      score += 0.4;
    }
    
    return Math.min(score, 1);
  }

  private assessAntiQueerphobicElements(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const antiQueerphobicKeywords = ['lgbtq+ safe', 'queer liberation', 'trans rights', 'anti-homophobic'];
    const queerEmpowermentKeywords = ['queer creators', 'lgbtq+ community', 'gender affirming'];
    
    if (antiQueerphobicKeywords.some(keyword => description.includes(keyword))) {
      score += 0.6;
    }
    
    if (queerEmpowermentKeywords.some(keyword => description.includes(keyword))) {
      score += 0.4;
    }
    
    return Math.min(score, 1);
  }

  private assessAntiExploitativeElements(operation: PlatformOperation): number {
    let score = 0;
    
    // Check for fair economic terms
    if (operation.impact.economic) {
      const creatorShare = operation.impact.economic.creatorRevenueShare;
      if (creatorShare >= 0.75) score += 0.5; // Non-exploitative creator terms
      
      const platformCosts = operation.impact.economic.platformCosts;
      const totalRevenue = creatorShare + operation.impact.economic.communityRevenueShare;
      if (platformCosts <= totalRevenue * 0.25) score += 0.3; // Reasonable platform costs
    }
    
    const description = operation.description.toLowerCase();
    const antiExploitationKeywords = ['fair', 'non-exploitative', 'ethical', 'transparent'];
    if (antiExploitationKeywords.some(keyword => description.includes(keyword))) {
      score += 0.2;
    }
    
    return Math.min(score, 1);
  }

  private assessSystemicChangeImpact(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const systemicKeywords = ['systemic', 'institutional', 'structural', 'transformative'];
    const changeKeywords = ['reform', 'revolution', 'alternative', 'disrupt'];
    
    if (systemicKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    if (changeKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    return Math.min(score, 1);
  }

  private assessResourceDistribution(operation: PlatformOperation): number {
    let score = 0;
    
    if (operation.impact.economic) {
      // Assess how resources flow to community
      const communityShare = operation.impact.economic.communityRevenueShare;
      const mutualAid = operation.impact.economic.mutualAidContribution;
      const liberation = operation.impact.economic.liberationInvestment;
      
      const totalCommunityBenefit = communityShare + mutualAid + liberation;
      if (totalCommunityBenefit >= 0.3) score += 1.0; // 30%+ to community
      else if (totalCommunityBenefit >= 0.2) score += 0.7; // 20%+ to community
      else if (totalCommunityBenefit >= 0.1) score += 0.4; // 10%+ to community
    }
    
    return Math.min(score, 1);
  }

  private assessKnowledgeSharing(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const knowledgeKeywords = ['education', 'training', 'skill', 'knowledge', 'learning', 'workshop'];
    const sharingKeywords = ['share', 'teach', 'mentor', 'guide', 'support'];
    
    if (knowledgeKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    if (sharingKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    return Math.min(score, 1);
  }

  private assessNetworkBuilding(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const networkKeywords = ['network', 'connect', 'community', 'relationship', 'collaboration'];
    const buildingKeywords = ['build', 'create', 'foster', 'develop', 'strengthen'];
    
    if (networkKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    if (buildingKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    return Math.min(score, 1);
  }

  private assessOrganizingPotential(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const organizingKeywords = ['organize', 'mobilize', 'collective action', 'campaign', 'advocacy'];
    const powerKeywords = ['power', 'influence', 'change', 'justice', 'rights'];
    
    if (organizingKeywords.some(keyword => description.includes(keyword))) {
      score += 0.6;
    }
    
    if (powerKeywords.some(keyword => description.includes(keyword))) {
      score += 0.4;
    }
    
    return Math.min(score, 1);
  }

  private assessCommunityCareElements(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const careKeywords = ['care', 'support', 'wellness', 'healing', 'safety'];
    const communityKeywords = ['community', 'collective', 'mutual', 'solidarity'];
    
    if (careKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    if (communityKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    return Math.min(score, 1);
  }

  private assessResourceSharingFacilitation(operation: PlatformOperation): number {
    let score = 0;
    
    const description = operation.description.toLowerCase();
    const sharingKeywords = ['share', 'exchange', 'distribute', 'pool', 'common'];
    const resourceKeywords = ['resource', 'tool', 'asset', 'fund', 'material'];
    
    if (sharingKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    if (resourceKeywords.some(keyword => description.includes(keyword))) {
      score += 0.5;
    }
    
    return Math.min(score, 1);
  }

  private formatPrincipleName(principle: LiberationPrincipleType): string {
    return principle.replace(/_/g, ' ').toLowerCase();
  }
}
/**
 * EconomicJusticeService.js
 * Layer 3: Business Logic Service
 * Responsible for all economic calculations and justice-related logic
 * NO data persistence, NO API calls, NO UI concerns
 */

class EconomicJusticeService {
  /**
   * Calculate revenue transparency for creator sovereignty
   * @param {Object} content - Content object with revenue information
   * @returns {Object} - Revenue transparency object with 75% creator sovereignty
   */
  calculateRevenueTransparency(content) {
    // Validate input - allow content without revenue for non-monetized content
    if (!content) {
      throw new Error('Content data is required');
    }

    // Default revenue to 0 for non-monetized content
    const revenue = content.revenue || 0;

    // Calculate 75% creator sovereignty
    const creatorShare = 0.75;
    const platformShare = 0.25;

    return {
      creatorShare,
      platformShare,
      totalRevenue: revenue,
      creatorEarnings: revenue * creatorShare,
      platformEarnings: revenue * platformShare,
      communityBenefit: revenue * platformShare * 0.5, // 50% of platform share goes to community
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Validate creator sovereignty compliance
   * @param {Object} revenueData - Revenue data to validate
   * @returns {boolean} - True if creator sovereignty is maintained
   */
  validateCreatorSovereignty(revenueData) {
    return revenueData.creatorShare >= 0.75;
  }

  /**
   * Calculate economic justice metrics for community benefit
   * @param {Object} economicData - Economic data to analyze
   * @returns {Object} - Economic justice metrics
   */
  calculateEconomicJusticeMetrics(economicData) {
    if (!economicData) {
      throw new Error('Economic data is required');
    }

    const wealthDistribution = this.analyzeWealthDistribution(economicData);
    const accessibilityScore = this.calculateAccessibilityScore(economicData);
    const communityOwnership = this.assessCommunityOwnership(economicData);

    return {
      wealthDistribution,
      accessibilityScore,
      communityOwnership,
      overallJusticeScore: (wealthDistribution + accessibilityScore + communityOwnership) / 3,
      recommendation: this.generateJusticeRecommendation(wealthDistribution, accessibilityScore, communityOwnership)
    };
  }

  /**
   * Analyze wealth distribution patterns
   * @param {Object} economicData - Economic data
   * @returns {number} - Distribution score (0-1)
   */
  analyzeWealthDistribution(economicData) {
    // Liberation-focused wealth distribution analysis
    const creatorShare = economicData.creatorShare || 0;
    const communityShare = economicData.communityShare || 0;
    const concentrationIndex = economicData.concentrationIndex || 1;

    // Higher scores for more equitable distribution
    return Math.min(1, (creatorShare + communityShare) / (concentrationIndex + 0.1));
  }

  /**
   * Calculate economic accessibility score
   * @param {Object} economicData - Economic data
   * @returns {number} - Accessibility score (0-1)
   */
  calculateAccessibilityScore(economicData) {
    const barrierLevel = economicData.barrierLevel || 1;
    const inclusionMeasures = economicData.inclusionMeasures || 0;

    return Math.max(0, Math.min(1, (1 - barrierLevel + inclusionMeasures) / 2));
  }

  /**
   * Assess community ownership levels
   * @param {Object} economicData - Economic data
   * @returns {number} - Community ownership score (0-1)
   */
  assessCommunityOwnership(economicData) {
    const communityControl = economicData.communityControl || 0;
    const democraticParticipation = economicData.democraticParticipation || 0;

    return (communityControl + democraticParticipation) / 2;
  }

  /**
   * Generate justice-focused recommendations
   * @param {number} distribution - Wealth distribution score
   * @param {number} accessibility - Accessibility score
   * @param {number} ownership - Community ownership score
   * @returns {Array} - Array of recommendations
   */
  generateJusticeRecommendation(distribution, accessibility, ownership) {
    const recommendations = [];

    if (distribution < 0.6) {
      recommendations.push('Improve wealth distribution through higher creator revenue sharing');
    }

    if (accessibility < 0.7) {
      recommendations.push('Reduce economic barriers and increase inclusion measures');
    }

    if (ownership < 0.5) {
      recommendations.push('Strengthen community ownership and democratic participation');
    }

    return recommendations;
  }
}

// Export class for proper instantiation in deployment
module.exports = EconomicJusticeService;
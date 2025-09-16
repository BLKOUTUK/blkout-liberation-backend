/**
 * Creator Sovereignty Service Implementation (Layer 3)
 *
 * CONTRACT COMPLIANCE: Implements ICreatorSovereigntyService interface
 * DOES NOT: Access data directly, make data persistence decisions
 * ONLY: Implements creator sovereignty business logic through repository contracts
 */

const { ICreatorSovereigntyService } = require('../../contracts/business-logic-interfaces');

class CreatorSovereigntyServiceImpl extends ICreatorSovereigntyService {
  constructor(creatorDataRepository, auditTrailRepository) {
    super();
    this.creatorDataRepository = creatorDataRepository;
    this.auditTrailRepository = auditTrailRepository;

    // MATHEMATICAL LIBERATION CONSTANTS
    this.MATHEMATICAL_MINIMUM = 0.75; // 75% MATHEMATICALLY ENFORCED
    this.NARRATIVE_CONTROL_REQUIRED = true;
  }

  /**
   * MATHEMATICAL VALIDATION: 75% minimum creator share
   */
  async validateCreatorShare(revenueData) {
    if (!revenueData || typeof revenueData.creatorShare !== 'number') {
      return {
        compliant: false,
        violation: 'Missing or invalid creator share data',
        mathematicalMinimum: this.MATHEMATICAL_MINIMUM
      };
    }

    const creatorShare = revenueData.creatorShare;
    const compliant = creatorShare >= this.MATHEMATICAL_MINIMUM;

    const result = {
      compliant,
      creatorShare,
      mathematicalMinimum: this.MATHEMATICAL_MINIMUM,
      violation: compliant ? null : `Creator share ${creatorShare} below mathematical minimum ${this.MATHEMATICAL_MINIMUM}`,
      liberationAlignment: compliant ? 'liberation_enforced' : 'liberation_violated'
    };

    // Audit through repository contract
    await this.auditTrailRepository.storeOperationAudit({
      operation_type: 'creator_sovereignty_validation',
      operation_data: revenueData,
      validation_result: result,
      mathematical_enforcement: true,
      timestamp: new Date().toISOString()
    });

    return result;
  }

  /**
   * SOVEREIGNTY ENFORCEMENT: Enforce minimum creator share
   */
  async enforceMinimumShare(operation) {
    const validation = await this.validateCreatorShare(operation.revenueData);

    if (!validation.compliant) {
      // MATHEMATICAL ENFORCEMENT: Reject operation
      const enforcementResult = {
        enforced: false,
        rejectionReason: validation.violation,
        mathematicallyEnforced: true,
        correctedShare: this.MATHEMATICAL_MINIMUM,
        originalShare: operation.revenueData.creatorShare
      };

      await this.auditTrailRepository.storeOperationAudit({
        operation_type: 'creator_sovereignty_enforcement_failure',
        operation_id: operation.id,
        enforcement_result: enforcementResult,
        mathematical_protection_triggered: true,
        timestamp: new Date().toISOString()
      });

      return enforcementResult;
    }

    // Store successful sovereignty enforcement
    const enforcementResult = {
      enforced: true,
      creatorShare: operation.revenueData.creatorShare,
      mathematicalComplianceConfirmed: true,
      sovereigntyLevel: 'full_creator_control',
      liberationAlignment: 'sovereignty_protected'
    };

    await this.auditTrailRepository.storeOperationAudit({
      operation_type: 'creator_sovereignty_enforcement_success',
      operation_id: operation.id,
      enforcement_result: enforcementResult,
      timestamp: new Date().toISOString()
    });

    return enforcementResult;
  }

  /**
   * SOVEREIGNTY METRICS: Calculate comprehensive sovereignty metrics
   */
  async calculateSovereigntyMetrics(operation) {
    const creatorShare = operation.revenueData.creatorShare;
    const mathematicalCompliance = creatorShare >= this.MATHEMATICAL_MINIMUM;

    const metrics = {
      creatorSovereigntyScore: mathematicalCompliance ? 1.0 : (creatorShare / this.MATHEMATICAL_MINIMUM),
      mathematicalCompliance,
      liberationAlignment: mathematicalCompliance ? 0.95 : 0.2,
      narrativeControlMaintained: operation.narrativeControl || false,
      economicJusticeLevel: this.calculateEconomicJusticeLevel(operation.revenueData),
      antiOppressionProtection: mathematicalCompliance ? 0.98 : 0.3
    };

    // Store metrics through repository contract
    await this.auditTrailRepository.storeLiberationMetric({
      metric_type: 'creator_sovereignty',
      operation_id: operation.id,
      metrics,
      timestamp: new Date().toISOString()
    });

    return metrics;
  }

  /**
   * NARRATIVE CONTROL VALIDATION: Ensure creator maintains narrative control
   */
  async validateNarrativeControl(operation) {
    const narrativeControlValid = operation.narrativeControl === true;

    if (!narrativeControlValid) {
      await this.auditTrailRepository.storeOperationAudit({
        operation_type: 'narrative_control_violation',
        operation_id: operation.id,
        violation: 'Creator narrative control not maintained',
        liberation_impact: 'sovereignty_compromised',
        timestamp: new Date().toISOString()
      });
    }

    return narrativeControlValid;
  }

  /**
   * CREATOR EMPOWERMENT: Calculate empowerment through economic justice
   */
  async calculateCreatorEmpowerment(creatorId) {
    // Get creator revenue history through repository contract
    const revenueHistory = await this.creatorDataRepository.findRevenueRecordsByCreator(creatorId);

    const totalRevenue = revenueHistory.reduce((sum, record) => sum + (record.creator_share || 0), 0);
    const averageShare = revenueHistory.length > 0
      ? revenueHistory.reduce((sum, record) => sum + (record.creator_share || 0), 0) / revenueHistory.length
      : 0;

    const empowermentMetrics = {
      totalCreatorRevenue: totalRevenue,
      averageCreatorShare: averageShare,
      mathematicalComplianceRate: revenueHistory.filter(r => r.creator_share >= this.MATHEMATICAL_MINIMUM).length / Math.max(revenueHistory.length, 1),
      liberationAlignment: averageShare >= this.MATHEMATICAL_MINIMUM ? 'empowered' : 'needs_liberation',
      economicJusticeScore: this.calculateEconomicJusticeLevel({ creatorShare: averageShare })
    };

    return empowermentMetrics;
  }

  /**
   * Helper: Calculate economic justice level
   */
  calculateEconomicJusticeLevel(revenueData) {
    const creatorShare = revenueData.creatorShare || 0;

    if (creatorShare >= 0.9) return 'exceptional_justice';
    if (creatorShare >= this.MATHEMATICAL_MINIMUM) return 'liberation_aligned';
    if (creatorShare >= 0.5) return 'partial_justice';
    return 'economic_oppression';
  }
}

module.exports = CreatorSovereigntyServiceImpl;
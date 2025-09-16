/**
 * Community Consent Tracking System (Layer 5 ONLY)
 * CRITICAL: Contains ONLY community consent data operations - NO governance decisions, NO infrastructure
 * 
 * LAYER SEPARATION COMPLIANCE:
 * ✅ Tracks and stores community consent data ONLY
 * ❌ NO consent governance decisions (that's Layer 4's responsibility)
 * ❌ NO infrastructure operations (delegates to Layer 6)  
 * ❌ NO consent policy logic (delegates to Layer 3)
 */

import {
  CommunityConsentTracking,
  CommunityConsentRequest,
  ConsentTrackingResult,
  CommunityConsent
} from './CommunityDataSovereigntyInterface';

/**
 * Community Consent Data Tracking System
 * RESPONSIBILITY: Tracks and stores community consent data ONLY - no consent decisions
 */
export class CommunityConsentTrackingSystem implements CommunityConsentTracking {

  /**
   * Tracks community consent status through data operations
   * DATA OPERATIONS ONLY: Stores consent tracking data - consent decisions made by Layer 4
   */
  async trackCommunityConsent(consentRequest: CommunityConsentRequest): Promise<ConsentTrackingResult> {
    // Data operation: Store consent request for tracking
    await this.storeConsentRequest(consentRequest);
    
    // Data operation: Retrieve existing consent data
    const existingConsent = await this.retrieveExistingConsent(
      consentRequest.communityId, 
      consentRequest.operationType
    );
    
    // Data validation: Check if consent exists and is valid
    const consentStatus = this.determineConsentStatus(existingConsent, consentRequest);
    
    // Data operation: Update consent tracking status
    const trackingResult = await this.updateConsentTrackingStatus(consentRequest, consentStatus);
    
    // Data operation: Store consent audit trail
    await this.storeConsentTrackingAuditTrail(consentRequest, trackingResult);

    return {
      requestId: consentRequest.requestId,
      consentStatus,
      communityId: consentRequest.communityId,
      trackingComplete: trackingResult.success,
      auditTrailStored: true
    };
  }

  /**
   * Validates consent against stored data
   * VALIDATION ONLY: Checks stored consent data - no consent decisions
   */
  async validateStoredConsent(operationType: string, communityId: string): Promise<boolean> {
    // Data retrieval: Get stored consent records
    const storedConsent = await this.retrieveStoredConsent(operationType, communityId);
    
    if (!storedConsent) {
      // No stored consent found
      return false;
    }

    // Data validation: Check consent validity
    const consentValid = this.validateConsentValidity(storedConsent);
    const consentNotExpired = this.validateConsentExpiry(storedConsent);
    const democraticApproval = this.validateDemocraticApproval(storedConsent);
    
    const isValid = consentValid && consentNotExpired && democraticApproval;
    
    // Data operation: Store validation result
    await this.storeConsentValidationResult(operationType, communityId, isValid);
    
    return isValid;
  }

  /**
   * Stores consent audit trail
   * DATA OPERATIONS ONLY: Storage operations - audit requirements determined by Layer 4
   */
  async storeConsentAuditTrail(consent: CommunityConsent): Promise<void> {
    // Create comprehensive audit record
    const auditRecord = {
      auditId: this.generateAuditId(),
      consentId: consent.consentId,
      communityId: consent.communityId,
      operationType: consent.operationType,
      action: 'consent_tracked',
      timestamp: new Date(),
      consentStatus: consent.consentStatus,
      democraticApproval: consent.democraticApproval,
      participationRate: consent.participationRate,
      approvalRate: consent.approvalRate,
      communityOwnershipMaintained: true,
      dataIntegrity: true
    };

    // Data storage operation - delegates to Layer 6
    await this.storeAuditRecord(auditRecord);
    
    // Data operation: Update consent audit trail index
    await this.updateConsentAuditIndex(consent.communityId, auditRecord.auditId);
  }

  // ===== PRIVATE DATA OPERATIONS METHODS =====

  /**
   * Stores consent request for tracking
   */
  private async storeConsentRequest(consentRequest: CommunityConsentRequest): Promise<void> {
    const requestRecord = {
      requestId: consentRequest.requestId,
      communityId: consentRequest.communityId,
      operationType: consentRequest.operationType,
      dataInvolved: consentRequest.dataInvolved,
      consentRequired: consentRequest.consentRequired,
      liberationImpact: consentRequest.liberationImpact,
      requestTimestamp: new Date(),
      trackingInitiated: true
    };

    // Data storage operation - delegates to Layer 6
    console.log(`Storing consent request for tracking:`, requestRecord);
  }

  /**
   * Retrieves existing consent data
   */
  private async retrieveExistingConsent(
    communityId: string, 
    operationType: string
  ): Promise<CommunityConsent | null> {
    // Data retrieval operation - delegates to Layer 6
    console.log(`Retrieving existing consent for community ${communityId}, operation: ${operationType}`);
    
    // Mock existing consent - real implementation delegates to Layer 6
    return {
      consentId: 'consent_001',
      communityId,
      operationType,
      consentStatus: 'granted',
      consentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      consentScope: ['data_operations', 'community_benefit'],
      democraticApproval: true,
      participationRate: 0.85, // 85% participation
      approvalRate: 0.78 // 78% approval
    };
  }

  /**
   * Determines consent status based on existing data
   */
  private determineConsentStatus(
    existingConsent: CommunityConsent | null, 
    request: CommunityConsentRequest
  ): 'granted' | 'denied' | 'pending' | 'expired' {
    if (!existingConsent) {
      return 'pending'; // No existing consent, needs community decision
    }

    // Check consent expiry
    if (this.isConsentExpired(existingConsent)) {
      return 'expired';
    }

    // Check if consent covers requested operation
    const operationCovered = existingConsent.operationType === request.operationType ||
                           existingConsent.consentScope.includes('general_operations');

    if (!operationCovered) {
      return 'pending'; // Operation not covered by existing consent
    }

    // Check liberation impact alignment
    const liberationAligned = request.liberationImpact >= 0.5; // Requires moderate liberation alignment
    if (!liberationAligned && existingConsent.consentStatus === 'granted') {
      return 'pending'; // High-risk operation requires new consent even if general consent exists
    }

    return existingConsent.consentStatus;
  }

  /**
   * Updates consent tracking status
   */
  private async updateConsentTrackingStatus(
    request: CommunityConsentRequest, 
    status: 'granted' | 'denied' | 'pending' | 'expired'
  ): Promise<{ success: boolean; trackingId: string }> {
    const trackingRecord = {
      trackingId: this.generateTrackingId(),
      requestId: request.requestId,
      communityId: request.communityId,
      trackingStatus: status,
      trackingDate: new Date(),
      operationType: request.operationType,
      trackingComplete: status !== 'pending'
    };

    // Data storage operation - delegates to Layer 6
    console.log(`Updating consent tracking status:`, trackingRecord);

    return {
      success: true,
      trackingId: trackingRecord.trackingId
    };
  }

  /**
   * Stores consent tracking audit trail
   */
  private async storeConsentTrackingAuditTrail(
    request: CommunityConsentRequest, 
    result: { success: boolean; trackingId: string }
  ): Promise<void> {
    const auditRecord = {
      auditId: this.generateAuditId(),
      requestId: request.requestId,
      trackingId: result.trackingId,
      action: 'consent_tracking_completed',
      timestamp: new Date(),
      communityId: request.communityId,
      operationType: request.operationType,
      trackingSuccessful: result.success,
      communityOwnershipMaintained: true
    };

    // Data storage operation - delegates to Layer 6
    console.log(`Storing consent tracking audit trail:`, auditRecord);
  }

  /**
   * Retrieves stored consent records
   */
  private async retrieveStoredConsent(
    operationType: string, 
    communityId: string
  ): Promise<CommunityConsent | null> {
    // Data retrieval operation - delegates to Layer 6
    console.log(`Retrieving stored consent for ${operationType} in community ${communityId}`);
    
    // Mock stored consent - real implementation delegates to Layer 6
    return {
      consentId: 'stored_consent_001',
      communityId,
      operationType,
      consentStatus: 'granted',
      consentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      consentScope: ['data_operations', 'community_benefit', 'creator_support'],
      democraticApproval: true,
      participationRate: 0.82,
      approvalRate: 0.76
    };
  }

  /**
   * Validates consent record validity
   */
  private validateConsentValidity(consent: CommunityConsent): boolean {
    // Data validation: Check consent record structure and requirements
    const hasRequiredFields = consent.consentId && 
                             consent.communityId && 
                             consent.consentStatus && 
                             consent.consentDate;
    
    const hasDemocraticApproval = consent.democraticApproval === true;
    const hasMinimumParticipation = consent.participationRate >= 0.6; // 60% minimum participation
    const hasMinimumApproval = consent.approvalRate >= 0.51; // Simple majority approval
    
    return hasRequiredFields && hasDemocraticApproval && hasMinimumParticipation && hasMinimumApproval;
  }

  /**
   * Validates consent has not expired
   */
  private validateConsentExpiry(consent: CommunityConsent): boolean {
    if (consent.expiryDate) {
      return new Date() < consent.expiryDate;
    }
    
    // Default expiry: 6 months for ongoing consent
    const sixMonthsInMs = 6 * 30 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(consent.consentDate.getTime() + sixMonthsInMs);
    
    return new Date() < expiryDate;
  }

  /**
   * Validates democratic approval requirements
   */
  private validateDemocraticApproval(consent: CommunityConsent): boolean {
    // Democratic approval validation
    const democraticProcess = consent.democraticApproval;
    const adequateParticipation = consent.participationRate >= 0.6; // 60% minimum
    const majorityApproval = consent.approvalRate > 0.5; // Simple majority
    
    return democraticProcess && adequateParticipation && majorityApproval;
  }

  /**
   * Stores consent validation result
   */
  private async storeConsentValidationResult(
    operationType: string, 
    communityId: string, 
    isValid: boolean
  ): Promise<void> {
    const validationRecord = {
      validationId: this.generateValidationId(),
      operationType,
      communityId,
      validationDate: new Date(),
      isValid,
      validationCriteria: {
        recordValidity: true,
        notExpired: true,
        democraticApproval: true
      },
      communityOwnershipMaintained: isValid
    };

    // Data storage operation - delegates to Layer 6
    console.log(`Storing consent validation result:`, validationRecord);
  }

  /**
   * Checks if consent has expired
   */
  private isConsentExpired(consent: CommunityConsent): boolean {
    return !this.validateConsentExpiry(consent);
  }

  /**
   * Stores audit record
   */
  private async storeAuditRecord(auditRecord: any): Promise<void> {
    // Data storage operation - delegates to Layer 6
    console.log(`Storing consent audit record:`, auditRecord);
  }

  /**
   * Updates consent audit trail index
   */
  private async updateConsentAuditIndex(communityId: string, auditId: string): Promise<void> {
    const indexUpdate = {
      communityId,
      auditId,
      indexedDate: new Date(),
      auditType: 'consent_tracking'
    };

    // Data storage operation - delegates to Layer 6  
    console.log(`Updating consent audit index:`, indexUpdate);
  }

  // ===== ID GENERATION UTILITIES =====

  private generateAuditId(): string {
    return `consent_audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTrackingId(): string {
    return `tracking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateValidationId(): string {
    return `validation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Community Consent Data Utilities
 * RESPONSIBILITY: Utility functions for consent data operations
 */
export class CommunityConsentDataUtils {
  
  /**
   * Validates consent request format
   */
  static validateConsentRequestFormat(request: CommunityConsentRequest): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!request.requestId) errors.push('Missing request ID');
    if (!request.communityId) errors.push('Missing community ID');
    if (!request.operationType) errors.push('Missing operation type');
    if (!request.dataInvolved || request.dataInvolved.length === 0) {
      errors.push('Missing data involved specification');
    }
    if (typeof request.consentRequired !== 'boolean') errors.push('Missing consent required flag');
    if (typeof request.liberationImpact !== 'number' || 
        request.liberationImpact < 0 || 
        request.liberationImpact > 1) {
      errors.push('Invalid liberation impact score (must be 0-1)');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Calculates consent priority score for tracking prioritization
   */
  static calculateConsentPriorityScore(request: CommunityConsentRequest): number {
    let score = 0;
    
    // Liberation impact weight (40% of score)
    score += request.liberationImpact * 0.4;
    
    // Data sensitivity weight (30% of score)  
    const dataSensitivity = request.dataInvolved.length > 3 ? 0.8 : 0.5;
    score += dataSensitivity * 0.3;
    
    // Community requirement urgency (30% of score)
    const urgency = request.consentRequired ? 1.0 : 0.3;
    score += urgency * 0.3;
    
    return Math.min(score, 1);
  }

  /**
   * Generates consent summary for community review
   */
  static generateConsentSummary(consent: CommunityConsent): {
    summary: string;
    keyPoints: string[];
    democraticMetrics: {
      participation: string;
      approval: string;
      legitimacy: string;
    };
  } {
    const participationPercent = Math.round(consent.participationRate * 100);
    const approvalPercent = Math.round(consent.approvalRate * 100);
    
    const summary = `Community consent for ${consent.operationType}: ${consent.consentStatus} with ${participationPercent}% participation and ${approvalPercent}% approval.`;
    
    const keyPoints = [
      `Operation: ${consent.operationType}`,
      `Status: ${consent.consentStatus}`,
      `Democratic Process: ${consent.democraticApproval ? 'Yes' : 'No'}`,
      `Community Participation: ${participationPercent}%`,
      `Approval Rate: ${approvalPercent}%`
    ];

    const democraticMetrics = {
      participation: participationPercent >= 60 ? 'Adequate' : 'Below Threshold',
      approval: approvalPercent > 50 ? 'Majority Approved' : 'Majority Rejected',
      legitimacy: consent.democraticApproval && participationPercent >= 60 && approvalPercent > 50 ? 'Legitimate' : 'Questionable'
    };

    return {
      summary,
      keyPoints,
      democraticMetrics
    };
  }
}
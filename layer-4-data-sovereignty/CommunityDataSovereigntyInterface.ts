/**
 * Task 1.2 Layer 5: Community Data Sovereignty Interface
 * 
 * SCOPE: Interface contracts for community data operations ONLY
 * DOES NOT: Make governance decisions, handle infrastructure, or manage business logic
 * ONLY: Defines data sovereignty operations and community-controlled storage contracts
 */

import { GovernanceDecision } from '../CORRECTED_Task_1_1_Community_Governance_Layer/CommunityGovernanceInterface';

/**
 * Core community data sovereignty interface - DATA OPERATIONS ONLY
 */
export interface CommunityDataSovereigntyInterface {
  // Receives governance decisions from Layer 4 and implements through data operations
  implementGovernanceDecision(decision: GovernanceDecision): Promise<DataOperationResult>;
  
  // Community data ownership operations - storage only, no governance
  enforceDataOwnership(request: DataOwnershipRequest): Promise<DataOwnershipResult>;
  
  // Creator sovereignty data operations - implementation only, no decisions
  enforceCreatorSovereignty(request: CreatorDataRequest): Promise<CreatorDataResult>;
}

/**
 * Governance Implementation Engine interface - IMPLEMENTATION ONLY
 */
export interface GovernanceImplementationEngine {
  // Receives decisions from Layer 4
  receiveGovernanceDecision(decision: GovernanceDecision): Promise<void>;
  
  // Translates governance decisions into data operations
  translateToDataOperations(decision: GovernanceDecision): DataOperation[];
  
  // Executes data operations according to governance
  executeDataOperations(operations: DataOperation[]): Promise<DataOperationResult>;
  
  // Stores audit trail as instructed by governance
  storeGovernanceAuditTrail(operation: DataOperation, result: DataOperationResult): Promise<void>;
}

/**
 * Creator Sovereignty Enforcement Engine - DATA ENFORCEMENT ONLY
 */
export interface CreatorSovereigntyEnforcement {
  // Enforces creator data ownership - storage operations only
  enforceCreatorOwnership(contentId: string, creatorId: string): Promise<void>;
  
  // Validates 75% revenue share in data - validation only, no business logic
  validateRevenueShareData(transactionId: string): Promise<RevenueShareValidationResult>;
  
  // Stores creator consent data - storage only, no consent logic
  storeCreatorConsent(consentData: CreatorConsentData): Promise<void>;
  
  // Enforces creator data export rights - data operations only
  enforceDataExportRights(creatorId: string): Promise<CreatorDataExport>;
}

/**
 * Community Consent Tracking System - TRACKING ONLY
 */
export interface CommunityConsentTracking {
  // Tracks community consent status - storage operations only
  trackCommunityConsent(consentRequest: CommunityConsentRequest): Promise<ConsentTrackingResult>;
  
  // Validates consent against stored data - validation only, no consent decisions
  validateStoredConsent(operationType: string, communityId: string): Promise<boolean>;
  
  // Stores consent audit trail - storage only
  storeConsentAuditTrail(consent: CommunityConsent): Promise<void>;
}

/**
 * Anti-Extraction Policy Engine - POLICY ENFORCEMENT ONLY
 */
export interface AntiExtractionPolicyEnforcement {
  // Blocks extractive data requests - enforcement only, no policy decisions
  blockExtractivRequest(request: DataRequest): Promise<ExtractionBlockResult>;
  
  // Validates community benefit score - validation only, no scoring logic
  validateCommunityBenefitScore(operation: DataOperation): Promise<boolean>;
  
  // Enforces anti-extraction constraints - enforcement only
  enforceAntiExtractionConstraints(data: CommunityData): Promise<ConstraintResult>;
}

/**
 * Data operation structure
 */
export interface DataOperation {
  operationId: string;
  operationType: 'store' | 'retrieve' | 'update' | 'delete' | 'validate' | 'enforce';
  targetData: string;
  governanceInstructions: string;
  communityConsent: boolean;
  creatorSovereignty: boolean;
  antiExtractionCompliant: boolean;
  timestamp: Date;
  
  // Instructions for Layer 6 - does not implement infrastructure
  requiresInfrastructure: boolean;
  infrastructureInstructions: string;
}

/**
 * Data operation result structure
 */
export interface DataOperationResult {
  operationId: string;
  success: boolean;
  timestamp: Date;
  dataOperationsCompleted: string[];
  governanceCompliance: boolean;
  communityOwnershipMaintained: boolean;
  creatorSovereigntyProtected: boolean;
  
  // Results for audit trail
  auditTrail: DataOperationAuditRecord[];
  
  // Instructions for other layers - does not implement
  requiresNotification?: boolean;
  notificationInstructions?: string;
}

/**
 * Data ownership request structure
 */
export interface DataOwnershipRequest {
  requestId: string;
  dataType: string;
  communityId: string;
  ownershipType: 'community' | 'creator' | 'shared';
  liberationAlignment: boolean;
  timestamp: Date;
}

/**
 * Data ownership result structure
 */
export interface DataOwnershipResult {
  requestId: string;
  ownershipConfirmed: boolean;
  ownershipType: 'community' | 'creator' | 'shared';
  dataProtectionLevel: 'full' | 'partial' | 'minimal';
  communityControlMaintained: boolean;
}

/**
 * Creator data request structure
 */
export interface CreatorDataRequest {
  requestId: string;
  creatorId: string;
  dataOperation: string;
  revenueShareRequirement: number; // 0.75 minimum
  narrativeControl: boolean;
  consentProvided: boolean;
}

/**
 * Creator data result structure
 */
export interface CreatorDataResult {
  requestId: string;
  creatorId: string;
  sovereigntyMaintained: boolean;
  revenueShareEnforced: boolean;
  actualRevenueShare: number;
  narrativeControlMaintained: boolean;
  consentRespected: boolean;
}

/**
 * Revenue share validation result
 */
export interface RevenueShareValidationResult {
  transactionId: string;
  isValid: boolean;
  actualShare: number;
  requiredMinimumShare: number; // 0.75
  creatorProtected: boolean;
  violationDetails?: string[];
}

/**
 * Creator consent data structure
 */
export interface CreatorConsentData {
  consentId: string;
  creatorId: string;
  consentType: string;
  consentScope: string[];
  explicit: boolean;
  informed: boolean;
  ongoing: boolean;
  withdrawable: boolean;
  consentDate: Date;
  expiryDate?: Date;
}

/**
 * Creator data export structure
 */
export interface CreatorDataExport {
  exportId: string;
  creatorId: string;
  exportDate: Date;
  dataCategories: string[];
  revenueData: CreatorRevenueData[];
  contentData: CreatorContentData[];
  consentRecords: CreatorConsentData[];
  sovereigntyCompliance: boolean;
}

/**
 * Creator revenue data structure
 */
export interface CreatorRevenueData {
  transactionId: string;
  amount: number;
  creatorShare: number;
  communityShare: number;
  platformShare: number;
  date: Date;
  sovereigntyCompliant: boolean;
}

/**
 * Creator content data structure
 */
export interface CreatorContentData {
  contentId: string;
  contentType: string;
  narrativeControlLevel: number;
  culturalSignificance: number;
  liberationAlignment: boolean;
  creatorOwnership: boolean;
}

/**
 * Community consent request structure
 */
export interface CommunityConsentRequest {
  requestId: string;
  communityId: string;
  operationType: string;
  dataInvolved: string[];
  consentRequired: boolean;
  liberationImpact: number;
}

/**
 * Consent tracking result structure
 */
export interface ConsentTrackingResult {
  requestId: string;
  consentStatus: 'granted' | 'denied' | 'pending' | 'expired';
  communityId: string;
  trackingComplete: boolean;
  auditTrailStored: boolean;
}

/**
 * Community consent structure
 */
export interface CommunityConsent {
  consentId: string;
  communityId: string;
  operationType: string;
  consentStatus: 'granted' | 'denied' | 'pending' | 'expired';
  consentDate: Date;
  expiryDate?: Date;
  consentScope: string[];
  democraticApproval: boolean;
  participationRate: number;
  approvalRate: number;
}

/**
 * Data request structure
 */
export interface DataRequest {
  requestId: string;
  requestType: string;
  dataRequested: string[];
  requestor: string;
  purpose: string;
  communityBenefit: number; // 0-1 scale
  extractiveRisk: number; // 0-1 scale
  liberationAlignment: boolean;
}

/**
 * Extraction block result structure
 */
export interface ExtractionBlockResult {
  requestId: string;
  blocked: boolean;
  blockReason: string;
  extractiveRiskScore: number;
  communityBenefitScore: number;
  alternativeSuggestions: string[];
}

/**
 * Community data structure
 */
export interface CommunityData {
  dataId: string;
  dataType: string;
  communityOwnership: boolean;
  liberationClassification: 'empowering' | 'neutral' | 'potentially_harmful';
  extractionProtection: boolean;
  communityBenefit: number;
}

/**
 * Constraint result structure
 */
export interface ConstraintResult {
  constraintsMet: boolean;
  violatedConstraints: string[];
  communityProtected: boolean;
  extractionPrevented: boolean;
  recommendedActions: string[];
}

/**
 * Data operation audit record structure
 */
export interface DataOperationAuditRecord {
  auditId: string;
  operationId: string;
  timestamp: Date;
  operationType: string;
  governanceDecisionId: string;
  communityImpact: string;
  creatorImpact: string;
  liberationAlignment: boolean;
  dataIntegrity: boolean;
}
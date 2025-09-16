/**
 * Task 2.1 Layer 2: Community API Gateway Interface
 * 
 * SCOPE: Interface contracts for API gateway operations ONLY
 * DOES NOT: Implement business logic, handle data persistence, manage infrastructure
 * ONLY: Defines API gateway service contracts for community request routing and protection
 */

/**
 * Core Community API Gateway interface - API GATEWAY OPERATIONS ONLY
 */
export interface CommunityAPIGatewayInterface {
  // Routes community requests with liberation values
  routeCommunityRequest(request: CommunityRequest): Promise<RoutingResult>;
  
  // Authenticates community members with sovereignty protection
  authenticateCommunityMember(credentials: CommunityCredentials): Promise<AuthenticationResult>;
  
  // Enforces community protection at API boundary
  enforceCommunityProtection(request: IncomingRequest): Promise<ProtectionResult>;
}

/**
 * Community Authentication Module - AUTHENTICATION OPERATIONS ONLY
 */
export interface CommunityAuthenticationModule {
  // JWT validation with community sovereignty
  validateCommunityToken(token: string): Promise<CommunityIdentity>;
  
  // Role-based access control with liberation values
  enforceRBAC(identity: CommunityIdentity, resource: string): Promise<boolean>;
  
  // Community consent validation at API boundary
  validateConsent(identity: CommunityIdentity, dataAccess: DataAccessRequest): Promise<boolean>;
  
  // Anti-oppression identity protection
  protectIdentity(identity: CommunityIdentity): ProtectedIdentity;
  
  // Refresh community tokens with sovereignty
  refreshCommunityToken(refreshToken: string): Promise<TokenRefreshResult>;
}

/**
 * Liberation-Focused Router - ROUTING OPERATIONS ONLY
 */
export interface LiberationFocusedRouter {
  // Community values-based routing decisions
  routeWithLiberationValues(request: CommunityRequest): Promise<RoutingDecision>;
  
  // Load balancing with community protection
  balanceLoad(services: ServicePool, values: LiberationValues): ServiceSelection;
  
  // Creator-friendly routing (75% revenue share support)
  routeCreatorContent(request: CreatorRequest): Promise<CreatorRoute>;
  
  // Anti-extraction route protection
  preventExtraction(request: ExternalRequest): Promise<ProtectionDecision>;
  
  // Community member priority routing
  prioritizeCommunityMembers(requests: IncomingRequest[]): PrioritizedRequests;
}

/**
 * Community Rate Limiting Service - RATE LIMITING OPERATIONS ONLY
 */
export interface CommunityRateLimitingService {
  // Democratic rate limiting with community thresholds
  enforceRateLimit(clientId: string, endpoint: string): Promise<RateLimitResult>;
  
  // Anti-oppression rate limit protection
  protectAgainstOppression(request: IncomingRequest): Promise<OppressionProtectionResult>;
  
  // Community member rate limit benefits
  applyCommunityBenefits(identity: CommunityIdentity): RateLimitBenefits;
  
  // Creator protection from rate limiting
  protectCreatorOperations(creatorId: string, operation: CreatorOperation): Promise<CreatorProtectionResult>;
  
  // Community-agreed threshold enforcement
  enforceCommunityThresholds(thresholds: CommunityRateThresholds): Promise<void>;
}

/**
 * API Security Service - SECURITY OPERATIONS ONLY
 */
export interface APISecurityService {
  // CORS with community access control
  configureCORS(origin: string, request: CommunityRequest): CORSConfiguration;
  
  // Community data sovereignty at boundary
  enforceDataSovereignty(request: DataRequest): Promise<DataSovereigntyResult>;
  
  // Anti-surveillance request filtering
  filterSurveillanceRequests(request: IncomingRequest): Promise<SurveillanceFilterResult>;
  
  // Community consent verification
  verifyCommunityConsent(dataAccess: DataAccessRequest): Promise<ConsentVerificationResult>;
  
  // Liberation-focused security headers
  generateSecurityHeaders(identity: CommunityIdentity): SecurityHeaders;
}

/**
 * API Analytics Service - ANALYTICS OPERATIONS ONLY
 */
export interface APIAnalyticsService {
  // Community transparency metrics
  collectCommunityMetrics(request: CommunityRequest, response: APIResponse): Promise<void>;
  
  // Liberation impact tracking
  trackLiberationImpact(operation: APIOperation): Promise<LiberationImpactMetrics>;
  
  // Community protection effectiveness
  measureProtectionEffectiveness(protectionEvents: ProtectionEvent[]): ProtectionEffectivenessReport;
  
  // Creator sovereignty metrics
  trackCreatorSovereignty(creatorOperation: CreatorAPIOperation): Promise<CreatorSovereigntyMetrics>;
  
  // Democratic transparency reporting
  generateCommunityTransparencyReport(timeframe: TimeFrame): CommunityTransparencyReport;
}

/**
 * API Contract Management Service - CONTRACT OPERATIONS ONLY
 */
export interface APIContractManagementService {
  // API versioning with backward compatibility
  manageAPIVersioning(version: APIVersion, contracts: APIContract[]): VersionManagementResult;
  
  // Community-friendly contract validation
  validateCommunityContracts(contracts: CommunityAPIContract[]): ContractValidationResult;
  
  // Creator-supportive API contracts
  ensureCreatorFriendlyContracts(creatorContracts: CreatorAPIContract[]): CreatorContractResult;
  
  // Liberation values contract compliance
  validateLiberationCompliance(contract: APIContract): LiberationComplianceResult;
  
  // Community contract transparency
  generateContractTransparency(contracts: APIContract[]): ContractTransparencyReport;
}

// ===== CORE DATA STRUCTURES =====

/**
 * Community request structure
 */
export interface CommunityRequest {
  requestId: string;
  identity: CommunityIdentity;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers: Record<string, string>;
  body: any;
  timestamp: Date;
  
  // Liberation context
  liberationContext: LiberationContext;
  communityBenefit: number; // 0-1 scale
  creatorImpact: CreatorImpact;
}

/**
 * Community identity structure
 */
export interface CommunityIdentity {
  memberId: string;
  memberType: 'community_member' | 'creator' | 'organizer' | 'supporter';
  roles: CommunityRole[];
  permissions: CommunityPermission[];
  consentStatus: ConsentStatus;
  
  // Liberation context
  liberationStage: LiberationStage;
  communityContributions: CommunityContribution[];
  sovereigntyScore: number; // 0-1 scale
}

/**
 * Protected identity structure
 */
export interface ProtectedIdentity {
  publicId: string; // Non-identifying public ID
  roles: CommunityRole[];
  permissions: CommunityPermission[];
  
  // Protection metadata
  privacyLevel: 'high' | 'medium' | 'low';
  antiOppressionProtections: string[];
  surveillanceProtection: boolean;
}

/**
 * Liberation context structure
 */
export interface LiberationContext {
  stage: LiberationStage;
  values: LiberationValues;
  communityImpact: CommunityImpactAssessment;
  creatorSovereignty: CreatorSovereigntyContext;
}

/**
 * Liberation values structure
 */
export interface LiberationValues {
  blackQueerEmpowerment: boolean;
  communityLiberation: boolean;
  resistsOppression: boolean;
  strengthensCommunity: boolean;
  creatorSovereignty: boolean;
}

/**
 * Routing decision structure
 */
export interface RoutingDecision {
  targetService: string;
  targetEndpoint: string;
  routingPriority: 'high' | 'medium' | 'low';
  communityBenefitScore: number;
  
  // Liberation routing context
  liberationAligned: boolean;
  creatorProtected: boolean;
  communityProtected: boolean;
  antiExtractionValidated: boolean;
}

/**
 * Authentication result structure
 */
export interface AuthenticationResult {
  authenticated: boolean;
  identity: CommunityIdentity | null;
  protectedIdentity: ProtectedIdentity | null;
  token: string | null;
  
  // Liberation authentication context
  liberationCompliant: boolean;
  sovereigntyRespected: boolean;
  consentValidated: boolean;
  privacyProtected: boolean;
}

/**
 * Rate limit result structure
 */
export interface RateLimitResult {
  allowed: boolean;
  remainingRequests: number;
  resetTime: Date;
  rateLimitType: 'community_member' | 'creator' | 'external' | 'suspicious';
  
  // Community rate limiting context
  communityBenefitsApplied: boolean;
  democraticThreshold: boolean;
  antiOppressionProtected: boolean;
}

/**
 * Protection result structure
 */
export interface ProtectionResult {
  protected: boolean;
  protectionType: 'community_data' | 'creator_sovereignty' | 'anti_extraction' | 'anti_oppression';
  protectionActions: ProtectionAction[];
  
  // Protection effectiveness
  threatBlocked: boolean;
  communityBenefitPreserved: boolean;
  creatorRightsProtected: boolean;
}

/**
 * Creator request structure
 */
export interface CreatorRequest {
  creatorId: string;
  requestType: 'content_upload' | 'revenue_check' | 'data_export' | 'consent_update';
  contentMetadata?: CreatorContentMetadata;
  revenueRequirements?: CreatorRevenueRequirements;
  
  // Creator sovereignty context
  sovereigntyRequirements: CreatorSovereigntyRequirements;
  narrativeControl: NarrativeControlRequirements;
}

/**
 * Creator route structure
 */
export interface CreatorRoute {
  targetService: 'creator_service' | 'revenue_service' | 'content_service';
  routePriority: 'creator_priority'; // Always high priority for creators
  revenueShareProtection: boolean;
  narrativeControlPreserved: boolean;
  
  // Creator-specific routing
  sovereigntyEnforced: boolean;
  creatorBenefitsApplied: boolean;
}

/**
 * Data access request structure
 */
export interface DataAccessRequest {
  requestId: string;
  dataType: string[];
  accessPurpose: string;
  requestor: string;
  
  // Community data sovereignty
  communityConsent: boolean;
  creatorConsent: boolean;
  liberationBenefit: number; // 0-1 scale
  extractionRisk: number; // 0-1 scale
}

/**
 * Community credentials structure
 */
export interface CommunityCredentials {
  credentialType: 'password' | 'token' | 'oauth' | 'community_invite';
  identifier: string; // Email, username, or community ID
  credential: string; // Password, token, or auth code
  
  // Community context
  communityInviteCode?: string;
  creatorVerification?: boolean;
  consentProvided: boolean;
}

/**
 * Community role structure
 */
export interface CommunityRole {
  roleId: string;
  roleName: string;
  roleType: 'member' | 'creator' | 'organizer' | 'moderator' | 'admin';
  liberationFocused: boolean;
  
  // Role permissions
  permissions: CommunityPermission[];
  democraticallyAssigned: boolean;
}

/**
 * Community permission structure
 */
export interface CommunityPermission {
  permissionId: string;
  permissionName: string;
  resourceAccess: string[];
  actionAllowed: string[];
  
  // Liberation context
  liberationAligned: boolean;
  communityBeneficial: boolean;
  creatorProtective: boolean;
}

/**
 * Service pool structure
 */
export interface ServicePool {
  services: APIService[];
  loadBalancingStrategy: 'round_robin' | 'weighted' | 'community_priority' | 'liberation_focused';
  communityProtectionEnabled: boolean;
}

/**
 * API service structure
 */
export interface APIService {
  serviceId: string;
  serviceName: string;
  endpoint: string;
  healthStatus: 'healthy' | 'degraded' | 'offline';
  
  // Community service context
  communityFocused: boolean;
  liberationAligned: boolean;
  creatorFriendly: boolean;
  sovereigntyCompliant: boolean;
}

/**
 * Liberation stage enumeration
 */
export type LiberationStage = 
  | 'awareness'
  | 'awakening' 
  | 'organizing'
  | 'resistance'
  | 'liberation'
  | 'post_liberation';

/**
 * Community transparency report structure
 */
export interface CommunityTransparencyReport {
  reportId: string;
  timeframe: TimeFrame;
  
  // API usage transparency
  totalRequests: number;
  communityMemberRequests: number;
  creatorRequests: number;
  externalRequests: number;
  
  // Protection effectiveness
  threatsBlocked: number;
  extractionAttemptsBlocked: number;
  oppressionAttemptsBlocked: number;
  
  // Community benefit metrics
  communityBenefitScore: number;
  creatorSovereigntyMaintained: number;
  liberationImpactScore: number;
}
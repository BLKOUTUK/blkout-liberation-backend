/**
 * CORRECTED Layer 4: Community Governance Interface
 * 
 * SCOPE: Interface contracts for governance decisions ONLY
 * DOES NOT: Define storage, infrastructure, or business logic interfaces
 * ONLY: Defines governance decision interfaces and community assembly contracts
 */

/**
 * Core governance decision interface - DECISIONS ONLY
 */
export interface CommunityGovernanceInterface {
  // Core governance decision method - returns decision, does not implement
  makeGovernanceDecision(request: GovernanceRequest): Promise<GovernanceDecision>;
}

/**
 * Community Assembly interface - VOTING DECISIONS ONLY
 */
export interface CommunityAssembly {
  // Voting decision methods - decisions only, no storage or infrastructure
  getVoteStatus(data: CommunityData): Promise<AssemblyVoteStatus>;
  hasApproval(operationType: string): Promise<boolean>;
  conductVote(proposal: CommunityProposal): Promise<VoteResult>;
}

/**
 * Governance request structure
 */
export interface GovernanceRequest {
  operation: PlatformOperation;
  creatorAction?: CreatorAction;
  data: CommunityData;
  content?: any;
  requestId: string;
  timestamp: Date;
}

/**
 * Governance decision structure - DECISIONS ONLY
 */
export interface GovernanceDecision {
  decisionId: string;
  approved: boolean;
  timestamp: Date;
  reasons: string[];
  transparencyLevel: 'public' | 'community' | 'creators';
  communityAssemblyVote?: AssemblyVoteStatus;
  
  // Instructions for other layers - does not implement
  requiresStorage: boolean;
  storageInstructions: string;
  requiresNotification?: boolean;
  notificationInstructions?: string;
}

/**
 * Platform operation structure
 */
export interface PlatformOperation {
  operationType: string;
  liberationImpact?: {
    empowersBlackQueerness: boolean;
    advancesCommunityLiberation: boolean;
    resistsOppressionSystems: boolean;
    strengthensCommunityPower: boolean;
  };
  communityBenefit: number; // 0-1 scale
  creatorBenefit: number;   // 0-1 scale
}

/**
 * Creator action structure
 */
export interface CreatorAction {
  actionType: string;
  creatorId: string;
  revenueShare?: {
    creatorPercentage: number;
    communityPercentage: number;
  };
  narrativeControl?: {
    creatorControlPercentage: number;
  };
  consent?: {
    explicit: boolean;
    informed: boolean;
    ongoing: boolean;
    withdrawable: boolean;
  };
}

/**
 * Community data structure
 */
export interface CommunityData {
  dataType: string;
  operationType: string;
  requiresCommunityConsent: boolean;
  affectsCreators: boolean;
  liberationClassification: 'empowering' | 'neutral' | 'potentially_harmful';
  communityId?: string;
}

/**
 * Community proposal structure
 */
export interface CommunityProposal {
  proposalId: string;
  title: string;
  description: string;
  proposalType: 'governance_rule' | 'creator_policy' | 'community_decision';
  liberationImpact: {
    score: number; // 0-1 scale
    reasoning: string;
  };
  requiredQuorum: number;
  passingThreshold: number;
}

/**
 * Assembly vote status
 */
export interface AssemblyVoteStatus {
  voteId: string;
  status: 'approved' | 'rejected' | 'pending' | 'in_progress';
  participationRate: number;
  approvalRate: number;
  liberationScore: number;
}

/**
 * Vote result structure
 */
export interface VoteResult {
  voteId: string;
  approved: boolean;
  participationRate: number;
  approvalRate: number;
  quorumMet: boolean;
  thresholdMet: boolean;
  liberationImpactValidated: boolean;
}
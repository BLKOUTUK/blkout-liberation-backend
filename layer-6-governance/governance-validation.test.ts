/**
 * Community Governance Layer Validation Tests (Layer 4 ONLY)
 * CRITICAL: Tests ONLY governance decision logic - NO storage, NO infrastructure, NO implementation
 * 
 * Test Coverage:
 * ✅ Governance decision-making logic
 * ✅ Liberation principles validation decisions  
 * ✅ Creator sovereignty assessment decisions
 * ✅ Community assembly voting decisions
 * ✅ Layer separation compliance
 */

import {
  CommunityGovernanceService,
  GovernanceDecisionFactory
} from './CommunityGovernanceService';
import { CommunityAssemblyGovernance } from './CommunityAssemblyGovernance';
import { LiberationPrinciplesValidator } from './LiberationPrinciplesValidator';
import { CreatorSovereigntyDecisionEngine } from './CreatorSovereigntyDecisionEngine';
import {
  GovernanceRequest,
  GovernanceDecisionType,
  PlatformOperation,
  CreatorAction,
  CommunityData,
  ContentItem,
  CommunityProposal,
  LiberationPrincipleType,
  VotingRuleType,
  OppressionType
} from './CommunityGovernanceTypes';

describe('Community Governance Layer Tests', () => {
  let governanceService: CommunityGovernanceService;
  let assemblyGovernance: CommunityAssemblyGovernance;
  let liberationValidator: LiberationPrinciplesValidator;
  let sovereigntyEngine: CreatorSovereigntyDecisionEngine;
  let decisionFactory: GovernanceDecisionFactory;

  beforeEach(() => {
    liberationValidator = new LiberationPrinciplesValidator();
    sovereigntyEngine = new CreatorSovereigntyDecisionEngine();
    decisionFactory = new GovernanceDecisionFactory();
    assemblyGovernance = new CommunityAssemblyGovernance();
    
    governanceService = new CommunityGovernanceService(
      liberationValidator,
      sovereigntyEngine,
      decisionFactory
    );
  });

  describe('Liberation Principles Validation', () => {
    it('should validate high-liberation platform operation', async () => {
      const operation: PlatformOperation = {
        operationId: 'op_1',
        type: 'content_creation',
        description: 'Black queer creators empowerment platform with democratic governance and 80% creator revenue share',
        impact: {
          community: ['Black queer community', 'LGBTQ+ creators'],
          creators: ['creator_1', 'creator_2'],
          economic: {
            creatorRevenueShare: 0.8,
            communityRevenueShare: 0.15,
            platformCosts: 0.05,
            mutualAidContribution: 0.1,
            liberationInvestment: 0.05
          },
          liberation: {
            blackQueerEmpowerment: 0.9,
            communityLiberation: 0.85,
            oppressionResistance: 0.8,
            communityPowerBuilding: 0.9,
            mutualAidSupport: 0.7,
            overallLiberationScore: 0.84
          }
        },
        requiredPermissions: ['community_governance', 'creator_sovereignty']
      };

      const result = await liberationValidator.validateLiberationPrinciples(operation);

      expect(result.valid).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(0.7);
      expect(result.passedPrinciples).toContain(LiberationPrincipleType.EMPOWERS_BLACK_QUEERNESS);
      expect(result.passedPrinciples).toContain(LiberationPrincipleType.ADVANCES_COMMUNITY_LIBERATION);
      expect(result.feedback.length).toBeGreaterThan(0);
      expect(result.recommendations.length).toBeGreaterThanOrEqual(0);
    });

    it('should reject low-liberation platform operation', async () => {
      const operation: PlatformOperation = {
        operationId: 'op_2',
        type: 'content_monetization',
        description: 'Standard content platform with 50% creator revenue share',
        impact: {
          community: ['general users'],
          creators: ['creator_3'],
          economic: {
            creatorRevenueShare: 0.5,
            communityRevenueShare: 0.05,
            platformCosts: 0.45,
            mutualAidContribution: 0,
            liberationInvestment: 0
          },
          liberation: {
            blackQueerEmpowerment: 0.2,
            communityLiberation: 0.3,
            oppressionResistance: 0.1,
            communityPowerBuilding: 0.2,
            mutualAidSupport: 0.1,
            overallLiberationScore: 0.18
          }
        },
        requiredPermissions: ['content_creation']
      };

      const result = await liberationValidator.validateLiberationPrinciples(operation);

      expect(result.valid).toBe(false);
      expect(result.score).toBeLessThan(0.7);
      expect(result.failedPrinciples.length).toBeGreaterThan(0);
      expect(result.recommendations).toContain('Increase creator revenue share to 75% minimum');
    });

    it('should assess individual liberation principles correctly', async () => {
      const operation: PlatformOperation = {
        operationId: 'op_3',
        type: 'community_building',
        description: 'Black queer mutual aid and community organizing platform',
        impact: {
          community: ['Black queer community'],
          creators: ['community_organizers'],
          economic: {
            creatorRevenueShare: 0.75,
            communityRevenueShare: 0.2,
            platformCosts: 0.05,
            mutualAidContribution: 0.15,
            liberationInvestment: 0.1
          },
          liberation: {
            blackQueerEmpowerment: 0.95,
            communityLiberation: 0.9,
            oppressionResistance: 0.85,
            communityPowerBuilding: 0.9,
            mutualAidSupport: 0.95,
            overallLiberationScore: 0.91
          }
        },
        requiredPermissions: ['community_governance', 'mutual_aid']
      };

      const blackQueerScore = await liberationValidator.assessBlackQueerEmpowerment(operation);
      const communityLiberationScore = await liberationValidator.assessCommunityLiberation(operation);
      const mutualAidScore = await liberationValidator.assessMutualAidSupport(operation);

      expect(blackQueerScore).toBeGreaterThanOrEqual(0.8);
      expect(communityLiberationScore).toBeGreaterThanOrEqual(0.7);
      expect(mutualAidScore).toBeGreaterThanOrEqual(0.8);
    });
  });

  describe('Creator Sovereignty Decision Engine', () => {
    it('should approve sovereignty-compliant creator action', async () => {
      const creatorAction: CreatorAction = {
        actionId: 'action_1',
        creatorId: 'creator_1',
        actionType: 'content_monetization',
        contentImpact: {
          narrativeControl: 0.9,
          culturalSignificance: 0.8,
          communityResonance: 0.85,
          liberationMessaging: 0.9
        },
        economicImpact: {
          creatorRevenueShare: 0.8,
          communityRevenueShare: 0.15,
          platformCosts: 0.05,
          mutualAidContribution: 0.1,
          liberationInvestment: 0.05
        },
        narrativeControl: {
          creatorOwnership: true,
          editingRights: ['creator_1'],
          distributionControl: true,
          contextualFraming: 'creator-controlled',
          culturalAuthenticity: 0.95
        },
        consentStatus: {
          explicit: true,
          informed: true,
          ongoing: true,
          withdrawable: true,
          consentDate: new Date(),
          consentScope: ['content_creation', 'revenue_sharing', 'cultural_representation']
        }
      };

      const result = await sovereigntyEngine.assessCreatorSovereignty(creatorAction);

      expect(result.approved).toBe(true);
      expect(result.revenueShareCompliant).toBe(true);
      expect(result.narrativeControlMaintained).toBe(true);
      expect(result.creatorConsentObtained).toBe(true);
      expect(result.requiredActions.length).toBe(0);
    });

    it('should reject sovereignty-violating creator action', async () => {
      const creatorAction: CreatorAction = {
        actionId: 'action_2',
        creatorId: 'creator_2',
        actionType: 'content_monetization',
        contentImpact: {
          narrativeControl: 0.4, // Below 80% threshold
          culturalSignificance: 0.9,
          communityResonance: 0.7,
          liberationMessaging: 0.6
        },
        economicImpact: {
          creatorRevenueShare: 0.6, // Below 75% minimum
          communityRevenueShare: 0.1,
          platformCosts: 0.3,
          mutualAidContribution: 0,
          liberationInvestment: 0
        },
        narrativeControl: {
          creatorOwnership: false, // No creator ownership
          editingRights: ['platform_editor'],
          distributionControl: false,
          contextualFraming: 'platform-controlled',
          culturalAuthenticity: 0.3
        },
        consentStatus: {
          explicit: false, // Missing explicit consent
          informed: true,
          ongoing: false,
          withdrawable: true,
          consentDate: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000), // 400 days ago
          consentScope: ['content_creation']
        }
      };

      const result = await sovereigntyEngine.assessCreatorSovereignty(creatorAction);

      expect(result.approved).toBe(false);
      expect(result.revenueShareCompliant).toBe(false);
      expect(result.narrativeControlMaintained).toBe(false);
      expect(result.creatorConsentObtained).toBe(false);
      expect(result.requiredActions.length).toBeGreaterThan(0);
      expect(result.requiredActions).toContain('Increase creator revenue share by 15% to meet 75% minimum');
    });

    it('should validate revenue share decisions correctly', async () => {
      const economicImpact = {
        creatorRevenueShare: 0.78,
        communityRevenueShare: 0.17,
        platformCosts: 0.05,
        mutualAidContribution: 0.1,
        liberationInvestment: 0.07
      };

      const result = await sovereigntyEngine.validateRevenueShare(economicImpact);

      expect(result.approved).toBe(true);
      expect(result.currentShare).toBe(0.78);
      expect(result.requiredShare).toBe(0.75);
      expect(result.recommendations.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Community Assembly Governance', () => {
    it('should approve valid community proposal for voting', async () => {
      const proposal: CommunityProposal = {
        proposalId: 'prop_1',
        title: 'Increase Creator Revenue Share to 80%',
        description: 'Proposal to increase creator revenue share from 75% to 80% to further empower Black queer creators and strengthen creator sovereignty within our liberation-focused platform.',
        proposalType: 'governance_rule',
        proposerId: 'member_1001',
        liberationImpact: {
          blackQueerEmpowerment: 0.9,
          communityLiberation: 0.8,
          oppressionResistance: 0.7,
          communityPowerBuilding: 0.85,
          mutualAidSupport: 0.6,
          overallLiberationScore: 0.78
        },
        requiredVoteType: VotingRuleType.SUPERMAJORITY,
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
      };

      const result = await assemblyGovernance.conductCommunityVote(proposal);

      expect(result.approved).toBe(true);
      expect(result.proposalValidation.valid).toBe(true);
      expect(result.proposalValidation.liberationCompliant).toBe(true);
      expect(result.votingRules.ruleType).toBe(VotingRuleType.LIBERATION_WEIGHTED);
      expect(result.requiredQuorum).toBeGreaterThan(0);
      expect(result.passingThreshold).toBeGreaterThanOrEqual(0.6);
    });

    it('should reject invalid community proposal', async () => {
      const proposal: CommunityProposal = {
        proposalId: 'prop_2',
        title: 'Bad Prop', // Too short
        description: 'Reduce creator pay', // Too short and liberation-violating
        proposalType: 'governance_rule',
        proposerId: 'member_1002',
        liberationImpact: {
          blackQueerEmpowerment: 0.2,
          communityLiberation: 0.3,
          oppressionResistance: 0.1,
          communityPowerBuilding: 0.2,
          mutualAidSupport: 0.1,
          overallLiberationScore: 0.18
        },
        requiredVoteType: VotingRuleType.SIMPLE_MAJORITY,
        deadline: new Date(Date.now() - 1000) // Past deadline
      };

      const result = await assemblyGovernance.conductCommunityVote(proposal);

      expect(result.approved).toBe(false);
      expect(result.proposalValidation.valid).toBe(false);
      expect(result.proposalValidation.liberationCompliant).toBe(false);
      expect(result.reason).toContain('Proposal validation failed');
    });

    it('should determine appropriate voting rules', async () => {
      const votingRules = await assemblyGovernance.getVotingRules();

      expect(votingRules.ruleType).toBe(VotingRuleType.LIBERATION_WEIGHTED);
      expect(votingRules.quorumPercentage).toBeGreaterThanOrEqual(0.3);
      expect(votingRules.passingThreshold).toBeGreaterThanOrEqual(0.6);
      expect(votingRules.votingPeriodDays).toBeGreaterThanOrEqual(14);
      expect(votingRules.liberationWeighting).toBe(true);
      expect(votingRules.eligibilityRequirements).toContain('liberation_aligned');
    });
  });

  describe('Comprehensive Governance Decisions', () => {
    it('should make comprehensive governance decision with all validations', async () => {
      const governanceRequest: GovernanceRequest = {
        requestId: 'req_1',
        requestType: GovernanceDecisionType.CONTENT_APPROVAL,
        operation: {
          operationId: 'op_comprehensive',
          type: 'platform_enhancement',
          description: 'Black queer liberation-focused content platform with democratic governance, 80% creator revenue share, and anti-oppression protection',
          impact: {
            community: ['Black queer community', 'LGBTQ+ creators'],
            creators: ['creator_collective'],
            economic: {
              creatorRevenueShare: 0.8,
              communityRevenueShare: 0.15,
              platformCosts: 0.05,
              mutualAidContribution: 0.1,
              liberationInvestment: 0.05
            },
            liberation: {
              blackQueerEmpowerment: 0.9,
              communityLiberation: 0.85,
              oppressionResistance: 0.8,
              communityPowerBuilding: 0.9,
              mutualAidSupport: 0.8,
              overallLiberationScore: 0.85
            }
          },
          requiredPermissions: ['community_governance', 'creator_sovereignty', 'liberation_aligned']
        },
        creatorAction: {
          actionId: 'action_comprehensive',
          creatorId: 'creator_collective',
          actionType: 'platform_participation',
          contentImpact: {
            narrativeControl: 0.95,
            culturalSignificance: 0.9,
            communityResonance: 0.9,
            liberationMessaging: 0.95
          },
          economicImpact: {
            creatorRevenueShare: 0.8,
            communityRevenueShare: 0.15,
            platformCosts: 0.05,
            mutualAidContribution: 0.1,
            liberationInvestment: 0.05
          },
          narrativeControl: {
            creatorOwnership: true,
            editingRights: ['creator_collective'],
            distributionControl: true,
            contextualFraming: 'liberation-focused',
            culturalAuthenticity: 0.95
          },
          consentStatus: {
            explicit: true,
            informed: true,
            ongoing: true,
            withdrawable: true,
            consentDate: new Date(),
            consentScope: ['content_creation', 'revenue_sharing', 'liberation_alignment', 'community_governance']
          }
        },
        data: {
          dataId: 'data_1',
          dataType: 'community_content',
          sensitivity: 'community',
          creatorIds: ['creator_collective'],
          communityIds: ['black_queer_community'],
          consentRequired: true
        },
        content: {
          contentId: 'content_1',
          type: 'liberation_content',
          text: 'Empowering Black queer voices through democratic platform governance',
          tags: ['liberation', 'Black queer', 'democratic', 'community'],
          creatorId: 'creator_collective',
          communityContext: ['liberation_movement', 'community_empowerment']
        },
        requesterId: 'community_assembly',
        timestamp: new Date()
      };

      const result = await governanceService.makeGovernanceDecision(governanceRequest);

      expect(result.approved).toBe(true);
      expect(result.liberationPrinciples.valid).toBe(true);
      expect(result.liberationPrinciples.score).toBeGreaterThanOrEqual(0.7);
      expect(result.creatorSovereignty.approved).toBe(true);
      expect(result.communityConsent.approved).toBe(true);
      expect(result.antiOppression.safe).toBe(true);
      expect(result.reasons.length).toBeGreaterThan(0);
      expect(result.appealable).toBe(true);
    });

    it('should reject governance request with oppressive content', async () => {
      const governanceRequest: GovernanceRequest = {
        requestId: 'req_2',
        requestType: GovernanceDecisionType.CONTENT_APPROVAL,
        operation: {
          operationId: 'op_oppressive',
          type: 'content_moderation',
          description: 'Platform content with potentially harmful messaging',
          impact: {
            community: ['general users'],
            creators: ['creator_problematic'],
            economic: {
              creatorRevenueShare: 0.6,
              communityRevenueShare: 0.05,
              platformCosts: 0.35,
              mutualAidContribution: 0,
              liberationInvestment: 0
            },
            liberation: {
              blackQueerEmpowerment: 0.1,
              communityLiberation: 0.2,
              oppressionResistance: 0.0,
              communityPowerBuilding: 0.1,
              mutualAidSupport: 0.0,
              overallLiberationScore: 0.08
            }
          },
          requiredPermissions: ['content_creation']
        },
        content: {
          contentId: 'content_problematic',
          type: 'user_content',
          text: 'Content containing racist and homophobic language that violates community standards',
          tags: ['problematic'],
          creatorId: 'creator_problematic',
          communityContext: []
        },
        requesterId: 'content_moderator',
        timestamp: new Date()
      };

      const result = await governanceService.makeGovernanceDecision(governanceRequest);

      expect(result.approved).toBe(false);
      expect(result.liberationPrinciples.valid).toBe(false);
      expect(result.antiOppression.safe).toBe(false);
      expect(result.antiOppression.detectedOppression).toContain(OppressionType.RACIST);
      expect(result.antiOppression.detectedOppression).toContain(OppressionType.HOMOPHOBIC);
      expect(result.antiOppression.automaticRejection).toBe(true);
    });
  });

  describe('Layer Separation Compliance', () => {
    it('should not implement storage operations', () => {
      // Verify governance service only makes decisions, doesn't store them
      expect(() => {
        // This should throw because Layer 4 doesn't implement storage
        governanceService.getGovernanceRules();
      }).toThrow('getGovernanceRules must be implemented by injecting Layer 5 data service');
    });

    it('should return decisions without implementation', async () => {
      const operation: PlatformOperation = {
        operationId: 'layer_test',
        type: 'layer_separation_test',
        description: 'Testing layer separation compliance',
        impact: {
          community: ['test_community'],
          creators: ['test_creator'],
          economic: {
            creatorRevenueShare: 0.75,
            communityRevenueShare: 0.2,
            platformCosts: 0.05,
            mutualAidContribution: 0.1,
            liberationInvestment: 0.1
          },
          liberation: {
            blackQueerEmpowerment: 0.8,
            communityLiberation: 0.8,
            oppressionResistance: 0.7,
            communityPowerBuilding: 0.8,
            mutualAidSupport: 0.7,
            overallLiberationScore: 0.76
          }
        },
        requiredPermissions: ['test_permission']
      };

      const result = await liberationValidator.validateLiberationPrinciples(operation);

      // Should return decision object, not perform any implementation
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('recommendations');
      expect(typeof result.valid).toBe('boolean');
      expect(typeof result.score).toBe('number');
      expect(Array.isArray(result.recommendations)).toBe(true);
    });

    it('should provide clear interface contracts', () => {
      // Verify interfaces are properly defined for layer integration
      expect(governanceService.makeGovernanceDecision).toBeDefined();
      expect(governanceService.validateLiberationPrinciples).toBeDefined();
      expect(governanceService.assessCreatorSovereignty).toBeDefined();
      expect(governanceService.validateCommunityConsent).toBeDefined();
      expect(governanceService.conductCommunityVote).toBeDefined();
      
      // These should be defined but delegate to other layers
      expect(governanceService.updateGovernanceRules).toBeDefined();
      expect(governanceService.getGovernanceRules).toBeDefined();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle missing optional data gracefully', async () => {
      const governanceRequest: GovernanceRequest = {
        requestId: 'req_minimal',
        requestType: GovernanceDecisionType.LIBERATION_VALIDATION,
        operation: {
          operationId: 'op_minimal',
          type: 'minimal_operation',
          description: 'Minimal operation for testing edge cases',
          impact: {
            community: [],
            creators: [],
            economic: {
              creatorRevenueShare: 0.75,
              communityRevenueShare: 0.2,
              platformCosts: 0.05,
              mutualAidContribution: 0,
              liberationInvestment: 0
            },
            liberation: {
              blackQueerEmpowerment: 0.7,
              communityLiberation: 0.7,
              oppressionResistance: 0.7,
              communityPowerBuilding: 0.7,
              mutualAidSupport: 0.5,
              overallLiberationScore: 0.66
            }
          },
          requiredPermissions: []
        },
        // Note: No creatorAction, data, or content provided
        requesterId: 'test_requester',
        timestamp: new Date()
      };

      const result = await governanceService.makeGovernanceDecision(governanceRequest);

      expect(result).toBeDefined();
      expect(result.decisionId).toBeDefined();
      expect(result.timestamp).toBeDefined();
      expect(typeof result.approved).toBe('boolean');
    });

    it('should validate decision appealability correctly', async () => {
      const rejectedDecision = {
        decisionId: 'test_decision',
        approved: false,
        timestamp: new Date(),
        decisionType: GovernanceDecisionType.CONTENT_APPROVAL,
        liberationPrinciples: {
          valid: false,
          score: 0.65, // Borderline score
          principles: {},
          feedback: [],
          recommendations: [],
          liberationThreshold: 0.7,
          passedPrinciples: [],
          failedPrinciples: []
        },
        creatorSovereignty: {
          approved: false,
          revenueShareCompliant: true,
          narrativeControlMaintained: true,
          creatorConsentObtained: true,
          minimumRevenueShare: 0.75,
          narrativeControlScore: 0.8,
          consentScore: 0.9,
          requiredActions: []
        },
        communityConsent: {
          approved: true,
          consentType: 'explicit',
          consentLevel: 1.0,
          requiredConsent: [],
          obtainedConsent: [],
          missingConsent: []
        },
        antiOppression: {
          safe: true,
          detectedOppression: [],
          severity: 'low' as const,
          confidence: 0.3,
          recommendations: [],
          automaticRejection: false
        },
        reasons: [],
        appealable: true,
        appealDeadline: new Date()
      };

      const appealable = await governanceService.assessDecisionAppealability(rejectedDecision);
      expect(appealable).toBe(true); // Borderline liberation score should be appealable
    });
  });
});

describe('Integration Tests', () => {
  it('should integrate all governance components for complex decision', async () => {
    const liberationValidator = new LiberationPrinciplesValidator();
    const sovereigntyEngine = new CreatorSovereigntyDecisionEngine();
    const decisionFactory = new GovernanceDecisionFactory();
    const assemblyGovernance = new CommunityAssemblyGovernance();
    
    const governanceService = new CommunityGovernanceService(
      liberationValidator,
      sovereigntyEngine,
      decisionFactory
    );

    // Complex multi-step governance process
    const proposal: CommunityProposal = {
      proposalId: 'integration_test_prop',
      title: 'Comprehensive Platform Liberation Enhancement',
      description: 'Multi-faceted proposal to enhance Black queer empowerment through increased creator sovereignty, enhanced community governance, and strengthened anti-oppression measures while maintaining democratic participation and mutual aid support.',
      proposalType: 'platform_change',
      proposerId: 'community_collective',
      liberationImpact: {
        blackQueerEmpowerment: 0.95,
        communityLiberation: 0.9,
        oppressionResistance: 0.85,
        communityPowerBuilding: 0.9,
        mutualAidSupport: 0.8,
        overallLiberationScore: 0.88
      },
      requiredVoteType: VotingRuleType.LIBERATION_WEIGHTED,
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 21 days for complex proposal
    };

    // 1. Community assembly validates proposal
    const voteResult = await assemblyGovernance.conductCommunityVote(proposal);
    expect(voteResult.approved).toBe(true);
    expect(voteResult.proposalValidation.liberationCompliant).toBe(true);

    // 2. Assembly makes governance decision
    const assemblyDecision = await assemblyGovernance.makeAssemblyDecision(proposal);
    expect(assemblyDecision.liberationAligned).toBe(true);
    expect(assemblyDecision.democraticProcess).toBe(true);

    // This integration test demonstrates Layer 4's role in making governance decisions
    // while maintaining clear separation from implementation layers
  });
});
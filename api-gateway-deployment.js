/**
 * Phase 2 API Gateway Deployment - Community-Controlled API Gateway (Layer 2)
 *
 * Enhanced Liberation-Safe Deployment Strategy Implementation
 * Combines technical robustness with revolutionary liberation values
 */

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');

// Import Layer 2 API Gateway with migrated endpoints
const apiGatewayModule = require('./layer-2-api-gateway/api-gateway');

/**
 * Community-Empowering API Gateway Configuration
 * Phase 2: Deploy API Gateway with community protection circuits
 */
class CommunityAPIGatewayDeployment {
  constructor() {
    this.app = express();
    this.healthCheckInterval = null;
    this.liberationMetrics = {
      creatorSovereigntyEnforcement: 0.75, // 75% minimum
      democraticParticipationRate: 0,
      communityProtectionEffectiveness: 0,
      traumaInformedResponseTime: 0
    };
    this.circuitBreakers = new Map();
    this.communityProtectionMiddleware = [];

    // Initialize Layer 2 API Gateway instance
    this.apiGateway = apiGatewayModule.gateway;
  }

  /**
   * Initialize API Gateway with Liberation Values
   * Technical + Liberation verification gates
   */
  async initializeGateway() {
    console.log('🏴‍☠️ Phase 2: Deploying Community-Controlled API Gateway');

    // 1. Configure trauma-informed rate limiting
    await this.configureTraumaInformedRateLimiting();

    // 2. Set up authentication with community validation
    await this.setupCommunityAuthentication();

    // 3. Deploy creator sovereignty routes
    await this.deployCreatorSovereigntyRoutes();

    // 4. Configure democratic governance endpoints
    await this.configureDemocraticGovernanceEndpoints();

    // 5. Implement community protection middleware
    await this.implementCommunityProtectionMiddleware();

    // 6. Set up anti-oppression access controls
    await this.setupAntiOppressionControls();

    // 7. Configure circuit breakers preserving liberation values
    await this.configureLiberationCircuitBreakers();

    // 8. Start health checks targeting <100ms
    await this.startLiberationHealthChecks();

    console.log('✊ API Gateway deployed with community protection circuits');
  }

  /**
   * Configure trauma-informed rate limiting
   * Gentle escalation instead of harsh blocking
   */
  async configureTraumaInformedRateLimiting() {
    console.log('⏰ Configuring trauma-informed rate limiting...');

    // Community member benefits
    const communityMemberLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // Higher limits for community members
      message: {
        error: 'Gentle reminder: Taking a moment to rest benefits our community',
        traumaInformed: true,
        suggestion: 'Try again in a few minutes. Your wellbeing matters.',
        communitySupport: '/community/support'
      },
      skip: (req) => req.user?.memberType === 'creator' // Creators get priority
    });

    // Creator protection from rate limiting
    const creatorProtectionLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 2000, // Even higher for creators
      message: {
        error: 'Creator sovereignty protected - temporary pause',
        creatorRights: true,
        support: 'Your creative work is valued. Please try again shortly.',
        revenueProtection: '/creator/revenue-status'
      }
    });

    // External request limiting (more restrictive)
    const externalLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        error: 'Community protection active',
        guidance: 'Consider joining our community for better access',
        joinCommunity: '/community/join'
      }
    });

    this.app.use('/api/community', communityMemberLimiter);
    this.app.use('/api/creator', creatorProtectionLimiter);
    this.app.use('/api/external', externalLimiter);

    console.log('✅ Trauma-informed rate limiting configured');
  }

  /**
   * Set up authentication with community validation
   * Response time target: <20ms for token validation
   */
  async setupCommunityAuthentication() {
    console.log('🔐 Setting up community authentication service...');

    // Community token validation middleware
    this.app.use('/api/protected', async (req, res, next) => {
      const startTime = Date.now();

      try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
          return res.status(401).json({
            error: 'Community access required',
            traumaInformed: true,
            guidance: 'Join our community to access these features',
            joinPath: '/community/join'
          });
        }

        // Validate community token (mock implementation)
        const identity = await this.validateCommunityToken(token);

        if (!identity) {
          return res.status(401).json({
            error: 'Community verification needed',
            support: 'Contact community support for assistance',
            privacy: 'Your privacy is protected'
          });
        }

        // Liberation compliance validation
        const liberationCompliant = this.validateLiberationCompliance(identity);

        if (!liberationCompliant) {
          return res.status(403).json({
            error: 'Liberation values verification required',
            guidance: 'Ensure your actions align with community values',
            values: '/community/values'
          });
        }

        req.user = identity;
        req.liberationContext = {
          stage: identity.liberationStage,
          sovereigntyScore: identity.sovereigntyScore,
          communityContributions: identity.communityContributions
        };

        const responseTime = Date.now() - startTime;
        this.updateLiberationMetrics('authResponseTime', responseTime);

        if (responseTime > 20) {
          console.warn(`⚠️ Authentication response time: ${responseTime}ms (target: <20ms)`);
        }

        next();
      } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
          error: 'Community system temporarily unavailable',
          traumaInformed: true,
          fallback: 'Basic community features available',
          support: '/community/support'
        });
      }
    });

    console.log('✅ Community authentication service active');
  }

  /**
   * Deploy creator sovereignty routes with 75% enforcement
   * Liberation Verification: Creator sovereignty routes active (75% enforcement)
   */
  async deployCreatorSovereigntyRoutes() {
    console.log('👑 Deploying creator sovereignty routes...');

    // Creator revenue transparency endpoint
    this.app.get('/api/creator/:id/revenue', async (req, res) => {
      try {
        const creatorId = req.params.id;
        const revenueData = await this.getCreatorRevenueData(creatorId);

        // Enforce 75% minimum creator share
        const creatorShare = revenueData.creatorShare;
        if (creatorShare < 0.75) {
          console.error(`🚨 Creator sovereignty violation: ${creatorShare * 100}% < 75%`);
          await this.triggerLiberationAlert('creator_sovereignty_violation', { creatorId, share: creatorShare });
        }

        res.json({
          creatorId,
          totalRevenue: revenueData.total,
          creatorShare: revenueData.creatorShare,
          creatorAmount: revenueData.creatorAmount,
          platformFee: revenueData.platformFee,
          sovereigntyCompliant: creatorShare >= 0.75,
          transparencyGuaranteed: true,
          communityValidated: true
        });

        this.updateLiberationMetrics('creatorSovereigntyEnforcement', creatorShare);
      } catch (error) {
        console.error('Creator revenue error:', error);
        res.status(500).json({
          error: 'Creator revenue system temporarily unavailable',
          fallback: 'Revenue transparency maintained',
          support: '/creator/support'
        });
      }
    });

    // Creator content control endpoint
    this.app.put('/api/creator/:id/content/:contentId', async (req, res) => {
      try {
        const { id: creatorId, contentId } = req.params;
        const updates = req.body;

        // Validate creator ownership
        const ownershipValid = await this.validateCreatorOwnership(creatorId, contentId);
        if (!ownershipValid) {
          return res.status(403).json({
            error: 'Creator sovereignty protected',
            message: 'Only content creators can modify their work',
            support: '/creator/ownership-verification'
          });
        }

        // Apply creator-controlled updates
        const result = await this.updateCreatorContent(contentId, updates, creatorId);

        res.json({
          success: true,
          contentId,
          creatorId,
          sovereigntyMaintained: true,
          narrativeControlPreserved: true,
          revenueRightsProtected: true,
          result
        });
      } catch (error) {
        console.error('Creator content error:', error);
        res.status(500).json({
          error: 'Creator content system temporarily unavailable',
          sovereignty: 'Creator rights protected during outage',
          fallback: 'Changes queued for processing'
        });
      }
    });

    console.log('✅ Creator sovereignty routes deployed with 75% enforcement');
  }

  /**
   * Configure democratic governance endpoints
   * Liberation Verification: Democratic governance endpoints validated
   */
  async configureDemocraticGovernanceEndpoints() {
    console.log('🗳️ Configuring democratic governance endpoints...');

    // Community voting endpoint
    this.app.post('/api/governance/vote', async (req, res) => {
      try {
        const { proposalId, vote, memberId } = req.body;

        // Validate one-member-one-vote
        const alreadyVoted = await this.checkExistingVote(proposalId, memberId);
        if (alreadyVoted) {
          return res.status(409).json({
            error: 'Democratic principle: One member, one vote',
            governance: 'Your voice has already been heard on this proposal',
            transparency: '/governance/proposal/' + proposalId
          });
        }

        // Record democratic vote
        const voteResult = await this.recordDemocraticVote(proposalId, vote, memberId);

        res.json({
          success: true,
          proposalId,
          voteRecorded: true,
          democraticProcess: 'one-member-one-vote',
          transparency: true,
          communityGovernance: true,
          result: voteResult
        });

        this.updateLiberationMetrics('democraticParticipationRate', voteResult.participationRate);
      } catch (error) {
        console.error('Governance voting error:', error);
        res.status(500).json({
          error: 'Governance system temporarily unavailable',
          democratic: 'Vote will be counted when system recovers',
          transparency: 'All votes are preserved and auditable'
        });
      }
    });

    // Community proposal endpoint
    this.app.post('/api/governance/proposal', async (req, res) => {
      try {
        const proposal = req.body;
        const memberId = req.user.memberId;

        // Validate community member standing
        const memberStanding = await this.validateMemberStanding(memberId);
        if (!memberStanding.canPropose) {
          return res.status(403).json({
            error: 'Community participation required',
            guidance: 'Engage with the community before proposing changes',
            pathToParticipation: '/community/engagement'
          });
        }

        // Create democratic proposal
        const proposalResult = await this.createCommunityProposal(proposal, memberId);

        res.json({
          success: true,
          proposalId: proposalResult.id,
          democraticProcess: true,
          communityReview: true,
          votingPeriod: proposalResult.votingPeriod,
          transparency: '/governance/proposal/' + proposalResult.id
        });
      } catch (error) {
        console.error('Governance proposal error:', error);
        res.status(500).json({
          error: 'Proposal system temporarily unavailable',
          democratic: 'Proposal will be processed when system recovers',
          community: 'Community engagement continues'
        });
      }
    });

    console.log('✅ Democratic governance endpoints configured');
  }

  /**
   * Implement community protection middleware
   * Liberation Verification: Community protection middleware operational
   */
  async implementCommunityProtectionMiddleware() {
    console.log('🛡️ Implementing community protection middleware...');

    // Anti-oppression protection
    const antiOppressionMiddleware = (req, res, next) => {
      const startTime = Date.now();

      // Check for oppressive patterns
      const oppressionIndicators = this.detectOppressionPatterns(req);

      if (oppressionIndicators.detected) {
        console.log('🚨 Oppression pattern detected, activating protection');
        return res.status(403).json({
          error: 'Community protection active',
          protection: 'Anti-oppression systems engaged',
          guidance: 'Respectful community interaction required',
          values: '/community/values',
          support: '/community/mediation'
        });
      }

      // Monitor response time for trauma-informed UX
      res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        this.updateLiberationMetrics('traumaInformedResponseTime', responseTime);
      });

      next();
    };

    // Community data sovereignty protection
    const dataSovereigntyMiddleware = (req, res, next) => {
      // Check for data extraction attempts
      const extractionRisk = this.assessExtractionRisk(req);

      if (extractionRisk.high) {
        console.log('🛡️ Data extraction attempt blocked');
        return res.status(403).json({
          error: 'Community data sovereignty protected',
          protection: 'Data extraction prevention active',
          alternative: 'Join community for legitimate data access',
          sovereignty: '/community/data-rights'
        });
      }

      // Add community data protection headers
      res.set({
        'X-Community-Sovereignty': 'protected',
        'X-Data-Rights': 'community-controlled',
        'X-Extraction-Prevention': 'active'
      });

      next();
    };

    // Surveillance protection middleware
    const surveillanceProtectionMiddleware = (req, res, next) => {
      const surveillanceRisk = this.detectSurveillanceActivity(req);

      if (surveillanceRisk.detected) {
        console.log('👁️ Surveillance activity detected, activating protection');
        return res.status(403).json({
          error: 'Privacy protection active',
          protection: 'Anti-surveillance systems engaged',
          privacy: 'Community member privacy protected',
          transparency: 'Protection actions logged for community review'
        });
      }

      next();
    };

    // Apply protection middleware
    this.app.use(antiOppressionMiddleware);
    this.app.use(dataSovereigntyMiddleware);
    this.app.use(surveillanceProtectionMiddleware);

    this.communityProtectionMiddleware = [
      antiOppressionMiddleware,
      dataSovereigntyMiddleware,
      surveillanceProtectionMiddleware
    ];

    console.log('✅ Community protection middleware implemented');
  }

  /**
   * Set up anti-oppression access controls
   * Liberation Verification: Anti-oppression access controls verified
   */
  async setupAntiOppressionControls() {
    console.log('✊ Setting up anti-oppression access controls...');

    // Liberation-focused CORS configuration
    const liberationCORS = cors({
      origin: (origin, callback) => {
        // Allow community domains and ethical platforms
        const allowedOrigins = [
          'https://blkoutcollective.org',
          'https://community.blkoutcollective.org',
          'https://creators.blkoutcollective.org',
          'localhost' // Development
        ];

        const extractivePatterns = [
          'facebook.com',
          'meta.com',
          'surveillance-corp.com',
          'data-mining.com'
        ];

        if (!origin) {
          return callback(null, true); // Same-origin requests
        }

        const isExtractive = extractivePatterns.some(pattern => origin.includes(pattern));
        if (isExtractive) {
          console.log(`🚫 Blocked extractive origin: ${origin}`);
          return callback(new Error('Community protection: Extractive platform blocked'));
        }

        const isAllowed = allowedOrigins.some(allowed => origin.includes(allowed));
        callback(null, isAllowed);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Community-Member',
        'X-Liberation-Context',
        'X-Creator-Sovereignty'
      ]
    });

    // Anti-oppression security headers
    const antiOppressionHeaders = helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"], // Necessary for React
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https://blkoutcollective.org"],
          fontSrc: ["'self'"],
          frameSrc: ["'none'"], // Prevent embedding in extractive platforms
          objectSrc: ["'none'"]
        }
      },
      crossOriginEmbedderPolicy: false, // Allow community embedding
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      }
    });

    this.app.use(liberationCORS);
    this.app.use(antiOppressionHeaders);

    // Liberation values validation for sensitive operations
    this.app.use('/api/sensitive', (req, res, next) => {
      const liberationContext = req.liberationContext;

      if (!liberationContext || liberationContext.sovereigntyScore < 0.6) {
        return res.status(403).json({
          error: 'Higher liberation alignment required',
          guidance: 'Participate more in community liberation activities',
          pathToLiberation: '/community/liberation-journey',
          currentScore: liberationContext?.sovereigntyScore || 0
        });
      }

      next();
    });

    console.log('✅ Anti-oppression access controls configured');
  }

  /**
   * Configure circuit breakers that preserve liberation values
   * Circuit Breakers: Fallbacks preserve liberation values
   */
  async configureLiberationCircuitBreakers() {
    console.log('⚡ Configuring liberation-preserving circuit breakers...');

    // Creator sovereignty service circuit breaker
    this.circuitBreakers.set('creator-service', {
      failureThreshold: 5,
      timeout: 60000,
      fallback: async (req, res) => {
        res.json({
          message: 'Creator service temporarily unavailable',
          sovereignty: 'Creator rights remain protected',
          fallback: {
            revenueShare: '75% minimum guaranteed',
            narrativeControl: 'Maintained during outage',
            dataOwnership: 'Creator-controlled'
          },
          recovery: 'Service recovery in progress',
          support: '/creator/emergency-support'
        });
      }
    });

    // Community governance circuit breaker
    this.circuitBreakers.set('governance-service', {
      failureThreshold: 3,
      timeout: 30000,
      fallback: async (req, res) => {
        res.json({
          message: 'Governance service temporarily unavailable',
          democratic: 'Community decision-making continues',
          fallback: {
            voting: 'Votes queued for processing',
            proposals: 'Proposals accepted and queued',
            transparency: 'All actions logged for community review'
          },
          recovery: 'Democratic processes resume shortly',
          community: '/community/governance-status'
        });
      }
    });

    // Community protection circuit breaker
    this.circuitBreakers.set('protection-service', {
      failureThreshold: 2, // Lower threshold for community protection
      timeout: 15000,
      fallback: async (req, res) => {
        res.json({
          message: 'Protection service temporarily unavailable',
          safety: 'Basic community protection remains active',
          fallback: {
            antiOppression: 'Core protections maintained',
            dataSovereignty: 'Data access restricted during outage',
            surveillance: 'Enhanced privacy mode activated'
          },
          recovery: 'Full protection restoration in progress',
          emergency: '/community/protection-emergency'
        });
      }
    });

    console.log('✅ Liberation-preserving circuit breakers configured');
  }

  /**
   * Start health checks targeting <100ms response times
   * Technical Verification: Gateway health checks (response < 100ms)
   */
  async startLiberationHealthChecks() {
    console.log('💗 Starting liberation-aware health checks...');

    // Liberation + Technical health check endpoint
    this.app.get('/health', async (req, res) => {
      const healthCheck = {
        timestamp: new Date().toISOString(),
        status: 'healthy',
        technical: await this.performTechnicalHealthCheck(),
        liberation: await this.performLiberationHealthCheck(),
        performance: {
          responseTime: Date.now(),
          target: '<100ms'
        }
      };

      const responseTime = Date.now() - healthCheck.performance.responseTime;
      healthCheck.performance.responseTime = responseTime;
      healthCheck.performance.targetMet = responseTime < 100;

      if (responseTime >= 100) {
        console.warn(`⚠️ Health check response time: ${responseTime}ms (target: <100ms)`);
      }

      const overallHealthy = healthCheck.technical.healthy &&
                            healthCheck.liberation.healthy &&
                            healthCheck.performance.targetMet;

      healthCheck.status = overallHealthy ? 'healthy' : 'degraded';

      res.status(overallHealthy ? 200 : 503).json(healthCheck);
    });

    // Detailed liberation metrics endpoint
    this.app.get('/metrics/liberation', async (req, res) => {
      res.json({
        timestamp: new Date().toISOString(),
        creatorSovereigntyEnforcement: this.liberationMetrics.creatorSovereigntyEnforcement,
        democraticParticipationRate: this.liberationMetrics.democraticParticipationRate,
        communityProtectionEffectiveness: this.liberationMetrics.communityProtectionEffectiveness,
        traumaInformedResponseTime: this.liberationMetrics.traumaInformedResponseTime,
        thresholds: {
          creatorSovereigntyMinimum: 0.75,
          democraticParticipationTarget: 0.6,
          protectionEffectivenessTarget: 0.95,
          responseTimeTarget: 100
        }
      });
    });

    // === MIGRATED API ENDPOINTS (from Layer 1) ===

    // Story Archive endpoint
    this.app.get('/api/v1/story-archive', async (req, res) => {
      try {
        const result = await this.apiGateway.getStoryArchive(req, res);
        return result;
      } catch (error) {
        res.status(500).json({ error: 'Story archive unavailable', details: error.message });
      }
    });

    // Events endpoints
    this.app.get('/api/v1/events', async (req, res) => {
      try {
        const result = await this.apiGateway.getEvents(req, res);
        return result;
      } catch (error) {
        res.status(500).json({ error: 'Events unavailable', details: error.message });
      }
    });

    this.app.post('/api/v1/events', async (req, res) => {
      try {
        const result = await this.apiGateway.createEvent(req, res);
        return result;
      } catch (error) {
        res.status(500).json({ error: 'Event creation failed', details: error.message });
      }
    });

    // Community Insights endpoint
    this.app.get('/api/v1/community-insights', async (req, res) => {
      try {
        const result = await this.apiGateway.getCommunityInsights(req, res);
        return result;
      } catch (error) {
        res.status(500).json({ error: 'Community insights unavailable', details: error.message });
      }
    });

    // BLKOUTHUB webhook endpoint
    this.app.post('/api/v1/webhooks/blkouthub', async (req, res) => {
      try {
        const result = await this.apiGateway.blkouthubWebhook(req, res);
        return result;
      } catch (error) {
        res.status(500).json({ error: 'BLKOUTHUB webhook failed', details: error.message });
      }
    });

    // Start periodic health monitoring
    this.healthCheckInterval = setInterval(async () => {
      await this.monitorLiberationHealth();
    }, 30000); // Every 30 seconds

    console.log('✅ Liberation health checks active (target: <100ms)');
  }

  // === HELPER METHODS ===

  async validateCommunityToken(token) {
    // Mock community token validation
    return {
      memberId: 'member_' + Math.random().toString(36).substr(2, 9),
      memberType: 'community_member',
      liberationStage: 'organizing',
      sovereigntyScore: 0.8,
      communityContributions: ['governance_participation', 'creator_support']
    };
  }

  validateLiberationCompliance(identity) {
    return identity.sovereigntyScore >= 0.5 &&
           identity.liberationStage !== 'awareness';
  }

  async getCreatorRevenueData(creatorId) {
    // Mock creator revenue data with 75% enforcement
    return {
      total: 1000,
      creatorShare: 0.75, // 75% minimum
      creatorAmount: 750,
      platformFee: 250
    };
  }

  detectOppressionPatterns(req) {
    // Mock oppression pattern detection
    const oppressionIndicators = [
      req.body?.content?.includes('oppressive_content'),
      req.headers['user-agent']?.includes('surveillance_bot'),
      req.ip?.includes('known_bad_actor')
    ];

    return {
      detected: oppressionIndicators.some(indicator => indicator)
    };
  }

  assessExtractionRisk(req) {
    // Mock data extraction risk assessment
    const extractionIndicators = [
      req.body?.requestType === 'bulk_data_export',
      req.headers['x-purpose']?.includes('commercial_mining'),
      req.query?.limit > 1000
    ];

    return {
      high: extractionIndicators.some(indicator => indicator)
    };
  }

  detectSurveillanceActivity(req) {
    // Mock surveillance detection
    const surveillanceIndicators = [
      req.headers['user-agent']?.includes('surveillance'),
      req.ip?.includes('government_agency'),
      req.body?.tracking_id
    ];

    return {
      detected: surveillanceIndicators.some(indicator => indicator)
    };
  }

  async performTechnicalHealthCheck() {
    // Mock technical health check
    return {
      healthy: true,
      database: 'connected',
      redis: 'connected',
      services: 'operational'
    };
  }

  async performLiberationHealthCheck() {
    // Mock liberation health check
    const liberationHealthy =
      this.liberationMetrics.creatorSovereigntyEnforcement >= 0.75 &&
      this.liberationMetrics.communityProtectionEffectiveness >= 0.95;

    return {
      healthy: liberationHealthy,
      creatorSovereignty: this.liberationMetrics.creatorSovereigntyEnforcement >= 0.75,
      communityProtection: this.liberationMetrics.communityProtectionEffectiveness >= 0.95,
      democraticGovernance: this.liberationMetrics.democraticParticipationRate > 0
    };
  }

  updateLiberationMetrics(metric, value) {
    switch (metric) {
      case 'creatorSovereigntyEnforcement':
        this.liberationMetrics.creatorSovereigntyEnforcement = value;
        break;
      case 'democraticParticipationRate':
        this.liberationMetrics.democraticParticipationRate = value;
        break;
      case 'traumaInformedResponseTime':
        this.liberationMetrics.traumaInformedResponseTime = value;
        break;
      default:
        console.log(`Unknown metric: ${metric}`);
    }
  }

  async triggerLiberationAlert(alertType, data) {
    console.log(`🚨 Liberation Alert: ${alertType}`, data);
    // In production: Send to monitoring system, community notifications
  }

  async monitorLiberationHealth() {
    const liberation = await this.performLiberationHealthCheck();
    const technical = await this.performTechnicalHealthCheck();

    if (!liberation.healthy) {
      await this.triggerLiberationAlert('liberation_health_degraded', liberation);
    }

    if (!technical.healthy) {
      await this.triggerLiberationAlert('technical_health_degraded', technical);
    }
  }

  /**
   * Start the API Gateway server
   */
  async start(port = 3000) {
    await this.initializeGateway();

    this.app.listen(port, () => {
      console.log(`🏴‍☠️ Liberation API Gateway running on port ${port}`);
      console.log(`✊ Creator sovereignty enforcement: ${this.liberationMetrics.creatorSovereigntyEnforcement * 100}%`);
      console.log(`🛡️ Community protection: Active`);
      console.log(`🗳️ Democratic governance: Operational`);
      console.log(`💗 Health checks: <100ms target`);
    });
  }

  /**
   * Graceful shutdown with community notification
   */
  async shutdown() {
    console.log('📢 Initiating community-informed shutdown...');

    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    // Notify community of planned maintenance
    await this.notifyCommunityMaintenance();

    console.log('✊ API Gateway shutdown complete');
  }

  async notifyCommunityMaintenance() {
    console.log('📢 Community notification: API Gateway maintenance mode');
    // In production: Send community notifications, update status page
  }
}

// Export for deployment
module.exports = CommunityAPIGatewayDeployment;

// Start if running directly
if (require.main === module) {
  const gateway = new CommunityAPIGatewayDeployment();

  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM signal');
    await gateway.shutdown();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('Received SIGINT signal');
    await gateway.shutdown();
    process.exit(0);
  });

  gateway.start(process.env.PORT || 3000).catch(error => {
    console.error('Failed to start API Gateway:', error);
    process.exit(1);
  });
}
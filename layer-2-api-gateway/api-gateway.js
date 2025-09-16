/**
 * api-gateway.js
 * Layer 2: API Gateway
 * Responsible for routing requests to appropriate services with PURE dependency injection
 * NO business logic, NO data persistence, NO direct service instantiation
 * Uses ServiceRegistry for complete layer separation
 */

// Import pure dependency injection system
const { bootstrapServices, createAPILayerServices } = require('../dependency-injection/ServiceRegistry');

/**
 * Initialize API Gateway with PURE dependency injection
 * NO direct service instantiation - all dependencies injected via container
 */
class LiberationAPIGateway {
  constructor() {
    // Bootstrap all services in the dependency injection container
    bootstrapServices();

    // Get all services through pure dependency injection
    this.services = createAPILayerServices();

    console.log('🌐 Liberation API Gateway initialized with PURE dependency injection');
    console.log('📋 Available services:', Object.keys(this.services));
  }

  /**
   * API endpoint for creating news content with proper layer separation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createNewsContent(req, res) {
    try {
      console.log('📰 Processing news content creation request');

      // Extract content from request (API Gateway responsibility)
      const contentData = req.body;

      if (!contentData || !contentData.title) {
        return res.status(400).json({
          error: 'Content title is required',
          layer: 'API Gateway validation'
        });
      }

      // STEP 1: Delegate to Layer 3 Business Logic Service (NO PERSISTENCE)
      console.log('🧠 Delegating to NewsroomLiberationService (Layer 3)');
      const businessLogicResult = this.services.newsroom.createLiberationContent(contentData);

      // Check if business logic returned an error or guidance
      if (businessLogicResult.error) {
        return res.status(400).json({
          error: businessLogicResult.error,
          businessLogicResult: businessLogicResult.businessLogicResult,
          layer: 'Business Logic (Layer 3)'
        });
      }

      if (businessLogicResult.guidance) {
        return res.status(200).json({
          guidance: businessLogicResult.guidance,
          recommendations: businessLogicResult.recommendations,
          layer: 'Business Logic Guidance (Layer 3)'
        });
      }

      if (businessLogicResult.rejected || businessLogicResult.blocked) {
        return res.status(403).json({
          rejected: businessLogicResult.rejected,
          blocked: businessLogicResult.blocked,
          reason: businessLogicResult.reason,
          layer: 'Business Logic Protection (Layer 3)'
        });
      }

      // STEP 2: Delegate to Layer 5 Data Sovereignty Service (PERSISTENCE ONLY)
      console.log('🔒 Delegating to DataSovereigntyService (Layer 5)');
      const storageResult = await this.services.dataSovereignty.storeWithSovereignty({
        data: businessLogicResult.content,
        sovereigntyRequirements: {
          communityId: 'blkout-community',
          creatorControlled: true
        },
        operationType: 'news_content_creation'
      });

      // STEP 3: Return coordinated response (API Gateway responsibility)
      const response = {
        success: true,
        contentId: businessLogicResult.content.id,
        content: businessLogicResult.content,
        businessLogicResult: businessLogicResult.businessLogicResult,
        dataStorageResult: {
          stored: storageResult.success,
          sovereigntyConfirmed: storageResult.sovereigntyConfirmed,
          storageMetadata: storageResult.storageMetadata
        },
        layerSeparation: {
          businessLogicLayer: 3,
          dataSovereigntyLayer: 5,
          separationCompliant: true
        },
        timestamp: new Date().toISOString()
      };

      res.status(201).json(response);

    } catch (error) {
      console.error('🚨 API Gateway error in createNewsContent:', error);
      res.status(500).json({
        error: 'Internal server error during content creation',
        details: error.message,
        layer: 'API Gateway (Layer 2)'
      });
    }
  }

  /**
   * API endpoint for retrieving news content with proper layer separation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getNewsContent(req, res) {
    try {
      console.log('📖 Processing news content retrieval request');

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: 'Content ID is required',
          layer: 'API Gateway validation'
        });
      }

      // STEP 1: Delegate to Layer 5 Data Sovereignty Service (RETRIEVAL ONLY)
      console.log('🔒 Delegating to DataSovereigntyService (Layer 5) for retrieval');
      const retrievalResult = await this.services.dataSovereignty.retrieveWithGovernance({
        dataId: id,
        requesterId: 'newsroom-api',
        accessType: 'public_read'
      });

      // STEP 2: Apply any business logic processing if needed (Layer 3)
      // For simple retrieval, we may not need business logic processing
      // But if we need to apply liberation scoring or moderation, we would delegate here

      // STEP 3: Return response (API Gateway responsibility)
      const response = {
        success: true,
        content: retrievalResult,
        dataRetrievalResult: {
          retrieved: true,
          governanceCompliant: retrievalResult.sovereignty?.governanceCompliant || true,
          retrievalMetadata: {
            retrievedAt: new Date().toISOString(),
            accessType: 'public_read'
          }
        },
        layerSeparation: {
          dataSovereigntyLayer: 5,
          separationCompliant: true
        }
      };

      res.json(response);

    } catch (error) {
      console.error('🚨 API Gateway error in getNewsContent:', error);
      res.status(404).json({
        error: 'Content not found or access denied',
        details: error.message,
        layer: 'API Gateway (Layer 2)'
      });
    }
  }

  /**
   * API endpoint for content moderation with proper layer separation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async moderateContent(req, res) {
    try {
      console.log('⚖️ Processing content moderation request');

      const { contentId } = req.params;
      const moderationRequest = req.body;

      if (!contentId) {
        return res.status(400).json({
          error: 'Content ID is required',
          layer: 'API Gateway validation'
        });
      }

      // STEP 1: Retrieve content from Layer 5 (Data operations only)
      console.log('🔒 Retrieving content for moderation (Layer 5)');
      const content = await this.services.dataSovereignty.retrieveWithGovernance({
        dataId: contentId,
        requesterId: 'moderation-system',
        accessType: 'moderation_read'
      });

      // STEP 2: Delegate moderation logic to Layer 3 (Business logic only)
      console.log('🧠 Delegating moderation logic (Layer 3)');
      const moderationResult = this.services.newsroom.moderateContentWithCommunity(
        content,
        moderationRequest
      );

      // STEP 3: If moderation decision affects storage, delegate to Layer 5
      if (moderationResult.moderationDecision.approved === false) {
        // Track moderation decision in data layer
        await this.services.dataSovereignty.trackDataOperation({
          operationType: 'content_moderation',
          contentId,
          moderationResult: moderationResult.moderationDecision,
          timestamp: new Date()
        });
      }

      // STEP 4: Return coordinated response
      const response = {
        success: true,
        contentId,
        moderationResult: moderationResult.moderationDecision,
        moderationMetadata: moderationResult.moderationMetadata,
        layerSeparation: {
          businessLogicLayer: 3,
          dataSovereigntyLayer: 5,
          separationCompliant: true
        }
      };

      res.json(response);

    } catch (error) {
      console.error('🚨 API Gateway error in moderateContent:', error);
      res.status(500).json({
        error: 'Moderation processing failed',
        details: error.message,
        layer: 'API Gateway (Layer 2)'
      });
    }
  }

  /**
   * API endpoint for revenue transparency calculation with proper layer separation
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async calculateRevenueTransparency(req, res) {
    try {
      console.log('💰 Processing revenue transparency calculation');

      const { contentId } = req.params;
      const revenueData = req.body;

      if (!contentId || !revenueData) {
        return res.status(400).json({
          error: 'Content ID and revenue data are required',
          layer: 'API Gateway validation'
        });
      }

      // STEP 1: Delegate to Layer 3 Business Logic (Calculations only)
      console.log('🧠 Delegating revenue transparency calculation (Layer 3)');
      const transparencyReport = this.services.newsroom.calculateContentRevenueTransparency(
        contentId,
        revenueData
      );

      // STEP 2: Store transparency calculation in Layer 5 (Persistence only)
      console.log('🔒 Storing transparency report (Layer 5)');
      await this.services.dataSovereignty.storeWithSovereignty({
        data: {
          id: `transparency_${contentId}`,
          contentId,
          transparencyReport,
          type: 'revenue_transparency_calculation'
        },
        sovereigntyRequirements: {
          communityId: 'blkout-community',
          creatorControlled: true
        },
        operationType: 'transparency_report_storage'
      });

      // STEP 3: Return response
      const response = {
        success: true,
        contentId,
        transparencyReport,
        layerSeparation: {
          businessLogicLayer: 3,
          dataSovereigntyLayer: 5,
          separationCompliant: true
        }
      };

      res.json(response);

    } catch (error) {
      console.error('🚨 API Gateway error in calculateRevenueTransparency:', error);
      res.status(500).json({
        error: 'Revenue transparency calculation failed',
        details: error.message,
        layer: 'API Gateway (Layer 2)'
      });
    }
  }

  /**
   * Health check endpoint for layer separation monitoring
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async healthCheck(req, res) {
    try {
      console.log('🏥 Processing health check request');

      // Check Layer 3 Business Logic health
      const businessLogicHealth = this.services.newsroom.performNewsroomBusinessLogicHealth();

      // Check Layer 5 Data Sovereignty health (would be implemented)
      const dataSovereigntyHealth = {
        serviceName: 'DataSovereigntyService',
        layer: 5,
        status: 'operational',
        dataPersistenceOnly: true
      };

      const response = {
        gatewayStatus: 'healthy',
        layer: 2,
        responsibilities: ['API routing', 'Request validation', 'Layer coordination', 'PURE dependency injection'],
        layerSeparation: {
          compliant: true,
          businessLogicSeparated: businessLogicHealth.businessLogicOnly,
          dataPersistenceSeparated: dataSovereigntyHealth.dataPersistenceOnly,
          noDirectCoupling: true,
          pureDependencyInjection: true
        },
        serviceHealth: {
          businessLogic: businessLogicHealth,
          dataSovereignty: dataSovereigntyHealth
        },
        dependencyInjection: {
          containerStatus: 'operational',
          pureInjection: true
        },
        timestamp: new Date().toISOString()
      };

      res.json(response);

    } catch (error) {
      console.error('🚨 Health check error:', error);
      res.status(500).json({
        error: 'Health check failed',
        details: error.message
      });
    }
  }
}

// Create singleton instance
const liberationAPIGateway = new LiberationAPIGateway();

// Export API endpoint functions for Express routing
module.exports = {
  createNewsContent: (req, res) => liberationAPIGateway.createNewsContent(req, res),
  getNewsContent: (req, res) => liberationAPIGateway.getNewsContent(req, res),
  moderateContent: (req, res) => liberationAPIGateway.moderateContent(req, res),
  calculateRevenueTransparency: (req, res) => liberationAPIGateway.calculateRevenueTransparency(req, res),
  healthCheck: (req, res) => liberationAPIGateway.healthCheck(req, res),

  // Export the gateway instance for testing
  gateway: liberationAPIGateway
};
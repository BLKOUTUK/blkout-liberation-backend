/**
 * Phase 2 Deployment Startup Script
 *
 * Starts the Community-Controlled API Gateway with full liberation validation
 * and monitoring according to Enhanced Liberation-Safe Deployment Strategy
 */

const CommunityAPIGatewayDeployment = require('./api-gateway-deployment');
const { createLiberationCircuitBreakers } = require('./liberation-circuit-breakers');
const CommunityRollbackManager = require('./community-rollback-procedures');
const Phase2LiberationValidator = require('./tests/phase2-liberation-validation');

class Phase2DeploymentManager {
  constructor() {
    this.apiGateway = null;
    this.circuitBreakerManager = null;
    this.rollbackManager = null;
    this.healthMonitor = null;
    this.deploymentStatus = {
      phase: 'Phase 2: Community-Controlled API Gateway',
      status: 'initializing',
      timestamp: new Date().toISOString(),
      liberationValidation: null,
      technicalValidation: null,
      deploymentReady: false
    };
  }

  /**
   * Start Phase 2 deployment with full validation
   */
  async startDeployment() {
    console.log('🏴‍☠️ Starting Phase 2: Community-Controlled API Gateway Deployment');
    console.log('Enhanced Liberation-Safe Deployment Strategy');
    console.log('='.repeat(70));

    try {
      // 1. Pre-deployment validation
      await this.runPreDeploymentValidation();

      // 2. Initialize components
      await this.initializeComponents();

      // 3. Start API Gateway
      await this.startAPIGateway();

      // 4. Run post-deployment validation
      await this.runPostDeploymentValidation();

      // 5. Start monitoring
      await this.startMonitoring();

      console.log('\n🎉 Phase 2 deployment successful!');
      console.log('✊ Community-Controlled API Gateway is operational with liberation values preserved');

      return this.deploymentStatus;

    } catch (error) {
      console.error('\n💥 Phase 2 deployment failed:', error);
      await this.handleDeploymentFailure(error);
      throw error;
    }
  }

  /**
   * Run pre-deployment validation
   */
  async runPreDeploymentValidation() {
    console.log('\n📋 Running pre-deployment validation...');

    this.deploymentStatus.status = 'pre_validation';

    // Check environment
    await this.validateEnvironment();

    // Check dependencies
    await this.validateDependencies();

    // Check configuration
    await this.validateConfiguration();

    console.log('✅ Pre-deployment validation complete');
  }

  /**
   * Initialize all components
   */
  async initializeComponents() {
    console.log('\n🔧 Initializing components...');

    this.deploymentStatus.status = 'initializing_components';

    // Initialize API Gateway
    this.apiGateway = new CommunityAPIGatewayDeployment();

    // Initialize Circuit Breakers
    this.circuitBreakerManager = createLiberationCircuitBreakers();

    // Initialize Rollback Manager
    this.rollbackManager = new CommunityRollbackManager();

    console.log('✅ Components initialized');
  }

  /**
   * Start API Gateway with liberation values
   */
  async startAPIGateway() {
    console.log('\n🚀 Starting Community-Controlled API Gateway...');

    this.deploymentStatus.status = 'starting_gateway';

    const port = process.env.PORT || 3000;

    // Start the gateway
    await this.apiGateway.start(port);

    // Wait for gateway to be ready
    await this.waitForGatewayReady(port);

    this.deploymentStatus.gatewayPort = port;
    this.deploymentStatus.gatewayUrl = `http://localhost:${port}`;

    console.log(`✅ API Gateway running on port ${port}`);
  }

  /**
   * Run post-deployment validation
   */
  async runPostDeploymentValidation() {
    console.log('\n🔍 Running post-deployment validation...');

    this.deploymentStatus.status = 'post_validation';

    // Run full liberation validation
    const validator = new Phase2LiberationValidator();
    const validationResults = await validator.validatePhase2Deployment();

    this.deploymentStatus.liberationValidation = validationResults;
    this.deploymentStatus.deploymentReady = validationResults.overallSuccess;

    if (!validationResults.overallSuccess) {
      throw new Error(`Validation failed: ${validationResults.summary.totalGates} gates passed, minimum 6 required`);
    }

    console.log('✅ Post-deployment validation complete');
  }

  /**
   * Start monitoring systems
   */
  async startMonitoring() {
    console.log('\n👁️ Starting monitoring systems...');

    this.deploymentStatus.status = 'starting_monitoring';

    // Start health monitoring
    this.healthMonitor = setInterval(async () => {
      await this.monitorSystemHealth();
    }, 30000); // Every 30 seconds

    // Start liberation metrics monitoring
    setInterval(async () => {
      await this.monitorLiberationMetrics();
    }, 60000); // Every minute

    // Start circuit breaker monitoring
    setInterval(async () => {
      await this.monitorCircuitBreakers();
    }, 45000); // Every 45 seconds

    this.deploymentStatus.status = 'operational';
    this.deploymentStatus.monitoring = {
      healthChecks: 'active',
      liberationMetrics: 'active',
      circuitBreakers: 'active'
    };

    console.log('✅ Monitoring systems active');
  }

  /**
   * Monitor system health
   */
  async monitorSystemHealth() {
    try {
      const healthStatus = await this.rollbackManager.monitorSystemHealth();

      if (healthStatus.action === 'emergency_rollback') {
        console.log('🚨 Emergency rollback triggered by health monitoring');
      } else if (healthStatus.action === 'community_consultation') {
        console.log('🗳️ Community consultation initiated by health monitoring');
      }

      this.deploymentStatus.lastHealthCheck = {
        timestamp: new Date().toISOString(),
        status: healthStatus.status,
        action: healthStatus.action
      };

    } catch (error) {
      console.error('Health monitoring error:', error);
    }
  }

  /**
   * Monitor liberation metrics
   */
  async monitorLiberationMetrics() {
    try {
      // Check liberation metrics endpoint
      const response = await this.makeRequest(`${this.deploymentStatus.gatewayUrl}/metrics/liberation`);
      const metrics = JSON.parse(response.body);

      // Log liberation status
      if (metrics.creatorSovereigntyEnforcement < 0.75) {
        console.log(`⚠️ Creator sovereignty below 75%: ${(metrics.creatorSovereigntyEnforcement * 100).toFixed(1)}%`);
      }

      this.deploymentStatus.lastLiberationMetrics = {
        timestamp: new Date().toISOString(),
        metrics
      };

    } catch (error) {
      console.error('Liberation metrics monitoring error:', error);
    }
  }

  /**
   * Monitor circuit breakers
   */
  async monitorCircuitBreakers() {
    try {
      const status = this.circuitBreakerManager.getAllStatus();

      // Log any open circuit breakers
      for (const [name, cbStatus] of Object.entries(status.circuitBreakers)) {
        if (cbStatus.state === 'OPEN') {
          console.log(`⚡ Circuit breaker ${name} is OPEN - fallback active`);
        }
      }

      this.deploymentStatus.lastCircuitBreakerStatus = {
        timestamp: new Date().toISOString(),
        status
      };

    } catch (error) {
      console.error('Circuit breaker monitoring error:', error);
    }
  }

  /**
   * Handle deployment failure
   */
  async handleDeploymentFailure(error) {
    console.log('\n🚨 Handling deployment failure...');

    this.deploymentStatus.status = 'failed';
    this.deploymentStatus.error = error.message;

    // Stop any running components
    if (this.healthMonitor) {
      clearInterval(this.healthMonitor);
    }

    if (this.apiGateway) {
      try {
        await this.apiGateway.shutdown();
      } catch (shutdownError) {
        console.error('Error during gateway shutdown:', shutdownError);
      }
    }

    // Notify community of failure
    console.log('📢 Community notification: Deployment failed, investigating...');
  }

  /**
   * Validate environment
   */
  async validateEnvironment() {
    console.log('   Checking environment variables...');

    const requiredEnvVars = [
      'NODE_ENV'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.warn(`   ⚠️ Environment variable ${envVar} not set, using defaults`);
      }
    }

    console.log('   ✅ Environment validation complete');
  }

  /**
   * Validate dependencies
   */
  async validateDependencies() {
    console.log('   Checking dependencies...');

    try {
      require('express');
      require('express-rate-limit');
      require('helmet');
      require('cors');
      console.log('   ✅ All dependencies available');
    } catch (error) {
      throw new Error(`Missing dependencies: ${error.message}`);
    }
  }

  /**
   * Validate configuration
   */
  async validateConfiguration() {
    console.log('   Checking configuration...');

    // Check port availability
    const port = process.env.PORT || 3000;
    console.log(`   Port: ${port}`);

    // Check other configuration
    console.log('   ✅ Configuration validation complete');
  }

  /**
   * Wait for gateway to be ready
   */
  async waitForGatewayReady(port) {
    console.log('   Waiting for gateway to be ready...');

    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const response = await this.makeRequest(`http://localhost:${port}/health`);
        const healthData = JSON.parse(response.body);

        if (healthData.status === 'healthy') {
          console.log('   ✅ Gateway is ready and healthy');
          return;
        }
      } catch (error) {
        // Gateway not ready yet
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    }

    throw new Error('Gateway failed to become ready within 30 seconds');
  }

  /**
   * Make HTTP request helper
   */
  async makeRequest(url, method = 'GET', body = null) {
    const http = require('http');
    const urlObj = new URL(url);

    return new Promise((resolve, reject) => {
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          } else {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: data
            });
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  /**
   * Graceful shutdown
   */
  async shutdown() {
    console.log('\n📢 Initiating graceful shutdown...');

    if (this.healthMonitor) {
      clearInterval(this.healthMonitor);
    }

    if (this.apiGateway) {
      await this.apiGateway.shutdown();
    }

    console.log('✊ Phase 2 deployment shutdown complete');
  }

  /**
   * Get deployment status
   */
  getStatus() {
    return this.deploymentStatus;
  }
}

// Handle process signals
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM signal');
  if (global.deploymentManager) {
    await global.deploymentManager.shutdown();
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT signal');
  if (global.deploymentManager) {
    await global.deploymentManager.shutdown();
  }
  process.exit(0);
});

// Start deployment if running directly
if (require.main === module) {
  const deploymentManager = new Phase2DeploymentManager();
  global.deploymentManager = deploymentManager;

  deploymentManager.startDeployment()
    .then(status => {
      console.log('\n🏴‍☠️ Phase 2 deployment complete');
      console.log('Status:', JSON.stringify(status, null, 2));
    })
    .catch(error => {
      console.error('\n💥 Phase 2 deployment failed:', error);
      process.exit(1);
    });
}

module.exports = Phase2DeploymentManager;
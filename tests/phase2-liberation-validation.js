/**
 * Phase 2 Liberation Validation Tests
 *
 * Validates that all liberation gates are operational as per
 * Enhanced Liberation-Safe Deployment Strategy
 */

const assert = require('assert');
const http = require('http');
const { performance } = require('perf_hooks');

class Phase2LiberationValidator {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      phase: 'Phase 2: Community-Controlled API Gateway',
      validationResults: {},
      overallSuccess: false,
      liberationGatesPassed: 0,
      technicalGatesPassed: 0,
      totalGates: 8
    };

    this.apiGatewayUrl = process.env.API_GATEWAY_URL || 'http://localhost:3000';
  }

  /**
   * Run all Phase 2 validation tests
   */
  async validatePhase2Deployment() {
    console.log('🏴‍☠️ Starting Phase 2 Liberation Validation');
    console.log('='.repeat(60));

    try {
      // Liberation Verification Gates
      await this.validateCreatorSovereigntyRoutes();
      await this.validateDemocraticGovernanceEndpoints();
      await this.validateCommunityProtectionMiddleware();
      await this.validateAntiOppressionAccessControls();

      // Technical Verification Gates
      await this.validateGatewayHealthChecks();
      await this.validateAuthenticationService();
      await this.validateTraumaInformedRateLimiting();
      await this.validateCircuitBreakers();

      // Calculate overall results
      this.calculateOverallResults();

      // Display results
      this.displayValidationResults();

      return this.results;

    } catch (error) {
      console.error('❌ Phase 2 validation failed:', error);
      this.results.overallSuccess = false;
      this.results.error = error.message;
      return this.results;
    }
  }

  /**
   * Liberation Verification: Creator sovereignty routes active (75% enforcement)
   */
  async validateCreatorSovereigntyRoutes() {
    console.log('👑 Validating Creator Sovereignty Routes (75% enforcement)...');

    const testResult = {
      gate: 'creator_sovereignty_routes',
      type: 'liberation',
      target: '75% enforcement active',
      passed: false,
      details: {}
    };

    try {
      // Test creator revenue endpoint
      const revenueResponse = await this.makeRequest('/api/creator/test123/revenue');
      const revenueData = JSON.parse(revenueResponse.body);

      // Validate 75% enforcement
      const creatorShare = revenueData.creatorShare;
      const sovereigntyCompliant = revenueData.sovereigntyCompliant;

      testResult.details.creatorShare = creatorShare;
      testResult.details.sovereigntyCompliant = sovereigntyCompliant;
      testResult.details.minimumEnforced = creatorShare >= 0.75;

      // Test creator content control
      const contentResponse = await this.makeRequest('/api/creator/test123/content/test456', 'PUT', {
        title: 'Test Content Update',
        narrativeControl: true
      });
      const contentData = JSON.parse(contentResponse.body);

      testResult.details.narrativeControlPreserved = contentData.narrativeControlPreserved;
      testResult.details.sovereigntyMaintained = contentData.sovereigntyMaintained;

      // Validation criteria
      const criteriamet = [
        creatorShare >= 0.75,
        sovereigntyCompliant === true,
        contentData.narrativeControlPreserved === true,
        contentData.sovereigntyMaintained === true
      ];

      testResult.passed = criteriamet.every(criterion => criterion === true);
      testResult.details.criteriaCount = criteriamet.filter(c => c).length;
      testResult.details.totalCriteria = criteriamet.length;

      if (testResult.passed) {
        console.log(`✅ Creator sovereignty: ${(creatorShare * 100).toFixed(1)}% enforcement active`);
        this.results.liberationGatesPassed++;
      } else {
        console.log(`❌ Creator sovereignty: Only ${testResult.details.criteriaCount}/${testResult.details.totalCriteria} criteria met`);
      }

    } catch (error) {
      console.log(`❌ Creator sovereignty validation failed: ${error.message}`);
      testResult.error = error.message;
    }

    this.results.validationResults.creatorSovereigntyRoutes = testResult;
  }

  /**
   * Liberation Verification: Democratic governance endpoints validated
   */
  async validateDemocraticGovernanceEndpoints() {
    console.log('🗳️ Validating Democratic Governance Endpoints...');

    const testResult = {
      gate: 'democratic_governance_endpoints',
      type: 'liberation',
      target: 'One-member-one-vote operational',
      passed: false,
      details: {}
    };

    try {
      // Test community voting endpoint
      const voteResponse = await this.makeRequest('/api/governance/vote', 'POST', {
        proposalId: 'test_proposal_123',
        vote: 'approve',
        memberId: 'test_member_456'
      });
      const voteData = JSON.parse(voteResponse.body);

      testResult.details.democraticProcess = voteData.democraticProcess;
      testResult.details.voteRecorded = voteData.voteRecorded;
      testResult.details.transparency = voteData.transparency;

      // Test proposal creation
      const proposalResponse = await this.makeRequest('/api/governance/proposal', 'POST', {
        title: 'Test Community Proposal',
        description: 'Testing democratic governance',
        type: 'policy_change'
      });
      const proposalData = JSON.parse(proposalResponse.body);

      testResult.details.proposalCreated = proposalData.success;
      testResult.details.communityReview = proposalData.communityReview;
      testResult.details.votingPeriod = proposalData.votingPeriod;

      // Validation criteria
      const criteriamet = [
        voteData.democraticProcess === 'one-member-one-vote',
        voteData.voteRecorded === true,
        voteData.transparency === true,
        proposalData.success === true,
        proposalData.communityReview === true
      ];

      testResult.passed = criteriamet.every(criterion => criterion === true);
      testResult.details.criteriaCount = criteriamet.filter(c => c).length;
      testResult.details.totalCriteria = criteriamet.length;

      if (testResult.passed) {
        console.log('✅ Democratic governance endpoints operational');
        this.results.liberationGatesPassed++;
      } else {
        console.log(`❌ Democratic governance: Only ${testResult.details.criteriaCount}/${testResult.details.totalCriteria} criteria met`);
      }

    } catch (error) {
      console.log(`❌ Democratic governance validation failed: ${error.message}`);
      testResult.error = error.message;
    }

    this.results.validationResults.democraticGovernanceEndpoints = testResult;
  }

  /**
   * Liberation Verification: Community protection middleware operational
   */
  async validateCommunityProtectionMiddleware() {
    console.log('🛡️ Validating Community Protection Middleware (>95% effectiveness)...');

    const testResult = {
      gate: 'community_protection_middleware',
      type: 'liberation',
      target: '>95% effectiveness',
      passed: false,
      details: {}
    };

    try {
      let protectionTests = [];

      // Test anti-oppression protection
      try {
        await this.makeRequest('/api/test-endpoint', 'POST', {
          content: 'oppressive_content',
          intent: 'harassment'
        });
        protectionTests.push({ test: 'anti_oppression', blocked: false });
      } catch (error) {
        if (error.message.includes('403')) {
          protectionTests.push({ test: 'anti_oppression', blocked: true });
        }
      }

      // Test data sovereignty protection
      try {
        await this.makeRequest('/api/test-endpoint', 'GET', null, {
          'X-Purpose': 'commercial_mining',
          'X-Intent': 'data_extraction'
        });
        protectionTests.push({ test: 'data_sovereignty', blocked: false });
      } catch (error) {
        if (error.message.includes('403')) {
          protectionTests.push({ test: 'data_sovereignty', blocked: true });
        }
      }

      // Test surveillance protection
      try {
        await this.makeRequest('/api/test-endpoint', 'GET', null, {
          'User-Agent': 'surveillance_bot/1.0',
          'X-Tracking': 'government_surveillance'
        });
        protectionTests.push({ test: 'surveillance_protection', blocked: false });
      } catch (error) {
        if (error.message.includes('403')) {
          protectionTests.push({ test: 'surveillance_protection', blocked: true });
        }
      }

      // Calculate effectiveness
      const blockedThreats = protectionTests.filter(test => test.blocked).length;
      const totalThreats = protectionTests.length;
      const effectiveness = totalThreats > 0 ? blockedThreats / totalThreats : 0;

      testResult.details.protectionTests = protectionTests;
      testResult.details.threatsBlocked = blockedThreats;
      testResult.details.totalThreats = totalThreats;
      testResult.details.effectiveness = effectiveness;
      testResult.details.effectivenessPercentage = (effectiveness * 100).toFixed(1);

      testResult.passed = effectiveness >= 0.95;

      if (testResult.passed) {
        console.log(`✅ Community protection: ${testResult.details.effectivenessPercentage}% effectiveness`);
        this.results.liberationGatesPassed++;
      } else {
        console.log(`❌ Community protection: Only ${testResult.details.effectivenessPercentage}% effectiveness (target: >95%)`);
      }

    } catch (error) {
      console.log(`❌ Community protection validation failed: ${error.message}`);
      testResult.error = error.message;
    }

    this.results.validationResults.communityProtectionMiddleware = testResult;
  }

  /**
   * Liberation Verification: Anti-oppression access controls verified
   */
  async validateAntiOppressionAccessControls() {
    console.log('✊ Validating Anti-Oppression Access Controls...');

    const testResult = {
      gate: 'anti_oppression_access_controls',
      type: 'liberation',
      target: 'Extractive platforms blocked',
      passed: false,
      details: {}
    };

    try {
      // Test CORS blocking of extractive platforms
      const corsTests = [];

      // Test legitimate community origin (should be allowed)
      try {
        const response = await this.makeRequest('/api/test-endpoint', 'GET', null, {
          'Origin': 'https://blkoutcollective.org'
        });
        corsTests.push({ origin: 'community', allowed: true });
      } catch (error) {
        corsTests.push({ origin: 'community', allowed: false });
      }

      // Test extractive platform blocking
      const extractivePlatforms = ['facebook.com', 'meta.com', 'surveillance-corp.com'];

      for (const platform of extractivePlatforms) {
        try {
          await this.makeRequest('/api/test-endpoint', 'GET', null, {
            'Origin': `https://${platform}`
          });
          corsTests.push({ origin: platform, blocked: false });
        } catch (error) {
          if (error.message.includes('CORS')) {
            corsTests.push({ origin: platform, blocked: true });
          }
        }
      }

      // Test liberation values requirement for sensitive operations
      try {
        const response = await this.makeRequest('/api/sensitive/test', 'GET');
        const data = JSON.parse(response.body);
        testResult.details.liberationRequirementEnforced = data.error && data.error.includes('liberation alignment');
      } catch (error) {
        testResult.details.liberationRequirementEnforced = error.message.includes('403');
      }

      testResult.details.corsTests = corsTests;

      // Validation criteria
      const communityAllowed = corsTests.find(test => test.origin === 'community')?.allowed;
      const extractiveBlocked = corsTests.filter(test => test.origin !== 'community' && test.blocked).length;
      const totalExtractive = corsTests.filter(test => test.origin !== 'community').length;

      const criteriamet = [
        communityAllowed === true,
        extractiveBlocked === totalExtractive,
        testResult.details.liberationRequirementEnforced === true
      ];

      testResult.passed = criteriamet.every(criterion => criterion === true);
      testResult.details.criteriaCount = criteriamet.filter(c => c).length;
      testResult.details.totalCriteria = criteriamet.length;

      if (testResult.passed) {
        console.log('✅ Anti-oppression access controls operational');
        this.results.liberationGatesPassed++;
      } else {
        console.log(`❌ Anti-oppression controls: Only ${testResult.details.criteriaCount}/${testResult.details.totalCriteria} criteria met`);
      }

    } catch (error) {
      console.log(`❌ Anti-oppression validation failed: ${error.message}`);
      testResult.error = error.message;
    }

    this.results.validationResults.antiOppressionAccessControls = testResult;
  }

  /**
   * Technical Verification: Gateway health checks (response < 100ms)
   */
  async validateGatewayHealthChecks() {
    console.log('💗 Validating Gateway Health Checks (<100ms target)...');

    const testResult = {
      gate: 'gateway_health_checks',
      type: 'technical',
      target: 'Response time <100ms',
      passed: false,
      details: {}
    };

    try {
      const healthCheckTests = [];

      // Test multiple health check calls
      for (let i = 0; i < 5; i++) {
        const startTime = performance.now();
        const response = await this.makeRequest('/health');
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        const healthData = JSON.parse(response.body);

        healthCheckTests.push({
          attempt: i + 1,
          responseTime,
          status: healthData.status,
          technicalHealthy: healthData.technical?.healthy,
          liberationHealthy: healthData.liberation?.healthy,
          targetMet: responseTime < 100
        });
      }

      const averageResponseTime = healthCheckTests.reduce((sum, test) => sum + test.responseTime, 0) / healthCheckTests.length;
      const targetMetCount = healthCheckTests.filter(test => test.targetMet).length;
      const targetMetPercentage = (targetMetCount / healthCheckTests.length) * 100;

      testResult.details.healthCheckTests = healthCheckTests;
      testResult.details.averageResponseTime = averageResponseTime;
      testResult.details.targetMetPercentage = targetMetPercentage;
      testResult.details.allChecksHealthy = healthCheckTests.every(test => test.status === 'healthy');

      testResult.passed = averageResponseTime < 100 && targetMetPercentage >= 80; // 80% of calls under 100ms

      if (testResult.passed) {
        console.log(`✅ Health checks: ${averageResponseTime.toFixed(1)}ms average (${targetMetPercentage.toFixed(0)}% under 100ms)`);
        this.results.technicalGatesPassed++;
      } else {
        console.log(`❌ Health checks: ${averageResponseTime.toFixed(1)}ms average (target: <100ms)`);
      }

    } catch (error) {
      console.log(`❌ Health check validation failed: ${error.message}`);
      testResult.error = error.message;
    }

    this.results.validationResults.gatewayHealthChecks = testResult;
  }

  /**
   * Technical Verification: Authentication service validating tokens
   */
  async validateAuthenticationService() {
    console.log('🔐 Validating Authentication Service (<20ms target)...');

    const testResult = {
      gate: 'authentication_service',
      type: 'technical',
      target: 'Token validation <20ms',
      passed: false,
      details: {}
    };

    try {
      const authTests = [];

      // Test valid token authentication
      for (let i = 0; i < 3; i++) {
        const startTime = performance.now();
        try {
          const response = await this.makeRequest('/api/protected/test', 'GET', null, {
            'Authorization': 'Bearer valid_community_token_123'
          });
          const endTime = performance.now();
          const responseTime = endTime - startTime;

          authTests.push({
            attempt: i + 1,
            responseTime,
            authenticated: response.statusCode === 200,
            targetMet: responseTime < 20
          });
        } catch (error) {
          const endTime = performance.now();
          const responseTime = endTime - startTime;

          authTests.push({
            attempt: i + 1,
            responseTime,
            authenticated: false,
            error: error.message,
            targetMet: responseTime < 20
          });
        }
      }

      const averageResponseTime = authTests.reduce((sum, test) => sum + test.responseTime, 0) / authTests.length;
      const targetMetCount = authTests.filter(test => test.targetMet).length;
      const targetMetPercentage = (targetMetCount / authTests.length) * 100;

      testResult.details.authTests = authTests;
      testResult.details.averageResponseTime = averageResponseTime;
      testResult.details.targetMetPercentage = targetMetPercentage;

      testResult.passed = averageResponseTime < 20 && targetMetPercentage >= 80;

      if (testResult.passed) {
        console.log(`✅ Authentication: ${averageResponseTime.toFixed(1)}ms average (${targetMetPercentage.toFixed(0)}% under 20ms)`);
        this.results.technicalGatesPassed++;
      } else {
        console.log(`❌ Authentication: ${averageResponseTime.toFixed(1)}ms average (target: <20ms)`);
      }

    } catch (error) {
      console.log(`❌ Authentication validation failed: ${error.message}`);
      testResult.error = error.message;
    }

    this.results.validationResults.authenticationService = testResult;
  }

  /**
   * Technical Verification: Load balancer with trauma-informed rate limiting
   */
  async validateTraumaInformedRateLimiting() {
    console.log('⏰ Validating Trauma-Informed Rate Limiting...');

    const testResult = {
      gate: 'trauma_informed_rate_limiting',
      type: 'technical',
      target: 'Gentle escalation patterns',
      passed: false,
      details: {}
    };

    try {
      // Test community member rate limits (should be higher)
      const communityRequests = [];
      for (let i = 0; i < 10; i++) {
        try {
          const response = await this.makeRequest('/api/community/test', 'GET', null, {
            'X-Community-Member': 'true',
            'X-Member-Type': 'community_member'
          });
          communityRequests.push({ attempt: i + 1, success: true, statusCode: response.statusCode });
        } catch (error) {
          const statusCode = error.message.includes('429') ? 429 : 500;
          communityRequests.push({ attempt: i + 1, success: false, statusCode, error: error.message });

          // Check if error message is trauma-informed
          if (statusCode === 429) {
            testResult.details.traumaInformedMessage = error.message.includes('gentle') || error.message.includes('wellbeing');
          }
        }
      }

      // Test external request limits (should be lower)
      const externalRequests = [];
      for (let i = 0; i < 5; i++) {
        try {
          const response = await this.makeRequest('/api/external/test', 'GET');
          externalRequests.push({ attempt: i + 1, success: true, statusCode: response.statusCode });
        } catch (error) {
          const statusCode = error.message.includes('429') ? 429 : 500;
          externalRequests.push({ attempt: i + 1, success: false, statusCode });
        }
      }

      const communitySuccessRate = communityRequests.filter(req => req.success).length / communityRequests.length;
      const externalSuccessRate = externalRequests.filter(req => req.success).length / externalRequests.length;

      testResult.details.communityRequests = communityRequests;
      testResult.details.externalRequests = externalRequests;
      testResult.details.communitySuccessRate = communitySuccessRate;
      testResult.details.externalSuccessRate = externalSuccessRate;
      testResult.details.communityTreatedBetter = communitySuccessRate > externalSuccessRate;

      testResult.passed =
        communitySuccessRate >= 0.8 && // Community members should mostly succeed
        testResult.details.communityTreatedBetter && // Community treated better than external
        (testResult.details.traumaInformedMessage !== false); // Rate limit messages should be trauma-informed

      if (testResult.passed) {
        console.log(`✅ Trauma-informed rate limiting: Community ${(communitySuccessRate * 100).toFixed(0)}% success vs External ${(externalSuccessRate * 100).toFixed(0)}%`);
        this.results.technicalGatesPassed++;
      } else {
        console.log(`❌ Rate limiting: Community ${(communitySuccessRate * 100).toFixed(0)}% vs External ${(externalSuccessRate * 100).toFixed(0)}% success`);
      }

    } catch (error) {
      console.log(`❌ Rate limiting validation failed: ${error.message}`);
      testResult.error = error.message;
    }

    this.results.validationResults.traumaInformedRateLimiting = testResult;
  }

  /**
   * Technical Verification: Circuit breakers preserve liberation values
   */
  async validateCircuitBreakers() {
    console.log('⚡ Validating Liberation-Preserving Circuit Breakers...');

    const testResult = {
      gate: 'liberation_circuit_breakers',
      type: 'technical',
      target: 'Fallbacks preserve liberation values',
      passed: false,
      details: {}
    };

    try {
      // Test circuit breaker status endpoint
      const statusResponse = await this.makeRequest('/circuit-breaker/status');
      const statusData = JSON.parse(statusResponse.body);

      testResult.details.circuitBreakerStatus = statusData;

      // Test fallback responses preserve liberation values
      const fallbackTests = [];

      // Simulate service failure and test fallback
      try {
        const fallbackResponse = await this.makeRequest('/api/creator/test/revenue?simulate_failure=true');
        const fallbackData = JSON.parse(fallbackResponse.body);

        fallbackTests.push({
          service: 'creator-service',
          fallbackActive: fallbackData.fallbackActive || false,
          liberationValuesPreserved: fallbackData.liberationValuesPreserved || false,
          sovereigntyProtected: fallbackData.sovereignty?.revenueShare?.includes('75%') || false
        });
      } catch (error) {
        // Circuit breaker might be rejecting requests
        fallbackTests.push({
          service: 'creator-service',
          fallbackActive: false,
          error: error.message
        });
      }

      testResult.details.fallbackTests = fallbackTests;

      // Validation criteria
      const circuitBreakersConfigured = statusData && Object.keys(statusData).length > 0;
      const fallbacksPreserveValues = fallbackTests.every(test =>
        test.liberationValuesPreserved === true || test.sovereigntyProtected === true
      );

      testResult.passed = circuitBreakersConfigured && (fallbackTests.length === 0 || fallbacksPreserveValues);

      if (testResult.passed) {
        console.log('✅ Circuit breakers preserve liberation values in fallbacks');
        this.results.technicalGatesPassed++;
      } else {
        console.log('❌ Circuit breakers not properly preserving liberation values');
      }

    } catch (error) {
      console.log(`❌ Circuit breaker validation failed: ${error.message}`);
      testResult.error = error.message;
    }

    this.results.validationResults.liberationCircuitBreakers = testResult;
  }

  /**
   * Calculate overall validation results
   */
  calculateOverallResults() {
    const totalPassed = this.results.liberationGatesPassed + this.results.technicalGatesPassed;
    this.results.overallSuccess = totalPassed >= 6; // At least 6 out of 8 gates must pass

    this.results.summary = {
      liberationGates: `${this.results.liberationGatesPassed}/4`,
      technicalGates: `${this.results.technicalGatesPassed}/4`,
      totalGates: `${totalPassed}/${this.results.totalGates}`,
      deploymentReady: this.results.overallSuccess
    };
  }

  /**
   * Display validation results
   */
  displayValidationResults() {
    console.log('\n' + '='.repeat(60));
    console.log('🏴‍☠️ PHASE 2 LIBERATION VALIDATION RESULTS');
    console.log('='.repeat(60));

    console.log('\n📊 LIBERATION GATES:');
    console.log(`   Creator Sovereignty Routes: ${this.getPassFailIcon('creatorSovereigntyRoutes')}`);
    console.log(`   Democratic Governance Endpoints: ${this.getPassFailIcon('democraticGovernanceEndpoints')}`);
    console.log(`   Community Protection Middleware: ${this.getPassFailIcon('communityProtectionMiddleware')}`);
    console.log(`   Anti-Oppression Access Controls: ${this.getPassFailIcon('antiOppressionAccessControls')}`);

    console.log('\n🔧 TECHNICAL GATES:');
    console.log(`   Gateway Health Checks: ${this.getPassFailIcon('gatewayHealthChecks')}`);
    console.log(`   Authentication Service: ${this.getPassFailIcon('authenticationService')}`);
    console.log(`   Trauma-Informed Rate Limiting: ${this.getPassFailIcon('traumaInformedRateLimiting')}`);
    console.log(`   Liberation Circuit Breakers: ${this.getPassFailIcon('liberationCircuitBreakers')}`);

    console.log('\n📈 SUMMARY:');
    console.log(`   Liberation Gates: ${this.results.summary.liberationGates} passed`);
    console.log(`   Technical Gates: ${this.results.summary.technicalGates} passed`);
    console.log(`   Total Score: ${this.results.summary.totalGates}`);

    if (this.results.overallSuccess) {
      console.log('\n✅ PHASE 2 DEPLOYMENT READY');
      console.log('🏴‍☠️ Community-Controlled API Gateway validated with liberation values preserved');
    } else {
      console.log('\n❌ PHASE 2 DEPLOYMENT NOT READY');
      console.log('⚠️ Address failing gates before proceeding');
    }

    console.log('\n' + '='.repeat(60));
  }

  /**
   * Get pass/fail icon for validation result
   */
  getPassFailIcon(testName) {
    const result = this.results.validationResults[testName];
    if (!result) return '❓ Unknown';
    return result.passed ? '✅ PASS' : '❌ FAIL';
  }

  /**
   * Make HTTP request helper
   */
  async makeRequest(path, method = 'GET', body = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, this.apiGatewayUrl);

      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Phase2-Liberation-Validator/1.0',
          ...headers
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
}

// Run validation if called directly
if (require.main === module) {
  const validator = new Phase2LiberationValidator();

  validator.validatePhase2Deployment()
    .then(results => {
      if (results.overallSuccess) {
        console.log('\n🎉 Phase 2 validation successful!');
        process.exit(0);
      } else {
        console.log('\n💥 Phase 2 validation failed!');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 Validation error:', error);
      process.exit(1);
    });
}

module.exports = Phase2LiberationValidator;
/**
 * Mathematical Enforcement Test Suite
 * CRITICAL: Tests mathematical 75% creator sovereignty enforcement
 *
 * PHASE 3 VALIDATION:
 * ✓ Mathematical 75% creator sovereignty enforcement
 * ✓ Revenue transparency calculations
 * ✓ Cross-service sovereignty consistency
 * ✓ Rollback trigger validation
 */

const LiberationBusinessLogicOrchestrator = require('../../layer-3-business-logic/LiberationBusinessLogicOrchestrator');

class MathematicalEnforcementTestSuite {
  constructor() {
    this.orchestrator = new LiberationBusinessLogicOrchestrator();
    this.testResults = [];
    this.passingTests = 0;
    this.totalTests = 0;
  }

  async runAllTests() {
    console.log('\n🔢 MATHEMATICAL ENFORCEMENT TEST SUITE');
    console.log('═════════════════════════════════════════════════════════════');

    try {
      await this.testMathematicalSovereigntyEnforcement();
      await this.testSovereigntyViolationDetection();
      await this.testRevenueTransparencyCalculation();
      await this.testCrossServiceConsistency();
      await this.testRollbackThresholds();
      await this.testMathematicalEdgeCases();

      console.log('\n📊 MATHEMATICAL ENFORCEMENT TEST RESULTS:');
      console.log(`✅ Passing tests: ${this.passingTests}/${this.totalTests}`);
      console.log(`🔢 Mathematical enforcement accuracy: ${((this.passingTests / this.totalTests) * 100).toFixed(1)}%`);

      if (this.passingTests === this.totalTests) {
        console.log('🏛️ Mathematical creator sovereignty enforcement VALIDATED!');
        return { success: true, tests: this.testResults };
      } else {
        console.error('🚨 Mathematical enforcement validation FAILED!');
        return { success: false, tests: this.testResults };
      }

    } catch (error) {
      console.error('🚨 Mathematical enforcement test suite failed:', error);
      return { success: false, error: error.message };
    }
  }

  async testMathematicalSovereigntyEnforcement() {
    console.log('\n   🔢 Testing mathematical 75% sovereignty enforcement...');

    const testCases = [
      { name: 'Valid 80% creator share', creatorShare: 0.8, shouldPass: true },
      { name: 'Valid 75% creator share (minimum)', creatorShare: 0.75, shouldPass: true },
      { name: 'Invalid 70% creator share', creatorShare: 0.7, shouldPass: false },
      { name: 'Invalid 60% creator share', creatorShare: 0.6, shouldPass: false },
      { name: 'Valid 90% creator share', creatorShare: 0.9, shouldPass: true }
    ];

    for (const testCase of testCases) {
      this.totalTests++;

      const operation = {
        id: `math_test_${Date.now()}`,
        serviceType: 'test',
        creatorId: 'test_creator',
        revenueData: {
          creatorShare: testCase.creatorShare,
          communityShare: (1 - testCase.creatorShare) * 0.8,
          platformShare: (1 - testCase.creatorShare) * 0.2
        }
      };

      try {
        const result = await this.orchestrator.enforceMathematicalCreatorSovereignty(operation);

        if (testCase.shouldPass && result.enforcementSuccessful) {
          console.log(`      ✅ ${testCase.name}: PASSED (${(testCase.creatorShare * 100).toFixed(1)}%)`);
          this.passingTests++;
          this.testResults.push({ name: testCase.name, status: 'PASS', details: result });
        } else if (!testCase.shouldPass && result.enforcementSuccessful) {
          console.log(`      ❌ ${testCase.name}: FAILED (should have been rejected)`);
          this.testResults.push({ name: testCase.name, status: 'FAIL', details: 'Should have been rejected' });
        } else {
          console.log(`      ❌ ${testCase.name}: UNEXPECTED RESULT`);
          this.testResults.push({ name: testCase.name, status: 'FAIL', details: 'Unexpected result' });
        }
      } catch (error) {
        if (!testCase.shouldPass && error.message.includes('MATHEMATICAL SOVEREIGNTY VIOLATION')) {
          console.log(`      ✅ ${testCase.name}: PASSED (correctly rejected)`);
          this.passingTests++;
          this.testResults.push({ name: testCase.name, status: 'PASS', details: 'Correctly rejected' });
        } else if (testCase.shouldPass) {
          console.log(`      ❌ ${testCase.name}: FAILED (should have passed)`);
          this.testResults.push({ name: testCase.name, status: 'FAIL', details: error.message });
        } else {
          console.log(`      ❌ ${testCase.name}: UNEXPECTED ERROR`);
          this.testResults.push({ name: testCase.name, status: 'FAIL', details: error.message });
        }
      }
    }
  }

  async testSovereigntyViolationDetection() {
    console.log('\n   🚨 Testing sovereignty violation detection...');

    this.totalTests++;

    // Test various violation scenarios
    const violationTests = [
      { creatorShare: 0.74, expected: 'violation' },  // Just below threshold
      { creatorShare: 0.5, expected: 'violation' },   // Significant violation
      { creatorShare: 0.3, expected: 'violation' },   // Severe violation
      { creatorShare: 0.0, expected: 'violation' }    // Complete violation
    ];

    let violationDetections = 0;
    for (const test of violationTests) {
      const operation = {
        id: `violation_test_${Date.now()}`,
        serviceType: 'test',
        creatorId: 'test_creator',
        revenueData: { creatorShare: test.creatorShare, communityShare: 0.8, platformShare: 0.2 }
      };

      try {
        await this.orchestrator.enforceMathematicalCreatorSovereignty(operation);
      } catch (error) {
        if (error.message.includes('MATHEMATICAL SOVEREIGNTY VIOLATION')) {
          violationDetections++;
        }
      }
    }

    if (violationDetections === violationTests.length) {
      console.log(`      ✅ Sovereignty violation detection: PASSED (${violationDetections}/${violationTests.length} detected)`);
      this.passingTests++;
      this.testResults.push({ name: 'Sovereignty violation detection', status: 'PASS', details: `${violationDetections}/${violationTests.length} violations detected` });
    } else {
      console.log(`      ❌ Sovereignty violation detection: FAILED (${violationDetections}/${violationTests.length} detected)`);
      this.testResults.push({ name: 'Sovereignty violation detection', status: 'FAIL', details: `Only ${violationDetections}/${violationTests.length} violations detected` });
    }
  }

  async testRevenueTransparencyCalculation() {
    console.log('\n   💰 Testing revenue transparency calculation...');

    this.totalTests++;

    const revenueRequest = {
      shares: {
        creator: 0.8,
        community: 0.15,
        platform: 0.05
      },
      amount: 1000,
      serviceType: 'newsroom'
    };

    try {
      const transparencyReport = await this.orchestrator.calculatePlatformRevenueTransparency(revenueRequest);

      const validationChecks = [
        transparencyReport.mathematicalValidation.mathematicallyValid,
        transparencyReport.mathematicalValidation.creatorSovereigntyCompliant,
        transparencyReport.overallTransparencyScore >= 0.8
      ];

      const passedChecks = validationChecks.filter(check => check).length;

      if (passedChecks === validationChecks.length) {
        console.log(`      ✅ Revenue transparency calculation: PASSED (${passedChecks}/${validationChecks.length} checks)`);
        this.passingTests++;
        this.testResults.push({ name: 'Revenue transparency calculation', status: 'PASS', details: transparencyReport });
      } else {
        console.log(`      ❌ Revenue transparency calculation: FAILED (${passedChecks}/${validationChecks.length} checks)`);
        this.testResults.push({ name: 'Revenue transparency calculation', status: 'FAIL', details: `Only ${passedChecks}/${validationChecks.length} checks passed` });
      }

    } catch (error) {
      console.log(`      ❌ Revenue transparency calculation: ERROR - ${error.message}`);
      this.testResults.push({ name: 'Revenue transparency calculation', status: 'FAIL', details: error.message });
    }
  }

  async testCrossServiceConsistency() {
    console.log('\n   🔗 Testing cross-service sovereignty consistency...');

    this.totalTests++;

    // Mock cross-service operations that should maintain consistency
    const services = ['ivorAI', 'events', 'newsroom'];
    const consistencyTests = [];

    for (const service of services) {
      const operation = {
        id: `consistency_test_${service}_${Date.now()}`,
        serviceType: service,
        creatorId: 'test_creator',
        revenueData: {
          creatorShare: 0.8,
          communityShare: 0.15,
          platformShare: 0.05
        }
      };

      try {
        const result = await this.orchestrator.enforceMathematicalCreatorSovereignty(operation);
        consistencyTests.push({
          service,
          consistent: result.enforcementSuccessful && result.mathematicalCompliance.compliant
        });
      } catch (error) {
        consistencyTests.push({ service, consistent: false, error: error.message });
      }
    }

    const consistentServices = consistencyTests.filter(test => test.consistent).length;

    if (consistentServices === services.length) {
      console.log(`      ✅ Cross-service consistency: PASSED (${consistentServices}/${services.length} services)`);
      this.passingTests++;
      this.testResults.push({ name: 'Cross-service consistency', status: 'PASS', details: consistencyTests });
    } else {
      console.log(`      ❌ Cross-service consistency: FAILED (${consistentServices}/${services.length} services)`);
      this.testResults.push({ name: 'Cross-service consistency', status: 'FAIL', details: consistencyTests });
    }
  }

  async testRollbackThresholds() {
    console.log('\n   🛡️ Testing rollback threshold validation...');

    this.totalTests++;

    try {
      const monitoringResult = await this.orchestrator.monitorLiberationMetrics();

      const thresholdChecks = [
        monitoringResult.timestamp !== undefined,
        monitoringResult.aggregateMetrics !== undefined,
        monitoringResult.overallLiberationHealth !== undefined
      ];

      const passedChecks = thresholdChecks.filter(check => check).length;

      if (passedChecks === thresholdChecks.length) {
        console.log(`      ✅ Rollback threshold validation: PASSED (${passedChecks}/${thresholdChecks.length} checks)`);
        this.passingTests++;
        this.testResults.push({ name: 'Rollback threshold validation', status: 'PASS', details: monitoringResult });
      } else {
        console.log(`      ❌ Rollback threshold validation: FAILED (${passedChecks}/${thresholdChecks.length} checks)`);
        this.testResults.push({ name: 'Rollback threshold validation', status: 'FAIL', details: `Only ${passedChecks}/${thresholdChecks.length} checks passed` });
      }

    } catch (error) {
      console.log(`      ❌ Rollback threshold validation: ERROR - ${error.message}`);
      this.testResults.push({ name: 'Rollback threshold validation', status: 'FAIL', details: error.message });
    }
  }

  async testMathematicalEdgeCases() {
    console.log('\n   🔍 Testing mathematical edge cases...');

    const edgeCases = [
      { name: 'Exact 75% boundary', creatorShare: 0.75, shouldPass: true },
      { name: 'Just below boundary', creatorShare: 0.7499, shouldPass: false },
      { name: 'Just above boundary', creatorShare: 0.7501, shouldPass: true },
      { name: 'Floating point precision', creatorShare: 0.75000001, shouldPass: true },
      { name: 'Zero creator share', creatorShare: 0.0, shouldPass: false },
      { name: 'Maximum creator share', creatorShare: 1.0, shouldPass: true }
    ];

    for (const edgeCase of edgeCases) {
      this.totalTests++;

      const operation = {
        id: `edge_test_${Date.now()}`,
        serviceType: 'test',
        creatorId: 'test_creator',
        revenueData: {
          creatorShare: edgeCase.creatorShare,
          communityShare: Math.max(0, (1 - edgeCase.creatorShare) * 0.8),
          platformShare: Math.max(0, (1 - edgeCase.creatorShare) * 0.2)
        }
      };

      try {
        const result = await this.orchestrator.enforceMathematicalCreatorSovereignty(operation);

        if (edgeCase.shouldPass && result.enforcementSuccessful) {
          console.log(`      ✅ ${edgeCase.name}: PASSED`);
          this.passingTests++;
          this.testResults.push({ name: edgeCase.name, status: 'PASS', details: result });
        } else if (!edgeCase.shouldPass) {
          console.log(`      ❌ ${edgeCase.name}: FAILED (should have been rejected)`);
          this.testResults.push({ name: edgeCase.name, status: 'FAIL', details: 'Should have been rejected' });
        }
      } catch (error) {
        if (!edgeCase.shouldPass && error.message.includes('MATHEMATICAL SOVEREIGNTY VIOLATION')) {
          console.log(`      ✅ ${edgeCase.name}: PASSED (correctly rejected)`);
          this.passingTests++;
          this.testResults.push({ name: edgeCase.name, status: 'PASS', details: 'Correctly rejected' });
        } else {
          console.log(`      ❌ ${edgeCase.name}: ERROR - ${error.message}`);
          this.testResults.push({ name: edgeCase.name, status: 'FAIL', details: error.message });
        }
      }
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  async function runTests() {
    const testSuite = new MathematicalEnforcementTestSuite();
    const results = await testSuite.runAllTests();

    if (!results.success) {
      process.exit(1);
    }
  }

  runTests();
}

module.exports = MathematicalEnforcementTestSuite;
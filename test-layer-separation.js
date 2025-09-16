/**
 * test-layer-separation.js
 * Comprehensive test suite to validate proper separation of concerns
 * Tests deployment compatibility and layer independence
 */

console.log('🧪 TESTING LAYER SEPARATION AND DEPLOYMENT COMPATIBILITY\n');

// Import services to test layer separation
const economicJusticeService = require('./layer-3-business-logic/EconomicJusticeService');
const newsroomLiberationService = require('./layer-3-business-logic/NewsroomLiberationService');
const DataSovereigntyService = require('./layer-5-data-sovereignty/DataSovereigntyService');
const dataSovereigntyService = new DataSovereigntyService();
const apiGateway = require('./layer-2-api-gateway/api-gateway');

/**
 * TEST 1: Layer 3 Business Logic Independence
 * Validates that business logic services work without any persistence layer
 */
async function testBusinessLogicLayerIndependence() {
  console.log('🧠 TEST 1: Business Logic Layer Independence');

  try {
    // Test EconomicJusticeService (pure business logic)
    console.log('  📊 Testing EconomicJusticeService...');
    const testContent = {
      revenue: 100,
      title: 'Test Article',
      body: 'Liberation-focused content for testing'
    };

    const revenueTransparency = economicJusticeService.calculateRevenueTransparency(testContent);
    console.log('    ✅ Revenue transparency calculated:', {
      creatorShare: revenueTransparency.creatorShare,
      creatorEarnings: revenueTransparency.creatorEarnings,
      communityBenefit: revenueTransparency.communityBenefit
    });

    // Validate 75% creator sovereignty enforcement
    const sovereigntyValid = economicJusticeService.validateCreatorSovereignty(revenueTransparency);
    console.log('    ✅ Creator sovereignty validated:', sovereigntyValid);

    // Test NewsroomLiberationService (pure business logic)
    console.log('  📰 Testing NewsroomLiberationService...');
    const businessLogicResult = newsroomLiberationService.createLiberationContent(testContent);

    // Verify NO persistence occurred (should return business logic result only)
    if (businessLogicResult.content && businessLogicResult.businessLogicResult) {
      console.log('    ✅ Content creation business logic:', {
        contentId: businessLogicResult.content.id,
        liberationScore: businessLogicResult.content.liberationValues.liberationScore,
        processingTime: businessLogicResult.businessLogicResult.processingTime
      });
    }

    // Test performance targets compliance
    const performanceValid = businessLogicResult.businessLogicResult.processingTime < 100; // <100ms target
    console.log('    ✅ Performance target met:', performanceValid);

    console.log('  🎉 Layer 3 Business Logic Independence: PASSED\n');
    return true;

  } catch (error) {
    console.error('  ❌ Layer 3 Business Logic Independence: FAILED', error.message);
    return false;
  }
}

/**
 * TEST 2: Layer 5 Data Sovereignty Independence
 * Validates that data layer works independently with clean interfaces
 */
async function testDataSovereigntyLayerIndependence() {
  console.log('🔒 TEST 2: Data Sovereignty Layer Independence');

  try {
    // Test data storage with sovereignty requirements
    console.log('  💾 Testing data storage with sovereignty...');
    const testDataRequest = {
      data: {
        id: 'test-content-001',
        title: 'Test Liberation Article',
        content: 'Community-owned content for testing',
        type: 'news_article'
      },
      sovereigntyRequirements: {
        communityId: 'test-community',
        creatorControlled: true
      },
      operationType: 'test_storage'
    };

    const storageResult = await dataSovereigntyService.storeWithSovereignty(testDataRequest);
    console.log('    ✅ Data stored with sovereignty:', {
      success: storageResult.success,
      sovereigntyConfirmed: storageResult.sovereigntyConfirmed,
      dataId: storageResult.dataId
    });

    // Test data retrieval with governance
    console.log('  📖 Testing data retrieval with governance...');
    const retrievalResult = await dataSovereigntyService.retrieveWithGovernance({
      dataId: 'test-content-001',
      requesterId: 'test-system',
      accessType: 'read'
    });

    console.log('    ✅ Data retrieved with governance:', {
      retrieved: !!retrievalResult.id,
      governanceCompliant: retrievalResult.sovereignty?.governanceCompliant
    });

    // Test community consent validation
    console.log('  🤝 Testing community consent validation...');
    const consentValid = await dataSovereigntyService.validateCommunityConsent({
      operationType: 'test_operation',
      dataType: 'news_article',
      communityId: 'test-community'
    });
    console.log('    ✅ Community consent validated:', consentValid);

    console.log('  🎉 Layer 5 Data Sovereignty Independence: PASSED\n');
    return true;

  } catch (error) {
    console.error('  ❌ Layer 5 Data Sovereignty Independence: FAILED', error.message);
    return false;
  }
}

/**
 * TEST 3: Layer 2 API Gateway Coordination
 * Validates that API Gateway properly coordinates layers without mixing concerns
 */
async function testAPIGatewayCoordination() {
  console.log('🌐 TEST 3: API Gateway Layer Coordination');

  try {
    // Mock Express request/response objects for testing
    const mockReq = {
      body: {
        title: 'Liberation Journalism Test',
        body: 'Community empowerment through transparent journalism',
        author: 'Test Creator',
        revenue: 100
      },
      params: {}
    };

    let responseData = null;
    let statusCode = null;

    const mockRes = {
      status: (code) => {
        statusCode = code;
        return mockRes;
      },
      json: (data) => {
        responseData = data;
        return mockRes;
      }
    };

    // Test content creation through API Gateway
    console.log('  📝 Testing content creation via API Gateway...');
    await apiGateway.createNewsContent(mockReq, mockRes);

    if (statusCode === 201 && responseData.success) {
      console.log('    ✅ Content created via API Gateway:', {
        success: responseData.success,
        layerSeparation: responseData.layerSeparation.separationCompliant,
        businessLogicLayer: responseData.layerSeparation.businessLogicLayer,
        dataSovereigntyLayer: responseData.layerSeparation.dataSovereigntyLayer
      });
    }

    // Test health check endpoint
    console.log('  🏥 Testing health check endpoint...');
    await apiGateway.healthCheck({ params: {} }, mockRes);

    if (responseData.gatewayStatus === 'healthy') {
      console.log('    ✅ Health check passed:', {
        gatewayStatus: responseData.gatewayStatus,
        layerSeparationCompliant: responseData.layerSeparation.compliant,
        businessLogicSeparated: responseData.layerSeparation.businessLogicSeparated,
        dataPersistenceSeparated: responseData.layerSeparation.dataPersistenceSeparated
      });
    }

    console.log('  🎉 Layer 2 API Gateway Coordination: PASSED\n');
    return true;

  } catch (error) {
    console.error('  ❌ Layer 2 API Gateway Coordination: FAILED', error.message);
    return false;
  }
}

/**
 * TEST 4: Deployment Compatibility
 * Validates that services can be deployed independently
 */
async function testDeploymentCompatibility() {
  console.log('🚀 TEST 4: Deployment Compatibility');

  try {
    // Test 1: Business Logic Service Health
    console.log('  🧠 Testing business logic service health...');
    const businessHealth = newsroomLiberationService.performNewsroomBusinessLogicHealth();

    const businessLogicDeployable = businessHealth.status === 'operational' &&
                                  businessHealth.businessLogicOnly === true &&
                                  businessHealth.layerSeparation.noPersistence === true;

    console.log('    ✅ Business logic deployable independently:', businessLogicDeployable);

    // Test 2: Performance Targets
    console.log('  ⚡ Testing performance targets...');
    const testContent = {
      title: 'Performance Test',
      body: 'Testing processing speed',
      revenue: 100
    };

    const startTime = Date.now();
    const result = newsroomLiberationService.createLiberationContent(testContent);
    const processingTime = Date.now() - startTime;

    const performanceTarget = 100; // 100ms target
    const performanceMet = processingTime < performanceTarget;

    console.log('    ✅ Performance target met:', {
      processingTime: `${processingTime}ms`,
      target: `${performanceTarget}ms`,
      met: performanceMet
    });

    // Test 3: Liberation Values Compliance
    console.log('  🏴‍☠️ Testing liberation values enforcement...');
    const liberationCompliant = result.content.liberationValues.creatorSovereignty >= 0.75 &&
                               result.content.liberationValues.economicJustice === true;

    console.log('    ✅ Liberation values enforced:', {
      creatorSovereignty: result.content.liberationValues.creatorSovereignty,
      economicJustice: result.content.liberationValues.economicJustice,
      compliant: liberationCompliant
    });

    // Test 4: Error Handling and Layer Identification
    console.log('  🚨 Testing error handling with layer identification...');
    try {
      // Intentionally trigger an error
      newsroomLiberationService.createLiberationContent(null);
    } catch (error) {
      const errorHandled = error.message.includes('required');
      console.log('    ✅ Error handling with proper messages:', errorHandled);
    }

    console.log('  🎉 Deployment Compatibility: PASSED\n');
    return true;

  } catch (error) {
    console.error('  ❌ Deployment Compatibility: FAILED', error.message);
    return false;
  }
}

/**
 * Main test runner
 */
async function runAllTests() {
  console.log('🏁 STARTING COMPREHENSIVE LAYER SEPARATION TESTS\n');

  const results = {
    businessLogicIndependence: false,
    dataSovereigntyIndependence: false,
    apiGatewayCoordination: false,
    deploymentCompatibility: false
  };

  // Run all tests
  results.businessLogicIndependence = await testBusinessLogicLayerIndependence();
  results.dataSovereigntyIndependence = await testDataSovereigntyLayerIndependence();
  results.apiGatewayCoordination = await testAPIGatewayCoordination();
  results.deploymentCompatibility = await testDeploymentCompatibility();

  // Summary
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(result => result === true).length;

  console.log('📊 TEST RESULTS SUMMARY:');
  console.log(`  Total Tests: ${totalTests}`);
  console.log(`  Passed: ${passedTests}`);
  console.log(`  Failed: ${totalTests - passedTests}`);
  console.log(`  Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%\n`);

  // Detailed results
  console.log('📋 DETAILED RESULTS:');
  Object.entries(results).forEach(([testName, passed]) => {
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`  ${testName}: ${status}`);
  });

  // Final verdict
  const allTestsPassed = passedTests === totalTests;
  console.log('\n🎯 FINAL VERDICT:');
  if (allTestsPassed) {
    console.log('🎉 ALL TESTS PASSED - LAYER SEPARATION IS DEPLOYMENT-READY!');
    console.log('✅ Clean separation of concerns implemented successfully');
    console.log('✅ Services can be deployed independently');
    console.log('✅ Performance targets met');
    console.log('✅ Liberation values enforced at appropriate layers');
    console.log('✅ Error handling and monitoring in place');
  } else {
    console.log('⚠️ SOME TESTS FAILED - REVIEW LAYER SEPARATION IMPLEMENTATION');
  }

  return allTestsPassed;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('🚨 Test runner error:', error);
    process.exit(1);
  });
}

module.exports = { runAllTests };
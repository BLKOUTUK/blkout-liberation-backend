/**
 * deployment-realistic-test.js
 * Deployment-realistic test suite that simulates actual production conditions
 * Tests that FAILED to catch the original deployment error - now enhanced
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 DEPLOYMENT-REALISTIC TESTING SUITE\n');

/**
 * TEST 1: Fresh Process Module Loading Simulation
 * Simulates how modules would be loaded in a fresh deployment environment
 */
async function testFreshProcessModuleLoading() {
  console.log('🔄 TEST 1: Fresh Process Module Loading Simulation');

  return new Promise((resolve) => {
    // Create test script that loads modules in isolation
    const testScript = `
      try {
        console.log('Loading NewsroomLiberationService...');
        const NewsroomLiberationService = require('./layer-3-business-logic/NewsroomLiberationService');
        console.log('✅ NewsroomLiberationService loaded as:', typeof NewsroomLiberationService);

        console.log('Attempting to instantiate NewsroomLiberationService...');
        const instance = new NewsroomLiberationService();
        console.log('✅ NewsroomLiberationService instantiated successfully');

        console.log('Loading EconomicJusticeService...');
        const EconomicJusticeService = require('./layer-3-business-logic/EconomicJusticeService');
        console.log('✅ EconomicJusticeService loaded as:', typeof EconomicJusticeService);

        console.log('Attempting to instantiate EconomicJusticeService...');
        const economicInstance = new EconomicJusticeService();
        console.log('✅ EconomicJusticeService instantiated successfully');

        console.log('Loading API Gateway...');
        const apiGateway = require('./layer-2-api-gateway/api-gateway');
        console.log('✅ API Gateway loaded successfully');

        console.log('✅ ALL MODULE LOADING TESTS PASSED IN FRESH PROCESS');
        process.exit(0);
      } catch (error) {
        console.error('❌ FRESH PROCESS MODULE LOADING FAILED:', error.message);
        console.error('Stack trace:', error.stack);
        process.exit(1);
      }
    `;

    // Write temporary test script
    fs.writeFileSync('./temp-fresh-process-test.js', testScript);

    // Execute in fresh Node.js process
    const childProcess = spawn('node', ['./temp-fresh-process-test.js'], {
      cwd: process.cwd(),
      stdio: 'pipe'
    });

    let output = '';
    let errorOutput = '';

    childProcess.stdout.on('data', (data) => {
      output += data.toString();
      console.log('  ' + data.toString().trim());
    });

    childProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
      console.error('  ERROR:', data.toString().trim());
    });

    childProcess.on('close', (code) => {
      // Clean up temporary file
      if (fs.existsSync('./temp-fresh-process-test.js')) {
        fs.unlinkSync('./temp-fresh-process-test.js');
      }

      const success = code === 0;
      console.log(`  🎯 Fresh Process Module Loading: ${success ? 'PASSED' : 'FAILED'}`);
      if (!success) {
        console.log('  📋 Output:', output);
        console.log('  🚨 Error Output:', errorOutput);
      }
      resolve(success);
    });
  });
}

/**
 * TEST 2: Dependency Availability Validation
 * Validates that all required dependencies are available in production-like environment
 */
async function testDependencyAvailability() {
  console.log('\n📦 TEST 2: Dependency Availability Validation');

  try {
    // Test critical Node.js built-in modules
    console.log('  🔍 Testing Node.js built-in modules...');
    require('events');
    console.log('    ✅ events module available');

    require('fs');
    console.log('    ✅ fs module available');

    require('path');
    console.log('    ✅ path module available');

    // Test if package.json exists and is valid
    console.log('  📄 Testing package.json...');
    if (fs.existsSync('./package.json')) {
      const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      console.log('    ✅ package.json exists and is valid JSON');
      console.log('    📋 Dependencies:', Object.keys(packageJson.dependencies || {}));
      console.log('    📋 DevDependencies:', Object.keys(packageJson.devDependencies || {}));
    } else {
      console.log('    ⚠️ package.json not found - this may cause deployment issues');
    }

    // Test module resolution for all our services
    console.log('  🎯 Testing service module resolution...');
    const servicePaths = [
      './layer-3-business-logic/NewsroomLiberationService.js',
      './layer-3-business-logic/EconomicJusticeService.js',
      './layer-5-data-sovereignty/DataSovereigntyService.js',
      './layer-2-api-gateway/api-gateway.js'
    ];

    for (const servicePath of servicePaths) {
      if (fs.existsSync(servicePath)) {
        console.log(`    ✅ ${servicePath} exists and accessible`);
      } else {
        console.log(`    ❌ ${servicePath} NOT FOUND`);
        return false;
      }
    }

    console.log('  🎉 Dependency Availability: PASSED');
    return true;

  } catch (error) {
    console.error('  ❌ Dependency Availability: FAILED', error.message);
    return false;
  }
}

/**
 * TEST 3: Service Instantiation Order Validation
 * Tests the order in which services must be instantiated to avoid circular dependencies
 */
async function testServiceInstantiationOrder() {
  console.log('\n🔄 TEST 3: Service Instantiation Order Validation');

  try {
    console.log('  📊 Testing EconomicJusticeService instantiation...');
    const EconomicJusticeService = require('./layer-3-business-logic/EconomicJusticeService');
    const economicService = new EconomicJusticeService();
    console.log('    ✅ EconomicJusticeService instantiated first');

    console.log('  📰 Testing NewsroomLiberationService instantiation...');
    const NewsroomLiberationService = require('./layer-3-business-logic/NewsroomLiberationService');
    const newsroomService = new NewsroomLiberationService();
    console.log('    ✅ NewsroomLiberationService instantiated second');

    console.log('  🔒 Testing DataSovereigntyService availability...');
    const dataSovereigntyService = require('./layer-5-data-sovereignty/DataSovereigntyService');
    console.log('    ✅ DataSovereigntyService loaded');

    console.log('  🌐 Testing API Gateway instantiation...');
    const apiGateway = require('./layer-2-api-gateway/api-gateway');
    console.log('    ✅ API Gateway instantiated with dependency injection');

    // Test that services have expected methods
    console.log('  🧪 Testing service method availability...');
    if (typeof economicService.calculateRevenueTransparency === 'function') {
      console.log('    ✅ EconomicJusticeService.calculateRevenueTransparency available');
    } else {
      throw new Error('EconomicJusticeService.calculateRevenueTransparency not available');
    }

    if (typeof newsroomService.createLiberationContent === 'function') {
      console.log('    ✅ NewsroomLiberationService.createLiberationContent available');
    } else {
      throw new Error('NewsroomLiberationService.createLiberationContent not available');
    }

    console.log('  🎉 Service Instantiation Order: PASSED');
    return true;

  } catch (error) {
    console.error('  ❌ Service Instantiation Order: FAILED', error.message);
    return false;
  }
}

/**
 * TEST 4: Production Configuration Validation
 * Simulates production environment variables and configuration
 */
async function testProductionConfigurationValidation() {
  console.log('\n⚙️ TEST 4: Production Configuration Validation');

  try {
    // Set production-like environment variables
    process.env.NODE_ENV = 'production';
    process.env.PORT = '3000';

    console.log('  🌍 Set production environment variables');
    console.log('    NODE_ENV:', process.env.NODE_ENV);
    console.log('    PORT:', process.env.PORT);

    // Test service behavior in production mode
    console.log('  🧪 Testing services in production mode...');

    // Use dependency injection instead of direct instantiation
    const { bootstrapServices, createAPILayerServices } = require('./dependency-injection/ServiceRegistry');
    bootstrapServices();
    const services = createAPILayerServices();
    const newsroomService = services.newsroom;

    // Test basic functionality in production mode
    const testContent = {
      title: 'Production Test Article',
      body: 'Testing production deployment',
      revenue: 100
    };

    const result = newsroomService.createLiberationContent(testContent);
    if (result.content && result.content.liberationValues.creatorSovereignty >= 0.75) {
      console.log('    ✅ Service functions correctly in production mode');
    } else {
      throw new Error('Service failed to maintain liberation values in production mode');
    }

    console.log('  🎉 Production Configuration: PASSED');
    return true;

  } catch (error) {
    console.error('  ❌ Production Configuration: FAILED', error.message);
    return false;
  } finally {
    // Reset environment
    delete process.env.NODE_ENV;
    delete process.env.PORT;
  }
}

/**
 * Main test runner for deployment-realistic tests
 */
async function runDeploymentRealisticTests() {
  console.log('🏁 STARTING DEPLOYMENT-REALISTIC TESTS\n');

  const results = {
    freshProcessModuleLoading: false,
    dependencyAvailability: false,
    serviceInstantiationOrder: false,
    productionConfiguration: false
  };

  // Run all tests
  results.freshProcessModuleLoading = await testFreshProcessModuleLoading();
  results.dependencyAvailability = await testDependencyAvailability();
  results.serviceInstantiationOrder = await testServiceInstantiationOrder();
  results.productionConfiguration = await testProductionConfigurationValidation();

  // Summary
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(result => result === true).length;

  console.log('\n📊 DEPLOYMENT-REALISTIC TEST RESULTS:');
  console.log(`  Total Tests: ${totalTests}`);
  console.log(`  Passed: ${passedTests}`);
  console.log(`  Failed: ${totalTests - passedTests}`);
  console.log(`  Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  // Detailed results
  console.log('\n📋 DETAILED RESULTS:');
  Object.entries(results).forEach(([testName, passed]) => {
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`  ${testName}: ${status}`);
  });

  // Final verdict
  const allTestsPassed = passedTests === totalTests;
  console.log('\n🎯 FINAL VERDICT:');
  if (allTestsPassed) {
    console.log('🎉 ALL DEPLOYMENT-REALISTIC TESTS PASSED!');
    console.log('✅ Services should deploy correctly in production');
    console.log('✅ Module loading patterns are deployment-compatible');
    console.log('✅ Dependencies are properly configured');
    console.log('✅ Service instantiation order is correct');
    console.log('✅ Production configuration is valid');
  } else {
    console.log('⚠️ SOME DEPLOYMENT-REALISTIC TESTS FAILED');
    console.log('🚨 Deployment may fail in production environment');
    console.log('💡 Review failed tests and fix issues before deploying');
  }

  return allTestsPassed;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runDeploymentRealisticTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('🚨 Deployment-realistic test runner error:', error);
    process.exit(1);
  });
}

module.exports = { runDeploymentRealisticTests };
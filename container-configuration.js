/**
 * Container Configuration for Contract Separation
 *
 * SCOPE: Dependency injection configuration for layers 3 and 5
 * DOES NOT: Contain business logic or data access implementations
 * ONLY: Configures service registration and dependency wiring
 */

const { globalContainer, INTERFACE_NAMES } = require('../../contracts/DependencyContainer');

// Business Logic Service Implementations (Layer 3)
const RefactoredLiberationOrchestrator = require('./layer-3-business-logic/RefactoredLiberationOrchestrator');
const CreatorSovereigntyServiceImpl = require('./layer-3-business-logic/services/CreatorSovereigntyServiceImpl');
const DemocraticGovernanceServiceImpl = require('./layer-3-business-logic/services/DemocraticGovernanceServiceImpl');
const CommunityProtectionServiceImpl = require('./layer-3-business-logic/services/CommunityProtectionServiceImpl');
const RevenueTransparencyServiceImpl = require('./layer-3-business-logic/services/RevenueTransparencyServiceImpl');
const FeatureFlagServiceImpl = require('./layer-3-business-logic/services/FeatureFlagServiceImpl');
const LiberationMetricsServiceImpl = require('./layer-3-business-logic/services/LiberationMetricsServiceImpl');

// Data Access Repository Implementations (Layer 5)
const {
  CommunityDataRepositoryImpl,
  CreatorDataRepositoryImpl,
  AuditTrailRepositoryImpl
} = require('./layer-5-data-sovereignty/RefactoredDataSovereigntyRepository');

/**
 * Configure Layer 5 (Data Access) Services
 */
function configureLayer5Services() {
  console.log('Configuring Layer 5 (Data Access) services...');

  // Mock database connection for demonstration
  const mockDatabaseConnection = {
    host: 'localhost',
    database: 'blkout_liberation',
    connected: true
  };

  globalContainer.register(
    INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY,
    () => new CommunityDataRepositoryImpl(mockDatabaseConnection),
    {
      singleton: true,
      factory: true,
      dependencies: [],
      configuration: { databaseConnection: mockDatabaseConnection }
    }
  );

  globalContainer.register(
    INTERFACE_NAMES.CREATOR_DATA_REPOSITORY,
    () => new CreatorDataRepositoryImpl(mockDatabaseConnection),
    {
      singleton: true,
      factory: true,
      dependencies: [],
      configuration: { databaseConnection: mockDatabaseConnection }
    }
  );

  globalContainer.register(
    INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY,
    () => new AuditTrailRepositoryImpl(mockDatabaseConnection),
    {
      singleton: true,
      factory: true,
      dependencies: [],
      configuration: { databaseConnection: mockDatabaseConnection }
    }
  );

  console.log('✓ Layer 5 services configured');
}

/**
 * Configure Layer 3 (Business Logic) Services
 */
function configureLayer3Services() {
  console.log('Configuring Layer 3 (Business Logic) services...');

  // Creator Sovereignty Service
  globalContainer.register(
    INTERFACE_NAMES.CREATOR_SOVEREIGNTY_SERVICE,
    () => new CreatorSovereigntyServiceImpl(
      globalContainer.resolve(INTERFACE_NAMES.CREATOR_DATA_REPOSITORY),
      globalContainer.resolve(INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY)
    ),
    {
      singleton: true,
      factory: true,
      dependencies: [
        INTERFACE_NAMES.CREATOR_DATA_REPOSITORY,
        INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY
      ],
      configuration: {
        mathematicalMinimum: 0.75,
        enforcementMode: 'strict'
      }
    }
  );

  // Democratic Governance Service
  globalContainer.register(
    INTERFACE_NAMES.DEMOCRATIC_GOVERNANCE_SERVICE,
    () => new DemocraticGovernanceServiceImpl(
      globalContainer.resolve(INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY),
      globalContainer.resolve(INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY)
    ),
    {
      singleton: true,
      factory: true,
      dependencies: [
        INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY,
        INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY
      ],
      configuration: {
        participationMinimum: 0.1,
        votingMethod: 'one_member_one_vote'
      }
    }
  );

  // Community Protection Service
  globalContainer.register(
    INTERFACE_NAMES.COMMUNITY_PROTECTION_SERVICE,
    () => new CommunityProtectionServiceImpl(
      globalContainer.resolve(INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY),
      globalContainer.resolve(INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY)
    ),
    {
      singleton: true,
      factory: true,
      dependencies: [
        INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY,
        INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY
      ],
      configuration: {
        effectivenessMinimum: 0.95,
        traumaInformedMode: 'maximum'
      }
    }
  );

  // Revenue Transparency Service
  globalContainer.register(
    INTERFACE_NAMES.REVENUE_TRANSPARENCY_SERVICE,
    () => new RevenueTransparencyServiceImpl(
      globalContainer.resolve(INTERFACE_NAMES.CREATOR_DATA_REPOSITORY),
      globalContainer.resolve(INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY),
      globalContainer.resolve(INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY)
    ),
    {
      singleton: true,
      factory: true,
      dependencies: [
        INTERFACE_NAMES.CREATOR_DATA_REPOSITORY,
        INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY,
        INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY
      ],
      configuration: {
        transparencyLevel: 'maximum',
        realTimeTracking: true
      }
    }
  );

  // Feature Flag Service
  globalContainer.register(
    INTERFACE_NAMES.FEATURE_FLAG_SERVICE,
    () => new FeatureFlagServiceImpl(
      globalContainer.resolve(INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY),
      globalContainer.resolve(INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY)
    ),
    {
      singleton: true,
      factory: true,
      dependencies: [
        INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY,
        INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY
      ],
      configuration: {
        communityControlRequired: true,
        governanceMode: 'democratic'
      }
    }
  );

  // Liberation Metrics Service
  globalContainer.register(
    INTERFACE_NAMES.LIBERATION_METRICS_SERVICE,
    () => new LiberationMetricsServiceImpl(
      globalContainer.resolve(INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY),
      globalContainer.resolve(INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY)
    ),
    {
      singleton: true,
      factory: true,
      dependencies: [
        INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY,
        INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY
      ],
      configuration: {
        monitoringInterval: 5000, // 5 seconds
        rollbackThresholds: {
          creatorSovereignty: 0.75,
          communityProtection: 0.95
        }
      }
    }
  );

  console.log('✓ Layer 3 services configured');
}

/**
 * Configure Liberation Orchestrator (Layer 3 Coordinator)
 */
function configureLiberationOrchestrator() {
  console.log('Configuring Liberation Orchestrator...');

  globalContainer.register(
    'LiberationOrchestrator',
    () => new RefactoredLiberationOrchestrator(
      globalContainer.resolve(INTERFACE_NAMES.CREATOR_SOVEREIGNTY_SERVICE),
      globalContainer.resolve(INTERFACE_NAMES.DEMOCRATIC_GOVERNANCE_SERVICE),
      globalContainer.resolve(INTERFACE_NAMES.COMMUNITY_PROTECTION_SERVICE),
      globalContainer.resolve(INTERFACE_NAMES.REVENUE_TRANSPARENCY_SERVICE),
      globalContainer.resolve(INTERFACE_NAMES.FEATURE_FLAG_SERVICE),
      globalContainer.resolve(INTERFACE_NAMES.LIBERATION_METRICS_SERVICE)
    ),
    {
      singleton: true,
      factory: true,
      dependencies: [
        INTERFACE_NAMES.CREATOR_SOVEREIGNTY_SERVICE,
        INTERFACE_NAMES.DEMOCRATIC_GOVERNANCE_SERVICE,
        INTERFACE_NAMES.COMMUNITY_PROTECTION_SERVICE,
        INTERFACE_NAMES.REVENUE_TRANSPARENCY_SERVICE,
        INTERFACE_NAMES.FEATURE_FLAG_SERVICE,
        INTERFACE_NAMES.LIBERATION_METRICS_SERVICE
      ],
      configuration: {
        orchestrationMode: 'liberation_focused',
        mathematicalEnforcement: true
      }
    }
  );

  console.log('✓ Liberation Orchestrator configured');
}

/**
 * Initialize all container configurations
 */
function initializeContainer() {
  console.log('🏴‍☠️ Initializing Liberation Platform Container Configuration...');

  try {
    // Configure layers in dependency order (bottom-up)
    configureLayer5Services(); // Data Access Layer first
    configureLayer3Services(); // Business Logic Layer second
    configureLiberationOrchestrator(); // Orchestrator last

    console.log('✅ Container configuration completed successfully!');
    console.log(`📋 Registered services: ${globalContainer.listRegisteredServices().join(', ')}`);

    return globalContainer;

  } catch (error) {
    console.error('🚨 Container configuration failed:', error);
    throw error;
  }
}

/**
 * Validate container configuration
 */
function validateContainerConfiguration() {
  console.log('Validating container configuration...');

  const requiredServices = [
    INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY,
    INTERFACE_NAMES.CREATOR_DATA_REPOSITORY,
    INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY,
    INTERFACE_NAMES.CREATOR_SOVEREIGNTY_SERVICE,
    INTERFACE_NAMES.DEMOCRATIC_GOVERNANCE_SERVICE,
    INTERFACE_NAMES.COMMUNITY_PROTECTION_SERVICE,
    INTERFACE_NAMES.REVENUE_TRANSPARENCY_SERVICE,
    INTERFACE_NAMES.FEATURE_FLAG_SERVICE,
    INTERFACE_NAMES.LIBERATION_METRICS_SERVICE,
    'LiberationOrchestrator'
  ];

  const missingServices = requiredServices.filter(service => !globalContainer.isRegistered(service));

  if (missingServices.length > 0) {
    throw new Error(`Missing required services: ${missingServices.join(', ')}`);
  }

  console.log('✅ Container configuration validation passed');
  return true;
}

/**
 * Create and configure container for testing
 */
function createTestContainer() {
  const testContainer = globalContainer.createChildContainer();

  // Override services with test implementations
  const TestCreatorDataRepository = require('./test/mocks/TestCreatorDataRepository');
  const TestAuditTrailRepository = require('./test/mocks/TestAuditTrailRepository');

  testContainer.register(
    INTERFACE_NAMES.CREATOR_DATA_REPOSITORY,
    () => new TestCreatorDataRepository(),
    { singleton: true }
  );

  testContainer.register(
    INTERFACE_NAMES.AUDIT_TRAIL_REPOSITORY,
    () => new TestAuditTrailRepository(),
    { singleton: true }
  );

  return testContainer;
}

/**
 * Demonstration: Resolve services and show contract compliance
 */
async function demonstrateContractSeparation() {
  console.log('\n🔍 Demonstrating Contract Separation...');

  try {
    // Initialize container
    const container = initializeContainer();

    // Validate configuration
    validateContainerConfiguration();

    // Resolve and demonstrate services
    const orchestrator = container.resolve('LiberationOrchestrator');
    console.log('✅ Liberation Orchestrator resolved successfully');

    // Demonstrate contract compliance - orchestrator only knows about interfaces
    console.log('📋 Orchestrator Dependencies (Interface Contracts Only):');
    console.log('  - ICreatorSovereigntyService');
    console.log('  - IDemocraticGovernanceService');
    console.log('  - ICommunityProtectionService');
    console.log('  - IRevenueTransparencyService');
    console.log('  - IFeatureFlagService');
    console.log('  - ILiberationMetricsService');

    // Resolve data repositories separately (Layer 5)
    const communityRepo = container.resolve(INTERFACE_NAMES.COMMUNITY_DATA_REPOSITORY);
    const creatorRepo = container.resolve(INTERFACE_NAMES.CREATOR_DATA_REPOSITORY);
    console.log('✅ Data repositories resolved successfully (Layer 5 separation maintained)');

    console.log('\n🎉 Contract separation demonstration completed!');
    console.log('📊 Key Benefits Achieved:');
    console.log('  ✓ Layer 3 depends only on interface contracts');
    console.log('  ✓ Layer 5 implements only data access operations');
    console.log('  ✓ No direct dependencies between concrete implementations');
    console.log('  ✓ Easy to test with mock implementations');
    console.log('  ✓ Easy to swap implementations without changing business logic');

    return { orchestrator, communityRepo, creatorRepo };

  } catch (error) {
    console.error('🚨 Contract separation demonstration failed:', error);
    throw error;
  }
}

module.exports = {
  initializeContainer,
  validateContainerConfiguration,
  createTestContainer,
  demonstrateContractSeparation,
  globalContainer,
  INTERFACE_NAMES
};
/**
 * Service Bootstrap Configuration
 * Centralized registration of all services with dependency mapping
 *
 * PHILOSOPHY: Single source of truth for all service dependencies
 * Following target architecture with singleton pattern and clean separation
 */

const container = require('./UnifiedServiceContainer');

// Layer 3: Business Logic Services
const EconomicJusticeService = require('./layer-3-business-logic/EconomicJusticeService');
const NewsroomLiberationService = require('./layer-3-business-logic/NewsroomLiberationService');
const EventsLiberationService = require('./layer-3-business-logic/EventsLiberationService');
const IvorAILiberationService = require('./layer-3-business-logic/IvorAILiberationService');
const LiberationBusinessLogicOrchestrator = require('./layer-3-business-logic/LiberationBusinessLogicOrchestrator');

// Layer 5: Data Sovereignty Services
const DataSovereigntyService = require('./layer-5-data-sovereignty/DataSovereigntyService');

// Contract Implementation Services (Advanced DI)
const CreatorSovereigntyServiceImpl = require('./layer-3-business-logic/services/CreatorSovereigntyServiceImpl');
const DemocraticGovernanceServiceImpl = require('./layer-3-business-logic/services/DemocraticGovernanceServiceImpl');
const CommunityProtectionServiceImpl = require('./layer-3-business-logic/services/CommunityProtectionServiceImpl');
const RevenueTransparencyServiceImpl = require('./layer-3-business-logic/services/RevenueTransparencyServiceImpl');
const FeatureFlagServiceImpl = require('./layer-3-business-logic/services/FeatureFlagServiceImpl');
const LiberationMetricsServiceImpl = require('./layer-3-business-logic/services/LiberationMetricsServiceImpl');

/**
 * Bootstrap all services with proper dependency injection
 * This replaces manual service instantiation with container-managed dependencies
 */
function bootstrapAllServices() {
  console.log('🚀 Bootstrapping complete service dependency injection...');

  try {
    // LAYER 5: Data Sovereignty (No dependencies)
    container.register('dataSovereigntyService', DataSovereigntyService, []);

    // LAYER 3: Core Business Logic Services (No cross-dependencies initially)
    container.register('economicJusticeService', EconomicJusticeService, []);

    // LAYER 3: Services with Economic Justice Dependency
    container.register('newsroomLiberationService', NewsroomLiberationService, ['economicJusticeService']);
    container.register('eventsLiberationService', EventsLiberationService, ['economicJusticeService']);
    container.register('ivorAILiberationService', IvorAILiberationService, ['economicJusticeService']);

    // LAYER 3: Contract Implementation Services (Advanced DI)
    container.register('creatorSovereigntyService', CreatorSovereigntyServiceImpl, []);
    container.register('democraticGovernanceService', DemocraticGovernanceServiceImpl, []);
    container.register('communityProtectionService', CommunityProtectionServiceImpl, []);
    container.register('revenueTransparencyService', RevenueTransparencyServiceImpl, ['economicJusticeService']);
    container.register('featureFlagService', FeatureFlagServiceImpl, []);
    container.register('liberationMetricsService', LiberationMetricsServiceImpl, []);

    // LAYER 3: Orchestrator (With dependency injection)
    container.register('liberationOrchestrator', LiberationBusinessLogicOrchestrator, [
      'newsroomLiberationService',
      'eventsLiberationService',
      'ivorAILiberationService'
    ]);

    // Initialize all services in dependency order
    container.initializeServices();

    console.log('✅ Complete service dependency injection bootstrap completed');
    console.log(`📊 Registered services: ${container.getRegisteredServices().join(', ')}`);

    return container;

  } catch (error) {
    console.error('🚨 Service bootstrap failed:', error.message);
    throw error;
  }
}

/**
 * Get service instance from container (per target architecture)
 * @param {string} serviceName - Name of service to retrieve
 * @returns {Object} - Service instance with dependencies injected
 */
function getService(serviceName) {
  return container.get(serviceName);
}

/**
 * Get multiple services as object (convenience method)
 * @param {Array} serviceNames - Array of service names
 * @returns {Object} - Object with service instances
 */
function getServices(serviceNames) {
  const services = {};
  for (const name of serviceNames) {
    services[name] = container.get(name);
  }
  return services;
}

/**
 * Export services following target architecture pattern
 */
module.exports = {
  bootstrap: bootstrapAllServices,
  getService,
  getServices,
  container,

  // Export service instances following documentation pattern
  get economicJusticeService() { return getService('economicJusticeService'); },
  get newsroomLiberationService() { return getService('newsroomLiberationService'); },
  get eventsLiberationService() { return getService('eventsLiberationService'); },
  get ivorAILiberationService() { return getService('ivorAILiberationService'); },
  get dataSovereigntyService() { return getService('dataSovereigntyService'); },
  get liberationOrchestrator() { return getService('liberationOrchestrator'); }
};
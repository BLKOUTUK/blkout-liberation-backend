/**
 * ServiceRegistry.js
 * Central registry for all services with pure layer separation
 *
 * RESPONSIBILITY: Bootstrap all services into dependency injection container
 * NO business logic, NO data persistence - pure service registration
 */

const serviceContainer = require('./ServiceContainer');

// Import all service classes (Layer 3: Business Logic)
const NewsroomLiberationService = require('../layer-3-business-logic/NewsroomLiberationService');
const EconomicJusticeService = require('../layer-3-business-logic/EconomicJusticeService');
const EventsLiberationService = require('../layer-3-business-logic/EventsLiberationService');
const IvorAILiberationService = require('../layer-3-business-logic/IvorAILiberationService');

// Import data sovereignty service instance (Layer 5: Data Persistence)
const dataSovereigntyServiceInstance = require('../layer-5-data-sovereignty/DataSovereigntyService');

/**
 * Bootstrap all services into the dependency injection container
 * This ensures pure separation - no service directly instantiates another
 */
function bootstrapServices() {
  console.log('🚀 Bootstrapping services for pure layer separation');

  try {
    // Register Layer 3: Business Logic Services (as factories for clean instantiation)
    serviceContainer.register('EconomicJusticeService', EconomicJusticeService, false);
    serviceContainer.register('NewsroomLiberationService', NewsroomLiberationService, false);
    serviceContainer.register('EventsLiberationService', EventsLiberationService, false);
    serviceContainer.register('IvorAILiberationService', IvorAILiberationService, false);

    // Register Layer 5: Data Sovereignty Service (pre-existing singleton instance)
    serviceContainer.registerFactory('DataSovereigntyService', () => dataSovereigntyServiceInstance);

    // Register factory for NewsroomLiberationService with EconomicJusticeService dependency
    serviceContainer.registerFactory('NewsroomLiberationServiceWithDependencies', (dependencies = {}) => {
      // Pure dependency injection - no direct instantiation
      const economicJusticeService = dependencies.economicJusticeService ||
                                   serviceContainer.get('EconomicJusticeService');

      // Create NewsroomLiberationService and inject the dependency
      const newsroomService = serviceContainer.get('NewsroomLiberationService');
      newsroomService.setEconomicJusticeService(economicJusticeService);

      return newsroomService;
    });

    console.log('✅ All services bootstrapped successfully');
    console.log('📋 Registered services:', serviceContainer.getRegisteredServices());

    return {
      success: true,
      servicesRegistered: serviceContainer.getRegisteredServices().length,
      container: serviceContainer
    };

  } catch (error) {
    console.error('🚨 Service bootstrapping failed:', error.message);
    throw error;
  }
}

/**
 * Get the service container instance
 * @returns {ServiceContainer} The service container
 */
function getServiceContainer() {
  return serviceContainer;
}

/**
 * Create API layer services with pure dependency injection
 * @returns {Object} Object containing all API layer services
 */
function createAPILayerServices() {
  return {
    // Business Logic Services (Layer 3) - pure dependency injection
    newsroom: serviceContainer.get('NewsroomLiberationServiceWithDependencies'),
    economicJustice: serviceContainer.get('EconomicJusticeService'),
    events: serviceContainer.get('EventsLiberationService'),
    ivorAI: serviceContainer.get('IvorAILiberationService'),

    // Data Sovereignty Service (Layer 5) - singleton
    dataSovereignty: serviceContainer.get('DataSovereigntyService')
  };
}

module.exports = {
  bootstrapServices,
  getServiceContainer,
  createAPILayerServices
};
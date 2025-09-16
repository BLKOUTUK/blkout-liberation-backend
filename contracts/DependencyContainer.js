/**
 * Dependency Injection Container
 *
 * SCOPE: Manages service registration and resolution for contract separation
 * DOES NOT: Contain business logic or data access implementations
 * ONLY: Provides dependency injection infrastructure for contract compliance
 */

class DependencyContainer {
  constructor() {
    this.services = new Map();
    this.instances = new Map();
    this.configurations = new Map();
  }

  /**
   * Register a service with its interface contract
   * @param {string} interfaceName - Interface contract name
   * @param {Function} implementation - Implementation class/factory function
   * @param {Object} options - Registration options (singleton, factory, etc.)
   */
  register(interfaceName, implementation, options = {}) {
    if (!interfaceName) {
      throw new Error('Interface name is required for service registration');
    }

    if (!implementation) {
      throw new Error('Implementation is required for service registration');
    }

    const serviceConfig = {
      implementation,
      singleton: options.singleton !== false, // Default to singleton
      factory: options.factory || false,
      dependencies: options.dependencies || [],
      configuration: options.configuration || {},
      initialized: false
    };

    this.services.set(interfaceName, serviceConfig);
    this.configurations.set(interfaceName, options.configuration || {});

    console.log(`✓ Registered service: ${interfaceName} (${serviceConfig.singleton ? 'singleton' : 'transient'})`);
  }

  /**
   * Resolve a service by interface name with dependency injection
   * @param {string} interfaceName - Interface contract name to resolve
   * @returns {Object} - Resolved service instance
   */
  resolve(interfaceName) {
    if (!interfaceName) {
      throw new Error('Interface name is required for service resolution');
    }

    // Check if singleton instance already exists
    if (this.instances.has(interfaceName)) {
      return this.instances.get(interfaceName);
    }

    // Get service configuration
    const serviceConfig = this.services.get(interfaceName);
    if (!serviceConfig) {
      throw new Error(`Service not registered: ${interfaceName}. Available services: ${Array.from(this.services.keys()).join(', ')}`);
    }

    try {
      let serviceInstance;

      if (serviceConfig.factory) {
        // Factory pattern: Call factory function
        serviceInstance = serviceConfig.implementation(this.configurations.get(interfaceName));
      } else {
        // Constructor pattern: Instantiate with dependencies
        const dependencies = this.resolveDependencies(serviceConfig.dependencies);
        serviceInstance = new serviceConfig.implementation(...dependencies);
      }

      // Store singleton instance
      if (serviceConfig.singleton) {
        this.instances.set(interfaceName, serviceInstance);
      }

      // Validate service implements required interface
      this.validateServiceInterface(interfaceName, serviceInstance);

      serviceConfig.initialized = true;
      return serviceInstance;

    } catch (error) {
      throw new Error(`Failed to resolve service ${interfaceName}: ${error.message}`);
    }
  }

  /**
   * Resolve multiple services at once
   * @param {Array<string>} interfaceNames - Array of interface names
   * @returns {Array} - Array of resolved service instances
   */
  resolveMultiple(interfaceNames) {
    return interfaceNames.map(name => this.resolve(name));
  }

  /**
   * Resolve service dependencies recursively
   * @param {Array<string>} dependencyNames - Array of dependency interface names
   * @returns {Array} - Array of resolved dependency instances
   */
  resolveDependencies(dependencyNames) {
    if (!dependencyNames || dependencyNames.length === 0) {
      return [];
    }

    return dependencyNames.map(dependencyName => {
      try {
        return this.resolve(dependencyName);
      } catch (error) {
        throw new Error(`Failed to resolve dependency ${dependencyName}: ${error.message}`);
      }
    });
  }

  /**
   * Validate that service instance implements the required interface
   * @param {string} interfaceName - Interface contract name
   * @param {Object} serviceInstance - Service instance to validate
   */
  validateServiceInterface(interfaceName, serviceInstance) {
    // Basic interface validation - check that service instance exists
    if (!serviceInstance) {
      throw new Error(`Service instance is null for interface: ${interfaceName}`);
    }

    // In a more sophisticated implementation, this would validate all interface methods
    console.log(`✓ Validated service interface: ${interfaceName}`);
  }

  /**
   * Check if service is registered
   * @param {string} interfaceName - Interface contract name
   * @returns {boolean} - True if service is registered
   */
  isRegistered(interfaceName) {
    return this.services.has(interfaceName);
  }

  /**
   * Get registered service configuration
   * @param {string} interfaceName - Interface contract name
   * @returns {Object|null} - Service configuration or null
   */
  getServiceConfig(interfaceName) {
    return this.services.get(interfaceName) || null;
  }

  /**
   * List all registered services
   * @returns {Array<string>} - Array of registered interface names
   */
  listRegisteredServices() {
    return Array.from(this.services.keys());
  }

  /**
   * Clear all registered services and instances
   */
  clear() {
    this.services.clear();
    this.instances.clear();
    this.configurations.clear();
    console.log('✓ Cleared all registered services');
  }

  /**
   * Create a child container for scoped dependencies
   * @returns {DependencyContainer} - New child container
   */
  createChildContainer() {
    const childContainer = new DependencyContainer();

    // Inherit parent service registrations
    for (const [interfaceName, serviceConfig] of this.services.entries()) {
      childContainer.services.set(interfaceName, { ...serviceConfig });
      childContainer.configurations.set(interfaceName, this.configurations.get(interfaceName));
    }

    return childContainer;
  }

  /**
   * Register services for specific layer with validation
   * @param {string} layerName - Layer name (e.g., 'layer-3-business-logic')
   * @param {Object} serviceRegistrations - Object with interface->implementation mappings
   */
  registerLayerServices(layerName, serviceRegistrations) {
    console.log(`Registering services for ${layerName}:`);

    for (const [interfaceName, config] of Object.entries(serviceRegistrations)) {
      try {
        this.register(interfaceName, config.implementation, {
          singleton: config.singleton,
          dependencies: config.dependencies,
          configuration: config.configuration
        });
        console.log(`  ✓ ${interfaceName}`);
      } catch (error) {
        console.error(`  ✗ Failed to register ${interfaceName}: ${error.message}`);
        throw error;
      }
    }

    console.log(`✓ Completed registration for ${layerName}`);
  }

  /**
   * Dispose of all singleton instances (for cleanup)
   */
  dispose() {
    for (const [interfaceName, instance] of this.instances.entries()) {
      if (instance && typeof instance.dispose === 'function') {
        try {
          instance.dispose();
          console.log(`✓ Disposed service: ${interfaceName}`);
        } catch (error) {
          console.error(`✗ Error disposing service ${interfaceName}: ${error.message}`);
        }
      }
    }

    this.clear();
  }
}

/**
 * Global container instance for application-wide use
 */
const globalContainer = new DependencyContainer();

/**
 * Interface name constants for type safety
 */
const INTERFACE_NAMES = {
  // Layer 3 - Business Logic Interfaces
  CREATOR_SOVEREIGNTY_SERVICE: 'ICreatorSovereigntyService',
  DEMOCRATIC_GOVERNANCE_SERVICE: 'IDemocraticGovernanceService',
  COMMUNITY_PROTECTION_SERVICE: 'ICommunityProtectionService',
  REVENUE_TRANSPARENCY_SERVICE: 'IRevenueTransparencyService',
  FEATURE_FLAG_SERVICE: 'IFeatureFlagService',
  LIBERATION_METRICS_SERVICE: 'ILiberationMetricsService',

  // Layer 5 - Data Access Interfaces
  COMMUNITY_DATA_REPOSITORY: 'ICommunityDataRepository',
  CREATOR_DATA_REPOSITORY: 'ICreatorDataRepository',
  GOVERNANCE_DATA_REPOSITORY: 'IGovernanceDataRepository',
  AUDIT_TRAIL_REPOSITORY: 'IAuditTrailRepository',
  DATA_VALIDATION_REPOSITORY: 'IDataValidationRepository'
};

module.exports = {
  DependencyContainer,
  globalContainer,
  INTERFACE_NAMES
};
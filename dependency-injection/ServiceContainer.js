/**
 * ServiceContainer.js
 * Pure Dependency Injection Container for Clean Layer Separation
 *
 * PHILOSOPHY: No service should directly instantiate another service
 * All dependencies are injected through this centralized container
 */

class ServiceContainer {
  constructor() {
    this.services = new Map();
    this.singletons = new Map();
    this.factories = new Map();

    console.log('🏗️ Service Container initialized for pure layer separation');
  }

  /**
   * Register a service class for dependency injection
   * @param {string} name - Service name identifier
   * @param {Function} serviceClass - Service class constructor
   * @param {boolean} singleton - Whether to create singleton instance
   */
  register(name, serviceClass, singleton = false) {
    if (singleton) {
      this.singletons.set(name, serviceClass);
    } else {
      this.services.set(name, serviceClass);
    }

    console.log(`📋 Registered service: ${name} (${singleton ? 'singleton' : 'factory'})`);
  }

  /**
   * Register a factory function for complex service creation
   * @param {string} name - Service name identifier
   * @param {Function} factory - Factory function that returns service instance
   */
  registerFactory(name, factory) {
    this.factories.set(name, factory);
    console.log(`🏭 Registered factory: ${name}`);
  }

  /**
   * Get service instance with dependency injection
   * @param {string} name - Service name identifier
   * @param {Object} dependencies - Dependencies to inject
   * @returns {Object} Service instance
   */
  get(name, dependencies = {}) {
    // Check for singleton first
    if (this.singletons.has(name)) {
      const cacheKey = `${name}_singleton`;
      if (!this.services.has(cacheKey)) {
        const ServiceClass = this.singletons.get(name);
        const instance = new ServiceClass(dependencies);
        this.services.set(cacheKey, instance);
        console.log(`🔄 Created singleton: ${name}`);
      }
      return this.services.get(cacheKey);
    }

    // Check for factory
    if (this.factories.has(name)) {
      const factory = this.factories.get(name);
      const instance = factory(dependencies);
      console.log(`🏭 Created from factory: ${name}`);
      return instance;
    }

    // Create new instance
    if (this.services.has(name)) {
      const ServiceClass = this.services.get(name);
      const instance = new ServiceClass(dependencies);
      console.log(`✨ Created instance: ${name}`);
      return instance;
    }

    throw new Error(`Service not registered: ${name}`);
  }

  /**
   * Create service with automatic dependency resolution
   * @param {string} name - Service name identifier
   * @returns {Object} Service instance with all dependencies resolved
   */
  resolve(name) {
    // For now, return basic instance - can be enhanced for automatic dependency resolution
    return this.get(name);
  }

  /**
   * Get all registered service names
   * @returns {Array} Array of service names
   */
  getRegisteredServices() {
    return [
      ...this.services.keys(),
      ...this.singletons.keys(),
      ...this.factories.keys()
    ];
  }

  /**
   * Clear all services (useful for testing)
   */
  clear() {
    this.services.clear();
    this.singletons.clear();
    this.factories.clear();
    console.log('🧹 Service container cleared');
  }

  /**
   * Health check for service container
   */
  healthCheck() {
    return {
      containerStatus: 'operational',
      servicesRegistered: this.services.size + this.singletons.size,
      factoriesRegistered: this.factories.size,
      registeredServices: this.getRegisteredServices()
    };
  }
}

// Export singleton container instance
module.exports = new ServiceContainer();
/**
 * Unified Service Container
 * Combines interface contracts with service management for complete DI
 *
 * PHILOSOPHY: Centralized dependency management following target architecture
 * - Singleton pattern for service instances (per documentation)
 * - Automatic dependency resolution
 * - Interface contract compliance
 * - Liberation values enforcement
 */

class UnifiedServiceContainer {
  constructor() {
    this.services = new Map();          // Registered service classes
    this.instances = new Map();         // Singleton instances
    this.dependencies = new Map();      // Service dependency mapping
    this.interfaces = new Map();        // Interface contracts
    this.initialized = false;

    console.log('🏗️ Unified Service Container initialized for complete DI');
  }

  /**
   * Register a service with its dependencies and interface
   * @param {string} name - Service name
   * @param {Function} serviceClass - Service class constructor
   * @param {Array} dependencies - Array of dependency service names
   * @param {Object} options - Registration options
   */
  register(name, serviceClass, dependencies = [], options = {}) {
    if (!name || !serviceClass) {
      throw new Error('Service name and class are required');
    }

    this.services.set(name, serviceClass);
    this.dependencies.set(name, dependencies);

    // Store interface contract if provided
    if (options.interface) {
      this.interfaces.set(name, options.interface);
    }

    console.log(`📝 Registered service: ${name} with ${dependencies.length} dependencies`);
  }

  /**
   * Get service instance with automatic dependency injection
   * @param {string} name - Service name
   * @returns {Object} - Service instance with dependencies injected
   */
  get(name) {
    // Return singleton if already created
    if (this.instances.has(name)) {
      return this.instances.get(name);
    }

    // Get service class
    const ServiceClass = this.services.get(name);
    if (!ServiceClass) {
      throw new Error(`Service '${name}' not registered`);
    }

    // Resolve dependencies recursively
    const dependencies = this.resolveDependencies(name);

    // Create instance with dependencies
    let instance;
    if (dependencies.length === 0) {
      instance = new ServiceClass();
    } else {
      // Pass dependencies as constructor parameter
      instance = new ServiceClass(dependencies);
    }

    // Store as singleton
    this.instances.set(name, instance);

    console.log(`✅ Created service instance: ${name}`);
    return instance;
  }

  /**
   * Resolve all dependencies for a service
   * @param {string} serviceName - Service to resolve dependencies for
   * @returns {Object} - Object containing resolved dependency instances
   */
  resolveDependencies(serviceName) {
    const dependencyNames = this.dependencies.get(serviceName) || [];
    const resolvedDependencies = {};

    for (const depName of dependencyNames) {
      resolvedDependencies[depName] = this.get(depName);
    }

    return resolvedDependencies;
  }

  /**
   * Initialize all services with proper dependency order
   */
  initializeServices() {
    if (this.initialized) {
      console.log('⚠️ Services already initialized');
      return;
    }

    console.log('🚀 Initializing all services with dependency injection...');

    // Initialize services in dependency order (services with no deps first)
    const sortedServices = this.topologicalSort();

    for (const serviceName of sortedServices) {
      this.get(serviceName);
    }

    this.initialized = true;
    console.log('✅ All services initialized with dependency injection');
  }

  /**
   * Sort services by dependency order (topological sort)
   * @returns {Array} - Array of service names in dependency order
   */
  topologicalSort() {
    const visited = new Set();
    const visiting = new Set();
    const result = [];

    const visit = (serviceName) => {
      if (visiting.has(serviceName)) {
        throw new Error(`Circular dependency detected involving: ${serviceName}`);
      }
      if (visited.has(serviceName)) {
        return;
      }

      visiting.add(serviceName);
      const deps = this.dependencies.get(serviceName) || [];

      for (const dep of deps) {
        visit(dep);
      }

      visiting.delete(serviceName);
      visited.add(serviceName);
      result.push(serviceName);
    };

    for (const serviceName of this.services.keys()) {
      visit(serviceName);
    }

    return result;
  }

  /**
   * Get all registered services
   * @returns {Array} - Array of service names
   */
  getRegisteredServices() {
    return Array.from(this.services.keys());
  }

  /**
   * Check if service is registered
   * @param {string} name - Service name
   * @returns {boolean} - True if service is registered
   */
  hasService(name) {
    return this.services.has(name);
  }

  /**
   * Clear all services (for testing)
   */
  clear() {
    this.services.clear();
    this.instances.clear();
    this.dependencies.clear();
    this.interfaces.clear();
    this.initialized = false;
  }
}

// Export singleton container instance (per target architecture)
const unifiedContainer = new UnifiedServiceContainer();

module.exports = unifiedContainer;
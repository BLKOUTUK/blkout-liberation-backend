/**
 * Unified Service Container
 * Combines interface contracts with service management for complete DI
 * PHASE 4: Enhanced with runtime interface contract enforcement
 *
 * PHILOSOPHY: Centralized dependency management following target architecture
 * - Singleton pattern for service instances (per documentation)
 * - Automatic dependency resolution
 * - Interface contract compliance with runtime enforcement
 * - Liberation values enforcement
 */

class UnifiedServiceContainer {
  constructor() {
    this.services = new Map();          // Registered service classes
    this.instances = new Map();         // Singleton instances
    this.dependencies = new Map();      // Service dependency mapping
    this.interfaces = new Map();        // Interface contracts
    this.initialized = false;

    // PHASE 4: Contract enforcement features
    this.contractEnforcement = true;    // Enable strict contract enforcement
    this.contractViolations = [];       // Track contract violations
    this.contractValidations = [];      // Track successful validations

    console.log('🏗️ Unified Service Container initialized for complete DI with contract enforcement');
  }

  /**
   * Register a service with its dependencies and interface
   * PHASE 4: Enhanced with contract validation
   * @param {string} name - Service name
   * @param {Function} serviceClass - Service class constructor
   * @param {Array} dependencies - Array of dependency service names
   * @param {Object} options - Registration options (interface, contractEnforcement)
   */
  register(name, serviceClass, dependencies = [], options = {}) {
    if (!name || !serviceClass) {
      throw new Error('Service name and class are required');
    }

    // PHASE 4: Validate interface contract if provided
    if (options.interface && this.contractEnforcement) {
      this.validateServiceContract(name, serviceClass, options.interface);
    }

    this.services.set(name, serviceClass);
    this.dependencies.set(name, dependencies);

    // Store interface contract for runtime enforcement
    if (options.interface) {
      this.interfaces.set(name, options.interface);
    }

    console.log(`📝 Registered service: ${name} with ${dependencies.length} dependencies${options.interface ? ' (contract enforced)' : ''}`);
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
    this.contractViolations = [];
    this.contractValidations = [];
  }

  // ===== PHASE 4: INTERFACE CONTRACT ENFORCEMENT METHODS =====

  /**
   * Validate that a service class implements required interface contract
   * @param {string} serviceName - Name of the service
   * @param {Function} serviceClass - Service constructor class
   * @param {Function} interfaceClass - Interface contract class
   */
  validateServiceContract(serviceName, serviceClass, interfaceClass) {
    try {
      // Check if service extends the interface class
      const extendsInterface = serviceClass.prototype instanceof interfaceClass ||
                              Object.getPrototypeOf(serviceClass) === interfaceClass;

      if (!extendsInterface) {
        const violation = {
          serviceName,
          violationType: 'interface_inheritance',
          message: `Service '${serviceName}' does not extend interface '${interfaceClass.name}'`,
          severity: 'error',
          timestamp: new Date().toISOString()
        };

        this.contractViolations.push(violation);

        if (this.contractEnforcement) {
          throw new Error(`CONTRACT VIOLATION: ${violation.message}`);
        }
      }

      // Validate required methods are implemented
      const interfaceMethods = this.getInterfaceMethods(interfaceClass);
      const serviceMethods = this.getServiceMethods(serviceClass);
      const missingMethods = interfaceMethods.filter(method => !serviceMethods.includes(method));

      if (missingMethods.length > 0) {
        const violation = {
          serviceName,
          violationType: 'missing_methods',
          message: `Service '${serviceName}' missing required methods: ${missingMethods.join(', ')}`,
          missingMethods,
          severity: 'error',
          timestamp: new Date().toISOString()
        };

        this.contractViolations.push(violation);

        if (this.contractEnforcement) {
          throw new Error(`CONTRACT VIOLATION: ${violation.message}`);
        }
      }

      // Record successful validation
      this.contractValidations.push({
        serviceName,
        interfaceName: interfaceClass.name,
        validatedMethods: interfaceMethods.length,
        timestamp: new Date().toISOString()
      });

      console.log(`✅ Contract validation passed for ${serviceName} -> ${interfaceClass.name}`);
      return true;

    } catch (error) {
      console.error(`❌ Contract validation failed for ${serviceName}:`, error.message);
      if (this.contractEnforcement) {
        throw error;
      }
      return false;
    }
  }

  /**
   * Get all method names defined in an interface class
   * @param {Function} interfaceClass - Interface class
   * @returns {Array} - Array of method names
   */
  getInterfaceMethods(interfaceClass) {
    const methods = [];
    const prototype = interfaceClass.prototype;

    Object.getOwnPropertyNames(prototype).forEach(name => {
      if (name !== 'constructor' && typeof prototype[name] === 'function') {
        methods.push(name);
      }
    });

    return methods;
  }

  /**
   * Get all method names implemented in a service class
   * @param {Function} serviceClass - Service class
   * @returns {Array} - Array of method names
   */
  getServiceMethods(serviceClass) {
    const methods = [];
    const prototype = serviceClass.prototype;

    Object.getOwnPropertyNames(prototype).forEach(name => {
      if (name !== 'constructor' && typeof prototype[name] === 'function') {
        methods.push(name);
      }
    });

    return methods;
  }

  /**
   * Get contract violation report
   * @returns {Object} - Contract violation and validation summary
   */
  getContractReport() {
    return {
      enforcementEnabled: this.contractEnforcement,
      totalViolations: this.contractViolations.length,
      totalValidations: this.contractValidations.length,
      violations: this.contractViolations,
      validations: this.contractValidations,
      complianceRate: this.contractValidations.length / (this.contractValidations.length + this.contractViolations.length) || 1,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Enable or disable contract enforcement
   * @param {boolean} enabled - Whether to enforce contracts
   */
  setContractEnforcement(enabled) {
    this.contractEnforcement = enabled;
    console.log(`🔒 Contract enforcement ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }
}

// Export singleton container instance (per target architecture)
const unifiedContainer = new UnifiedServiceContainer();

module.exports = unifiedContainer;
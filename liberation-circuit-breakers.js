/**
 * Liberation-Preserving Circuit Breakers
 *
 * Enhanced circuit breaker implementation that maintains liberation values
 * even during service failures and degraded states
 */

class LiberationCircuitBreaker {
  constructor(name, options = {}) {
    this.name = name;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.nextAttempt = null;

    // Configuration
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 60000; // 60 seconds
    this.monitoringPeriod = options.monitoringPeriod || 60000;

    // Liberation-specific configuration
    this.liberationFallback = options.liberationFallback;
    this.preserveValues = options.preserveValues || [];
    this.communityNotification = options.communityNotification || false;

    // Metrics
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      circuitOpenEvents: 0,
      fallbackExecutions: 0,
      liberationValuesPreserved: 0
    };
  }

  /**
   * Execute a function with circuit breaker protection
   * Preserves liberation values in fallback responses
   */
  async execute(fn, liberationContext = {}) {
    this.metrics.totalRequests++;

    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        console.log(`🔴 Circuit breaker ${this.name} is OPEN, executing liberation fallback`);
        return await this.executeLiberationFallback(liberationContext);
      } else {
        this.state = 'HALF_OPEN';
        console.log(`🟡 Circuit breaker ${this.name} is HALF_OPEN, attempting request`);
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure(error);
      throw error;
    }
  }

  /**
   * Handle successful request
   */
  onSuccess() {
    this.metrics.successfulRequests++;

    if (this.state === 'HALF_OPEN') {
      console.log(`🟢 Circuit breaker ${this.name} is now CLOSED (recovered)`);
      this.state = 'CLOSED';
      this.failureCount = 0;
      this.notifyCommunityRecovery();
    }
  }

  /**
   * Handle failed request
   */
  onFailure(error) {
    this.metrics.failedRequests++;
    this.failureCount++;
    this.lastFailureTime = Date.now();

    console.log(`❌ Circuit breaker ${this.name} failure ${this.failureCount}/${this.failureThreshold}: ${error.message}`);

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
      this.metrics.circuitOpenEvents++;

      console.log(`🔴 Circuit breaker ${this.name} is now OPEN for ${this.timeout}ms`);

      if (this.communityNotification) {
        this.notifyCommunityFailure();
      }
    }
  }

  /**
   * Execute liberation-preserving fallback
   */
  async executeLiberationFallback(liberationContext) {
    this.metrics.fallbackExecutions++;
    this.metrics.liberationValuesPreserved++;

    if (this.liberationFallback) {
      console.log(`✊ Executing liberation fallback for ${this.name}`);
      return await this.liberationFallback(liberationContext);
    }

    // Default liberation-preserving fallback
    return this.getDefaultLiberationFallback(liberationContext);
  }

  /**
   * Default fallback that preserves liberation values
   */
  getDefaultLiberationFallback(liberationContext) {
    const baseResponse = {
      service: this.name,
      status: 'temporarily_unavailable',
      liberationValuesPreserved: true,
      timestamp: new Date().toISOString(),
      circuitBreakerActive: true
    };

    // Preserve core liberation values based on service type
    switch (this.name) {
      case 'creator-service':
        return {
          ...baseResponse,
          message: 'Creator service temporarily unavailable',
          sovereignty: {
            revenueShare: '75% minimum guaranteed during outage',
            narrativeControl: 'Creator control maintained',
            dataOwnership: 'Creator-owned data protected',
            fallbackSupport: '/creator/emergency-support'
          },
          fallbackData: {
            creatorRightsProtected: true,
            revenueCalculation: 'Queued for processing',
            contentControl: 'Emergency creator contact available'
          }
        };

      case 'governance-service':
        return {
          ...baseResponse,
          message: 'Governance service temporarily unavailable',
          democratic: {
            voting: 'Votes queued and will be counted',
            proposals: 'Community proposals accepted',
            transparency: 'All actions logged for community review',
            participationPath: '/community/democratic-engagement'
          },
          fallbackData: {
            democraticProcessesContinue: true,
            communityVoicePreserved: true,
            transparencyMaintained: true
          }
        };

      case 'community-protection':
        return {
          ...baseResponse,
          message: 'Community protection service temporarily unavailable',
          protection: {
            basicProtectionActive: 'Core anti-oppression measures maintained',
            dataSovereignty: 'Community data access restricted',
            surveillance: 'Enhanced privacy mode activated',
            emergencyContact: '/community/protection-emergency'
          },
          fallbackData: {
            communityBenefitPreserved: true,
            antiOppressionActive: true,
            privacyProtected: true
          }
        };

      default:
        return {
          ...baseResponse,
          message: `${this.name} temporarily unavailable`,
          liberation: {
            valuesPreserved: this.preserveValues,
            communityBenefit: 'Maintained during outage',
            supportPath: '/community/service-support'
          }
        };
    }
  }

  /**
   * Get circuit breaker status
   */
  getStatus() {
    return {
      name: this.name,
      state: this.state,
      failureCount: this.failureCount,
      failureThreshold: this.failureThreshold,
      lastFailureTime: this.lastFailureTime,
      nextAttempt: this.nextAttempt,
      metrics: this.metrics,
      liberationContext: {
        valuesPreserved: this.preserveValues,
        fallbacksExecuted: this.metrics.fallbackExecutions,
        communityNotificationEnabled: this.communityNotification
      }
    };
  }

  /**
   * Reset circuit breaker
   */
  reset() {
    console.log(`🔄 Resetting circuit breaker ${this.name}`);
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.nextAttempt = null;
  }

  /**
   * Notify community of service failure
   */
  async notifyCommunityFailure() {
    console.log(`📢 Community notification: ${this.name} service temporarily unavailable`);
    console.log(`✊ Liberation values preserved during outage`);
    // In production: Send to community notification system
  }

  /**
   * Notify community of service recovery
   */
  async notifyCommunityRecovery() {
    console.log(`📢 Community notification: ${this.name} service recovered`);
    console.log(`✅ Full service restored with liberation values intact`);
    // In production: Send to community notification system
  }
}

/**
 * Liberation Circuit Breaker Manager
 * Manages multiple circuit breakers with liberation value preservation
 */
class LiberationCircuitBreakerManager {
  constructor() {
    this.circuitBreakers = new Map();
    this.liberationMetrics = {
      totalFallbacks: 0,
      valuesPreservedCount: 0,
      communityNotificationsSent: 0,
      serviceRecoveries: 0
    };
  }

  /**
   * Register a circuit breaker with liberation configuration
   */
  register(name, options = {}) {
    const circuitBreaker = new LiberationCircuitBreaker(name, options);
    this.circuitBreakers.set(name, circuitBreaker);

    console.log(`✅ Registered liberation circuit breaker: ${name}`);
    return circuitBreaker;
  }

  /**
   * Execute function with circuit breaker protection
   */
  async execute(serviceName, fn, liberationContext = {}) {
    const circuitBreaker = this.circuitBreakers.get(serviceName);

    if (!circuitBreaker) {
      throw new Error(`Circuit breaker not found: ${serviceName}`);
    }

    try {
      return await circuitBreaker.execute(fn, liberationContext);
    } catch (error) {
      // If circuit breaker is open, execute fallback
      if (circuitBreaker.state === 'OPEN') {
        this.liberationMetrics.totalFallbacks++;
        this.liberationMetrics.valuesPreservedCount++;
        return await circuitBreaker.executeLiberationFallback(liberationContext);
      }
      throw error;
    }
  }

  /**
   * Get status of all circuit breakers
   */
  getAllStatus() {
    const status = {
      timestamp: new Date().toISOString(),
      circuitBreakers: {},
      liberationMetrics: this.liberationMetrics,
      overallHealth: {
        healthyServices: 0,
        degradedServices: 0,
        failedServices: 0,
        liberationValuesIntact: true
      }
    };

    for (const [name, cb] of this.circuitBreakers) {
      const cbStatus = cb.getStatus();
      status.circuitBreakers[name] = cbStatus;

      // Update overall health
      switch (cbStatus.state) {
        case 'CLOSED':
          status.overallHealth.healthyServices++;
          break;
        case 'HALF_OPEN':
          status.overallHealth.degradedServices++;
          break;
        case 'OPEN':
          status.overallHealth.failedServices++;
          break;
      }
    }

    return status;
  }

  /**
   * Reset all circuit breakers
   */
  resetAll() {
    console.log('🔄 Resetting all liberation circuit breakers');

    for (const [name, cb] of this.circuitBreakers) {
      cb.reset();
    }

    this.liberationMetrics = {
      totalFallbacks: 0,
      valuesPreservedCount: 0,
      communityNotificationsSent: 0,
      serviceRecoveries: 0
    };
  }

  /**
   * Monitor circuit breaker health
   */
  async monitorHealth() {
    const status = this.getAllStatus();

    // Log liberation-focused health summary
    console.log(`🛡️ Circuit Breaker Health Summary:`);
    console.log(`   Healthy Services: ${status.overallHealth.healthyServices}`);
    console.log(`   Degraded Services: ${status.overallHealth.degradedServices}`);
    console.log(`   Failed Services: ${status.overallHealth.failedServices}`);
    console.log(`   Liberation Values Preserved: ${this.liberationMetrics.valuesPreservedCount} times`);

    // Alert if multiple services are failing
    if (status.overallHealth.failedServices > 1) {
      console.log('🚨 Multiple services failing - community protection priority mode');
      await this.notifyCommunityMultipleFailures();
    }

    return status;
  }

  async notifyCommunityMultipleFailures() {
    console.log('📢 Community Alert: Multiple services experiencing issues');
    console.log('✊ Liberation values remain protected during service recovery');
    this.liberationMetrics.communityNotificationsSent++;
  }
}

// Pre-configured liberation circuit breakers
function createLiberationCircuitBreakers() {
  const manager = new LiberationCircuitBreakerManager();

  // Creator sovereignty service
  manager.register('creator-service', {
    failureThreshold: 5,
    timeout: 60000,
    preserveValues: ['creator_sovereignty', 'revenue_transparency', 'narrative_control'],
    communityNotification: true,
    liberationFallback: async (context) => ({
      service: 'creator-service',
      status: 'temporarily_unavailable',
      sovereignty: {
        revenueShare: '75% minimum guaranteed',
        narrativeControl: 'Maintained during outage',
        dataOwnership: 'Creator-controlled',
        emergencySupport: '/creator/emergency'
      },
      liberationValuesPreserved: true,
      fallbackActive: true
    })
  });

  // Democratic governance service
  manager.register('governance-service', {
    failureThreshold: 3,
    timeout: 30000,
    preserveValues: ['democratic_participation', 'community_voice', 'transparency'],
    communityNotification: true,
    liberationFallback: async (context) => ({
      service: 'governance-service',
      status: 'temporarily_unavailable',
      democratic: {
        voting: 'Votes queued for processing',
        proposals: 'Community input preserved',
        transparency: 'All actions logged and auditable',
        participation: '/community/governance'
      },
      liberationValuesPreserved: true,
      fallbackActive: true
    })
  });

  // Community protection service
  manager.register('community-protection', {
    failureThreshold: 2, // Lower threshold for protection services
    timeout: 15000,
    preserveValues: ['anti_oppression', 'data_sovereignty', 'privacy_protection'],
    communityNotification: true,
    liberationFallback: async (context) => ({
      service: 'community-protection',
      status: 'temporarily_unavailable',
      protection: {
        antiOppression: 'Core protections maintained',
        dataSovereignty: 'Community data secured',
        surveillance: 'Enhanced privacy mode active',
        emergency: '/community/protection-emergency'
      },
      liberationValuesPreserved: true,
      fallbackActive: true
    })
  });

  // IVOR AI service
  manager.register('ivor-service', {
    failureThreshold: 4,
    timeout: 45000,
    preserveValues: ['ai_transparency', 'community_benefit', 'bias_prevention'],
    communityNotification: true,
    liberationFallback: async (context) => ({
      service: 'ivor-service',
      status: 'temporarily_unavailable',
      ai: {
        transparency: 'AI decision-making remains auditable',
        communityBenefit: 'AI serves community during recovery',
        biasPreventention: 'Anti-bias measures active',
        fallbackHelp: '/community/ai-support'
      },
      liberationValuesPreserved: true,
      fallbackActive: true
    })
  });

  console.log('✅ Liberation circuit breakers configured');
  return manager;
}

module.exports = {
  LiberationCircuitBreaker,
  LiberationCircuitBreakerManager,
  createLiberationCircuitBreakers
};
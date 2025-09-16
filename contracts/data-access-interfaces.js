/**
 * Data Access Layer Contracts (Layer 5)
 *
 * SCOPE: Interface definitions for data persistence operations ONLY
 * DOES NOT: Contain business logic, decision making, or presentation concerns
 * ONLY: Defines data storage, retrieval, and basic validation contracts
 */

/**
 * Base Repository Interface
 * Common data operations for all entities
 */
class IBaseRepository {
  /**
   * Store entity data
   * @param {Object} entityData - Entity data to store
   * @returns {Promise<Object>} - Stored entity with generated ID
   */
  async store(entityData) {
    throw new Error('store must be implemented by concrete repository');
  }

  /**
   * Find entity by ID
   * @param {string} id - Entity identifier
   * @returns {Promise<Object|null>} - Found entity or null
   */
  async findById(id) {
    throw new Error('findById must be implemented by concrete repository');
  }

  /**
   * Update entity by ID
   * @param {string} id - Entity identifier
   * @param {Object} updates - Partial entity updates
   * @returns {Promise<Object>} - Updated entity
   */
  async update(id, updates) {
    throw new Error('update must be implemented by concrete repository');
  }

  /**
   * Delete entity by ID
   * @param {string} id - Entity identifier
   * @returns {Promise<boolean>} - True if deleted successfully
   */
  async delete(id) {
    throw new Error('delete must be implemented by concrete repository');
  }

  /**
   * Find all entities with optional pagination
   * @param {Object} options - Query options (limit, offset, filters)
   * @returns {Promise<Array>} - Array of entities
   */
  async findAll(options = {}) {
    throw new Error('findAll must be implemented by concrete repository');
  }
}

/**
 * Community Data Repository Contract
 * Handles community-owned data persistence
 */
class ICommunityDataRepository extends IBaseRepository {
  /**
   * Store data with community sovereignty metadata
   * @param {Object} data - Data to store
   * @param {Object} sovereigntyRequirements - Community sovereignty requirements
   * @returns {Promise<Object>} - Stored data with sovereignty metadata
   */
  async storeWithSovereignty(data, sovereigntyRequirements) {
    throw new Error('storeWithSovereignty must be implemented by concrete repository');
  }

  /**
   * Find data by community ID
   * @param {string} communityId - Community identifier
   * @returns {Promise<Array>} - Array of community data
   */
  async findByCommunityId(communityId) {
    throw new Error('findByCommunityId must be implemented by concrete repository');
  }

  /**
   * Validate data ownership (data validation only, no business decisions)
   * @param {string} dataId - Data identifier
   * @param {string} ownerId - Owner identifier
   * @returns {Promise<boolean>} - True if ownership record exists
   */
  async validateOwnership(dataId, ownerId) {
    throw new Error('validateOwnership must be implemented by concrete repository');
  }

  /**
   * Store consent record (storage only, no consent validation logic)
   * @param {Object} consentRecord - Consent data to store
   * @returns {Promise<Object>} - Stored consent record
   */
  async storeConsentRecord(consentRecord) {
    throw new Error('storeConsentRecord must be implemented by concrete repository');
  }

  /**
   * Find consent records for operation (retrieval only, no decision making)
   * @param {string} operationType - Type of operation
   * @param {string} communityId - Community identifier
   * @returns {Promise<Array>} - Array of consent records
   */
  async findConsentRecords(operationType, communityId) {
    throw new Error('findConsentRecords must be implemented by concrete repository');
  }
}

/**
 * Creator Data Repository Contract
 * Handles creator-owned data and sovereignty records
 */
class ICreatorDataRepository extends IBaseRepository {
  /**
   * Store creator content data
   * @param {Object} contentData - Creator content data
   * @returns {Promise<Object>} - Stored content data
   */
  async storeCreatorContent(contentData) {
    throw new Error('storeCreatorContent must be implemented by concrete repository');
  }

  /**
   * Find content by creator ID
   * @param {string} creatorId - Creator identifier
   * @returns {Promise<Array>} - Array of creator content
   */
  async findContentByCreatorId(creatorId) {
    throw new Error('findContentByCreatorId must be implemented by concrete repository');
  }

  /**
   * Store ownership metadata (storage only, no ownership decisions)
   * @param {Object} ownershipData - Ownership metadata
   * @returns {Promise<Object>} - Stored ownership record
   */
  async storeOwnershipMetadata(ownershipData) {
    throw new Error('storeOwnershipMetadata must be implemented by concrete repository');
  }

  /**
   * Store revenue share data (storage only, no revenue calculations)
   * @param {Object} revenueData - Revenue distribution data
   * @returns {Promise<Object>} - Stored revenue record
   */
  async storeRevenueShare(revenueData) {
    throw new Error('storeRevenueShare must be implemented by concrete repository');
  }

  /**
   * Find revenue records by creator
   * @param {string} creatorId - Creator identifier
   * @returns {Promise<Array>} - Array of revenue records
   */
  async findRevenueRecordsByCreator(creatorId) {
    throw new Error('findRevenueRecordsByCreator must be implemented by concrete repository');
  }
}

/**
 * Governance Data Repository Contract
 * Handles democratic governance data persistence
 */
class IGovernanceDataRepository extends IBaseRepository {
  /**
   * Store governance decision data
   * @param {Object} decisionData - Governance decision data
   * @returns {Promise<Object>} - Stored decision record
   */
  async storeGovernanceDecision(decisionData) {
    throw new Error('storeGovernanceDecision must be implemented by concrete repository');
  }

  /**
   * Store vote record (storage only, no vote validation)
   * @param {Object} voteData - Vote record data
   * @returns {Promise<Object>} - Stored vote record
   */
  async storeVoteRecord(voteData) {
    throw new Error('storeVoteRecord must be implemented by concrete repository');
  }

  /**
   * Find votes by decision ID
   * @param {string} decisionId - Decision identifier
   * @returns {Promise<Array>} - Array of vote records
   */
  async findVotesByDecision(decisionId) {
    throw new Error('findVotesByDecision must be implemented by concrete repository');
  }

  /**
   * Find active governance decisions
   * @returns {Promise<Array>} - Array of active decisions
   */
  async findActiveDecisions() {
    throw new Error('findActiveDecisions must be implemented by concrete repository');
  }

  /**
   * Store participation record (storage only, no participation calculations)
   * @param {Object} participationData - Participation record data
   * @returns {Promise<Object>} - Stored participation record
   */
  async storeParticipationRecord(participationData) {
    throw new Error('storeParticipationRecord must be implemented by concrete repository');
  }
}

/**
 * Audit Trail Repository Contract
 * Handles transparent operation logging and audit trails
 */
class IAuditTrailRepository extends IBaseRepository {
  /**
   * Store operation audit record
   * @param {Object} auditData - Audit trail data
   * @returns {Promise<Object>} - Stored audit record
   */
  async storeOperationAudit(auditData) {
    throw new Error('storeOperationAudit must be implemented by concrete repository');
  }

  /**
   * Find audit records by operation type
   * @param {string} operationType - Type of operation
   * @returns {Promise<Array>} - Array of audit records
   */
  async findAuditsByOperationType(operationType) {
    throw new Error('findAuditsByOperationType must be implemented by concrete repository');
  }

  /**
   * Find audit records by date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Array>} - Array of audit records in date range
   */
  async findAuditsByDateRange(startDate, endDate) {
    throw new Error('findAuditsByDateRange must be implemented by concrete repository');
  }

  /**
   * Store liberation metric record
   * @param {Object} metricData - Liberation metric data
   * @returns {Promise<Object>} - Stored metric record
   */
  async storeLiberationMetric(metricData) {
    throw new Error('storeLiberationMetric must be implemented by concrete repository');
  }
}

/**
 * Data Validation Repository Contract
 * Handles basic data validation operations (NOT business rule validation)
 */
class IDataValidationRepository {
  /**
   * Validate data format and structure (format validation only)
   * @param {Object} data - Data to validate
   * @param {Object} schema - Data schema
   * @returns {Promise<Object>} - Validation result with format errors
   */
  async validateDataFormat(data, schema) {
    throw new Error('validateDataFormat must be implemented by concrete repository');
  }

  /**
   * Check data integrity constraints (referential integrity only)
   * @param {Object} data - Data to check
   * @returns {Promise<Object>} - Integrity check result
   */
  async checkDataIntegrity(data) {
    throw new Error('checkDataIntegrity must be implemented by concrete repository');
  }

  /**
   * Validate unique constraints (uniqueness only, no business logic)
   * @param {string} field - Field to check
   * @param {any} value - Value to validate
   * @returns {Promise<boolean>} - True if value is unique
   */
  async validateUniqueness(field, value) {
    throw new Error('validateUniqueness must be implemented by concrete repository');
  }
}

// Export all data access interfaces
module.exports = {
  IBaseRepository,
  ICommunityDataRepository,
  ICreatorDataRepository,
  IGovernanceDataRepository,
  IAuditTrailRepository,
  IDataValidationRepository
};
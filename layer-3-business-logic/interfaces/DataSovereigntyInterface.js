/**
 * DataSovereigntyInterface.js
 * Interface for Layer 3 to communicate with Layer 5 Data Sovereignty
 * Defines clean abstraction between business logic and data operations
 */

class DataSovereigntyInterface {
  /**
   * Store data with community sovereignty requirements
   * @param {Object} dataRequest - Data storage request
   * @returns {Promise<Object>} - Storage result
   */
  async storeWithSovereignty(dataRequest) {
    throw new Error('storeWithSovereignty must be implemented by data sovereignty service');
  }

  /**
   * Retrieve data with governance compliance
   * @param {Object} retrievalRequest - Data retrieval request
   * @returns {Promise<Object>} - Retrieved data with sovereignty metadata
   */
  async retrieveWithGovernance(retrievalRequest) {
    throw new Error('retrieveWithGovernance must be implemented by data sovereignty service');
  }

  /**
   * Validate community consent for data operations
   * @param {Object} consentRequest - Consent validation request
   * @returns {Promise<boolean>} - True if consent is valid
   */
  async validateCommunityConsent(consentRequest) {
    throw new Error('validateCommunityConsent must be implemented by data sovereignty service');
  }

  /**
   * Enforce creator data ownership
   * @param {Object} ownershipRequest - Creator ownership request
   * @returns {Promise<Object>} - Ownership enforcement result
   */
  async enforceCreatorOwnership(ownershipRequest) {
    throw new Error('enforceCreatorOwnership must be implemented by data sovereignty service');
  }

  /**
   * Track data operations for transparency
   * @param {Object} operation - Data operation to track
   * @returns {Promise<void>} - Operation tracking confirmation
   */
  async trackDataOperation(operation) {
    throw new Error('trackDataOperation must be implemented by data sovereignty service');
  }
}

module.exports = DataSovereigntyInterface;
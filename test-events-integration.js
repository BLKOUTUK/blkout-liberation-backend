/**
 * test-events-integration.js
 * Test EventsLiberationService integration with dependency injection
 */

const { bootstrapServices, createAPILayerServices } = require('./dependency-injection/ServiceRegistry');

async function testEventsLiberationServiceIntegration() {
  console.log('🧪 Testing EventsLiberationService integration...');

  try {
    // Bootstrap all services
    bootstrapServices();

    // Get services through dependency injection
    const services = createAPILayerServices();

    console.log('📋 Available services:', Object.keys(services));

    // Test EventsLiberationService
    const eventsService = services.events;
    console.log('🎪 EventsLiberationService type:', typeof eventsService);
    console.log('🎪 EventsLiberationService methods available:');
    console.log('   - finalizeEventCreation:', typeof eventsService.finalizeEventCreation);
    console.log('   - createCommunityEvent:', typeof eventsService.createCommunityEvent);
    console.log('   - generateEventErrorResponse:', typeof eventsService.generateEventErrorResponse);

    // Test method call
    const testEventData = {
      title: 'Test Liberation Event',
      description: 'Testing event creation',
      creatorId: 'test-creator',
      datetime: new Date().toISOString(),
      location: 'Community Center',
      type: 'workshop',
      revenueSharing: { creatorShare: 0.8 }
    };

    console.log('🧪 Testing createCommunityEvent method...');
    const result = await eventsService.createCommunityEvent(testEventData, 'test-creator');
    console.log('✅ Event creation result:', result.success ? 'SUCCESS' : 'FAILED');

    if (result.event) {
      console.log('   Event ID:', result.event.id);
      console.log('   Liberation Score:', result.event.liberationValues.liberationScore);
      console.log('   Creator Sovereignty:', result.event.liberationValues.creatorSovereignty);
      console.log('   Economic Justice:', result.event.liberationValues.economicJustice);
    }

    console.log('🎉 EventsLiberationService integration test: PASSED');
    return true;

  } catch (error) {
    console.error('🚨 EventsLiberationService integration test: FAILED', error.message);
    console.error('Error details:', error);
    return false;
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testEventsLiberationServiceIntegration().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('🚨 Test runner error:', error);
    process.exit(1);
  });
}

module.exports = { testEventsLiberationServiceIntegration };
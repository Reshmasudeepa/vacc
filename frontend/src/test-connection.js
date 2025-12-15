// Test script to verify API connection
const testAPI = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData);
    
    // Test vaccines endpoint
    const vaccinesResponse = await fetch('http://localhost:5000/api/vaccines');
    const vaccinesData = await vaccinesResponse.json();
    console.log('Vaccines count:', vaccinesData.count);
    console.log('First vaccine:', vaccinesData.data[0]);
    
    return true;
  } catch (error) {
    console.error('API test failed:', error);
    return false;
  }
};

// Run test when this file is loaded
if (typeof window !== 'undefined') {
  testAPI();
}

export default testAPI;

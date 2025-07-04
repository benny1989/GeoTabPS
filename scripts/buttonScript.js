// Button script for GEOTAB Dashboard
// This script is executed when the "Send User Info" button is clicked on the dashboard

geotab.customButtons.sendUserInfo = (event, api, state) => {
    try {
        // Prevent default behavior
        event.preventDefault();
        
        console.log('=== GEOTAB User Info Button Clicked ===');
        console.log('Button event:', event);
        console.log('API object:', api);
        console.log('State object:', state);
        
        // Get current user information from the API credentials
        console.log('=== API Credentials ===');
        console.log('Username:', api.credentials.userName);
        console.log('Database:', api.credentials.database);
        console.log('Session ID:', api.credentials.sessionId);
        
        // Get full user details using the API
        api.call('Get', {
            typeName: 'User',
            search: {
                name: api.credentials.userName
            }
        }, (result) => {
            console.log('=== Full User Details ===');
            if (result && result.length > 0) {
                const currentUser = result[0];
                console.log('Current User Object:', currentUser);
                console.log('User ID:', currentUser.id);
                console.log('User Name:', currentUser.name);
                console.log('User Email:', currentUser.email);
                console.log('Company Name:', currentUser.companyName);
                console.log('Time Zone:', currentUser.timeZoneId);
                console.log('Active From:', currentUser.activeFrom);
                console.log('Active To:', currentUser.activeTo);
                console.log('Security Groups:', currentUser.securityGroups);
                
                // Store user data for next steps
                window.currentGeotabUser = currentUser;
                console.log('User data stored in window.currentGeotabUser');
                
                // Show success notification
                showNotification('User info logged to console successfully!', 'success');
                
            } else {
                console.error('No user data found');
                showNotification('No user data found', 'error');
            }
        }, (error) => {
            console.error('Error fetching user data:', error);
            showNotification('Error fetching user data', 'error');
        });
        
        // Also log the current page state
        console.log('=== Current Page State ===');
        const currentState = state.getState();
        console.log('Current State:', currentState);
        
        // Log additional context information
        console.log('=== Additional Context ===');
        console.log('Current URL:', window.location.href);
        console.log('Current Timestamp:', new Date().toISOString());
        console.log('User Agent:', navigator.userAgent);
        
    } catch (error) {
        console.error('Error in button click handler:', error);
        showNotification('Error occurred', 'error');
    }
};

// Helper function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: Arial, sans-serif;
        ${type === 'success' ? 'background-color: #28a745;' : 
          type === 'error' ? 'background-color: #dc3545;' : 
          'background-color: #007bff;'}
    `;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 4000);
}

// Additional helper function to get user info programmatically
// You can call this from console: getUserInfo()
function getUserInfo() {
    if (window.currentGeotabUser) {
        console.log('=== Stored User Info ===');
        console.log(window.currentGeotabUser);
        return window.currentGeotabUser;
    } else {
        console.log('No user info stored yet. Click the button first.');
        return null;
    }
}

// Make the function available globally for testing
window.getUserInfo = getUserInfo;

console.log('GEOTAB Button Script loaded successfully');

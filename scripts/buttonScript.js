// GeoTab Dashboard Button Script - Get Current User Info
(function() {
    console.log("🔄 Button clicked - Getting current user info...");
    
    // For button add-ins, we need to make direct API calls
    // since the geotab object might not be available
    
    try {
        // Try to get current user info via direct MyGeotab API calls
        getCurrentUserInfo();
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Error: " + error.message);
    }
    
    function getCurrentUserInfo() {
        // Get current page URL to extract server and database info
        const currentUrl = window.location.href;
        console.log("Current URL:", currentUrl);
        
        // Extract database info from URL
        const urlMatch = currentUrl.match(/https:\/\/([^.]+)\.geotab\.com/);
        if (!urlMatch) {
            alert("Error: Cannot determine GeoTab server from current URL.\n\nPlease make sure you're running this from within MyGeotab.");
            return;
        }
        
        const server = urlMatch[1] + ".geotab.com";
        console.log("Detected server:", server);
        
        // Try to get session information from browser storage or cookies
        const sessionInfo = getSessionFromStorage();
        
        if (sessionInfo) {
            console.log("Found session info:", sessionInfo);
            getUserDetails(sessionInfo);
        } else {
            // Alternative: Show available browser/session info
            showAvailableInfo();
        }
    }
    
    function getSessionFromStorage() {
        try {
            // Try to get session from localStorage (common in MyGeotab)
            const keys = Object.keys(localStorage);
            console.log("Available localStorage keys:", keys);
            
            // Look for GeoTab session data
            for (let key of keys) {
                if (key.includes('geotab') || key.includes('session') || key.includes('credentials')) {
                    const value = localStorage.getItem(key);
                    console.log(`Found potential session data in ${key}:`, value);
                    
                    try {
                        const parsed = JSON.parse(value);
                        if (parsed.userName || parsed.sessionId || parsed.database) {
                            return parsed;
                        }
                    } catch (e) {
                        // Not JSON, continue
                    }
                }
            }
            
            // Try sessionStorage as well
            const sessionKeys = Object.keys(sessionStorage);
            console.log("Available sessionStorage keys:", sessionKeys);
            
            for (let key of sessionKeys) {
                if (key.includes('geotab') || key.includes('session') || key.includes('user')) {
                    const value = sessionStorage.getItem(key);
                    console.log(`Found potential session data in sessionStorage ${key}:`, value);
                    
                    try {
                        const parsed = JSON.parse(value);
                        if (parsed.userName || parsed.sessionId || parsed.database) {
                            return parsed;
                        }
                    } catch (e) {
                        // Not JSON, continue
                    }
                }
            }
            
            return null;
        } catch (error) {
            console.error("Error accessing storage:", error);
            return null;
        }
    }
    
    function getUserDetails(sessionInfo) {
        console.log("Attempting to get user details with session:", sessionInfo);
        
        // If we have session info, try to make API call
        if (sessionInfo.userName) {
            const userInfo = [
                `👤 Current User Information`,
                ``,
                `📧 Username: ${sessionInfo.userName}`,
                `🏢 Database: ${sessionInfo.database || 'N/A'}`,
                `🌐 Server: ${sessionInfo.path || window.location.hostname}`,
                `🔑 Session ID: ${sessionInfo.sessionId ? sessionInfo.sessionId.substring(0, 8) + '...' : 'N/A'}`,
                ``,
                `✨ Retrieved from browser session data!`,
                ``,
                `💡 For more detailed user info, the script would need`,
                `   full API access with authentication.`
            ].join('\n');
            
            alert(userInfo);
        } else {
            showAvailableInfo();
        }
    }
    
    function showAvailableInfo() {
        console.log("Showing available browser information");
        
        // Get what info we can from the browser/page context
        const availableInfo = [
            `🌐 Browser Session Information`,
            ``,
            `📍 Current URL: ${window.location.href}`,
            `🏢 Hostname: ${window.location.hostname}`,
            `⏰ Current Time: ${new Date().toLocaleString()}`,
            `🔍 User Agent: ${navigator.userAgent.substring(0, 50)}...`,
            ``,
            `ℹ️  Note: For full user details, this script needs`,
            `   to be configured as a proper MyGeotab Add-In`,
            `   with API access, or include the GeoTab SDK.`,
            ``,
            `📋 Check browser console (F12) for technical details.`
        ].join('\n');
        
        alert(availableInfo);
    }
    
})();

// GeoTab Dashboard Button Script - Get Current User Info
(function() {
    console.log("🔄 Button script started...");
    
    // Check if GeoTab API is available
    if (typeof geotab === 'undefined' || !geotab.api) {
        console.error("❌ GeoTab API is not available");
        alert("Error: GeoTab API is not available. Make sure you're running this in a GeoTab dashboard.");
        return;
    }
    
    console.log("✅ GeoTab API is available");
    
    // Get current session
    geotab.api.getSession(function(session) {
        console.log("✅ Session retrieved:", session);
        
        if (!session || !session.userId) {
            console.error("❌ No user session found");
            alert("Error: No user session found. Please make sure you're logged in.");
            return;
        }
        
        console.log("🔍 Looking for user with ID:", session.userId);
        
        // Get user information
        geotab.api.call("Get", {
            typeName: "User",
            search: { 
                id: session.userId 
            }
        }, function(result) {
            console.log("✅ API call successful, result:", result);
            
            if (!result || result.length === 0) {
                console.error("❌ No user found with the given ID");
                alert("Error: User not found in the system.");
                return;
            }
            
            const user = result[0];
            console.log("✅ Current logged-in user:", user);
            
            // Create detailed user info display
            const userInfo = [
                `👤 User Information:`,
                ``,
                `🆔 ID: ${user.id || 'N/A'}`,
                `📧 Email: ${user.name || 'N/A'}`,
                `👨‍💼 First Name: ${user.firstName || 'N/A'}`,
                `👩‍💼 Last Name: ${user.lastName || 'N/A'}`,
                `🏢 Company: ${user.companyName || 'N/A'}`,
                `📱 Phone: ${user.phoneNumber || 'N/A'}`,
                `🔑 Employee ID: ${user.employeeNo || 'N/A'}`,
                `🌐 Time Zone: ${user.timeZoneId || 'N/A'}`,
                `📅 Created: ${user.activeFrom || 'N/A'}`,
                `✅ Active: ${user.isActive ? 'Yes' : 'No'}`,
                ``,
                `📋 Full details logged to console.`
            ].join('\n');
            
            alert(userInfo);
            
        }, function(error) {
            console.error("❌ Failed to get user information:", error);
            alert(`Error getting user information: ${error.message || error.toString()}`);
        });
        
    }, function(error) {
        console.error("❌ Failed to get session:", error);
        alert(`Error getting session: ${error.message || error.toString()}`);
    });
    
})();

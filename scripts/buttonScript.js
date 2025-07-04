/*
 * @owner Predictive Safety
 * @description GeoTab Dashboard Button Add-in to get current user info.
 * This script extracts user information directly from the DOM elements.
 */
(function (api, state) {
    "use strict";

    /**
     * The main function that runs when the button is clicked.
     */
    const initialize = function () {
        console.log("🔄 Button clicked. Getting current user info from DOM...");
        
        try {
            // Get username from the DOM element
            const userTextElement = document.getElementById('loggedInState_userText');
            const databaseElement = document.getElementById('loggedInState_databaseNameId');
            
            let username = 'Not found';
            let database = 'Not found';
            
            if (userTextElement && userTextElement.textContent) {
                username = userTextElement.textContent.trim();
                console.log("✅ Username found:", username);
            } else {
                console.warn("⚠️ Username element not found or empty");
            }
            
            if (databaseElement && databaseElement.textContent) {
                database = databaseElement.textContent.trim();
                console.log("✅ Database found:", database);
            } else {
                console.warn("⚠️ Database element not found or empty");
            }
            
            // Display the information
            const userInfo = `Current User Information:
            
👤 Username: ${username}
🗄️ Database: ${database}
            
✅ Information retrieved successfully from DOM!`;
            
            console.log("✅ User info retrieved:", { username, database });
            alert(userInfo);
            
        } catch (error) {
            console.error("❌ Error getting user info from DOM:", error);
            alert("Error: Failed to retrieve user information from the page.");
        }
    };

    /**
     * A button add-in returns an object with an 'initialize' method.
     * MyGeotab will call this method when the button is clicked.
     */
    return {
        initialize: initialize
    };

});

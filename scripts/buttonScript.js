/*
 * @owner Predictive Safety
 * @author Kutay Ozi
 * @date 2025
 * @description GeoTab Dashboard Button Add-in to get current user info.
 * This script is executed when the user clicks the button on the dashboard.
 * It receives the 'api' and 'state' objects from MyGeotab.
 */
(function (api, state) {
    "use strict";

    /**
     * The main function that runs when the button is clicked.
     */
    const initialize = function () {
        console.log("Button clicked. Initializing add-in...");
        console.log("Received state:", state);

        // The injected 'api' object is already authenticated.
        // We can use it to get the current session.
        api.getSession((session, server) => {
            if (!session || !session.userId) {
                console.error("❌ Could not get session or userId.");
                alert("Error: Could not determine the current user session.");
                return;
            }

            console.log("✅ Session retrieved:", { session, server });

            // Now, use the userId from the session to get user details.
            api.call("Get", {
                typeName: "User",
                search: {
                    id: session.userId
                }
            }, (result) => {
                if (result && result.length > 0) {
                    const user = result[0];
                    console.log("✅ User info retrieved:", user);
                    alert(`User Found:\nName: ${user.name}\nEmail: ${user.email}`);
                } else {
                    console.error("❌ User not found for session userId:", session.userId);
                    alert("Error: Could not find user information for the current session.");
                }
            }, (error) => {
                console.error("❌ API call to 'Get User' failed:", error);
                alert("API Error: Failed to retrieve user information.");
            });
        });
    };

    /**
     * A button add-in returns an object with an 'initialize' method.
     * MyGeotab will call this method when the button is clicked.
     */
    return {
        initialize: initialize
    };

});

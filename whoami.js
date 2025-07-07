/** Geotab Drive Add-In script **/
geotab.addin.whoami = function() {
  let infoMessage = null;  // will hold the "Name & Groups" message

  return {
    // Startup lifecycle method – runs on Drive app login
    startup: function(api, state, initializeCallback) {
      // Get the current session to retrieve username
      api.getSession((sessionResult) => {
        const username = sessionResult.credentials.userName;  // logged-in username (email)
        // Fetch the User object for this username (to get full name and groups)
        api.call(
          "Get", 
          { typeName: "User", search: { name: username } }, 
          function(results) {
            if (results && results.length > 0) {
              const user = results[0];
              // Determine a display name (use first + last name if available, otherwise username)
              let displayName = username;
              if (user.firstName && user.lastName) {
                displayName = user.firstName + " " + user.lastName;
              }
              // Get group names (Data Access groups the user belongs to)
              let groupNames = "None";
              if (user.companyGroups && user.companyGroups.length > 0) {
                // Map group objects to their names (fallback to ID if name not present)
                groupNames = user.companyGroups.map(g => g.name || g.id).join(", ");
              }
              // Compose the alert message
              infoMessage = `User: ${displayName}\nGroups: ${groupNames}`;
              alert(infoMessage);  // show user name and groups
            } else {
              // No user found (unexpected), alert with username only
              infoMessage = `User: ${username}\nGroups: (unknown)`;
              alert(infoMessage);
            }
            initializeCallback();  // signal that startup is done
          },
          function(errorMsg, error) {
            console.error("WhoAmI Add-In: Failed to load user info", errorMsg || error);
            // Even if the API call fails, continue startup to not block app
            initializeCallback();
          }
        );
      });
    },

    // Focus lifecycle – runs each time user opens the add-in page
    focus: function(api, state) {
      if (infoMessage) {
        alert(infoMessage);  // show the stored user info again
      }
      // (If infoMessage is not set for some reason, do nothing or could fetch info again)
    },

    // Blur lifecycle – runs when leaving the add-in page
    blur: function(api, state) {
      // No cleanup needed for this simple add-in
    }
  };
};

// This script runs when the "Send User Info" button is clicked in Geotab Dashboard
console.log("SCRIPT LOADED");
(function(api, state) {
  return {
    click: function(api, state) {
      console.log("🚀 Button clicked. Fetching user session...");

      api.getSession(function(session) {
        if (!session || !session.userName) {
          console.error("❌ Could not get session info.");
          showNotification("Could not get session info", "error");
          return;
        }

        const userName = session.userName;
        const database = session.database;
        const sessionId = session.sessionId;

        console.log("✅ Session Info:", { userName, database, sessionId });

        // Now fetch full user info
        api.call("Get", {
          typeName: "User",
          search: {
            name: userName
          }
        }, function(result) {
          if (!result || result.length === 0) {
            console.error("❌ User not found.");
            showNotification("User not found", "error");
            return;
          }

          const currentUser = result[0];
          console.log("👤 Current user object:", currentUser);

          // Send to external API
          fetch("https://your-api.example.com/status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userName: currentUser.name,
              email: currentUser.email,
              database: database,
              userId: currentUser.id
            })
          })
          .then(res => res.json())
          .then(data => {
            console.log("🌐 API response:", data);

            const status = data.status || "UNKNOWN";

            showStatusLabel(status);
            showNotification(`Status received: ${status}`, "success");
          })
          .catch(error => {
            console.error("❌ API call failed:", error);
            showNotification("Failed to contact status API", "error");
          });
        }, function(error) {
          console.error("❌ Error retrieving user:", error);
          showNotification("Error retrieving user", "error");
        });
      });
    }
  };
})(geotab.api, {});

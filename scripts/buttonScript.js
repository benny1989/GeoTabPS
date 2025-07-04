// Define your Add-In under a unique namespace
geotab.addin.sendUserInfo = function(event, api, state) {
  console.log("✅ Custom button clicked");

  // Step 1: Get the current session (includes userName and database)
  api.getSession(function(session) {
    if (!session || !session.userName) {
      alert("❌ Session information not available.");
      return;
    }

    const { userName, database } = session;
    console.log("👤 Session Info →", session);

    // Step 2: Call Geotab API to get the full user object
    api.call("Get", {
      typeName: "User",
      search: {
        name: userName
      }
    }, function(result) {
      if (!result || result.length === 0) {
        alert("❌ User not found in Geotab.");
        return;
      }

      const user = result[0];

      // ✅ You now have the full logged-in user object
      console.log("🎯 Logged-in User Details:");
      console.log("ID:", user.id);
      console.log("Name:", user.name);
      console.log("Email:", user.email);
      console.log("Company:", user.companyName);
      console.log("Time Zone:", user.timeZoneId);

      alert(`✅ Logged in as: ${user.name}`);
    }, function(error) {
      console.error("❌ Failed to get user:", error);
    });
  });
};

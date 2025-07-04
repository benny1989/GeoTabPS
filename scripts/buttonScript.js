geotab.api.getSession(function(session) {
  geotab.api.call("Get", {
    typeName: "User",
    search: { id: session.userId }
  }, function(result) {
    const user = result[0];
    console.log("✅ Logged-in user:", user);
    alert("User info logged in console.");
  }, function(error) {
    console.error("❌ Failed to get user:", error);
  });
});

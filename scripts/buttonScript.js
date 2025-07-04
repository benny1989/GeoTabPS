(function(api, state) {
  return {
    click: function(api, state) {
      // This code runs ONLY when the button is clicked
      api.getSession(function(session) {
        api.call("Get", {
          typeName: "User",
          search: { name: session.userName }
        }, function(result) {
          const user = result[0];
          console.log("✅ Logged-in user:", user);

          // Send to external API
          fetch("https://your-api.com/status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userName: user.name,
              database: session.database
            })
          })
          .then(res => res.json())
          .then(data => {
            console.log("✅ API response:", data);
            alert(`Status: ${data.status}`);
          })
          .catch(err => {
            console.error("❌ API error:", err);
          });
        });
      });
    }
  };
})(geotab.api, {});

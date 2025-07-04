(function(api, state) {
  return {
    click: function(api, state) {
      api.getSession(function(session) {
        api.call("Get", {
          typeName: "User",
          search: { name: session.userName }
        }, function(result) {
          const user = result[0];
          console.log("✅ Logged-in user:", user);

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
            alert("Status: " + data.status);
          })
          .catch(err => {
            console.error("API error:", err);
            alert("Error contacting status API");
          });
        });
      });
    }
  };
})(geotab.api, {});

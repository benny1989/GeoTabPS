/* global geotab */
geotab.addin.whoami = function () {
  return {
    /** Runs once per Drive launch (onStartup = true) */
    startup: async function (api, state, done) {
      try {
        /* 1.  Current session */
        const session = await api.getSession();
        console.log("Logged-in userName:", session.userName);

        /* 2.  Full User entity (query by id, never by name) */
        const [user] = await api.call("Get", {
          typeName: "User",
          search:   { id: session.userId },
          resultsLimit: 1
        });

        /* 3.  (Optional) send the data to your back end */
        /*
        await fetch("https://YOUR-API/collectUserInfo", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            database:  session.database,
            userId:    session.userId,
            userName:  session.userName,
            groups:    user.companyGroups
          })
        });
        */

        console.table({
          database: session.database,
          userId:   session.userId,
          userName: session.userName,
          groups:   user.companyGroups
        });
      } catch (err) {
        console.error("Who-Am-I startup error:", err);
      } finally {
        done();          // tell Drive we’re ready
      }
    }
  };
};

/* global geotab */
geotab.addin.whoami = () => ({
  startup: async (api, _state, done) => {
    try {
      const session = await api.getSession();                 // driver info
      const [user] = await api.call("Get", {                  // full entity
        typeName: "User",
        search: { id: session.userId },
        resultsLimit: 1
      });
      const groups = await api.call("Get", {                  // group names
        typeName: "Group",
        search: { id: user.companyGroups }
      });
      const names = groups.map(g => g.name).join(", ") || "none";

      alert(`Logged in as: ${session.userName}\nGroups: ${names}`);   // visible
      console.log("[WhoAmI]", { user: session.userName, groups: names }); // debug
    } catch (e) {
      console.error("[WhoAmI] error:", e);
    } finally {
      done();                                                 // tell Drive we’re ready
    }
  }
});

/* global geotab */
geotab.addin["WhoAmI-Driver"] = () => ({
  startup: async (api, _state, done) => {
    try {
      const session = await api.getSession();
      const [user]  = await api.call("Get", {
        typeName: "User",
        search: { id: session.userId },
        resultsLimit: 1
      });
      const groups  = await api.call("Get", {
        typeName: "Group",
        search: { id: user.companyGroups }
      });
      const names = groups.map(g => g.name).join(", ") || "none";

      alert(`Logged in as: ${session.userName}\nGroups: ${names}`);
      console.log("[WhoAmI]", { user: session.userName, groups: names });
    } catch (e) {
      console.error("[WhoAmI] error:", e);
    } finally {
      done();
    }
  }
});

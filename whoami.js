/* whoami.js */
console.log("HOLAAAA");
geotab.addin.whoami = () => ({
  startup: async (api, _state, done) => {
    debugger;               // ← DevTools stops here
    try {
      const session = await api.getSession();

      // You can drop another breakpoint later:
      // debugger;

      const [user] = await api.call("Get", {
        typeName: "User",
        search: { id: session.userId },
        resultsLimit: 1
      });

      const groups = await api.call("Get", {
        typeName: "Group",
        search: { id: user.companyGroups }
      });

      alert(`Logged in as: ${session.userName}`);
      console.table(groups.map(g => ({ id: g.id, name: g.name })));
    } catch (e) {
      console.error(e);
    } finally {
      done();
    }
  }
});

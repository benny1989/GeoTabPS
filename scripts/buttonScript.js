(function(event, api, state) {
    try {
        console.log("🚀 Button clicked! Starting safe inspection...");
        
        // Safely log the event object
        if (event) {
            console.log("📋 EVENT object:", event);
            console.log("📋 EVENT type:", event.type);
            console.log("📋 EVENT target:", event.target);
        } else {
            console.log("⚠️ EVENT object is null or undefined");
        }
        
        // Safely log the API object
        if (api) {
            console.log("🔧 API object:", api);
            console.log("🔧 API methods:", Object.keys(api));
        } else {
            console.log("⚠️ API object is null or undefined");
        }
        
        // Safely log the state object
        if (state) {
            console.log("📊 STATE object:", state);
            console.log("📊 STATE properties:", Object.keys(state));
        } else {
            console.log("⚠️ STATE object is null or undefined");
        }
        
        // Get username from DOM
        const userElement = document.getElementById('loggedInState_userText');
        const databaseElement = document.getElementById('loggedInState_databaseNameId');
        
        let username = 'Not found';
        let database = 'Not found';
        
        if (userElement && userElement.textContent) {
            username = userElement.textContent.trim();
        }
        
        if (databaseElement && databaseElement.textContent) {
            database = databaseElement.textContent.trim();
        }
        
        console.log("👤 DOM Username:", username);
        console.log("🗄️ DOM Database:", database);
        
        alert(`Username: ${username}\nDatabase: ${database}\n\nCheck console for detailed object info!`);
        
    } catch (error) {
        console.error("❌ Error in button script:", error);
        alert("Error occurred. Check console for details.");
    }
});

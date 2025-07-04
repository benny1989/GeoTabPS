(function(event, api, state) {
    console.log("🚀 Button clicked! Let's inspect the objects:");
    
    // Log the event object
    console.log("📋 EVENT object:", event);
    console.log("📋 EVENT type:", event.type);
    console.log("📋 EVENT target:", event.target);
    
    // Log the API object
    console.log("🔧 API object:", api);
    console.log("🔧 API methods:", Object.keys(api));
    
    // Log the state object
    console.log("📊 STATE object:", state);
    console.log("📊 STATE properties:", Object.keys(state));
    
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
});

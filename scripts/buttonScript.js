geotab.customButtons.getUserInfo = (event, api, state) => {
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
    
    alert(`Username: ${username}\nDatabase: ${database}`);
};

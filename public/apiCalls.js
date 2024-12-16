function obtainTokenForGraph(){
    // MSAL.js v2 exposes several account APIs, logic to determine which account to use is the responsibility of the developer
    const account = myMSALObj.getAllAccounts()[0];

    const accessTokenRequest = {
    scopes: ["user.read"],
    account: account,
    };

    myMSALObj
    .acquireTokenSilent(accessTokenRequest)
    .then(function (accessTokenResponse) {
        // Acquire token silent success
        let accessToken = accessTokenResponse.accessToken;

        // Call your API with token
        callGraphFromFE(accessToken);
    })
    .catch(function (error) {
        document.getElementById('FieldTableGraphResponse').innerText = error;

        console.log(error);
    });
}

function callGraphFromFE(accessToken){
    // Call the function to obtain an access token
    document.getElementById('FieldTableGraphToken').innerText = accessToken;

    // Call the graph API /me endpoint
    fetch('https://graph.microsoft.com/v1.0/me', {
    headers: {
        Authorization: 'Bearer ' + accessToken
    },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('FieldTableGraphResponse').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        document.getElementById('FieldTableGraphResponse').innerText = error;
    });

}


function obtainTokenForBackend(){
    // MSAL.js v2 exposes several account APIs, logic to determine which account to use is the responsibility of the developer
    const account = myMSALObj.getAllAccounts()[0];

    const accessTokenRequest = {
    scopes: ["api://2f2359cc-9457-4ae7-8412-4bad2d598214/AuthenticatedUser"],
    account: account,
    };

    myMSALObj
    .acquireTokenSilent(accessTokenRequest)
    .then(function (accessTokenResponse) {
        // Acquire token silent success
        let accessToken = accessTokenResponse.accessToken;

        // Call your API with token
        callBeFromFE(accessToken);
    })
    .catch(function (error) {
        document.getElementById('FieldTableBeResponse').innerText = error;

        console.log(error);
    });
}

function callBeFromFE(accessToken){
    // Call the function to obtain an access token
    document.getElementById('FieldTableBeToken').innerText = accessToken;

    // Call the backend API /iam endpoint as post
    
    fetch('https://webapistaticapp.azure-api.net/iam', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "response": "This is a response from the backend API"
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('FieldTableBeResponse').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        document.getElementById('FieldTableBeResponse').innerText = error;
    });

}
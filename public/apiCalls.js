function obtainTokenForApi(){
    // MSAL.js v2 exposes several account APIs, logic to determine which account to use is the responsibility of the developer
    const account = myMSALObj.getAllAccounts()[0];

    const accessTokenRequest = {
    scopes: ["user.read", "api://2f2359cc-9457-4ae7-8412-4bad2d598214/AuthenticatedUser"],
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
        document.getElementById('FieldResponseTable').innerText = error;

        console.log(error);
    });
}

function callGraphFromFE(accessToken){
    // Call the function to obtain an access token
    document.getElementById('FieldTokenTable').innerText = accessToken;

    // Call the graph API /me endpoint
    fetch('https://graph.microsoft.com/v1.0/me', {
    headers: {
        Authorization: 'Bearer ' + accessToken
    },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('FieldResponseTable').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        document.getElementById('FieldResponseTable').innerText = error;
    });

}
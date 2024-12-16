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

        // set access token into tokenApiResponse id element
        document.getElementById('tokenApiResponse').innerText = accessToken;

        // Call your API with token
        //callApi(accessToken);
    })
    .catch(function (error) {
        document.getElementById('tokenApiResponse').innerText = error;

        //Acquire token silent failure, and send an interactive request
        //if (error instanceof InteractionRequiredAuthError) {
        //    myMSALObj
        //    .acquireTokenPopup(accessTokenRequest)
        //    .then(function (accessTokenResponse) {
        //    // Acquire token interactive success
        //    let accessToken = accessTokenResponse.accessToken;
        //    // Call your API with token
        //    callApi(accessToken);
        //    })
        //    .catch(function (error) {
        //    // Acquire token interactive failure
        //    console.log(error);
        //    });
        //}
        console.log(error);
    });
}
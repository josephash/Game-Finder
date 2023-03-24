function apiCall(interface, method, version, parameters) {
    const proxyUrl = 'https://proxy.cors.sh';
    const proxyKey = 'temp_8768b686217f58507d08ae60a665e0eb';   // renew cors-api here: https://cors.sh/
    const steamUrl = 'https://api.steampowered.com';
    const steamKey = '28601A11DEF818194204A0AB6F7EF1F3';
    let requestOptions = {
        headers: {
            'x-cors-api-key': proxyKey,
        },
    };
    let fullUrl = proxyUrl + '/' + steamUrl + '/' + interface + '/' + method + '/' + version + '/?key=' + steamKey + '&' + parameters.join('&');
    console.log(fullUrl);
    return fetch(fullUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status:' + response.status);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
}
async function getFromSteam(game, detail) {

}



async function test() {
    let output = await apiCall('ISteamNews', 'GetNewsForApp', 'v2', ['appid=954850', 'count=3', 'format=json']);
    console.log(output);
}
// test()
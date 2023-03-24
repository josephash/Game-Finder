// default URLs and keys
const apis = {
    proxy: {
        url: 'https://proxy.cors.sh',
        key: 'temp_c6ae07b832a51711be95d9d1b1b52c09',   // renew cors-api here: https://cors.sh/
    },
    steamworks: {
        url: 'https://api.steampowered.com',
        key: '28601A11DEF818194204A0AB6F7EF1F3',
    },
    steam: {
        url: 'https://store.steampowered.com/api',
    },
}

// calls the Steam API with the given interface and method
function steamworksAPI(arguments) {
    let parameters = [];
    let urlParts = [];
    let request = '';
    let options = {
        headers: {},
    };
    // assemble url parts
    if (arguments.useProxy) {
        urlParts.push(apis.proxy.url);
        options.headers['x-cors-api-key'] = apis.proxy.key;
    }
    urlParts.push(apis.steamworks.url);
    if (arguments.method) {
        urlParts.push(arguments.method);
    } else {
        console.error('Error: API method not provided');
    }
    parameters.push('key=' + apis.steamworks.key);
    for (let i in arguments.parameters) {
        parameters.push(arguments.parameters[i]);
    }
    // complete url
    request = urlParts.join('/') + '?' + parameters.join('&');
    // call request
    return fetch(request, options)
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

function steamAPI(arguments) {
    let parameters = [];
    let urlParts = [];
    let request = '';
    let options = {
        headers: {},
    };
    // assemble url parts
    if (arguments.useProxy) {
        urlParts.push(apis.proxy.url);
        options.headers['x-cors-api-key'] = apis.proxy.key;
    }
    urlParts.push(apis.steam.url);
    if (arguments.method) {
        urlParts.push(arguments.method);
    } else {
        console.error('Error: API method not provided');
    }
    if (arguments.parameters) {
        parameters = arguments.parameters;
    } else {
        console.error('Error: method parameters not provided');
    }
    // complete url
    request = urlParts.join('/') + '?' + parameters.join('&');
    // call request
    return fetch(request, options)
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


async function test(opt) {
    if (opt === 1) {
        let testCall = {
            api: 'steamworks',
            useProxy: true,
            method: 'ISteamNews/GetNewsForApp/v2',
            parameters: ['appid=954850', 'count=3', 'format=json'],
        };
        let output = await steamworksAPI(testCall);
        console.log(output);
    } else if (opt === 2) {
        let testCall = {
            api: 'steam',
            useProxy: true,
            method: 'appdetails',
            parameters: ['appids=954850'],
        };
        let output = await steamAPI(testCall);
        console.log(output);
    }
}
//test(1);
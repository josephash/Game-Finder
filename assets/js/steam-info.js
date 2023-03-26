// default URLs and keys
const apis = {
    proxy: {
        url: 'https://proxy.cors.sh',
        key: 'temp_c6c6b4fc3bd0de71e35b4d7dd3ec950e',   // renew cors-api here: https://cors.sh/
    },
    steamworks: {
        url: 'https://api.steampowered.com',
        key: '28601A11DEF818194204A0AB6F7EF1F3',
    },
    steamStore: {
        url: 'https://store.steampowered.com/api',
    },
}

var applist;
var isListCompleted = false;

// calls the Steam Web API with the given interface and method
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
// calls the Steam Store API with the given interface and method
function steamStoreAPI(arguments) {
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
    urlParts.push(apis.steamStore.url);
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
// returns the entire list of steam games
async function getAllGames() {
    let callInfo = {
        useProxy: true,
        method: 'ISteamApps/GetAppList/v2',
        parameters: [],
    };
    applist = (await steamworksAPI(callInfo)).applist.apps;
    isListCompleted = true;
    return applist;
}
// returns the appID of the game's exact title
function findID(game) {
    
}
// searches for the closest game that matches the input
function searchGames(searchInput, returnAmount = 1) {
    
}
// returns an aspect/detail of the game
async function getSteamAspect(game, aspect) {
    let callInfo = {
        useProxy: true,
        method: 'appdetails',
        parameters: ['appids=954850'],
    };
    let output = await steamStoreAPI(callInfo);
    let list = [];
    for (let i in Object.keys(output['954850'].data)) {
        list.push(Object.keys(output['954850'].data)[i]);
        //console.log(Object.keys(output['954850'].data)[i]);
        //console.log(output['954850'].data[Object.keys(output['954850'].data)[i]]);
    }
    console.log(list);
    return;
}
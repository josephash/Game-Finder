// default URLs and keys
const apis = {
    proxy: {
        url: 'https://proxy.cors.sh',
        key: 'temp_d177400ee032206c55c6c1fcf70af978',   // renew cors-api here: https://cors.sh/
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
    return;
}
// returns the appID of the game's exact title (NOTE: returns -1 if the game cannot be found)
function findID(game) {
    if (isListCompleted) {
        for (let i in applist) {
            let app = applist[i];
            if (app.name == game) {
                return app.appid;
            }
        }
    } else {
        return -1;
    }
}
// [WORK IN PROGRESS] searches for the closest game that matches the input
function searchGames(searchInput, returnAmount = 1) {
    
}
// returns an aspect/detail of the game
async function getSteamAspect(game, aspect = null) {
    if (!isListCompleted) {
        console.error('Error: List of games has not generated yet');
        return;
    }
    let appID = findID(game);
    if (appID == -1) {
        console.error('Error: Could not find a game under the name \'' + game + '\' - an exact match is required');
        return;
    }
    let callInfo = {
        useProxy: true,
        method: 'appdetails',
        parameters: ['appids=' + appID],
    };
    let results = await steamStoreAPI(callInfo);
    let detail;
    if (aspect) {
        detail = results[appID].data[aspect];
    } else {
        detail = results[appID].data;
    }
    if (detail == null) {
        console.error('Error: Aspect not found');
        return;
    }
    console.log(detail);
    return detail;
}

//getAllGames();
// setTimeout(() => {
//     getSteamAspect('Kerbal Space Program', 'steam_appid');
// }, 7500);
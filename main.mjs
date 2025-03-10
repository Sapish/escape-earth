
import fetch from 'node-fetch';

const SOLAIRE_API = "https://api.le-systeme-solaire.net/rest/";
const playerId = "oskardb@uia.no";
const GAME_API = "https://spacescavanger.onrender.com/";

(async function() {
    const startUrl = `${GAME_API}start?player=${encodeURIComponent(playerId)}`;
    const startResponse = await fetch(startUrl);
    const startData = await startResponse.json();
    console.log("Challenge started:", startData);
})();
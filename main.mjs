
import fetch from 'node-fetch';

const SOLAIRE_API = "https://api.le-systeme-solaire.net/rest/";
const playerId = "oskardb@uia.no";
const GAME_API = "https://spacescavanger.onrender.com/";

(async function() {
    try {
    const startUrl = `${GAME_API}start?player=${encodeURIComponent(playerId)}`;
    const startResponse = await fetch(startUrl);
    const startData = await startResponse.json();
    console.log("Challenge started:", startData);

    const sunUrl = `${SOLAIRE_API}bodies/sun`;
    const sunResponse = await fetch(sunUrl);
    const sunData = await sunResponse.json();

    const accessPin = sunData.equaRadius - sunData.meanRadius;
    console.log("Access Pin:", accessPin);

    const submitUrl = `${GAME_API}submit?player=${encodeURIComponent(playerId)}&pin=${accessPin}`;

    const submitResponse = await fetch(submitUrl);
    const submitData = await submitResponse.json();
    console.log("Submission result: ", submitData);
} catch (error) {
    console.log("Something seems to have went wrong: ", error.message);
}
})();

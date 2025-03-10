
import fetch from 'node-fetch';

const SOLAIRE_API = "https://api.le-systeme-solaire.net/rest/";
const playerId = "oskardb@uia.no";
const GAME_API = "https://spacescavanger.onrender.com/";

(async function() {
    const startUrl = `${GAME_API}start?player=${encodeURIComponent(playerId)}`;
    const startResponse = await fetch(startUrl);
    const startData = await startResponse.json();
    console.log("Challenge started:", startData);

    const sunResponse = await fetch(`${SOLAIRE_API}bodies/soleil`);
    const sunData = await sunResponse.json();
    console.log("Sun Data: ", sunData);

    const accessPin = sunData.equaRadius - sunData.meanRadius;
    console.log("Access Pin:", accessPin);

    const answer = accessPin;

    const answerFeedback = await fetch(`${GAME_API}answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer, player: playerId })
    });
    const answerResult = await answerFeedback.json();
    console.log("Task 1 Result: ", answerResult);
})();


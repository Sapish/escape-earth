
import fetch from 'node-fetch';

const SOLAIRE_API = "https://api.le-systeme-solaire.net/rest/";
const playerId = "oskardb@uia.no";
const GAME_API = "https://spacescavanger.onrender.com/";

(async function() {
    const startUrl = `${GAME_API}start?player=${encodeURIComponent(playerId)}`;
    const startResponse = await fetch(startUrl);
    const startData = await startResponse.json();
    console.log("Challenge started:", startData);

    //Task 1 --------------------------------------
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

    //Task 2 --------------------------------------
    const planetsUrl = `${SOLAIRE_API}bodies/`;
    const planetsResponse = await fetch(planetsUrl);
    const planetsData = await planetsResponse.json();
    const planets = planetsData.bodies.filter(body => body.isPlanet);

    const earth = planets.find(planet => planet.englishName === "Earth");
    const earthAxialTilt = earth.axialTilt;
    console.log("Earth axial tilt: ", earthAxialTilt);

    let closestPlanet = null;
    let smallestDifference = Infinity;

    planets.forEach(planet => {
        if (planet.englishName !== "Earth") {
            const difference = Math.abs(planet.axialTilt - earthAxialTilt);
            if (difference < smallestDifference) {
                smallestDifference = difference;
                closestPlanet = planet;
            }
        }
    });

    console.log("Closest planet in axial tilt:", closestPlanet.englishName, "with a difference of", smallestDifference, "degrees");

    const answer2 = closestPlanet.englishName;
    const answerFeedback2 = await fetch(`${GAME_API}answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answer2, player: playerId })
    });
    const answerResult2 = await answerFeedback2.json();
    console.log("Task 2 Result: ", answerResult2);

    //Task 3 --------------------------------------
    let shortestDayPlanet = null;
    let shortestDay = Infinity;

    planets.forEach(planet => {
        if (planet.sideralRotation && planet.sideralRotation > 0) {
            const rotationPeriod = planet.sideralRotation;
            if (rotationPeriod < shortestDay) {
                shortestDay = rotationPeriod;
                shortestDayPlanet = planet;
            }
        }
    });

    console.log("Planet with shortest day: ", shortestDayPlanet.englishName, "with", shortestDay, "hours");

    const answer3 = shortestDayPlanet.englishName;
    const answerFeedback3 = await fetch(`${GAME_API}answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answer3, player: playerId })
    });
    const answerResult3 = await answerFeedback3.json();
    console.log("Task 3 Result: ", answerResult3);

})();


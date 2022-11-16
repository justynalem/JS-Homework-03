const films = require("./sw-films.json");
const planets = require("./sw-planets.json");
const people = require("./sw-people.json");
const starships = require("./sw-starships.json");

// count sum of all starships cost from episodes 4-6
console.log(
  "Sum of all starships cost from episodes 4 - 6 is: " +
    sumAllStarshipsCostFromEpisodes(4, 6)
);

function sumAllStarshipsCostFromEpisodes(startEp, endEp) {
  let sum = 0;
  // TODO
  const episodes = films
    .filter(({ episode_id: id }) => id >= startEp && id <= endEp)
    .flatMap(obj => Object.values(obj.starships));

  let starshipsFromEpisodes = [];
  episodes.forEach(el => {
    if (!starshipsFromEpisodes.includes(el)) {
      starshipsFromEpisodes.push(el);
    }
  });
  sum = starships.reduce((acc, { url, cost_in_credits: cost }) => {
    if (starshipsFromEpisodes.some(el => el === url)) {
      const costOfStarship = Number(cost);
      if (!isNaN(costOfStarship)) {
        acc += costOfStarship;
      }
    }
    return acc;
  }, 0);
  return sum;
}

// find the fastest starship you can afford having 8500000 credits

console.log(
  "Fastest ship I can get for up to 8500000 is: " + getFastestShipFor(8500000)
);

function getFastestShipFor(money) {
  let ship;
  // TODO
  const fastest = starships
    .filter(({ cost_in_credits: cost }) => Number(cost) <= 8500000)
    .reduce(
      (acc, curObj) => {
        if (
          parseInt(curObj.max_atmosphering_speed) >
          parseInt(acc.max_atmosphering_speed)
        ) {
          return curObj;
        }

        return acc;
      },
      { max_atmosphering_speed: "0" }
    );
  ship = fastest.name;

  return ship;
}

// find planet name with the lowest difference between the rotation period and orbital period

console.log(
  "Planet name with the lowest difference between the rotation period and orbital period is: " +
    getPlanetNameWithLowestDifference("rotation_period", "orbital_period")
);
function getPlanetNameWithLowestDifference(key1, key2) {
  const planetName = planets.reduce((acc, obj) => {
    const diff = Number(obj[key1]) - Number(obj[key2]);
    const accDiff = Number(acc[key1]) - Number(acc[key2]);
    if (!isNaN(diff)) {
      if (diff < accDiff) {
        return obj;
      }
    }
    return acc;
  });

  return planetName.name;
}

// map all starships with crew <= 4 that were created between 10 dec 2014 and 15 dec 2014

console.log(
  "Ships with max crew of 4 created between 10.12.2014 - 12.12.2014 number is: " +
    getCrewShipFrom(4, new Date(2014, 11, 10), new Date(2014, 11, 12))
);
// UWAGA - zmieniłam argumenty ( było : new Date(2014,12,10) co dawało datę 10/01/2015)

function getCrewShipFrom(maxCrew, dateStart, dateEnd) {
  let ship;
  // TODO
  ship = starships.filter(
    obj =>
      !isNaN(Number(checkCrewMax(obj.crew))) &&
      Number(checkCrewMax(obj.crew)) <= maxCrew &&
      dateStart.getTime() <= getUnix(obj.created) &&
      getUnix(obj.created) <= dateEnd.getTime() + 24 * 60 * 60 * 1000 - 1000
  );

  return ship.length;
}

function checkCrewMax(str) {
  return str.replace(",", "").split("-").at(-1);
}

function getUnix(date) {
  return (timeStampOfCreation = new Date(date).getTime());
}

// create an array of people’s names from episodes 1 and 5 sorted by the diameter of origin planet low to high

console.log(
  "People from ep 1 - 5 sorted by origin planet diameter low to high: " +
    getPeopleSortedByOriginPlanetDiameter(1, 5)
);

function getPeopleSortedByOriginPlanetDiameter(startEp, endEp) {
  const peopleSortedByDiameter = [];

  const peopleFromEpisodesUrl = films
    .filter(({ episode_id: id }) => id >= startEp && id <= endEp)
    .flatMap(obj => Object.values(obj.characters));

  const peopleFromEpisodesUniqueUrl = new Set(peopleFromEpisodesUrl);

  const planetsOfPeopleUrl = people
    .filter(obj => peopleFromEpisodesUniqueUrl.has(obj.url))
    .map(obj => obj.homeworld);

  const planetsOfPeopleUniqueUrl = new Set(planetsOfPeopleUrl);

  const planetsOfPeopleFromEpisodesSorted = planets
    .filter(
      obj =>
        planetsOfPeopleUniqueUrl.has(obj.url) && !isNaN(Number(obj.diameter))
    )
    .sort((a, b) => Number(a.diameter) - Number(b.diameter));

  const peopleFromSortedPlanetsRefference =
    planetsOfPeopleFromEpisodesSorted.flatMap(obj =>
      Object.values(obj.residents)
    );

  for (const item of peopleFromSortedPlanetsRefference) {
    if (peopleFromEpisodesUniqueUrl.has(item)) {
      const found = people.find(obj => obj.url === item);
      peopleSortedByDiameter.push(found.name);
    }
  }

  return peopleSortedByDiameter;
}

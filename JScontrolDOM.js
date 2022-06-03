console.log("Hello");

let getStandings = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data
}

let loadStandings = async (season, round) => {
    let data = await getStandings(season, round);
    if (typeof data === 'object') {
        let requestedstandings = (data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        for (let i = 0; i < 7; i++) {
            let driver_row = `<ul class="list-group list-group-horizontal">
        <li class="list-group-item">${requestedstandings[i].position}</li>
        <li class="list-group-item">${requestedstandings[i].Driver.givenName} ${requestedstandings[i].Driver.familyName}</li>
        <li class="list-group-item">${requestedstandings[i].Driver.nationality}</li>
        <li class="list-group-item">${requestedstandings[i].Constructors[0].constructorId}</li>
        <li class="list-group-item">${requestedstandings[i].points}</li>
    </ul>`
            document.getElementById('contentr').insertAdjacentHTML('beforeend', driver_row);
        }
    } else {
        errors.innerHTML = `Season or Round is Invalid.`;
        errors.hidden = false;
    }
}



let form = document.getElementById('infoform');
// let errors = document.getElementById('errors');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = event.path[0][0].value;
    let round = event.path[0][1].value;
    form.reset();
    data = loadStandings(season, round)
    // errors.hidden = true;
    form.reset();
});
let getStandings = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data
}

let loadStandings = async (season, round) => {
    let data = await getStandings(season, round);
        let requestedstandings = (data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        for (let i = 0; i < 7; i++) {
            let driver_row = `<ul class="list-group list-group-horizontal">
            <li class="list-group-item bg-dark">${requestedstandings[i].position}</li>
            <li class="list-group-item bg-dark">${requestedstandings[i].Driver.givenName} ${requestedstandings[i].Driver.familyName}</li>
            <li class="list-group-item bg-dark">${requestedstandings[i].Driver.nationality}</li>
            <li class="list-group-item bg-dark">${requestedstandings[i].Constructors[0].constructorId}</li>
            <li class="list-group-item bg-dark">${requestedstandings[i].points}</li></ul>`
            document.getElementById('contentr').insertAdjacentHTML('beforeend', driver_row);
        }
    }



let form = document.getElementById('infoform');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = event.path[0][0].value;
    let round = event.path[0][1].value;
    form.reset();
    data = loadStandings(season, round)
    form.reset();
});
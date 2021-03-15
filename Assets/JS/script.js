/* Pulls current day from Moment.js and writes it to paragraph */
$("#currentDay").text(`${moment().format("dddd, MMMM Do, YYYY")}`);

// Pulls current hour in military time (24 hour)
let currentHour = Number(moment().format("HH"));

// Checks currentHour variable against pull from moment.js each second and updates if currentHour is lower (meaning hour has changed)
const hourChecker = setInterval(() => {
    if (currentHour < Number(moment().format("HH"))) {
        currentHour = Number(moment().format("HH"));
        
    // Resets to 0 when clock changes at midnight (otherwise currentHour would stay at 23)
    } else {
        currentHour = 0;
    }
}, 1000);
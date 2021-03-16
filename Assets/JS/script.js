/* Pulls current day from Moment.js and writes it to paragraph */
$("#currentDay").text(`${moment().format("dddd, MMMM Do, YYYY")}`);

// Pulls current hour in military time (24 hour)
let currentHour = Number(moment().format("HH"));

// Creates nodeList of all textareas
const taskInputs = $(".task-input textarea");

const hourColorSetter = ()=> {
    taskInputs.each(function() {
        if ($(this).data("time") > currentHour) {
            $(this).parent().addClass("future");
        } else if ($(this).data("time") === currentHour) {
            $(this).parent().addClass("present");
        } else {
            $(this).parent().addClass("past");
            // Makes past hour block textareas uneditable
            $(this).attr("readonly", true);
        }
    })
}

// Checks currentHour variable against pull from moment.js each second and updates if currentHour is lower (meaning hour has changed)
const hourChecker = setInterval(() => {
    if (currentHour < Number(moment().format("HH"))) {
        currentHour = Number(moment().format("HH"));
        hourColorSetter();
    // Resets to 0 when clock changes at midnight (otherwise currentHour would stay at 23)
    } else if (Number(moment().format("HH")) === 0) {
        currentHour = 0;
        hourColorSetter();
    }
}, 1000);

// Assigns click listener to save divs
$(".saveBtn").on("click", (e) => {
    const taskHour = $(e.target).siblings(".task-input").children("textarea").data("time");
    const task = $(e.target).siblings(".task-input").children("textarea").val();
    localStorage.setItem(taskHour, task);
});

// Assigns click listener to save icons
$(".saveBtn i").on("click", (e) => {
    // Prevents click event from bubbling to div listener
    e.stopPropagation();
    const taskHour = $(e.target).parent().siblings(".task-input").children("textarea").data("time");
    const task = $(e.target).parent().siblings(".task-input").children("textarea").val();
    localStorage.setItem(taskHour, task);
});

taskInputs.each(function() {
    // Confirms item exists for specified hour in localStorage
    if (localStorage.getItem($(this).data("time"))) {
        $(this).text(localStorage.getItem($(this).data("time")));
    }
})

hourColorSetter();
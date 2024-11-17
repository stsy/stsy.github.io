// scripts/week-number.js

// Calculate the current week number
function getWeekNumber(date) {
    const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNumber = (currentDate.getUTCDay() + 6) % 7;
    currentDate.setUTCDate(currentDate.getUTCDate() - dayNumber + 3);
    const firstThursday = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 4));
    const weekNumber = Math.ceil(((currentDate - firstThursday) / 86400000 + 1) / 7);
    return weekNumber;
}

// Fetch the Handlebars template
fetch('templates/week-template.html')
    .then(response => response.text())
    .then(templateSource => {
        const template = Handlebars.compile(templateSource);
        const weekNumber = getWeekNumber(new Date());
        const functionCode = getWeekNumber.toString();


        const data = {
            weekNumber: weekNumber,
            functionCode: functionCode
        };

        const html = template(data);
        document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
        console.error('Error loading template:', error);
    });

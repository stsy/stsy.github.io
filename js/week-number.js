// scripts/week-number.js

// Function to calculate the current week number based on the user's local system clock
function getWeekNumber(date) {
    const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNumber = (currentDate.getUTCDay() + 6) % 7;
    currentDate.setUTCDate(currentDate.getUTCDate() - dayNumber + 3);
    const firstThursday = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 4));
    const weekNumber = Math.ceil(((currentDate - firstThursday) / 86400000 + 1) / 7);
    return weekNumber;
}

// Function to format date and time
function formatDateTime(date) {
    return date.toLocaleString();
}

// Function to get query parameters
function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split('&').forEach(function (param) {
        const parts = param.split('=');
        params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
    });
    return params;
}

// Main execution
(function() {
    const params = getQueryParams();
    const now = new Date();
    const weekNumber = getWeekNumber(now);
    const dateTime = formatDateTime(now);

    if (params['format'] === 'json') {
        // Output JSON response
        const jsonResponse = {
            weekNumber: weekNumber,
            dateTime: dateTime
        };
        // Set content type to JSON (this will not change the actual content type due to static hosting limitations)
        document.head.innerHTML = '';
        document.body.innerHTML = '<pre id="json"></pre>';
        document.getElementById('json').textContent = JSON.stringify(jsonResponse, null, 4);
    } else {
        // Fetch the Handlebars template
        fetch('templates/week-template.html')
            .then(response => response.text())
            .then(templateSource => {
                // Compile the template
                const template = Handlebars.compile(templateSource);

                // Prepare the data object
                const data = {
                    weekNumber: weekNumber,
                    dateTime: dateTime
                };

                // Generate the HTML with the data
                const html = template(data);

                // Insert the generated HTML into the page
                document.getElementById('content').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading template:', error);
            });
    }
})();

// js/week-number.js

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
        // Clear the document and output JSON
        document.head.innerHTML = '';
        document.body.innerHTML = '<pre id="json"></pre>';
        document.getElementById('json').textContent = JSON.stringify(jsonResponse, null, 4);
    } else {
        // Display week number and date/time in the HTML elements
        document.getElementById('week-number').textContent = weekNumber;
        document.getElementById('date-time').textContent = dateTime;
    }
})();

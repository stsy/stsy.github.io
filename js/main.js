// Links
const data = {
    title: "Links",
    links: [
        { name: "Week number", url: "week-number.html" },
        { name: "Link 2", url: "#" },
        { name: "Link 3", url: "#" },
    ]
};

// Fetch the Handlebars template
fetch('templates/links-template.html')
    .then(response => response.text())
    .then(templateSource => {
        // Compile the template
        const template = Handlebars.compile(templateSource);

        // Generate the HTML with the data
        const html = template(data);

        // Insert the generated HTML into the page
        document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
        console.error('Error loading template:', error);
    });
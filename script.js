// Function to fetch JSON data from a file
function fetchData() {
    return fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
}

// Function to generate HTML for the hierarchical diagram
function generateDiagram(jsonData) {
    const diagramContainer = document.getElementById('diagram');

    // Create parent boxes
    const parents = jsonData.filter(item => item.parent === null);
    parents.forEach(parent => {
        const parentBox = createBox(parent);
        diagramContainer.appendChild(parentBox);
        generateChildBoxes(parent.name, jsonData, parentBox);
    });
}

// Function to generate child boxes recursively
function generateChildBoxes(parentName, jsonData, parentBox) {
    const children = jsonData.filter(item => item.parent === parentName);
    children.forEach(child => {
        const childBox = createBox(child);
        parentBox.appendChild(childBox);
        generateChildBoxes(child.name, jsonData, childBox);
    });
}

// Function to create a box element with label and extra attributes
function createBox(data) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.name = data.name; // Store name in data attribute
    box.dataset.description = data.description; // Store description in data attribute
    box.dataset.businessDomain = data.business_domain; // Store business domain in data attribute
    box.dataset.valueStream = data.value_stream; // Store value stream in data attribute
    box.dataset.status = data.status; // Store status in data attribute
    box.style.backgroundColor = data.color; // Set background color based on status
    const labelElement = document.createElement('a'); // Change to anchor element
    labelElement.classList.add('label');
    labelElement.textContent = data.name;
    labelElement.href = '#'; // Set href to #
    labelElement.addEventListener('click', (event) => { // Add click event listener to anchor
        event.preventDefault(); // Prevent default anchor behavior
        const clickedBox = event.currentTarget.parentElement; // Get parent box
        const clickedData = {
            name: clickedBox.dataset.name,
            description: clickedBox.dataset.description,
            business_domain: clickedBox.dataset.businessDomain,
            value_stream: clickedBox.dataset.valueStream
        };
        displayInfo(clickedData);
    });
    box.appendChild(labelElement);

    return box;
}

// Function to display additional information when a box is clicked
function displayInfo(data) {
    const infoContainer = document.getElementById('info');
    
    // Clear previous data
    infoContainer.innerHTML = '';
    
    // Display clicked capability data
    infoContainer.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Business Domain:</strong> ${data.business_domain}</p>
        <p><strong>Value Stream:</strong> ${data.value_stream}</p>
    `;
}


// Fetch data from JSON file and generate the hierarchical diagram
fetchData()
    .then(jsonData => {
        generateDiagram(jsonData);
    });

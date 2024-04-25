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
        const parentBox = createBox(parent.name);
        diagramContainer.appendChild(parentBox);
        generateChildBoxes(parent.name, jsonData, parentBox);
    });
}

// Function to generate child boxes recursively
function generateChildBoxes(parentName, jsonData, parentBox) {
    const children = jsonData.filter(item => item.parent === parentName);
    children.forEach(child => {
        const childBox = createBox(child.name);
        parentBox.appendChild(childBox);
        generateChildBoxes(child.name, jsonData, childBox);
    });
}

// Function to create a box element with label
function createBox(label) {
    const box = document.createElement('div');
    box.classList.add('box');
    const labelElement = document.createElement('div');
    labelElement.classList.add('label');
    labelElement.textContent = label;
    box.appendChild(labelElement);
    return box;
}

// Fetch data from JSON file and generate the hierarchical diagram
fetchData()
    .then(jsonData => {
        generateDiagram(jsonData);
    });

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

// Function to generate SVG for the hierarchical diagram
function generateDiagram(jsonData) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const diagramContainer = document.getElementById('diagram');
    diagramContainer.innerHTML = ''; // Clear previous diagram

    const svg = document.createElementNS(svgNamespace, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    diagramContainer.appendChild(svg);

    // Create parent boxes
    const parents = jsonData.filter(item => item.parent === null);
    let yOffset = 20;
    parents.forEach(parent => {
        const parentGroup = createBox(parent, svgNamespace, yOffset);
        svg.appendChild(parentGroup);
        yOffset += 100;
        generateChildBoxes(parent.name, jsonData, parentGroup, svgNamespace, 20, yOffset);
    });
}

// Function to generate child boxes recursively
function generateChildBoxes(parentName, jsonData, parentGroup, svgNamespace, xOffset, yOffset) {
    const children = jsonData.filter(item => item.parent === parentName);
    children.forEach(child => {
        const childGroup = createBox(child, svgNamespace, yOffset);
        childGroup.setAttribute('transform', `translate(${xOffset}, ${yOffset})`);
        parentGroup.appendChild(childGroup);
        yOffset += 100;
        generateChildBoxes(child.name, jsonData, childGroup, svgNamespace, xOffset + 150, yOffset);
    });
}

// Function to create a box element with label and extra attributes
function createBox(data, svgNamespace, yOffset) {
    const group = document.createElementNS(svgNamespace, 'g');

    const rect = document.createElementNS(svgNamespace, 'rect');
    rect.setAttribute('x', '10');
    rect.setAttribute('y', yOffset);
    rect.setAttribute('width', '120');
    rect.setAttribute('height', '60');
    rect.setAttribute('fill', data.color);
    rect.setAttribute('stroke', '#000');
    rect.setAttribute('stroke-width', '2');
    group.appendChild(rect);

    const text = document.createElementNS(svgNamespace, 'text');
    text.setAttribute('x', '20');
    text.setAttribute('y', yOffset + 30);
    text.setAttribute('font-size', '12');
    text.setAttribute('fill', '#000');
    text.textContent = data.name;
    group.appendChild(text);

    group.addEventListener('click', () => {
        displayInfo(data);
    });

    return group;
}

// Function to display additional information when a box is clicked
function displayInfo(data) {
    const infoContainer = document.getElementById('info');
    infoContainer.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Business Domain:</strong> ${data.business_domain}</p>
        <p><strong>Value Stream:</strong> ${data.value_stream}</p>
        <p><strong>Status:</strong> ${data.status}</p>
    `;
}

// Fetch data from JSON file and generate the hierarchical diagram
fetchData()
    .then(jsonData => {
        generateDiagram(jsonData);
    });

// Sample JSON Data (This would normally be fetched from an external file)
const capabilitiesData = [
    { 
        "name": "Component Management",
        "parent": null,
        "description": "Responsible for managing components.",
        "business_domain": "Manufacturing",
        "value_stream": "Product Development",
        "status": "Active",
        "color": "#28a745" // Green color for Active status
    },
    { 
        "name": "Component Design Management",
        "parent": "Component Management",
        "description": "Responsible for managing component design.",
        "business_domain": "Design",
        "value_stream": "Product Development",
        "status": "Active",
        "color": "#28a745" // Green color for Active status
    },
    { 
        "name": "Component 2D/3D Design",
        "parent": "Component Design Management",
        "description": "Responsible for creating 2D/3D designs.",
        "business_domain": "Design",
        "value_stream": "Product Development",
        "status": "Active",
        "color": "#28a745" // Green color for Active status
    },
    { 
        "name": "Knit Design",
        "parent": "Component 2D/3D Design",
        "description": "Responsible for knit design.",
        "business_domain": "Textile",
        "value_stream": "Product Development",
        "status": "Active",
        "color": "#28a745" // Green color for Active status
    },
    { 
        "name": "Print Design",
        "parent": "Component 2D/3D Design",
        "description": "Responsible for print design.",
        "business_domain": "Design",
        "value_stream": "Product Development",
        "status": "Active",
        "color": "#28a745" // Green color for Active status
    },
    { 
        "name": "Trims Design",
        "parent": "Component 2D/3D Design",
        "description": "Responsible for trims design.",
        "business_domain": "Design",
        "value_stream": "Product Development",
        "status": "Active",
        "color": "#28a745" // Green color for Active status
    },
    { 
        "name": "Avatar Design",
        "parent": "Component 2D/3D Design",
        "description": "Responsible for avatar design.",
        "business_domain": "Design",
        "value_stream": "Product Development",
        "status": "Active",
        "color": "#28a745" // Green color for Active status
    }
];

// Function to fetch JSON data for capabilities
function fetchCapabilities() {
    return new Promise((resolve) => {
        resolve(capabilitiesData); // Simulate fetching data from a file
    });
}

// Function to populate value stream dropdown options
function populateValueStreamDropdown(valueStreams) {
    const dropdown = document.getElementById('valueStream');
    dropdown.innerHTML = ''; // Clear previous options
    // Add 'All' option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All';
    dropdown.appendChild(allOption);
    // Add options for each value stream
    valueStreams.forEach(stream => {
        const option = document.createElement('option');
        option.value = stream;
        option.textContent = stream;
        dropdown.appendChild(option);
    });
}

// Function to generate the SVG diagram
function generateDiagram(jsonData) {
    const diagramContainer = document.getElementById('diagram');
    diagramContainer.innerHTML = ''; // Clear previous diagram

    const svgNS = "http://www.w3.org/2000/svg"; 
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    // Create parent boxes
    const parents = jsonData.filter(item => item.parent === null);
    parents.forEach((parent, index) => {
        const parentBox = createBox(svg, parent, index * 150, 0);
        diagramContainer.appendChild(parentBox);
        generateChildBoxes(parent.name, jsonData, svg, 150, 0, parentBox);
    });

    diagramContainer.appendChild(svg);
}

// Function to generate child boxes recursively
function generateChildBoxes(parentName, jsonData, svg, x, y, parentBox) {
    const children = jsonData.filter(item => item.parent === parentName);
    children.forEach((child, index) => {
        const childBox = createBox(svg, child, x + 150, y + (index * 100));
        svg.appendChild(childBox);
        generateChildBoxes(child.name, jsonData, svg, x + 150, y + (index * 100), childBox);
    });
}

// Function to create a box element with label and extra attributes
function createBox(svg, data, x, y) {
    const group = document.createElementNS(svg.namespaceURI, "g");

    const rect = document.createElementNS(svg.namespaceURI, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", "140");
    rect.setAttribute("height", "80");
    rect.setAttribute("fill", data.color);
    rect.setAttribute("stroke", "#000");
    rect.setAttribute("stroke-width", "2");

    const text = document.createElementNS(svg.namespaceURI, "text");
    text.setAttribute("x", x + 10);
    text.setAttribute("y", y + 40);
    text.textContent = data.name;
    text.setAttribute("style", "font-family: Arial; font-size: 14px;");

    group.appendChild(rect);
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
        <p><strong>Value Stream:</strong>

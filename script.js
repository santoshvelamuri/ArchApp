// Sample JSON data representing parent-child relationships
const jsonData = [
    { "name": "Component Management", "parent": null },
    { "name": "Component Design Management", "parent": "Component Management" },
    { "name": "Component 2D/3D Design", "parent": "Component Design Management" },
    { "name": "Knit Design", "parent": "Component 2D/3D Design" },
    { "name": "Print Design", "parent": "Component 2D/3D Design" },
    { "name": "Trims Design", "parent": "Component 2D/3D Design" },
    { "name": "Avatar Design", "parent": "Component 2D/3D Design" }
];

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

// Generate the hierarchical diagram
generateDiagram(jsonData);

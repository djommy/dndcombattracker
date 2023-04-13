window.onload=function(){
    // define your characters array with name, hp, ac, and initiative properties
    let characters = [
        { name: "Saziros", hp: 60, ac: 16, initiative: 20 },
        { name: "Kro", hp: 60, ac: 16, initiative: 19 },
        { name: "Warcas", hp: 60, ac: 11, initiative: 18 },
        { name: "Zian", hp: 50, ac: 11, initiative: 17 },
        { name: "Nicolai", hp: 70, ac: 11, initiative: 16 },
        { name: "Rando", hp: 60, ac: 11, initiative: 15 },
    ];

    // sort the characters array by initiative
    characters.sort((a, b) => b.initiative - a.initiative);

    // create a function to render the characters array as table rows
    function renderCharacters() {
        let tbody = document.querySelector("#combat-table-body");
        for (let character of characters) {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${character.name}</td>
            <td>${character.hp}</td>
            <td>${character.ac}</td>
            <td contenteditable="true" class="initiative">${character.initiative}</td>
            `;
            tbody.appendChild(tr);
        }
    
        const addCharacterForm = document.querySelector('#add-character-form');
        addCharacterForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        // Handle form submission here

        const nameInput = document.querySelector('#name');
        const hitPointsInput = document.querySelector('#hit-points');
        const armorClassInput = document.querySelector('#armor-class');
        const initiativeInput = document.querySelector('#initiative');

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td>${nameInput.value}</td>
        <td>${hitPointsInput.value}</td>
        <td>${armorClassInput.value}</td>
        <td class="initiative" contenteditable="true">${initiativeInput.value}</td>`;

        const addCharacterForm = document.querySelector('#add-character-form');
        addCharacterForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally

            const nameInput = document.querySelector('#name');
            const hitPointsInput = document.querySelector('#hit-points');
            const armorClassInput = document.querySelector('#armor-class');
            const initiativeInput = document.querySelector('#initiative');

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td>${nameInput.value}</td>
            <td>${hitPointsInput.value}</td>
            <td>${armorClassInput.value}</td>
            <td class="initiative" contenteditable="true">${initiativeInput.value}</td>
            `;

            const combatTableBody = document.querySelector('#combat-table-body');
            combatTableBody.appendChild(newRow);

            nameInput.value = '';
            hitPointsInput.value = '';
            armorClassInput.value = '';
            initiativeInput.value = '';
        });
        });
    }

    // call the renderCharacters function to display the characters on page load
    renderCharacters();

    // sort characters by initiative using button
    // const sortButton = document.querySelector('#sort-button');
    // sortButton.addEventListener('click', function() {
    // const combatTableBody = document.querySelector('#combat-table-body');
    // const rows = combatTableBody.querySelectorAll('tr');
    // const sortedRows = Array.from(rows).sort((b, a) => {
    //     const aInitiative = parseInt(a.querySelector('td:nth-child(4)').textContent);
    //     const bInitiative = parseInt(b.querySelector('td:nth-child(4)').textContent);
    //     return aInitiative - bInitiative;
    // });
    // combatTableBody.innerHTML = '';
    // sortedRows.forEach(row => combatTableBody.appendChild(row));
    // });

    // sort table by initiative using "initiative" table header
    const sortHeader = document.querySelector('#sort-initiative');
    sortHeader.addEventListener('click', function(event) {
        sortTableByInitiative();
    });

    let initiativeSortAscending = true;

    function sortTableByInitiative() {
        const combatTableBody = document.querySelector('#combat-table-body');
        const rows = combatTableBody.querySelectorAll('tr');
        const sortedRows = Array.from(rows).sort(function(rowA, rowB) {
            const initiativeA = parseInt(rowA.querySelector('.initiative').textContent);
            const initiativeB = parseInt(rowB.querySelector('.initiative').textContent);
            if (initiativeSortAscending) {
            return initiativeA - initiativeB;
            } else {
            return initiativeB - initiativeA;
            }
        });
        initiativeSortAscending = !initiativeSortAscending;
        combatTableBody.innerHTML = '';
        sortedRows.forEach(function(row) {
            combatTableBody.appendChild(row);
        });
    }




    const combatTableBody = document.querySelector('#combat-table-body');
    combatTableBody.addEventListener('input', function(event) {
    const row = event.target.parentNode;
    const characterName = row.querySelector('.character-name').textContent;
    const hitPoints = row.querySelector('.hit-points').textContent;
    const armorClass = row.querySelector('.armor-class').textContent;
    const initiative = parseInt(row.querySelector('.initiative').textContent);
    updateCharacter(characterName, hitPoints, armorClass, initiative);
    });
};
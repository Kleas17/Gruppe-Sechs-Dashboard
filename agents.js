document.getElementById('addAgentBtn').addEventListener('click', function() {
    const agentName = document.getElementById('agentName').value;
    if (agentName) {
        const availability = {};
        ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].forEach(day => {
            availability[day] = {
                debut: document.getElementById(`${day}Debut`).value,
                fin: document.getElementById(`${day}Fin`).value
            };
        });
        addAgent({ name: agentName, availability });
    }
});


function addAgent(agent) {
    const agents = getAgents();
    agents.push(agent);
    localStorage.setItem('agents', JSON.stringify(agents));
    displayAgents();
}

function getAgents() {
    const agents = localStorage.getItem('agents');
    return agents ? JSON.parse(agents) : [];
}

function displayAgents() {
    const agents = getAgents();
    const agentList = document.getElementById('agentList');
    agentList.innerHTML = '';
    agents.forEach((agent, index) => {
        const agentItem = document.createElement('div');
        agentItem.className = 'agent-item';
        agentItem.innerHTML = `
            ${agent.name} 
            <button onclick="deleteAgent(${index})">X</button>
            <div class="availability">
                ${Object.entries(agent.availability).map(([day, avail]) => `<p>${day}: ${avail}</p>`).join('')}
            </div>
        `;
        agentList.appendChild(agentItem);
    });
}

function deleteAgent(index) {
    const agents = getAgents();
    agents.splice(index, 1);
    localStorage.setItem('agents', JSON.stringify(agents));
    displayAgents();
}

// Affiche les agents au chargement de la page
window.onload = displayAgents;

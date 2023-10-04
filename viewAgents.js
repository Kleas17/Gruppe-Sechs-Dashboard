async function fetchAgents() {
    try {
        const response = await fetch("/api/agents");
        if (response.ok) {
            const agents = await response.json();
            displayAgents(agents);
        } else {
            console.error("Erreur lors de la récupération des agents:", await response.text());
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des agents:", error);
    }
}

function displayAgents(agents) {
    const agentsDiv = document.getElementById("agentsDisplay");
    agents.forEach(agent => {
        const agentDiv = document.createElement("div");
        agentDiv.className = "agent";
        agentDiv.innerHTML = `
            <h3>${agent.name}</h3>
            <p>Lundi: ${agent.Lundi.start} - ${agent.Lundi.end}</p>
            <p>Mardi: ${agent.Mardi.start} - ${agent.Mardi.end}</p>
            <p>Mercredi: ${agent.Mercredi.start} - ${agent.Mercredi.end}</p>
            <p>Jeudi: ${agent.Jeudi.start} - ${agent.Jeudi.end}</p>
            <p>Vendredi: ${agent.Vendredi.start} - ${agent.Vendredi.end}</p>
            <p>Samedi: ${agent.Samedi.start} - ${agent.Samedi.end}</p>
            <p>Dimanche: ${agent.Dimanche.start} - ${agent.Dimanche.end}</p>
        `;
        agentsDiv.appendChild(agentDiv);
    });
}

fetchAgents();

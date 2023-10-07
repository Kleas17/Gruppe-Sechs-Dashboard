async function fetchAgents() {
    try {
        const response = await fetch("/api/agents");
        if (response.ok) {
            const agents = await response.json();
            console.log("Agents reçus :", agents);
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
        
        let lundiInfo = agent.Lundi ? `<p>Lundi: ${agent.Lundi.start} - ${agent.Lundi.end}</p>` : '<p>Lundi: Pas de données</p>';
        let mardiInfo = agent.Mardi ? `<p>Mardi: ${agent.Mardi.start} - ${agent.Mardi.end}</p>` : '<p>Mardi: Pas de données</p>';
        let mercrediInfo = agent.Mercredi ? `<p>Mercredi: ${agent.Mercredi.start} - ${agent.Mercredi.end}</p>` : '<p>Mercredi: Pas de données</p>';
        let jeudiInfo = agent.Jeudi ? `<p>Jeudi: ${agent.Jeudi.start} - ${agent.Jeudi.end}</p>` : '<p>Jeudi: Pas de données</p>';
        let vendrediInfo = agent.Vendredi ? `<p>Vendredi: ${agent.Vendredi.start} - ${agent.Vendredi.end}</p>` : '<p>Vendredi: Pas de données</p>';
        let samediInfo = agent.Samedi ? `<p>Samedi: ${agent.Samedi.start} - ${agent.Samedi.end}</p>` : '<p>Samedi: Pas de données</p>';
        let dimancheInfo = agent.Dimanche ? `<p>Dimanche: ${agent.Dimanche.start} - ${agent.Dimanche.end}</p>` : '<p>Dimanche: Pas de données</p>';
        
        agentDiv.innerHTML = `
            <h3>${agent.name}</h3>
            ${lundiInfo}
            ${mardiInfo}
            ${mercrediInfo}
            ${jeudiInfo}
            ${vendrediInfo}
            ${samediInfo}
            ${dimancheInfo}
        `;
        agentsDiv.appendChild(agentDiv);
    });
}

document.getElementById('deleteAgentBtn').addEventListener('click', async () => {
    const agentNameToDelete = document.getElementById('deleteAgentName').value;

    if (!agentNameToDelete) {
        alert("Veuillez saisir le nom de l'agent à supprimer.");
        return;
    }

    const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer l'agent ${agentNameToDelete}?`);

    if (confirmDelete) {
        try {
            const response = await fetch("/api/agents", { 
                method: "DELETE", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: agentNameToDelete })
            });

            if (response.ok) {
                const result = await response.json();
                if (result && result.message) {
                    alert(result.message);
                } else {}
            } else {
                console.error("Erreur lors de la suppression de l'agent:", await response.text());
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'agent:", error);
        }
    }
});

document.getElementById('refreshPageBtn').addEventListener('click', function() {
    location.reload();
});

fetchAgents();

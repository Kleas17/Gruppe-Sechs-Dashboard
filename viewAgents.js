async function fetchAgents() {
    try {
        const response = await fetch("/api/agents", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const agents = await response.json();
        displayAgents(agents);
    } catch (err) {
        console.error("Erreur lors de la récupération des agents:", err);
    }
}

function displayAgents(agents) {
    const displayDiv = document.getElementById('agentsDisplay');
    if (agents.length === 0) {
        displayDiv.innerHTML = "<p>Aucun agent enregistré pour le moment.</p>";
        return;
    }

    let htmlContent = '<ul>';
    for (let agent of agents) {
        htmlContent += `
            <li>
                <strong>Nom:</strong> ${agent.name} <br>
                Lundi: ${agent.Lundi.start} - ${agent.Lundi.end} <br>
                Mardi: ${agent.Mardi.start} - ${agent.Mardi.end} <br>
                ... [répétez pour chaque jour de la semaine]
            </li>
        `;
    }
    htmlContent += '</ul>';
    displayDiv.innerHTML = htmlContent;
}

// Appel à la fonction pour charger les agents au démarrage de la page
fetchAgents();

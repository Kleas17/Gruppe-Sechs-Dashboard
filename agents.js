async function addAgent(agent) {
  try {
    const response = await fetch("/api/agents", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(agent)
    });

    const result = await response.json();
    console.log(`Agent ajouté avec l'ID: ${result.insertedId}`);
  }
  catch (err) {
    console.log(err);
  }
}
document.getElementById('addAgentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const agentName = document.getElementById('agentName').value;
  const LundiDebut = document.getElementById('LundiDebut').value;
  const LundiFin = document.getElementById('LundiFin').value;
  
  const agent = {
    name: agentName,
    monday: {
      start: LundiDebut,
      end: LundiFin
    }
  };

  await addAgent(agent);
});

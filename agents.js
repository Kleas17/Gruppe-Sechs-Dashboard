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
  
  let confirmation = window.confirm("Êtes-vous sûr de vouloir ajouter cet agent?");
  if (!confirmation) return;

  const agentName = document.getElementById('agentName').value;
  const LundiDebut = document.getElementById('LundiDebut').value;
  const LundiFin = document.getElementById('LundiFin').value;
  const MardiDebut = document.getElementById('MardiDebut').value;
  const MardiFin = document.getElementById('MardiFin').value;
  const MercrediDebut = document.getElementById('MercrediDebut').value;
  const MercrediFin = document.getElementById('MercrediFin').value;
  const JeudiDebut = document.getElementById('JeudiDebut').value;
  const JeudiFin = document.getElementById('JeudiFin').value;
  const VendrediDebut = document.getElementById('VendrediDebut').value;
  const VendrediFin = document.getElementById('VendrediFin').value;
  const SamediDebut = document.getElementById('SamediDebut').value;
  const SamediFin = document.getElementById('SamediFin').value;
  const DimancheDebut = document.getElementById('DimancheDebut').value;
  const DimancheFin = document.getElementById('DimancheFin').value;

  
  const agent = {
    name: agentName,
    Lundi : {
      start: LundiDebut,
      end: LundiFin
    },
    Mardi : {
      start: MardiDebut,
      end: MardiFin
    },
    Mercredi : {
      start: MercrediDebut,
      end: MercrediFin
    },
    Jeudi : {
      start: JeudiDebut,
      end: JeudiFin
    },
    Vendredi : {
      start: VendrediDebut,
      end: VendrediFin
    },
    Samedi : {
      start: SamediDebut,
      end: SamediFin
    },
    Dimanche : {
      start: DimancheDebut,
      end: DimancheFin
    }
  };

  await addAgent(agent);
// Effacer les informations du formulaire
document.getElementById('addAgentForm').reset();

// Désactiver le bouton pendant 20 secondes
let btn = document.getElementById('addAgentBtn');
btn.disabled = true;
setTimeout(() => btn.disabled = false, 20000); // 20000ms équivaut à 20s
});
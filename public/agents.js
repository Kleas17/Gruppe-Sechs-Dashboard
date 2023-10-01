// Importation des modules nécessaires de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, remove } from "firebase/database";

// Configuration et initialisation de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmhVVLDbhScGK6DaIj81LHE5WUBWRpSEU",
    authDomain: "gruppe-sechs.firebaseapp.com",
    databaseURL: "https://gruppe-sechs-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gruppe-sechs",
    storageBucket: "gruppe-sechs.appspot.com",
    messagingSenderId: "726047862310",
    appId: "1:726047862310:web:109125c4b5b70b702c00e7"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('addAgentBtn').addEventListener('click', function () {
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
    const agentRef = push(ref(db, 'agents'));
    set(agentRef, agent).then(() => displayAgents());
}

async function getAgents() {
    const agentsRef = ref(db, 'agents');
    const agentsSnap = await get(agentsRef);
    if (agentsSnap.exists()) {
        return Object.entries(agentsSnap.val()).map(([key, value]) => ({
            id: key,
            ...value
        }));
    } else {
        return [];
    }
}

async function displayAgents() {
    const agents = await getAgents();
    const agentList = document.getElementById('agentList');
    agentList.innerHTML = '';
    agents.forEach(agent => {
        const agentItem = document.createElement('div');
        agentItem.className = 'agent-item';
        agentItem.innerHTML = `
            ${agent.name} 
            <button onclick="deleteAgent('${agent.id}')">X</button>
            <div class="availability">
                ${Object.entries(agent.availability).map(([day, avail]) => `<p>${day}: ${avail.debut} - ${avail.fin}</p>`).join('')}
            </div>
        `;
        agentList.appendChild(agentItem);
    });
}

window.deleteAgent = function (id) {
    const agentRef = ref(db, 'agents/' + id);
    remove(agentRef).then(() => displayAgents());
}

// Affiche les agents au chargement de la page
window.onload = async () => {
    await displayAgents();
};

document.querySelector('.login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const errorMessage = document.querySelector('#error-message');

    const response = await fetch('users.json');
    const users = await response.json();

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('isConnected', 'true');
        window.location.href = 'gruppeSechs.html';
    } else {
        errorMessage.textContent = 'Mot de passe incorrect.';
    }
});

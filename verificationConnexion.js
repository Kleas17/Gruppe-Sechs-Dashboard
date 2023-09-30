document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('isConnected') !== 'true') {
        window.location.href = 'index.html';
    }    
});

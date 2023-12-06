function checkTokenOnAwake() {
    let token = localStorage.getItem('token');
    // Verifica se o token é null ou undefined
    if (token === null || token === undefined) {
        localStorage.setItem('token', 0);
        token = 0;
    }
   
    if (token == 1) {
        //alert('O usuário está logado.')
        const inscrevaSeBtn = document.getElementById('inscreva-se-btn');
        inscrevaSeBtn.style.display = 'none'; // Ou 'inline', ou qualquer valor desejado para exibir
    }

    // Se o token for igual a 0,
    if (token == 0) {
        //alert('O usuário está deslogado.')
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.style.display = 'none'; // Ou 'inline', ou qualquer valor desejado para exibir
    }
}

function Logout() {
    localStorage.setItem('token', 0);
    window.location.reload();
    // window.location.href = '../login/login-page.html';
    alert('Você foi deslogado.');
}

checkTokenOnAwake();
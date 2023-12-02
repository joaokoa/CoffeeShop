function getData() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    if (!email || !senha) {
        alert("Credenciais faltando");
        return
    } 

    const url = "http://localhost:3333/usuarios";
    const dadosParaEnviar = {
        email: email,
        senha: senha
    };

    
    createAccount(url, dadosParaEnviar);
}

function createAccount(url, dados) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        // Verifique se a resposta está vazia
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        
        // Verifique se a resposta contém dados JSON
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            // Se não for JSON, retorne um objeto vazio ou outra manipulação adequada
            return {};
        }
    })
    .then(data => {
        // Faça algo com os dados, se necessário
        alert('Conta criada com sucesso!');
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}


document.getElementById('senha').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        loginUser(); // Chama a função loginUser ao pressionar "Enter"
    }
});

function loginUser() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        alert("Credenciais inválidas");
        return;
    }

    const url = "http://localhost:3333/login";
    const dadosParaEnviar = {
        email: email,
        senha: senha
    };

    authenticateUser(url, dadosParaEnviar);
}

function authenticateUser(url, dados) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta indicar um erro (status 4xx ou 5xx), trate isso aqui
            if (response.status === 401) { // Verifica se é um erro de credenciais inválidas (status 401)
                alert('Credenciais inválidas!');
            } else {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
        }
        return response.json();
    })
    .then(data => {
        // Se a autenticação for bem-sucedida, 'data' conterá o token
        if (data && data.token) {
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido!'); // Ou redirecione para outra página, etc.
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}
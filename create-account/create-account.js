function getData() {
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    if (!email || !nome || !senha) {
        alert("Credenciais faltando");
        return
    } 

    const url = "http://localhost:3333/usuarios";
    const dadosParaEnviar = {
        email: email,
        nome: nome,
        senha: senha
    };

    
    createAccount(url, dadosParaEnviar);
}

function createAccount(url, dados) {
    return fetch(url, {
        method: 'POST',
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

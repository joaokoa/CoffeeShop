function checkToken() {
    let token = localStorage.getItem('token');
   // Verifica se o token é null ou undefined
    if (token === null || token === undefined) {
        localStorage.setItem('token', 0);
    }
}

function getProductData() {
    let produtos = [];
    const url = "http://localhost:3333/produtos";
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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
        produtos = data;
        // console.log(produtos);
        // alert('Produtos obtidos com sucesso!');
        // Retorne os produtos se necessário
        return produtos;
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

function getCategoryData() {
    let produtos = [];
    const url = "http://localhost:3333/categoria";
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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
        produtos = data;
        // console.log(produtos);
        //alert('Produtos obtidos com sucesso!');
        // Retorne os produtos se necessário
        return produtos;
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}


async function handleProductData(categoriaId) {
    
    try {
        // Obtenha os dados dos produtos



        const dados = await getProductData();

        // Filtrar os itens da categoria específica
        const produtosDaCategoria = dados.filter(produto => produto.categoriaid === categoriaId);

        // Imprimir no console ou realizar outras operações
        console.log(produtosDaCategoria);

        // Mapear os itens em elementos HTML
        const containerProdutos = document.querySelector('.container-produtos');
        containerProdutos.innerHTML = ''; // Limpar o conteúdo existente
        
        const title = document.createElement('h4');
        title.textContent = 'Produtos';
        containerProdutos.appendChild(title);
        
        for (let i = 0; i < produtosDaCategoria.length; i += 3) {
            // Criar uma nova div 'row-produtos' para cada conjunto de três produtos
            const divRowProdutos = document.createElement('div');
            divRowProdutos.classList.add('row-produtos');

            // Adicionar cada produto ao conjunto atual
            for (let j = 0; j < 3 && i + j < produtosDaCategoria.length; j++) {
                const produto = produtosDaCategoria[i + j];

                const divProduto = document.createElement('div');
                divProduto.classList.add('produto');
                
                // Adicione o conteúdo da div do produto (por exemplo, nome, descrição, preço, etc.)
                divProduto.innerHTML = `<h5>${produto.nome}</h5><p>${produto.description}</p><p>R$${produto.preco}</p>`;

                // Adicione o botão "Comprar"
                const buttonComprar = document.createElement('button');
                buttonComprar.classList.add('buttonComprar');
                buttonComprar.textContent = 'Comprar';
                divProduto.appendChild(buttonComprar);

                // Adicione a div do produto ao conjunto atual
                divRowProdutos.appendChild(divProduto);
            }

            // Adicionar a nova div 'row-produtos' ao contêiner
            containerProdutos.appendChild(divRowProdutos);
        }

        // Ou retornar o resultado, se necessário
        return produtosDaCategoria;
    } catch (error) {
        console.error('Erro ao lidar com os dados do produto:', error);
    }
}


async function handleAwake() {
    let token = localStorage.getItem('token');
    // alert(token);
    // Se o token for igual a 1, oculte o link "Já tem uma conta?"
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

    try {
        // Obtenha os dados dos produtos
        const dados = await getProductData();

        // Verifique se containerProdutos existe no HTML
        const containerProdutos = document.querySelector('.container-produtos');
        if (!containerProdutos) {
            console.error('Elemento .container-produtos não encontrado no HTML.');
            return;
        }

        // Limpar o conteúdo existente
        containerProdutos.innerHTML = '';
        const title = document.createElement('h4');
        title.textContent = 'Produtos';
        containerProdutos.appendChild(title);

        // Iterar sobre os dados em conjuntos de três produtos
        for (let i = 0; i < dados.length; i += 3) {
            // Criar uma nova div 'row-produtos' para cada conjunto de três produtos
            const divRowProdutos = document.createElement('div');
            divRowProdutos.classList.add('row-produtos');

            // Adicionar cada produto ao conjunto atual
            for (let j = 0; j < 3 && i + j < dados.length; j++) {
                const produto = dados[i + j];

                const divProduto = document.createElement('div');
                divProduto.classList.add('produto');

                // Adicione o conteúdo da div do produto (por exemplo, nome, descrição, preço, etc.)
                divProduto.innerHTML = `<h5>${produto.nome}</h5><p>${produto.description}</p><p>R$${produto.preco}</p>`;

                // Adicione o botão "Comprar"
                const buttonComprar = document.createElement('button');
                buttonComprar.classList.add('buttonComprar');
                buttonComprar.textContent = 'Comprar';

                // Adicione o evento onClick chamando a função handleAuthentication()
                buttonComprar.onclick = handleAuthentication; // Passe o produto para a função se necessário
                
                divProduto.appendChild(buttonComprar);

                // Adicione a div do produto ao conjunto atual
                divRowProdutos.appendChild(divProduto);
            }

            // Adicionar a nova div 'row-produtos' ao contêiner
            containerProdutos.appendChild(divRowProdutos);
        }
    } catch (error) {
        console.error('Erro ao lidar com os dados do produto:', error);
    }
}

function handleAuthentication() {
    const token = localStorage.getItem('token');
    if (token == 1) {
        alert('Produto adicionado ao carrinho de compras');
    }
};

function Logout() {
    localStorage.setItem('token', 0);
    window.location.reload();
    // window.location.href = '../login/login-page.html';
    alert('Você foi deslogado.');
}

function handleCategoryData() {
    const dados = getCategoryData();

    dados.then(categorias => {
        const ulElement = document.getElementById('categorias-lista');

        // Adicionar botão para remover filtros
        const removeFiltersButton = document.createElement('button');
        removeFiltersButton.textContent = 'Mostrar Todos';
        removeFiltersButton.addEventListener('click', () => {
            // Remover classe de destaque de todos os botões
            const buttons = ulElement.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.classList.remove('categoria-selecionada');
            });

            // Lógica para remover os filtros aplicados e exibir todos os produtos
            handleAwake();
        });

        ulElement.appendChild(removeFiltersButton);

        categorias.forEach(categoria => {
            const liElement = document.createElement('li');
            const buttonElement = document.createElement('button');

            buttonElement.textContent = categoria.nome; // Substitua 'nome' pelo nome do atributo que contém o nome da categoria
            buttonElement.addEventListener('click', () => {
                // Remover classe de destaque de todos os botões
                const buttons = ulElement.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.classList.remove('categoria-selecionada');
                });

                // Destacar categoria selecionada
                buttonElement.classList.add('categoria-selecionada');

                // Lógica para lidar com o clique no botão da categoria, se necessário
                switch (categoria.nome) {
                    case "Cafés":
                        handleProductData(1);
                        break;
                    case "Café em grãos":
                        handleProductData(2);
                        break;
                }
            });

            liElement.appendChild(buttonElement);
            ulElement.appendChild(liElement);
        });
    });
}

checkToken();
handleCategoryData();
handleAwake();
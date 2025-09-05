// ----- Variáveis -----
let carrinho = [];
let mostrandoMais = false;
const produtosPorCategoria = 10; // Limite inicial por categoria

// Lista de produtos por categoria
const produtos = [
    // Doces
    { id: 1, categoria: "Doces", nome: "🍬 Bala Sortida 100g", preco: 3.50 },
    { id: 2, categoria: "Doces", nome: "🍫 Chocolate Ao Leite 90g", preco: 4.50 },
    { id: 3, categoria: "Doces", nome: "🧁 Cupcake Doce", preco: 5.00 },
    { id: 4, categoria: "Doces", nome: "🍩 Donut Recheado", preco: 4.20 },
    { id: 5, categoria: "Doces", nome: "🍪 Biscoito Recheado 200g", preco: 5.50 },
    { id: 6, categoria: "Doces", nome: "🍫 Bombom Sortido 200g", preco: 9.00 },
    { id: 7, categoria: "Doces", nome: "🍭 Pirulito Gigante", preco: 2.50 },
    { id: 8, categoria: "Doces", nome: "🍬 Jujuba Sortida 50g", preco: 3.00 },

    // Bebidas
    { id: 9, categoria: "Bebidas", nome: "🥤 Refrigerante Cola 2L", preco: 9.50 },
    { id: 10, categoria: "Bebidas", nome: "🍊 Suco de Laranja 1L", preco: 6.80 },
    { id: 11, categoria: "Bebidas", nome: "🧃 Suco Natural 1L", preco: 7.00 },
    { id: 12, categoria: "Bebidas", nome: "☕ Café Torrado 500g", preco: 12.50 },
    { id: 13, categoria: "Bebidas", nome: "🍷 Vinho Suave 750ml", preco: 35.00 },
    { id: 14, categoria: "Bebidas", nome: "🥛 Leite UHT 1L", preco: 6.00 },

    // Alimentos
    { id: 15, categoria: "Alimentos", nome: "🍚 Arroz 5kg", preco: 25.50 },
    { id: 16, categoria: "Alimentos", nome: "🫘 Feijão Carioca 1kg", preco: 8.90 },
    { id: 17, categoria: "Alimentos", nome: "🛢️ Óleo de Soja 900ml", preco: 7.50 },
    { id: 18, categoria: "Alimentos", nome: "🍝 Macarrão Espaguete 500g", preco: 3.90 },
    { id: 19, categoria: "Alimentos", nome: "🍞 Pão de Forma 500g", preco: 7.00 },
    { id: 20, categoria: "Alimentos", nome: "🧈 Margarina 250g", preco: 4.00 },
    { id: 21, categoria: "Alimentos", nome: "🥩 Carne Bovina 1kg", preco: 40.00 },
    { id: 22, categoria: "Alimentos", nome: "🍗 Frango Inteiro 1,2kg", preco: 18.50 },
    { id: 23, categoria: "Alimentos", nome: "🥦 Brócolis 500g", preco: 6.50 },
    { id: 24, categoria: "Alimentos", nome: "🥕 Cenoura 1kg", preco: 4.20 },
    { id: 25, categoria: "Alimentos", nome: "🍌 Banana Prata 1kg", preco: 5.00 },
    { id: 26, categoria: "Alimentos", nome: "🍎 Maçã Fuji 1kg", preco: 7.50 },
    { id: 27, categoria: "Alimentos", nome: "🍐 Pera 1kg", preco: 8.00 },
    { id: 28, categoria: "Alimentos", nome: "🍋 Limão Siciliano 500g", preco: 6.20 },
    { id: 29, categoria: "Alimentos", nome: "🥖 Pão Francês 500g", preco: 5.50 },
    { id: 30, categoria: "Alimentos", nome: "🧄 Alho 100g", preco: 2.50 },
    { id: 31, categoria: "Alimentos", nome: "🧅 Cebola 1kg", preco: 4.00 },
    { id: 32, categoria: "Alimentos", nome: "🫛 Ervilha 500g", preco: 6.00 },
    { id: 33, categoria: "Alimentos", nome: "🥔 Batata 1kg", preco: 4.50 },
    { id: 34, categoria: "Alimentos", nome: "🍅 Tomate 1kg", preco: 7.00 }
];

// ----- Doces animados -----
const docesEmojis = ["🍭", "🍬", "🍫", "🍩", "🧁"];
const docesContainer = document.getElementById("doces");

function criarDoce() {
    const doce = document.createElement("div");
    doce.classList.add("docinho");
    doce.style.left = Math.random() * window.innerWidth + "px";
    doce.style.animationDuration = (3 + Math.random() * 3) + "s";
    doce.textContent = docesEmojis[Math.floor(Math.random() * docesEmojis.length)];
    docesContainer.appendChild(doce);
    setTimeout(() => {
        if (docesContainer.contains(doce)) docesContainer.removeChild(doce);
    }, 6000);
}
setInterval(criarDoce, 300);

// ----- Porta e entrada -----
document.getElementById("btnEntrar").addEventListener("click", () => {
    const porta = document.getElementById("porta");
    porta.classList.add("aberta");

    const som = document.getElementById("somPorta");
    if (som) som.play();

    for (let i = 0; i < 30; i++) criarDoce();

    setTimeout(() => {
        document.getElementById("entrada").style.display = "none";
        document.getElementById("mercado").style.display = "block";
        carregarProdutos();
    }, 1000);
});

// ----- Carregar produtos por categoria -----
function carregarProdutos() {
    const tabela = document.getElementById("tabelaProdutos");
    tabela.innerHTML = "";

    const categorias = [...new Set(produtos.map(p => p.categoria))];

    categorias.forEach(cat => {
        // Linha de categoria
        const trCat = document.createElement("tr");
        trCat.classList.add("tr-categoria");
        trCat.classList.add(cat.toLowerCase());
        trCat.innerHTML = `<td colspan="5">${cat}</td>`;
        tabela.appendChild(trCat);

        // Produtos da categoria
        let produtosCat = produtos.filter(p => p.categoria === cat);
        if (!mostrandoMais) produtosCat = produtosCat.slice(0, produtosPorCategoria);

        produtosCat.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td>∞</td>
                <td><button onclick="adicionarCarrinho(${p.id})">Adicionar ao carrinho</button></td>
            `;
            tabela.appendChild(tr);
        });
    });

    const btnMaisMenos = document.getElementById("btnMaisMenos");
    btnMaisMenos.textContent = mostrandoMais
        ? "Menos produtos meus clientes"
        : "Mais produtos meus clientes";
}

document.getElementById("btnMaisMenos").addEventListener("click", () => {
    mostrandoMais = !mostrandoMais;
    carregarProdutos();
});

// ----- Carrinho -----
function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    let item = carrinho.find(p => p.id === id);
    if (item) item.quantidadeCarrinho += 1;
    else carrinho.push({ ...produto, quantidadeCarrinho: 1 });

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("totalCarrinho");
    lista.innerHTML = "";
    let total = 0;
    carrinho.forEach(item => {
        lista.innerHTML += `<li>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidadeCarrinho}</li>`;
        total += item.preco * item.quantidadeCarrinho;
    });
    totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

document.getElementById("btnLimpar").addEventListener("click", () => {
    carrinho = [];
    atualizarCarrinho();
});

document.getElementById("btnFinalizar").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    document.getElementById("caixa").style.display = "block";

    let resumo = "<ul>";
    let total = 0;
    carrinho.forEach(item => {
        resumo += `<li>${item.nome} - ${item.quantidadeCarrinho} x R$ ${item.preco.toFixed(2)}</li>`;
        total += item.preco * item.quantidadeCarrinho;
    });
    resumo += `</ul><p>Total a pagar: R$ ${total.toFixed(2)}</p>`;
    document.getElementById("resumoPagamento").innerHTML = resumo;
    document.getElementById("mensagemFinal").innerHTML =
        "Escolha a forma de pagamento:";
});

function pagar(forma) {
    let formaPagamento = forma === "dinheiro" ? "Dinheiro 💵" :
                        forma === "debito" ? "Cartão Débito 💳" : "Cartão Crédito 💳";
    document.getElementById("mensagemFinal").innerHTML =
        `Pagamento confirmado via ${formaPagamento}.<br>Todos os produtos foram pagos. 🛒😊`;
    carrinho = [];
    atualizarCarrinho();
}

// Inicializa a tabela
carregarProdutos();

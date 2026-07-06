// Base de dados das senhas absurdas
const pioresSenhas = [
    { senha: "123456", perigo: "Crítico", frase: "Parabéns. Você usou a senha mais usada do planeta. Um chipanzé vendado adivinharia isso em 0.00001 segundos." },
    { senha: "senha", perigo: "Crítico", frase: "Muito criativo. O próximo passo é escrever 'carteira' na sua carteira para guardá-la em segurança." },
    { senha: "password", perigo: "Crítico", frase: "Em inglês para dar um ar internacional ao seu fracasso de segurança cibernética." },
    { senha: "123456789", perigo: "Alto", frase: "Ah, claro! Você achou que 6 números era pouco e adicionou mais 3. Agora os hackers vão precisar de mais 1 milissegundo." },
    { senha: "corinthians", perigo: "Alto", frase: "O seu time pode até ter mundial, mas sua segurança digital está rebaixada para a Série D." },
    { senha: "admin", perigo: "Crítico", frase: "Clássica. Perfeita se você deseja que qualquer pessoa gerencie sua vida sem a sua permissão." },
    { senha: "mudar123", perigo: "Médio", frase: "Você sabe que precisa mudar, mas a preguiça foi maior. O hacker agradece o aviso prévio." },
    { senha: "iloveyou", perigo: "Alto", frase: "O amor está no ar... e os seus dados pessoais também estão voando direto para a dark web." },
    { senha: "qwerty", perigo: "Alto", frase: "Arrastar o dedo pela primeira linha do teclado não é criar uma senha, é passar vergonha." },
    { senha: "111111", perigo: "Crítico", frase: "Se o seu teclado quebrar e só sobrar a tecla 1, ainda assim procure outra opção." }
];

// Elementos da página
const inputSenha = document.getElementById('password-input');
const btnTestar = document.getElementById('btn-test');
const displayResultado = document.getElementById('result-display');
const statusResultado = document.getElementById('result-status');
const msgResultado = document.getElementById('result-message');
const gridCards = document.getElementById('grid-cards');
const btnGerar = document.getElementById('btn-generate');
const boxGerada = document.getElementById('generated-password');

// Inicializar Galeria de Cards
function renderizarGaleria() {
    gridCards.innerHTML = "";
    pioresSenhas.forEach(item => {
        const card = document.createElement('div');
        card.className = 'horror-card';
        
        let corTag = '#ffee00'; // Amarelo para médio
        if (item.perigo === 'Crítico') corTag = '#ff007f'; // Rosa choque
        if (item.perigo === 'Alto') corTag = '#ffaa00'; // Laranja

        card.innerHTML = `
            <div>
                <h3>"${item.senha}"</h3>
                <span class="danger-tag" style="background-color: ${corTag}">${item.perigo}</span>
            </div>
            <p>${item.frase}</p>
        `;
        
        // Evento interativo ao clicar no card, joga a senha no input de teste
        card.addEventListener('click', () => {
            inputSenha.value = item.senha;
            testarSenha();
        });

        gridCards.appendChild(card);
    });
}

// Lógica de Teste da Senha
function testarSenha() {
    const valor = inputSenha.value.trim().toLowerCase();
    
    if (valor === "") {
        exibirResultado("Digite algo!", "Você não pode se defender deixando o campo vazio. Ou pode?", "#ffee00");
        return;
    }

    // Procura correspondência exata ou parcial
    const achou = pioresSenhas.find(p => valor.includes(p.senha) || p.senha.includes(valor));

    if (achou) {
        let cor = achou.perigo === 'Crítico' ? '#ff007f' : '#ffaa00';
        exibirResultado(
            `⚠️ ALERTA DE PERIGO: ${achou.perigo.toUpperCase()}`, 
            `Isso se parece muito com "${achou.senha}". Motivo do deboche: ${achou.frase}`, 
            cor
        );
    } else {
        // Se for uma senha longa, finge que aceitou mas faz piada
        if (valor.length > 10) {
            exibirResultado(
                "🤔 Parece aceitável...", 
                "Não está na nossa lista de vergonhas públicas. Mas não ponha sua mão no fogo, nós somos apenas um script de IA.", 
                "#39ff14"
            );
        } else {
            exibirResultado(
                "🚨 Curta demais!", 
                "Não tá na lista das piores, mas é tão curta que um computador comum adivinha antes de você terminar de piscar.", 
                "#ffaa00"
            );
        }
    }
}

function exibirResultado(status, mensagem, corBorda) {
    displayResultado.classList.remove('hidden');
    displayResultado.style.borderColor = corBorda;
    statusResultado.innerText = status;
    statusResultado.style.color = corBorda;
    msgResultado.innerText = mensagem;
}

// Gerador de Piores Senhas
const componentesPiores = [
    "123", "abc", "senha", "deus", "gato", "2026", "admin", "love", "torcida", "starwars"
];

btnGerar.addEventListener('click', () => {
    const p1 = componentesPiores[Math.floor(Math.random() * componentesPiores.length)];
    const p2 = componentesPiores[Math.floor(Math.random() * componentesPiores.length)];
    const numeroAleatorio = Math.floor(Math.random() * 900) + 100;
    
    const senhaGerada = `${p1}${p2}${numeroAleatorio}`;
    
    boxGerada.classList.remove('hidden');
    boxGerada.style.borderColor = "var(--neon-yellow)";
    boxGerada.innerHTML = `Sua nova pior senha é: <strong style="color: var(--neon-yellow); font-size: 1.3rem;">${senhaGerada}</strong><br><small style="color: #888;">Garantia de clonagem de cartão em até 3 dias úteis.</small>`;
});

// Eventos ouvintes
btnTestar.addEventListener('click', testarSenha);
inputSenha.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') testarSenha();
});

// Inicialização
renderizarGaleria();

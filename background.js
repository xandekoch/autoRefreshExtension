let countdownIntervalId;
let countdownNumber;
let intervalId;
let clickIntervalId;
let x, y = 50;
let refreshInterval;

// Função para iniciar a automação
function startAutomation() {
    // Inicia o intervalo para atualizar a página periodicamente
    intervalId = setInterval(refreshPage, refreshInterval); // Atualiza a página a cada refreshInterval milissegundos

    startCountdown(); // Reinicia o temporizador até o próximo refresh
}

// Função para parar a automação
function stopAutomation() {
    // Limpa o temporizador do próximo refresh
    clearInterval(countdownIntervalId);

    // Limpa os intervalos de atualização da página e de cliques
    clearInterval(intervalId);
    clearInterval(clickIntervalId);
}

// Função para iniciar o temporizador até o próximo refresh
function startCountdown() {
    // Limpa o intervalo de contagem regressiva anterior, se houver
    if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
    }

    countdownNumber = refreshInterval / 1000;
    countdownIntervalId = setInterval(() => {
        countdownNumber--;
        if (countdownNumber <= 0) {
            clearInterval(countdownIntervalId);
        }
        updateBadge(); // Atualiza o distintivo do ícone da extensão com a contagem regressiva
    }, 1000); // Atualiza a contagem a cada segundo
}

// Função para atualizar o distintivo do ícone da extensão com a contagem regressiva
function updateBadge() {
    chrome.action.setBadgeText({ text: countdownNumber.toString() }); // Define o texto do distintivo do ícone da extensão
}

// Função para atualizar a página
function refreshPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) { // Verifica se pelo menos um tab foi retornado
            chrome.tabs.reload(tabs[0].id);
            clickButtonAndPlaySound();
        }
    });
    startCountdown(); // Reinicia o temporizador até o próximo refresh
}

// Função para clicar na posição especificada
function clickButtonAndPlaySound() { // Recebe o id do tab como um argumento
    setTimeout(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "clickButton" });
        });
    }, 2000);
}

// Listener para as Hotkeys
chrome.commands.onCommand.addListener(function (command) {
    if (command === 'start-automation') {
        startAutomation();
        console.log('Iniciando a automação');
    } else if (command === 'stop-automation') {
        stopAutomation();
        console.log('Parando a automação');
    }
});

// Listener para as mensagens enviadas pelo popup.js
chrome.runtime.onMessage.addListener(function (request) {
    if (request.type === "update") {
        refreshInterval = request.refreshInterval;
    } else if (request.type === "start") {
        startAutomation();
    } else if (request.type === "stop") {
        stopAutomation();
    }
});

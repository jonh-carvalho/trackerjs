// Inicializa o mapa centrado em uma localização padrão (latitude, longitude)
const map = L.map('map').setView([-15.7942, -47.8822], 13);

// Adiciona um tile layer ao mapa (de OpenStreetMap, por exemplo)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Cria um grupo de camadas para armazenar as marcas de rota
let routeLayer = L.layerGroup().addTo(map);

// Função para marcar a localização no mapa
function markLocation(lat, lng) {
    L.marker([lat, lng]).addTo(routeLayer);
}

// Função para atualizar a posição e desenhar o percurso
function trackPosition(position) {
    const { latitude, longitude } = position.coords;
    
    // Move a visualização do mapa para a nova posição
    map.setView([latitude, longitude], 16);

    // Marca a nova localização no mapa
    markLocation(latitude, longitude);
}

// Função para lidar com erros de geolocalização
function handleError(error) {
    console.error(`Erro ao obter localização: ${error.message}`);
}

// Iniciar o rastreamento contínuo da localização
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(trackPosition, handleError, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    });
} else {
    alert('Seu navegador não suporta Geolocalização.');
}

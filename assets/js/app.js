
var map = L.map('map').setView([48.858222,  2.2945], 18); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function generateHeartShape(centerLat, centerLng, size) {
    var points = [];
    for (var t = 0; t <= Math.PI * 2; t += 0.1) {
        var x = 16 * Math.pow(Math.sin(t), 3);
        var y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        var lat = centerLat + (y * size / 100);
        var lng = centerLng + (x * size / 100);
        
        points.push([lat, lng]);
    }
    return points;
}

var heartPoints = generateHeartShape(48.858222,  2.2945, 0.003);

var heartPolygon = L.polygon(heartPoints, {
    color: '#152136',
    fillColor: '#90DAD9',
    fillOpacity: 0.4
}).addTo(map);

const customIcon = L.icon({
            iconUrl: './public/icons/marker-icon-red.png',
            iconSize: [50, 80],
            iconAnchor: [30, 55],
            popupAnchor: [1, -34],
            });
const marker = L.marker([48.858222,  2.2945], { icon: customIcon }).addTo(map);

marker.bindPopup('<div class="custom-popup">Eiffel Tower</div>').openPopup();

var popupStyle = `
       .custom-popup {
        color: #152136; 
        border-radius: 5px;
        font-size: 12px;
        font-weight: bold;
      }
    `
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = popupStyle;
document.head.appendChild(styleSheet);

marker._icon.classList.add("huechange");
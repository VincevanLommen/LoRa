# LoRa Project

## Overzicht

Dit project maakt gebruik van LoRa-technologie om sensorgegevens te verzamelen en weer te geven. De gegevens worden opgeslagen in een database en kunnen in real-time worden bekeken via een webinterface. Het project bestaat uit verschillende onderdelen die samenwerken om de gegevens te verzamelen, op te slaan en weer te geven.

## Bestandsoverzicht

### `index.html`
Dit is de hoofdpagina van de webinterface. Het toont de actuele sensorgegevens en grafieken die de data in real-time weergeven.

### `geschiedenis.html`
Deze pagina toont de historische sensorgegevens. Gebruikers kunnen de gegevens bekijken over verschillende tijdsperioden, zoals de laatste 24 uur, week of maand.

### `styles.css`
Dit bestand bevat de CSS-stijlen die worden gebruikt om de verschillende HTML-pagina's vorm te geven.

### `mqtt-client.js`
Dit JavaScript-bestand verbindt met de MQTT-broker, ontvangt real-time sensorgegevens en werkt de grafieken bij op de `index.html` pagina.

### `fetch-historical-data.js`
Dit JavaScript-bestand haalt historische gegevens op van de server en werkt de grafieken bij op de `geschiedenis.html` pagina.

### `fetch_recent_data.php`
Dit PHP-bestand haalt de meest recente sensorgegevens op uit de database om de grafieken op de `index.html` pagina te initialiseren wanneer de pagina wordt geladen.

### `save_data.php`
Dit PHP-bestand ontvangt de real-time sensorgegevens van de MQTT-broker en slaat deze op in de database.

### `fetch_historical_data.php`
Dit PHP-bestand haalt historische gegevens op uit de database op basis van de geselecteerde tijdsperiode en retourneert deze als JSON, zodat ze kunnen worden weergegeven op de `geschiedenis.html` pagina.

### `HistroryLogMqtt.js`
Dit JavaScript-bestand logt historische gegevens die zijn ontvangen via MQTT en werkt de grafieken bij op de `geschiedenis.html` pagina.

### `bash_script.sh`
Dit bash-script genereert sinusgolven voor temperatuurwaarden en willekeurige waarden voor andere sensoren en stuurt deze naar de MQTT-broker om de gegevens te simuleren.

## Installatie

1. Clone deze repository naar je lokale machine.
2. Zorg ervoor dat je een webserver hebt ingesteld (bijv. Apache, Nginx) en dat PHP is geïnstalleerd.
3. Plaats de bestanden in de rootmap van je webserver.
4. Pas de configuratie van de databaseverbinding aan in de PHP-bestanden.
5. Start je webserver en bezoek `index.html` en `geschiedenis.html` om de gegevens te bekijken.

## Gebruik

1. Bezoek `index.html` om de actuele sensorgegevens in real-time te bekijken.
2. Bezoek `geschiedenis.html` om de historische sensorgegevens over verschillende tijdsperioden te bekijken.
3. Voer het bash-script uit om gesimuleerde gegevens naar de MQTT-broker te sturen.

## Contact

Voor vragen of opmerkingen, neem contact op met Wout Vanvoorden en Vince Van Lommen.


# LoRa Project

## Overzicht

Dit project maakt gebruik van LoRa-technologie om sensorgegevens te verzamelen en weer te geven. De gegevens worden opgeslagen in een database en kunnen in real-time worden bekeken via een webinterface. Het project bestaat uit verschillende onderdelen die samenwerken om de gegevens te verzamelen, op te slaan en weer te geven.

## Bestandsoverzicht

### `index.html`

De `index.html` is de hoofdpagina van de webinterface. Deze pagina toont de actuele sensorgegevens, zoals temperatuur, luchtvochtigheid, grondvochtigheid en neerslag, verzameld via een LoRa netwerk. De gegevens worden in real-time weergegeven met behulp van grafieken. De pagina maakt verbinding met de MQTT-broker via websockets om de real-time sensorgegevens te ontvangen en weer te geven in grafieken. Dit zorgt ervoor dat de gegevens voortdurend worden bijgewerkt en actueel zijn. Daarnaast bevat deze pagina de lay-out en structuur voor de presentatie van de gegevens, inclusief HTML-elementen zoals secties en canvas-elementen voor de grafieken.

### `geschiedenis.html`

De `geschiedenis.html` pagina toont historische sensorgegevens. Gebruikers kunnen de gegevens bekijken over verschillende tijdsperioden, zoals de laatste 24 uur, week of maand. Deze pagina biedt een dropdown menu waarmee gebruikers de gewenste tijdsperiode kunnen selecteren. De gegevens worden opgehaald uit de database en weergegeven in een grafiek, zodat gebruikers de historische trends kunnen analyseren. De pagina bevat HTML-elementen voor de lay-out en structuur van de historische gegevensweergave en integreert JavaScript-bestanden voor het ophalen en weergeven van de historische gegevens.

### `styles.css`

Dit bestand bevat de CSS-stijlen die worden gebruikt om de verschillende HTML-pagina's vorm te geven. Het definieert de algemene stijlregels voor de website, evenals de specifieke stijlregels voor headers, footers en de opmaak van de grafieken. Hierdoor wordt de lay-out en vormgeving van de webinterface consistent en visueel aantrekkelijk. Het bestand bevat CSS-selectors en -eigenschappen om de visuele presentatie van de pagina-elementen te beheren, zoals kleur, typografie, marge, padding en uitlijning.

### `mqtt-client.js`

Dit JavaScript-bestand verbindt met de MQTT-broker, ontvangt real-time sensorgegevens en werkt de grafieken bij op de `index.html` pagina. Het zorgt ervoor dat de gegevens in real-time worden weergegeven en bijgewerkt. Dit bestand bevat de logica voor het ontvangen van de sensorgegevens via MQTT en het bijwerken van de grafieken met de nieuwste gegevens. Het maakt gebruik van de MQTT.js bibliotheek om verbinding te maken met de broker en de Chart.js bibliotheek om de gegevens in grafieken weer te geven.

### `fetch-historical-data.js`

Dit JavaScript-bestand haalt historische gegevens op van de server en werkt de grafieken bij op de `geschiedenis.html` pagina. Het zorgt ervoor dat de historische gegevens correct worden weergegeven op basis van de door de gebruiker geselecteerde tijdsperiode. Hierdoor kunnen gebruikers eenvoudig historische trends en patronen analyseren. Het bestand maakt gebruik van fetch-aanvragen om gegevens van de server op te halen en de Chart.js bibliotheek om de gegevens in grafieken weer te geven.

### `fetch_recent_data.php`

Dit PHP-bestand haalt de meest recente sensorgegevens op uit de database om de grafieken op de `index.html` pagina te initialiseren wanneer de pagina wordt geladen. Het retourneert de gegevens in JSON-formaat, zodat ze eenvoudig kunnen worden verwerkt door het JavaScript op de webpagina. Dit zorgt ervoor dat de grafieken direct bij het laden van de pagina worden bijgewerkt met de meest recente gegevens. Het bestand bevat SQL-query's om gegevens uit de database op te halen en deze in JSON-formaat terug te sturen.

### `save_data.php`

Dit PHP-bestand ontvangt de real-time sensorgegevens van de MQTT-broker en slaat deze op in de database. Het zorgt voor de opslag van de sensorgegevens, zodat deze later kunnen worden weergegeven en geanalyseerd. Dit bestand bevat de logica voor het verbinden met de database en het opslaan van de ontvangen sensorgegevens. Het maakt gebruik van SQL-instructies om de gegevens in de juiste tabel op te slaan en bevat error handling om eventuele problemen tijdens de opslag te beheren.

### `fetch_historical_data.php`

Dit PHP-bestand haalt historische gegevens op uit de database op basis van de geselecteerde tijdsperiode en retourneert deze als JSON, zodat ze kunnen worden weergegeven op de `geschiedenis.html` pagina. Dit bestand zorgt ervoor dat de juiste historische gegevens worden opgehaald en beschikbaar worden gesteld voor weergave in de grafieken. Het bevat SQL-query's om gegevens uit de database op te halen en deze in JSON-formaat terug te sturen naar de client.

### `HistroryLogMqtt.js`

Dit JavaScript-bestand logt historische gegevens die zijn ontvangen via MQTT en werkt de grafieken bij op de `geschiedenis.html` pagina. Het zorgt voor de verwerking en weergave van historische gegevens, zodat gebruikers een compleet overzicht hebben van de sensorgegevens over tijd. Het bestand maakt gebruik van de MQTT.js bibliotheek om verbinding te maken met de broker en de Chart.js bibliotheek om de gegevens in grafieken weer te geven. Het bevat logica om de ontvangen gegevens te verwerken en bij te werken.

### `bash_script.sh`

Dit bash-script genereert sinusgolven voor temperatuurwaarden en willekeurige waarden voor andere sensoren en stuurt deze naar de MQTT-broker om de gegevens te simuleren. Dit is handig voor het testen en ontwikkelen van de functionaliteit van het systeem zonder afhankelijk te zijn van echte sensorgegevens. Het script genereert periodieke en willekeurige gegevens en stuurt deze naar de MQTT-broker om de gegevensstroom te simuleren. Het bevat shell-commando's om de gegenereerde gegevens te publiceren naar de MQTT-broker en maakt gebruik van de `mosquitto_pub` tool voor het versturen van de MQTT-berichten.

## Installatie

1. Clone deze repository naar je lokale machine:
    ```sh
    git clone https://github.com/yourusername/loraproject.git
    ```
2. Zorg ervoor dat Apache is geïnstalleerd:
    ```sh
    sudo apt-get update
    sudo apt-get install apache2
    ```
3. Plaats de bestanden in de map `/var/www/html` van je webserver:
    ```sh
    sudo cp -r loraproject/* /var/www/html/
    ```
4. Installeer PHP en PHPMyAdmin:
    ```sh
    sudo apt-get install php libapache2-mod-php php-mysql
    sudo apt-get install phpmyadmin
    ```
5. Maak een database aan in PHPMyAdmin genaamd `LoRa` en configureer je databaseverbindingen in de PHP-bestanden (`fetch_recent_data.php`, `save_data.php`, `fetch_historical_data.php`):
    ```php
    // Voorbeeld van databaseconfiguratie
    $servername = "localhost";
    $username = "yourusername";
    $password = "yourpassword";
    $dbname = "LoRa";
    ```
6. Start je webserver en bezoek `index.html` en `geschiedenis.html` om de gegevens te bekijken:
    ```sh
    sudo service apache2 start
    ```

## Gebruik

1. Bezoek `index.html` om de actuele sensorgegevens in real-time te bekijken.
2. Bezoek `geschiedenis.html` om de historische sensorgegevens over verschillende tijdsperioden te bekijken.
3. Voer het bash-script uit om gesimuleerde gegevens naar de MQTT-broker te sturen:
    ```sh
    ./bash_script.sh
    ```

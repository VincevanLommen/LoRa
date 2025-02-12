LoRa Project
Overzicht
Het LoRa Project maakt gebruik van LoRa-technologie om sensorgegevens te verzamelen en weer te geven. De gegevens worden opgeslagen in een database en kunnen in real-time worden bekeken via een webinterface. Het project bestaat uit verschillende onderdelen die samenwerken om de gegevens te verzamelen, op te slaan en weer te geven.

Bestandsoverzicht
index.html
De index.html is de hoofdpagina van de webinterface. Deze pagina toont de actuele sensorgegevens, zoals temperatuur, luchtvochtigheid, grondvochtigheid en neerslag, verzameld via een LoRa netwerk. De gegevens worden in real-time weergegeven met behulp van grafieken. De pagina maakt verbinding met de MQTT-broker via websockets om de real-time sensorgegevens te ontvangen en weer te geven in grafieken. Dit zorgt ervoor dat de gegevens voortdurend worden bijgewerkt.

geschiedenis.html
De geschiedenis.html pagina toont historische sensorgegevens. Gebruikers kunnen de gegevens bekijken over verschillende tijdsperioden, zoals de laatste 24 uur, week of maand. Deze pagina biedt een dropdown menu waarmee gebruikers de gewenste tijdsperiode kunnen selecteren. De gegevens worden opgehaald uit de database en weergegeven in een grafiek, zodat gebruikers de historische trends kunnen analyseren.

styles.css
Dit bestand bevat de CSS-stijlen die worden gebruikt om de verschillende HTML-pagina's vorm te geven. Het definieert de algemene stijlregels voor de website, evenals de specifieke stijlregels voor headers, footers en de opmaak van de grafieken. Hierdoor wordt de lay-out en vormgeving van de webinterface consistent en visueel aantrekkelijk.

mqtt-client.js
Dit JavaScript-bestand verbindt met de MQTT-broker, ontvangt real-time sensorgegevens en werkt de grafieken bij op de index.html pagina. Het zorgt ervoor dat de gegevens in real-time worden weergegeven en bijgewerkt. Dit bestand bevat de logica voor het ontvangen van de sensorgegevens via MQTT en het bijwerken van de grafieken met de nieuwste gegevens.

fetch-historical-data.js
Dit JavaScript-bestand haalt historische gegevens op van de server en werkt de grafieken bij op de geschiedenis.html pagina. Het zorgt ervoor dat de historische gegevens correct worden weergegeven op basis van de door de gebruiker geselecteerde tijdsperiode. Hierdoor kunnen gebruikers eenvoudig historische trends en patronen analyseren.

fetch_recent_data.php
Dit PHP-bestand haalt de meest recente sensorgegevens op uit de database om de grafieken op de index.html pagina te initialiseren wanneer de pagina wordt geladen. Het retourneert de gegevens in JSON-formaat, zodat ze eenvoudig kunnen worden verwerkt door het JavaScript op de webpagina. Dit zorgt ervoor dat de grafieken direct bij het laden van de pagina worden bijgewerkt met de meest recente gegevens.

save_data.php
Dit PHP-bestand ontvangt de real-time sensorgegevens van de MQTT-broker en slaat deze op in de database. Het zorgt voor de opslag van de sensorgegevens, zodat deze later kunnen worden weergegeven en geanalyseerd. Dit bestand bevat de logica voor het verbinden met de database en het opslaan van de ontvangen sensorgegevens.

fetch_historical_data.php
Dit PHP-bestand haalt historische gegevens op uit de database op basis van de geselecteerde tijdsperiode en retourneert deze als JSON, zodat ze kunnen worden weergegeven op de geschiedenis.html pagina. Dit bestand zorgt ervoor dat de juiste historische gegevens worden opgehaald en beschikbaar worden gesteld voor weergave in de grafieken.

HistroryLogMqtt.js
Dit JavaScript-bestand logt historische gegevens die zijn ontvangen via MQTT en werkt de grafieken bij op de geschiedenis.html pagina. Het zorgt voor de verwerking en weergave van historische gegevens, zodat gebruikers een compleet overzicht hebben van de sensorgegevens over tijd.

bash_script.sh
Dit bash-script genereert sinusgolven voor temperatuurwaarden en willekeurige waarden voor andere sensoren en stuurt deze naar de MQTT-broker om de gegevens te simuleren. Dit is handig voor het testen en ontwikkelen van de functionaliteit van het systeem zonder afhankelijk te zijn van echte sensorgegevens. Het script genereert periodieke en willekeurige gegevens en stuurt deze naar de MQTT-broker om de gegevensstroom te simuleren.

Installatie
Clone deze repository naar je lokale machine.

Zorg ervoor dat je een webserver hebt ingesteld (bijv. Apache, Nginx) en dat PHP is geïnstalleerd.

Plaats de bestanden in de rootmap van je webserver.

Pas de configuratie van de databaseverbinding aan in de PHP-bestanden.

Start je webserver en bezoek index.html en geschiedenis.html om de gegevens te bekijken.

Gebruik
Bezoek index.html om de actuele sensorgegevens in real-time te bekijken.

Bezoek geschiedenis.html om de historische sensorgegevens over verschillende tijdsperioden te bekijken.

Voer het bash-script uit om gesimuleerde gegevens naar de MQTT-broker te sturen.

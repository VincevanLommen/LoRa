Taak 1.1: Opzetten van LoRa zendstations


Hiervoor gebruiken jullie ofwel een Arduino ofwel een ESP32 + RFM95 Lora Module + sensoren


Teams bestaande uit 4 lln., maken 3 zendstations:

· Zendstation 1 meet temperatuur en luchtvochtigheid

· Zendstation 2 meet regen

· Zendstation 3 meet grondvocht


Teams bestaande uit 3 lln., maken 2 zendstations:

· Zendstation 1 meet temperatuur en luchtvochtigheid

· Zendstation 3 meet grondvocht


Deze zendstations worden later door jullie op verschillende locaties op de campus Don Bosco geplaatst.


De zendstations zenden enkel nadat ze een volgend request telegram ontvangen hebben van jullie eigen ontvangstation data door naar jullie eigen ontvangstation. (In jullie cursus vinden jullie info hoe dit gedaan is voor enkel 2 zendstations).


Taak 1.2: Opzetten van LoRa ontvangstation


Hiervoor gebruiken jullie ofwel een Arduino ofwel een ESP32 + RFM95 Lora Module + OLED Display


Jullie maken 1 ontvangstation:

· Dit ontvangstation plaatsen jullie dan in het lokaal E109 of E110.

· Alle 30 sec (deze tijd is aanpasbaar in jullie code door gebruik van een #define) stuurt jullie ontvangstation een request-for-data uit naar jullie 3 zendstations. In deze request stuur je een request nr mee, zodat de zenders in hun antwoord dit nummer ook terugsturen in hun telegram.

· Je valideert uiteraard een aantal dingen in je ontvangstation: Komt telegram van één van onze zendstations? Is het telegram-nr juist? Is de data correct (test elk veld op getal en lengte)

· Telegrammen die je van andere zender / ontvangststations binnenkrijgt, negeer je dus.

· Na validatie van de inkomende data, stuur je data door per Mosquitto broker naar een zelf te kiezen topic.

· Je stuurt ook data door naar het OLED-display zodat de inkomende waarden duidelijk af te lezen zijn.



Taak 1.3: Opzetten van website


Hiervoor gebruiken jullie een Raspberry Pi als webserver


Jullie website:

· Bestaat uit html, css en js bestand(en). Laat hiervoor een node.js server draaien op je raspberry pi.

· Jullie SQL-database draait ook op je raspberry pi.

· Jullie zetten een gemeenschappelijke GitHub omgeving op, waarin jullie samen aan dit project kunnen werken. Werk hier dus met branches !

· Jullie code bewerken jullie met VS Code (remote). Je kan uiteraard ook offline testen op een laptop.

· Jullie code dient gestructureerd te zijn en voorzien van de nodige commentaar zodat je code “onderhoudbaar” is voor mogelijke toekomstige ontwikkelteams.

· Jullie website bestaat uit 2 pagina’s:

o 1 pagina voor actuele data. De datavelden worden uiteraard hernieuwd met elk binnenkomend nieuw data-telegram. Je stelt de data voor zowel grafisch alsook in tekstvorm.

o 1 pagina voor historische data. Hier toon je grafieken van de laatste 24hr, de actuele week en de actuele maand. Hiervoor dien je je data in een database te uploaden en dan ook uit te lezen. Je stelt de data voor hier enkel grafisch voor.

· Ontvangt binnenkomende telegrammen van de broker via web sockets.

· Jullie werken als team aan deze website. Elk van jullie codeert dus een deel ! Verdeel dus wie front-end en wie server-side codeert, wie met actuele data en wie met historische data werkt. Je moet niet allemaal meteen aan deze website werken, je kan bijv. iemand eerst aan de zendstations laten werken, iemand anders eerst aan het ontvangstation en de andere(n) aan de website. Zodra de zendstations + ontvangstation klaar zijn, werkt ieder van jullie aan een ander onderdeel van de website.

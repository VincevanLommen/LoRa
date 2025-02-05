import mysql.connector
import pandas as pd
import time
from datetime import datetime, timedelta

# Verbinding maken met de MySQL-database
db_config = {
    'user': 'ReadWrite',
    'password': 'ReadWrite',
    'host': '192.168.0.103',
    'database': 'LoRa'
}

def calculate_and_store_hourly_average():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Ophalen van gegevens uit de LoRa-tabel
    query = "SELECT Datum, Temp FROM LoRa"
    cursor.execute(query)
    rows = cursor.fetchall()

    # Omzetten van gegevens naar een pandas DataFrame
    data = pd.DataFrame(rows, columns=['Datum', 'Temp'])
    data['Datum'] = pd.to_datetime(data['Datum'])

    # Berekenen van de gemiddelde temperatuur per uur
    data.set_index('Datum', inplace=True)
    hourly_data = data.resample('H').mean().reset_index()

    # Verbinding maken met de nieuwe database LoRa_dag
    db_config['database'] = 'LoRa_dag'
    conn_dag = mysql.connector.connect(**db_config)
    cursor_dag = conn_dag.cursor()

    # Tabel maken als deze nog niet bestaat
    create_table_query = """
    CREATE TABLE IF NOT EXISTS LoRa_dag (
        Datum DATETIME PRIMARY KEY,
        Avg_Temp FLOAT
    )
    """
    cursor_dag.execute(create_table_query)

    # Gegevens invoegen in de LoRa_dag-tabel
    insert_query = "REPLACE INTO LoRa_dag (Datum, Avg_Temp) VALUES (%s, %s)"
    for index, row in hourly_data.iterrows():
        cursor_dag.execute(insert_query, (row['Datum'], row['Temp']))

    # Wijzigingen opslaan en verbinding sluiten
    conn_dag.commit()
    cursor.close()
    cursor_dag.close()
    conn.close()
    conn_dag.close()

    print("Gegevens succesvol verwerkt en ingevoegd in de LoRa_dag-tabel.")

while True:
    calculate_and_store_hourly_average()
    time.sleep(3600)  # Wacht een uur voordat je de gemiddelde temperatuur opnieuw berekent

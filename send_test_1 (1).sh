#! /bin/bash

# Declare the variables
HOST=192.168.0.103
TOPIC=LoRa/readings
SLEEP=3600  # Sleep for 1 hour (3600 seconds)

# Function to generate random sensor values
generate_random_value() {
    min=$1
    max=$2
    echo $(awk -v min="$min" -v max="$max" 'BEGIN{srand(); print min+rand()*(max-min+1)}')
}

# Function to generate realistic temperature based on time of day
generate_temperature() {
    hour=$(date +%H)
    if [ $hour -ge 6 ] && [ $hour -lt 18 ]; then
        # Daytime temperature between 10 and 30 degrees
        generate_random_value 10 30
    else
        # Nighttime temperature between 0 and 10 degrees
        generate_random_value 0 10
    fi
}

# Start the script
echo "Start of Transmission: sending to $HOST on Topic $TOPIC"
echo "=================================================================="

# Infinite loop to send random values
while true; do
    temperature=$(generate_temperature)
    humidity=$(generate_random_value 30 70)
    soil_moisture=$(generate_random_value 20 50)
    rain=$(generate_random_value 0 10)

    payload="{\"temperature\": $temperature, \"humidity\": $humidity, \"rain\": $rain, \"soilMoisture\": $soil_moisture}"
    echo "Sending => $payload"
    mosquitto_pub -h $HOST -t $TOPIC -m "$payload"
    sleep $SLEEP
done

# End the script
echo "End of Transmission"
echo "=================================================================="

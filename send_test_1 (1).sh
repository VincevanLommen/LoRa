#! /bin/bash

# Declare the variables
HOST=192.168.0.103
TOPIC=LoRa/readings
SLEEP=1

# Start the script
echo "Start of Transmission: sending to $HOST on Topic $TOPIC"
echo "=================================================================="

# Function to generate random sensor values
generate_random_value() {
    min=$1
    max=$2
    echo $(awk -v min="$min" -v max="$max" 'BEGIN{srand(); print min+rand()*(max-min+1)}')
}

# Infinite loop to send random values
while true; do
    temperature=$(generate_random_value 15 30)
    humidity=$(generate_random_value 30 70)
    soil_moisture=$(generate_random_value 20 50)

    payload="{\"temperature\": $temperature, \"humidity\": $humidity, \"soilMoisture\": $soil_moisture}"
    echo "Sending => $payload"
    mosquitto_pub -h $HOST -t $TOPIC -m "$payload"
    sleep $SLEEP
done

# End the script
echo "End of Transmission"
echo "=================================================================="

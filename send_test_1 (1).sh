#! /bin/bash

# Declare the variables
HOST=192.168.0.103
TOPIC=LoRa/readings
SLEEP=5  # Adjust sleep time as needed
PERIOD=1000  # Period of the sine wave in seconds

# Start the script
echo "Start of Transmission: sending to $HOST on Topic $TOPIC"
echo "=================================================================="

# Function to generate sine wave values for temperature
generate_sine_wave_value() {
    amplitude=$1
    offset=$2
    time=$3
    period=$4
    echo $(awk -v amplitude="$amplitude" -v offset="$offset" -v time="$time" -v period="$period" 'BEGIN{print amplitude * sin(2 * 3.14159 * time / period) + offset}')
}

# Function to generate random sensor values
generate_random_value() {
    min=$1
    max=$2
    echo $(awk -v min="$min" -v max="$max" 'BEGIN{srand(); print min+rand()*(max-min+1)}')
}

# Infinite loop to send random values
time=0
while true; do
    temperature=$(generate_sine_wave_value 10 20 $time $PERIOD)
    humidity=$(generate_random_value 0 100)
    soil_moisture=$(generate_random_value 20 50)
    rain=$(generate_random_value 0 10)

    payload="{\"temperature\": $temperature, \"humidity\": $humidity, \"rain\": $rain, \"soilMoisture\": $soil_moisture}"
    echo "Sending => $payload"
    mosquitto_pub -h $HOST -t $TOPIC -m "$payload"
    sleep $SLEEP

    time=$((time + SLEEP))
done

# End the script
echo "End of Transmission"
echo "=================================================================="

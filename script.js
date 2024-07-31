document.getElementById('bmi-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        document.getElementById('result').innerText = 'Please enter valid values for weight and height.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/calculate-bmi', {
            method: 'POST', // Ensure this is POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ weight, height }) // Include the body only for POST requests
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('result').innerText = `Your BMI is: ${data.bmi.toFixed(2)}`;
            if (data.externalData) {
                // Display additional data from external API if needed
                document.getElementById('result').innerText += `\nExternal Data: ${JSON.stringify(data.externalData)}`;
            }
        } else {
            document.getElementById('result').innerText = `Error: ${data.error}`;
        }
    } catch (error) {
        document.getElementById('result').innerText = `An error occurred: ${error.message}`;
    }
});

document.getElementById('btn').addEventListener('click', function() {
    const startLocation = document.getElementById('start').value;
    const endLocation = document.getElementById('end').value;
    const apiKey = 'QvIbNhEFkn4q4X2dBzT1JVi7qu6JW9J6'; 

    if (!startLocation || !endLocation) {
        alert("Please enter both locations.");
        return;
    }

    // 1. Using encodeURIComponent ensures spaces in city names don't break the URL
    const url = `https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${encodeURIComponent(startLocation)}&to=${encodeURIComponent(endLocation)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // 2. MapQuest returns data.info.statuscode 0 if successful. 
            // If it's not 0, something went wrong (like no route found).
            if (data.info.statuscode !== 0) {
                alert("Error: " + data.info.messages[0]);
                return;
            }

            const tbody = document.querySelector('#resultTable tbody');
            const newRow = tbody.insertRow();
            
            newRow.insertCell(0).innerHTML = startLocation;
            newRow.insertCell(1).innerHTML = endLocation;

            // 3. Safety check: ensure route and distance exist before calling .toFixed()
            const distance = data.route.distance ? data.route.distance.toFixed(2) : "0.00";
            const time = data.route.formattedTime || "N/A";

            newRow.insertCell(2).innerHTML = distance;
            newRow.insertCell(3).innerHTML = time;
        })
        .catch(err => {
            alert("Connection error. Check console (F12).");
            console.error(err);
        });
});

// Sample pickup location suggestions
    const sampleSuggestions = [
        { main: 'Use Current Location', type: 'current' },
        { main: 'Mumbai', coords: { lat: 19.076, lng: 72.8777 } },
        { main: 'Pune', coords: { lat: 18.5204, lng: 73.8567 } },
        { main: 'Delhi', coords: { lat: 28.6139, lng: 77.2090 } },
        { main: 'Bangalore', coords: { lat: 12.9716, lng: 77.5946 } },
        { main: 'Chennai', coords: { lat: 13.0827, lng: 80.2707 } },
        { main: 'Hyderabad', coords: { lat: 17.3850, lng: 78.4867 } },
        { main: 'Ahmedabad', coords: { lat: 23.0225, lng: 72.5714 } }
    ];

    const input = document.getElementById("pickupLocation");
    const suggestionsContainer = document.getElementById("pickupSuggestions");

    // Show filtered suggestions
    function showPickupSuggestions(filter = "") {
        suggestionsContainer.innerHTML = '';
        let filtered = sampleSuggestions.filter(s => 
            s.main.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
            suggestionsContainer.innerHTML = `<div class="no-results">No matches found</div>`;
            suggestionsContainer.style.display = 'block';
            return;
        }

        filtered.forEach(suggestion => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            div.innerText = suggestion.main;

            div.onclick = () => selectPickupLocation(suggestion);

            suggestionsContainer.appendChild(div);
        });

        suggestionsContainer.style.display = 'block';
    }

    // Hide suggestions
    function hidePickupSuggestions() {
        suggestionsContainer.style.display = 'none';
    }

    // Select pickup location
    function selectPickupLocation(suggestion) {
        input.value = suggestion.main;

        if (suggestion.type === 'current') {
            getCurrentLocationCoords().then(coords => {
                console.log('📍 Current location:', coords);
                alert("Your current location: " + coords.lat + ", " + coords.lng);
            }).catch(err => console.error(err));
        } else {
            console.log('✅ Selected pickup location:', suggestion.main, suggestion.coords);
        }

        hidePickupSuggestions();
    }

    // Get current GPS location
    function getCurrentLocationCoords() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }),
                    (err) => reject(err),
                    { enableHighAccuracy: true }
                );
            } else {
                reject("Geolocation not supported");
            }
        });
    }

    // Show suggestions when input changes
    input.addEventListener("input", (e) => {
        const val = e.target.value.trim();
        showPickupSuggestions(val);
    });

    // Also show full list on focus if empty
    input.addEventListener("focus", () => {
        if (input.value.trim() === "") {
            showPickupSuggestions();
        }
    });

    // Hide when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".location-input-group")) {
            hidePickupSuggestions();
        }
    });
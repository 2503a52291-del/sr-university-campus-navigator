/* ==========================================================
   SR UNIVERSITY CAMPUS NAVIGATOR
   File: script.js
   ========================================================== */


/* ==========================================================
   1. CAMPUS COORDINATES
   DO NOT CHANGE THESE COORDINATES
   ========================================================== */

const campusPlaces = {
    "Main Entrance": [18.0892295, 79.4673723],
    "Main Block": [18.0892295, 79.4673723],
    "ECE & Civil Block": [18.08888, 79.46878],
    "Block 2": [18.08888, 79.46878],
    "Block 3": [18.0880656, 79.4706738],
    "Temple": [18.0928452, 79.4695447],
    "Parking Area": [18.090796, 79.4690358],
    "Sports & Clubs": [18.0891229, 79.4662792],
    "Boys Hostel": [18.0871284, 79.4685534],
    "Girls Hostel": [18.0870941, 79.4696653],
    "SRIX": [18.0923261, 79.471446],
    "CSE Block 8": [18.0901352, 79.4664309],
    "CSE Block 10": [18.0910837, 79.4664309],
    "CSE Block 11": [18.090533, 79.466903],
    "Central Library": [18.0896077, 79.4688789],
    "Mess": [18.0867825, 79.4673737],
    "Rock Garden": [18.0885144, 79.4675758],
    "Ananthasethu": [18.08957, 79.46627],
    "Circle": [18.08938, 79.46964],
    "Amphi": [18.0888969, 79.468316],
    "Back Gate": [18.0893601, 79.4652561],
    "Canteen": [18.0895507, 79.4680429],
    "Ground": [18.0874853, 79.4712678],
    "School of Agriculture": [18.0913718, 79.4737634],
    "Vepavanam": [18.08804, 79.46911],
    "Store": [18.0886871, 79.4673253],
    "Store 2": [18.0882658, 79.469417],
    "Store 3": [18.0883219, 79.4709941],
    "Gym": [18.088891, 79.4666011]
};


/* ==========================================================
   2. PLACE INFORMATION
   General descriptions are used where exact details
   have not been verified.
   ========================================================== */

const placeInformation = {
    "Main Entrance": {
        category: "Campus Entrance",
        description: "The main entrance to SR University campus."
    },

    "Main Block": {
        category: "Administrative Block",
        description: "The administrative block. Administrative services, including fee payment and examination-related enquiries, are associated with this block."
    },

    "ECE & Civil Block": {
        category: "Academic Block",
        description: "An academic building associated with the ECE and Civil departments."
    },

    "Block 2": {
        category: "Academic Block",
        description: "An academic campus location. Check the campus signage to confirm the department or room you need."
    },

    "Block 3": {
        category: "Academic Block",
        description: "An academic building used for campus learning activities. Confirm the specific room or department on arrival."
    },

    "Temple": {
        category: "Prayer and Spiritual Space",
        description: "A temple located within the campus."
    },

    "Parking Area": {
        category: "Parking",
        description: "A campus parking location. Follow the university's parking instructions."
    },

    "Sports & Clubs": {
        category: "Student Activities",
        description: "A campus location associated with sports and student club activities."
    },

    "Boys Hostel": {
        category: "Student Accommodation",
        description: "The boys' hostel location within the campus."
    },

    "Girls Hostel": {
        category: "Student Accommodation",
        description: "The girls' hostel location within the campus."
    },

    "SRIX": {
        category: "Innovation Centre",
        description: "SRIX is associated with innovation and entrepreneurship activities."
    },

    "CSE Block 8": {
        category: "Academic Block",
        description: "A campus building associated with Computer Science and Engineering."
    },

    "CSE Block 10": {
        category: "Academic Block",
        description: "A campus building associated with Computer Science and Engineering."
    },

    "CSE Block 11": {
        category: "Academic Block",
        description: "A campus building associated with Computer Science and Engineering."
    },

    "Central Library": {
        category: "Library",
        description: "The central library, located in Block 9, for academic reading and study."
    },

    "Mess": {
        category: "Dining",
        description: "A campus dining location."
    },

    "Rock Garden": {
        category: "Outdoor Space",
        description: "An outdoor campus location."
    },

    "Ananthasethu": {
        category: "Campus Landmark",
        description: "A named campus landmark that can help students identify their location."
    },

    "Circle": {
        category: "Campus Landmark",
        description: "A campus landmark that can be used as a reference point while navigating."
    },

    "Amphi": {
        category: "Campus Venue",
        description: "An amphitheatre location on campus."
    },

    "Back Gate": {
        category: "Campus Entrance",
        description: "The back gate of the campus."
    },

    "Canteen": {
        category: "Dining",
        description: "A campus canteen location."
    },

    "Ground": {
        category: "Outdoor Space",
        description: "A campus ground and open-space location."
    },

    "School of Agriculture": {
        category: "Academic School",
        description: "The School of Agriculture location on campus."
    },

    "Vepavanam": {
        category: "Green Space",
        description: "A named green space on campus."
    },

    "Store": {
        category: "Campus Facility",
        description: "A campus store location."
    },

    "Store 2": {
        category: "Campus Facility",
        description: "An additional campus store location."
    },

    "Store 3": {
        category: "Campus Facility",
        description: "An additional campus store location."
    },

    "Gym": {
        category: "Fitness",
        description: "The gym location on campus."
    }
};


/* ==========================================================
   3. MAP INITIALIZATION
   ========================================================== */

let map = null;

const placeMarkers = {};
let activeRouteLayers = [];
let routeChoices = [];

const mapElement = document.getElementById("campusMap");

if (typeof L !== "undefined" && mapElement) {

    map = L.map("campusMap").setView(
        campusPlaces["Main Entrance"],
        17
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 21
        }
    ).addTo(map);

} else {
    console.error(
        "Map initialization failed. Check Leaflet and the campusMap element."
    );
}


/* ==========================================================
   4. ADD MAP MARKERS
   Hover over a marker to see the place name.
   ========================================================== */

function addCampusMarkers() {

    if (!map) return;

    Object.entries(campusPlaces).forEach(([name, coordinates]) => {

        const marker = L.marker(coordinates).addTo(map);

        marker.bindTooltip(name, {
            direction: "top",
            offset: [0, -8]
        });

        marker.bindPopup(`
            <div>
                <strong>${escapeHTML(name)}</strong>
                <br>
                <button
                    type="button"
                    class="choose-place-button"
                    data-place="${escapeHTML(name)}"
                >
                    Select destination
                </button>
            </div>
        `);

        marker.on("popupopen", () => {

            const buttons = document.querySelectorAll(
                ".choose-place-button"
            );

            buttons.forEach(button => {

                if (button.dataset.place === name) {

                    button.onclick = () => {
                        selectDestination(name);
                        marker.closePopup();
                    };
                }
            });
        });

        placeMarkers[name] = marker;
    });

    map.fitBounds(
        L.latLngBounds(Object.values(campusPlaces)).pad(0.15)
    );
}

addCampusMarkers();


/* ==========================================================
   5. WALKING NETWORK
   Existing approximate junction coordinates preserved.
   ========================================================== */

const walkingNodes = {

    "Main Entrance": {
        coordinates: campusPlaces["Main Entrance"],
        type: "place"
    },

    "Entrance Temple Junction": {
        coordinates: [18.0910, 79.4682],
        type: "junction"
    },

    "Temple": {
        coordinates: campusPlaces["Temple"],
        type: "place"
    },

    "Temple Parking Junction": {
        coordinates: [18.0915, 79.4691],
        type: "junction"
    },

    "Parking Area": {
        coordinates: campusPlaces["Parking Area"],
        type: "place"
    },

    "Parking Straight Junction": {
        coordinates: [18.0902, 79.4690],
        type: "junction"
    },

    "Library Junction": {
        coordinates: [18.0898, 79.4689],
        type: "junction"
    },

    "Central Library": {
        coordinates: campusPlaces["Central Library"],
        type: "place"
    },

    "Canteen Junction": {
        coordinates: [18.0897, 79.4682],
        type: "junction"
    },

    "Canteen": {
        coordinates: campusPlaces["Canteen"],
        type: "place"
    },

    "Block 2 Junction": {
        coordinates: [18.0890, 79.4685],
        type: "junction"
    },

    "Block 2": {
        coordinates: campusPlaces["Block 2"],
        type: "place"
    },

    "ECE & Civil Block": {
        coordinates: campusPlaces["ECE & Civil Block"],
        type: "place"
    },

    "Amphi": {
        coordinates: campusPlaces["Amphi"],
        type: "place"
    },

    "Main Block Junction": {
        coordinates: [18.0894, 79.4678],
        type: "junction"
    },

    "Main Block": {
        coordinates: campusPlaces["Main Block"],
        type: "place"
    },

    "Rock Garden": {
        coordinates: campusPlaces["Rock Garden"],
        type: "place"
    },

    "Rock Garden Junction": {
        coordinates: [18.0887, 79.4674],
        type: "junction"
    },

    "Store": {
        coordinates: campusPlaces["Store"],
        type: "place"
    },

    "Sports & Clubs": {
        coordinates: campusPlaces["Sports & Clubs"],
        type: "place"
    },

    "Gym": {
        coordinates: campusPlaces["Gym"],
        type: "place"
    },

    "Ananthasethu": {
        coordinates: campusPlaces["Ananthasethu"],
        type: "place"
    },

    "CSE Path Junction": {
        coordinates: [18.0900, 79.4665],
        type: "junction"
    },

    "CSE Block 8": {
        coordinates: campusPlaces["CSE Block 8"],
        type: "place"
    },

    "CSE Block 11": {
        coordinates: campusPlaces["CSE Block 11"],
        type: "place"
    },

    "CSE Block 10": {
        coordinates: campusPlaces["CSE Block 10"],
        type: "place"
    },

    "Back Gate": {
        coordinates: campusPlaces["Back Gate"],
        type: "place"
    },

    "Circle": {
        coordinates: campusPlaces["Circle"],
        type: "place"
    },

    "Circle Block 2 Junction": {
        coordinates: [18.0891, 79.4694],
        type: "junction"
    },

    "Circle Straight Junction": {
        coordinates: [18.0887, 79.4700],
        type: "junction"
    },

    "Block 3": {
        coordinates: campusPlaces["Block 3"],
        type: "place"
    },

    "Store 3": {
        coordinates: campusPlaces["Store 3"],
        type: "place"
    },

    "Ground": {
        coordinates: campusPlaces["Ground"],
        type: "place"
    },

    "Store 2": {
        coordinates: campusPlaces["Store 2"],
        type: "place"
    },

    "Vepavanam": {
        coordinates: campusPlaces["Vepavanam"],
        type: "place"
    },

    "Mess Junction": {
        coordinates: [18.0875, 79.4680],
        type: "junction"
    },

    "Mess": {
        coordinates: campusPlaces["Mess"],
        type: "place"
    },

    "Hostel Junction": {
        coordinates: [18.0873, 79.4690],
        type: "junction"
    },

    "Boys Hostel": {
        coordinates: campusPlaces["Boys Hostel"],
        type: "place"
    },

    "Girls Hostel": {
        coordinates: campusPlaces["Girls Hostel"],
        type: "place"
    },

    "SRIX": {
        coordinates: campusPlaces["SRIX"],
        type: "place"
    },

    "School of Agriculture": {
        coordinates: campusPlaces["School of Agriculture"],
        type: "place"
    }
};


/* ==========================================================
   6. WALKING CONNECTIONS
   ========================================================== */

const walkingConnections = [

    ["Main Entrance", "Entrance Temple Junction"],
    ["Entrance Temple Junction", "Temple"],
    ["Temple", "Temple Parking Junction"],
    ["Temple Parking Junction", "Parking Area"],

    ["Parking Area", "Parking Straight Junction"],
    ["Parking Straight Junction", "Library Junction"],
    ["Library Junction", "Central Library"],
    ["Library Junction", "Canteen Junction"],
    ["Canteen Junction", "Canteen"],

    ["Library Junction", "Block 2 Junction"],
    ["Block 2 Junction", "Block 2"],
    ["Block 2", "ECE & Civil Block"],
    ["Block 2 Junction", "Amphi"],
    ["Block 2 Junction", "Main Block Junction"],
    ["Main Block Junction", "Main Block"],

    ["Main Block Junction", "Rock Garden"],
    ["Rock Garden", "Rock Garden Junction"],
    ["Rock Garden Junction", "Store"],
    ["Store", "Sports & Clubs"],
    ["Sports & Clubs", "Gym"],

    ["Rock Garden Junction", "Mess Junction"],
    ["Mess Junction", "Mess"],
    ["Mess Junction", "Hostel Junction"],
    ["Hostel Junction", "Boys Hostel"],
    ["Hostel Junction", "Girls Hostel"],

    ["Main Block Junction", "Ananthasethu"],
    ["Ananthasethu", "CSE Path Junction"],
    ["CSE Path Junction", "CSE Block 8"],
    ["CSE Block 8", "CSE Block 11"],
    ["CSE Block 11", "CSE Block 10"],
    ["Ananthasethu", "Back Gate"],

    ["Parking Area", "Circle"],
    ["Circle", "Circle Straight Junction"],
    ["Circle Straight Junction", "Block 3"],
    ["Circle Straight Junction", "Store 3"],
    ["Block 3", "Store 3"],
    ["Store 3", "Ground"],

    ["Circle", "Circle Block 2 Junction"],
    ["Circle Block 2 Junction", "Block 2"],

    ["Circle Block 2 Junction", "Store 2"],
    ["Store 2", "Vepavanam"],
    ["Vepavanam", "Mess Junction"],

    ["Temple", "SRIX"],
    ["SRIX", "School of Agriculture"]
];


/* ==========================================================
   7. BUILD WALKING GRAPH
   ========================================================== */

const campusGraph = {};

Object.keys(walkingNodes).forEach(node => {
    campusGraph[node] = [];
});

walkingConnections.forEach(([a, b]) => {

    if (!campusGraph[a] || !campusGraph[b]) {
        console.warn("Unknown walking node:", a, b);
        return;
    }

    campusGraph[a].push(b);
    campusGraph[b].push(a);
});


/* ==========================================================
   8. CONNECT CAMPUS PLACES TO WALKING NETWORK
   ========================================================== */

const placeToNetworkNode = {};

Object.keys(campusPlaces).forEach(place => {
    if (walkingNodes[place]) {
        placeToNetworkNode[place] = place;
    }
});


/* ==========================================================
   9. FIND MULTIPLE ROUTES
   ========================================================== */

function findAllRoutes(startPlace, destinationPlace, maxRoutes = 8) {

    const start = placeToNetworkNode[startPlace];
    const destination = placeToNetworkNode[destinationPlace];

    if (
        !start ||
        !destination ||
        !campusGraph[start] ||
        !campusGraph[destination]
    ) {
        return [];
    }

    if (start === destination) {
        return [[start]];
    }

    const routes = [];
    const visited = new Set();

    function search(current, path) {

        if (routes.length >= maxRoutes) return;

        if (current === destination) {
            routes.push([...path]);
            return;
        }

        visited.add(current);

        const neighbours = [...campusGraph[current]].sort(
            (a, b) => campusGraph[a].length - campusGraph[b].length
        );

        for (const next of neighbours) {

            if (visited.has(next)) continue;

            path.push(next);
            search(next, path);
            path.pop();

            if (routes.length >= maxRoutes) break;
        }

        visited.delete(current);
    }

    search(start, [start]);

    routes.sort((a, b) => a.length - b.length);

    return routes;
}


/* ==========================================================
   10. DISTANCE CALCULATION
   ========================================================== */

function distanceBetween(a, b) {

    const R = 6371000;

    const lat1 = a[0] * Math.PI / 180;
    const lat2 = b[0] * Math.PI / 180;

    const dLat = (b[0] - a[0]) * Math.PI / 180;
    const dLon = (b[1] - a[1]) * Math.PI / 180;

    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(
        Math.sqrt(h),
        Math.sqrt(1 - h)
    );
}


function calculateRouteDistance(route) {

    let total = 0;

    for (let i = 0; i < route.length - 1; i++) {

        const a = walkingNodes[route[i]].coordinates;
        const b = walkingNodes[route[i + 1]].coordinates;

        total += distanceBetween(a, b);
    }

    return total;
}


/* ==========================================================
   11. WALKING INSTRUCTIONS
   ========================================================== */

function getCompassDirection(a, b) {

    const dy = b[0] - a[0];
    const dx = b[1] - a[1];

    const angle =
        (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;

    if (angle >= 315 || angle < 45) return "north";
    if (angle < 135) return "east";
    if (angle < 225) return "south";

    return "west";
}


function generateWalkingInstructions(route) {

    const instructions = [];

    if (!route.length) return instructions;

    instructions.push(`Start at ${route[0]}.`);

    for (let i = 1; i < route.length; i++) {

        const previous = route[i - 1];
        const current = route[i];

        if (i === route.length - 1) {
            instructions.push(`Continue to reach ${current}.`);
            continue;
        }

        const a = walkingNodes[previous].coordinates;
        const b = walkingNodes[current].coordinates;

        const distance = Math.round(distanceBetween(a, b));
        const direction = getCompassDirection(a, b);

        if (walkingNodes[current].type === "junction") {

            instructions.push(
                `Continue approximately ${distance} m toward the ${direction} to the next junction.`
            );

        } else {

            instructions.push(
                `Continue toward ${current}, approximately ${distance} m away.`
            );
        }
    }

    return instructions;
}


/* ==========================================================
   12. ROUTE LAYER MANAGEMENT
   ========================================================== */

function clearRouteLayers() {

    if (!map) return;

    activeRouteLayers.forEach(layer => map.removeLayer(layer));

    activeRouteLayers = [];
}


/* ==========================================================
   13. SHOW ROUTE DETAILS
   ========================================================== */

function showRouteDetails(route, index) {

    const summary = document.getElementById("routeSummary");
    const directions = document.getElementById("directionDetails");
    const status = document.getElementById("routeStatus");

    const distance = calculateRouteDistance(route);

    // Estimated walking speed: 4 km/h.
    // Actual walking distance may differ from this model.
    const minutes = Math.max(
        1,
        Math.ceil(distance / 1000 / 4 * 60)
    );

    if (summary) {

        summary.innerHTML = `
            <h3>Selected Route ${index + 1}</h3>

            <p><strong>From:</strong> ${escapeHTML(route[0])}</p>

            <p><strong>To:</strong>
                ${escapeHTML(route[route.length - 1])}
            </p>

            <p><strong>Estimated distance:</strong>
                ${Math.round(distance)} metres
            </p>

            <p><strong>Estimated walking time:</strong>
                ${minutes} minutes
            </p>

            <p class="route-note">
                Distance and walking time are estimates.
                Actual campus footpaths may differ.
            </p>
        `;
    }

    if (directions) {

        const steps = generateWalkingInstructions(route);

        directions.innerHTML = `
            <h3>Walking Directions</h3>

            <ol>
                ${steps.map(step => `
                    <li>${escapeHTML(step)}</li>
                `).join("")}
            </ol>
        `;
    }

    if (status) {
        status.textContent = `Route ${index + 1} selected.`;
    }
}


/* ==========================================================
   14. DRAW SELECTED ROUTE
   ========================================================== */

function displaySelectedRoute(index) {

    if (!map || !routeChoices[index]) return;

    clearRouteLayers();

    const route = routeChoices[index];

    const coordinates = route.map(node => {
        return walkingNodes[node].coordinates;
    });

    const selectedLine = L.polyline(coordinates, {
        color: "#e34b4b",
        weight: 6,
        opacity: 0.9
    }).addTo(map);

    activeRouteLayers.push(selectedLine);

    route.forEach(nodeName => {

        const node = walkingNodes[nodeName];

        if (node.type !== "junction") return;

        const junction = L.circleMarker(node.coordinates, {
            radius: 5,
            color: "#ffffff",
            weight: 2,
            fillColor: "#176b4a",
            fillOpacity: 1
        }).addTo(map);

        junction.bindTooltip("Walking-path junction");

        activeRouteLayers.push(junction);
    });

    map.fitBounds(selectedLine.getBounds().pad(0.2));

    showRouteDetails(route, index);
}


/* ==========================================================
   15. DISPLAY AVAILABLE ROUTES
   ========================================================== */

function showRouteChoices(routes) {

    const summary = document.getElementById("routeSummary");

    if (!summary) return;

    if (!routes.length) {

        summary.innerHTML = `
            <p>No route was found between these places.</p>
            <p>
                The walking network may need an additional connection.
            </p>
        `;

        return;
    }

    summary.innerHTML = `
        <h3>Available Routes</h3>
        <p>Choose the route you prefer.</p>

        <div class="route-options">

            ${routes.map((route, index) => {

                const distance = calculateRouteDistance(route);

                const minutes = Math.max(
                    1,
                    Math.ceil(distance / 1000 / 4 * 60)
                );

                return `
                    <button
                        type="button"
                        class="route-option-button ${index === 0 ? "selected" : ""}"
                        data-route-index="${index}"
                    >
                        <strong>Route ${index + 1}</strong>
                        <br>
                        <span>Approximately ${Math.round(distance)} m</span>
                        <br>
                        <span>Approximately ${minutes} min walking</span>
                    </button>
                `;
            }).join("")}

        </div>
    `;

    summary.querySelectorAll(".route-option-button").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.routeIndex);

            displaySelectedRoute(index);

            summary.querySelectorAll(".route-option-button").forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");
        });
    });
}


/* ==========================================================
   16. FIND ROUTES
   ========================================================== */

function findRoute() {

    const startSelect = document.getElementById("routeStart");
    const destinationSelect = document.getElementById("routeDestination");

    const status = document.getElementById("routeStatus");
    const directions = document.getElementById("directionDetails");
    const summary = document.getElementById("routeSummary");

    if (!startSelect || !destinationSelect) return;

    const start = startSelect.value;
    const destination = destinationSelect.value;

    clearRouteLayers();

    routeChoices = [];

    if (summary) summary.innerHTML = "";
    if (directions) directions.innerHTML = "";

    if (!start || !destination) {

        status.textContent =
            "Please select both your starting location and destination.";

        return;
    }

    if (start === destination) {

        status.textContent =
            "Your starting location and destination are the same.";

        return;
    }

    routeChoices = findAllRoutes(start, destination, 8);

    if (!routeChoices.length) {

        status.textContent =
            "No connected route found. Check the walking-network connections.";

        showRouteChoices([]);

        return;
    }

    status.textContent =
        `Found ${routeChoices.length} route option(s).`;

    showRouteChoices(routeChoices);

    displaySelectedRoute(0);
}


/* ==========================================================
   17. SWAP LOCATIONS
   ========================================================== */

function swapRoute() {

    const startSelect = document.getElementById("routeStart");
    const destinationSelect = document.getElementById("routeDestination");

    if (!startSelect || !destinationSelect) return;

    const previousStart = startSelect.value;

    startSelect.value = destinationSelect.value;
    destinationSelect.value = previousStart;

    findRoute();
}


/* ==========================================================
   18. CLEAR ROUTE
   ========================================================== */

function clearRoute() {

    clearRouteLayers();

    routeChoices = [];

    const status = document.getElementById("routeStatus");
    const summary = document.getElementById("routeSummary");
    const directions = document.getElementById("directionDetails");

    if (status) {
        status.textContent =
            "Choose your starting location and destination.";
    }

    if (summary) summary.innerHTML = "";
    if (directions) directions.innerHTML = "";
}


/* ==========================================================
   19. POPULATE ROUTE DROPDOWNS
   ========================================================== */

function populateRouteDropdowns() {

    const startSelect = document.getElementById("routeStart");
    const destinationSelect = document.getElementById("routeDestination");

    if (!startSelect || !destinationSelect) return;

    Object.keys(campusPlaces).forEach(place => {

        startSelect.add(new Option(place, place));
        destinationSelect.add(new Option(place, place));
    });
}

populateRouteDropdowns();


/* ==========================================================
   20. SELECT DESTINATION
   Preserves the current starting location.
   ========================================================== */

function selectDestination(place) {

    const destinationSelect = document.getElementById("routeDestination");
    const searchResult = document.getElementById("searchResult");

    if (!campusPlaces[place]) return;

    if (destinationSelect) {
        destinationSelect.value = place;
    }

    if (searchResult) {
        searchResult.textContent = `${place} selected as destination.`;
    }
}


/* ==========================================================
   21. VIEW A PLACE ON THE MAP
   Reuses the existing marker.
   Does not create a duplicate marker.
   ========================================================== */

function viewPlaceOnMap(place) {

    if (!map || !placeMarkers[place]) {
        return;
    }

    const details = document.getElementById("placeDetails");

    map.setView(campusPlaces[place], 19);

    placeMarkers[place].openPopup();

    document.getElementById("mapSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    if (details) {
        details.hidden = false;
    }

    // Leaflet sometimes needs a resize refresh after scrolling.
    setTimeout(() => {
        map.invalidateSize();
        map.setView(campusPlaces[place], 19);
    }, 250);
}


/* ==========================================================
   22. GET DIRECTIONS FROM A PLACE CARD
   ========================================================== */

function getDirectionsToPlace(place) {

    const destinationSelect = document.getElementById("routeDestination");
    const startSelect = document.getElementById("routeStart");

    if (!destinationSelect || !startSelect) return;

    destinationSelect.value = place;

    document.getElementById("directionsSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    if (!startSelect.value) {

        const status = document.getElementById("routeStatus");

        if (status) {
            status.textContent =
                `Destination set to ${place}. Select your starting location and click Find Routes.`;
        }

        return;
    }

    if (startSelect.value === place) {

        const status = document.getElementById("routeStatus");

        if (status) {
            status.textContent =
                "Choose a different starting location from your destination.";
        }

        return;
    }

    findRoute();
}


/* ==========================================================
   23. SHOW PLACE DETAILS
   ========================================================== */

function showPlaceDetails(place) {

    const detailsPanel = document.getElementById("placeDetails");

    if (!detailsPanel || !campusPlaces[place]) return;

    const info = placeInformation[place] || {
        category: "Campus Location",
        description: "A location within the SR University campus."
    };

    detailsPanel.innerHTML = `
        <h3>${escapeHTML(place)}</h3>

        <p>
            <span class="place-detail-label">Category:</span>
            ${escapeHTML(info.category)}
        </p>

        <p>${escapeHTML(info.description)}</p>

        <div class="place-detail-actions">

            <button
                type="button"
                id="viewPlaceOnMapButton"
                class="primary-button"
            >
                📍 View on Map
            </button>

            <button
                type="button"
                id="getDirectionsButton"
                class="secondary-button"
            >
                🧭 Get Directions
            </button>

        </div>
    `;

    detailsPanel.hidden = false;

    document.getElementById("viewPlaceOnMapButton")
        .addEventListener("click", () => {
            viewPlaceOnMap(place);
        });

    document.getElementById("getDirectionsButton")
        .addEventListener("click", () => {
            getDirectionsToPlace(place);
        });
}


/* ==========================================================
   24. PLACE CARD CLICK EVENTS
   No hover behaviour is added to place cards.
   ========================================================== */

document.querySelectorAll(".place-card").forEach(card => {

    card.addEventListener("click", () => {

        const place = card.dataset.place;

        if (!campusPlaces[place]) return;

        showPlaceDetails(place);

        selectDestination(place);

        document.getElementById("placeDetails").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});


/* ==========================================================
   25. CAMPUS SEARCH
   ========================================================== */

function searchCampusPlace(query) {

    const searchResult = document.getElementById("searchResult");

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {

        searchResult.textContent =
            "Please enter a campus place name.";

        return;
    }

    const placeNames = Object.keys(campusPlaces);

    const match = placeNames.find(place => {
        return place.toLowerCase() === normalizedQuery;
    }) || placeNames.find(place => {
        return place.toLowerCase().includes(normalizedQuery);
    });

    if (!match) {

        searchResult.textContent =
            "No matching campus place found. Try another name.";

        return;
    }

    searchResult.textContent = `Found: ${match}`;

    showPlaceDetails(match);

    selectDestination(match);

    document.getElementById("placeDetails").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

const searchForm = document.getElementById("searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", event => {

        event.preventDefault();

        const query = document.getElementById("placeInput").value;

        searchCampusPlace(query);
    });
}


/* ==========================================================
   26. MOBILE NAVIGATION
   ========================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* ==========================================================
   27. HTML ESCAPING HELPER
   ========================================================== */

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}


/* ==========================================================
   28. CONNECT ROUTE BUTTONS
   ========================================================== */

const findRouteButton = document.getElementById("findRouteButton");
const swapRouteButton = document.getElementById("swapRouteButton");
const clearRouteButton = document.getElementById("clearRouteButton");

if (findRouteButton) {
    findRouteButton.addEventListener("click", findRoute);
}

if (swapRouteButton) {
    swapRouteButton.addEventListener("click", swapRoute);
}

if (clearRouteButton) {
    clearRouteButton.addEventListener("click", clearRoute);
}


/* ==========================================================
   29. INITIAL STATUS
   ========================================================== */

const routeStatus = document.getElementById("routeStatus");

if (routeStatus) {
    routeStatus.textContent =
        "Select a starting location and destination to find walking routes.";
}
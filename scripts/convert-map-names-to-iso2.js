const { countryToAlpha2 } = require("country-to-iso");
const map = require("../public/js/map.json");
const fs = require("fs");

for (let i = 0; i < map.features.length; i++) {
    const features = map.features[i];
    const name = features.properties.name;
    const iso2 = countryToAlpha2(name);

    if (iso2) {
        features.properties.name = iso2;
    }
}

fs.writeFileSync("../public/js/map.json", JSON.stringify(map));
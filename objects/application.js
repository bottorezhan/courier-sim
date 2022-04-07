import { v4 as uuidv4 } from "uuid";

class Application {
    constructor(lat, lng) {
        this.id = uuidv4();
        this.lat = lat;
        this.lng = lng;
        console.log(`id: ${this.id} | coord: ${JSON.stringify(this.coordinate)}`);
        return this.id;
    }

    get coordinate() {
        return {
            lat: this.lat,
            lng: this.lng,
        };
    }
}

export { Application };

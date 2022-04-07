import haversine from "haversine-distance";

class Courier {
    constructor(name, speed, startLocations) {
        this.name = name;
        this.speed = ((speed || 40) * 1000) / 3600; // km/h -> m/s
        this.listOfApplications = [];

        this.curLocation = startLocations;
        this.curApplicationId = "start"; // application courier moving to or waiting on

        this.lastUpdate = Date.now();
    }

    addApplication(application) {
        this.listOfApplications.push(application);
    }

    // delApplication(applicationId) {
    //     let removed = _.remove(listOfApplications, function(application) {
    //         return application.id == applicationId;
    //     });

    //     console.log(removed);
    // }

    // TODO: solve problem with deltTime chaning while running

    update() {
        let deltTime = (Date.now() - this.lastUpdate) / 1000; // sec

        while ((Date.now() - this.lastUpdate) > 1 && this.listOfApplications.length > 0) {
            let curApp = this.listOfApplications[0];
            let curCoord = curApp.coordinate;
            this.curApplicationId = curApp.id;

            let duration = haversine(this.curLocation, curCoord) / this.speed; // sec
            console.log(duration);

            if ((Date.now() - this.lastUpdate) / 1000 >= duration) {
                this.lastUpdate += duration * 1000;
                this.curLocation = curCoord;
                this.listOfApplications = this.listOfApplications.splice(1);
                console.log(`finished: ${curApp.id}`);
            } else {
                let part = (Date.now() - this.lastUpdate) / 1000 / duration;
                this.curLocation = {
                    lat:
                        this.curLocation.lat +
                        (curCoord.lat - this.curLocation.lat) * part,
                    lng:
                        this.curLocation.lng +
                        (curCoord.lng - this.curLocation.lng) * part,
                };
                break;
            }
        }

        this.lastUpdate = Date.now();
    }

    curData() {
        this.update();
        return {
            curApplicationId: this.curApplicationId,
            curLocation: this.curLocation,
        };
    }
}

export { Courier };

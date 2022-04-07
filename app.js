import { Application } from "./objects/application.js";
import { Courier } from "./objects/courier.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// TESTING
async function main() {
    let A = new Application(43.227549, 76.891159);
    let B = new Application(43.25091, 76.93581);

    let courier = new Courier("Torezhan", 400, A.coordinate);

    courier.addApplication(A);
    courier.addApplication(B);

    console.log(courier.curData());
    
    while(true) {
        await sleep(10000);
        console.log(courier.curData());
    }
}

main();
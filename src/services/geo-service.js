import Geocode from "react-geocode";
import { computeDistanceBetween } from 'spherical-geometry-js';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);


/** returns Promise [x,y] */
function getCoordinates(address) {
    return Geocode.fromAddress(address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(address, [lat, lng]);
            return [lat, lng];
        }
    );
}


/* returns Promise, will return new object from item with "distance" property added */
function enrichWithCoordinats(item) {
    const { country, address } = item;
    const fullAddress = `${country}, ${address}`;
    return getCoordinates(fullAddress).then(coordinates => {
        return { ...item, coordinates };
    });
}

/** returns Promise with enriched list, every item with distance from theAddress */
export function enrichList(missions, theAddress) {
    const promises = [getCoordinates(theAddress)];
    promises.push(...missions.map(enrichWithCoordinats));

    return Promise.all(promises).then(results => {
        const theCoordinates = results[0];
        let minObj = { distance: Number.MAX_VALUE }, maxObj = { distance: Number.MIN_VALUE };

        const newList = [];
        for (let i = 1; i < results.length; i++) {
            const newItem = { ...results[i], distance: computeDistanceBetween(theCoordinates, results[i].coordinates) };
            newList.push(newItem);

            if (minObj.distance > newItem.distance) {
                delete minObj.closest;
                minObj = newItem;
                minObj.closest = true;
            }

            if (maxObj.distance < newItem.distance) {
                delete maxObj.farthest;
                maxObj = newItem;
                maxObj.farthest = true;
            }

        }

        return newList;
    });
}



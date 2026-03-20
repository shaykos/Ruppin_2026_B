
import TempSensor from './tempSensor.js';

let sensor_north_west = new TempSensor();

// on --> מקשיב לכל האירועים שנשלחים
sensor_north_west.on('reading', (payload) => {
    console.log(`Temp: ${payload}C`);
});

// once --> מקשיב פעם אחת לאירוע ומפסיק להאזין לו
sensor_north_west.once('alert', (payload) => {
    console.error(`${payload}`);
    //open the window / AC
});

sensor_north_west.on('reading', (payload) => {
    console.log(`KUKU: ${payload}C`);
});

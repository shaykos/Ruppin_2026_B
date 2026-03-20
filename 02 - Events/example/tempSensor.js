import { EventEmitter } from 'events';

export default class TempSensor extends EventEmitter {

    interval;

    constructor() {
        super();
        this.setMaxListeners(2);
        this.interval = setInterval(() => this.dummyData(), 1000);
    }

    dummyData() {
        let temp = Math.random() * 50;
        this.emit('reading', Number(temp).toFixed(3));
        if (temp > 45) {
            this.emit('alert', 'Overheating!');
            clearInterval(this.interval);
        }
    }
}
class Meditation {
    constructor(duration) {
        this.duration = duration;
    }

    async start() {
        for (let i = this.duration; i > 0; i--) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(i);
        }
        console.log("Jay Guru Dev");
    }
}

const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);

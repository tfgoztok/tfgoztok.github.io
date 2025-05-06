const isPrime = (n) => {
    return new Promise((resolve, reject) => {
        for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
            if (n % i === 0) {
                reject({ prime: false });
                return;
            }
        }
        resolve({ prime: n > 1 });
    });
};


console.log('start');
isPrime(7)
    .then(console.log)
    .catch(console.error);
console.log('end');

async function testIsPrime() {
    console.log('start');
    try {
        const result = await isPrime(7);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    console.log('end');
}

testIsPrime(); 
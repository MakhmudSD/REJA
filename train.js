console.log("Jack Ma's advice");
const list = [
    "Be a good learner", // 0-20 
    "Study in MIT", // 20-30
    "Choose a great leader and make many mistakes", // 30-40
    "Do your own business", // 40-50
    "Invest in young generation", // 50-60
    "Live in peace with your loved ones", // 60+
]

// Callback Define
function giveAdvice(a, callback) {
    if(typeof a !== "number") callback("Insert a number", null)
    else if(a <= 20) callback(null, list[0]);
    else if(a < 20 && a <= 30) callback(null, list[1]);
    else if(a < 30 && a <= 40) callback(null, list[2]);
    else if(a < 40 && a <= 50) callback(null, list[3]);
    else if(a < 50 && a <= 60) callback(null, list[4]);
    else {
        setTimeout(function() {
            callback(null, list[5]);
        }, 5000);
    };
}


// Callback Call
console.log("Security Check Passed")
giveAdvice(69, (err, data) => {
    if(err) console.log("ERROR", err);
    console.log("The Advice is:", data);
});
console.log("Security Check Passed 2")
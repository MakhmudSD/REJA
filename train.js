// A-Task

const countLetter = function(word, currentLetter) { 
  let count = 0;
  for(let i = 0; i < word.length; i++) {
    if(word[i] == currentLetter) {
      count++
    }
  }
    return count
};
  console.log(countLetter("apple", "p"));

// Console.log("==========================================================")

console.log("Jack Ma's advice");
const list = [
    "Be a good learner", // 0-20 
    "Study in MIT", // 20-30
    "Choose a great leader and make many mistakes", // 30-40
    "Do your own business", // 40-50
    "Invest in young generation", // 50-60
    "Live in peace with your loved ones", // 60+
];

// Callback Define
function giveAdvice(a, callback) {
    if(typeof a !== "number") callback("Insert a number", null)
    else if(a <= 20) callback(null, list[0]);
    else if(a < 20 && a <= 30) callback(null, list[1]);
    else if(a < 30 && a <= 40) callback(null, list[2]);
    else if(a < 40 && a <= 50) callback(null, list[3]);
    else if(a < 50 && a <= 60) callback(null, list[4]);
    else {
        setInterval(function() {
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

// Console.log("==========================================================")
// Asynchronous Function
async function giveAdvice(a) {
    if(typeof a !== "number") throw new Error("Insert a number")
    else if(a <= 20) return list[0];
    else if(a < 20 && a <= 30) return list[1];
    else if(a < 30 && a <= 40) return list[2];
    else if(a < 40 && a <= 50) return list[3];
    else if(a < 50 && a <= 60) return list[4];
    else {
        return new Promise ((resolve, reject) => { // Promise functions are used in mostly map arrays
            setTimeout(() => {
            resolve(list[5]);
            }, 5000);
        });
    };
};
// Console.log("==========================================================")


// // Callback Call via then/catch
console.log("Security Check Passed")
giveAdvice(10)
    .then((data) => {
        console.log("The Advice is:", data);
    })
    .catch((err) => {
        console.log("Oops:", err);
    });
console.log("Security Check Passed 2");

// Console.log("==========================================================")
// call via async/await
async function run() { // Mostly used in putting things in order
    let data = await giveAdvice(65);
    console.log("The advice is:", data);
    data = await giveAdvice(23);
    console.log("The advice is:", data);
    data = await giveAdvice(45);
    console.log("The advice is:", data);
};

run();
// Console.log("==========================================================")

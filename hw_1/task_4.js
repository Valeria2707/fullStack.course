const array = Array(10).fill(42);

console.log("Task 4.1");
array.splice(4, 0, "answer");
console.log(array);

console.log("Task 4.2");
const foundWord = array.find((item) => item === "answer");
console.log(foundWord);

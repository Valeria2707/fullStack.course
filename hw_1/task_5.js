const myObject = {
  name: "Lera",
  age: "20",
  pets: ["dog", "cat"],
};

console.log("Task 5.1");
const myObjKeys = Object.keys(myObject);
console.log(myObjKeys);

console.log("Task 5.2");
const hasOwnMyObjName = myObject.hasOwnProperty("name");
const hasOwnMyObjSth = myObject.hasOwnProperty("sth");
console.log(hasOwnMyObjName, hasOwnMyObjSth);

console.log("Task 5.3");
const myObjValues = Object.values(myObject);
console.log(myObjValues);

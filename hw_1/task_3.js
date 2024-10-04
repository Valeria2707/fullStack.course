const objects_array = [
  {
    name: "Lili",
    age: 24,
    pets: ["dog", "cat"],
  },
  {
    name: "Lera",
    age: 20,
    pets: ["dog", "cat", "rabbit"],
  },
  {
    name: "Viky",
    age: 17,
    pets: ["dog", "cat"],
  },
  {
    name: "Zhenya",
    age: 19,
    pets: ["dog"],
  },
];

console.log("Task 3.1");

const peopleOlderThanTwenty = objects_array.filter((person) => person.age > 20);
console.log(peopleOlderThanTwenty);

console.log("Task 3.2");
const peopleWithNewPet = objects_array.map((person) => ({
  ...person,
  pets: [...person.pets, "mouse"],
}));
console.log(peopleWithNewPet);

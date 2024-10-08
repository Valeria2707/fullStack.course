const primitive_array = [
  1,
  "hello",
  true,
  null,
  "I am Lera",
  27,
  3.5,
  false,
  "who",
  undefined,
];

const arrayLength = primitive_array.length;

console.log("Task 2.1");
primitive_array.forEach((el) => console.log(typeof el));

console.log("Task 2.2");
for (let i = 0; i < arrayLength; i++) {
  console.log(typeof primitive_array[i]);
}

console.log("Task 2.3");
let j = 0;
while (j < arrayLength) {
  console.log(typeof primitive_array[j]);
  j++;
}

console.log("Task 2.4");
let x = 0;
do {
  console.log(typeof primitive_array[x]);
  x++;
} while (x < arrayLength);

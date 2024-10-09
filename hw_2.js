console.log("Task 1");

function addParamsToRequest(params) {
  let count = 0;

  return function (data) {
    return {
      ...params,
      data,
      count: ++count,
    };
  };
}

const sendData = addParamsToRequest({ "access-token": "qwerty" });

const result1 = sendData({ someData1: "some data 1" });

console.log(result1);

const result2 = sendData({ someData2: "some data 2" });

console.log(result2);

console.log("------------------------------");

console.log("Task 2");

const obj = {
  getData: function () {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  },
};

obj.getData.call({ name: "Masha", age: 30 });

const getUserData = obj.getData.bind({ name: "Liza", age: 25 });

getUserData();

console.log("------------------------------");

console.log("Task 3");

const root = {
  name: "name",
  type: "folder",
  children: [
    {
      name: "folder 1",
      type: "folder",
      children: [
        {
          name: "folder 2",
          type: "folder",
          children: [
            {
              name: "file 3",
              type: "file",
              size: 30,
            },
          ],
        },
      ],
    },
    {
      name: "file 1",
      type: "file",
      size: 10,
    },
    {
      name: "file 2",
      type: "file",
      size: 20,
    },
  ],
};

function findFilesRecursively(obj) {
  let fileNames = [];

  if (obj.type === "file") {
    fileNames.push(obj.name);
  } else {
    obj.children.forEach(
      (child) => (fileNames = fileNames.concat(findFilesRecursively(child)))
    );
  }

  return fileNames;
}

const result = findFilesRecursively(root);
console.log(result);

console.log("------------------------------");

console.log("Task 4 use class");

class Person {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  introduce() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
  }
}

class Student extends Person {
  constructor(name, phone, course) {
    super(name, phone);
    this.course = course;
  }

  study() {
    console.log(`Я навчаюся на ${this.course} курсі.`);
  }
}

class Teacher extends Person {
  constructor(name, phone, subject) {
    super(name, phone);
    this.subject = subject;
  }

  teach() {
    console.log(`Я викладаю ${this.subject}.`);
  }
}

const student1 = new Student("Катя", "02238784234", 4);
student1.introduce();
student1.study();

const teacher1 = new Teacher("Микола", "03287428742", "математику");
teacher1.introduce();
teacher1.teach();

console.log("------------------------------");

console.log("Task 4 use prototype");

function Person2(name, phone) {
  this.name = name;
  this.phone = phone;
}

Person2.prototype.introduce = function () {
  console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
};

function Student2(name, phone, course) {
  Person2.call(this, name, phone);
  this.course = course;
}

Student2.prototype = Object.create(Person2.prototype);
Student2.prototype.constructor = Student2;

Student2.prototype.study = function () {
  console.log(`Я навчаюся на ${this.course} курсі.`);
};

function Teacher2(name, phone, subject) {
  Person2.call(this, name, phone);
  this.subject = subject;
}

Teacher2.prototype = Object.create(Person2.prototype);
Teacher2.prototype.constructor = Teacher2;

Teacher2.prototype.teach = function () {
  console.log(`Я викладаю ${this.subject}.`);
};

const student2 = new Student2("Катя", "02238784234", 4);
student2.introduce();
student2.study();

const teacher2 = new Teacher2("Микола", "03287428742", "математику");
teacher2.introduce();
teacher2.teach();

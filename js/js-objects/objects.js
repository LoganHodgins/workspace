/** Topics
 * Object methods
 * This
 * Constructor functions and new
 * Optional chaining
 */

/*
// a method = function that is property of object
let user = {
    name: "John",
    age: 30
};

// method
user.sayHi = function() {
    console.log("Hello");
}

user = {
    name: "John",
    age: 30,
    sayHi: function() {
      console.log("Hello");
    }
};

user = {
    name: "John",
    age: 30,
    sayHi() {
      console.log("Hello");
    }
};

user.sayHi()

// ------------------------------------
// THIS
//---------------------------------------
// This can be used to access the object
// This should be used and not an outer variable
// This is evaluated at run-time based on context
// This is used inside of object context, when used outside it's probably an error
// Unbounded this allows functions to be copied between objects
// Arrow functions don't have this and instead take the value from the outer function

user = {
    name: "John",
    age: 30,
    sayHi() {
      console.log("Hello");
    },
    sayName() {
        console.log(this.name);
    }
};

// Example of why use this and not the outer variable
// --------------------------------------------------
// user = {
//     name: "John",
//     age: 30,
//     sayHi() {
//       console.log( user.name );
//     }
//   };
// let admin = user;
// user = null;
// admin.sayHi();

// unbounded this allows it to be used with multiple objects
user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  console.log( this.name );
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)

user = {
    firstName: "Ilya",
    sayHi() {
      let arrow = () => console.log(this.firstName);
      arrow();
    }
  };
  
user.sayHi(); // Ilya


//-------------------------------------------------
// Constructor
//------------------------------------------------
// Constructor functions and new operator allow us to create multiple similar objects

// Constru. func should be named starting with a capital letter first and only be executed with the new operator
function User(name) {  // <---- constructor function
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");
console.log(user.name);
console.log(user.isAdmin);

// When a function is called with new
// 1. a new empty object is assigned to this   this = {};
// 2. the constuctor function usually modifies this adding properties to it
// 3. this is then returned    return this;

// arrow functions can not be used as constructor since they lack a this

// we can create single use constructor functions
let user = new function() {
    this.name = "John",
    this.isAdmin = false
};
console.log(user.name);

// ?. safer way to access properties incase they dont exist
// ?. stops the evaluation if the value before ?. is undefined or null and return undefined
// value?.prop
let user = {};
console.log(user.address.street); // error cannot read properties of undefined

let user = {};
console.log(user?.address?.street); // undefined

// only use OC on optional values
// variable before ?. must be declared
// OP short circuits and immediately stops, so function may not be called
let user = null;
let x = 0;

function log(x) { console.log(x) }

console.log(user?.log(x));

// OP doesn't work on left side of assignments
let user = null;
user?.name = "John"; // Error, doesn't work
*/

/*
 * When accessing a property in a prototype-based language like JavaScript,
 * a dynamic lookup takes places that involves different layers within the object’s prototypal tree.
 * In JavaScript, every function is an object.
 * When a function is invoked with the new operator, a new object is created.
 * For example:
 */

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

var p1 = new Person('Sanjay', 'Krishna');
var p2 = new Person('Vigneshwaran', 'Ratna Raj');

/*
 * In the above example,
 * p1 and p2 are two different objects, each created using the Person function as a constructor.
 * They are independent instances of Person, as demonstrated by this code snippet:
 */

console.log(p1 instanceof Person); // prints 'true'
console.log(p2 instanceof Person); // prints 'true'
console.log(p1 === p2); // prints 'false'

/*
 * Each function’s prototype can be extended to define its own custom methods and properties.
 * When you instantiate an object (by invoking the function using the new operator),
 * it inherits all the properties in the prototype of that function.
 * Keep in mind, though, that those instances will not have direct access to the prototype object but only to its properties.
 * For example:
 */

Person.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
}

// Referencing the p1 object from our above example
console.log(p1.getFullName()); // prints 'John Doe'
// but p1 can’t directly access the 'prototype' object...
console.log(p1.prototype); // prints 'undefined'
//console.log(p1.prototype.getFullName()); // generates an error

/*
 * There’s an important and somewhat subtle point here:
 * Even if p1 was created before the getFullName method was defined,
 * it will still have access to it because its prototype is the Person prototype.
 */

/*
 * Since the p1 instance of the Person object doesn’t itself have direct access to the prototype object,
 * if we want overwrite getFullName in p1, we would do so as follows:
 */

// We reference p1.getFullName, *NOT* p1.prototype.getFullName,
// since p1.prototype does not exist:

p1.getFullName = function () {
    return 'I am anonymous';
}

/*
 * Now p1 has its own getFullName property.
 * But the p2 instance (created in our earlier example) does not have any such property of its own.
 * Therefore, invoking p1.getFullName() accesses the getFullName method of the p1 instance itself,
 * while invoking p2.getFullName() goes up the prototype chain to the Person prototype object to resolve getFullName:
 */

console.log(p1.getFullName()); // prints 'I am anonymous'
console.log(p2.getFullName()); // prints 'Robert Doe


/*
 * Another important thing to be aware of is that
 * it’s also possible to dynamically change an object’s prototype.
 * For example:
 */

function Parent() {
    this.parentVar = 'parentValue';
};

// extend Parent’s prototype to define a 'sayHello' method
Parent.prototype.sayHello = function () {
    console.log('Hello');
};

function Child() {
    // this makes sure that the parent's constructor is called and that
    // any state is initialized correctly.
    Parent.call(this);
    this.childProperty = 'child property value';
};

// extend Child's prototype to define an 'otherVar' property...
Child.prototype.childVar = 'childValue';

// ... but then set the Child's prototype to the Parent prototype
// (whose prototype doesn’t have any 'otherVar' property defined,
//  so the Child prototype no longer has ‘otherVar’ defined!)
Child.prototype = Object.create(Parent.prototype);

var child = new Child();
child.sayHello(); // prints 'Hello'
console.log(child.parentVar); // prints 'parentValue'
console.log(child.childVar); // prints 'undefined'
console.log(child.childProperty); // prints 'child property value'

/*
 * When using prototypal inheritance,
 * remember to define properties in the prototype after having either inherited from the parent class
 * or specified an alternate prototype
 */


/*
 * To summarize, property lookups through the JavaScript prototype chain work as follows:
 *
 * If the object has a property with the given name, that value is returned.
 * (The hasOwnProperty method can be used to check if    an object has a particular named property.)
 * If the object does not have the named property, the object’s prototype is checked
 * Since the prototype is an object as well, if it does not contain the property either, its parent’s prototype is checked.
 * This process continues up the prototype chain until the property is found.
 * If Object.prototype is reached and it does not have the property either, the property is considered undefined.
 */


/*
 * Understanding how prototypal inheritance and property lookups work is important in general for developers
 * but is also essential because of its (sometimes significant) JavaScript performance ramifications.
 * As mentioned in the documentation for V8 (Google’s open source, high performance JavaScript engine),
 * most JavaScript engines use a dictionary-like data structure to store object properties.
 * Each property access therefore requires a dynamic look-up in that data structure to resolve the property.
 * This approach makes accessing properties in JavaScript typically much slower than
 * accessing instance variables in programming languages like Java
 */

/* "In arrow function, this represent the global object(window)" That's incorrect. this inside an arrow function is whatever this is outside it, which may be the global object, or may be something else.

When an arrow function is defined within the global scope, it will capture and retain a reference to the global object. This is because arrow functions do not have their own this value, and instead, they lexically bind the this value from the enclosing context.
*/

const obj = {
    func1: function () {
        console.log("Func1 ", this);
        const func1 = function () {
            console.log("Func1 Func1 ", this);
        }
        func1();
        const func2 = () => {
            console.log("Func1 Func2 ", this);
        }
        func2();
    },
    func2: () => {
        console.log("Func2 ", this);
        const func1 = function () {
            console.log("Func2 Func1 ", this);
        }
        func1();
        const func2 = () => {
            console.log("Func2 Func2 ", this);
        }
        func2();
    }
}

function foo() {
    const func1 = function () {
        console.log("foo Func1 ", this);
    }
    func1();
    const func2 = () => {
        console.log("foo Func2 ", this);
    }
    func2();
}

obj.func1();
obj.func2();
foo();

/*
call, apply and bind : In JavaScript, call, apply, and bind are methods that allow you to control the execution context and arguments of a function. They are used to borrow or set a specific context for a function.
*/

/*
call: The call method is used to invoke a function immediately with a specified this value and individual arguments. It accepts the this value as the first argument, followed by the function arguments separated by commas.
*/
const user1 = {
    firstName: 'John',
    lastName: 'Doe'
}

const printFullName = function (city, country) {
    console.log(`${this.firstName} ${this.lastName} from ${city}, ${country}.`);
}

printFullName.call(user1, 'London', 'UK');

/*
apply: The apply method is similar to call, but it accepts the this value as the first argument and an array-like or iterable object containing the function arguments.
*/
const user2 = {
    firstName: 'Sachin',
    lastName: 'Tendulkar'
}
printFullName.apply(user2, ['Mumbai', 'India']);

/*
bind: The bind method creates a new function that, when called, has a specified this value and any initial arguments. Unlike call and apply, bind doesn't immediately invoke the function but returns a new function with the bound context.
*/
const user3 = {
    firstName: 'Virat',
    lastName: 'Kohli'
}
const viratIntro = printFullName.bind(user3, 'Delhi');
viratIntro("India");

/*
Polyfill for bind method : A polyfill is a piece of code that provides the functionality of a feature that is not supported by certain browsers or environments.
*/
Function.prototype.bindPolyfill = function (...args) {
    const obj = this;
    const params = args.slice(1);
    return function (...args2) {
        obj.apply(args[0], [...params, args2]);
    }
};

const viratIntro2 = printFullName.bindPolyfill(user3, 'Delhi');
viratIntro2("India");

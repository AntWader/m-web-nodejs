"use strict";
// 4.2
function Cat(name, param) {
    this.name = function () { return name; };
}
function Dog(name, param) {
    this.name = function () { return name; };
}
function hey(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
hey(a);
hey(b);

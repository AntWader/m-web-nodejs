// 4.2

function Cat(name: string, param: any) {
    this.name = function (): string { return name }
}

function Dog(name: string, param: any) {
    this.name = function (): string { return name }
}

function hey(abstractPet: { name: () => string; }) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey(a)
hey(b)
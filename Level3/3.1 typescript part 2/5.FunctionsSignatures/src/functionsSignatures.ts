// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т, но возможно не со всеми полями
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1, 
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :) 
// нас интересует только ее сигнатура.
function recovery1<T>(
    val: Partial<T>,
    recoveryFunc: (a: typeof val) => T
) { }
//test:
recovery1({ a: 1, b: 2 }, (a) => { return { a: 1, b: 2, d: 4 } })


// Более сложный вариант:
// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т (у которого поле id: string), 
//    но возможно без поля id
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1, 
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :) 
// нас интересует только ее сигнатура.
function recovery2<T extends { id: string }>(
    val: Omit<T, "id"> | T,
    recoveryFunc: (a: typeof val) => T
) { }
//test:
type Type2 = { a: number, b: number, id: string };
recovery2<Type2>({ a: 1, b: 11 }, (a) => { return { a: 1, b: 2, id: 'ok' } })
recovery2<Type2>({ a: 0, b: 0, id: '' }, (a) => { return { a: 1, b: 2, id: 'ok' } })

// Последняя задача:
// Напишите сигнатуру функции, которая принимает
// - некий класс 
// - количество
// ...а возвращает массив экземпляров этого класса

class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

// сделайте норм сигнатуру тут.
// НЕТ, Rectangle|Circle это не вариант, надо сделать универсальную функцию 
function наштамповать<C extends new (...args: any) => any>(
    SOMECLASS: C,
    count: number): InstanceType<C>[] {
    let a = []
    for (let i = 0; i < count; i++)
        a.push(new SOMECLASS());

    return a;
}

let a: Rectangle[] = наштамповать(Rectangle, 10);
let b: Circle[] = наштамповать(Circle, 20)

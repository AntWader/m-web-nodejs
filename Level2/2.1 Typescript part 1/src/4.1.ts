// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey(a: { name: () => string; cuteness?: number; coolness?: number }): string {
    return "hey! i'm " + a.name();
}
hey({ name: () => "roma", cuteness: 100 })
hey({ name: () => "vasya", coolness: 100 })
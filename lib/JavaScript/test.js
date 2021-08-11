function Closure () {
    let num = 0;
    return function () {
        num++;
        return num;
    }
}

let Closuree = Closure();
Closuree(); // 1
Closuree(); // 2
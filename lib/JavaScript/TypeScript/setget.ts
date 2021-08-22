class Person {
    private _age: number;
    get age() {
        return this._age;
    }
    set age(val) {
        if(val < 0) {
            throw new Error("年龄不可为负数")
        }
        this._age = val;
    }
}
let p = new Person();
p.age = 23;
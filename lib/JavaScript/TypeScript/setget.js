var Person = /** @class */ (function () {
    function Person() {
    }
    Object.defineProperty(Person.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (val) {
            if (val < 0) {
                throw new Error("年龄不可为负数");
            }
            this._age = val;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
var p = new Person();
p.age = 23;
console.log(p);
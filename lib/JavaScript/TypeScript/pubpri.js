var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 类成员默认对外公开 即默认为 public
var Person = /** @class */ (function () {
    function Person() {
        // 可以在声明类成员同时为其赋值
        // 如果使用修饰符 private 表示只能在类的内部访问,是类的私有成员
        this.type = "human"; // constructor(this.type = "human")
        // 外部无法访问,但可以被继承
        this.city = 'changsha';
    }
    // 在类的内部访问私有成员
    // 但是无法在外部访问
    Person.prototype.getType = function () {
        return this.type;
    };
    return Person;
}());
// 可以通过 getType 访问私有成员 - 因为方法又是公开的
// 类的私有成员无法被继承
new Person().getType();
var Dev = /** @class */ (function (_super) {
    __extends(Dev, _super);
    function Dev() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dev.prototype.getCity = function () {
        // 可以点到city这个成员
        console.log(this.city);
    };
    return Dev;
}(Person));
// 外部仍然访问不了city这个成员
new Dev().getCity();

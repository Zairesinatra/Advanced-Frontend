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
var Person = /** @class */ (function () {
    function Person(job, sex) {
        this.job = job;
        this.sex = sex;
    }
    Person.prototype.eat = function () {
        console.log("干饭");
    };
    return Person;
}());
// extends 继承父类的属性与方法
var Dev = /** @class */ (function (_super) {
    __extends(Dev, _super);
    // 借用构造函数实现属性的继承 - 构造函数中调用 super 方法传入成员
    function Dev(job, sex) {
        // super() 表示调用父类的构造函数
        return _super.call(this, job, sex) || this;
    }
    return Dev;
}(Person));
new Dev().eat();

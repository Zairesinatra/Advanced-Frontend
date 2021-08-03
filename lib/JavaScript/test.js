function Person(){};
var p2 =new Person();
Person.prototype = {
    add :function(){
        console.log(this.name);
    },
    name :"zszszs"
};
p2.add(); // error
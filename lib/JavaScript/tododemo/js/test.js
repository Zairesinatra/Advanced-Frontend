class Tab{
    constractor(id){
    //获取元素
    this.main = document.querySelector(id);
    this.lis = this.main.querySelectorAll('li');
    }
    //切换
    toggleTab(){}
    //添加
    addTab(){}
    //删除
    removeTab(){}
    //修改
    editTab(){}
}
new Tab('#tab');
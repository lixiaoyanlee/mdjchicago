
const methods = {
    constructor: Crumbs,
    process(opt, name, idx, func) {
        this.push(`${idx}.${name}`);
        const path = this.path();
        console.log(opt, 'Enter: ', path);
        func();
        console.log(opt, 'Leave: ', path);
        this.pop();
    },

    processMute(opt, name, idx, func) {
        this.push(`${idx}.${name}`);
        func();
        this.pop();
    },

    path() {
        return '/' + this.join('/');
    }
};
  
// 数组继承类，解决babel 不能处理es6直接继承原生数组的问题
function Crumbs(...param) {
    const arr = new Array(...param);
    // 继承数组实例的属性
    Object.assign(this, arr);
    // Object.defineProperty(this, 'length', {
    //     value: arr.length,
    //     enumerable: false// 定义length属性为不可枚举
    // });
}
const prototype = Object.create(Array.prototype);
// 定义原型上的方法， 并且不能枚举
// eslint-disable-next-line array-callback-return
Object.keys(methods).map((key) => {
    Object.defineProperty(prototype, key, {
        value: methods[key],
        enumerable: false// 不可枚举
    });
});
// 设定原型
Crumbs.prototype = prototype;
module.exports = Crumbs;


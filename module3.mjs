import {OrderService} from "./module1.mjs";

console.log(OrderService);
console.log(typeof(OrderService))
//OrderServiceModule.setDefaultDiscount(1);
const a = new OrderService();
console.log(a.defaultDiscount);
a.setDefaultDiscount(1);
console.log(a.defaultDiscount);
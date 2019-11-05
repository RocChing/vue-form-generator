import Vue from "vue";
import VueFormGenerator from "../../../src";

let fields = [];
let fieldOption = VueFormGenerator.fieldsLoader.default;
for (let key in fieldOption) {
	fields.push(fieldOption[key])
}

Vue.use(VueFormGenerator, { fields: fields })
import App from "./app.vue";

new Vue({
	el: '#app',
	...App
});

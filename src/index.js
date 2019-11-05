import component from "./formGenerator.vue";
import * as schema from "./utils/schema.js";
import validators from "./utils/validators.js";
import * as fieldsLoader from "./utils/fieldsLoader.js";
import abstractField from "./fields/abstractField.js";
import { defaults } from 'lodash';

const install = (Vue, options = {}) => {
	options = defaults(options, fieldsLoader.default);
	for (let key in options) {
		let field = options[key];
		let name = field.name;
		if (name && name !== '') {
			Vue.component(name, field);
		}
	}
	Vue.component("VueFormGenerator", component);
};

export default {
	component,
	schema,
	validators,
	abstractField,
	fieldsLoader,
	install
};

const forEach = require("lodash").forEach;

let fieldComponents = {};

let coreFields = require.context("../fields/core", false, /^\.\/field([\w-_]+)\.vue$/);

forEach(coreFields.keys(), (key) => {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	fieldComponents[compName] = coreFields(key).default;
});

let baseFields = require.context("../fields/base", false, /^\.\/field([\w-_]+)\.vue$/);
forEach(baseFields.keys(), key => {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	compName += "_b";
	console.log(compName);
	fieldComponents[compName] = baseFields(key).default;
});

if (process.env.FULL_BUNDLE) {
	let optionalFields = require.context("../fields/optional", false, /^\.\/field([\w-_]+)\.vue$/);

	forEach(optionalFields.keys(), (key) => {
		let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
		fieldComponents[compName] = optionalFields(key).default;
	});
}

module.exports = fieldComponents;

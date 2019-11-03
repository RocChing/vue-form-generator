import { isArray, isString } from "lodash";

export default {
	methods: {
		getStyleClasses(field, baseClasses, defaults) {
			let styleClasses = field.styleClasses;

			if (isArray(styleClasses)) {
				styleClasses.forEach((c) => {
					baseClasses[c] = true;
				});
			} else if (isString(styleClasses)) {
				baseClasses[styleClasses] = true;
			}
			else {
				if (defaults && defaults.length > 0) {
					defaults.forEach((c) => {
						baseClasses[c] = true;
					});
				}
			}
			return baseClasses;
		}
	}
};

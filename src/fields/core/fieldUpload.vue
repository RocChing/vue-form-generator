<template >
	<div :class="fieldWrapperClasses"
		v-attributes="'wrapper'">
		<input :class="fieldClasses"
			:id="fieldID"
			type="file"
			:name="inputName"
			@change="onChange"
			:accept="fieldOptions.accept"
			:multiple="fieldOptions.multiple"
			:placeholder="placeholder"
			:readonly="readonly"
			:required="schema.required"
			:disabled="disabled"
			v-attributes="'input'">
	</div>
</template>

<script>
import abstractField from "../abstractField";
import { isFunction } from "lodash";

export default {
	name: "field-upload",
	mixins: [abstractField],
	methods: {
		onChange($event) {
			if (isFunction(this.fieldOptions.onChanged)) {
				// Schema has defined onChange method.
				this.fieldOptions.onChanged.call(this, this.model, this.schema, $event, this);
			}
		}
	}
};
</script>

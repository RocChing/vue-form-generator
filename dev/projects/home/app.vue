<template>
	<div class="container">
		<h1>测试表单</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator
					:schema="schema"
					:model="model"
					:options="formOptions"
					ref="form"
					:is-new-model="isNewModel"
					@model-updated="modelUpdated"
					@validated="onValidated"
				></vue-form-generator>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<pre v-if="model" v-html="prettyModel"></pre>
			</div>
		</div>
	</div>
</template>
<script>
import mixinUtils from "../../mixins/utils.js";
export default {
	mixins: [mixinUtils],
	data() {
		let model = {
			name: ""
		};
		let schema = {
			fields: [
				{
					type: "input_b",
					inputType: "text",
					label: "姓名",
					model: "name",
					attributes: {
						input: {
							"data-toggle": "tooltip"
						},
						wrapper: {
							"data-target": "input"
						}
					}
				}
			]
		};
		return {
			isNewModel: false,
			selected: [],
			model: model,
			schema: schema,
			formOptions: {
				validateAfterLoad: true,
				validateAfterChanged: true,
				validateBeforeSave: true
			}
		};
	},
	methods: {
		showWarning() {
			if (this.$refs.form && this.$refs.form.errors) {
				return this.$refs.form.errors.length > 0;
			}
		},

		onValidated(res, errors) {
			console.log("VFG validated:", res, errors);
		},

		modelUpdated(newVal, schema) {
			console.log("main model has updated", newVal, schema);
		}
	}
};
</script>
<style scoped>
</style>
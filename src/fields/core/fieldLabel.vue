<template>
	<span :id="fieldID"
		:class="fieldClasses"
		v-attributes="'label'"
		v-text="value"></span>
</template>

<script>
import abstractField from "../abstractField";

export default {
	name: "field-label",
	mixins: [abstractField]
};
</script>

<template>
  <div :class="fieldWrapperClasses" v-attributes="'wrapper'">
    <textarea
      v-model="value"
      :id="fieldID"
      :class="fieldClasses"
      :disabled="disabled"
      :maxlength="fieldOptions.max"
      :minlength="fieldOptions.min"
      :placeholder="placeholder"
      :required="required"
      :readonly="readonly"
      :rows="fieldOptions.rows || 2"
      :name="inputName"
      v-attributes="'input'"
    ></textarea>
  </div>
</template>

<script>
import abstractField from "../abstractField";

export default {
  name: "field-textArea",
  mixins: [abstractField]
};
</script>

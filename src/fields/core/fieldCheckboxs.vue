<template>
  <div :disabled="disabled" v-attributes="'wrapper'" :class="fieldWrapperClasses">
    <template v-if="isInLine">
      <label
        v-for="item in items"
        :key="getItemValue(item)"
        :class="myLabelClasses"
        v-attributes="'label'"
      >
        <input
          :id="fieldID"
          type="checkbox"
          :disabled="disabled"
          :name="id"
          @change="onChanged($event, item)"
          :value="getItemValue(item)"
          :checked="isItemChecked(item)"
          :class="myClasses"
          :required="required"
          v-attributes="'input'"
        />
        {{ getItemName(item) }}
      </label>
    </template>
    <template v-else>
      <div
        v-for="item in items"
        :key="getItemValue(item)"
        :class="myLabelClasses"
        v-attributes="'label'"
      >
        <input
          :id="fieldID"
          type="checkbox"
          :disabled="disabled"
          :name="id"
          @change="onChanged($event, item)"
          :value="getItemValue(item)"
          :checked="isItemChecked(item)"
          :class="myClasses"
          :required="required"
          v-attributes="'input'"
        />
        {{ getItemName(item) }}
      </div>
    </template>
  </div>
</template>

<script>
import { isObject, isNil, clone } from "lodash";
import abstractField from "../abstractField";

export default {
  name: "field-checkboxs",
  mixins: [abstractField],

  computed: {
    items() {
      let values = this.schema.values;
      if (typeof values == "function") {
        return values.apply(this, [this.model, this.schema]);
      } else {
        return values;
      }
    },
    id() {
      return this.schema.model;
    },
    myClasses() {
      return this.getValueFromOption(this.schema, "fieldClasses", []);
    },
    myLabelClasses() {
      return this.getValueFromOption(this.schema, "checkboxLabelClasses", [
        "checkbox-inline"
      ]);
    },
    isInLine() {
      return this.getValueFromOption(this.schema, "isInLine", true);
    }
  },

  methods: {
    getItemValue(item) {
      if (isObject(item)) {
        if (typeof this.fieldOptions["value"] !== "undefined") {
          return item[this.fieldOptions.value];
        } else {
          if (typeof item["value"] !== "undefined") {
            return item.value;
          } else {
            throw "`value` is not defined. If you want to use another key name, add a `value` property under `fieldOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/radios.html#radios-field-with-object-values";
          }
        }
      } else {
        return item;
      }
    },
    getItemName(item) {
      if (isObject(item)) {
        if (typeof this.fieldOptions["name"] !== "undefined") {
          return item[this.fieldOptions.name];
        } else {
          if (typeof item["name"] !== "undefined") {
            return item.name;
          } else {
            throw "`name` is not defined. If you want to use another key name, add a `name` property under `fieldOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/radios.html#radios-field-with-object-values";
          }
        }
      } else {
        return item;
      }
    },
    onSelection(item) {
      this.value = this.getItemValue(item);
    },
    isItemChecked(item) {
      //   let currentValue = this.getItemValue(item);
      //   return currentValue === this.value;
      return this.value && this.value.indexOf(this.getItemValue(item)) !== -1;
    },
    onChanged(event, item) {
      let isChecked = event.target.checked;
      if (isNil(this.value) || !Array.isArray(this.value)) {
        this.value = [];
      }

      if (isChecked) {
        // Note: If you modify this.value array, it won't trigger the `set` in computed field
        const arr = clone(this.value);
        arr.push(this.getItemValue(item));
        this.value = arr;
      } else {
        // Note: If you modify this.value array, it won't trigger the `set` in computed field
        const arr = clone(this.value);
        arr.splice(this.value.indexOf(this.getItemValue(item)), 1);
        this.value = arr;
      }
    }
  }
};
</script>

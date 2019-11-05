<template>
  <div :disabled="disabled" v-attributes="'wrapper'" :class="myWrapperClasses">
    <template v-if="isInLine">
      <label
        v-for="item in items"
        :key="getItemValue(item)"
        :class="myLabelClasses"
        v-attributes="'label'"
      >
        <input
          :id="fieldID"
          type="radio"
          :disabled="disabled"
          :name="id"
          @click="onSelection(item)"
          :value="getItemValue(item)"
          :checked="isItemChecked(item)"
          :class="myClasses"
          :required="required"
          :title="getItemName(item)"
          v-attributes="'input'"
        />
        {{ getItemNameLabel(item) }}
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
          type="radio"
          :disabled="disabled"
          :name="id"
          @click="onSelection(item)"
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
import { isObject } from "lodash";
import abstractField from "../abstractField";

export default {
  name: "field-radios",
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
      return this.getValueFromOption(this.schema, "radioLabelClasses", [
        "radio-inline"
      ]);
    },
    myWrapperClasses() {
      return ["minheight34", ...this.fieldWrapperClasses];
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
    getItemNameLabel(item) {
      let showLabel = this.fieldOptions.showLabel;
      if (showLabel === undefined) {
        showLabel = true;
      }
      if (showLabel) return this.getItemName(item);
      return "";
    },
    onSelection(item) {
      this.value = this.getItemValue(item);
    },
    isItemChecked(item) {
      let currentValue = this.getItemValue(item);
      return currentValue === this.value;
    }
  }
};
</script>

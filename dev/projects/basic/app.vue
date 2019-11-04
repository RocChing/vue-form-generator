<template>
  <div class="container">
    <h1>Basic</h1>
    <div class="row">
      <div class="col-sm-12">
        <div>
          <label class="control-label">类型</label>
          <select class="form-control" v-model="type" @change="onTypeChanged">
            <option value="1">水平</option>
            <option value="2">垂直</option>
            <option value="3">内联表单</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <form :class="formClasses">
          <vue-form-generator
            :key="key"
            :schema="schema"
            :model="model"
            :options="formOptions"
            ref="form"
          ></vue-form-generator>
        </form>
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
    return {
      type: "2",
      formClasses: [],
      key: 1,
      isNewModel: false,
      selected: [],
      model: {
        name: "David",
        age: 10,
        province: null,
        gender: 3,
        country: "",
        hobby: [],
        file: null
      },
      schema: {
        fields: [
          {
            type: "input",
            fieldOptions: {
              inputType: "text"
            },
            label: "姓名",
            model: "name",
            placeholder: "请输入姓名"
          },
          {
            type: "input",
            fieldOptions: {
              inputType: "number"
            },
            label: "年龄",
            model: "age",
            placeholder: "请输入年龄"
          },
          {
            type: "radios",
            label: "性别",
            model: "gender",
            values: [
              { value: 1, name: "男" },
              { value: 2, name: "女" },
              { value: 3, name: "未知" }
            ]
          },
          {
            type: "checkboxs",
            label: "爱好",
            model: "hobby",
            values: [
              { value: 1, name: "上网" },
              { value: 2, name: "打球" },
              { value: 3, name: "游泳" },
              { value: 4, name: "写代码" }
            ]
          },
          {
            type: "select",
            label: "省份",
            model: "province",
            placeholder: "请输入省份",
            fieldOptions: {
              noneSelectedText: "请选择"
            },
            values: [
              { id: 1, name: "北京市" },
              { id: 2, name: "天津市" },
              { id: 3, name: "上海市" },
              { id: 4, name: "重庆市" }
            ]
          },
          {
            type: "upload",
            label: "附件",
            placeholder: "选择文件上传",
            model: "file",
            fieldOptions: {
              //multiple: "multiple",
              onChanged: (model, schema, event, file) => {
                console.log(model, schema);
                console.log(event, file);
              }
            }
          },
          {
            type: "textArea",
            label: "描述",
            fieldOptions: {
              rows: 5
            }
          },
          {
            type: "submit",
            label: "",
            fieldOptions: {
              buttonText: "提交",
              onSubmit: this.onSubmit
            }
          }
        ]
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateBeforeSave: true
      }
    };
  },

  methods: {
    onSubmit(model, schema, event) {
      console.log(model);
      event.preventDefault();
    },
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
    },
    onTypeChanged() {
      let type = this.type;
      let clsName = "";
      let fields = this.schema.fields;
      switch (type) {
        case "1":
          clsName = "form-horizontal";
          break;
        case "2":
          clsName = "";
          break;
        case "3":
          clsName = "form-inline";
          break;
      }
      this.formClasses.length = 0;
      this.formClasses.push(clsName);
      if (type === "1") {
        for (let i = 0; i < fields.length; i++) {
          let field = this.schema.fields[i];
          field.labelClasses = ["col-sm-2", "control-label"];
          field.fieldWrapperClasses = ["col-sm-10"];
        }
      } else {
        for (let i = 0; i < fields.length; i++) {
          let field = this.schema.fields[i];
          field.labelClasses = ["control-label"];
          field.fieldWrapperClasses = [];
        }
      }
      this.key++;
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.app = this;
    });
  }
};
</script>

<style lang="scss">
@import "../../style.scss";
</style>

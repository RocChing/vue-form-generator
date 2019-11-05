<template>
  <div class="container">
    <h1>Layout</h1>
    <div class="row">
      <div class="col-sm-12">
        <label class="control-label">布局</label>
        <select class="form-control" v-model="layout" @change="onLayoutChanged">
          <option value="0">请选择</option>
          <option value="1">单列</option>
          <option value="2">两列</option>
          <option value="3">三列</option>
        </select>
      </div>
      <div class="col-sm-12" style="margin-top:10px;">
        <label class="control-label">类型</label>
        <select class="form-control" v-model="type" @change="onTypeChanged">
          <option value="0">请选择</option>
          <option value="1">垂直</option>
          <option value="2">水平</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12" style="margin-top:10px;">
        <!-- class="form-horizontal" -->
        <form :class="formClasses" :key="key">
          <div class="panel panel-primary">
            <div class="panel-heading">表单</div>
            <div class="panel-body">
              <vue-form-generator
                v-if="key>0"
                :key="key"
                :schema="schema"
                :model="model"
                :options="formOptions"
                tag="div"
                ref="form"
                @validated="onValidated"
              ></vue-form-generator>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <pre v-if="model" v-html="prettyModel"></pre>
      </div>
    </div>
  </div>
</template>

<script>
import mixinUtils from "../../mixins/utils.js";
import validators from "../../../src/utils/validators";
export default {
  mixins: [mixinUtils],

  data() {
    return {
      type: "0",
      layout: "0",
      formClasses: "",
      key: 0,
      isNewModel: false,
      selected: [],
      model: {
        name: "",
        age: null,
        province: null,
        gender: null,
        country: "",
        hobby: [],
        file: null,
        desc: ""
      },
      schema: {
        fields: []
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateBeforeSave: true,
        validationErrorClass: "has-error"
      }
    };
  },

  methods: {
    onSubmit(model, schema, event) {
      //console.log(model);
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
    onLayoutChanged() {
      this.type = "1";
      let layout = this.layout;
      if (layout === "0") {
        this.key = 0;
        return;
      }

      let fields = [];
      switch (layout) {
        case "1":
          fields = [
            {
              type: "input",
              fieldOptions: {
                inputType: "text"
              },
              label: "姓名",
              model: "name",
              required: true,
              validator: "required",
              placeholder: "请输入姓名"
            },
            {
              type: "input",
              fieldOptions: {
                inputType: "number",
                min: 20
              },
              label: "年龄",
              model: "age",
              required: true,
              validator: ["required", "number"],
              placeholder: "请输入年龄"
            },
            {
              type: "radios",
              label: "性别",
              model: "gender",
              required: true,
              validator: "required",
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
              required: true,
              validator: "required",
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
              model: "desc",
              label: "描述",
              required: true,
              validator: "required",
              fieldOptions: {
                rows: 5
              }
            },
            {
              type: "submit",
              fieldOptions: {
                buttonText: "提交",
                validateBeforeSubmit: true,
                onSubmit: this.onSubmit
              }
            }
          ];
          break;
        case "2":
          fields = [
            {
              type: "group",
              styleClasses: ["col-sm-6"],
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
                }
              ]
            },
            {
              type: "group",
              styleClasses: ["col-sm-6"],
              fields: [
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
                }
              ]
            },
            {
              type: "group",
              styleClasses: ["col-sm-6"],
              model: "desc",
              fields: [
                {
                  type: "textArea",
                  label: "描述",
                  fieldOptions: {
                    rows: 5
                  }
                }
              ]
            },
            {
              type: "submit",
              styleClasses: ["col-sm-12"],
              fieldOptions: {
                buttonText: "提交",
                validateBeforeSubmit: true,
                onSubmit: this.onSubmit
              }
            }
          ];
          break;
        case "3":
          fields = [
            {
              type: "group",
              styleClasses: ["col-sm-4"],
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
                  type: "checkboxs",
                  label: "爱好",
                  model: "hobby",
                  values: [
                    { value: 1, name: "上网" },
                    { value: 2, name: "打球" },
                    { value: 3, name: "游泳" },
                    { value: 4, name: "写代码" }
                  ]
                }
              ]
            },
            {
              type: "group",
              styleClasses: ["col-sm-4"],
              fields: [
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
                }
              ]
            },
            {
              type: "group",
              styleClasses: ["col-sm-4"],
              fields: [
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
                }
              ]
            },
            {
              type: "group",
              styleClasses: ["col-sm-4"],
              model: "desc",
              fields: [
                {
                  type: "textArea",
                  label: "描述",
                  fieldOptions: {
                    rows: 5
                  }
                }
              ]
            },
            {
              type: "submit",
              styleClasses: ["col-sm-12"],
              fieldOptions: {
                buttonText: "提交",
                validateBeforeSubmit: true,
                onSubmit: this.onSubmit
              }
            }
          ];
          break;
      }
      this.schema.fields = fields;
      this.onTypeChanged();
      this.key++;
    },
    onTypeChanged() {
      let type = this.type;
      if (type === "0") {
        this.key = 0;
        return;
      }

      let fields = this.schema.fields;
      this.setFormClasses();
      this.setClasses(fields);
      this.key++;
    },
    setClasses(fields) {
      let type = this.type;
      for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (field.type === "group") {
          this.setClasses(field.fields);
        } else if (field.type === "submit") {
          field.fieldWrapperClasses = ["center"];
          continue;
        }
        field.labelClasses =
          type === "1" ? ["control-label"] : ["col-sm-2", "control-label"];
        field.fieldWrapperClasses = type === "1" ? [""] : ["col-sm-10"];
      }
    },
    setFormClasses(type) {
      this.formClasses = this.type === "1" ? "" : "form-horizontal";
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.app = this;
    });
  }
};
</script>
<style>
.minheight34 {
  min-height: 34px;
}
.center {
  text-align: center;
}
</style>

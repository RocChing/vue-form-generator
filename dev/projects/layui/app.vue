<template>
  <div class="layui-container">
    <div class="layui-row">
      <div class="layui-col-md12">
        <div class="layui-collapse">
          <div class="layui-colla-item">
            <h2 class="layui-colla-title">表单</h2>
            <div class="layui-colla-content layui-show">
              <form class="layui-form" :key="key">
                <vue-form-generator
                  :key="key"
                  :schema="schema"
                  :model="model"
                  :options="formOptions"
                  tag="div"
                  ref="form"
                  @validated="onValidated"
                ></vue-form-generator>
              </form>
            </div>
          </div>
          <div class="layui-colla-item">
            <div class="layui-colla-title">值</div>
            <div class="layui-colla-content layui-show">
              <pre v-if="model" v-html="prettyModel"></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixinUtils from "../../mixins/utils.js";
// require("../libs/layui/layui.js");
// let layui = window.layui;
// layui.config({
//   dir: "/libs/layui/"
// });
export default {
  mixins: [mixinUtils],

  data() {
    let fields = [
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
        validator: ["number"],
        placeholder: "请输入年龄"
      },
      {
        type: "radios",
        label: "性别",
        model: "gender",
        required: true,
        validator: "required",
        fieldOptions: {
          showLabel: false
        },
        values: [
          { value: 1, name: "男" },
          { value: 2, name: "女" },
          { value: 3, name: "未知" }
        ]
      },
      {
        type: "input",
        fieldOptions: {
          inputType: "date"
        },
        label: "生日",
        model: "birthday",
        required: true,
        validator: ["date"],
        placeholder: "请输入生日"
      },
      {
        type: "input",
        id: "goToSchoolDate",
        fieldOptions: {
          inputType: "text",
          format: "YYYY-MM-DD"
        },
        label: "入学日期",
        model: "goToSchoolDate",
        required: true,
        validator: ["date"],
        placeholder: "请输入入学日期"
      },
      {
        type: "checkboxs",
        label: "爱好",
        model: "hobby",
        fieldOptions: {
          showLabel: false
        },
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
        id: "province",
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
        ],
        attributes: {
          input: {
            "lay-filter": "province"
          },
          wrapper: {}
        }
      },
      {
        type: "upload",
        label: "附件",
        placeholder: "选择文件上传",
        fieldOptions: {
          onChanged: (model, schema, event, file) => {
            console.log(event.target.files);
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
        },
        inputName: "desc"
      },
      {
        type: "submit",
        fieldOptions: {
          buttonText: "提交",
          validateBeforeSubmit: false //,
          //onSubmit: this.onSubmit
        },
        attributes: {
          input: {
            "lay-filter": "btn_form",
            "lay-submit": ""
          },
          wrapper: {}
        }
      }
    ];
    this.setClasses(fields);
    return {
      key: 0,
      model: {
        name: "",
        age: null,
        birthday: null,
        goToSchoolDate: null,
        province: null,
        gender: null,
        country: "",
        hobby: [],
        file: null,
        desc: ""
      },
      schema: {
        fields: fields
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
    setClasses(fields) {
      for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        let clsName = "";
        switch (field.type) {
          case "submit":
            clsName = "layui-btn";
            break;
          case "textArea":
            clsName = "layui-textarea";
            break;
          default:
            clsName = "layui-input";
            break;
        }
        field.styleClasses = ["layui-form-item"];
        field.labelClasses = ["layui-form-label"];
        field.fieldWrapperClasses = ["layui-input-block"];
        field.fieldClasses = [clsName];
      }
    }
  },
  created() {
    // let that = this;
    // this.$nextTick(function() {
    //   layui.use(["jquery", "form", "element", "upload", "laydate"], function() {
    //     var laydate = layui.laydate;
    //     var form = layui.form;

    //     laydate.render({
    //       elem: "#goToSchoolDate" //指定元素
    //     });

    //     form.on("select(province)", function(data) {
    //       console.log(data);
    //       that.model.province = data.value;
    //       that.key++;
    //     });

    //     form.on("submit(btn_form)", function(data) {
    //       layer.msg(JSON.stringify(data.field));
    //       return false;
    //     });
    //   });
    // });
  }
};
</script>
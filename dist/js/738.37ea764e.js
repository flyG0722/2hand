"use strict";(self["webpackChunkvue"]=self["webpackChunkvue"]||[]).push([[738],{3738:function(e,t,a){a.r(t),a.d(t,{default:function(){return o}});var s=function(){var e=this,t=e._self._c;return t("div",[t("el-card",{staticStyle:{width:"50%"}},[t("el-form",{staticStyle:{"padding-right":"50px"},attrs:{model:e.user,"label-width":"100px"}},[t("div",{staticStyle:{margin:"15px","text-align":"center"}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.$baseUrl+"/files/upload","show-file-list":!1,"on-success":e.handleAvatarSuccess}},[e.user.avatar?t("img",{staticClass:"avatar",attrs:{src:e.user.avatar}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{attrs:{placeholder:"用户名",disabled:""},model:{value:e.user.username,callback:function(t){e.$set(e.user,"username",t)},expression:"user.username"}})],1),t("el-form-item",{attrs:{label:"姓名",prop:"name"}},[t("el-input",{attrs:{placeholder:"姓名"},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}})],1),t("el-form-item",{attrs:{label:"电话",prop:"phone"}},[t("el-input",{attrs:{placeholder:"电话"},model:{value:e.user.phone,callback:function(t){e.$set(e.user,"phone",t)},expression:"user.phone"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{attrs:{placeholder:"邮箱"},model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}})],1),t("div",{staticStyle:{"text-align":"center","margin-bottom":"20px"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("保 存")])],1)],1)],1)],1)},r=[],l={name:"AdminPerson",data(){return{user:JSON.parse(localStorage.getItem("xm-user")||"{}")}},created(){},methods:{update(){this.$request.put("/admin/update",this.user).then((e=>{"200"===e.code?(this.$message.success("保存成功"),localStorage.setItem("xm-user",JSON.stringify(this.user)),this.$emit("update:user")):this.$message.error(e.msg)}))},handleAvatarSuccess(e,t,a){this.$set(this.user,"avatar",e.data)}}},u=l,i=a(1001),n=(0,i.Z)(u,s,r,!1,null,"64c39e03",null),o=n.exports}}]);
//# sourceMappingURL=738.37ea764e.js.map
<template>
  <div class="main">
    <div class="upload_frame">
      <el-upload
        class="upload-demo"
        drag
        multiple
        action="#"
        :before-upload="beforeAvatarUpload"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>
<style>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
}
.upload_frame {
  width: 300px;
  height: 200px;
  margin: auto;
}
</style>
<script>
export default {
  data() {
    return {
      type: ""
    };
  },
  methods: {
    async beforeAvatarUpload(file) {
      let data = new FormData();
      data.append("file", file);
      const fileRes = await this.$http1.post("/contact/classify",data);
      const typeNum = fileRes.data.accuracy.pop();
      switch(typeNum) {
        case 0 : this.type = "租赁合同"; break;
        case 1 : this.type = "购买合同"; break;
        case 2 : this.type = "劳务合同"; break;
        default: this.type = "其他合同"
      }
      const typeConfirm = this.$confirm(`是否将改文件归档为${this.type}`, '归档', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      typeConfirm.then(async () => {
        const saveRes = await this.$http2.post(`/contact/upload0${typeNum}`, data);
        console.log(saveRes);
      })
    },
  },
};
</script>

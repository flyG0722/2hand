<template>
  <div style="width: 80%; margin: 10px auto" class="card">
    <div style="margin-bottom: 10px">
      <el-button type="primary" plain @click="openFormDialog">发布求购</el-button>
    </div>

    <div style="margin: 10px auto">
      <el-table :data="tableData" stripe>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
        <el-table-column prop="img" label="图片">
          <template v-slot="scope">
            <el-image v-if="scope.row.img" style="width: 50px" :src="scope.row.img" :preview-src-list="[scope.row.img]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="发布时间"></el-table-column>
        <el-table-column prop="solved" label="是否解决">
          <template v-slot="scope">
            <el-tag :type="scope.row.solved === '未解决' ? 'danger' : 'success'">{{ scope.row.solved }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="审核状态">
          <template v-slot="scope">
            <el-tag :type="scope.row.status === '待审核' ? 'info' : (scope.row.status === '通过' ? 'success' : 'danger')">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="scope">
            <el-button v-if="scope.row.status !== '通过'" size="mini" type="success" plain @click="openFormDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="confirmDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin: 15px auto">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="求购信息" :visible.sync="formVisible" width="40%" :close-on-click-modal="false" 
      :modal="false" 
      :append-to-body="true" 
      destroy-on-close>
      <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="内容"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
              :action="$baseUrl + '/files/upload'"
              :headers="{ token: user.token }"
              list-type="picture"
              :on-success="handleImgSuccess"
              :on-error="handleImgError"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否解决" prop="solved">
          <el-select style="width: 100%" v-model="form.solved">
            <el-option value="未解决">未解决</el-option>
            <el-option value="已解决">已解决</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFormDialog">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  title: "UserHelp",
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formVisible: false,
      form: {},
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        solved: [{ required: true, message: '请选择解决状态', trigger: 'change' }],
      },
    };
  },
  created() {
    this.load(1);
  },
  methods: {
    openFormDialog(row = {}) {
      this.form = { ...row }; // Use spread operator for shallow copy
      this.formVisible = true;
    },
    closeFormDialog() {
      this.formVisible = false;
      this.$refs.formRef.resetFields(); // Reset fields on close
    },
    confirmDelete(id) {
      this.$confirm('您确定删除吗？', '确认删除', { type: "warning" }).then(() => {
        this.deleteEntry(id);
      });
    },
    deleteEntry(id) {
      this.$request.delete(`/help/delete/${id}`).then(res => {
        if (res.code === '200') {
          this.$message.success('操作成功');
          this.load(this.pageNum);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    save() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const method = this.form.id ? 'PUT' : 'POST';
          const url = this.form.id ? '/help/update' : '/help/add';
          this.$request({ url, method, data: this.form }).then(res => {
            if (res.code === '200') {
              this.$message.success('保存成功');
              this.closeFormDialog();
              this.load(1);
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum);
    },
    handleImgSuccess(response) {
      this.form.img = response.data;
    },
    handleImgError() {
      this.$message.error('上传失败，请重试');
    },
    load(pageNum) {
      this.pageNum = pageNum;
      this.$request.get('/help/selectPage', {
        params: { pageNum: this.pageNum, pageSize: this.pageSize },
      }).then(res => {
        if (res.code === '200') {
          this.tableData = res.data?.list || [];
          this.total = res.data?.total || 0;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>

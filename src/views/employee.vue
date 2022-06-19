<template>
  <div class="app-container">
    <el-table :data="dataList">
      <el-table-column label="预约人数" align="center" prop="tableSize" />
      <el-table-column label="预约手机号码" align="center" prop="mobile" />
      <el-table-column label="预约状态" align="center" prop="status" />
      <el-table-column
        label="预约日期"
        :formatter="dateFormatterReserver"
        align="center"
        prop="reserveAt"
        width="180"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        :formatter="dateFormatter"
        align="center"
        prop="createdAt"
        width="180"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="预约人数" prop="tableSize">
          <el-input v-model="form.tableSize" placeholder="请输入预约人数" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入预约手机号码" />
        </el-form-item>
        <el-form-item label="预约状态" prop="status" >
          <el-select v-model="form.status" placeholder="预约状态" :disabled ="isDisabled">
            <el-option label="ACTIVE" value="ACTIVE"></el-option>
            <el-option label="CANCEL" value="CANCEL"></el-option>
            <el-option label="COMPLETE" value="COMPLETE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约日期" prop="reserveAt">
          <el-date-picker
            v-model="form.reserveAt"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  commit,
  update,
  getReserveRecords,
  getRecordById,
} from "@/api/index.js";
import dayjs from "dayjs";
export default {
  methods: {
    getList() {
      getReserveRecords().then((res) => {
        if (res.data && res.data.code == 200) {
          this.dataList = res.data.data;
        }
      });
    },
    handleUpdate(row) {
      this.title = "修改预约";
      const id = row._id;
      getRecordById(id).then((res) => {
        this.open = true;
        this.isDisabled = false;
        this.form = res.data.data;
      });
    },
    handleAdd() {
      this.reset()
      this.open = true;
      this.title = "添加预约";
      this.isDisabled = true;
      this.form.status = 'ACTIVE'
    },
    cancel() {
      this.open = false;
    },
    reset() {
      this.form.tableSize = undefined;
      this.form.mobile = undefined;
      this.form.status = undefined;
    },
    submitForm: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form._id !== undefined) {
            update(this.form).then((res) => {
              this.$message.success("更新成功！");
            });
          } else {
            commit(this.form).then((res) => {
              if (
                res &&
                res.data &&
                res.data.code === 200 &&
                res.data.data &&
                res.data.data.message
              ) {
                this.$message.success(res.data.data.message);
              } else {
                this.$message.success("添加成功！");
              }
            });
          }
        }
      });
      // 重新刷新页面
      this.reset();
      this.open = false;
      this.getList();

    },
    dateFormatter(row) {
      return dayjs(row.createdAt).format("YYYY-MM-DD HH:mm:ss");
    },
     dateFormatterReserver(row) {
      return dayjs(row.reserveAt).format("YYYY-MM-DD HH:mm:ss");
    },
  },

  data() {
    return {
      dataList: [],
      title: "",
      form: {},
      rules: {
        tableSize: [
          { required: true, message: "预约人数不能为空", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "预约手机号码不能为空", trigger: "blur" },
        ],
        status: [
          { required: true, message: "预约状态不能为空", trigger: "blur" },
        ],
        reserveAt: [
          { required: true, message: "预约日期不能为空", trigger: "blur" },
        ],
      },
      // 是否显示弹出层
      open: false,
      isDisabled: true
    };
  },
  mounted() {
    this.getList();
  },
};
</script>
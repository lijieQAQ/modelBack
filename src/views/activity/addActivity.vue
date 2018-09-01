<template>
  <div class="app-container">
    <el-form ref="addForm" :model="form" :rules="rules" label-width="8rem" autoComplete="on">
      <el-form-item label="活动标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入活动标题"></el-input>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" autoComplete="on" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动简介" prop="introduction">
        <el-input v-model="form.introduction" autoComplete="on" type="textarea" placeholder="请输入活动简介"></el-input>
      </el-form-item>
      <el-form-item label="活动需要人数" prop="userNum">
        <el-input v-model="form.userNum" autoComplete="on" type="number" placeholder="请输入活动需要人数"></el-input>
      </el-form-item>
      <el-form-item label="活动地点" prop="address">
        <el-input v-model="form.address" autoComplete="on" type="text" placeholder="请输入活动地点"></el-input>
      </el-form-item>
      <el-form-item label="是否轮播" prop="isCarousel">
        <el-select v-model="form.isCarousel" autoComplete="on" placeholder="请选择是否轮播">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片" prop="coverPhoto">
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          :on-success="uploadSuccess"
          :on-remove="uploadRemove"
          :limit="1"
          :action="uploadPhotoUrl">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动价格(max)" prop="maxPricePoint">
        <el-input v-model="form.maxPricePoint" autoComplete="on" type="number" placeholder="请输入活动价格区间上限"></el-input>
      </el-form-item>
      <el-form-item label="活动价格(min)" prop="minPricePoint">
        <el-input v-model="form.minPricePoint" autoComplete="on" type="number" placeholder="请输入活动价格区间下限"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="beginDate">
            <el-date-picker type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.beginDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">&nbsp;&nbsp;-----&nbsp;&nbsp;</el-col>
        <el-col :span="11">
          <el-form-item prop="endDate">
            <el-date-picker type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.endDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <el-select v-model="form.type" autoComplete="on" placeholder="请选择活动类型">
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <quill-editor ref="myTextEditor" prop="content"
                    v-model="form.content"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
      <el-form-item class="formButton">
        <el-button type="primary" :loading="loading" @click.native.prevent="submit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import http from '../../api/http'
  import api from '../../api/api'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    data() {
      return {
        loading: false,
        form: {
          title: '',
          name: '',
          introduction: '',
          isCarousel: '',
          coverPhoto: '',
          userNum: '',
          address: '',
          maxPricePoint: '',
          minPricePoint: '',
          type: '',
          beginDate: '',
          endDate: '',
          content: ''
        },
        uploadPhotoUrl: '',
        rules: {
          title: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
          name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          introduction: [{ required: true, message: '请输入活动简介', trigger: 'blur' }],
          isCarousel: [{ required: true, message: '请选择是否轮播', trigger: 'blur' }],
          coverPhoto: [{ required: true, message: '请上传封面图片', trigger: 'blur' }],
          userNum: [{ required: true, message: '请输入活动需求人数', trigger: 'blur' }],
          address: [{ required: true, message: '请输入活动地址', trigger: 'blur' }],
          maxPricePoint: [{ required: true, message: '请输入最大活动价格', trigger: 'blur' }],
          minPricePoint: [{ required: true, message: '请输入最小活动价格', trigger: 'blur' }],
          type: [{ required: true, message: '请选择活动类型', trigger: 'blur' }],
          beginDate: [{ required: true, message: '请选择活动开始时间', trigger: 'blur' }],
          endDate: [{ required: true, message: '请选择活动结束时间', trigger: 'blur' }],
          content: [{ required: true, message: '请填入内容', trigger: 'blur' }]
        },
        name: '01-example'
      }
    },
    mounted() {
      this.uploadPhotoUrl = api.UPLOADPHOTO
    },
    components: {
      quillEditor
    },
    filters: {},
    created() {
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      uploadSuccess(data) {
        if (data.status === 'success') {
          this.form.coverPhoto = data.data
        }
      },
      uploadRemove() {
        this.form.coverPhoto = ''
      },
      submit() {
        // 表单验证方法
        const self = this
        this.loading = true
        this.$refs.addForm.validate(function(result) {
          if (result) {
            // 验证通过,调用module里的setUserInfo方法
            http.post(api.ADDACTIVITY, self.form).then((data) => {
              console.log(data)
              if (data.status === 'success') {
                self.form = {
                  title: '',
                  name: '',
                  introduction: '',
                  isCarousel: '',
                  coverPhoto: '',
                  userNum: '',
                  address: '',
                  maxPricePoint: '',
                  minPricePoint: '',
                  type: '',
                  beginDate: '',
                  endDate: '',
                  content: ''
                }
                self.loading = false
                self.$refs.upload.clearFiles()
                self.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } else {
                self.loading = false
                self.$message.error('添加错误')
              }
            })
          } else {
            self.loading = false
            return
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .quill-code {
    border: none;
    height: auto;
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
  .formButton {
    text-align: center;
    margin-top: 2%;
    button {
      width: 80%;
      margin-left: -8rem;
    }
  }
</style>

<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
      <el-form-item label="参数名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="参数值">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="参数单位">
        <el-select v-model="form.unit" placeholder="请选择参数单位">
          <el-option label="天" value="day"></el-option>
          <el-option label="月" value="mouth"></el-option>
          <el-option label="年" value="year"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button @click.native.prevent>取消</el-button>
      </el-form-item>
    </el-form>
  
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        unit:''
      }
    }
  },
  computed: {
    ...mapState({
      projects: state => state.activity.projects,
    })
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }

  }
}
</script>
<style lang="scss" src="./order-setadd.scss" scoped></style>

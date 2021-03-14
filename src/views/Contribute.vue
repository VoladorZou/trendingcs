<template>
    <div>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="editbreadnavi">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户投稿</el-breadcrumb-item>
  </el-breadcrumb>
        <Markdown/>
        </div>
</template>

<script>
import Markdown from '../components/Markdown'

export default {
    components: {
      Markdown
    },
    
}
</script>

<style>
.editbreadnavi{
    position: relative;
    left: 0%;
    margin-bottom: 20px !important; 
}
</style>
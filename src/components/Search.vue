<template>
<div>
    <div>
        <el-input class="search-input-navi" 
        placeholder="搜索"
        prefix-icon="el-icon-search"
        type="text"
        v-model="input">
        </el-input>
        </div>
</div>
</template>

<style scoped>
.search-input-navi /deep/ .el-input__inner{
  width: 260px;
  height: 30px;
  border-radius: 30px;
}
</style>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
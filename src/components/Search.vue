<template>
<div>
    <div>
        <el-input class="search-input" 
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="input">
        </el-input>
        </div>
</div>
</template>

<style>
.search-input /deep/ .el-input__inner{
  /* background-color: transparent; */
  width: 260px;
  height: 30px;
  border-radius: 20px;
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
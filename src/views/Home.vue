<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Navibar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navibar from './NavMenu/Navibar.vue'

export default {
  name: 'Home',
  components: {
    Navibar
  }
}
</script>

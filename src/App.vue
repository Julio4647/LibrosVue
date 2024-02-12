<template>
  <div id="app">
    <Navbar />
    <div class="page-content">
      <router-view></router-view>
      
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue';
import Breadcrumb from 'vue-2-breadcrumbs';

export default {
  name: 'App',
  components: {
    Navbar,
    Breadcrumb
  }
}
</script>

<style>
.page-content {
  margin-top: 20px;
}


.current-page {
  font-size: 18px;
  margin-top: 10px;
}
</style>

<template>
  <div class="index">
    <HeaderNav/>
    <leftnav/>
    <div class="rightContainer">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import HeaderNav from '../components/HeaderNav';
  import leftnav from '../components/LeftNav';
  export default {
      name: "index",
      components: {
        HeaderNav,
        leftnav
      }
    }
</script>

<style scoped>
  .index{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .rightContainer {
    position: relative;
    top: 0;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
    overflow: auto;
  }
</style>
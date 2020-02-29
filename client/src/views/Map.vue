<template>
  <div class="baidumap">
    <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
  </div>
  
</template>

<script>
  export default {
      name: "baidumap",
      data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 5
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
}
</script>

<style scoped>
  .bm-view {
  width: 70%;
  height: 500px;
}
</style>
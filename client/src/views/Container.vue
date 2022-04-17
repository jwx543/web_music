<template>
  <yin-header></yin-header>
  <router-view />
  <yin-current-play></yin-current-play>
  <yin-play-bar></yin-play-bar>
  <yin-scroll-top></yin-scroll-top>
  <yin-footer></yin-footer>
  <yin-audio></yin-audio>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import YinHeader from "@/components/layouts/Header.vue";
import YinCurrentPlay from "@/components/layouts/CurrentPlay.vue";
import YinPlayBar from "@/components/layouts/PlayBar.vue";
import YinScrollTop from "@/components/layouts/ScrollTop.vue";
import YinFooter from "@/components/layouts/Footer.vue";
import YinAudio from "@/components/layouts/Audio.vue";

const { proxy } = getCurrentInstance();

if (sessionStorage.getItem("dataStore")) {
  proxy.$store.replaceState(Object.assign( {}, proxy.$store.state, JSON.parse(sessionStorage.getItem("dataStore"))));
}

// 页面刷新时将 vuex 里的信息保存到 sessionStorage
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("dataStore", JSON.stringify(proxy.$store.state));
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

#app {
  @include layout(flex-start, stretch, column);
}
</style>

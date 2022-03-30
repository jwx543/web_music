<template>
    <div>
        <web-header></web-header>
        <web-aside></web-aside>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <web-audio></web-audio>
    </div>
</template>

<script>
import WebHeader from "../components/layout/WebHeader";
import WebAudio from "../components/layout/WebAudio";
import WebAside from "../components/layout/WebAside";
import _ctrEvent from "../utils/ctr-event";

export default {
    components: {
        WebHeader,
        WebAudio,
        WebAside
    },
    data(){
        return {
            collapse: false
        }
    },
    created () {
        _ctrEvent.$on('collapse', msg => {
            this.collapse = msg
        })
    }

}
</script>

<style scoped>

</style>
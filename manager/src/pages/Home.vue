<template>
    <div>
        <header></header>
        <aside></aside>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <audio></audio>
    </div>

</template>

<script>
import Header from "../components/layout/Header";
import Audio from "../components/layout/Audio";
import Aside from "../components/layout/Aside";
import _ctrEvent from "../utils/ctr-event";

export default {
    components: {
        Header,
        Audio,
        Aside
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
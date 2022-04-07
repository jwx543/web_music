<template>
    <div>
        <web-header></web-header>
        <web-aside></web-aside>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import WebHeader from "../components/layout/WebHeader";
import WebAside from "../components/layout/WebAside";
import _ctrEvent from "../utils/ctr-event";

export default {
    components: {
        WebHeader,
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
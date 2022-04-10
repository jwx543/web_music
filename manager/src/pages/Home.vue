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
import newPage from "../utils/newPage";

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
        newPage.$on('collapse', msg => {
            this.collapse = msg
        })
    }

}
</script>

<style scoped>

</style>
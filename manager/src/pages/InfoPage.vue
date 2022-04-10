<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <h3 style="margin: 20px 0">歌曲类型分布</h3>
                <div class="cav-info" style="background-color: #DADDD8">
                    <song-style></song-style>
                </div>
            </el-col>
            <el-col :span="12">
                <h3 style="margin: 20px 0">歌手国籍分布</h3>
                <div class="cav-info" style="background-color: #DADDD8">
                    <country-position></country-position>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <h3 style="margin: 20px 0">用户性别比例</h3>
                <div class="cav-info" style="background-color: #DADDD8">
                    <user-gender></user-gender>
                </div>
            </el-col>
            <el-col :span="12">
                <h3 style="margin: 20px 0">歌手性别比例</h3>
                <div class="cav-info" style="background-color: #DADDD8">
                    <singer-gender></singer-gender>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mixin} from "../mixins"
import {HttpManager} from "../api/index"
import SongStyle from "../components/charts/SongStyle";
import CountryPosition from "../components/charts/CountryPosition";
import UserGender from "../components/charts/UserGender";
import SingerGender from "../components/charts/SingerGender";

export default {
    components:{
        SongStyle,
        CountryPosition,
        UserGender,
        SingerGender
    },
    mixins: [mixin],
    data(){
        return {
            user: [],
            userCount: 0,
            songCount: 0,
            singerCount: 0,
            songListCount: 0
        }
    },
    // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted() {
        this.getUser()
        this.getSinger()
        this.getSong()
        this.getSongList()
    },
    methods: {
        getUser() {
            HttpManager.getAllUser().then(res => {
                this.userCount = res.length
            })
        },
        getSinger(){
            HttpManager.getAllSinger().then(res => {
                this.singerCount = res.length
            }).catch(err => {
                console.error(err)
            })
        },
        getSong(){
            HttpManager.getAllSong().then(res => {
                this.songCount = res.length
            }).catch(err => {
                console.error(err)
            })
        },
        getSongList () {
            HttpManager.getSongList().then(res => {
                this.songListCount = res.length
            }).catch(err => {
                console.error(err)
            })
        }
    }
}
</script>

<style scoped>

.cav-info {
    border-radius: 6px;
    overflow: hidden;
}

</style>
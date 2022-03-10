<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <div class="grid-num">{{userCount}}</div>
                            <div>用户总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                        <div class="grid-cont-right">
                            <div class="grid-num">{{songCount}}</div>
                            <div>歌曲总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-3">
                        <div class="grid-cont-right">
                            <div class="grid-num">{{singerCount}}</div>
                            <div>歌手数量</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-4">
                        <div class="grid-cont-right">
                            <div class="grid-num">{{songListCount}}</div>
                            <div>歌单数量</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <h3 style="margin-bottom: 20px">用户性别比例</h3>
                <div class="cav-info" style="background-color: white">
                    <ve-pie :data="userSex" :theme="optionsUserSex"></ve-pie>
                </div>
            </el-col>
            <el-col :span="12">
                <h3 style="margin-bottom: 20px">歌曲类型分布</h3>
                <div class="cav-info" style="background-color: white">
                    <ve-histogram :data="songStyle" :theme="optionsSongStyle"></ve-histogram>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <h3 style="margin: 20px 0">歌手性别比例</h3>
                <div class="cav-info" style="background-color: white">
                    <ve-pie :data="singerSex" :theme="optionsSex"></ve-pie>
                </div>
            </el-col>
            <el-col :span="12">
                <h3 style="margin: 20px 0">歌手国籍分布</h3>
                <div class="cav-info" style="background-color: white">
                    <ve-histogram :data="country" :theme="optionsCountry"></ve-histogram>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mixin} from "../mixins"
import {HttpManager} from "../api/index"

export default {
    mixins: [mixin],
    data(){

    },
    // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted() {
    },
    methods: {

    }
}
</script>

<style scoped>

</style>
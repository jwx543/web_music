<template>
    <div class="header">
        <div class="collapse-btn" @click="collapseChange">
            <i class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">{{musicName}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <div>
                    <el-badge :value=userCount class="item" type="primary">
                        <el-button size="small">用户数量</el-button>
                    </el-badge>
                    <el-badge :value=singerCount class="item" type="primary">
                        <el-button size="small">歌手数量</el-button>
                    </el-badge>
                    <el-badge :value=songCount class="item" type="primary">
                        <el-button size="small">歌曲数量</el-button>
                    </el-badge>
                    <el-badge :value=songListCount class="item" type="primary">
                        <el-button size="small">歌单数量</el-button>
                    </el-badge>
                </div>
                <div class="userAvator">
                    <img :src="userPic" />
                </div>
                <el-dropdown class="userName" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import _ctrEvent from "../../utils/ctr-event";
import {SIGN_IN, MUSICNAME} from "../../enums";
import {mixin} from "../../mixins";
import {HttpHandler} from "../../api";

export default {
    mixins: [mixin],
    data(){
        return{
            collapse: true,
            fullscreen: false,
            username: 'admin',
            userPic: require('../../assets/images/user.png'),
            musicName: MUSICNAME,
            userCount: 0,
            songCount: 0,
            singerCount: 0,
            songListCount: 0
        }
    },
    mounted() {
        if(document.body.clientWidth < 1500){
            this.collapseChange()
        }
        this.getUser()
        this.getSinger()
        this.getSong()
        this.getSongList()
    },
    methods: {
        handleCommand(command){
            if(command === 'loginOut'){
                this.routerManager(SIGN_IN, {path: SIGN_IN})
            }
        },
        collapseChange(){
            this.collapse = !this.collapse
            _ctrEvent.$emit('collapse', this.collapse)
        },
        getUser() {
            HttpHandler.getUserInfo().then(res => {
                this.userCount = res.length
            })
        },
        getSinger(){
            HttpHandler.getSinger().then(res => {
                this.singerCount = res.length
            }).catch(err => {
                console.error(err)
            })
        },
        getSong(){
            HttpHandler.getSong().then(res => {
                this.songCount = res.length
            }).catch(err => {
                console.error(err)
            })
        },
        getSongList () {
            HttpHandler.getSongList().then(res => {
                this.songListCount = res.length
            }).catch(err => {
                console.error(err)
            })
        }
    }
}
</script>

<style scoped>
.header {
    position: absolute;
    z-index: 100;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fef4a9;
    background: #3b9a9c;
    box-shadow: 0 0 8px 2px #3b9a9c;
}

.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}

.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.userName {
    margin-left: 10px;
}

.userAvator {
    margin-left: 20px;
}

.userAvator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: #78fee0;
    cursor: pointer;
}

.item {
    margin-top: 10px;
    margin-right: 40px;

}
.item button{
    background: #3b9a9c;
    color: #fef4a9;
    border-color: #4bc2c5;
}

</style>
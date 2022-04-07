<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChange">
            <i class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">{{musicName}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img :src="userPic" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
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

export default {
    mixins: [mixin],
    data(){
        return{
            collapse: true,
            fullscreen: false,
            username: 'admin',
            userPic: require('../../assets/images/user.png'),
            musicName: MUSICNAME
        }
    },
    mounted() {
        if(document.body.clientWidth < 1500){
            this.collapseChange()
        }
    },
    methods: {
        handleCommand(command){
            if(command === 'loginout'){
                this.routerManager(SIGN_IN, {path: SIGN_IN})
            }
        },
        collapseChange(){
            this.collapse = !this.collapse
            _ctrEvent.$emit('collapse', this.collapse)
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

.user-name {
    margin-left: 10px;
}

.user-avator {
    margin-left: 20px;
}

.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: #78fee0;
    cursor: pointer;
}

</style>
<template>
    <div class="loginLayout">
        <div class="softTitle">{{musicName}}</div>
        <div style="margin: 20px;"></div>
        <div class="loginForm">
            <el-form :label-position="labelPosition" label-width="80px"
                     :model="ruleForm" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password"
                    placeholder="password" @keyup.enter="submitForm"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="loginButton">
            <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
    </div>
</template>

<script>

import {mixin} from "../mixins"
import {HttpManager} from "../api";
import {INFO, MUSICNAME} from "../enums";

export default {
    mixins: [mixin],
    data: function (){
        return{
            labelPosition: 'right',
            musicName: MUSICNAME,
            ruleForm:{
                username: 'admin',
                password: '123'
            },
            rules:{
                username: [{
                    required: true, message: '请输入用户名', trigger: 'blur'
                }],
                password: [{
                    required: true, message: '请输入密码', trigger: 'blur'
                }]
            }
        }
    },
    methods:{
        submitForm(){
            let params = new URLSearchParams()
            params.append('name', this.ruleForm.username)
            params.append('password', this.ruleForm.password)

            HttpManager.getLoginStatus(params).then(res => {
                if(res.code === 1){
                    this.routerManager(INFO, {path: INFO})
                    this.$notify({
                        title: '欢迎回来',
                        type: 'success'
                    })
                }else{
                    this.$notify({
                        title: '登录失败',
                        type:'error'
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        }
    }
}
</script>

<style scoped>

</style>

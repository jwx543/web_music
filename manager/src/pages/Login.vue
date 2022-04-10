<template>
    <div class="login-layout">
        <div class="login-title">{{musicName}}</div>
        <div class="login-component">
            <el-form :label-position="labelPosition" label-width="60px"
                     :model="ruleForm" :rules="rules">
                <el-form-item label="用户名">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"
                        @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button @click="cancelForm">取消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>

import {mixin} from "../mixins"
import {HttpHandler} from "../api";
import {INFO, MUSICNAME} from "../enums";

export default {
    mixins: [mixin],
    data: function (){
        return{
            labelPosition: 'left',
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
        cancelForm(){
            this.ruleForm.username = ''
            this.ruleForm.password = ''
        },
        submitForm(){
            let params = new URLSearchParams()
            params.append('name', this.ruleForm.username)
            params.append('password', this.ruleForm.password)

            HttpHandler.getStatus(params).then(res => {
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

.login-layout {
    position: relative;
    background: url('../assets/images/login-background.png') fixed center;
    background-size: cover;
    width: 100%;
    height: 100%;
}

.login-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #78fee0;
}

.login-component {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #EAEAEA;
}

.login-btn {
    text-align: center;
    width: 100%;
    height: 36px;
}

</style>

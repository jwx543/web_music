<template>
    <div class="table">
        <div class="container">
            <div class="table-box">
                <el-button type="primary" size="mini" class="handle-del mr10" @click="deleteAll">批量删除</el-button>
                <el-input v-model="search_word" size="mini" placeholder="搜索用户" class="table-input mr10"></el-input>
                <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加新用户</el-button>
            </div>
            <el-table :data="data" border size="mini" style="width: 100%" ref="multipleTable" height="550px" @selection-change="deleteMultiple">
                <el-table-column type="selection" width="40" align="center"></el-table-column>
                <el-table-column label="用户名" prop="username" width="80" align="center"></el-table-column>
                <el-table-column label="性别" width="50" align="center">
                    <template v-slot="scope">
                        <div>{{changeGender(scope.row.sex) }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="手机号码" prop="phoneNum" width="120" align="center"></el-table-column>
                <el-table-column label="邮箱" prop="email" width="120" align="center"></el-table-column>
                <el-table-column label="生日" width="120" align="center">
                    <template v-slot="scope">
                        <div>{{getBirth(scope.row.birth)}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="introduction" label="签名" align="center"></el-table-column>
                <el-table-column prop="location" label="地区" width="80" align="center"></el-table-column>
                <el-table-column label="收藏" width="80" align="center">
                    <template  v-slot="scope">
                        <el-button size="mini" @click="getCollect(data[scope.$index].id)">收藏</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template v-slot="scope">
                        <el-button size="mini" @click="doEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="DeleteById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @current-change="handleChange"
                    background
                    layout="total, prev, pager, next"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="tableData.length">
                </el-pagination>
            </div>
        </div>

        
        <el-dialog title="添加用户" :visible.sync="centerDialogVisible" width="400px" center>
            <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username" size="mini">
                    <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" size="mini">
                    <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="性别" size="mini">
                    <el-radio-group v-model="registerForm.sex">
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="1">男</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机" prop="phoneNum" size="mini">
                    <el-input  placeholder="手机" v-model="registerForm.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" size="mini">
                    <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birth" size="mini">
                    <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="签名" prop="introduction" size="mini">
                    <el-input  type="textarea" placeholder="签名" v-model="registerForm.introduction" ></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="location" size="mini">
                    <el-select v-model="registerForm.location" placeholder="地区">
                        <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="用户名" size="mini">
                    <el-input v-model="form.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="密码" size="mini">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="性别" size="mini">
                    <el-radio-group v-model="form.sex">
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="1">男</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机" size="mini">
                    <el-input v-model="form.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" size="mini">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birth" size="mini">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="签名" size="mini">
                    <el-input v-model="form.introduction"></el-input>
                </el-form-item>
                <el-form-item label="地区" size="mini">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveEdit">确 定</el-button>
      </span>
        </el-dialog>


        <delete-dialog :delVisible="delVisible" @deleteRow="deleteRow" @cancelRow="delVisible = $event"></delete-dialog>


    </div>
</template>

<script>
import {myFunction} from "../utils";
import {HttpHandler} from "../api";
import {RULES, AREA, SAVE} from "../constants";
import DeleteDialog from "../components/dialog/DeleteDialog";

export default {
    name: "UserPage",
    mixins: [myFunction],
    components:{
        DeleteDialog
    },
    data(){
        return{
            registerForm:{
                username: '',
                password: '',
                sex: '',
                phoneNum: '',
                email: '',
                birth: '',
                introduction: '',
                location: ''
            },
            form: { // 记录编辑的信息
                id: '',
                username: '',
                password: '',
                sex: '',
                phoneNum: '',
                email: '',
                birth: '',
                introduction: '',
                location: '',
                createTime: '',
                updateTime: ''
            },
            cities: AREA,
            rules: RULES,
            userPic: '/images/user.png',
            tableData: [],
            Temp: [],
            is_search: false,
            multipleSelection: [],
            centerDialogVisible: false,
            editVisible: false,
            delVisible: false,
            search_word: '',
            pageSize: 5,
            currentPage: 1,
            idx: -1
        }
    },
    computed: {
        data () {
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    watch:{
        search_word: function (){
            if(this.search_word === ''){
                this.tableData = this.Temp
            }else{
                this.tableData = []
                for(let item of this.Temp){
                    if(item.username.includes(this.search_word)){
                        this.tableData.push(item)
                    }
                }
            }
        }
    },
    created() {
        this.getData()
    },
    methods:{
        handleChange(val){
            this.currentPage = val
        },

        getData(){
            this.Temp = []
            this.tableData = []
            HttpHandler.getUserInfo().then((res) => {
                this.tableData = res
                this.Temp = res
                this.currentPage = 1
            })
        },

        getCollect (id) {
            this.routerHandler(SAVE, {path: SAVE, query: { id }})
        },

        addUser () {
            let datetime = this.getTime(this.registerForm.birth)
            let params = new URLSearchParams()
            params.append('username', this.registerForm.username)
            params.append('password', this.registerForm.password)
            params.append('sex', this.registerForm.sex)
            params.append('phone_num', this.registerForm.phoneNum)
            params.append('email', this.registerForm.email)
            params.append('birth', datetime)
            params.append('introduction', this.registerForm.introduction)
            params.append('location', this.registerForm.location)
            params.append('avator', this.userPic)
            HttpHandler.addUser(params)
                .then(res => {
                    if (res.code === 1) {
                        this.getData()
                        this.registerForm = {}
                        this.$notify({
                            title: '添加成功',
                            type: 'success'
                        })
                    } else {
                        this.$notify({
                            title: '操作失败',
                            type: 'error'
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                })
            this.centerDialogVisible = false
        },

        doEdit (row) {
            this.idx = row.id
            this.form = {
                id: row.id,
                username: row.username,
                password: row.password,
                sex: row.sex,
                phoneNum: row.phoneNum,
                email: row.email,
                birth: row.birth,
                introduction: row.introduction,
                location: row.location,
                avator: row.avator
            }
            this.editVisible = true
        },

        saveEdit () {
            let datetime = this.getTime(new Date(this.form.birth))
            let params = new URLSearchParams()
            params.append('id', this.form.id)
            params.append('username', this.form.username)
            params.append('password', this.form.password)
            params.append('sex', this.form.sex)
            params.append('phone_num', this.form.phoneNum)
            params.append('email', this.form.email)
            params.append('birth', datetime)
            params.append('introduction', this.form.introduction)
            params.append('location', this.form.location)
            HttpHandler.updateUser(params).then(res => {
                if (res.code === 1) {
                    this.getData()
                    this.$notify({
                        title: '修改成功',
                        type: 'success'
                    })
                } else {
                    this.$notify({
                        title: '修改失败',
                        type: 'error'
                    })
                }
            }).catch(err => {
                console.error(err)
            })
            this.editVisible = false
        },

        deleteRow () {
            HttpHandler.deleteUser(this.idx)
                .then(res => {
                    if (res) {
                        this.getData()
                        this.$notify({
                            title: '删除成功',
                            type: 'success'
                        })
                    } else {
                        this.$notify({
                            title: '操作失败',
                            type: 'error'
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
            this.delVisible = false
        }
    }
}
</script>

<style scoped>
.table-box {
    margin-bottom: 20px;
    font-size: 12px;
}

.table-input {
    width: 150px;
    display: inline-block;
}

.pagination {
    display: flex;
    justify-content: center;
}
</style>
<template>
    <div class="table">
        <div class="container">
            <div class="table-box">
                <el-button class="handle-del mr10" type="primary" size="mini" @click="deleteAll">批量删除</el-button>
                <el-input
                    v-model="search_name"
                    class="search-input mr10"
                    size="mini"
                    placeholder="搜索歌手">
                </el-input>
                <el-button
                    type="primary"
                    size="mini"
                    @click="centerDialogVisible = true">添加歌手</el-button>
            </div>

            <el-table ref="multipleTable" size="mini" border style="width: 100%" height="550px" :data="data" @selection-change="deleteMultiple">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="照片" width="110" align="center">
                    <template v-slot="scope">
                        <div class="singer-pic">
                            <img :src="getUrl(scope.row.pic)" alt="" style="width: 100%;"/>
                        </div>
                        <el-upload
                            class="upload-demo"
                            :action="updateUrl(scope.row.id)"
                            :show-file-list="false"
                            :on-success="UpdatePic"
                        >
                            <el-button size="mini">更新照片</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
                <el-table-column label="性别" width="100" align="center">
                    <template v-slot="scope">
                        <div>{{changeGender(scope.row.sex) }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="生日" width="150" align="center">
                    <template v-slot="scope">
                        <div>{{getBirth(scope.row.birth) }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="location" label="地区" width="100" align="center"></el-table-column>
                <el-table-column label="简介" width="100" align="center">
                    <template v-slot="scope">
                        <el-button size="mini" @click="showInfo(scope.row)">简介</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="歌曲管理" width="100" align="center">
                    <template v-slot="scope">
                        <el-button size="mini" @click="editSong(scope.row.id, scope.row.name)">歌曲</el-button>
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
                    background
                    layout="total, prev, pager, next"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="tableData.length"
                    @current-change="getCurrentChange">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="添加歌手" :visible.sync="centerDialogVisible" width="400px" center>
            <el-form
                class="demo-ruleForm"
                :model="registerForm"
                status-icon
                ref="registerForm"
                label-width="80px"
            >
                <el-form-item prop="name" label="歌手名" size="mini">
                    <el-input v-model="registerForm.name" placeholder="歌手名"></el-input>
                </el-form-item>
                <el-form-item label="性别" size="mini">
                    <el-radio-group v-model="registerForm.gender">
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">组合</el-radio>
                        <el-radio :label="3">不明</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="location" label="故乡" size="mini">
                    <el-input v-model="registerForm.location" placeholder="故乡"></el-input>
                </el-form-item>
                <el-form-item prop="birth" label="出生" size="mini">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="registerForm.birth"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item prop="introduction" label="歌手介绍" size="mini">
                    <el-input v-model="registerForm.introduction" type="textarea" placeholder="歌手介绍"></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
        <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="add_singer">确 定</el-button>
      </span>
        </el-dialog>

        <el-dialog title="简介" :visible.sync="infoVisible" width="400px">
            <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="this.infoData">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini"  @click="infoVisible = false">关 闭</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="歌手" size="mini">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" size="mini">
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">组合</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日" size="mini">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="地区" size="mini">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="简介" size="mini">
                    <el-input type="textarea" v-model="form.introduction"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini"  @click="editVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <delete-dialog :delVisible="delVisible" @deleteRow="deleteRow" @cancelRow="delVisible = $event"></delete-dialog>
    </div>
</template>

<script>
import { myFunction } from '../utils'
import { HttpHandler } from '../api/index'
import { SONG } from '../constants'
import DeleteDialog from "../components/dialog/DeleteDialog";

export default {
    name: 'SingerPage',
    mixins: [myFunction],
    components: {
        DeleteDialog
    },
    data () {
        return {
            registerForm: {
                name: '',
                gender: '',
                birth: '',
                location: '',
                introduction: ''
            },
            tableData: [],
            Temp: [],
            multipleSelection: [],
            centerDialogVisible: false,
            editVisible: false,
            infoVisible: false,
            delVisible: false,
            search_name: '',
            form: {
                id: '',
                name: '',
                gender: '',
                pic: '',
                birth: '',
                location: '',
                introduction: ''
            },
            pageSize: 10,
            currentPage: 1,
            idx: -1,
            infoData: ''
        }
    },
    computed: {
        data () {
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    watch: {
        search_name: function () {
            if (this.search_name === '') {
                this.tableData = this.Temp
            } else {
                this.tableData = []
                for (let item of this.Temp) {
                    if (item.name.includes(this.search_name)) {
                        this.tableData.push(item)
                    }
                }
            }
        }
    },
    created () {
        this.getData()
    },
    methods: {
        getCurrentChange (val) {
            this.currentPage = val
        },

        showInfo(row){
            this.infoVisible = true;
            this.infoData = row.introduction
        },

        doEdit (row) {
            this.editVisible = true
            let datetime = row.birth
            this.idx = row.id
            this.form = {
                id: row.id,
                name: row.name,
                gender: row.sex,
                birth: datetime,
                location: row.location,
                pic: row.pic,
                introduction: row.introduction
            }
        },

        saveEdit () {
            let datetime = this.getTime(new Date(this.form.birth))
            let params = new URLSearchParams()
            params.append('id', this.form.id)
            params.append('name', this.form.name)
            params.append('sex', this.form.gender)
            params.append('pic', this.form.pic)
            params.append('birth', datetime)
            params.append('location', this.form.location)
            params.append('introduction', this.form.introduction)
            HttpHandler.updateSinger(params)
                .then(res => {
                    if (res.code === 1) {
                        this.getData()
                        this.$notify({
                            title: '编辑成功',
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
            this.editVisible = false
        },

        updateUrl (id) {
            return `${this.$store.state.HOST}/singer/avatar/update?id=${id}`
        },

        add_singer () {
            let datetime = this.getTime(this.registerForm.birth)
            let params = new URLSearchParams()
            params.append('name', this.registerForm.name)
            params.append('sex', this.registerForm.gender)
            params.append('birth', datetime)
            params.append('location', this.registerForm.location)
            params.append('pic', '/images/singerPic/hhh.jpg')
            params.append('introduction', this.registerForm.introduction)
            HttpHandler.addSinger(params)
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

        getData () {
            this.Temp = []
            this.tableData = []
            HttpHandler.getSinger().then(res => {
                this.Temp = res
                this.tableData = res
                this.currentPage = 1
            })
        },

        deleteRow () {
            HttpHandler.deleteSinger(this.idx)
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
                .catch(err => {
                    console.error(err)
                })
            this.delVisible = false
        },

        editSong (id, name) {
            this.routerHandler(SONG, {path: SONG, query: {id: id, name: name}})
        }



    }
}
</script>

<style scoped>
.table-box {
    margin-bottom: 20px;
}

.singer-pic {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
}

.search-input {
    width: 150px;
    display: inline-block;
}

.pagination {
    display: flex;
    justify-content: center;
}
</style>

<template>
    <div class="table">
        <div class="container">
            <div class="table-box">
                <el-button type="primary" size="mini" class="handle-del mr10" @click="deleteAll">批量删除</el-button>
                <el-input v-model="search_word" size="mini" placeholder="筛选关键词" class="table-input mr10"></el-input>
                <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加歌单</el-button>
            </div>
            <el-table :data="data" border size="mini" style="width: 100%" height="550px" ref="multipleTable" @selection-change="deleteMultiple">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="歌单图片" width="100" align="center">
                    <template v-slot="scope">
                        <img :src="getUrl(scope.row.pic)" alt="" style="width: 80px;"/>
                        <el-upload
                            class="upload-demo"
                            :action="updateUrl(scope.row.id)"
                            :show-file-list="false"
                            :on-success="UpdatePic"
                        >
                            <el-button size="mini">更新图片</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" width="300" align="center"></el-table-column>
                <el-table-column label="简介" width="100" align="center">
                    <template v-slot="scope">
                        <el-button size="mini" @click="showInfo(scope.row)">简介</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="风格" width="150" align="center">
                    <template v-slot="scope">
                        <div>{{ scope.row.style }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="内容" width="80" align="center">
                    <template  v-slot="scope">
                        <el-button size="mini" @click="getContent(data[scope.$index].id)">内容</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="评论" width="80" align="center">
                    <template  v-slot="scope">
                        <el-button size="mini" @click="getComment(data[scope.$index].id)">评论</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template v-slot="scope">
                        <el-button
                            size="mini"
                            @click="doEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="DeleteById(scope.row.id)">删除
                        </el-button>
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

        <el-dialog title="添加歌单" :visible.sync="centerDialogVisible" width="400px" center>
            <el-form :model="registerForm" status-icon ref="registerForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="歌单名" prop="title" size="mini">
                    <el-input v-model="registerForm.title" placeholder="歌单名"></el-input>
                </el-form-item>
                <el-form-item label="歌单介绍" prop="introduction" size="mini">
                    <el-input v-model="registerForm.introduction" placeholder="歌单介绍"></el-input>
                </el-form-item>
                <el-form-item label="风格" prop="style" size="mini">
                    <el-input v-model="registerForm.style" placeholder="风格"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="add_songList">确 定</el-button>
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
            <el-form ref="form" :model="form" label-width="40px">
                <el-form-item label="标题" size="mini">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="风格" size="mini">
                    <el-input v-model="form.style"></el-input>
                </el-form-item>
                <el-form-item label="简介" size="mini">
                    <el-input  type="textarea" :rows="10" v-model="form.introduction"></el-input>
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
import { myFunction } from '../utils'
import { HttpHandler } from '../api/index'
import { LIST_CONTENT, COMMENT } from '../constants'
import DeleteDialog from "../components/dialog/DeleteDialog";

export default {
    name: 'SongListPage',
    mixins: [myFunction],
    components: {
        DeleteDialog
    },
    data () {
        return {
            tableData: [],
            Temp: [],
            registerForm: {
                title: '',
                introduction: '',
                style: ''
            },
            form: {
                id: '',
                pic: '',
                title: '',
                introduction: '',
                style: ''
            },
            multipleSelection: [],
            centerDialogVisible: false,
            delVisible: false,
            editVisible: false,
            infoVisible: false,
            infoData: '',
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
    watch: {
        search_word: function () {
            if (this.search_word === '') {
                this.tableData = this.Temp
            } else {
                this.tableData = []
                for (let item of this.Temp) {
                    if (item.title.includes(this.search_word)) {
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

        showInfo(row){
            this.infoVisible = true;
            this.infoData = row.introduction
        },

        handleChange (val) {
            this.currentPage = val
        },

        updateUrl (id) {
            return `${this.$store.state.HOST}/songList/images/update?id=${id}`
        },

        doEdit (row) {
            this.idx = row.id
            this.form = {
                id: row.id,
                pic: row.pic,
                title: row.title,
                introduction: row.introduction,
                style: row.style
            }
            this.editVisible = true
        },

        saveEdit () {
            let params = new URLSearchParams()
            params.append('id', this.form.id)
            params.append('pic', this.form.pic)
            params.append('title', this.form.title)
            params.append('introduction', this.form.introduction)
            params.append('style', this.form.style)
            HttpHandler.updateSongList(params)
                .then(res => {
                    if (res.code === 1) {
                        this.$notify({
                            title: '编辑成功',
                            type: 'success'
                        })
                        this.getData()
                    } else {
                        this.$notify({
                            title: '编辑失败',
                            type: 'error'
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                })
            this.editVisible = false
        },

        getContent (id) {
            this.routerHandler(LIST_CONTENT, { path: LIST_CONTENT, query: { id } })
        },

        getComment (id) {
            this.routerHandler(COMMENT, { path: COMMENT, query: { id, type: 1 } })
        },

        add_songList () {
            let params = new URLSearchParams()
            params.append('pic', '/images/songListPic/123.jpg')
            params.append('title', this.registerForm.title)
            params.append('introduction', this.registerForm.introduction)
            params.append('style', this.registerForm.style)
            HttpHandler.addSongList(params).then(res => {
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
            }).catch(err => {
                console.error(err)
            })
            this.centerDialogVisible = false
        },

        getData () {
            this.Temp = []
            this.tableData = []
            HttpHandler.getSongList().then((res) => {
                this.Temp = res
                this.tableData = res
                this.currentPage = 1
            })
        },

        deleteRow () {
            HttpHandler.deleteSongList(this.idx)
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
        }
    }
}
</script>

<style scoped>
.table-box {
    margin-bottom: 20px;
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

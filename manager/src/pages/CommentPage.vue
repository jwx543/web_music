<template>
    <div class="table">
        <div class="container">
            <div class="table-box">
                <el-button type="primary" size="mini" class="handle-del mr10" @click="deleteAll">批量删除</el-button>
                <el-input v-model="select_word" size="mini" placeholder="搜索" class="table-input mr10"></el-input>
            </div>
            <el-table
                :data="tableData"
                size="mini"
                border
                style="width: 100%"
                ref="multipleTable"
                @selection-change="deleteMultiple"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="name" label="用户"></el-table-column>
                <el-table-column prop="content" label="评论内容"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template v-slot="scope">
                        <el-button size="mini" type="danger" @click="DeleteById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <delete-dialog :delVisible="delVisible" @deleteRow="deleteRow" @cancelRow="delVisible = $event"></delete-dialog>
    </div>
</template>

<script>
import { myFunction } from '../utils'
import { HttpHandler } from '../api/index'
import DeleteDialog from "../components/dialog/DeleteDialog";

export default {
    name: 'CommentPage',
    mixins: [myFunction],
    components: {
        DeleteDialog
    },
    data () {
        return {
            multipleSelection: [],
            tableData: [],
            tempDate: [],
            delVisible: false,
            editVisible: false,
            select_word: '',
            form: {
                songListId: '',
                id: '',
                content: '',
                type: '',
                songId: '',
                userId: '',
                up: ''
            },
            idx: -1
        }
    },
    watch: {
        select_word: function () {
            if (this.select_word === '') {
                this.tableData = this.tempDate
            } else {
                this.tableData = []
                for (let item of this.tempDate) {
                    if (item.name.includes(this.select_word)) {
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

        doEdit (row) {
            this.idx = row.id
            this.form = {
                id: row.id,
                songListId: row.songListId,
                songId: row.songId,
                content: row.content,
                userId: row.userId,
                type: row.type,
                up: row.up
            }
            this.editVisible = true
        },

        saveEdit () {
            let params = new URLSearchParams()
            params.append('songId', this.form.songId === null ? '' : this.form.songId)
            params.append('songListId', this.form.songId === null ? '' : this.form.songListId)
            params.append('id', this.form.id)
            params.append('userId', this.form.userId)
            params.append('content', this.form.content)
            params.append('type', this.form.type)
            params.append('up', this.form.up)
            HttpHandler.updateComment(params)
                .then(res => {
                    if (res.code === 1) {
                        this.getData()
                        this.$notify({
                            title: '编辑成功',
                            type: 'success'
                        })
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

        getUsers (id, item) {
            HttpHandler.getUserId(id)
                .then(res => {
                    let o = item
                    o.name = res[0].username
                    this.tableData.push(o)
                    this.tempDate.push(o)
                })
                .catch(err => {
                    console.error(err)
                })
        },

        getData () {
            this.tableData = []
            this.tempDate = []
            let promise
            if (this.$route.query.type === 0) {
                promise = HttpHandler.getCommentSongId(this.$route.query.id)
            } else if (this.$route.query.type === 1) {
                promise = HttpHandler.getCommentSongListId(this.$route.query.id)
            }
            console.log('promise', promise)
            promise.then(res => {
                for (let item of res) {
                    this.getUsers(item.userId, item)
                }
            })
        },

        deleteRow () {
            HttpHandler.deleteComment(this.idx)
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
</style>

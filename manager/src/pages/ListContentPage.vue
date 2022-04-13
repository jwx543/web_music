<template>
    <div class="table">
        <div class="container">
            <div class="table-box">
                <el-button type="primary" size="mini" class="handle-del mr10" @click="deleteAll">批量删除</el-button>
                <el-input v-model="search_word" size="mini" placeholder="搜索" class="table-input mr10"></el-input>
                <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加歌曲</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                size="mini"
                style="width: 100%"
                ref="multipleTable"
                @selection-change="deleteMultiple"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="name" label="歌手-歌曲"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template v-slot="scope">
                        <el-button size="small" type="danger" @click="DeleteById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center>
            <el-form
                :model="registerForm"
                status-icon
                ref="registerForm"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item prop="singerName" label="歌手名字" size="mini">
                    <el-input v-model="registerForm.singerName" placeholder="歌手名字"></el-input>
                </el-form-item>
                <el-form-item prop="songName" label="歌曲名字" size="mini">
                    <el-input v-model="registerForm.songName" placeholder="歌曲名字"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="getSongById">确 定</el-button>
            </span>
        </el-dialog>

        <delete-dialog :delVisible="delVisible" @deleteRow="deleteRow" @cancelRow="delVisible = $event"></delete-dialog>
    </div>
</template>

<script>
import { myFunction } from '../utils'
import { HttpHandler } from '../api/index'
import DeleteDialog from "../components/dialog/DeleteDialog";

export default {
    name: 'ListContentPage',
    mixins: [myFunction],
    components: {
        DeleteDialog
    },
    data () {
        return {
            delVisible: false,
            Temp: [],
            multipleSelection: [],
            registerForm: {
                singerName: '',
                songName: ''
            },
            tableData: [],
            centerDialogVisible: false,
            editVisible: false,
            search_word: '',
            idx: -1
        }
    },
    watch: {
        search_word: function () {
            if (this.search_word === '') {
                this.tableData = this.Temp
            } else {
                this.tableData = []
                for (let item of this.Temp) {
                    if (item.name.includes(this.search_word)) {
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

        addSong (id) {
            let params = new URLSearchParams()
            params.append('songId', id)
            params.append('songListId', this.$route.query.id)
            HttpHandler.addListSong(params)
                .then(res => {
                    if (res.code === 1) {
                        this.getData()
                        this.$notify({
                            title: '添加成功',
                            type: 'success'
                        })
                    } else {
                        this.$notify({
                            title: '添加失败',
                            type: 'error'
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                })
            this.centerDialogVisible = false
        },

        getSong (id) {
            HttpHandler.getSongId(id)
                .then(res => {
                    this.tableData.push(res[0])
                    this.Temp.push(res[0])
                })
                .catch(err => {
                    console.error(err)
                })
        },

        getSongById () {
            const id = this.registerForm.singerName + '-' + this.registerForm.songName;
            HttpHandler.getSongSingerName(id)
                .then(res => {
                    this.addSong(res[0].id)
                })
        },

        getData () {
            this.Temp = []
            this.tableData = []
            HttpHandler.getListSongSongId(this.$route.query.id)
                .then(res => {
                    console.log(res)
                    for (let item of res) {
                        this.getSong(item.songId)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },

        deleteRow () {
            HttpHandler.deleteListSong(this.idx)
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

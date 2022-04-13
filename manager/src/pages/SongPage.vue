<template>
    <div class="table">
        <div class="container">
            <div class="table-box">
                <el-input
                    v-model="search_name"
                    size="mini"
                    placeholder="筛选关键词"
                    class="search-input mr10"></el-input>
                <el-button
                    type="primary"
                    size="mini"
                    class="handle-del mr10"
                    @click="deleteAll">批量删除</el-button>
            </div>

            <el-table :data="data" size="mini" border style="width: 100%" ref="multipleTable" height="550px" @selection-change="deleteMultiple">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="单曲封面" width="110" align="center">
                    <template v-slot="scope">
                        <div class="song-pic">
                            <img :src="getUrl(scope.row.pic)" alt="" style="width: 100%;"/>
                        </div>
                        <el-upload
                            class="upload-demo"
                            :action="updateUrl(scope.row.id)"
                            :show-file-list="false"
                            :on-success="UpdatePic"
                        >
                            <el-button size="mini">更新封面</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column label="歌手-歌名" prop="name" width="150" align="center"></el-table-column>
                <el-table-column label="专辑" prop="introduction" width="150" align="center"></el-table-column>
                <el-table-column label="歌词" width="100" align="center">
                    <template v-slot="scope">
                        <el-button size="mini" @click="showLyric(scope.row)">歌词</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="资源更新" width="100" align="center">
                    <template v-slot="scope">
                        <el-upload
                            class="upload-demo change"
                            :action="uploadSongUrl(scope.row.id)"
                            :show-file-list="false"
                            :on-success="handleSongSuccess"
                            :before-upload="beforeSongUpload">
                            <el-button size="mini">更新歌曲</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column label="评论" width="80" align="center">
                    <template  v-slot="scope">
                        <el-button size="mini" @click="getComment(data[scope.$index].id)">评论</el-button>
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

        <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="歌手-歌曲" size="mini">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="简介" size="mini">
                    <el-input v-model="form.introduction"></el-input>
                </el-form-item>
                <el-form-item label="歌词" size="mini">
                    <el-input  type="textarea" :rows="10" v-model="form.lyric"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveEdit">确 定</el-button>
      </span>
        </el-dialog>

        <el-dialog title="歌词" :visible.sync="lyricVisible" width="400px">
            <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="this.lyricVisibleData">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini"  @click="lyricVisible = false">关 闭</el-button>
            </span>
        </el-dialog>

        <delete-dialog :delVisible="delVisible" @deleteRow="deleteRow" @cancelRow="delVisible = $event"></delete-dialog>
    </div>
</template>

<script>
import { myFunction } from '../utils'
import { COMMENT } from '../constants'
import { HttpHandler } from '../api/index'
import DeleteDialog from "../components/dialog/DeleteDialog";

export default {
    name: 'SongPage',
    mixins: [myFunction],
    components: {
        DeleteDialog
    },
    data () {
        return {
            tableData: [],
            Temp: [],
            singerId: '',
            singerName: '',
            registerForm: {
                name: '',
                singerName: '',
                introduction: '',
                lyric: ''
            },
            multipleSelection: [],
            centerDialogVisible: false,
            lyricVisible: false,
            lyricVisibleData: '',
            editVisible: false,
            delVisible: false,
            search_name: '',
            form: {
                id: '',
                singerId: '',
                name: '',
                introduction: '',
                pic: '',
                lyric: '',
                url: '',
                createTime: '',
                updateTime: ''
            },
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
        this.singerId = this.$route.query.id
        this.singerName = this.$route.query.name
        this.getData()
    },
    methods: {

        handleChange (val) {
            this.currentPage = val
        },

        showLyric(row){
          this.lyricVisible = true;
          this.lyricVisibleData = row.lyric
        },

        updateUrl (id) {
            return `${this.$store.state.HOST}/song/images/update?id=${id}`
        },

        uploadSongUrl (id) {
            return `${this.$store.state.HOST}/song/url/update?id=${id}`
        },

        doEdit (row) {
            this.idx = row.id
            this.form = {
                id: row.id,
                singerId: row.singerId,
                name: row.name,
                introduction: row.introduction,
                createTime: row.createTime,
                updateTime: row.updateTime,
                pic: row.pic,
                lyric: row.lyric,
                url: row.url
            }
            this.editVisible = true
        },

        saveEdit () {
            let params = new URLSearchParams()
            params.append('id', this.form.id)
            params.append('name', this.form.name)
            params.append('singerId', this.form.singerId)
            params.append('introduction', this.form.introduction)
            params.append('lyric', this.form.lyric)
            HttpHandler.updateSong(params)
                .then(res => {
                    if (res) {
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

        beforeSongUpload (file) {
            const fileMsg = file.name.substring(file.name.lastIndexOf('.') + 1);
            const extension = fileMsg === 'mp3'
            if (!extension) {
                this.$message({
                    message: '仅支持mp3格式！',
                    type: 'error'
                })
            }
            return extension
        },

        getComment (id) {
            this.routerHandler(COMMENT, { path: COMMENT, query: { id, type: 0 } })
        },

        handleSongSuccess (res, file) {
            if (res.code === 1) {
                this.getData()
                this.$notify({
                    title: '上传成功',
                    type: 'success'
                })
            } else {
                this.$notify({
                    title: '上传失败',
                    type: 'error'
                })
            }
        },

        getData () {
            this.Temp = []
            this.tableData = []
            HttpHandler.getSongSingerId(this.singerId).then((res) => {
                this.Temp = res
                this.tableData = res
                this.currentPage = 1
            }).catch(err => {
                console.error(err)
            })
        },

        deleteRow () {
            HttpHandler.deleteSong(this.idx)
                .then(response => {
                    if (response) {
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
.search-input {
    width: 150px;
    display: inline-block;
}

.song-pic {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
}

.pagination {
    display: flex;
    justify-content: center;
}
</style>

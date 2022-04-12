<template>
    <div class="table">
        <div class="container">
            <div class="table-box">
                <el-button type="primary" size="mini" class="handle-del mr10" @click="deleteAll">批量删除</el-button>
                <el-input v-model="search_word" size="mini" placeholder="搜索" class="table-input mr10"></el-input>
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
                <el-table-column prop="name" label="歌手-歌曲"></el-table-column>
                <el-table-column label="操作" width="85">
                    <template v-slot="scope">
                        <el-button size="mini" type="danger" @click="DeleteById(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <delete-dialog :delVisible="delVisible" @deleteRow="deleteRow" @cancelRow="delVisible = $event"></delete-dialog>
    </div>
</template>

<script>
import {myFunction} from "../utils";
import {HttpHandler} from "../api";
import DeleteDialog from "../components/dialog/DeleteDialog";

export default {
    name: "SavePage",
    mixins: [myFunction],
    components:{
        DeleteDialog
    },
    props: ['id'],
    data(){
        return{
            tableData: [],
            Temp: [],
            tempId: [],
            multipleSelection: [],
            delVisible: false,
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
    methods: {

        getData () {
            HttpHandler.getUserCollection(this.$route.query.id)
                .then(res => {
                    this.tableData = []
                    for (let item of res) {
                        this.getSongList(item.songId)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },

        getSongList (id) {
            HttpHandler.getSongId(id)
                .then(res => {
                    this.tableData.push(res[0])
                    this.Temp.push(res[0])
                })
                .catch(err => {
                    console.error(err)
                })
        },

        deleteRow () {
            HttpHandler.deleteUserCollection(this.$route.query.id, this.idx.id)
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
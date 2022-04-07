<!--<template>-->
<!--    <el-button type="text" @click="open">删除</el-button>-->
<!--</template>-->


<!--<script>-->
<!--export default {-->
<!--    methods: {-->
<!--        open() {-->
<!--            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {-->
<!--                confirmButtonText: '确定',-->
<!--                cancelButtonText: '取消',-->
<!--                type: 'warning'-->
<!--            }).then(() => {-->
<!--                this.$message({-->
<!--                    type: 'success',-->
<!--                    message: '删除成功!'-->
<!--                });-->
<!--            }).catch(() => {-->
<!--                this.$message({-->
<!--                    type: 'info',-->
<!--                    message: '已取消删除'-->
<!--                });-->
<!--            });-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

<!--<style>-->

<!--</style>-->

<template>
    <div>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt" align="center">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelRow">取 消</el-button>
        <el-button type="primary" size="mini" @click="deleteRow">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        delVisible: Boolean
    },
    methods: {
        cancelRow () {
            this.$emit('cancelRow', false)
        },
        deleteRow (e) {
            this.$emit('deleteRow', e)
        }
    }
}
</script>

<style>

</style>

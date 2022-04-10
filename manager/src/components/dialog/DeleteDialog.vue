<template>
    <div>
        <el-dialog title="提示" :visible.sync="delVisible" width="350px">
            <div class="del-dialog-cnt">&nbsp;&nbsp;&nbsp;此删除操作将不可恢复, 是否继续?</div>
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

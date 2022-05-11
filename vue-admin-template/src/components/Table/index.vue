<template>
    <div class="table-wrap">
        <slot name="filters" :data="columns"/>
        <slot name="button" />
        <el-table
        :data="dataList"
        v-loading="loading"
        border
        stripe
        size="mini"
        tooltip-effect="dark"
        :height="height"
        :max-height="maxHeight"
        style="width: 100%">
            <el-table-column v-if="selection" type="selection" align="center" width="40"/>
            <el-table-column v-if="index" type="index" align="center" width="45" />
            <el-table-column
                v-for="item,index in columns" 
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                row-key="id"
                :sortable="item.sorter"
                :align="item.align || 'center'"
                :show-overflow-tooltip="item.tooltip">
            </el-table-column>
            <slot name="append"></slot>
        </el-table>
        <el-pagination
            v-if="isShowPagination"
            class="page"
            background
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :current-page.sync="currentPage"
            :pager-count="5"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
    </div>
</template>

<script>
export default {
    props:{
        selection: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Boolean,
            default: true,
        },
        columns: {
            type: Array,
            default: () => [],
        },
        list: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        height: {
            type: [Number, String],
            default: undefined,
        },
        maxHeight: {
            type: [Number, String],
            default: undefined,
        },
        // 是否显示分页器
        isShowPagination: {
            type: Boolean,
            default: true,
        },
        pageNum: {
            type: [Number, String],
            default: 1,
        },
        pageSize: {
            type: [Number, String],
            default: 20,
        },
        totalNum: {
            type: Number,
            default: 0,
        },
    },
    data(){
        return{
            currentPage: 1,
            size: 20,
            total: 0,
            dataList: [],
            selectIndex: [],
        }
    },
    created(){
        this.size = this.pageSize;
    },
    watch:{
        pageNum(val) {
            this.currentPage = val;
        },
        totalNum(val) {
            this.total = val;
        },
        list(val){
            this.dataList = val;
        },
    },
    methods:{
        // 处理每页显示数量变化
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.$emit("handleSizeChange", this.currentPage, val);
        },
        // 处理下一页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$emit("handleCurrentChange", val, this.pageSize);
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

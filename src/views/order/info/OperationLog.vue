<template>
  <div>
    <el-table v-loading="tableLoading" :data="pageData.data" style="width: 100%">
      <el-table-column prop="createTime" label="操作时间" width="200px" />
      <el-table-column prop="createUserName" label="操作人" width="120px" />
      <el-table-column prop="operationKeyDesc" label="操作内容" />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showJson(scope.row)">查看变更</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-next-container">
      <el-button-group class="page-next">
        <el-button type="primary" icon="el-icon-arrow-left" plain :disabled="!pageData.hasPrePage" @click="prevPage">
          上一页
        </el-button>
        <el-button type="primary" plain :disabled="!pageData.hasNextPage" @click="nextPage">下一页<i
          class="el-icon-arrow-right el-icon--right"
        /></el-button>
      </el-button-group>
    </div>
    <el-dialog
      title="变更详情"
      :visible.sync="jsonDialogVisible"
      width="50%"
      center
    >
      <json-viewer :value="jsonData" :expand-depth="5" copyable boxed sort theme="my-awesome-json-theme" style="width: 100%; min-width: 3.125rem" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="jsonDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listOperation } from '@/api/operation'
import JsonViewer from 'vue-json-viewer'
import { mapGetters } from 'vuex'

export default {
  name: 'OperationLog',
  components: {
    JsonViewer
  },
  props: {
    mainId: undefined
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  data() {
    return {
      tableLoading: true,
      jsonDialogVisible: false,
      jsonData: {},
      queryData: {
        pageSize: 5,
        pageNum: 1,
        mainId: undefined
      },
      pageData: {
        pageSize: 5,
        pageNum: 1,
        totalSize: 0,
        totalPage: 0,
        hasNextPage: false,
        hasPrePage: false,
        data: [
          {
            id: undefined,
            relatedMainId: undefined,
            relatedSubId: undefined,
            operationKey: undefined,
            operationKeyDesc: undefined,
            modifiedResultJson: undefined,
            createUserId: undefined,
            createUserName: undefined,
            createTime: undefined,
            updateTime: undefined
          }
        ]
      }
    }
  },
  watch: {
    mainId: function() {
      this.queryData.mainId = this.mainId
      this.doQuery()
    }
  },
  methods: {
    doQuery() {
      for (const key in this.queryData) {
        if (this.queryData[key] === '') {
          this.queryData[key] = undefined
        }
      }
      if (this.mainId === undefined || this.mainId === '' || this.mainId === null) {
        this.pageData.data = []
        this.pageData.pageSize = 10
        this.pageData.pageNum = 0
        return
      }
      this.tableLoading = true
      if (!this.roles.includes('admin')) {
        this.queryData.pageNum = 1
        this.queryData.pageSize = 2
      }
      listOperation(this.queryData).then(res => {
        this.pageData = res
      }).finally(() => {
        this.tableLoading = false
      })
    },
    prevPage() {
      this.queryData.pageNum--
      this.doQuery(this.queryData)
    },
    nextPage() {
      if (!this.roles.includes('admin')) {
        this.$message.warning('仅管理员可操作！')
      }
      this.queryData.pageNum++
      this.doQuery(this.queryData)
    },
    showJson(row) {
      if (!this.roles.includes('admin')) {
        this.$message.warning('仅管理员可查看！')
        return
      }
      const modifiedResultJson = row.modifiedResultJson
      console.log(modifiedResultJson)
      this.jsonData = JSON.parse(modifiedResultJson)
      this.jsonDialogVisible = true
    }
  }
}
</script>

<style scoped>
</style>

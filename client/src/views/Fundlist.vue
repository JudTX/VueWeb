<template>
  <div class="fillcontain">
    <el-table
    v-if="tableData.length > 0"
    :data="tableData"
    max-height="450"
    style="width: 100%">
    <el-table-column
        type="index"
        label="序号"
        align='center'
        width="70">
    </el-table-column>
    <el-table-column
        prop="date"
        label="创建时间"
        align='center'
        width="248"
        sortable>
        <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
    </el-table-column>
    <el-table-column
        prop="type"
        label="收支类型"
        align='center'
        width="130">
    </el-table-column>
    <el-table-column
        prop="describe"
        label="收支描述"
        align='center'
        width="130">
    </el-table-column>
    <el-table-column
        prop="income"
        label="收入"
        align='center'
        width="130"> 
        <template slot-scope="scope">  
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
        </template>
    </el-table-column>
    <el-table-column
        prop="expend"
        label="支出"
        align='center'
        width="130">
        <template slot-scope="scope">  
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
        </template>
    </el-table-column>
    <el-table-column
        prop="cash"
        label="账户现金"
        align='center'
        width="130">
        <template slot-scope="scope">  
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
    </el-table-column>
     <el-table-column
        prop="remark"
        label="备注"
        align='center'
        width="200">
    </el-table-column>
    <el-table-column
        prop="operation"
        align='center'
        label="操作"
        width="150">
        <template slot-scope='scope'>
            <el-button 
                type="warning" 
                icon='edit' 
                size="mini"
                @click='handleEdit(scope.$index,scope.row)'
            >编辑</el-button>
            <el-button 
                type="danger" 
                icon='delete' 
                size="small"
                @click='handleDele(scope.$index,scope.row)'
            >删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  </div> 
</template>

<script>
  export default {
      name: "fundlist",
      data(){
        return{
          tableData: []
        }
      },
      created(){
        this.getProfile();
      },
      methods:{
        getProfile(){
          this.$axios.get("/api/profile")
          .then(res=>{
            this.tableData = res.data;
          })
          .catch(err => {
            console.log(err);
          })
        },
        handleEdit(index,row){
          console.log(index,row);
        },
        handleDele(index,row){
          console.log(index,row);
        }
      }
    }
</script>

<style scoped>
  .fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  }
  .btnRight {
    float: right;
  }
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
</style>
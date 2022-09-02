<template>
  <div>

    <el-form >
      <el-form-item label="年龄" prop="age">
        <el-input v-model="query.age" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button @click="Func.query">查找</el-button>
        <el-button @click="Func.reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="Func.add">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="age" label="年龄" width="180" />
      <el-table-column prop="phone" label="手机" />
      <el-table-column prop="address" label="地址" />
      <el-table-column  label="操作" >
        <template #default="scop">
          <el-button link type="primary" size="small" @click="Func.edit(scop.row.id)">编辑</el-button>
          <el-button link type="primary" size="small" @click="Func.del(scop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
              v-model.number="ruleForm.phone"
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item label="地址" >
          <el-input v-model="ruleForm.address" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm"
        >提交</el-button
        >
      </span>
      </template>
    </el-dialog>
    <el-button @click="Func.gopage">go page</el-button>
    <div class="item1">
      <div class="ix">
        hhh
      </div>
    </div>

  </div>
</template>

<script setup >
import {defineAsyncComponent, reactive, ref} from "vue";
import {add, delById, getDataByKey, queryAllData, queryDataByIndex, updateByKey} from "@/sql";
import {ElMessage, ElMessageBox, ElButton, ElTable} from "element-plus";
import {useRouter} from "vue-router/dist/vue-router";
import {routerStack} from "@/stack";
  const filters = reactive({
    capitalize:(value)=>{
      if(!value) return '暂无数据'
      value = '处理结果为:'+value
    }
  })
  const test = ref('')
  const title = ref('添加')
  const router = useRouter()
  const dialogFormVisible = ref(false)
  const ruleForm = ref({})
  const query = ref({age:null})
  const tableData = ref([])
 const Func = reactive({
   add:()=>{
     title.value = '添加'
     ruleForm.value = {}
     dialogFormVisible.value = true
   },
  edit:(id)=>{
    getDataByKey(id).then(res =>{
      ruleForm.value = res
      dialogFormVisible.value = true
      title.value = '编辑'
    })
  },
  del:(id)=>{
    ElMessageBox.confirm('确认删除?')
        .then(() => {
          delById(id).then(res=>{
            if (res) {
              Func.getAll()
              Func.isOk('删除成功')
            }
          })
        })
        .catch(() => {
          // catch error
        })

  },
  getAll:()=>{
    queryAllData().then(res=>{
      tableData.value = res

    })
  },
   isOk:(msg)=>ElMessage({message: msg, type: 'success',}),
   query:()=>{
     if (!query.value.age){
       return
     }
     queryDataByIndex('ageIndex',parseInt(query.value.age)).then(res =>{
       tableData.value = res
     })
   },
   reset:()=>{
     query.value.age = null
     Func.getAll()
   },
   gopage:()=>{
     // router.push()
     // console.log(router)
      routerStack.push('/page1',router)
   }
})
   window.onload = Func.getAll()
  const submitForm = () => {
    if (title.value==='添加')
    add(ruleForm.value).then(res =>{
      if (res){
        dialogFormVisible.value = false
        Func.isOk('添加成功')
        Func.getAll()
      }
    })
    else updateByKey(ruleForm.value).then(res =>{
      if (res){
        dialogFormVisible.value = false
        Func.isOk('修改成功')
        Func.getAll()
      }
    })

  }
</script>

<style scoped lang="scss">
@mixin flexWidth($size){
  width:  (100vw * $size /1920)
}
@function flexSize($size:12, $screenWidth:1920){
  @return (100vw * $size / $screenWidth)
}
.item1{
  .ix{
    color: red;
     //@include flexWidth(44);
    width: flexSize(440);
    border: 1px solid aquamarine;
  }
}
</style>

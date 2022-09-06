import axios from 'axios'
export function test1(){
    let data = {username:'test001',password:'123'}
   axios({url:'api/login',methods:'post',data:data}).then(res=>{
       console.log(res)
   })
}
export function getInfo(id){

    return  axios({url:'api/YFDataView/Show/GetModuleInfo?Id='+id,
     method:'post'
     })
}

import axios from 'axios'
import $ from 'jquery'
export function test1(){
    let data = {username:'test001',password:'123'}
   axios({url:'api/login',methods:'post',data:data}).then(res=>{
       console.log(res)
   })
}
export function getInfo(id){
    return  axios({url:'api/Show/GetModuleInfo?Id='+id,
     method:'post',
        headers: {
            "Content-Type": "application/json"
        },
     })
}
export function jc(data){
    return axios({url:'test/handler',method:'post',data:data})
}

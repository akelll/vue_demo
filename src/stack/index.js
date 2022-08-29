import {useRouter} from "vue-router/dist/vue-router";


const OK = true;
const ERROR = false;
class Stack {
    key='Router'

     data=[]
     top
    constructor() {
        this.data = [];
        this.top = -1;
    }
    Init_stack() {
        this.top = -1;
        const d = JSON.parse(sessionStorage.getItem(this.key))
        console.log(d)
        if (d){
            for (let index = 0; index < d.length-1; index++) {
                this.stack_push(d[index])
            }
        
        }else {
            sessionStorage.setItem(this.key, JSON.stringify([]))
        }
    }
    isEmpty() {
        return this.top === -1 ? OK : ERROR;
    }
    stack_push(elem) {
        this.data[++this.top] = elem;
        sessionStorage.setItem(this.key,JSON.stringify(this.data))
        return OK;
    }
    stack_pop() {
        if (this.top === -1) {
            sessionStorage.setItem(this.key,JSON.stringify([]))
            return ERROR;
        }
        const ele = this.data[this.top--]
        this.data.pop()
        sessionStorage.setItem(this.key,JSON.stringify(this.data))
        return ele;
    }
    print(){
        return this.data
    }
    go(index,router){
        index = 0-index
        let len = this.data.length - index > 0 ? index  : this.data.length
        let demo = {}
        for (let i = 0; i <= len; i++) {
            demo = this.stack_pop()
        }
        router.replace(demo.fullPath)
    }
    push(path,router){
         router.replace(path)
    }
}

export const routerStack = new Stack();

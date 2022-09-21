<template>
  <div class="hello">
    <h1>{{ msg }}{{data.name}}</h1>
    <div class="contnet">
      <div>
        <span>姓名:</span><span><slot name="name"></slot></span>
      </div>
      <div>
        <span>年龄:</span><span><slot name="age" :data="msg"></slot></span>
      </div>
    </div>

  </div>
</template>

<script>
import {initDB} from "@/sql";

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    data:{
      type:Object,
      default:{name:'张三',age:666}
    },

  },
  data(){
    return{
      myDB : {
        name: 'test',
        version: 1,
        db: null
      },
      students : [
          {
        id: 1001,
        name: "Byron",
        age: 24
      }, {
        id: 1002,
        name: "Frank",
        age: 30
      }, {
        id: 1003,
        name: "Aaron",
        age: 26
      }, {
        id: 1004,
        name: "Casper",
        age: 26
      }],
    }
  },
  created() {
    initDB()
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.contnet div{
  display: flex;
}
</style>

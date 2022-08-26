<template>
  <div class="hello">
    <h1>{{ msg }}{{data.name}}</h1>
    <div class="contnet">
      <div>
        <span>姓名:</span><span><slot name="name"></slot></span>
      </div>
      <div>
        <span>年龄:</span><span><slot name="age"></slot></span>
      </div>
    </div>

  </div>
</template>

<script>
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
    this.openDB()
  },
  methods:{
    openDB(name, version) {
      version = version || 1;
      var request = window.indexedDB.open(name, version);
      request.onerror = function (e) {
        console.log(e.currentTarget.error.message);
      };
      request.onsuccess = function (e) {
        this.myDB.db = e.target.result;
      };
      request.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('students')) {
          var store = db.createObjectStore('students', { keyPath: 'id' });
          store.createIndex('nameIndex', 'name', { unique: true });
          store.createIndex('ageIndex', 'age', { unique: false });
        }
        console.log('DB version changed to ' + version);
      };
    },
    closeDB(db) {
      db.close();
    },
    deleteDB(name) {
      indexedDB.deleteDatabase(name);
    },
    addData(db, storeName) {
      var transaction = db.transaction(storeName, 'readwrite');
      var store = transaction.objectStore(storeName);

      for (var i = 0; i < this.students.length; i++) {
        store.add(this.students[i]);
      }
    },
    getDataByKey(db, storeName, value) {
      var transaction = db.transaction(storeName, 'readwrite');
      var store = transaction.objectStore(storeName);
      var request = store.get(value);
      request.onsuccess = function (e) {
        var student = e.target.result;
        console.log(student.name);
      };
    },
    updateDataByKey(db, storeName, value) {
      var transaction = db.transaction(storeName, 'readwrite');
      var store = transaction.objectStore(storeName);
      var request = store.get(value);
      request.onsuccess = function (e) {
        var student = e.target.result;
        student.age = 35;
        store.put(student);
      };
    },
    deleteDataByKey(db, storeName, value) {
      var transaction = db.transaction(storeName, 'readwrite');
      var store = transaction.objectStore(storeName);
      store.delete(value);
    },
    clearObjectStore(db, storeName) {
      var transaction = db.transaction(storeName, 'readwrite');
      var store = transaction.objectStore(storeName);
      store.clear();
    },
    deleteObjectStore(db, storeName) {
      var transaction = db.transaction(storeName, 'versionchange');
      db.deleteObjectStore(storeName);
    },
    fetchStoreByCursor(db, storeName) {
      var transaction = db.transaction(storeName);
      var store = transaction.objectStore(storeName);
      var request = store.openCursor();
      request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
          console.log(cursor.key);
          var currentStudent = cursor.value;
          console.log(currentStudent.name);
          cursor.continue();
        }
      };
    },
    getDataByIndex(db, storeName) {
      var transaction = db.transaction(storeName);
      var store = transaction.objectStore(storeName);
      var index = store.index("ageIndex");
      index.get(26).onsuccess = function (e) {
        var student = e.target.result;
        console.log(student.id);
      }
    },
    getMultipleData(db, storeName) {
      var transaction = db.transaction(storeName);
      var store = transaction.objectStore(storeName);
      var index = store.index("nameIndex");
      var request = index.openCursor(null, IDBCursor.prev);
      request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
          var student = cursor.value;
          console.log(student.name);
          cursor.continue();
        }
      }
    }
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

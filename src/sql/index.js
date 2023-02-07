let db; //数据库对象
let name = 'test'; //数据库名
let tableName = 'user';  //表名
let version = 1; //数据库版本

function setInfo(n,t,v) {
    name = n
    tableName = t
    version = v
}
function initDB(){
    let req = window.indexedDB.open(name,version)
    req.onerror = function (e){
        console.log(e.currentTarget.error.message);
    }
    req.onsuccess = function (e){
        db = e.target.result
        console.log('初始化成功')
    }
    req.onupgradeneeded = function (e){
        db = e.target.result
        if (!db.objectStoreNames.contains(tableName)){
            let store = db.createObjectStore(tableName,{keyPath:'id',autoIncrement:true})
            store.createIndex('nameIndex','name',{unique:false})
            store.createIndex('ageIndex','age',{unique:false})
            store.createIndex('phoneIndex','phone',{unique:true})
            console.log('数据表创建成功')
        }
    }
}
function closeDB(){
    db.close()
}
function deleteDB() {
    indexedDB.deleteDatabase(name)
}
function returnStore(){
    return  db.transaction(tableName,'readwrite').objectStore(tableName)
}
function add(val) {
    let demo={}
    for (const key in val) {
        demo[key] = val[key]
    }
    let req = returnStore().add(demo)
    return new Promise((resolve, reject)=>{
        req.onsuccess=(e=> resolve(true))
        req.onerror=(e=>reject(e))
    })
}
function getDataByKey(key){
    let store = returnStore()
    let req = store.get(key)
    return new Promise((resolve, reject)=>{
        req.onsuccess=(e=>resolve(e.target.result))
        req.onerror=(e=>reject(e))
    })

}
function updateByKey(val){
    let store = returnStore()
    let demo ={}
    for (const key in val) {
        demo[key] = val[key]
    }
    let req = store.put(demo)
    return new Promise((resolve, reject)=>{
        req.onsuccess = (e=>resolve(true))
        req.onerror = (e =>reject(e))
    })

}
//清空数据表
function clearObjectStore(){
    returnStore().clear()
}
//删除数据表
function delObjectStore() {
    db.deleteObjectStore(tableName)
}
function queryAllData() {
    let store = returnStore()
    let req = store.openCursor()
    let data = []
    return new Promise((resolve,reject)=>{
        req.onsuccess = function (e) {
            let cursor = e.target.result;
            if (cursor) {
                var user = cursor.value;
                data.push(user)
                cursor.continue();
            }else {
                resolve(data)
            }
        };
        req.onerror = function (e) {
            reject(e)
        }
    })


}

function queryDataByIndex(index,val) {  //index 为索引名 val查找值 单条件查询
    let store = returnStore()
    let list = []
    console.log(val)
   let req= store.index(index).openCursor(IDBKeyRange.only(val))
    return new Promise((resolve, reject)=>{
        req.onsuccess=(e=>{
            var cursor  = e.target.result;
            if (cursor ){
                list.push(cursor.value)
                cursor.continue()
            }else {
                resolve(list)
            }

        })
        req.onerror = (ev => reject(ev))
    })

}
function getMultipleData(val) {
    const store = returnStore();
    const request = store.openCursor(null, IDBCursor.prev);
    request.onsuccess = function (e) {
        const cursor = e.target.result;
        if (cursor) {
            var student = cursor.value;
            console.log(student);
            cursor.continue();
        }
    }
}
function delById(id) {
    const store = returnStore();
    // 删除请求
    const delPersonRequest = store.delete(id);
    return new Promise((resolve ,reject)=>{
        delPersonRequest.onsuccess = function (e) {
            resolve(true)
            console.log('删除成功') // 删除成功后，重新加载数据
        }
        delPersonRequest.onerror = function (e) {
            console.log(e.target.error);
            reject(e)
        }
    })

}

export {
    initDB,closeDB,deleteDB,add,getDataByKey,updateByKey,clearObjectStore,delObjectStore,queryAllData,queryDataByIndex,
    getMultipleData,delById,setInfo
}


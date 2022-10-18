class  Test{
    constructor(Page_duration=0,t2=0,t0=0){
        this.Page_duration = Page_duration
        this.t2 = t2
        this.t0 = t0
    }
    set_Page_duration(Page_duration){
        this.Page_duration = Page_duration
    }
    set_t2(t2){
        this.t2 = t2
    }
    set_t0(t0){
        this.t0 = t0
    }
    get_data(){
        return `页面浏览时长：${this.Page_duration}，页面加载时长：${this.t2}，页面响应时长：${this.t0}`
    }


}
export function getTime(t) {
    //
    // 页面加载时间=域名解析时间+建立连接花费时间+请求花费时间+接收数据花费时间+解析dom花费时间+加载dom花费时间
    const t2 = t.domComplete -  t.fetchStart
    const t0 =  t.responseEnd - t.fetchStart
    test.set_t2(t2)
    test.set_t0(t0)
}
export const test = new Test()


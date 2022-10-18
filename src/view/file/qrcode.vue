<template>
  <div class="qrcode" ref="qrCodeUrl"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import QRCode from 'qrcodejs2'

const qrCodeUrl=ref(null)
onMounted(()=>{
  creatQrCode()
})
const creatQrCode = () => {
  const qrcode = new QRCode(qrCodeUrl.value, {
    text: 'http://www.zhihuiyunxiao.net/jyxx_wx/Home/Login/8n7b3l1f8t1h8i1t#login?url=http%3A%2F%2F192.168.1.12%3A8080', // 需要转换为二维码的内容
    width: 120,
    height: 120,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}
</script>

<style scoped>

</style>

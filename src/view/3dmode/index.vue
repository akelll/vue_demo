<template>
<div>

</div>
</template>

<script setup>
import {onMounted} from "vue";
import * as echarts from 'echarts';
import 'echarts-gl';

onMounted(()=>{
  initChart()
})
const initChart = () => {
  const ROOT_PATH = 'https://echarts.apache.org/examples';

  const chartDom = document.getElementById('main');
  const myChart = echarts.init(chartDom);
  let option;

  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  img.onload = function () {
    const width = (canvas.width = img.width);
    const height = (canvas.height = img.height);
    ctx.drawImage(img, 0, 0, width, height);
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = new Float32Array((imgData.data.length / 4) * 3);
    let off = 0;
    for (let i = 0; i < imgData.data.length / 4; i++) {
      const r = imgData.data[i * 4];
      const g = imgData.data[i * 4 + 1];
      const b = imgData.data[i * 4 + 2];
      let lum = 0.2125 * r + 0.7154 * g + 0.0721 * b;
      lum = (lum - 125) / 4 + 50;
      data[off++] = i % width;
      data[off++] = height - Math.floor(i / width);
      data[off++] = lum;
    }
    myChart.setOption(
        (option = {
          tooltip: {},
          backgroundColor: '#fff',
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value',
            min: 0,
            max: 100
          },
          grid3D: {
            show: false,
            viewControl: {
              alpha: 70,
              beta: 0
            },
            postEffect: {
              enable: true,
              depthOfField: {
                enable: true,
                blurRadius: 4,
                fstop: 10
              }
              // SSAO: {
              //     enable: true
              // }
            },
            boxDepth: 100,
            boxHeight: 20,
            environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
            light: {
              main: {
                shadow: true,
                intensity: 2
              },
              ambientCubemap: {
                texture: ROOT_PATH + '/data-gl/asset/canyon.hdr',
                exposure: 2,
                diffuseIntensity: 0.2
              }
            }
          },
          series: [
            {
              type: 'bar3D',
              shading: 'lambert',
              barSize: 0.8,
              silent: true,
              dimensions: ['x', 'y', 'z'],
              itemStyle: {
                color: function (params) {
                  var i = params.dataIndex;
                  var r = imgData.data[i * 4] / 255;
                  var g = imgData.data[i * 4 + 1] / 255;
                  var b = imgData.data[i * 4 + 2] / 255;
                  var lum = 0.2125 * r + 0.7154 * g + 0.0721 * b;
                  r *= lum * 2;
                  g *= lum * 2;
                  b *= lum * 2;
                  return [r, g, b, 1];
                }
              },
              data: data
            }
          ]
        })
    );
  };
  img.src = ROOT_PATH + '/data-gl/asset/sample.jpg';
  img.crossOrigin = 'Anonymous';

  option && myChart.setOption(option);

}
</script>

<style scoped>

</style>

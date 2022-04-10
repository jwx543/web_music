<template>
    <div id="SongStyleChart" class="my-component"></div>
</template>

<script>
import {myFunction} from "../../utils";
import {HttpHandler} from "../../api";

export default {
    name: "SongStyle",
    mixins: [myFunction],
    data() {
        return {
            ChartsInstance: null,
            songStyle: [
                { style: '华语', cnt: 0 },
                { style: '粤语', cnt: 0 },
                { style: '欧美', cnt: 0 },
                { style: '日韩', cnt: 0 },
                { style: 'BGM', cnt: 0 },
                { style: '轻音乐', cnt: 0 },
                { style: '乐器', cnt: 0 }
            ],

            option: {
                polar: {
                    radius: [30, '80%']
                },
                angleAxis: {
                    max: 100,
                    startAngle: 75
                },
                radiusAxis: {
                    type: 'category',
                    data: ['华语', '粤语', '欧美', '日韩', 'BGM', '轻音乐', '乐器']
                },
                tooltip: {},
                series: {
                    type: 'bar',
                    data: [45],
                    coordinateSystem: 'polar',
                    label: {
                        show: true,
                        position: 'middle',
                        formatter: '{b}: {c}'
                    },
                    itemStyle: {
                        normal: {
                            color:function(){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        },
                    },
                }
            }
        }
    },
    mounted() {
        this.initChart()
        this.getSongList()
    },
    methods: {
        initChart() {
            this.ChartsInstance = this.$echarts.init(document.getElementById("SongStyleChart"))
        },

        async getSongList() {
            const p = await HttpHandler.getSongList().then(res => {
                for (let item of res) {
                    this.getStyle(item.style)
                }
                return this.songStyle
            }).catch(err => {
                console.error(err)
            })
            const data = p.map((item) => {
                return item.cnt
            })
            let big = 0;
            for(let item of data){
                if(big < item)  big = item
            }
            big += (big * 0.1)
            this.option.series.data = data
            this.option.angleAxis.max = big
            this.ChartsInstance.setOption(this.option, true)
        },

        getStyle(val){
            for(let item of this.songStyle){
                if(val.includes(item['style'])){
                    item['cnt']++
                }
            }
        },

    }
}
</script>

<style scoped>
.my-component {
    height: 500px;
}
</style>
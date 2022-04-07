<template>
    <div id="CountryChart" class="my-component"></div>
</template>

<script>
import {mixin} from "../../mixins";
import {HttpManager} from "../../api";

export default {
    name: "CountryPosition",
    mixins: [mixin],
    data() {
        return {
            ChartsInstance: null,
            countries: [
                { name: '中国', value: 0 },
                { name: '韩国', value: 0 },
                { name: '意大利', value: 0 },
                { name: '新加坡', value: 0 },
                { name: '美国', value: 0 },
                { name: '马来西亚', value: 0 },
                { name: '西班牙', value: 0 },
                { name: '日本', value: 0 }
            ],

            option: {
                series: [
                    {
                        type: 'treemap',
                        data: [
                            {
                                name: '中国',
                                value: 10
                            },
                            {
                                name: '韩国',
                                value: 1
                            },
                            {
                                name: '意大利',
                                value: 100
                            },
                            {
                                name: '新加坡',
                                value: 10
                            },
                            {
                                name: '美国',
                                value: 10
                            },
                            {
                                name: '马来西亚',
                                value: 10
                            },
                            {
                                name: '西班牙',
                                value: 10
                            },
                            {
                                name: '日本',
                                value: 10
                            },
                        ]
                    }
                ]
            }
        }
    },
    mounted() {
        this.initChart()
        this.getSinger()
    },
    methods: {
        initChart() {
            this.ChartsInstance = this.$echarts.init(document.getElementById("CountryChart"))
        },

        async getSinger(){
            const p = await HttpManager.getAllSinger().then(res => {
                for(let item of res){
                    this.getCountry(item.location)
                }
                return this.countries
            }).catch(err => {
                console.error(err)
            })

            const data = JSON.parse(JSON.stringify(p))
            this.option.series = [
                {
                    type: 'treemap',
                    data: data
                }
            ]
            this.ChartsInstance.setOption(this.option, true)
        },

        getCountry(val){
            for(let item of this.countries){
                if(val.includes(item['name'])){
                    item['value']++
                    break
                }
            }
        }

    }
}
</script>

<style scoped>
.my-component {
    height: 500px;
}
</style>
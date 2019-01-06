$(function () {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option1);


    var myPie = echarts.init(document.querySelector('.echarts_right'));

    option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2019年1月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['粤力粤','康帅博','农夫三拳','蛙哈哈','阿迪王']
        },
        series : [
            {
                name: '品牌热卖',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'粤力粤'},
                    {value:310, name:'康帅博'},
                    {value:234, name:'农夫三拳'},
                    {value:135, name:'蛙哈哈'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myPie.setOption(option2);

})
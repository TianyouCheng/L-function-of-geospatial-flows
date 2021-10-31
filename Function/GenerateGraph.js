/////////////////////////////////以下是圆图生成///////////////////////////////////
function Push_series_round(myseries,mydata){
    //Generate_series_round的工具函数
    //用于生成聚从数组的echarts表示
    for(let i=0;i<mydata.length;i++){
        myseries.push({
            data:mydata[i],
            type:'line',
            showSymbol:false,
            itemStyle:{
                normal:{
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#a50026' },
                            { offset: 0.5, color: '#ffffbf' },
                            { offset: 1, color: '#313695' }])
                }
            }
        })
    }
    return myseries;
}

function Generate_series_round(){
    //生成适合于echarts的数组
    //第一个参数一定是随机数组
    //然后可以选择加入聚从数组（任意长度参数）
    let myseries=[];
    for(let i=0;i<arguments[0].length;i++){
        // 使用upflag来标识起止点来画图
        let upflag=1;
        if(arguments[0][i][0][1]>arguments[0][i][1][1]){
            upflag=0;
        }
        else if(arguments[0][i][0][1]==arguments[0][i][1][1]){
            if(arguments[0][i][0][0]>arguments[0][i][1][0]){
                upflag=0;
            }
        }

        myseries.push({
            data:arguments[0][i],
            type:'line',
            showSymbol:false,
            itemStyle:{
                normal:{
                    color: new echarts.graphic.LinearGradient(
                        0, 1-upflag, 0, upflag,
                        [
                            { offset: 0, color: '#a50026' },
                            { offset: 0.5, color: '#ffffbf' },
                            { offset: 1, color: '#313695' }])
                }
            }
        })
    }
    for(let i=1;i<arguments.length;i++){
        myseries=Push_series_round(myseries,arguments[i]);
    }
    return myseries;
}

function Generate_Graph_Round(index,mydata){
    //生成平面线图
    //参数是选择第几个div
    let chart=echarts.init(document.getElementById('main'+String(index)));
    let option= {
        xAxis: {},
        yAxis: {},
        series:mydata
      };
    chart.setOption(option)    
}

/////////////////////////////////以下是L函数生成///////////////////////////////////
//生成echarts的数据结构（L函数）
function generateLData(Funcdata) {
    let data = [];
    for (let i = 0; i <= 1; i += 0.01) {
        data.push([i, funcL(i,Funcdata)]);
    }
    return data;
}

function Generate_Graph_L(index,Funcdata){
    let chart=echarts.init(document.getElementById('main'+String(index)));
    let option= {
        animation: false,
        grid: {
            top: 40,
            left: 50,
            right: 40,
            bottom: 50
        },
        xAxis: {
            name: 'x',
            minorTick: {
                show: true
            },
            minorSplitLine: {
                show: true
            }
        },
        yAxis: {
            name: 'y',
            min: -1,
            max: 1,
            minorTick: {
                show: true
            },
            minorSplitLine: {
                show: true
            }
        },
        dataZoom: [
            {
                show: true,
                type: 'inside',
                filterMode: 'none',
                xAxisIndex: [0],
                startValue: -20,
                endValue: 20
            },
            {
                show: true,
                type: 'inside',
                filterMode: 'none',
                yAxisIndex: [0],
                startValue: -20,
                endValue: 20
            }
        ],
        series: [
            {
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateLData(Funcdata)
            }
        ]  
    };
    chart.setOption(option)    
}

/////////////////////////////////以下是L函数导数生成///////////////////////////////////
//生成echarts的数据结构（导数） 
function generateLData_deriv(Funcdata) {
    let data = [];
    var x = new Array();
    var y = new Array();

    for (let i = 0; i <= 1; i += 0.01) {
        x.push(i);
        y.push(funcL(i,Funcdata));
    }
    var deriv = cal_deriv(x, y);
    for (var i = 0; i < deriv.length; i++) {
        data.push([i / 100, deriv[i]]);
    }
    return data;
}

function Generate_Graph_L_deriv(index,Funcdata){
    let chart=echarts.init(document.getElementById('main'+String(index)));
    let option= {
        animation: false,
        grid: {
            top: 40,
            left: 50,
            right: 40,
            bottom: 50
        },
        xAxis: {
            name: 'x',
            minorTick: {
                show: true
            },
            minorSplitLine: {
                show: true
            }
        },
        yAxis: {
            name: 'y',
            min: -5,
            max: 5,
            minorTick: {
                show: true
            },
            minorSplitLine: {
                show: true
            }
        },
        dataZoom: [
            {
                show: true,
                type: 'inside',
                filterMode: 'none',
                xAxisIndex: [0],
                startValue: -20,
                endValue: 20
            },
            {
                show: true,
                type: 'inside',
                filterMode: 'none',
                yAxisIndex: [0],
                startValue: -20,
                endValue: 20
            }
        ],
        series: [
            {
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateLData_deriv(Funcdata)
            }
        ]  
    };
    chart.setOption(option)    
}

/////////////////////////////////以下是探测主聚从圆图生成///////////////////////////////////
function Generate_series_round_detect(){
    //第一个参数是检测出来的距离r！！！！！
    //生成适合于echarts的数组
    //没有标注的数据均为灰色
    //生成数据对应的Labledata，判断并赋颜色标签
    let myseries=[];
    let Funcdata=[];
    for(let z=1;z<arguments.length;z++){
        Funcdata=Funcdata.concat(arguments[z]);
    }

    let Labledata=cal_label(Funcdata,arguments[0]);
    // console.log(Labledata);
    
    for(let i=0;i<Funcdata.length;i++){
        let mystyle={normal:{color: 'gray'}};
        if(Labledata[i]){
            mystyle={
                normal:{
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#a50026' },
                            { offset: 0.5, color: '#ffffbf' },
                            { offset: 1, color: '#313695' }])
                }
            }
        }

        myseries.push({
            data:Funcdata[i],
            type:'line',
            showSymbol:false,
            itemStyle:mystyle
        })
    }
    return myseries;
}
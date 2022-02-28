
/////////////////////////////////以下是球图生成///////////////////////////////////
function Generate_series_sphere(){
    //生成适合于echarts的数组
    //球图不需要辅助函数
    //可以选择加入聚从数组（任意长度参数）
    let myseries=[];
    for(let z=0;z<arguments.length;z++){
        for(let i=0;i<arguments[z].length;i++){
            myseries.push({
                data:arguments[z][i],
                type:'line3D',
            })
        }
    }
    return myseries;
}

function Generate_Graph_sphere(index,mydata){
    //生成平面线图
    //参数是选择第几个div
    let chart=echarts.init(document.getElementById('main'+String(index)));
    let option= {
        tooltip: {},
            backgroundColor: '#fff',
            visualMap: {
                show: false,
                dimension: 2,
                min: 0,
                max: 1,
                inRange: {
                    color: [
                        '#313695',
                        '#4575b4',
                        '#74add1',
                        '#abd9e9',
                        '#e0f3f8',
                        '#ffffbf',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026'
                    ]
                }
            },
            xAxis3D: {
                type: 'value'
            },
            yAxis3D: {
                type: 'value'
            },
            zAxis3D: {
                type: 'value'
            },
            grid3D: {
                viewControl: {
                    projection: 'orthographic'
                }
            },
        series:mydata
      };
    chart.setOption(option)    
}

/////////////////////////////////以下是L-time函数生成///////////////////////////////////
//要求三维的Funcdata
//默认设定：距离在0-1的范围内，时间在0-1的范围内
function generateLData_t(Funcdata) {
    let data = [];
    let arr=[];
    for (let i = 0.01; i <= 1; i += 0.01) {
        for(let j=0.01;j<=1;j+=0.01){
            data.push([i,j,funcL_comp(i,j,Funcdata)]);
            arr.push(funcL_comp(i,j,Funcdata));
            console.log(00);
        }
    }
    console.log(arr);
    console.log(data);
    return data;
}

function Generate_Graph_L_t(index,Funcdata){
    let data=generateLData_t(Funcdata);

    let chart=echarts.init(document.getElementById('main'+String(index)));
    let option = {
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
          viewControl: {
            alpha: 20,
            beta: -30
          },
          postEffect: {
            enable: true,
            SSAO: {
              enable: true
            }
          },
          boxDepth: 120,
          light: {
            main: {
              shadow: true,
              intensity: 2
            },
            ambientCubemap: {
              texture: './Source/canyon.hdr',
              exposure: 2,
              diffuseIntensity: 0.2,
              specularIntensity: 1
            }
          }
        },
        series: [
          {
            type: 'bar3D',
            shading: 'realistic',
            barSize: 1,
            wireframe: {
              show: false
            },
            itemStyle: {
              color: function (params) {
                var i = params.dataIndex;
                var r = 0;
                var g = 0;
                var b = 0;
                return 'rgb(' + [r, g, b].join(',') + ')';
              }
            },
            data: data
          }
        ]
      };
    chart.setOption(option)    
}

/////////////////////////////////以下是L-time函数导数生成///////////////////////////////////
//生成echarts的数据结构（导数） 
function generateLData_deriv_t(Funcdata) {
    let data = [];
    var x = new Array();
    var y = new Array();

    for (let i = 0; i <= 1; i += 0.01) {
        x.push(i);
        y.push(funcL_comp(i,Funcdata)[0]);
    }
    var deriv = cal_deriv(x, y);
    for (var i = 0; i < deriv.length; i++) {
        data.push([i / 100, deriv[i]]);
    }
    return data;
}

function Generate_Graph_L_deriv_t(index,Funcdata){
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
                data: generateLData_deriv_t(Funcdata)
            }
        ]  
    };
    chart.setOption(option)    
}

/////////////////////////////////以下是探测主聚从球图生成///////////////////////////////////
function Generate_series_sphere_detect(){
    //第一个参数是检测出来的距离r！！！！！
    //生成适合于echarts的数组
    //没有标注的数据均为灰色
    //生成数据对应的Labledata，判断并赋颜色标签
    let myseries=[];
    let Funcdata=[];
    for(let z=2;z<arguments.length;z++){
        Funcdata=Funcdata.concat(arguments[z]);
    }

    let Labledata=cal_label_sphere(Funcdata,arguments[0],arguments[1]);
    
    for(let i=0;i<Funcdata.length;i++){
        let mystyle='gray';
        if(Labledata[i]){
            mystyle='#313695';
        }

        myseries.push({
            data:Funcdata[i],
            type:'line3D',
            color:mystyle
        })
    }
    return myseries;
}

function Generate_Graph_sphere_detect(index,mydata){
    //生成平面线图
    //参数是选择第几个div
    let chart=echarts.init(document.getElementById('main'+String(index)));
    let option= {
        tooltip: {},
            backgroundColor: '#fff',
            xAxis3D: {
                type: 'value'
            },
            yAxis3D: {
                type: 'value'
            },
            zAxis3D: {
                type: 'value'
            },
            grid3D: {
                viewControl: {
                    projection: 'orthographic'
                }
            },
        series:mydata
      };
    chart.setOption(option)    
}
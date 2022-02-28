function IsFlowCount(data1,data2,comp,r){
    let res=false;
    dis_o_t=Math.abs(data1[0][2] - data2[0][2]);
    dis_d_t=Math.abs(data1[1][2] - data2[1][2]);
    if(Math.max(dis_o_t,dis_d_t)<comp){
        dis_o = Math.sqrt((data1[0][0] - data2[0][0]) * (data1[0][0] - data2[0][0]) + (data1[0][1] - data2[0][1]) * (data1[0][1] - data2[0][1]));
        dis_d = Math.sqrt((data1[1][0] - data2[1][0]) * (data1[1][0] - data2[1][0]) + (data1[1][1] - data2[1][1]) * (data1[1][1] - data2[1][1]));
        if(Math.max(dis_o, dis_d)<r)
            res=true;
    }
    else{
        res=false;
    }
    return res;
}
//流-时距离计算
function FlowDis_t(data1, data2) {
    dis_o = Math.abs(data1[0][2] - data2[0][2]);
    dis_d = Math.abs(data1[1][2] - data2[1][2]);
    return Math.max(dis_o, dis_d)
}
//TODO：利用L函数计算时间窗口
//K函数，根据comp把时域计算进来
function funcK_time(x,Funcdata,t) {
    //x为距离，半径
    //t为时间
    var K = 0;
    var Upper = 0;
    for (var i = 0; i < Funcdata.length; i++) {
        for (var j = i + 1; j < Funcdata.length; j++) {
            var sita = 0;
            if (IsFlowCount(Funcdata[i], Funcdata[j],t,x))
                sita = 1;
            Upper += sita;
        }
    }
    var lambdadown = 0;
    for (var i = 0; i < Funcdata.length; i++) {
        var NearestDis = 10000;
        for (var j = 0; j < Funcdata.length; j++) {
            if (i == j) continue;
            if (FlowDis_t(Funcdata[i], Funcdata[j]) <= NearestDis)
                NearestDis = FlowDis_t(Funcdata[i], Funcdata[j]);
        }
        lambdadown += NearestDis * NearestDis;
    }
    lambdadown = lambdadown * Math.PI * Math.PI*x*x*x*x* Math.PI;
    var lambda = Funcdata.length / lambdadown;
    K = Upper / (Funcdata.length * lambda);
    return K;
}
//L函数
function funcL_time(x,Funcdata,t) {
    var L = 0;
    L = Math.pow(funcK_time(x,Funcdata,t) / (Math.PI * Math.PI* Math.PI*x*x*x*x), 0.5) - t;
    return L;
}

function cal_camp(x,Funcdata){
    // 求L函数的最大值对应的x值
    let Ldata=[];
    for(let i=0;i<1;i+=0.01){
        Ldata.push(funcL_time(x,Funcdata,i));
    }
    maxL=Ldata.indexOf(Math.max.apply(null,Ldata));
    // maxL=maxL/100;

    // L函数的导函数
    let toderivx=[];
    let toderivy=[];
    for(let i=0;i<100;i+=1){
        toderivx.push(i/100);
        toderivy.push(Ldata[i]);
    }
    let deriv=cal_deriv(toderivx,toderivy);

    let locallow=deriv[maxL];
    let locallowindex=maxL;
    for(let i=maxL;i<100;i+=1){
        if(deriv[i]<=locallow){
            locallow=deriv[i]
            locallowindex=i;
        }
        else{
            break;
        }
    }
    return locallowindex/100;
}

// function FlowDisT(data1,data2){
//     dis_o = Math.abs(data1[0][2] - data2[0][2]);
//     dis_d = Math.abs(data1[1][2] - data2[1][2])
//     return Math.max(dis_o, dis_d)
// }

//K函数，根据comp把时域计算进来
function funcK_comp(x,Funcdata,comp) {
    //x为距离
    var K = 0;
    var Upper = 0;
    for (var i = 0; i < Funcdata.length; i++) {
        for (var j = i + 1; j < Funcdata.length; j++) {
            var sita = 0;
            if (IsFlowCount(Funcdata[i], Funcdata[j],comp,x))
                sita = 1;
            Upper += sita;
        }
    }
    var lambdadown = 0;
    var lambdadownT=0;
    for (var i = 0; i < Funcdata.length; i++) {
        var NearestDis = 10000;
        var NearestT=10000;
        for (var j = 0; j < Funcdata.length; j++) {
            if (i == j) continue;
            if (FlowDis(Funcdata[i], Funcdata[j]) <= NearestDis)
                NearestDis = FlowDis(Funcdata[i], Funcdata[j]);
            //TODO: 没有abs的距离可以吗
            if (FlowDis_t(Funcdata[i], Funcdata[j]) <= NearestT)
                NearestT = FlowDis_t(Funcdata[i], Funcdata[j]);
        }
        lambdadown += NearestDis * NearestDis * NearestDis * NearestDis;
        lambdadownT+=NearestT*NearestT;
    }
    lambdadown = lambdadown * Math.PI * Math.PI* Math.PI*lambdadownT;
    var lambda = Funcdata.length / lambdadown;
    K = Upper / (Funcdata.length * lambda);
    return K;
}
//L函数，时间窗口大小comp
function funcL_comp(x,t,Funcdata) {
    var L = 0;
    // comp=cal_camp(x,Funcdata);
    // L = Math.pow(funcK_comp(x,Funcdata,comp) / (Math.PI * Math.PI), 0.25) - x;
    L=Math.pow(funcK_comp(x,Funcdata,t) /((Math.PI * Math.PI* Math.PI)*(x*x)*(t*t)), 0.5) - x;
    return L;
}
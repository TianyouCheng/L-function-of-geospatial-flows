//流距离计算
function FlowDis(data1, data2) {
    dis_o = Math.sqrt((data1[0][0] - data2[0][0]) * (data1[0][0] - data2[0][0]) + (data1[0][1] - data2[0][1]) * (data1[0][1] - data2[0][1]))
    dis_d = Math.sqrt((data1[1][0] - data2[1][0]) * (data1[1][0] - data2[1][0]) + (data1[1][1] - data2[1][1]) * (data1[1][1] - data2[1][1]))
    return Math.max(dis_o, dis_d)
}
//K函数
function funcK(x,Funcdata) {
    //x为距离
    var K = 0;
    var Upper = 0;
    for (var i = 0; i < Funcdata.length; i++) {
        for (var j = i + 1; j < Funcdata.length; j++) {
            var sita = 0;
            if (FlowDis(Funcdata[i], Funcdata[j]) <= x)
                sita = 1;
            Upper += sita;
        }
    }
    var lambdadown = 0;
    for (var i = 0; i < Funcdata.length; i++) {
        var NearestDis = 10000;
        for (var j = 0; j < Funcdata.length; j++) {
            if (i == j) continue;
            if (FlowDis(Funcdata[i], Funcdata[j]) <= NearestDis)
                NearestDis = FlowDis(Funcdata[i], Funcdata[j]);
        }
        lambdadown += NearestDis * NearestDis * NearestDis * NearestDis;
    }
    lambdadown = lambdadown * Math.PI * Math.PI;
    var lambda = Funcdata.length / lambdadown;
    K = Upper / (Funcdata.length * lambda);
    return K;
}
//L函数
function funcL(x,Funcdata) {
    var L = 0;
    L = Math.pow(funcK(x,Funcdata) / (Math.PI * Math.PI), 0.25) - x;
    return L;
}
//导数计算
function cal_deriv(x, y) {
    var diff_x = new Array();
    var diff_y = new Array();
    var slopes = new Array();
    var deriv = new Array();
    for (var i = 0; i < x.length - 1; i++) {
        diff_x.push(x[i + 1] - x[i]);
        diff_y.push(y[i + 1] - y[i]);
    }
    for (var i = 0; i < diff_y.length; i++) {
        slopes.push(diff_y[i] / diff_x[i]);
    }
    deriv.push((slopes[0] + slopes[1]) / 2);
    for (var i = 0; i < slopes.length - 1; i++) {
        deriv.push((slopes[i] + slopes[i + 1]) * 0.5);
    }
    deriv.push(slopes[slopes.length - 1]);
    return deriv;
}
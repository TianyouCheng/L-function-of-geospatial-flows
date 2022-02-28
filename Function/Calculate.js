//角度计算
function AngleCal(x1,y1,x2,y2,x3,y3,x4,y4){
    var included_angle=180;
    dx1=x2-x1;
    dy1=y2-y1;
    dx2=x4-x3;
    dy2=y4-y3;
    angle1=Math.atan2(dy1,dx1);
    angle1=angle1*180/Math.PI;
    angle2=Math.atan2(dy2,dx2);
    angle2=angle2*180/Math.PI;
    if(angle1*angle2>=0){
        included_angle=Math.abs(angle1-angle2);
    }
    else{
        included_angle=Math.abs(angle1)+Math.abs(angle2);
    }
    if(included_angle>180){
        included_angle=360-included_angle;
    }
    return included_angle
}
//流距离计算
function FlowDis(data1, data2) {
    dis_o = Math.sqrt((data1[0][0] - data2[0][0]) * (data1[0][0] - data2[0][0]) + (data1[0][1] - data2[0][1]) * (data1[0][1] - data2[0][1]))
    dis_d = Math.sqrt((data1[1][0] - data2[1][0]) * (data1[1][0] - data2[1][0]) + (data1[1][1] - data2[1][1]) * (data1[1][1] - data2[1][1]))
    return Math.max(dis_o, dis_d)
}
//K函数
function funcK(x,Funcdata) {
    //x为距离
    let angletherld=20;
    var K = 0;
    var Upper = 0;
    for (var i = 0; i < Funcdata.length; i++) {
        for (var j = i + 1; j < Funcdata.length; j++) {
            var sita = 0;
            if (FlowDis(Funcdata[i], Funcdata[j]) <= x)
                if(AngleCal(Funcdata[i][0][0],Funcdata[i][0][1],Funcdata[i][1][0],Funcdata[i][1][1],Funcdata[j][0][0],Funcdata[j][0][1],Funcdata[j][1][0],Funcdata[j][1][1])<angletherld)
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
    // L = Math.pow(funcK(x,Funcdata) /((Math.PI * Math.PI)*(x*x)), 0.5) - x;
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
//L函数
//直接计算，不用再走一遍K函数了
function funcL_local_t(Funcdata, r, ind,comp) {
    //Funcdata是所有的数据，r是半径，ind是要计算的线段ID
    let L = 0;
    let Upper = 0;
    for (let i = 0; i < Funcdata.length; i++) {
        let sita = 0;
        if (IsFlowCount(Funcdata[ind], Funcdata[i],comp,r) && i != ind)
            sita = 1;
        Upper += sita;
    }

    let lambdadown = 0;
        for (let i = 0; i < Funcdata.length; i++) {
            let NearestDis = 10000;
            for (let j = 0; j < Funcdata.length; j++) {
                if (i == j) continue;
                if (FlowDis(Funcdata[i], Funcdata[j]) <= NearestDis)
                    NearestDis = FlowDis(Funcdata[i], Funcdata[j]);
            }
            lambdadown += NearestDis * NearestDis * NearestDis * NearestDis;
        }
    lambdadown = lambdadown * Math.PI * Math.PI;
    let lambda=Funcdata.length/lambdadown; 
 
    L = Math.pow(Upper/(lambda*Math.PI*Math.PI), 0.25) - r;
    return L;
}

function Is_Within_r_t(Funcdata,r,ind,top10,comp){
    //使用的是三维距离
    let label=false;
    let istop=top10.indexOf(ind);
    if(istop==ind){
        label=true;
        return label;
    }
    for(let i=0;i<top10.length;i++){
        if(IsFlowCount(Funcdata[top10[i]],Funcdata[ind],comp,r))
            label=true;
    }
    return label;
}

//计算标签。r是供LocalL计算的距离，返回标签数组一一对应Funcdata，1为彩色，0为非彩
function cal_label_sphere(Funcdata, r,comp) {
    //r要自己提供！！！！！！！！！！！comp时间窗口
    //先把所有线段的localL算出来，排序，找出前十对应的线段，再把他们r内的选出来
    let Labeldata = [];
    let Llist=[];
    let Llistsort=[];
    let top10=[];
    for(let i=0;i<Funcdata.length;i++){
        let localL=funcL_local_t(Funcdata,r,i,comp);
        Llist.push(localL);
        Llistsort.push(localL);
    }
    // console.log(Llist);
    
    //降序排列
    Llistsort.sort(function(a,b){return b-a});
    
    //加入重复的
    // for(let i=0;i<10;i++){
    //     top10.push(Llist.indexOf(Llistsort[i]))
    // }

    //不加入重复的
    let topindlist=[];
    for(let i=0;i<10;i++){
        topindlist.push(0);
        let nextind=Llist.indexOf(Llistsort[i]);
        while(top10.indexOf(nextind)>-1){
            topindlist[i]++;
            let topcount=0;
            for(let j=0;j<topindlist.length;j++)topcount+=topindlist[j];
            nextind=Llist.indexOf(Llistsort[i+topcount]);
        }
        top10.push(nextind);
    }
    console.log(top10);
    for(let i=0;i<Funcdata.length;i++){
        if(Is_Within_r_t(Funcdata,r,i,top10,comp))
            Labeldata.push(1);
        else
            Labeldata.push(0);
    }
    return Labeldata;
}
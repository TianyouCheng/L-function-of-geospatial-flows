function Generate_random(n){
    // 生成n条线段数组
    // data[i]第i条线段
    // data[i][0]第i条线段起点
    // data[i][0][0]第i条线段起点x坐标
    let data=[];
    for(let i=0;i<n;i++){
        data.push([[Math.random(), Math.random()],
        [Math.random(), Math.random()]])
    }
    return data;
}
function Generate_random_3d(n){
    // 生成n条线段数组
    // data[i]第i条线段
    // data[i][0]第i条线段起点
    // data[i][0][0]第i条线段起点x坐标
    let data=[];
    for(let i=0;i<n;i++){
        data.push([[Math.random(), Math.random(), Math.random()],
        [Math.random(), Math.random(), Math.random()]])
    }
    return data;
}

function RoundRandom(n){
    // 生成圆内随机点(-1到1)
    // data[i]第i个点
    // data[i][0]第i个点x坐标
    let data=[];
    count=0;
    while(count<n){
        tmp=[Math.random()*2-1,Math.random()*2-1];
        rad=Math.sqrt(tmp[0]*tmp[0]+tmp[1]*tmp[1]);
        if(rad<=1){
            data.push(tmp);
            count++;
        }
    }
    return data;
}

function SphereRandom(n){
    // 生成球内随机点(-1到1)
    // data[i]第i个点
    // data[i][0]第i个点x坐标
    let data=[];
    count=0;
    while(count<n){
        tmp=[Math.random()*2-1,Math.random()*2-1,Math.random()*2-1];
        rad=Math.sqrt(tmp[0]*tmp[0]+tmp[1]*tmp[1]+tmp[2]*tmp[2]);
        if(rad<=1){
            data.push(tmp);
            count++;
        }
    }
    return data;
}

function Gendrate_random_Round(n,r,sta_x,sta_y,end_x,end_y){
    // 生成圆形线段数组
    // r:圆半径
    // sta_x...:起点、终点坐标
    // data[i]第i条线段
    // data[i][0]第i条线段起点
    // data[i][0][0]第i条线段起点x坐标
    let data=[]
    let rounddata_s=RoundRandom(n)
    let rounddata_e=RoundRandom(n)
    for(let i=0;i<n;i++){
        data.push([[rounddata_s[i][0]*r+sta_x,rounddata_s[i][1]*r+sta_y],[rounddata_e[i][0]*r+end_x,rounddata_e[i][1]*r+end_y]]);
    }
    return data;
}

function Generate_random_Sphere(n,r,sta_x,sta_y,sta_z,end_x,end_y,end_z){
    // 生成球形线段数组
    // r:圆半径
    // sta_x...:起点、终点坐标
    // data[i]第i 条线段
    // data[i][0]第i条线段起点
    // data[i][0][0]第i条线段起点x坐标
    let data=[];
    let rounddata_s=SphereRandom(n);
    let rounddata_e=SphereRandom(n);
    for(let i=0;i<n;i++){
        data.push([[rounddata_s[i][0]*r+sta_x,rounddata_s[i][1]*r+sta_y,rounddata_s[i][2]*r+sta_z],[rounddata_e[i][0]*r+end_x,rounddata_e[i][1]*r+end_y,rounddata_e[i][2]*r+end_z]]);
    }
    return data;
}

function Generate_random_avg_Sphere(n,r,sta_x,sta_y,end_x,end_y){
    //将时间离散到一天中

    // 尝试：z值随机选取，有大小关系和无大小关系
    let data=[];
    let rounddata_s=RoundRandom(n);
    let rounddata_e=RoundRandom(n);

    for(let i=0;i<n;i++){
        // let z_s=Math.random();
        // let z_e=Math.random();
        // let zOrdered_s=Math.random();
        // let zOrdered_e=(1-zOrdered_s)*Math.random() +zOrdered_s;
        data.push([[rounddata_s[i][0]*r+sta_x,rounddata_s[i][1]*r+sta_y,i/n],[rounddata_e[i][0]*r+end_x,rounddata_e[i][1]*r+end_y,i/n]]);
    }
    return data;
}
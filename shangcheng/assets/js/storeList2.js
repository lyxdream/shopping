$(function(){

    var str=window.location.href;
    var arr=str.split("=");
    var red_type=arr[1].split("&")[0];
    var store_name=unescape(arr[2])  //关键字
  
    // console.log(red_type)
  
    console.log(arr)
    // 省市接口
    $.ajax({
        type:"post",
        url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=GoodStoreDetails&m=zh_tcwq&level=1&parent_id=-1",
        // data:{

        // },
        success:function(res){
            var data=JSON.parse(res);
            console.log(data);
        }
    })


    //店铺接口
    // https://www.youqiancheng.com/app/index.php?i=2&c=entry&a=wxapp&do=PcGetStoreList&m=zh_tcwq
    $.ajax({
        type:'post',
        url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=PcGetStoreList&m=zh_tcwq",
        data:{
            red_type:red_type
        },
        success:function(res){
            var data=JSON.parse(res);
            console.log(data);
        },
        error:function(){

        }

    })





})
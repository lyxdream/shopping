
 var goods=window.location.href;
 var arr=goods.split("=");
 var typeN=unescape(arr[1].split("&")[0]);
 var type_id=arr[2].split("&")[0];
 var type2N=unescape(arr[3].split("&")[0]);
 var type2_id=arr[4];
console.log(arr);
// ["file:///D:/wamp/www/shangcheng/goodsList2.html?q", "%u53A8%u623F%u91CC%u7684%u5546%u54C1&goodstype", "6&type2N", "%E8%8F%9C%E5%88%80&goodstype2", "17"]
console.log(type2_id);
// $("#sear_input").val(keywords);
$("#location-second .one-type").text(typeN);
$("#location-second .two-type").text(type2N);

    var  locationC='<span>全部分类</span>'+
                    '<i></i>'+
                    '<span class="one-type">'+typeN+'</span>'+
                    '<i></i>'+
                    '<span class="two-type active">'+type2N+'</span>'
    $(".location-second").append(locationC)

$(function(){
    sortFn();
    // 综合
    screenSelect("#synth_sales",1);
    screenSelect("#synth_evaluate",2);
    screenSelect("#synth_price",3);
    // 销量
    // 由低到高
    screenSelect("#sales_up",5);
     // 由高到低
    screenSelect("#sales_down",4);
     // 价格
    // 由低到高
    screenSelect("#price_up",7);
   // 由高到低
    screenSelect("#price_down",6);
    // 评价
     // 由好到坏
     screenSelect("#evaluate_up",8);
    // 由坏到好
    screenSelect("#evaluate_down",9);
    function screenSelect(screen_id,screen_num){
        $(screen_id).click(function(){
            sortFn(screen_num);
            if(screen_id=="synth_sales"){
                $(".synth-box").addClass("active");
                $(".synth-box").siblings("li").removeClass("active");
            }else{
                $(screen_id).parent().parent("li").siblings("li").removeClass("active");
                $(screen_id).parent().parent("li").addClass("active");
            }
        })      
    }
    function sortFn(screen){
        var pageNum=1;
        pageFn(1);
        function pageFn(pageNum){
            $.ajax({
                type: "post",
                url: PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=PcClassGoods&m=zh_tcwq",
                data:{
                    type2_id:type2_id,
                    page:pageNum||1,
                    pagesize:10,
                    screen:screen
                },
                success: function (res) {
                    var data=JSON.parse(res);
                     var totalNum =Math.ceil(data.total/10);
                   var arrList=data.data;
                   console.log(pageNum)
                //    判断是否有上下一页
                   console.log(data);
                    var str="";
                   $.each(arrList,function(i,item){
                        str+='<div class="goods-wrap">'+
                                    '<div class="goods-img">'+
                                        '<img src="'+PUBLICIMG+'/'+item.lb_imgs+'" alt=""/>'+
                                    '</div>'+
                                    '<div class="goods-price">'+
                                        '<b>￥'+item.goods_cost+'</b>'+
                                        // '<i>￥299</i>'+
                                    '</div>'+
                                '<p>'+item.goods_name+' </p>'+
                            '</div>'
                   })
                   $("#goods_list").html(str);
                    //取模，解决每第5个列的右边距问题
                    $("#goods_list .goods-wrap").each(function(index){
                        index=index+1;
                        if(index!=0&&index%5==0){
                            $(this).css("margin-right", "0");
                        }
                    })
                    var pageBox='<span class="page-num"><span class="orage-font now-num">'+pageNum+'</span>/'+totalNum+'</span>'+
                    '<span class="pre-page" id="pre_page"><i></i></span>'+
                    '<span class="next-page" id="next_page">下一页<i></i></span>'
                    $(".page-wrap").html(pageBox);
                    $("#pre_page").click(function(){
                        if(pageNum>1){
                            pageFn(--pageNum);
                        }else{
                            pageFn(1);
                            return false;
                        }
                    })
                    $("#next_page").click(function(){
                        if(pageNum < totalNum){
                            pageFn(++pageNum);
                        }else{
                            pageFn(totalNum);
                            return false;
                        }
                    })              
                },
                error:function(){
                    console.log("请检查您的网路");
                }      
            });
        }
    }
   
 
})
    

  

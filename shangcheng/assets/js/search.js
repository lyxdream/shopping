$(function(){
    var sel_Id="2";
    function p_down(select, selector, selector_span, default_value){
        $(select).hover(function(){
            event.stopPropagation();
            $(selector).not($(this).children(selector)).hide();
            $(this).children(selector).show();
            var len = $(this).children(selector).children('span').length;
        },function(){
            $(this).children(selector).hide();
        })
        $(selector_span).click(function (event) {
            event.stopPropagation();
            var val = $(this).text();
            sel_Id= $(this).attr("data-id");
            console.log(sel_Id);
            $(this).parent().siblings(default_value).text(val);
            $(this).parent().siblings(default_value).attr("id",sel_Id);
            $(this).parent(selector).hide();
        })
        $("body").not($(select)).click(function () {
            $(selector).hide()
        })
        $("[type='reset']").click(function () {
            location.reload()
        })
    }
    p_down(".ser-icon", ".ser-list", ".ser-list span", ".def-val");
    var sear_name="";
    //   模糊搜索
   $("#sear_input").keyup(function(event){ 
        event.stopPropagation();
        // 清空上次渲染的值
        $(".dimor-search ul").html("");
        // 获取
        sel_Id=$(".def-val").attr("id");
        sear_name=$("#sear_input").val();
       
        showThing(sel_Id,sear_name);
        $(this).siblings(".dimor-search").show();  
  //    按回车执行搜索
        if(event.keyCode=="13"){
            sel_Id=$(".def-val").attr("id");
            sear_name=$("#sear_input").val();
            searchThing(sel_Id,sear_name);
        }
   })
//    搜索框聚焦状态
   $("#sear_input").click(function(event){  
         event.stopPropagation();
        // 清空上次渲染的值
        $(".dimor-search ul").html("");
        // 获取
        sel_Id=$(".def-val").attr("id");
        sear_name=$("#sear_input").val();
        console.log(sear_name);
        showThing(sel_Id,sear_name);
        $(this).parent(".dim-search").children(".dimor-search").show();   
    })
    // 按搜索键执行搜索
   $("#sear_ch").click(function(){
        sel_Id=$(".def-val").attr("id");
       sear_name=$("#sear_input").val();
        searchThing(sel_Id,sear_name);    
   })

// 搜索商品
function searchThing(type,sear_name){
    if(sear_name==""){
        return false;
    }else{
        $.ajax({
            type:"post",
            url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=SearchInterface&m=zh_tcwq",
            data:{
                type:type,
                name:sear_name
            },
            success:function(res){
                var data=JSON.parse(res);  
               
                console.log(data);    
                
                if(data.store.list!=""&&data.goods.list!=""){
                    var dataList="";    
                    if(type==1 && data.store.length!=0){   
                        dataList=data.store.list;
                        console.log(dataList);
                        var business_id=dataList[0].business_type; 
                        var ser_name=escape(sear_name)
                          window.location.href='storeList.html?q='+ser_name+'&storetype='+business_id+'&type='+type+'';
                    }else if(type==2 && data.goods.length!=0){
                        dataList=data.goods.list;
                        var goods_type=dataList[0].goods_type_id;
                        var goods_type2=dataList[0].goods_type2_id; 
                        var ser_name=escape(sear_name)
                         window.location.href='goodsList.html?q='+ser_name+'&goodstype='+goods_type+'&goodstype2='+goods_type2+'&type='+type+'';
                    }
                }else{
                    console.log("没有符合条件的数据！");
                }
               
            },
            error:function(){
                console.log("请检查您的网路");
            }
        })
    }
}

// 显示可以搜索的信息

function showThing(type,sear_name){
    if(sear_name==""){
        return false;
    }else{
        $.ajax({
            type:"post",
            url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=SearchInterface&m=zh_tcwq",
            data:{
                type:type,
                name:sear_name
            },
            success:function(res){
                var data=JSON.parse(res);   
                console.log(data)
                if(data.store.list!=""&&data.goods.list!=""){
                         var dataList="";    
                        if(type==1 && data.store.length!=0){ 
                            dataList=data.store.list;
                            $.each(dataList,function(i,item){
                                var str='<li>'+item.store_name+'</li>';
                                $(".dimor-search ul").append(str);     
                            })
                        }else if(type==2 && data.goods.length!=0){
                            dataList=data.goods.list;
                            $.each(dataList,function(i,item){
                                var str='<li>'+item.goods_name+'</li>';
                                $(".dimor-search ul").append(str);     
                            })
                        }  
                        $(".dimor-search ul li").click(function(event){
                            event.stopPropagation();
                            var val=$(this).text();
                            console.log(val);
                            $("#sear_input").val(val);
                            sear_name=$("#sear_input").val();
                            $(".dimor-search").hide();   
                            if(type==1 && data.store.length!=0){   
                                var business_id=dataList[0].business_type; 
                                var ser_name=escape(sear_name)
                                window.location.href='storeList.html?q='+ser_name+'&storetype='+business_id+'&type='+type+'';
                                }else if(type==2 && data.goods.length!=0){
                                    var goods_type=dataList[0].goods_type_id;
                                    var goods_type2=dataList[0].goods_type2_id; 
                                    var ser_name=escape(sear_name)
                                    window.location.href='goodsList.html?q='+ser_name+'&goodstype='+goods_type+'&goodstype2='+goods_type2+'&type='+type+'';
                                }
                        })
                        $("body").not($("#sear_input")).click(function () {
                            $(".dimor-search").hide();
                        })  
                }else{
                    console.log("没有符合条件的数据！");
                }
              
            },
            error:function(){
                console.log("请检查您的网路");
            }
        })
    }
 }

})





$.ajax({
    type:"post",
    url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=SearchInterface&m=zh_tcwq",
    // data:{
    //     type:type,
    //     name:sear_name
    // },
    success:function(res){
        var data=JSON.parse(res);   
        console.log(data)
      
    
    },
    error:function(){
        console.log("请检查您的网路");
    }
})
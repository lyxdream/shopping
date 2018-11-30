$(function(){
    var str=window.location.href;
    var arr=str.split("=");
    console.log(arr);
    var keywords=unescape(arr[1].split("&")[0]);  //关键字
    var storetype=arr[2].split("&")[0];     //分类id
    console.log(storetype)
    var type=arr[3];                        //搜索分类id
    // ["file:///D:/wamp/www/shangcheng/storeList.html?q", "%u5317%u4EAC%u4E09%u4E00%u7535%u5B50%u5546%u52A1%u6709%u9650%u516C%u53F8&storetype", "2"]
   $("#sear_input").val(keywords);
    $(".search-box .def-val").attr("id",type);
    $(".search-box .def-val").text("搜店铺");
    // 省市接口
    PCitity(1,-1)
    function PCitity(level,parent_id){
        $.ajax({
            type:"get",
            url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=Area&m=zh_tcwq&level=1&parent_id=-1",
            data:{
                level:level||1,
                parent_id:parent_id||-1
            },
            success:function(res){
                var data=JSON.parse(res);
                var sele_name="";
                if(level==1){
                    sele_name="省份";     
                }else if(level==2){
                    sele_name="市";
                   
                }else if(level==3){
                    sele_name="区县";
                }
                console.log(data);
                var str="";
                var str1="";
                for(var i=0;i<data.length;i++){
                    str1+='<span id="'+data[i].id+'">'+data[i].name+'</span>'
                }
                str='<span class="default-val">'+sele_name+'</span>'+
                    '<span class="img-s"></span>'+
                    '<span class="selector-street">'+str1+'<input type="hidden"/>'+
                    '</span>'
                if(level==1){
                        $("#province_name").html(str);
                        $("#city_name").html('<span class="default-val">市</span><span class="img-s"></span><span class="selector-street"></span>');
                        $("#county_name").html('<span class="default-val">区县</span><span class="img-s"></span><span class="selector-street"></span>');
                }else if(level==2){ 
                    $("#city_name").html(str);
                    $("#county_name").html('<span class="default-val">区县</span><span class="img-s"></span><span class="selector-street"></span>');
                }else if(level==3){
                    $("#county_name").html(str);
                }
                if(level==1){
                    p_down("#province_name", ".selector-street", ".selector-street span", ".default-val");
                }else if(level==2){ 
                    p_down("#city_name", ".selector-street", ".selector-street span", ".default-val");
                }else if(level==3){
                    p_down("#county_name", ".selector-street", ".selector-street span", ".default-val");
                }
                function p_down(select, selector, selector_span, default_value){
                    $(select).click(function (event) {
                            event.stopPropagation();
                            $(selector).not($(this).children(selector)).hide();
                            $(this).children(selector).toggle()
                            var len = $(this).children(selector).children('span').length;
                    })
                    $(selector_span).click(function (event) {
                        event.stopPropagation();
                        var val = $(this).text();
                        var prov_Id= $(this).attr("id");
                        console.log(prov_Id);
                        $(this).parent().siblings(default_value).text(val);
                        $(this).parent().siblings(default_value).attr("id",prov_Id);
                        $(this).parent(selector).hide();
                        if(level==1){
                            PCitity(2,prov_Id);      
                        }else if(level==2){
                            p_down("#city_name", ".selector-street", ".selector-street span", ".default-val");
                            PCitity(3,prov_Id);   
                        }else if(level==3){    
                            p_down("#county_name", ".selector-street", ".selector-street span", ".default-val");       
                            // PCitity(3,prov_Id)
                        }
                    })
                    $("body").not($(select)).click(function () {
                        $(selector).hide()
                    })
                    $("[type='reset']").click(function () {
                        location.reload()
                    })
                }
               
            }
        })
    }
   


})
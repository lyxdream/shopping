$(function(){
    var arr=window.location.href;
    var arrTemp=arr.split("=");
    console.log(arrTemp);
    // "file:///Users/yinxia/Desktop/%E5%9B%AD%E5%91%B3%E4…%82%B4/shangcheng/shangcheng/moreInfo.html?typeId", "6&sortId", "0&typeName",
    //  "%u5176%u5B83%u670D%u52A1&sortName", "%u9ED8%u8BA4%u6392%u5E8F"];
     var tId=arrTemp[1].split("&")[0];
     var sId=arrTemp[2].split("&")[0];
     var typeN=unescape(arrTemp[3].split("&")[0]);
     var sortN=unescape(arrTemp[4]);
     console.log(sortN);
    $.ajax({
        type:"get",
        url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=InformationType&m=zh_tcwq",  
        success:function(res){
            var data=JSON.parse(res);
            var sort_Id=sId;
            var type_id=tId;
            var typeName=typeN;
            var sortName=sortN;
            $("#sort-select .default-val").text(sortName);
            $("#sort-select .default-val").attr("id",sort_Id);
            console.log(data);
            var str="";
            var str1="";
            for(var i=0;i<data.length;i++){
                str1+='<span id="'+data[i].id+'">'+data[i].type_name+'<input type="hidden" value="key1"/></span>'
            }
            str='<span class="default-val" id="'+type_id+'">'+typeName+'</span>'+
                '<span class="img-s"></span>'+
                '<span class="selector-type">'+str1+'<input type="hidden"/>'+
                '</span>'
             $("#select-type").append(str);
             filterClassify(type_id,sort_Id);  //初始化筛选数据
             function pull_down(select, selector, selector_span, img_s, default_value) {
               
                $(select).click(function (event) {
                    event.stopPropagation();
                    $(selector).not($(this).children(selector)).hide()
                    $(img_s).removeClass("Kszta-t")
                    $(img_s).addClass("Kszta-b")
                    $(this).children(selector).toggle()
                    var len = $(this).children(selector).children('span').length;
                    console.log(len)
                    if ($(this).children(selector).is(":hidden")) {
                        $(this).children(img_s).removeClass("Kszta-t")
                        $(this).children(img_s).addClass("Kszta-b")
        
                    } else {
                        $(this).children(img_s).removeClass("Kszta-b")
                        $(this).children(img_s).addClass("Kszta-t")
                    }
        
                })
                $(selector_span).click(function (event) {
                    event.stopPropagation();
                     var val = $(this).text();                   
                     var data_Id= $(this).attr("id");  //数据的id
                     var sel_type=$(this).attr("data-type"); //选择的类型的判断
                    if( sel_type && sel_type=="sort"){
                        sort_Id=$(this).attr("id");
                        sortName=val;
                    }else{
                        type_id= $(this).attr("id");
                        typeName=val;
                    }
                    var valinp = $(this).children("input").val();
                    $(img_s).removeClass("Kszta-t")
                    $(img_s).addClass("Kszta-b")
                    $(this).parent().siblings(default_value).text(val);
                    $(this).parent().siblings(default_value).attr("id",data_Id);
                    $(this).siblings("input").val(valinp)
                    $(this).parent(selector).hide();
                    // 清空数据
                    $("#sort-cont").html("");     
                    filterClassify(type_id,sort_Id);  //筛选后调取数据  
                })
                $("body").not($(select)).click(function () {
                    $(selector).hide();
                    $(img_s).removeClass("Kszta-t");
                    $(img_s).addClass("Kszta-b")
                })
                $("[type='reset']").click(function () {
                    location.reload()
                })
            }
            pull_down("#select-type", ".selector-type", ".selector-type span", ".img-s", ".default-val");
            pull_down("#sort-select", ".selector-type", ".selector-type span", ".img-s", ".default-val");
               
        },
        error:function(res){
            console.log("请检查您的网路")
         }
    })

    // 筛选结果

    function filterClassify(type_id,sort_Id) { 
        $.ajax({
            type:"post",
            url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=List2&m=zh_tcwq",
            data:{
                type_id:type_id,
                sort:sort_Id,
            },
            success:function(result){
                var data=JSON.parse(result);
                console.log('筛选后数据',data);   
              
            // 清空数据重新加载
               $("#sort-cont").html("");    
            //    循坏遍历        
               $.each(data,function(i,item){  
                   var tipFont="";
                   var headImg = '<div class="head-img">'+
                                    '<img src="'+item.user_img+'" alt=""/>'+
                                 '</div>'
                    var sortlist_ti='<div class="fl owh tip-inf" data-stick="'+item.top+'"><div class="db" id="tip'+i+'"></div><i class="type-font">'+item.type_name+'</i>'+   
                                        '<span>'+item.user_name+'</span>'+
                                    '</div>'+
                                    '<div class="fr owh call-phon" data-id="'+item.user_tel+'">'+
                                        '<i></i>'+
                                        '<span>拨打电话</span>'+
                                    '</div>'              
                   var sortlist='<div class="sortlist-title owh">'+sortlist_ti+'</div>' +
                                '<p class="sort-info">'+item.details+'</p>'+
                                // <!-- 浏览信息 -->
                                '<div class="look-info">'+
                                    '<a href="infoDetail.html?pId='+item.id+'">全文</a>'+
                                    '<span class="look-num"><i></i>浏览'+item.views+'人</span>'+
                                    '<span class="collect-num"><i></i>收藏<b>'+item.collect+'</b>人</span>'+
                                '</div>'+
                                // <!-- 图片展示 -->
                               '<div class="look-list owh" id="look-list'+i+'"></div>'+
                                // <!-- 时间 -->
                                '<div class="look-date">'+
                                        '<span>'+item.time+'</span>'+
                                '</div>'                            
                    var str='<div class="sort-wrap owh" id="'+item.id+'">'+
                                '<div class="head-Portimg fl">'+headImg+'</div>'+
                                 '<div class="sortlist-right fl">'+sortlist+'</idv>'+
                                //  拨打电话
                                 '<div class="phone-call">'+
                                        '<i></i>'+
                                        '<span class="please-call">请拔打：</span>'+
                                        '<br/>'+
                                        '<span class="phone-nu"></span>'+
                                  '</div>'+
                             '</div>' 

                      $("#sort-cont").append(str); 
                       //    是否置顶  
                        if($("#tip"+i).parent(".tip-inf").attr("data-stick")==1){
                            tipFont='<div class="tip-font">顶</div>';
                        }else{
                            tipFont='';
                        }
                       $("#tip"+i).append(tipFont);
                    //    图片
                      $.each(item.img,function(j,item2){
                          var alt_info="";
                            var look_list='<div class="lookimg-box">'+
                                                '<img src="'+PUBLICIMG+'/'+item2+'" alt="" title=""/>'+
                                            '</div>'   
                            $("#look-list"+i).append(look_list);     
                       })         
                    
               })
               
            },
            error:function(res){
                console.log("请检查您的网路")
             } 
        })   
     }
  

   




})


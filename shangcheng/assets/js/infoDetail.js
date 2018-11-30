$(function(){
    var PUBLICA='https://www.youqiancheng.com/app/';
    var  PUBLICIMG="";
    // 公共图片地址
        $.ajax({
            type:"get",
            async:false,
            url: PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=Url&m=zh_tcwq",
            success:function(res){
            PUBLICIMG=res;
            },
            error:function(res){
                console.log("请检查您的网路")
            }
        })    
        var str =  window.location.href;
        var arr = str.split("=");
        var x_id=arr[1];
        console.log(arr);
    $.ajax({
        type:"post",
        url:PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=ClassInfo&m=zh_tcwq&x_id=86&user_id=31",
        data:{
            x_id:x_id,
            // user_id:user_Id,
        },
        success:function(res){
            var data=JSON.parse(res);
            var dataList=data.list;
            var imgArr=data.list.img;
            console.log(data);

            var tipFont="";
            var headImg = '<div class="head-img">'+
                             '<img src="'+dataList.user_img+'" alt=""/>'+
                          '</div>'
             var sortlist_ti='<div class="fl owh tip-inf" data-stick="'+dataList.top+'"><div class="db" id="tip'+dataList.id+'"></div><i class="type-font">'+dataList.type_name+'</i>'+   
                                 '<span>'+dataList.user_name+'</span>'+
                             '</div>'+
                             '<div class="fr owh call-phon" data-id="'+dataList.user_tel+'">'+
                                 '<i></i>'+
                                 '<span>拨打电话</span>'+
                             '</div>'              
            var sortlist='<div class="sortlist-title owh">'+sortlist_ti+'</div>' +
                         '<p class="sort-info">'+dataList.details+'</p>'+
                         // <!-- 浏览信息 -->
                         '<div class="look-info">'+
                             '<span class="look-num"><i></i>浏览'+dataList.views+'人</span>'+
                             '<span class="collect-num"><i></i>收藏<b>'+dataList.collect+'</b>人</span>'+
                         '</div>'+
                         // <!-- 图片展示 -->
                        '<div class="look-list owh" id="look-list'+dataList.id+'"></div>'+
                         // <!-- 时间 -->
                         '<div class="look-date">'+
                                 '<span>'+dataList.time+'</span>'+
                         '</div>'                            
             var str='<div class="sort-wrap owh" id="'+dataList.id+'">'+
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
                 if($("#tip"+dataList.id).parent(".tip-inf").attr("data-stick")==1){
                     tipFont='<div class="tip-font">顶</div>';
                 }else{
                     tipFont='';
                 }
                $("#tip"+dataList.id).append(tipFont);
             //    图片
               $.each(imgArr,function(j,item){
                   var alt_info="";
                     var look_list='<div class="lookimg-box">'+
                                         '<img src="'+PUBLICIMG+'/'+item+'" alt="" title=""/>'+
                                     '</div>'   
                     $("#look-list"+dataList.id).append(look_list);     
                })    
                
                  //  点击电话
                 $(document).on("click",".call-phon",function() {
                    var phoneNum=$(this).attr("data-id");   
                    console.log(phoneNum)    
                    var val=phoneNum;
                    $(this).parents(".sort-wrap").find(".phone-call").css("display","block");
                    $(this).parents(".sort-wrap").siblings().find(".phone-call").css("display","none");
                    $(this).parents(".sort-wrap").find(".phone-nu").text(val);                         
                })
                $(".phone-call i").click(function(){
                    $(this).parent(".phone-call").css("display","none");   
                })
                // 图片点击放大
                var screenW=window.screen.availWeight;
                var screenH=window.screen.availHeight;
                $(".mon-box").css("width",screenW+"px");
                $(".mon-box").css("height",screenH+"px");
                $(".mon-layer").css("width",screenW+"px");
                $(".mon-layer").css("height",screenH+"px"); 
            
                 $(".lookimg-box img").click(function(){
                    $(".mon-box").css("display","block");
                    $(".mon-layer").css("display","block");
                        var src=$(this).attr("src");
                        $(".mon-layer .pic").attr("src",src);
                })
                $(".mon-layer").click(function(){
                    $(".mon-box").css("display","none");
                    $(".mon-layer").css("display","none");
                })
                   // 收藏

                   $(".collect-num").click(function(){
                        if($(this).children("i").hasClass("act")){
                            $(this).removeClass("act");
                        }else{
                            $(this).children("i").addClass("act");
                        }
                   })
                // $(document).on("click",".collect-num",function() { 
                //     // var collectNum=parseInt($(this).children("b").text())+1;
                //     // $(this).children("b").text(collectNum);
                //     // return;
                //     // console.log(collectNum) 
                               
                // })

        },
        error:function(res){
            console.log("请检查您的网路")
         } 
    })
})

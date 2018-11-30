$(function(){
    $.ajax({
        type:'get',
        url: PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=SetGoodsType&m=zh_tcwq",
        success:function(res){
            var data=JSON.parse(res);
            var type=data.type;
            var type2=data.type2.type2;
            var type_img=data.type2.type_img;
            console.log(data)
            console.log(type2)
            var str="";
            $.each(type,function(i,item){
                if(item.type_name.length>4){
                    var type_name=item.type_name.slice(0,4)+"..."
                }else{
                    var type_name=item.type_name;
                } 
                str+='<li title='+item.type_name+' id='+item.id+'>'+type_name+'</li>';
            })
            $("#classify_name ul").append(str);
            $("#classify_name ul li").eq(0).addClass("active");
            var typeId=$("#classify_name ul li").eq(0).attr("id");
            var  typeN=escape($("#classify_name ul li").eq(0).attr("title"));
            classifyTlist(typeId,typeN);
            $("#classify_name ul li").click(function(){
                $(this).addClass("active").siblings().removeClass("active"); 
                typeId=$(this).attr("id");
                typeN=escape($(this).attr("title"));
                classifyTlist(typeId,typeN);
            })
            // https://www.youqiancheng.com/app/index.php?i=2&c=entry&a=wxapp&do=SetGoodsType2&m=zh_tcwq&type_id=3
    
           function classifyTlist(typeId){
            $.ajax({
                type:'get',
                url: PUBLICA+"index.php?i=2&c=entry&a=wxapp&do=SetGoodsType2&m=zh_tcwq&type_id=3",
                data:{
                    type_id: typeId
                },
                success:function(res){
                    var data=JSON.parse(res);
                    console.log(data)
                        var str="";
                        var str1="";
                        $.each(data.type2,function(j,item2){
                            str+='<div class="img-bwarp" id="'+item2.id+'">'+
                                        '<a href="goodsList2.html?q='+typeN+'&goodstype='+item2.type_id+'&type2N='+escape(item2.name)+'&goodstype2='+item2.id+'">'+
                                            '<div class="img-boxx">'+
                                                    '<img src="'+PUBLICIMG+'/'+item2.img+'" alt="">'+
                                            '</div>'+
                                            '<span>'+item2.name+'</span>'+
                                        '</a>'+
                                '</div>'
                        })
                        str1='<div class="classify-imgbox">'+
                                '<img src="'+PUBLICIMG+'/'+data.type_img+'" alt="">'+
                            '</div>'+
                            '<div class="oneclass-list">'+str+'</div>'
                        $("#classify-cont").html(str1);
                }
           })

        }
        },
        error:function(res){
            console.log("请检查您的网路")
        }

    })



})
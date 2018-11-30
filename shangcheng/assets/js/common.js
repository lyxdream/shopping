

$(".nav-list li a").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
})
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
//  function lunbo(){ 
//     var len=$(".list-pic li").length;
//     var iNow=0;
//     var timer=null;
//     var animated=true;
// //        如果是false就停止运动
//     var src=$(".list-pic").eq(0).find('img').attr('src');
//     $(".list-pic").append('<li><img src="'+src+'" alt=""/></li>');
//     var greenW=window.screen.width;
//     if(greenW>1920){
//         greenW=1920;
//     }else{
//         return;
//     }
//     var iH=parseInt(greenW*0.36);
//     $(".lunbo-wrap").height(iH);
//     $(".list-pic").height(iH);
//     $(".list-pic li").height(iH);
//     $(".list-pic li").width(greenW);
//     var iW=$(".list-pic li").outerWidth();
//     console.log(iW)
//     $(".list-pic").css('width',iW*(len+1)+'px');
//     autoPlay();
//     $(".btn-list li").click(function(){
//         iNow=$(this).index();
//         changeShow();
//     })
//     $(".data-lun").mouseover(function(){
//         clearInterval(timer);
//     })
//     $(".data-lun").mouseout(function(){
//         autoPlay();
//     })
//     function autoPlay(){
//         timer=setInterval(function(){
//             if(!animated){
//                 return
//             }
//             if(iNow>=len){
//                 iNow=0;
//                 $(".list-pic").css({left:0})
//             }
//             iNow++;
//             changeShow();
//         },3000)
//     }
//     function changeShow(){
//         animated=false;
//         $(".list-pic").stop().animate({left:-iW*iNow},function(){
//             animated=true;
//         });
//         $(".btn-list li").removeClass("active").eq(iNow%len).addClass("active");
//     }
//   }
 


// 轮播
function focusPic($list,$picLi,$btnLi,$wrap){
      var len=$picLi.length;
      var iNow=0;
      var timer=null;
      $btnLi&&$btnLi.removeClass("active").eq(iNow).addClass("active");
      $picLi&&$picLi.hide().eq(iNow).show();
      if(len<=1){
         return 
      }else{
          autoPlay();
          $btnLi&&$btnLi.click(function () {
              if($(this).hasClass("active")){
                  return;
              }
                  iNow = $(this).index();
                  changeView()
          });
          $wrap&&$wrap.hover(function(){
              clearInterval(timer);
          },function(){
              autoPlay();	
          });
      
          function autoPlay(){
              timer=setInterval(toNext,2000);
          }
          function toNext(){
              iNow++;
              if (iNow>len-1) {
                  iNow=0
              }
              changeView();
          }
          function changeView(){
              
                  $btnLi&&$btnLi.removeClass("active").eq(iNow).addClass("active");
              $picLi&&$picLi.stop().fadeOut().eq(iNow).fadeIn();
          }		
      } 
  }
  function bulletin(){
    var $ul=$(".bulletin-list ul");
    var $li=$(".bulletin-list ul li");
    var $list=$(".bulletin-list");
        var iH=$li.outerHeight();
        var timer=null;
        autoScroll();
        $list.hover(function(){
            clearInterval(timer);
        },function(){
            autoScroll();
        })
        function autoScroll(){
            timer=setInterval(function(){
                $ul.animate({"top":-iH},function(){
                  $(".bulletin-list ul li").eq(0).appendTo($ul);
                    $ul.css({"top":0});
                })
                
            },2000)
        }  
    }

   
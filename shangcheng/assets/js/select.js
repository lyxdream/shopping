// $(function() {
//     function pull_down(select, selector, selector_span, img_s, default_value) {
//         $(select).click(function (event) {
//             event.stopPropagation();
//             $(selector).not($(this).children(selector)).hide()
//             $(img_s).removeClass("Kszta-t")
//             $(img_s).addClass("Kszta-b")
//             $(this).children(selector).toggle()
//             var len = $(this).children(selector).children('span').length;
//             console.log(len)
//             if ($(this).children(selector).is(":hidden")) {
//                 $(this).children(img_s).removeClass("Kszta-t")
//                 $(this).children(img_s).addClass("Kszta-b")

//             } else {
//                 $(this).children(img_s).removeClass("Kszta-b")
//                 $(this).children(img_s).addClass("Kszta-t")
//             }

//         })
//         $(selector_span).click(function (event) {
//             event.stopPropagation();
//             var val = $(this).text();
//             var data_Id= $(this).attr("id");
//             console.log(data_Id);
//             var valinp = $(this).children("input").val();
//             $(img_s).removeClass("Kszta-t")
//             $(img_s).addClass("Kszta-b")
//             $(this).parent().siblings(default_value).text(val);
//             // $(this).parent().siblings(default_value).attr("id",)
//             $(this).siblings("input").val(valinp)
//             $(this).parent(selector).hide()
//             console.log($(this).siblings("input").val())
//         })
//         $("body").not($(select)).click(function () {
//             $(selector).hide()
//             $(img_s).removeClass("Kszta-t")
//             $(img_s).addClass("Kszta-b")
//         })
//         $("[type='reset']").click(function () {
//             location.reload()
//         })
//     }

//     pull_down("#sort-select", ".selector-type", ".selector-type span", ".img-s", ".default-val");

// })


function pl_down(select, selector, selector_span, default_value){
    $(select).click(function (event) {
            event.stopPropagation();
            $(selector).not($(this).children(selector)).hide();
            $(this).children(selector).toggle()
            var len = $(this).children(selector).children('span').length;
    })
    $(selector_span).click(function (event) {
        event.stopPropagation();
        var val = $(this).text();
        var sel_Id= $(this).attr("id");
        console.log(sel_Id);
        $(img_s).removeClass("Kszta-t")
        $(img_s).addClass("Kszta-b")
        $(this).parent().siblings(default_value).text(val);
        $(this).parent(selector).hide();
    })
    $("body").not($(select)).click(function () {
        $(selector).hide()
    })
    $("[type='reset']").click(function () {
        location.reload()
    })
}
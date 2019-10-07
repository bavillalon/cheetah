
var span = function (event){
    $(".modal").css("display","none");
    
};
var modal = function (event) {
    
    $(".modal").css("display","block"); 
    
};
$("#log").on("touchstart click",modal);
$(".close").on("touchstart click",span);

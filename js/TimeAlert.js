// 弹窗


$(function(){
    initModel()//初始化
    init()
    var staTime;//计时器
    function initModel(){//初始化方法
       staTime=setInterval(function () {
           init()
        },1000 * 60)
    }
function init() {
    $.ajax({
        contentType: "application/json;charset=UTF-8",
        url: '/api/v1/homepage/hui-fen/message',
        dataType: 'text', //服务器返回json格式数据
        type: 'get', //HTTP请求类型
        success: function(data) {

            if(data != null && data != ""){
                alertCenter(data)//弹窗
                clearInterval(staTime)//停止计时器
            }


        }
    })
}
    function alertCenter(data){

    Swal.fire({
        title: data,
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',

        buttonsStyling: false,
        allowOutsideClick:false,
    }).then(function(isConfirm) {
        if (isConfirm.value === true) {

            callData('1')
            initModel()

        } else if (isConfirm.dismiss === "cancel") {
            callData('0')
            initModel()

        }
    })

    }


    function callData(id){
        $.ajax({
            contentType: "application/json;charset=UTF-8",
            url: '/api/v1/homepage/hui-fen/alarm/'+id,
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型
            success: function(data) {
                // initModel()//继续跑
            }
        })
    }

})
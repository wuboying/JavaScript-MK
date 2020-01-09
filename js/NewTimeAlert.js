// 弹窗


$(function(){
    initModels()//初始化
    inits()
    var staTimes;//计时器
    function initModels(){//初始化方法
       staTimes=setInterval(function () {
           inits()
        },1000 * 15)
    }
function inits() {
    $.ajax({
        contentType: "application/json;charset=UTF-8",
        url: '/api/v1/homepage/liquid/message',
        dataType: 'text', //服务器返回json格式数据
        type: 'get', //HTTP请求类型
        success: function(data) {

            if(data != null && data != ""){
                alertCenters(data)//弹窗
                clearInterval(staTimes)//停止计时器
            }


        }
    })
}
    function alertCenters(data){

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
        customClass: "sweetAlert-new",
        buttonsStyling: false,
        allowOutsideClick:false,
    }).then(function(isConfirm) {
        if (isConfirm.value === true) {

            callDatas('1')
            initModels()

        } else if (isConfirm.dismiss === "cancel") {
            callDatas('0')
            initModels()

        }
    })

    }


    function callDatas(id){
        $.ajax({
            contentType: "application/json;charset=UTF-8",
            url: '/api/v1/homepage/liquid/alarm/'+id,
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型
            success: function(data) {
                // initModel()//继续跑
            }
        })
    }

})
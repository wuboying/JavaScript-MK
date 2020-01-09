// -----设备状态---密度调整

$(function() {

	 online=null;
	offline=null;
	$(document).on('click', '#fill-btn', function() {
		fillClick()
	});
	// 分流阀开度----验证条件
	$("#form-splite-flow-valve").bootstrapValidator({
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			spliteflowipt2: {
				validators: {
					notEmpty: {
						message: '值不能为空'
					},
					regexp: {
						regexp: /^(?:0|[1-9][0-9]?|100)$/,
						message: '只能输入0-100整数'
					},
				}
			},

		}
	});
	// 补水阀开度----验证条件
	$("#form-make-up-valve").bootstrapValidator({
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			makeupipt2: {
				validators: {
					notEmpty: {
						message: '值不能为空'
					},
					regexp: {
						regexp: /^(?:0|[1-9][0-9]?|100)$/,
						message: '只能输入0-100整数'
					},
				}
			},

		}
	});
	// 设定密度----验证条件
	$("#form-Set-the-density").bootstrapValidator({
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			densityipt: {
				validators: {
					notEmpty: {
						message: '值不能为空'
					},
					regexp: {
						regexp: /^[0-1]{1}([.][0-9]{1,3})?$/,
						message: '整数最大为1,小数位3'
					},
                    callback: {
                        message: '不能大于或小于生产密度上下限',
                        callback: function(value, validator) {
                            //这里可以自定义value的判断规则
                            if (value<offline){ //"请选择"
                                //错误的参数值
                                validator.updateMessage('densityipt', 'callback', '不能小于生产密度下限');
                                return false;
                            }
                            if (value>online){ //"请选择"
                                //错误的参数值
                                validator.updateMessage('densityipt', 'callback', '不能大于生产密度上限');
                                return false;
                            }
                                //合格的参数值
                                return true;

                        }
                    },
				}
			},

		}
	});
	//自动模式获取上下限区间
    function Bound() {
        $.ajax({
            contentType: "application/json;charset=UTF-8",
            url: '/api/v1/homepage/ashSection',
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(data) {


                online = data.密度上限
				offline = data.密度下限

            },
            error: function(xhr, type, errorThrown) {

            }
        });

    }

	
	// 化验灰分填报--时间
	function fillData() {
		$(".fill-ipt").val("");
		
		$(".The-report-time").val("");
		fillTime = '';
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			laydate.render({
				elem: '#The-report-time',
				theme: '#2c9ae6',
				type: 'datetime',
				done: function(value, date, endDate) {
				
					fillTime = value;
					
				}
			})
		})
}
	// 化验灰分填报---提交接口
	function fillAjax() {
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: '/api/v1/homepage/incineration',
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			data: JSON.stringify({
				"incinerationValue": $(".fill-ipt").val(),
				"incinerationTime": fillTime,
				
			}),
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if (data.code == 0) {
					message(data.message, 'success')
				} else if (data.code == 1) {
					message(data.message, 'error')
				}
			},
			error: function(xhr, type, errorThrown) {
				message('修改失败', 'error')
			}
		});
	}

	function fillClick() {

		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				title: '化验灰分填报',
				type: 1,
				offset: 'auto', //位置
				skin: 'fill-class', //样式类名
				closeBtn: 1, //显示关闭按钮
				anim: 2, //出来动画
				btn: ['提交', '取消'],
				resize: false, //缩放
				isOutAnim: false, //取消关闭动画
				area: ['600px', '400px'], //宽高
				shadeClose: false, //开启遮罩关闭
				content: $('#fill-div'), //放内容的
				success: function(layero, index) { //model点击成功之后回调
					$(':focus').blur(); //防止多层灯罩
					fillData();
				},
				yes: function(index, layero) { //保存
			
				fillAjax();
						layer.close(index); //如果设定了yes回调，需进行手工关闭
				
				},
				  btn2: function(index, layero){
					  
				  },
				cancel:function(){

			
				}
			});
		});
	}



	// 加载 ---密度设置执行
	tableIns();
	auto = ""; //0页面加载  1手动 2自动
	bell = 1;
	bes = 1;
	// 采集数据  方法
	function gather(data) {
		if (data.deviceSetData != null) {
			var da = data.deviceSetData;
			if (bell == 1) {
				if (da.shutValve != null) {

					$(".splite-flow-ipt2").val(da.shutValve).attr({
						"title": da.shutValve
					});
				}
				if (da.supplementaryValve != null) {
					$(".make-up-ipt2").val(da.supplementaryValve).attr({
						"title": da.supplementaryValve
					});
				}
			}
		}
		if (data.deviceDatas != null) {
			var data = data.deviceDatas;
			for (var i = 0; i < data.length; i++) {
				switch (data[i]["id"]) {
					case 17:
						if (data[i]["value"] != null) {
							$(".liquid-level1").text(data[i]["value"]).attr({
								"id": data[i]["id"],
								"title": data[i]["value"]
							});
						}
						break;
					case 56:
						if (data[i]["value"] != null) {
							$(".shunt-below").text(data[i]["value"]).attr({
								"id": data[i]["id"],
								"title": data[i]["value"]
							});
						}
						break;
					case 45:
						if (data[i]["value"] != null) {
							$(".make-below").text(data[i]["value"]).attr({
								"id": data[i]["id"],
								"title": data[i]["value"]
							});
						}
						break;
					case 2:
						if (data[i]["value"] != null) {
							$(".stress").text(data[i]["value"]).attr({
								"id": data[i]["id"],
								"title": data[i]["value"]
							});
						}
						break;
					case 47:
						if (data[i]["value"] != null) {
							$(".magnetic-material").text(data[i]["value"]).attr({
								"id": data[i]["id"],
								"title": data[i]["value"]
							});
						}
						break;
					case 12:
						if (bes == 1) {
							if (data[i]["value"] != null) {
								$(".density-ipt").val(data[i]["value"]).attr({
									"id": data[i]["id"],
									"title": data[i]["value"]
								});
							}
						}
						break;

					case 99:
						if (data[i]["value"] != null) {
							// TODO
							// var value = data[i]["value"]
							var value = "--";
							$(".make-flow").text(value).attr({
								"id": data[i]["id"],
								"title": value
							});
						}
						break;
					case 89:
						if (data[i]["value"] != null) {
							$(".slurry").text(Number(data[i]["value"]).toFixed(2)).attr({
								"id": data[i]["id"],
								"title": Number(data[i]["value"]).toFixed(2)
							});
						}
						break;
					case 98:
						if (data[i]["value"] != null) {
							$(".liquid-level2").text(data[i]["value"]).attr({
								"id": data[i]["id"],
								"title": data[i]["value"]
							});
						}
						break;
				}
			}

		}

	}






	function stateTime() {
		setInterval(function() {
			$.ajax({
				contentType: "application/json;charset=UTF-8",
				url: '/api/MKDevice/programRunningMode',
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					if (data.code == 0) {
						if (data.result != tag) {
							$("#status-bar>li").removeClass("status-bar-color");
							tag = data.result;
							switch (tag) {
								case "1":
									$(".btn-gather").addClass("status-bar-color");
									break;
								case "2":
									$(".btn-manual").addClass("status-bar-color");
									break;
								case "3":
									$(".btn-auto").addClass("status-bar-color");
									break;
								case "4":
									$(".btn-capacity").addClass("status-bar-color");
									break;
							}
							judge(); //更改状态格式

						}

						if (tag == 1) {


							stateData(gather, tag)
						} else if (tag == 2) {

							bell = 0;
							stateData(gather, tag)
						} else if (tag == 3) {

							bes = 0;

							stateData(gather, tag)
						} else {
							
							stateData(gather, tag)
						}

					}
				},
				error: function(xhr, type, errorThrown) {

				}
			});






		}, 1000)
	}

	// 标识 1.2.3.4   页面加载获取默认标识
	tag = '';
	$.ajax({
		contentType: "application/json;charset=UTF-8",
		url: '/api/MKDevice/programRunningMode',
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if (data.code == 0) {
				tag = data.result;

				switch (tag) {
					case "1":
						$(".btn-gather").addClass("status-bar-color");
						break;
					case "2":
						$(".btn-manual").addClass("status-bar-color");
						break;
					case "3":
						$(".btn-auto").addClass("status-bar-color");
						break;
					case "4":
						$(".btn-capacity").addClass("status-bar-color");
						break;
				}
				judge(); //更改状态格式


				stateData(gather, tag)
				stateTime();

			}
		},
		error: function(xhr, type, errorThrown) {

		}
	});



	// 判断标识更改设备状态
	function judge() {
		if (tag == "1") {
			$("#li-sw").hide();
			$(".arrows,.splite-flow-ipt2,.make-up-ipt2,.splite-flow-span,.make-up-span").hide();
			// $(".density-ipt").addClass('border')
			$(".splite-flow-ipt2,.make-up-ipt2,.density-ipt").addClass('border')
			$(".splite-flow-ipt2,.make-up-ipt2,.density-ipt").attr("disabled", 'disabled');
			clearInterval(setSwitch)//停止计时器

		} else if (tag == "2") {
			$("#li-sw").hide();
			$(".splite-flow-ipt2,.make-up-ipt2").removeClass('border')
			$(".density-ipt").addClass('border')
			$(".arrows,.splite-flow-ipt2,.make-up-ipt2,.splite-flow-span,.make-up-span").show();
			$(".density-ipt").attr("disabled", 'disabled');
			$(".splite-flow-ipt2,.make-up-ipt2").attr("disabled", false);
			clearInterval(setSwitch)//停止计时器

		} else if (tag == "3") {
			$("#li-sw").hide();
			$(".density-ipt").removeClass('border')
			$(".splite-flow-ipt2,.make-up-ipt2").addClass('border')
			$(".arrows,.splite-flow-ipt2,.make-up-ipt2,.splite-flow-span,.make-up-span").show();
			$(".density-ipt").attr("disabled", false);
			$(".splite-flow-ipt2,.make-up-ipt2").attr("disabled", 'disabled');
			clearInterval(setSwitch)//停止计时器

		} else if (tag == "4") {
			$(".splite-flow-ipt2,.make-up-ipt2,.density-ipt").addClass('border')
			$(".arrows,.splite-flow-ipt2,.make-up-ipt2,.splite-flow-span,.make-up-span").show();
			$(".splite-flow-ipt2,.make-up-ipt2,.density-ipt").attr("disabled", 'disabled');
			$("#li-sw").show();

	Switcha()//滑块计时器
		}
	}
	
	
	var setSwitch;//计时器
	function Switcha(){//初始化方法
	   setSwitch=setInterval(function () {
		   		$.ajax({
		   	contentType: "application/json;charset=UTF-8",
		   	url: '/api/v1/homepage/block',
		   	dataType: 'json', //服务器返回json格式数据
		   	type: 'get', //HTTP请求类型
		   	timeout: 10000, //超时时间设置为10秒；
		   	success: function(data) {
		   		if(data==0){
					$(".btnOK").addClass('btn-active').siblings().removeClass("btn-active");
	
		   		}else{
					$(".btnNO").addClass('btn-active').siblings().removeClass("btn-active");
		   		}

		   	},
		   	error: function(xhr, type, errorThrown) {
		   
		   	}
		   });
	    },2000)
	}
		//-----------------------------------------------------------------------------------滑块获取状态
 
			// -------------------------------------------
		$(".btnOK").click(function(){
			swal.fire({
				text: "您确定要选择化验吗？",
				type: 'question',
				showCancelButton: true,
				confirmButtonColor: '#f8bb86',
				cancelButtonColor: 'gray',
				cancelButtonText: '取消',
				reverseButtons: false, //控制按钮反转
				confirmButtonText: '确认',
			}).then(function(isConfirm) {
				if(isConfirm.value == true) {
					$(this).addClass('btn-active').siblings().removeClass("btn-active");
					switchOFF(0)
				}
			})
		})
		$(".btnNO").click(function(){

				swal.fire({
					text: "您确定要选择检测吗？",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#f8bb86',
					cancelButtonColor: 'gray',
					cancelButtonText: '取消',
					reverseButtons: false, //控制按钮反转
					confirmButtonText: '确认',
				}).then(function(isConfirm) {
					if(isConfirm.value == true) {
						$(this).addClass('btn-active').siblings().removeClass("btn-active");
						switchOFF(1)
					}
				})

		})

function switchOFF(data){//--------------------------------------滑块变化
	$.ajax({
		contentType: "application/json;charset=UTF-8",
		url: '/api/v1/homepage/block/'+data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			
		},
		error: function(xhr, type, errorThrown) {
	
		}
	});
}



	// 点击设备状态背景颜色status-bar-color 更改设备标识
	$("#status-bar>li").click(function() {
		$(this).addClass("status-bar-color").siblings().removeClass("status-bar-color");
		tag = $(this).val();
		$('#form-splite-flow-valve').data('bootstrapValidator').updateStatus('spliteflowipt2', 'NOT_VALIDATED', null)
		$('#form-make-up-valve').data('bootstrapValidator').updateStatus('makeupipt2', 'NOT_VALIDATED', null)
		$('#form-Set-the-density').data('bootstrapValidator').updateStatus('densityipt', 'NOT_VALIDATED', null)
		judge() //更改状态格式

		bell = 1;
		bes = 1;

		stateData(gather, tag)
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: '/api/MKDevice/updateRunningMode/' + tag,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {},
			error: function(xhr, type, errorThrown) {

			}
		});
		// stateData(gather, tag)
	})
	// 获取默认状态数据
	function stateData(method, tag) { //方法名 变量
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: '/api/MKDevice/selectState',
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			data: JSON.stringify({
				'programRunningMode': tag
			}),
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if (data.code == 0) {
					data = data.message;
					method(data)
				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}





	// 设备状态回车
	$(".make-up-ipt2").keyup(function() {
		if (event.keyCode == 13) {
			if ($("#form-make-up-valve").data('bootstrapValidator').isValid()) { //获取验证结果，如果成功，执行下面代码
				LoseFocus(tag, $(".make-below").attr("id"), $(".make-below").text(), $(this).val())
				$(this).blur();
			}
		}
	})
	$(".splite-flow-ipt2").keyup(function() {
		if (event.keyCode == 13) {
			if ($("#form-splite-flow-valve").data('bootstrapValidator').isValid()) { //获取验证结果，如果成功，执行下面代码
				LoseFocus(tag, $(".shunt-below").attr("id"), $(".shunt-below").text(), $(this).val())
				$(this).blur();
			}
		}
	})
	$(".density-ipt").keyup(function() {
        Bound()
		if (event.keyCode == 13) {
			if ($("#form-Set-the-density").data('bootstrapValidator').isValid()) { //获取验证结果，如果成功，执行下面代码
				LoseFocus(tag, $(this).attr("id"), $(this).attr("title"), $(this).val())
				$(this).blur();
			}
		}

	})

	// 失去聚焦发送数据
	function LoseFocus(tag, ida, befor, after) {
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: '/api/MKDevice/editDeviceState',
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			data: JSON.stringify({
				"runningMode": tag,
				"desc": ida,
				"beforValue": parseFloat(befor),
				"afterValue": parseFloat(after)
			}),
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if (tag == 3) {
					tableIns();
				};

				if (data.code == 0) {
					message('操作成功', 'success')
				} else if (data.code == 1) {
					message('操作失败', 'error')
				}
			},
			error: function(xhr, type, errorThrown) {
				message('操作失败', 'error')
			}
		});
	}

	// 密度调整
	function tableIns() {
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: '/api/MKDevice/selectMkDensityAction',
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if (data.code == 0) {
					if (data.result.length > 0) {
						$(".left-min-center").html("");
						for (var i = 0; i < data.result.length; i++) {
							var $li = $("<li><p class='suggested-time'>" + data.result[i].adjustTimeStr +
								"</p><p class='recommended-operating'>" + data.result[i].stepAdjustPlus + "</p><p title='" +
								data.result[i].operationalBasis + "' class='operating-on'>" +
								data.result[i].operationalBasis + "</p></li>")
							$(".left-min-center").append($li);
						}
					}
				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}
	// 60分钟刷新
	setInterval(function() {
		tableIns();
	}, 1000 * 30)





	// alert
	function message(mes, type) {
		Swal.fire({
			position: 'center',
			type: type,
			title: mes,
			showConfirmButton: false,
			timer: 2000,
		})
	}
})

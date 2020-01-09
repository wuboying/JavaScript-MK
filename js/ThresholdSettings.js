// ------阈值设置
$(function() {
	// 阈值页面加载
	GetThreshold(FourThreshold)
	// 阈值方法
	function GetThreshold(thresh) {
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: '/api/MKSystem/list',
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if (data["code"] == 0) {
					data = data["message"];
					thresh(data);
				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});

	}


	function GetData(thresh) {
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: '/api/MkSystem/listAll',
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
					thresh(data);
			},
			error: function(xhr, type, errorThrown) {

			}
		});

	}

	// 阈值设置四个
	function FourThreshold(data) {
		$("#Set-up-and-down").html("")
		for (var i = 0; i < 4; i++) {
			var $li = $("<li><form id='form" + (i + 1 + 'a') + "'><div class='form-group'><p id='" + data[i]["configName"] +
				"'>" + data[i]["configDesc"] + "</p><input id='input" + (i + 1 + 'b') + "' placeholder='请输入' name='" + data[i][
					"configName"
				] + "' onfocus='this.select();' value='" +
				data[i]["configValue"] + "' class='vpt-ipt form-control' type='text' autocomplete='off'></div></form></li>")
			$("#Set-up-and-down").append($li)
		}
		$("#form1a").bootstrapValidator({
			feedbackIcons: {
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				cleanedCoalAshLower: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						callback: {
							message: '不能大于或等于精煤灰分上限',
							callback: function(value, validator) {
								//这里可以自定义value的判断规则
								if (value>=Number($("#input2b").val())){ //"请选择"
									//错误的参数值
									return false;
								} else {
									//合格的参数值
									return true;
								}
							}
						},
						regexp: {
							regexp: /^[7-9]\.[0-9]{1,3}$|^[7-9]{1}$|^10{1}$|^10\.[0-9]{1,3}$|^11{1}$|^11\.[0]{1,3}$/,
							message: '只能输入7-11整数,小数位3'
						},
					
					

					}
				},
			}
		});
		$("#form2a").bootstrapValidator({
			feedbackIcons: {
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				cleanedCoalAshUpper: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						callback: {
							message: '不能小于或等于精煤灰分下限',
							callback: function(value, validator) {
								//这里可以自定义value的判断规则
								if (value<=Number($("#input1b").val()) ){ //"请选择"
									//错误的参数值
									return false;
								} else {
									//合格的参数值
									return true;
								}
							}
						},
						regexp: {
							regexp: /^[7-9]\.[0-9]{1,3}$|^[7-9]{1}$|^10{1}$|^10\.[0-9]{1,3}$|^11{1}$|^11\.[0]{1,3}$/,
							message: '只能输入7-11整数,小数位3'
						},
					
					
					}
				},
			}
		});
		$("#form3a").bootstrapValidator({
			feedbackIcons: {
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				stepAdjustFactor: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						callback: {
							message: '不能小于或等于生产密度下限',
							callback: function(value, validator) {
								//这里可以自定义value的判断规则
								if (value<=Number($("#input4b").val())){ //"请选择"
									//错误的参数值
									return false;
								} else {
									//合格的参数值
									return true;
								}
							}
						},
					regexp: {
						regexp: /^[1-9]{1,2}$|^[1-9]{1,2}[\.]{1}[0-9]{1,2}$/,
						message: '请输入大于等于1的整数小数位2'
					},
					}
				},
			}
		});
		$("#form4a").bootstrapValidator({
			feedbackIcons: {
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				supAdviseLoopCnt: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						callback: {
							message: '不能大于或等于生产密度上线限',
							callback: function(value, validator) {
								//这里可以自定义value的判断规则
								if (value>=Number($("#input3b").val())){ //"请选择"
									//错误的参数值
									return false;
								} else {
									//合格的参数值
									return true;
								}
							}
						},
				regexp: {
					regexp: /^[1-9]{1,2}$|^[1-9]{1,2}[\.]{1}[0-9]{1,2}$/,
					message: '请输入大于等于1的整数小数位2'
				},
					}
				},
			}
		});
		Lose1($('#input1b'))
		Lose2($('#input2b'))
		Lose3($('#input3b'))
		Lose4($('#input4b'))
	}
	// 更多---验证
	function MoreVerify() {

		$("#formquan").bootstrapValidator({
			feedbackIcons: {
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				cleanedCoalAshUpper: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^[7-9]\.[0-9]{1,3}$|^[7-9]{1}$|^10{1}$|^10\.[0-9]{1,3}$|^11{1}$|^11\.[0]{1,3}$/,
							message: '只能输入7-11整数,小数位3'
						},
						different: {
							field: 'cleanedCoalAshLower',
							message: '不能与精煤灰分下限值相同'
						},
						callback: {
							message: '不能小于精煤灰分下限',
							callback: function(value, validator) {
								//这里可以自定义value的判断规则
								if (value<Number($(".cleanedCoalAshLower").val()) ){ //"请选择"
									//错误的参数值
									return false;
								} else {
									//合格的参数值
									return true;
								}
							}
						},
					}
				},
				cleanedCoalAshLower: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^[7-9]\.[0-9]{1,3}$|^[7-9]{1}$|^10{1}$|^10\.[0-9]{1,3}$|^11{1}$|^11\.[0]{1,3}$/,
			message: '只能输入7-11整数,小数位3'
						},
						different: {
							field: 'cleanedCoalAshUpper',
							message: '不能与精煤灰分上限值相同'
						},
						callback: {
							message: '不能大于精煤灰分上限',
							callback: function(value, validator) {
								//这里可以自定义value的判断规则
								if (value>Number($(".cleanedCoalAshUpper").val()) ){ //"请选择"
									//错误的参数值
									return false;
								} else {
									//合格的参数值
									return true;
								}
							}
						},
					}
				},
				minimumOpeningOfRefillValve: {
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
				maximumOpeningOfRefillValve: {
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
				minimumValveOpening: {
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
				maximumOpeningOfShuntValve: {
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
				machineCycle: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^(?:[0-2]?\d{1,3}|3000)$/,
							message: '请输入0-3000区间的正整数'
						},
					}
				},
				highLevel: {
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
				superHighLevel: {
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
				lowLevel: {
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
				superLowLevel: {
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
				regulationCoefficientOfShuntValve: {
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
				peatQuantityRegulationCoefficient: {
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
				peatLevelSetHigh: {
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
				peatLevelSetSuperHigh: {
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
				peatLevelSetLow: {
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
				peatLevelSetSuperLow: {
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
				adjustmentCoefficientOfFillingValve: {
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
				adjustmentCoefficientOfWaterLevelOfRefillValve: {
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
				densityError: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^0\.[0-9]{1,3}$|^1{1}$|^1\.[0]{1,3}$/,
							message: '请输入大于0小于等于1区间,小数位3'
						},
					}
				},
				slurryDensity: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^1\.[0-9]{1,3}$|^1{1}$|^2{1}$|^2\.[0]{1,3}$/,
							message: '请输入1-2区间,小数位3'
						},
					}
				},
				magnetitePowderDensity: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^[1-9]\.[0-9]{1,3}$|^[1-9]{1}$|^10{1}$|^10\.[0]{1,3}$/,
							message: '请输入1-10区间,小数位3'
						},
					}
				},
				stepAdjustFactor: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^0\.[0-9]{1,3}$|^0{1}$|^1{1}$|^1\.[0]{1,3}$/,
							message: '请输入0-1区间,小数位3'
						},
					}
				},
				diversionValveDensityAdjustmentCoefficient: {
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
				mediumBarrelHigh: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^\d+(\.(?!.*0$)\d{1,2})?$/,
							message: '请输入大于等于0的整数，小数位2'
						},
					}
				},
				ashCalInterval: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^\+?[1-9]\d*$/,
							message: '请输入大于等于1的正整数'
						},
					}
				},
				supAdviseLoopCnt: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^\+?[0-9]\d*$/,
							message: '请输入大于等于0的正整数'
						},
					}
				},
				supStepComValue: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^0\.[0-9]{1,3}$|^0{1}$|^1{1}$|^1\.[0]{1,3}$/,
							message: '请输入0-1区间,小数位3'
						},

					}
				},
				densityObservationPeriod: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^\+?[0-9]\d*$/,
							message: '请输入大于等于0的正整数'
						},
					}
				},
				ashUpper: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^[1-9]{1,2}$|^[1-9]{1,2}[\.]{1}[0-9]{1,2}$/,
							message: '请输入大于等于1的整数小数位2'
						},
						different: {
							field: 'ashLower',
							message: '不能与灰分边界下限值相同'
						},
						callback: {
							message: '不能小于灰分边界下限',
							callback: function(value, validator) {
								//这里可以自定义value的判断规则
								if (value<Number($(".ashLower").val()) ){ //"请选择"
									//错误的参数值
									return false;
								} else {
									//合格的参数值
									return true;
								}
							}
						},
					}
				},
				ashLower: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^[1-9]{1,2}$|^[1-9]{1,2}[\.]{1}[0-9]{1,2}$/,
							message: '请输入大于等于1的整数小数位2'
						},
						different: {
							field: 'ashUpper',
							message: '不能与灰分边界上限值相同'
						},
						callback: {
							message: '不能大于灰分边界上限',
							callback: function(value, validator) {
								//这里可以自定义value的判断规则
								if (value>Number($(".ashUpper").val()) ){ //"请选择"
									//错误的参数值
									return false;
								} else {
									//合格的参数值
									return true;
								}
							}
						},
					}
				},
				EffectivelyTime: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^\+?[1-9]\d*$/,
							message: '请输入大于等于1的正整数'
						},
					}
				},
				ashContentExceedsBid: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^\+?[1-9]\d*$/,
							message: '请输入大于等于1的正整数'
						},
					}
				},
				safetyDensity: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^[1-9]{1,2}$|^[1-9]{1,2}[\.]{1}[0-9]{1,2}$/,
							message: '请输入大于等于1的整数小数位2'
						},
					}
				},
				safetyDensityTime: {
					validators: {
						notEmpty: {
							message: '值不能为空'
						},
						regexp: {
							regexp: /^\+?[1-9]\d*$/,
								message: '请输入大于等于1的正整数'
						},
					}
				},


				effectiveAshTime: {
			validators: {
				notEmpty: {
					message: '值不能为空'
				},
				regexp: {
					regexp: /^\+?[1-9]\d*$/,
						message: '请输入大于等于1的正整数'
				},
			}
		},
			}
		});
	}

	// 阈值设置--更多
	function MultiThreshold(data) {
		$("#set-model1").html("")
		$("#set-model2").html("")
		$("#set-model3").html("")
		
		for(var i=0;i<data[0].length;i++){
			var $li = $("<li><div class='form-group'><p id='" + data[0][i]["configName"] +
				"'>" + data[0][i]["configDesc"] +
				"</p><input placeholder='请输入' name='" + data[0][i]["configName"] + "' onfocus='this.select();' value='" + data[0][i][
					"configValue"
				] +
				"' class='vptipt form-control "+ data[0][i]["configName"] +"' type='text' autocomplete='off'></div></li>")
			$("#set-model1").append($li)
		}
		for(var i=0;i<data[1].length;i++){
			var $li = $("<li><div class='form-group'><p id='" + data[1][i]["configName"] +
				"'>" + data[1][i]["configDesc"] +
				"</p><input placeholder='请输入' name='" + data[1][i]["configName"] + "' onfocus='this.select();' value='" + data[1][i][
					"configValue"
				] +
				"' class='vptipt form-control "+ data[1][i]["configName"] +"' type='text' autocomplete='off'></div></li>")
			$("#set-model2").append($li)
		}
		for (var i = 0; i < data.length; i++) {
		for(var i=0;i<data[2].length;i++){
			var $li = $("<li><div class='form-group'><p id='" + data[2][i]["configName"] +
				"'>" + data[2][i]["configDesc"] +
				"</p><input placeholder='请输入' name='" + data[2][i]["configName"] + "' onfocus='this.select();' value='" + data[2][i][
					"configValue"
				] +
				"' class='vptipt form-control "+ data[2][i]["configName"] +"' type='text' autocomplete='off'></div></li>")
			$("#set-model3").append($li)
		}
		}
		MoreVerify()
	}

	// 回车之后组成数据
	function val(thisname) {
		var val = thisname.val();
		var name = thisname.parent().find('p').attr("id");
		var attr = [];
		var obj = new Object();
		obj.configName = name;
		obj.configValue = val;
		attr.push(obj)
		ThresholdStorage(attr, '修改')
	}
	//阈值 回车
	function Lose1(name) {
		name.keyup(function() {
			if (event.keyCode == 13) {
				if ($("#form1a").data('bootstrapValidator').isValid()) { //获取验证结果，如果成功，执行下面代码
					val(name)
					name.blur();
				}
			}
		})
	}

	function Lose2(name) {
		name.keyup(function() {
			if (event.keyCode == 13) {
				if ($("#form2a").data('bootstrapValidator').isValid()) { //获取验证结果，如果成功，执行下面代码
					val(name)
					name.blur();
				}
			}
		})
	}

	function Lose3(name) {
		name.keyup(function() {
			if (event.keyCode == 13) {
				if ($("#form3a").data('bootstrapValidator').isValid()) { //获取验证结果，如果成功，执行下面代码
					val(name)
					name.blur();
				}
			}
		})
	}

	function Lose4(name) {
		name.keyup(function() {
			if (event.keyCode == 13) {
				if ($("#form4a").data('bootstrapValidator').isValid()) { //获取验证结果，如果成功，执行下面代码
					val(name)
					name.blur();
				}
			}
		})
	}

	// 阈值 回车或者修改保存之后回调	
	function ThresholdStorage(attr, mese) {
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: '/api/MKSystem/update',
			data: JSON.stringify(attr),
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if (data["code"] == 0) {
					alerT(mese + '成功', 'success')
					GetThreshold(FourThreshold)
				} else {
					alerT(mese + '失败', 'error')
				}

			},
			error: function(xhr, type, errorThrown) {
				alerT(mese + '失败', 'error')
			}
		});
	}

	// 阈值设置--更多  ==>model的数据 

	function ThresholdModelData() {
		var attr = [];
		var model1 = $("#set-model1>li");
		var model2 = $("#set-model2>li");
		var model3 = $("#set-model3>li");
		for (var i = 0; i < model1.length; i++) {
			if (model1.eq(i).find('input').val() == "") {

			} else {

				var obj = new Object();
				obj.configName = model1.eq(i).find('p').attr("id");
				obj.configValue = model1.eq(i).find('input').val();
				attr.push(obj)
			}
		}
		for (var i = 0; i < model2.length; i++) {
			if (model2.eq(i).find('input').val() == "") {
		
			} else {
		
				var obj = new Object();
				obj.configName = model2.eq(i).find('p').attr("id");
				obj.configValue = model2.eq(i).find('input').val();
				attr.push(obj)
			}
		}
		for (var i = 0; i < model3.length; i++) {
			if (model3.eq(i).find('input').val() == "") {
		
			} else {
		
				var obj = new Object();
				obj.configName = model3.eq(i).find('p').attr("id");
				obj.configValue = model3.eq(i).find('input').val();
				attr.push(obj)
			}
		}
		
		ThresholdStorage(attr, '保存')

	}


	// 阈值设置--更多  ==>model
	$("#Threshold-Settings-btn").click(function() {
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				title: '参数设置',
				type: 1,
				btn: ['保存', '取消'],
				offset: 'auto', //位置
				skin: 'demo-id', //样式类名
				closeBtn: 1, //显示关闭按钮
				anim: 2, //出来动画
				resize: false,
				isOutAnim: false, //取消关闭动画
				// area: ['960px', '864px'], //宽高
				area: ['1080px', '670px'], //宽高
				shadeClose: false, //开启遮罩关闭
				content: $('#model_min'), //放内容的
				success: function(layero, index) { //model点击成功之后回调


					$(':focus').blur(); //防止多层灯罩
					GetData(MultiThreshold)
				},
				yes: function(index, layero) { //保存


					$("#formquan").data('bootstrapValidator').validate(); //提交验证
					if (!$("#formquan").data('bootstrapValidator').isValid()) {
						return
					}
					ThresholdModelData()
					layer.close(index); //如果设定了yes回调，需进行手工关闭
					// }
				},
				end: function() {
					$("#formquan").data('bootstrapValidator').destroy();
					$('#formquan').data('bootstrapValidator', null);
				}
			});
		});
	})

	// alert
	function alerT(mes, type) {
		Swal.fire({
			position: 'center',
			type: type,
			title: mes,
			showConfirmButton: false,
			timer: 1500
		})
	}
})

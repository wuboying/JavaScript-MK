// 报警信息

$(function(){
	AlarmData()
	
	// 四条报警数据
	function AlarmData(){
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url:'/api/MKAlarm/homePageAlarmInfo',
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if(data.length>0){
					$(".left-baojing-center").html("");
				for(var i=0;i<data.length;i++){
					if(data[i]["alarmType"]==1){
						var $li=$("<li><p class='baojing-time'>"+data[i]["dateStr"]+"<p><p class='baojing-grade'><i class='layui-icon' style='color:yellow'>&#xe617;</i></p><p class='baojing-name' title='"+data[i]["alarmDesc"]+"'>"+data[i]["alarmDesc"]+"</p></li>")
					}else if(data[i]["alarmType"]==2){
						var $li=$("<li><p class='baojing-time'>"+data[i]["dateStr"]+"<p><p class='baojing-grade'><i class='layui-icon' style='color:red'>&#xe617;</i></p><p class='baojing-name' title='"+data[i]["alarmDesc"]+"'>"+data[i]["alarmDesc"]+"</p></li>")
					}else if(data[i]["alarmType"]==3){
						var $li=$("<li><p class='baojing-time'>"+data[i]["dateStr"]+"<p><p class='baojing-grade'><i class='layui-icon' style='color:purple'>&#xe617;</i></p><p class='baojing-name' title='"+data[i]["alarmDesc"]+"'>"+data[i]["alarmDesc"]+"</p></li>")
					}
					$(".left-baojing-center").append($li);
				}
				}
			},
			error: function(xhr, type, errorThrown) {
		
			}
		});
	}
	// 5秒刷新报警信息
		  setInterval(function(){
			  AlarmData();
		  },5000)
		  // 下拉框数据获取
		  function selectInitialize(){
			  $.ajax({
			  	contentType: "application/json;charset=UTF-8",
			  	url: '/api/MKAlarm/dictionary',
			  	dataType: 'json', //服务器返回json格式数据
			  	type: 'get', //HTTP请求类型
			  	success: function(data) {
					$(".alarm-select-one").html('');
					var $optionAll = $("<option selected='selected' value=''>全选</option>");
					$(".alarm-select-one").append($optionAll);
			  			for (var i = 0; i < data.length; i++) {
			  				var $option = $("<option value='"+data[i]["alarmStatus"]+"'>"+data[i]["alarmLevel"]+"</option>");
			  				$(".alarm-select-one").append($option);
			  			}
			  	}
			  })
			  }
		  
		  	// 报警--- model
		  
		  
		  
		  function appa() {
		  	$(".time1").val('');
		  	$(".time2").val('');
		  	startTime = '';
		  	endTime = '';
		  	layui.use('laydate', function() {
		  		var laydate = layui.laydate;
		  		laydate.render({
		  			elem: '#time1',
		  			theme: '#2c9ae6',
		  			type: 'datetime',
		  			done: function(value, date, endDate) {
		  				startTime = value;
		  			}
		  		})
		  		// 结束时间
		  		laydate.render({
		  			elem: '#time2',
		  			theme: '#2c9ae6',
		  			type: 'datetime',
		  			done: function(value, date, endDate) {
		  				endTime = value;
		  
		  			}
		  		})
		  	})
		  
		  alarmRank='';//级别
		  alarmState='';//状态
		  $(".alarm-select-two option:first").prop("selected", 'selected');
		  $(".alarm-select-one").change(function() {
		  	alarmRank = $(".alarm-select-one").val();
		  })
		  $(".alarm-select-two").change(function() {
		  	alarmState = $(".alarm-select-two").val();
		  })
		  
		  	layui.use('table', function() {
		  		var table = layui.table;
		  
		  		//方法级渲染
		  		table.render({
		  			elem: '#LAY_table_alarm',
		  			url: ' /api/MKAlarm/getAlarmInfo',
		  			skin: 'line',
		  			cols: [
		  				[{
		  						field: 'alarmType',
		  						title: '报警级别',
		  						// sort: true,
		  						align:'center',
								templet:function(d){
									 if(d.alarmType==1){
										 return "<i class='layui-icon' style='color:yellow'>&#xe617;</i>"
									 }else if(d.alarmType==2){
										 return "<i class='layui-icon' style='color:red'>&#xe617;</i>"
									 }else if(d.alarmType==3){
										 return "<i class='layui-icon' style='color:purple'>&#xe617;</i>"
									 }
								},
		  						unresize:true
		  					}, {
		  						field:'alarmBeginTime',
		  						title: '报警时间',
		  						align:'center',
								sort: true,
		  						unresize:true
		  					}, {
		  						field: 'alarmStatus',
		  						title: '报警状态',
		  						align:'center',
								templet:function(d){
									 return d.alarmStatus == 0? "消警": "报警";
								},
		  						unresize:true
		  					},
							{
								field: 'alarmDesc',
								title: '报警名称',
								align:'center',
								unresize:true
							}, {
								field: 'alarmDetails',
								title: '报警详情',
								align:'center',
								unresize:true
							}
		  
		  				]
		  			],
		  			method: 'post',
		  			contentType: 'application/json',
		  			where: {
		  				alarmStartTime: '',
		  				alarmEndTime: '',
						alarmType:'',
						alarmState:'1'
		  			},
		  			request: {
		  				page: 'curr', //页码的参数名称，默认：page
		  				limit: 'limit' //每页数据量的参数名，默认：limit
		  			},
		  			parseData: function(res) { //res 即为原始返回的数据
		  						return {
		  							"code": res.code, //解析接口状态
		  							// "msg": res.message, //解析提示文本
		  							"count": res.message.totalCount, //解析数据长度
		  							"data": res.message.alarmInfoList//解析数据列表
		  						}
		  			},
		  			id: 'testReloada',
		  			limit: 10,
		  			limits: [10, 20],
		  			page: {
						curr: 1,
		  				theme: '#2c9ae6',
		  				prev: '上一页',
		  				next: '下一页',
		  				layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
		  				groups: 5
		  			},
		  			height: 510
		  		});
		  
		  		var $ = layui.$,
		  			active = {
		  				reload: function() {
		  
		  					//执行重载
		  					table.reload('testReloada', {
		  						page: {
		  							curr: 1 //重新从第 1 页开始
		  						},
		  						where: {
		  						alarmStartTime: startTime,
		  						alarmEndTime: endTime,
		  						alarmType:alarmRank,
		  						alarmState:alarmState
		  
		  						}
		  					}, 'data');
		  				}
		  			};
		  		$("#alarm-searching").off("click").on("click", function() {
		  			var type = $(this).data('type');
		  			active[type] ? active[type].call(this) : '';
		  		});
		  	});
		  }
		  
		  
		  
		  
		  
		  
		  
		  
		  	function CurveClick() {
		  		layui.use('layer', function() {
		  			var layer = layui.layer;
		  			layer.open({
		  				title: '报警信息',
		  				type: 1,
		  				offset: 'auto', //位置
		  				skin: 'demo-class', //样式类名
		  				closeBtn: 1, //显示关闭按钮
		  				anim: 2, //出来动画
		  				resize: false,//缩放
		  				isOutAnim: false, //取消关闭动画
		  				area: ['1080px', '670px'], //宽高
		  				shadeClose: false, //开启遮罩关闭
		  				content: $('#warning-model'), //放内容的
		  				success: function(layero, index) { //model点击成功之后回调
		  					$(':focus').blur(); //防止多层灯罩
							selectInitialize();//下拉框
							appa();//报警model数据
		  				},
		  				cancel: function(index, layero) { //保存
		  					layer.close(index); //如果设定了yes回调，需进行手工关闭
		  				},
		  			});
		  		});
		  	}
			// 报警model弹出
		  	$("#alarm-more").click(function() {
		  		CurveClick()
		  	})
		  
		  
		  
})
// 曲线更多--model

$(function() {

	function appa(url, name1, name2,ide,time,signOne,signTwo) {
		$(".test1").val('');
		$(".test2").val('');
		starttime = '';
		endtime = '';
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			laydate.render({
				elem: '#test1',
				theme: '#2c9ae6',
				type: 'datetime',
				done: function(value, date, endDate) {
					starttime = value;
				}
			})
			// 结束时间
			laydate.render({
				elem: '#test2',
				theme: '#2c9ae6',
				type: 'datetime',
				done: function(value, date, endDate) {
					endtime = value;

				}
			})
		})


		layui.use('table', function() {
			var table = layui.table;

			//方法级渲染
			table.render({
				elem: '#LAY_table_user',
				url: url,
				skin: 'line',
				cols: [
					[{
							field: time,
							title: '记录时间',
							// sort: true,
							align:'center',
							sort: true,
							unresize:true
						}, {
							field: signOne,
							title: name1,
							// templet:function(d){
							// 	 return d.iso == "1.45" ? "<i class='layui-icon' style='color:green'>&#xe617;</i>": "<i class='layui-icon' style='color:red'>&#xe617;</i>";
							// },
							align:'center',
							unresize:true
						}, {
							field: signTwo,
							title: name2,
							align:'center',
							unresize:true
						}

					]
				],
				method: 'post',
				contentType: 'application/json',
				where: {
					startDate: '',
					endDate: ''
				},
				request: {
					page: 'curr' //页码的参数名称，默认：page
						,
					limit: 'limit' //每页数据量的参数名，默认：limit
				},
				parseData: function(res) { //res 即为原始返回的数据
						if(ide=='adjust'){
							return {
								"code": res.code, //解析接口状态
								"msg": res.message, //解析提示文本
								"count": res.result.size, //解析数据长度
								"data": res.result.densityControlRecordVo//解析数据列表
							}
						}else{
							return {
								"code": res.code, //解析接口状态
								"msg": res.message, //解析提示文本
								"count": res.result.size, //解析数据长度
								"data": res.result.list//解析数据列表
							}
						}
				},
				curr: 1,
				id: 'testReload',
				limit: 10,
				limits: [10, 20],
				page: {
					theme: '#2c9ae6',
					prev: '上一页',
					next: '下一页',
					// first: '首页',
					// last: '尾页',
					layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
					groups: 5
				},
				height: 510
			});

			var $ = layui.$,
				active = {
					reload: function() {

						//执行重载
						table.reload('testReload', {
							page: {
								curr: 1 //重新从第 1 页开始
							},
							where: {
								startDate: starttime,
								endDate: endtime

							}
						}, 'data');
					}
				};
			$(".layui-btn").off("click").on("click", function() {
				var type = $(this).data('type');
				active[type] ? active[type].call(this) : '';
			});
		});
	}

	// 曲线--- model

	function CurveClick(name, TAG) {
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				title: name,
				type: 1,
				offset: 'auto', //位置
				skin: 'demo-class', //样式类名
				closeBtn: 1, //显示关闭按钮
				anim: 2, //出来动画
				resize: false,//缩放
				isOutAnim: false, //取消关闭动画
				area: ['1080px', '670px'], //宽高
				shadeClose: false, //开启遮罩关闭
				content: $('#curve-model'), //放内容的
				success: function(layero, index) { //model点击成功之后回调
					$(':focus').blur(); //防止多层灯罩
					// successCallback;
					if (TAG == 'ash') {
						appa('/api/v1/curve/more/hui-fen/list', '瞬时灰分', '检测灰分','ash','date','oneData','twoData' )
					} else if (TAG == 'density') {
						appa('/api/v1/curve/more/mi-du/list', '设定密度', '当前密度','density','date','oneData','twoData' )
					} else if (TAG == 'valve') {
						appa('/api/v1/curve/more/fa-men/list', '补水阀(%)', '分流阀(%)','valve','date','oneData','twoData')
					} else if(TAG == 'adjust'){
						appa('/api/MKDevice/selectAllMkDensityAction', '建议操作', '操作依据','adjust','adjustTimeStr','stepAdjustPlus','operationalBasis')
					}
				},
			cancel: function(index, layero) { //保存
				layer.close(index); //如果设定了yes回调，需进行手工关闭
			},
			});
		});
	}
	$("#ash-more").click(function() {
		CurveClick('灰分变化记录', 'ash')
	})
	$("#density-more").click(function() {
		CurveClick('密度变化记录', 'density')
	})
	$("#valve-more").click(function() {
		CurveClick('阀门调整记录', 'valve')
	})
	$("#adjust-more").click(function() {
		CurveClick('密度调整记录', 'adjust')
	})

})

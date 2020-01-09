// 曲线---数据
$(function() {
	function Echarts2(id, title, legend1, legend2, xData, series1, series2, seriesValue1, seriesValue2, color1, color2,
			max, min, subhead, bgAreaYh, bgAreaYl) {
			var myChart = null;
			var dom = document.getElementById(id);
			myChart = echarts.init(dom);
			var app = {};
			option = null;
			option = {
				backgroundColor:'transparent',
				title: [{
						top: "3%",
						left: "3%",
						y: 'top',
						text: title,
						// textAlign: 'center',
						textStyle: {
							color: '#262626',
							fontSize: 18,
						},
						subtext: subhead,
						subtextStyle: {
							color: '#808080',
							fontSize: 14,
						}
					}
				],
	
				tooltip: {
					trigger: 'axis',
					triggerOn: "mousemove",
					position: function(point, params, dom, rect, size) {
						//其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
						var x = point[0]; //
						var y = point[1];
						var viewWidth = size.viewSize[0];
						var viewHeight = size.viewSize[1];
						var boxWidth = size.contentSize[0];
						var boxHeight = size.contentSize[1];
						var posX = 0; //x坐标位置
						var posY = 0; //y坐标位置
	
						if (x < boxWidth) { //左边放不开
							posX = 5;
						} else { //左边放的下
							posX = x - boxWidth;
						}
	
						if (y < boxHeight) { //上边放不开
							posY = 5;
						} else { //上边放得下
							posY = y - boxHeight;
						}
						return [posX, posY];
					}
	
				},
				legend: {
					icon: "circle",
					itemHeight: 8,
					itemWidth: 8, // 设置宽度
					top: '10%',
					right: '3%',
					itemGap: 20,
					data: [{
						name: legend1,
						textStyle: {
							color: '#808080',
							fontSize: 12,
						}
					}, {
						name: legend2,
						textStyle: {
							color: '#808080',
							fontSize: 12,
						}
					}],
				},
				grid: {
					left: '6%',
					right: '6%',
					bottom: '10%',
					top: '25%',
					containLabel: false
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisTick: { //向上
						inside: true
					},
					axisLine: {
						lineStyle: {
							color: '#808080', // 颜色
							width: 0.5, // 粗细
						},
						onZero: false
					},
					axisLabel: {
						textStyle: {
							color: '#808080', // 颜色
							fontSize: 14,
						},
						interval: 9,
						rotate: 0
					},
					data: xData
				},
	
				yAxis: {
					max: max,
					min: min,
					// interval: interval,
					splitNumber:6,
					boundaryGap: [0, 0], // 数值起始和结束两端空白策略
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#8a8b8c', // 颜色
							width: 0.5, // 粗细
						},
					},
					axisLabel: {
	formatter: function (value, index) {           
					                  return value.toFixed(2);      
					                   } ,  
						textStyle: {
							fontSize: 14,
							color: '#808080',
						},
						interval: 0,
					},
					splitLine: {
						show: false,
					},
				},
		
			
				series: [{
						name: series1,
						symbolSize: 5, //拐点大小
						symbol: 'none',
						//smooth: true, //曲线
						type: 'line',
						showAllSymbol: true,
						itemStyle: {
							normal: {
								color: color1,
								lineStyle: {
									color: color1,
	
									width: 3
	
								}
							}
						},
			
						data: seriesValue1,
				markArea:{
					silent: true,
								data:[[{
									yAxis:bgAreaYl,
									itemStyle:{
									                    color:'#DFF8EB'
														
									                }},
									{yAxis:bgAreaYh,
								}]]
							},
	
					},
			
					{
						name: series2,
						symbolSize: 5, //拐点大小
						//smooth: true, //曲线
						type: 'line',
						symbol: 'none', //显示拐点样式
						showAllSymbol: true,
						itemStyle: {
							normal: {
								color: color2,
								lineStyle: {
									color: color2,
									width: 3
	
								}
							}
						},
					
						data: seriesValue2,
						markArea:{
							silent: true,
										data:[[{
											yAxis:bgAreaYl,
											itemStyle:{
											                    color:'#DFF8EB'
																
											                }},
											{yAxis:bgAreaYh,
										}]]
									},
	
					}
	
				]
	
			};
	
	
	
			// myChart.clear();
			if (option && typeof option === "object") {
				myChart.setOption(option, true);
			}
			
	
			window.addEventListener("resize", function() {
				setTimeout(function() {
					myChart.resize();
				}, 500)
			});
		}
	
	// 右内容上实时数据
	// 容器id，折现名字，x轴时间，值1名字，值2名字，值1，值2
	function Echarts(id, title, legend1, legend2, xData, series1, series2, seriesValue1, seriesValue2, color1, color2,
		max, min, subhead, xFixe) {
		var myChart = null;
		var dom = document.getElementById(id);
		myChart = echarts.init(dom);
		var app = {};
		option = null;
		option = {
			backgroundColor:'transparent',
			title: [{
					top: "3%",
					left: "3%",
					y: 'top',
					text: title,
					// textAlign: 'center',
					textStyle: {
						color: '#262626',
						fontSize: 18,
					},
					subtext: subhead,
					subtextStyle: {
						color: '#808080',
						fontSize: 14,
					}
				}
			],

			tooltip: {
				trigger: 'axis',
				triggerOn: "mousemove",
				position: function(point, params, dom, rect, size) {
					//其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
					var x = point[0]; //
					var y = point[1];
					var viewWidth = size.viewSize[0];
					var viewHeight = size.viewSize[1];
					var boxWidth = size.contentSize[0];
					var boxHeight = size.contentSize[1];
					var posX = 0; //x坐标位置
					var posY = 0; //y坐标位置

					if (x < boxWidth) { //左边放不开
						posX = 5;
					} else { //左边放的下
						posX = x - boxWidth;
					}

					if (y < boxHeight) { //上边放不开
						posY = 5;
					} else { //上边放得下
						posY = y - boxHeight;
					}
					return [posX, posY];
				}

			},
			legend: {
				icon: "circle",
				itemHeight: 8,
				itemWidth: 8, // 设置宽度
				top: '10%',
				right: '3%',
				itemGap: 20,
				data: [{
					name: legend1,
					textStyle: {
						color: '#808080',
						fontSize: 12,
					}
				}, {
					name: legend2,
					textStyle: {
						color: '#808080',
						fontSize: 12,
					}
				}],
			},
			grid: {
				left: '6%',
				right: '6%',
				bottom: '10%',
				top: '25%',
				containLabel: false
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisTick: { //向上
					inside: true
				},
				axisLine: {
					lineStyle: {
						color: '#808080', // 颜色
						width: 0.5, // 粗细
					},
					onZero: false
				},
				axisLabel: {
					textStyle: {
						color: '#808080', // 颜色
						fontSize: 14,
					},
					interval: 9,
					rotate: 0
				},
				data: xData
			},
		
			yAxis: {
				max: max,
				min: min,
				// interval: interval,
				splitNumber:6,
				boundaryGap: [0, 0], // 数值起始和结束两端空白策略
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#8a8b8c', // 颜色
						width: 0.5, // 粗细
					},
				},
				axisLabel: {
formatter: function (value, index) {           
				                  return value.toFixed(xFixe);
				                   } ,  
					textStyle: {
						fontSize: 14,
						color: '#808080',
					},
					interval: 0,
				},
				splitLine: {
					show: false,
				},
			},

		
			series: [{
					name: series1,
					symbolSize: 5, //拐点大小
					symbol: 'none',
				//smooth: true, //曲线
					type: 'line',
					showAllSymbol: true,
					itemStyle: {
						normal: {
							color: color1,
							lineStyle: {
								color: color1,

								width: 2

							}
						}
					},
				       areaStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                       color: 'rgba(23, 208, 113, 0.5)'  
				                    }, {
				                        offset: 1,
				                        color: 'rgba(23, 208, 113, 0)' 
				                    }])
				                }
				            },
					data: seriesValue1,

				},
		
				{
					name: series2,
					symbolSize: 5, //拐点大小
					//smooth: true, //曲线
					type: 'line',
					symbol: 'none', //显示拐点样式
					showAllSymbol: true,
					itemStyle: {
						normal: {
							color: color2,
							lineStyle: {
								color: color2,
								width: 2

							}
						}
					},
					areaStyle: {
					         normal: {
					             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                 offset: 0,
					                color: 'rgba(44, 154, 230, 0.5)'
					             }, {
					                 offset: 1,
					                 color: 'rgba(44, 154, 230, 0)'
					             }])
					         }
					     },
					data: seriesValue2

				}

			]

		};



		// myChart.clear();
		if (option && typeof option === "object") {
			myChart.setOption(option, true);
		}
		
		window.addEventListener("resize", function() {
			setTimeout(function() {
				myChart.resize();
			}, 500)
		});
	}
	//echarts数据获取
	function echartsData(url, id) {

		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: url,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				var xData = data.dateList;
				var seriesValue1 = [];
				var seriesValue2 = [];
				if (data.curve1 != null) {

					for (var i = 0; i < data.curve1.length; i++) {
						var real = [];
						real.push(String(data.curve1[i]["time"]));

						if (id != 'valve-trend'){
							if(data.curve1[i]["v"]==0){
								data.curve1[i]["v"]=''
							}
						}

						real.push(data.curve1[i]["v"]);
						seriesValue1.push(real)
					}
				}
				if (data.curve2 != null) {

					for (var j = 0; j < data.curve2.length; j++) {
						var calc = [];
						calc.push(String(data.curve2[j]["time"]));

						if (id != 'valve-trend'){

                        if(data.curve2[j]["v"]==0){
							data.curve2[j]["v"]=''
						}
						}

						calc.push(data.curve2[j]["v"]);
						seriesValue2.push(calc);
					}
				}
				// callBack(data)
				// 容器id，折现名字，x轴时间，值1名字，值2名字，值1，值2
				if (id == 'ash-trend') {
					Echarts2(id, data.tagName, data.smallName1, data.smallName2, xData, data.smallName1, data.smallName2,
						seriesValue1, seriesValue2, '#17D071', '#2C9AE6', 11, 7,'单位：%', data.bgAreaYh, data.bgAreaYl)
				} else if (id == 'density-trend') {

					Echarts(id, data.tagName, data.smallName1, data.smallName2, xData, data.smallName1, data.smallName2,
						seriesValue1, seriesValue2, '#17D071', '#2C9AE6', data.maxValue, data.minValue, '单位：g/cm³', 3)
				} else if (id == 'valve-trend') {

					Echarts(id, data.tagName, data.smallName1, data.smallName2, xData, data.smallName1, data.smallName2,
						seriesValue1, seriesValue2, '#17D071', '#2C9AE6', data.maxValue, data.minValue, '单位：%',2)
				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});

	}


	// 页面加载不工作状态 echarts折现
	Echarts2('ash-trend')
	Echarts('density-trend')
	Echarts('valve-trend')
	// echarts--更多

	// 页面加载工作状态 ---echarts数据获取
	echartsData('/api/v1/curve/hui-fen', 'ash-trend')
	echartsData('/api/v1/curve/mi-du', 'density-trend')
	echartsData('/api/v1/curve/fa-men', 'valve-trend')
	// 




	function RealData(url, callBack) {
		$.ajax({
			contentType: "application/json;charset=UTF-8",
			url: url,
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				callBack(data)
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}
	// 1秒刷新
	second();

	function second() {
		setInterval(function() {
			RealData('/api/v1/homepage/fa-men/45', Moisturizing); //补水
			RealData('/api/v1/homepage/fa-men/56', Shunt); //分流
			RealData('/api/v1/homepage/mi-du', DensityValue); //密度
			RealData('/api/v1/homepage/hui-fen', AshValueInstant); //瞬时-检测


		}, 1000)
	}
	// 一分刷新
	minute();

	function minute() {
		setInterval(function() {
			echartsData('/api/v1/curve/hui-fen', 'ash-trend');
			echartsData('/api/v1/curve/mi-du', 'density-trend');
			echartsData('/api/v1/curve/fa-men', 'valve-trend');
		}, 1000 * 60)  
	}
	RealData('/api/v1/homepage/hui-fen', AshValueInstant); //瞬时-检测
	RealData('/api/v1/homepage/fa-men/45', Moisturizing); //补水
	RealData('/api/v1/homepage/fa-men/56', Shunt); //分流
	RealData('/api/v1/homepage/mi-du', DensityValue); //分流

	//瞬时灰分	//检测灰分
	function AshValueInstant(data) {
	// 瞬时
		if (data.ash == "0.0") {
			data.ash = "--"
			$("#ash-instant").text(data.ash);
		} else {
			$("#ash-instant").text(data.ash);

		}
		// 检测
		if (data.jcAsh =="0.0") {
			data.jcAsh = "--"
			$("#ash-detection").text(data.jcAsh);
		} else {
		
			$("#ash-detection").text(data.jcAsh);
		}
		
	}
	//实时--  密度值
	function DensityValue(data) {
		// 设定密度
		if (data.current_Density == -100) {
			data.current_Density = "未检测"
			$("#density-at").text(data.current_Density);
		} else {
			$("#density-at").text(data.current_Density.toFixed(3));
		}
		// 当前密度
		if (data.set_Density == -100) {
			data.set_Density = "未检测"
			$("#density-setting").text(data.set_Density);
		} else {
			$("#density-setting").text(data.set_Density.toFixed(3));
		}

	}
	//实时--  补水
	function Moisturizing(data) {
		if (data == -100) {
			data = "未检测"
			$("#valve-moisturizing").text(data);
		} else {
			$("#valve-moisturizing").text(data);
		}
	}
	//实时--  分流
	function Shunt(data) {
		if (data == -100) {
			data = "未检测"
			$("#valve-shunt").text(data);
		} else {
			$("#valve-shunt").text(data);
		}
	}


})

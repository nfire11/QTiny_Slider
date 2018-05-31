define( [ "jquery","qlik"],function ($,qlik) {'use strict';
	var a=0;
	var b=0;
	return {
		
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 15,
					qHeight: 500,
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					min: 1
				},
				measures: {
					uses: "measures",
					min: 0
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings"
				},				
				Section:{
                    type: "items",
                    		label: "Slider Settings",
                    		items:{
							TextBox0: {
	                            ref: "s_id",
	                            label: "Slider ID",
	                            type: "string",
	                            //component: "textarea",
	                            defaultValue: "undefined",
	                            },							
	                        TextBoxA: {
	                            ref: "valLow",
	                            label: "Min",
	                            type: "string",
	                            //component: "textarea",
	                            defaultValue: "undefined",
	                            },							
	                        TextBoxB: {
	                            ref: "valHigh",
	                            label: "Max",
	                            type: "string",
	                            //component: "textarea",
	                            defaultValue: "undefined",
	                            },
							TextBoxC: {
	                            ref: "varLow",
	                            label: "Variable Low",
	                            type: "string",
	                            //component: "textarea",
	                            defaultValue: "undefined",
	                            },							
	                        TextBoxD: {
	                            ref: "varHigh",
	                            label: "Variable High",
	                            type: "string",
	                            //component: "textarea",
	                            defaultValue: "undefined",
	                            },
	                        TextBoxE: {
	                            ref: "slider_css",
	                            label: "Custom CSS",
	                            type: "string",
	                            component: "textarea",
	                            defaultValue: "undefined",
	                            },
							TextBoxF: {
	                            ref: "dater",
	                            label: "Date Format",
	                            type: "boolean",
	                            defaultValue: true,
	                            },

				}},
				SectionB:{
                    type: "items",
                    		label: "About",
                    		items:{
							About0: {
	                            label: "QTiny Slider V1.0",
	                            component: "text",
	                            },							
							About1: {
								label: 'QTiny Slider',
	                            url: "https://github.com/nfire11/QTiny_Slider",
	                            component: "link",
	                            },
				}}
				
			}
		},
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		paint: function ($element,layout) {
			//add your rendering code here
			var slider_id=layout.s_id;
			var html="",self = this, lastrow = 0, dimcount = this.backendApi.getDimensionInfos().length,sortorder = this.backendApi.model.layout.qHyperCube.qEffectiveInterColumnSortOrder;	
			$element.html(html);
			//Based on multirange by LeaVerou
			$element.append("<script src='https://leaverou.github.io/multirange/multirange.js'></script>");
			$element.append('<link rel="stylesheet" type="text/css" href="https://leaverou.github.io/multirange/multirange.css">');
			$element.append('<input id="'+slider_id+'" type="range" multiple value="'+a+','+b+'" min='+layout.valLow+' max='+layout.valHigh+' style="width:70%;'+layout.slider_css+'"/>');

			if(layout.dater==true){
				var lowdte=new Date((a - (25567 + 1))*86400*1000);
				var highdte=new Date((b - (25567 + 1))*86400*1000);
				$element.append('<p>From:'+lowdte.toLocaleDateString()+'  &nbsp&nbsp To:'+highdte.toLocaleDateString()+'&nbsp&nbsp<span id="reset'+layout.s_id+'" class="lui-icon  lui-icon--selections-reload" aria-hidden="true"></span></p>');
			}else{
				$element.append('<p>Low:'+a+' &nbsp&nbsp  High:'+b+'&nbsp&nbsp<span id="reset'+layout.s_id+'" class="lui-icon  lui-icon--selections-reload" aria-hidden="true"></span></p>');
			};

			var app = qlik.currApp();
			var seltable=qlik.table(this);

			function selclear(){
				app.selectionState().clearAll();
			};

			$("#reset"+layout.s_id).click(function(){
				app.selectionState().clearAll();
			});
			$element.change(function(){	
					selclear();
					var selection_list=[];
					console.log($("#"+slider_id).val());
					console.log(slider_id);
					a=$("#"+slider_id).val().split(',')[0];
					b=$("#"+slider_id).val().split(',')[1];	
					console.log(a+','+b);
					self.backendApi.eachDataRow(function(rownum,row){
						if(row[0]["qNum"]<=parseInt(b) & row[0]["qNum"]>=parseInt(a)){
								selection_list.push(row[0]["qNum"]);
							}
						console.log(row[0]["qNum"]);
					});
					console.log(selection_list)
					app.field(seltable["headers"][0]["qFallbackTitle"]).selectValues(selection_list,true,true);
					app.variable.setNumValue(layout.varLow,a);
					app.variable.setNumValue(layout.varHigh,b);
					$("#"+slider_id).attr("value",a+','+b);
				});						
			}		
}});


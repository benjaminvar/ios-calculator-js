(function(id){
	let app = {};
	let main_element = null;
	let expression = [];
	let engine = new Calculator();
	let codes=() => { 
	return({
		"b1":{
			"text":"1",
			"handler": app.handleNumber
		},
		"b2":{
			"text":"2",
			"handler": app.handleNumber
		},
		"b3":{
			"text":"3",
			"handler": app.handleNumber
		},
		"b4":{
			"text":"4",
			"handler": app.handleNumber
		},
		"b5":{
			"text":"5",
			"handler": app.handleNumber
		},
		"b6":{
			"text":"6",
			"handler": app.handleNumber
		},
		"b7":{
			"text":"7",
			"handler": app.handleNumber
		},
		"b8":{
			"text":"8",
			"handler": app.handleNumber
		},
		"b9":{
			"text":"9",
			"handler": app.handleNumber
		},
		"b0":{
			"text":"0",
			"handler": app.handleNumber
		},
		"bPlus":{
			"text":"+",
			"handler": app.handleOp
		},
		"bMinus":{
			"text":"-",
			"handler": app.handleOp 
		},
		"bTimes":{
			"text":"*",
			"handler": app.handleOp
		},
		"bDiv":{
			"text":"/",
			"handler": app.handleOp
		},
		"bEqual":{
			"text":"",
			"handler": app.handleEvaluate,

		},
		"bClear":{
			"text":"",
			"handler": app.handleClear
		},
		"bDot":{
			"text":".",
			"handler": app.handleDot
		},
		"bNegate":{
			"text":"-",
			"handler": app.handleNegate
		},
		"bPercent":{
			"text":"",
			"handler": app.handlePercent
		},
	});
	}
	app.init=function(){
		codes = codes();
		main_element = document.getElementById(id);
		app.attachEvents();
		
	}
	app.attachEvents = function(){
		let refs=main_element.querySelectorAll("div[data-ref]")
		
		refs.forEach(button => {
			let dataRef= button.getAttribute("data-ref");
			if(typeof codes[dataRef] !== "undefined")
			{
				button.addEventListener("click",app.handleClickEvent,false);
			}
		});
		
	}
	app.handleClickEvent = function()
	{
		let dataRef= this.getAttribute("data-ref");
		codes[dataRef].handler(this,dataRef);
	}
	app.expresionToString = function(show = false)
	{
		let str = "";
		for(let i=0; i < expression.length; i++)
		{
			let space = i === 0 ? "" :  " ";
			if(show)
			{
				str += space + expression[i].show;
			}else{
				str += expression[i].text;
			}
			
		}
		return str;
	}
	
	app.updateScreen = function()
	{
		let screen = main_element.querySelector("div[data-el=screen]");
		screen.innerHTML = app.expresionToString(true);
	}
	app.addToExpression=function(text,show,type)
	{
		expression.push({"text":text,"show":show,type:type});
	}
	app.handleNumber = function(el,ref)
	{
		let lastNumber = typeof expression[expression.length - 1] === "undefined" ? {"text":"","show":"","type":""} : expression[expression.length - 1];
		if(lastNumber.type === "number")
		{
			
			lastNumber.text += codes[ref].text;
			lastNumber.show += el.innerHTML;
		}else{
			app.addToExpression(codes[ref].text,el.innerHTML,"number");
		}
		app.updateScreen();
	}
	app.handleDot = function(el,ref)
	{
		let lastNumber = typeof expression[expression.length - 1] === "undefined" ? {"text":"","show":"","type":""} : expression[expression.length - 1];
		if(lastNumber.type === "number")
		{
			
			if(lastNumber.text.indexOf(".") < 0)
			{
				lastNumber.text += codes[ref].text;
				lastNumber.show += el.innerHTML;
			}
			
		}else{
			
			app.addToExpression("0" + codes[ref].text,"0" + el.innerHTML,"number");
		}
		app.updateScreen();
	}
	app.handleOp = function(el,ref)
	{
		let lastNumber = typeof expression[expression.length - 1] === "undefined" ? {"text":"","show":"","type":""} : expression[expression.length - 1];
		if(lastNumber.type === "operator")
		{
			lastNumber.text = codes[ref].text;
			lastNumber.show = el.innerHTML;
		}else if(lastNumber.type === "number")
		{
			app.addToExpression(codes[ref].text,el.innerHTML,"operator");
		}
		
		app.updateScreen();
	}
	app.handleNegate = function(el,ref)
	{
		
		let lastNumber = typeof expression[expression.length - 1] === "undefined" ? {"text":"","show":"","type":""} : expression[expression.length - 1];
		if(lastNumber.type === "number")
		{
			lastNumber.text = (lastNumber.text.charAt(0) === "-" ? "" : codes[ref].text) +  lastNumber.text.replace("-","");
			lastNumber.show = (lastNumber.show.charAt(0) === "-" ? "" : codes[ref].text) +  lastNumber.show.replace("-","");
		}
		app.updateScreen();
	}
	app.handlePercent = function(el,ref)
	{
		
		let lastNumber = typeof expression[expression.length - 1] === "undefined" ? {"text":"","show":"","type":""} : expression[expression.length - 1];
		if(lastNumber.type === "number")
		{
			lastNumber.text = (parseFloat(lastNumber.text) / 100).toString() ;
			lastNumber.show = lastNumber.show + "%";
		}
		app.updateScreen();
	}
	app.handleEvaluate = function(el,ref)
	{
		
		let exprStr = app.expresionToString();
		let result = engine.eval(exprStr);
		result = isNaN(result) ? "0" : result;
		expression = [{"text": result.toString(),"show":result.toString(),"type":"number"}];
		app.updateScreen(result);
	}
	app.handleClear=function(el,ref)
	{
		expression=[];
		app.updateScreen();
	}
	app.init();
})("ios-calc");
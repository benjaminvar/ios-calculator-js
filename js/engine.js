class Calculator{
	
	constructor()
	{
		this.ops = {
		"empty":{
			"precedence" : 0,
			"eval": function()
			{
				
			}
		},
		"+":{
			"precedence" : 1,
			"eval" : function(op1,op2)
			{
				return op1 + op2;
			}
		},
		"-":{
			"precedence" : 1,
			"eval" : function(op1,op2)
			{
				return op1 - op2;
			}
		},
		"*":{
			"precedence" : 2,
			"eval" : function(op1,op2)
			{
				return op1 * op2;
			}
		},
		"/":{
			"precedence" : 2,
			"eval" : function(op1,op2)
			{
				return op1 / op2;
			}
		},
		"(":{
			"precedence" : 3,
			"eval" : function()
			{
				
			}
		}
		};
	}
	isNum(s)
	{
		return (/\d|\./).test(s);
	}
	isOp(s){
		return (/\+|\-|\*|\/|\(|\)/).test(s);
	}
	isWhiteSpace(s)
	{
		return (/\s|\t|\n|\r/).test(s);
	}
	convert_expression(str)
	{
		if(str.length == 0) return "";
		let stack = [];
		let expr = "";
		let tmpvar = "";
		for(let i= 0; i < str.length; i++)
		{
			let cchar = str.charAt(i);
			if(this.isWhiteSpace(cchar))
			{
				continue;
			}
			if(this.isNum(cchar))
			{
				tmpvar += cchar;
			}else if(this.isOp(cchar))
			{
				expr += "("+tmpvar+")";
				tmpvar = "";
				let lastop = stack.length == 0 ? "empty" : stack[stack.length - 1];
				if(this.ops[cchar].precedence <= this.ops[lastop].precedence)
				{
					expr += lastop ;
					stack.pop();
				}
				stack.push(cchar);
			}
		}
		if(tmpvar.length != 0)
		{
			expr += "("+tmpvar+")";
		}
		while(stack.length > 0)
		{
			let op = stack.pop();
			expr += op;
		}
		return expr;
	}
	eval(str)
	{
		
		let expr = this.convert_expression(str);
		let result = 0;
		let tmpvar = "0";
		let stack = [];
		for(let i = 0; i < expr.length ; i++)
		{
			let cchar = expr.charAt(i);
			if(cchar == "(")
			{
				continue;
			}else if(cchar == ")")
			{
				let val = parseFloat(tmpvar);
				stack.push(val);
				tmpvar = "0";
			}else if(this.isOp(cchar))
			{
				let op2 = stack.pop();
				let op1 = stack.pop();
				let r = this.ops[cchar].eval(op1,op2);
				stack.push(r);
			}else{
				tmpvar += cchar;
			}
			
				
		}
		result = stack.pop();
		return result;
	}
	
}
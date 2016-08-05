//Concept: Branch first by looking at operators. Then recursively go through parsing that and until you have reached a point wheere you only have terms (and so no operators). PS: the operator search should not count nested operators (those within brackets). E.g: 7x+5+(3x+2). The + in "7x+5" and "5+" will be counted but not the "3x+2". Once you have reached these individual terms, these too will be seperated like so "7x^2" --> "7*x^2". This will be jsified. Like so: "7*Math.pow(x,2)" etc...
var operators = ['+', '-', '/', '*'];
$('#input').on('input', function(e) {
	var input = $('#input').val();
	console.log("==========================================================");
	console.log(input);
	//ParseFunction(input);
	//jsify(input);
	$('#TreeContainer').html("");
	//*
	DrawTree(Split(input));
	/*/
	printArray(Split(input));
	//*/
	//Split(input);
});

function ParseFunction(input) {
	console.log("Parsing Function from: " + input);
	//pass through splitter which will return array then jsify them indvly
}

function printArray(arr) {
	for (var i = 0; i < arr.length; i++)
		if (Array.isArray(arr[i])) printArray(arr[i])
		else console.log(arr[i])
}
function arrstr(input){
	output = "";
	for (var i = 0; i < input.length; i++) {
		if(typeof(input[i])=="object"){
			output+="["+arrstr(input[i])+"]";
		}
		else{
			output+=input[i];
		}
		if(i<input.length-1){
			output+=",";
		}
	}
	return output;
}
function arrstrp(input){
	output = "";
	for (var i = 0; i < input.length; i++) {
		if(typeof(input[i])=="object"){
			if(countchildren(input)>4){
				output+="("+arrstrp(input[i])+")";
			}else{
				output+=arrstrp(input[i]);
			}
		}
		else if(typeof(input[i]) != "undefined"){
			output+=input[i];
		}
	}
	return output;
}

var childrencount = 0;
function countchildren(input){
	childrencount = 0;
	countchildrenrec(input);
	return childrencount;
}
function countchildrenrec(input){
for (var i = 0; i < input.length; i++) {
	if(typeof(input[i])=="object"){
		countchildrenrec(input[i]);
	}else{
		childrencount++;
	}
}
}

function jsify(input) {
		//console.log("Jsifying: " + input);
		var output = "";
		if (input.indexOf("^") > -1) {
			output = "Math.pow(" + input.substr(0, input.indexOf("^")) + ", " + input.substring(input.indexOf("^") + 1, input.length) + ")";
		} else {
			return input;
		}
		console.log(input + " =(jsify)=> " + output);
	}
	//var splitnestno = 0;

// function GetNodeArray(pair) {
// 	var rootc = [];
// 	// for(var i = 0; i < input.length; i++){
// 	// 	if(typeof(input[i]) == "object"){
// 	// 		ret.push(GetNodeArray(input[i]));
// 	// 	}else{
// 	// 		ret.push({text: { name: input[i] }});
// 	// 	}
// 	// }
// 	// if(typeof(input[1])=="object")
// 	// {
// 	// 	ret.push({text: { name: input[0] }, children: GetNodeArray(input[1])});
// 	// }else{
// 	// 	ret.push({text: { name: input[0] }});
// 	// }
// 	if (typeof(pair[1]) == "object") {
// 		rootc.push(GetNodeArrayC(pair[1]));
// 	} else if (pair[1].length <= 1) {
// 		rootc.push({
// 			text: {
// 				name: pair[1]
// 			}
// 		});
// 	} else {
// 		return {
// 			text: {
// 				name: pair[0]
// 			}
// 		};
// 	}
// 	return {
// 		text: {
// 			name: pair[0]
// 		},
// 		children: rootc
// 	};
// }

// function GetNodeArrayC(input) {
// 	var rootc = [];
// 	// var rootc = [];
// 	// for(var i = 0; i < input.length; i++){
// 	// 	nodes.push({text: { name: "First child" }});
// 	// }
// 	// for (var i = 0; i < input.length; i++) {
// 	// 	if(typeof(input[i]) == "object"){
// 	// 	}
// 	// }
// 	console.log("GetNodeArrayC: ");
// 	console.log(input);
// 	for (var i = 0; i < input.length; i++) {
// 		if (typeof(input[i]) == "object") {
// 			return GetNodeArray(input[i]);
// 		} else {
// 			return ({
// 				text: {
// 					name: input[i]
// 				}
// 			});
// 		}
// 	}
// 	return ({
// 		text: {
// 			name: "?"
// 		}
// 	});
// }

function ParseArray(input){
	var children = [];
	var name = arrstrp(input);
	for (var i = 0; i < input.length; i++) {
		if(typeof(input[i])=="object"){
			children.push(ParseArray(input[i]));
			//children.push({text: { name: "" }, children: ParseArray(input[i])});
		}else{
			//name = input[i];
			//if(typeof(input[i]) != "undefined"){

				children.push({text: { name: input[i] }});
			//}
		}
	}
	return {text: { name: name }, children: children};
}

function DrawTree(input) {
	var ret = [];
	ret.push({container: "#TreeContainer", scrollbar: "native"});
	ret.push(ParseArray(input));
	new Treant(ret);
}

function hasLetters(myString) {
	return (/((?=[^\d])\w)/.test(myString));
}

function hasNumbers(myString) {
	return (/\d/.test(myString));
}

// Will remove all falsy values: undefined, null, 0, false, NaN and "" (empty string)
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
    	if(typeof(actual[i])=="object"){
    		if(actual[i].length > 0){
    			newArray.push(actual[i]);
    		}
	  }else{
	  	newArray.push(actual[i]);
	  }
    }
  }
  return newArray;
}

function Split(input) {
		var output = [];
		if (containsOperator(input)) {
			var buf = "";
			var nestno = 0;
			for (var i = 0; i < input.length; i++) {
				if (input[i] == '(') {
					nestno++;
				} else if (input[i] == ')') {
					nestno--;
				}
				if ((nestno <= 0 && (isOperator(input[i])))) {
					output.push(Split(buf));
					output.push(input[i]);
					buf = "";
				} else {
					buf += input[i];
					if (i == input.length - 1) {
						output.push(Split(buf));
					}
				}
			}
		} else {
			if (containsPow(input)) {
				var thepow = [];
				var buf = "";
				var nestno = 0;
				var powfound = false;
				for (var i = 0; i < input.length; i++) {
					if (powfound && input[i] == '(') {
						nestno++;
					} else if (powfound && input[i] == ')') {
						nestno--;
						if (nestno == 0) {
							thepow.push(Split(buf)); //the pow
							output.push(thepow);
							var rest = Split(input.slice(i + 1)); //the rest
							if (rest != "") {
								output.push(Split(rest));
							}
						}
					}
					if (input[i] == '^') {
						var splittedbuf = Split(buf);
						//TODO: if coefficient is nothing, don't add empty. <-- this is not detected by the cleanArray function!
						output.push(splittedbuf.slice(0, -1)); //the stuff before without the last element
						thepow.push(splittedbuf[splittedbuf.length - 1]); //the last element of buf (since the pow belongs to only the last thing)
						thepow.push('^');
						buf = "";
						powfound = true;
					} else {
						if (powfound && input[i] == '(') {} else {
							buf += input[i];
						}
					}
				}
			} else {
				//contains no pow and also contains no operators
				if (input.indexOf('(') > -1 && input.indexOf(')') > -1) {
					if (input.indexOf('(') == 0 && input.lastIndexOf(')') == input.length - 1) {
						//brackets completely surround it!
						console.log("sur!");
						output.push(Split(input.slice(1, -1)));
					} else {
						//console.log(input.indexOf('(') + "+" + input.lastIndexOf(')'));
						//contains brackets!
						var buf = "";
						var nestno = 0;
						for (var i = 0; i < input.length; i++) {
							//buf+=input[i];
							if (input[i] == '(') {
								if (nestno <= 0 && buf != "") {
									//*
									output.push(Split(buf));
									/*/
								output.push(buf);
								//*/
									buf = "";
								}
								nestno++;
							}
							buf += input[i];
							if (input[i] == ')') {
								nestno--;
								if (nestno <= 0) {
									//*
									output.push(Split(buf));
									/*/
								output.push(buf);
								//*/
									buf = "";
								}
							} else {
								if (i == input.length - 1) {
									output.push(Split(buf));
								}
							}
							//else{
							//buf+=input[i];
							//}
						}
					}
				} else {
					//no brackets, no pow, no operators
					if (!hasLetters) {
						output.push(input); //TODO!!!
					} else {
						var buf = "";
						//var lastwasnum = false;
						for (var i = 0; i < input.length; i++) {
							if (hasLetters(input[i])) {
								output.push([buf.replace("(", "").replace(")", "")]);
								buf = "";
								//output.push("*");
								output.push([input[i]]);
								//if (i != input.length - 1) {
								//output.push("*");
								//}
							} else {
								buf += input[i];
								if (i == input.length - 1) {
									output.push([buf.replace("(", "").replace(")", "")]);
								}
							}
						}
					}
				}
			}
		}
		console.log(input + " =(Split)= ");
		//output = [input,output]; //enable for input included
		output = cleanArray(output);
		console.log(output);
		return output;
	}
	//  if (input.indexOf("(") > -1) {
	//    //there are brackets
	//    BracketSplit(input);
	//  }
	//  var curbuffer = "";
	//for(var i = 0; i < input.length; i++){
	//  curbuffer+=input[i];
	//  
	//  //endings
	//  if(input[i] == ')'){
	//   output.push()
	//  }
	// }

function BracketSplit(input) {
		var brackets = [];
		var selecting = false;
		var curbuf = "";
		for (var i = 0; i < input.length; i++) {
			if (input[i] == '(') {
				selecting = true;
			} else if (input[i] == ')') {
				selecting = false;
				brackets.push(curbuf);
				curbuf = "";
			} else if (selecting) {
				curbuf += input[i];
			} else {
				// brackets.push(curbuf);
				// curbuf = "";
			}
		}
		console.log(brackets);
		return brackets;
	}
	//  for (var i = 0; i < input.length; i++) {
	//    if (isLetter(input[i])) {
	//      if(!isOperator(input[i-1]) && i-1 >= 0){
	//       // output = output.splice(i,0,"*");
	//       // output = output.splice(i-1,0,"(");
	//      //  output+=")";
	//      //output = output.substring(i-2,1);
	//      output = output.splice(output.length-1,1,"("+input[i-1]+"*"+input[i]+")");
	//      }
	//    }else{
	//    output+=input[i];
	//    }
	//  }

function containsOperator(input) {
	var nestno = 0;
	for (var i = 0; i < input.length; i++) {
		if (input[i] == '(') {
			nestno++;
		} else if (input[i] == ')') {
			nestno--;
		}
		if (nestno <= 0 && isOperator(input[i])) {
			return true;
		}
	}
	return false;
}

function containsPow(input) {
	var nestno = 0;
	for (var i = 0; i < input.length; i++) {
		if (input[i] == '(') {
			nestno++;
		} else if (input[i] == ')') {
			nestno--;
		}
		if (nestno <= 0 && input[i] == '^') {
			return true;
		}
	}
	return false;
}

function isLetter(c) {
	return c.toLowerCase() != c.toUpperCase();
}

function isOperator(c) {
	return operators.indexOf(c) > -1;
}
if (!String.prototype.splice) {
	/**
	 * {JSDoc}
	 *
	 * The splice() method changes the content of a string by removing a range of
	 * characters and/or adding new characters.
	 *
	 * @this {String}
	 * @param {number} start Index at which to start changing the string.
	 * @param {number} delCount An integer indicating the number of old chars to remove.
	 * @param {string} newSubStr The String that is spliced in.
	 * @return {string} A new string with the spliced substring.
	 */
	String.prototype.splice = function(start, delCount, newSubStr) {
		return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
	};
}
// Settins for CodeMirror

// LaTeX part:
$(document).ready(function(){
	var code_st = $(".codemirror-textarea-st")[0];
	var editor_st = CodeMirror.fromTextArea(code_st, {
		lineNumbers : true,
    	mode: "stex",
    	// theme: "night",
    	indentWithTabs: true,
    	smartIndent: true
	});

//JavaScript part:
	var code_js = $(".codemirror-textarea-js")[0];
	var editor_js = CodeMirror.fromTextArea(code_js, {
		lineNumbers : true,
    	mode: "javascript",
    	// theme: "night",
    	indentWithTabs: true,
    	smartIndent: true,
      extraKeys:{"Ctrl-Space":"autocomplete"}
	});

	$("#convert").click(function(){
		var val = editor_js.getValue();
		var problem = editor_st.getValue();
        // console.log(val, problem)
    	convertUsingIframe(val, problem);
    });
    
  $("#download").click(function(){
		var val = editor_js.getValue("\n");
		var problem = editor_st.getValue();

    var text = "LaTeX: \n" + problem + "\n JavaScript: \n" + val;
    var filename = "problem.txt";
    
    download(filename, text);
    });

});

// window.onload = function(){
//     var code_st = document.getElementById("codemirror-textarea-st");
// 	var editor_st = CodeMirror.fromTextArea(code_st, {
// 		lineNumbers: true,
//     	mode: "stex",
//     	// theme: "night",
//     	indentWithTabs: true,
//     	smartIndent: true
// 	});

// 	var code_js = document.getElementById("codemirror-textarea-js");
// 	var editor_js = CodeMirror.fromTextArea(code_js, {
// 		lineNumbers: true,
//     	mode: "javascript",
//     	// theme: "night",
//     	indentWithTabs: true,
//     	smartIndent: true,
//       extraKeys:{"Ctrl-Space":"autocomplete"}
// 	});

//     document.getElementById('convert').onclick = function(){
//         var val = editor_js.getValue();
// 		var problem = editor_st.getValue();
//     	convertUsingIframe(val, problem);
//     }
// }




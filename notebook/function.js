String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function download(filename, text){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function readNotebook(file){
    var txt;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                txt = allText;
            }
        }
    }
    rawFile.send(null);
    return txt;
}

function convertNotebook(notebook){
  var buttons = ["<div id='buttons_", "' class='buttons'><button id = 'button'>+ Code</button><button id = 'button'>+ Markdown</button></div>"];

  var nb = notebook.toString();
  var nb_content = nb.split("# %% [markdown]").join("@456@").split("# %% [code_js]").join("@456@").split("# %% [code_latex]").join("@456@").split("@456@");
  nb_content.shift();
  var nb_labels = nb;

  for (let i = 0; i < nb_content.length; i++){
    nb_labels = nb_labels.split(nb_content[i]).join("@456@");
  }
  nb_labels = nb_labels.split("@456@")
  nb_labels.pop()

  // nb_content and nb_labels are ready, now we can combine them to get a converted notebook

  var nb_output = "";

  for(let i = 0; i < nb_content.length; i++){
    if(nb_labels[i] == "# %% [markdown]"){
      nb_output += "<div id='box_"+ i +"' class='box'><div class = 'markdown'><br>" + nb_content[i] + "</div>" + buttons[0] + i + buttons[1] + "</div>"
    }

    if(nb_labels[i] == "# %% [code_latex]"){
      nb_output += "<div id='box_"+ i +"' class='box'><div class = 'code_latex'><br>" + nb_content[i] + "</div>" + buttons[0] + i + buttons[1] + "</div>"
    }

    if(nb_labels[i] == "# %% [code_js]"){
      nb_output += "<div id='box_"+ i +"'><div class = 'code_js'>" + nb_content[i] + "</div></div>"
    }
  }
  return nb_output;
}

function convert(js, latex){
  var problem = latex.innerText;
  var val = js.innerText;

	val = val.toString();
	problem = problem.toString();
	
	eval(val);

	//splits val by declare functions 
	val = val.split("var ").join("@").split("let ").join("@").split("const ").join("@").split(" =").join("@").split("=").join("@").split("@");
	//changes all #...# in problem and evaluates them
	for(let i = 1; i < val.length + 1; i++){
		var t = val[i];
		var l = eval(t);
		problem = problem.replaceAll('#'+ val[i] + '#', l);
		i++;
	}

	//output
  let linebreak = "\end{equation*} \begin{equation*}";
  problem = problem.split("//").join(linebreak);

	return problem;
	//restart MathJax
	MathJax.startup.document.state(0);
	MathJax.texReset();
	MathJax.typeset();
}

function exportURL(js, latex){
    var URL = 'https://chickenburger.nomomon.repl.co/export/export.html?js=';
    URL += encodeURI(js);
    URL += '&latex=';
    URL += encodeURI(latex);
    URL += '.';
    return URL;
}

function fixedEncodeURIComponent(str) {
  var e = encodeURI(str);

  var x = ('/[!,;*"()]' + "'")
  for(i = 0; i < x.length; i++){
      e.replaceAll(x[i], '%' + x.charCodeAt(i).toString(16))
  }
  return e;
}

function copyToClipboard(text){
    var textBox = document.createElement('input');
        textBox.value = text;
    document.body.appendChild(textBox) 
    textBox.select();
    document.execCommand("copy");
    document.body.removeChild(textBox)
}

function exportIframe(){
    var URL = exportURL(document.getElementById('preview-form-comment-js').value, document.getElementById('preview-form-comment-st').value);
    var iframe = '<iframe src="' + URL +'"></iframe>'
    // console.log(iframe)
    copyToClipboard(iframe)
}

function convertUsingIframe(val, problem){
    var iframe = document.getElementById('preview-comment');
    iframe.src = exportURL(val, problem);
    iframe.src = iframe.src;
}
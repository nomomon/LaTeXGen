var counter = 0;
var selected = 0;
var counter_var = 0;
const codeBox = document.getElementById('codeBox');

var changeTab = function(name, i){
	let markdown = document.getElementsByClassName('markdown')[i]
	if(name != 'preview')
		markdown.className = 'markdown ' + name +'_selected  selected';
	else if(name == 'preview'){
		// selected = -1 * selected;
		markdown.className = 'markdown unselected';
	}
}

var addMarkdown = function(){
	let markdown = document.createElement('div')
	let tab = document.createElement('div')
	let preview = document.createElement('iframe')
	let js = document.createElement('textarea')
	let latex = document.createElement('textarea')
	let previewTab = document.createElement('button')
	let latexTab = document.createElement('button')
	let jsTab = document.createElement('button')
	let br = document.createElement('br')
	let deleteMarkdownButton = document.createElement('button') //finish the change part
	let addMarkdownButton = document.createElement('button')  //finish this thing
	const num = counter
	counter++;

	tab.appendChild(previewTab)
	tab.appendChild(latexTab)
	tab.appendChild(jsTab)
	tab.appendChild(deleteMarkdownButton)
	markdown.appendChild(br)
	markdown.appendChild(tab)
	markdown.appendChild(preview)
	markdown.appendChild(js)
	markdown.appendChild(latex)
	markdown.appendChild(br)

	markdown.className = "markdown unselected";
	tab.className = "tab";
	preview.className = "preview";
	js.className = "js"
	latex.className = "latex"
	deleteMarkdownButton.className = "deleteMarkdown"
	jsTab.className = "tabButton"
	latexTab.className = "tabButton"
	previewTab.className = "tabButton"
	addMarkdownButton.className = "addMarkdownButton"

	previewTab.innerText = "Preview"
	latexTab.innerText = "LaTeX"
	jsTab.innerText = "JavaScript"
	deleteMarkdownButton.innerHTML = '<i class="material-icons">delete</i>'
	addMarkdownButton.innerText = "+ Markdown"

	preview.innerText = "Preview"
	latex.placeholder = "Write some LaTeX in here...\n\nLike this $x^2 + 2x + 1 = 0$"
	js.placeholder = "Write some JavaScript in here..."

	previewTab.onclick = function() {changeTab('preview', num); changePreview(num)}
	latexTab.onclick = function() {changeTab('latex', num)}
	jsTab.onclick = function() {changeTab('js', num)}
	markdown.onclick = function(){if(selected != num)changeMarkdown(num)}
	addMarkdownButton.onclick = function(){addMarkdown()}

	codeBox.appendChild(markdown)
	codeBox.appendChild(br)
	// codeBox.appendChild(addMarkdownButton)

	changeMarkdown(num)
    
}

var changeMarkdown = function(changeToMarkdown){
	let allMarkdown = document.getElementsByClassName('markdown')
	let changeTo = document.getElementsByClassName('markdown')[changeToMarkdown]
	for (var i = allMarkdown.length - 1; i >= 0; i--) {
		allMarkdown[i].className = 'markdown unselected'
	}
	selected = changeToMarkdown;
	changeTo.className = "markdown latex_selected  selected"
}

var changePreview = function(i){
    let preview = document.getElementsByClassName('preview')[i];
    let js = document.getElementsByClassName('js')[i].value;
    let latex = document.getElementsByClassName('latex')[i].value;

    preview.src = exportURL(js, latex)
}

var createJsVar = function(itemId){
    // button to add var
    // input for name 
    // input for value
    // button for deleting

    var jsTab = document.getElementsByClassName('js')[itemId]
    var list = document.createElement('li')
    var plusButton = document.createElement('button')
    var nameInput = document.createElement('input')
    var valueInput = document.createElement('input')
    var removeButton = document.createElement('button')
    
    document.jsTab.appendChild(list);

    list.appendChild(nameInput)
    list.appendChild(valueInput)
    list.appendChild(removeButton)
    list.id = itemId.toString() + counter_var;

    nameInput.placeholder = 'Name of the variable'
    valueInput.placeholder = 'Value of the variable'
    removeButton.innerText = 'remove';
    counter_var++;
    removeButton.onclick = function(){removeElement(itemId.toString())}
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
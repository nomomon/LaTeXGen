String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function convert2(js, latex){
    var problem = latex;
    var val = js;

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

    problem = problem.split("newline").join('<br>');
    problem = problem.split("\n").join('<br>');
    problem = problem.split("+-").join("-").split("+ -").join("-");
    problem = problem.split("--").join("+").split("- -").join("+");
    // problem = shortcut(problem, '&', 'bf')
    // problem = shortcut(problem, '~', 'cancel')
    return problem;
}
function shortcut(problem, sym, name){
    if(problem.indexOf(sym) == -1) return problem;
    problem = problem.split(sym);
    let n = problem.length;
    console.log(problem)
    let output = '';
    let backslash = String.fromCharCode(92);
    for(i = 0; i <= (n+1)/2; i++){
        if(i % 2 == 0) output += problem[i]
        else output += backslash + name + '{'+ problem[i] + '}'
    }
    return output;
}

var URL = window.location.href;

var data = URL.split('?')[1].split('&')

var js = (data[0] + " ").slice(3, -1)
var latex = data[1].slice(6, -1)

var symbols = '$&?#$^*!@()"[]\%.,<> =;-+:%@' + "'" + String.fromCharCode(92); // 92 is backslash
function decodeURIplus(text){
    for(i = 0; i < symbols.length; i++){
        text = text.replaceAll(encodeURIComponent(symbols[i]).toString(), symbols[i])
    }
    text = text.replaceAll("%27", "'")
    text = text.replaceAll('%0A','\n');
    return text;
}

js = decodeURI(decodeURIplus(js));
latex = decodeURI(decodeURIplus(latex));
try{
    var output = convert2(js, latex)
}catch(error){
    console.log(error)
    console.log("JavaScript: \n" + js)
    console.log("LaTeX: \n" + latex)
}

document.getElementById('preview').innerHTML = output;
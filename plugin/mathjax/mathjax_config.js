window.MathJax = {
  loader: {load: ['[tex]/newcommand', '[tex]/cancel']},
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    packages: {'[+]': ['newcommand', 'cancel', 'extpfeil']}
  },
  svg: {
    fontCache: 'global'
  }
};

console.log("MathJax connected!");
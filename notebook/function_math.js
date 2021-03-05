//function that finds greatest common denominator
function gcd(a, b){
  while (a != 0 && b != 0){
    if(b > 0)
      a = a % b;
    if(a > 0)
      b = b % a;
  }
  return (a + b);
}
//function that finds least common multiple
function lcm(a, b){
  return a * b / gcd(a, b);
}

//function that puts something into exponent
let pow = (a, b = 2) => Math.pow(a,b)

//function for random numbers rand(type, min, max) 
//	type = {"int", "float"} number is either integer or float (not whole)
//	min & max show the range where to pick the random numbers
function rand(type = "int", min = 0, max = 10){
	type = type.toString();
	if(type == "int"){
		return Math.floor(Math.random() * (max - min) ) + min;
	}
	if(type == "float"){
		return Math.random() * (max - min) + min;
	}
}
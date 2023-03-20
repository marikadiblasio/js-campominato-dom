//The maximum is exclusive and the minimum is inclusive
function getRndNum(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
// The maximum is inclusive and the minimum is inclusive
function getRndNumIncl(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
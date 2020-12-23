/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
   
    let count = 0;
    let prev = null;
    const newArr = [];
 
    for ( let elem of [...string] ) {
       
       ++count
 
       if (elem !== prev) {
          count = 1; }
 
       if (count <= size) {newArr.push(elem);}
 
          prev = elem ;
       
    }
 
    let newStr = size === undefined ? string : newArr.join('')
  
     return newStr
}

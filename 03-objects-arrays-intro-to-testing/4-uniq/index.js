/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
   
    if(Array.isArray(arr) === true) { 
     return   [...new Set(arr)] ;
      
          } else   return []
        
     
}

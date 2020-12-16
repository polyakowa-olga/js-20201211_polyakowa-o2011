/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

    let arrClone = arr.slice();

    let sort = arrClone.sort((a,b)=> a.localeCompare(b,['ru-RU','en-UA'],{ caseFirst: 'upper'}));
    
        if (param == 'asc') {

           return sort; 
        

       } else if (param == 'desc'){
                     
    let sortDesc = sort.reverse();

           return sortDesc;
         

     } else alert("ТАК сортировать не обучены! Либо 'ask' либо 'desc'!")

}

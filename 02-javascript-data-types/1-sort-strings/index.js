/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

    switch (param) {
        case 'asc' :
            return makeSorting(arr, 1);
        case 'desc':
            return makeSorting(arr, -1);
        default:
            return alert("ТАК сортировать не обучены! Либо 'ask' либо 'desc'!")

    }
    
         function makeSorting(arrey, direction){
             return [...arrey].sort((a,b) => direction * a.localeCompare(b,['ru-RU','en-UA'], {caseFirst: 'upper'}));
        }
    

}

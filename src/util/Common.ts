export function calculatePageSize(numElem : number, startPageSize : number) {
    let pageSize = 0;
    let lastPageSize = 0;
    for(let i = startPageSize; i > 0; i--) {
        let elemLastRow = numElem % i === 0 ? i : numElem % i;

        if(elemLastRow > lastPageSize) {
            pageSize = i;
            lastPageSize = elemLastRow;
        }
    }
    return pageSize;
}

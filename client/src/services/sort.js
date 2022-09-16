export default function orderService (array, options){

    const property = options.orderBy

    if(Array.isArray(array) && array.length > 0){

        array.sort(function(a, b){
            if(a[property] > b[property]){
                if(options.orderAs === "ASC") return 1
                return -1
            }
            if(a[property] < b[property]){
                if(options.orderAs === "ASC") return -1
                return 1
            }
            return 0 
        })
    }

    return array
} 
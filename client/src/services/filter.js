
export default function filterServices (array, options){

    if (Object.keys(options).length === 0) return array
    if(options.origin === "originals"){
       array = array.filter(p => p.originals === true) 
    }
    if(options.origin === "created"){
        array = array.filter(p => p.originals !== true) 
    }
    if(options.Types){
        array = array.filter(p => p.Types.find(t=> t.name === options.Types ))
    }
    return array

}
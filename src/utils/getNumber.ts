export const getNumbersPrice = (string:string) => string.split(' ').map(item => +item).filter(item => !item === false)
export const getNumbersArea = (string:any) => {
    let arr = []
    let text = string.split(' ')[1].slice(0,-1)
    if(text.includes("-")){
        arr = text.split("-").map((item:any) => +item)
    }else{
        arr = [Number(text)]
    }
    return arr
}
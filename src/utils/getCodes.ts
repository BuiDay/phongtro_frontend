import { getNumbersArea, getNumbersPrice } from "./getNumber"


export const getCodePrice = (totals:any,min:number,max:number) => {
    return totals?.map((item:any) => {
        let arrMaxMin = getNumbersPrice(item.value)
        return ({
            ...item,
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 99999 : arrMaxMin[0],
        })
    })
}
export const getCodeArea = (totals:any,min:number,max:number) => {
    return totals?.map((item:any) => {
        let arrMaxMin = getNumbersArea(item.value)
        return ({
            ...item,
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 99999 : arrMaxMin[0],
        })
    })
}

export const getCodes = (entry:any, prices:any,min:number,max:number) => {
    const pricesWithMinMax = getCodePrice(prices,min,max)
    return pricesWithMinMax.filter((item:any)=>item.min <= entry && item.max > entry)
}
export const getCodesArea = (entry:any, areas:any,min:number,max:number) => {
    const areasWithMinMax = getCodeArea(areas,min,max)
    return areasWithMinMax.filter((item:any)=>item.min <= entry && item.max > entry)
}
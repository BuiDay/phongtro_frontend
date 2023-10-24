import React, { memo } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md'
const active = 'w-[46px] h-[48px] flex justify-center items-center bg-[#E13427] text-white hover:opacity-90 rounded-md'

interface IProps{
    text?:string | number, 
    currentPage?:number, 
    icon?:JSX.Element, 
    setCurrentPage?:any
    type?:string
}

const PageNumber:React.FC<IProps> = ({ text, currentPage, icon, setCurrentPage, type }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [paramsSeach] = useSearchParams()
    let entries = paramsSeach.entries()

    const append = (entries:any) => {
        let params = []
        typeof(text) !== "string" ? text && paramsSeach.append('page', text.toString()) : paramsSeach.append('page', text)
        for (let entry of entries) {
            params.push(entry);
        }
        let searchParamsObject:any = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        return searchParamsObject
    }

    const handleChangePage = () => {
        if (!(text === '...')) {
            setCurrentPage(Number(text))
            navigate({
                pathname: location?.pathname,
                search: createSearchParams(append(entries)).toString()
            });
        }
    }
    return (
        <div
            className={text && currentPage && +text === +currentPage ? `${active} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'} shadow-md`}
            onClick={handleChangePage}
        >
            {icon || text}
        </div>
    )
}

export default memo(PageNumber)
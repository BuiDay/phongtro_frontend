import React, { useEffect, useState } from 'react'
// import { PageNumber } from './PageNumber'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import PageNumber from './PageNumber'

const { GrLinkNext } = icons

const Pagination = () => {
    const { count, posts } = useAppSelector(state => state.post)
    const [arrPage, setArrPage] = useState<number[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        let page = searchParams.get('page')
        page && +page !== currentPage && setCurrentPage(+page)
        !page && setCurrentPage(1)
    }, [searchParams])
    useEffect(() => {
        // let maxPage = Math.ceil(count || 1 / process.env.LIMIT_POSTS )
        let maxPage = count && Math.ceil(count / 5 ) || 1
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
        let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2)
        let temp:number[] = []
        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)
        currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false)
        // 3 => 1 2 3 (1 ... 2 3)

    }, [count, posts, currentPage])
    return (
        <div className='flex items-center justify-center gap-2 py-5'>
             {!isHideStart && <PageNumber setCurrentPage={setCurrentPage} text={1} />}
            {(!isHideStart && currentPage !== 4) && <PageNumber text={'...'} />}
            {arrPage.length > 0 && arrPage.map(item => {
                return (
                    <PageNumber
                        key={item}
                        text={item}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                )
            })}
            {!isHideEnd && <PageNumber text={'...'} />}
            {!isHideEnd && <PageNumber icon={<GrLinkNext />} setCurrentPage={setCurrentPage} text={count && posts && Math.floor(count / posts.length)} />} 
        </div>
    )
}

export default Pagination
import React, { useState,useCallback, useEffect,memo } from 'react';
import icons from '../../utils/icons'
import SearchItem from './SearchItem'
import Modal from '../Modal/Modal';
import { useAppSelector } from '../../store/hook'
import { RootState } from '../../store/redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
interface IQueries{
    category?:string,
    province?:string,
    price?:string,
    area?:string,
    provinceCode?:string,
    categoryCode?:string
    areaNumber?:[],
    priceNumber?:[],

}
const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons
const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {categories,prices,provinces,areas}  = useAppSelector((state:RootState) => state.app)
    const [isShowModal, setIsShowModal] = useState(false)
    const [content, setContent] = useState<any[]>([])
    const [name, setName] = useState('')
    const [defaultText, setDefaultText] = useState('')
    const [title, setTitle] = useState('')
    const [queries, setQueries] = useState<IQueries>({})
    const [arrMinMax, setArrMinMax] = useState({})

    const handleShowModal = (content:any[] , name:string, defaultText:string,title:string) => {
        setContent(content)
        setName(name)
        setDefaultText(defaultText)
        setIsShowModal(true)
        setTitle(title)
    }
    const handleSubmit = useCallback((e?:React.MouseEvent<HTMLSpanElement, MouseEvent>, query?:any, arrMaxMin?:object) => {
        e && e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
    }, [isShowModal, queries])

    const handleSearch =  ()  => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        let queryCodesObj:any = {}
        queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        let queryTextObj:any = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        let titleSearch = `${queryTextObj.category
            ? queryTextObj.category
            : 'Cho thuê tất cả'} ${queryTextObj.province
                ? `ở ${queryTextObj.province}`
                : ''} ${queryTextObj.price
                    ? `Giá ${queryTextObj.price}`
                    : ''} ${queryTextObj.area
                        ? `diện tích ${queryTextObj.area}` : ''} `
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString(),
        }, { state: { titleSearch } })
    }

    // useEffect(() => {
    //     if (!location?.pathname.includes(path.SEARCH)) {
    //         setArrMinMax({})
    //         setQueries({})
    //     }
    // }, [location])

    return (
        <div className='p-[10px] max-w-[1100px] w-full my-0 md:my-3 mx-auto bg-[#febb02] rounded-lg flex flex-wrap md:flex-row items-center justify-around gap-2'>
                <span className='cursor-pointer flex-1' onClick={() => categories && handleShowModal(categories, 'category', 'Tìm tất cả','Chọn loại bất động sản')}>
                    <SearchItem IconBefore={<MdOutlineHouseSiding />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.category} defaultText={'Tìm tất cả'} />
                </span>
                <span className='cursor-pointer flex-1' onClick={() =>provinces && handleShowModal(provinces, 'province', 'Toàn quốc','Chọn tỉnh thành')}>
                    <SearchItem IconBefore={<HiOutlineLocationMarker />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.province} defaultText={'Toàn quốc'} />
                </span>
                <span className='cursor-pointer flex-1' onClick={() =>prices && handleShowModal(prices, 'price', 'Chọn giá','Chọn giá')}>
                    <SearchItem IconBefore={<TbReportMoney />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.price} defaultText={'Chọn giá'} />
                </span>
                <span className='cursor-pointer flex-1' onClick={() =>areas&& handleShowModal(areas, 'area', 'Chọn diện tích','Chọn diện tích')}>
                    <SearchItem IconBefore={<RiCrop2Line />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.area} defaultText={'Chọn diện tích'} />
                </span>
            <button
                    type='button' 
                    onClick={handleSearch}
                    className='outline-none py-1 px-1 md:py-2 md:px-4 flex-1 bg-secondary text-[13.3px] flex items-center justify-center gap-2 text-white font-medium rounded-md'
                >
                    <FiSearch />
                    Tìm kiếm
            </button>
            {isShowModal && 
            <Modal
                handleSubmit = {handleSubmit}
                setIsShowModal={setIsShowModal}
                content={content}
                name={name}
                defaultText={defaultText}
                title = {title}
                queries = {queries}
                arrMinMax={arrMinMax}
            />}
        </div>
    );
};

export default memo(Search);
import React from 'react';

interface IinputForm {
    label?:string,
    type?:string,
    setVaule?:any,
    value?:string | number,
    typeParams?:any,
    onKeyDown?:any
}

const InputForm:React.FC<IinputForm> = ({label,type,setVaule,value,typeParams,onKeyDown}) => {
    return (
        <>
        <div>
            <label htmlFor="phone" className='text-xs'>{label}</label>
            <input type={type} 
                    className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
                    value={value}
                    onChange={(e)=>(setVaule((prev: any)=>({...prev,[typeParams]:e.target.value})))}
                    onKeyDown={onKeyDown}
            />
        </div>
        </>
    );
};

export default InputForm;
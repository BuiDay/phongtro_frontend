import React,{memo} from 'react';
import { Link } from 'react-router-dom';

interface IPropsButton{
    text?:string, 
    fontSize?:string,
    bgColor?:string, 
    textColor?:string,
    icon?:any,
    onClick?:any,
    fullWidth?:any,
    link?:any,
    py?:string,
    px?:string,
    target?:string
}

const Button:React.FC<IPropsButton> = ({text, bgColor, textColor,icon,onClick,fullWidth,link,py,px,fontSize,target}) => {

    return (
        <button type="button" 
            className={`${py? "md:"+py :"py-1 xl:py-2"} ${fontSize && fontSize} ${px ? px :"px-1 xl:px-4"} ${bgColor} ${fullWidth && "w-full"} ${textColor} outline-none rounded-md hover:underline justify-center flex items-center gap-1`} 
            onClick={onClick}   
            >
            {
                icon ?  <span className='mt-0.5'>{icon}</span> :""
            }
            <Link target={target} to={link}>{text}</Link> 
            
        </button>
    );
};
export default memo(Button);
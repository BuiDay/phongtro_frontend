import React from 'react';

interface IProp{
  height?:string,
  width?:string,
}

const Loading:React.FC<IProp> = ({height,width}) => {

    const styles = `
    .loader {
        border: 8px solid #f3f3f3;
        border-radius: 50%;
        border-top: 8px solid #dddddd;
        width: ${width ? width : "80px"};
        height: ${height ? height : "80px"};;
        -webkit-animation: spin 1s linear infinite; /* Safari */
        animation: spin 1s linear infinite;
      }
      
      /* Safari */
      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    return (
        <>
            <style>{styles}</style>
            <div className="loader"></div>
        </>
        
    );
};

export default Loading;
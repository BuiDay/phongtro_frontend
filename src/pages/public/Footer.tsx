import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className='w-full bg-white px-[15px] md:px-0 mt-20 py-7'>
            <div className='max-w-[1100px] w-full m-auto'>
                <div className='flex flex-col gap-3 text-center md:text-left md:flex-row md:gap-0'>
                    <div className='basis-1/2 px-2'>
                        <img className='w-[240px] h-[70px] object-contain md:m-0 m-auto mb-3' src={require('../../asset/images/logo-removebg-preview.png')} alt="" />
                        <p className='md:mt-3 text-xs'>Phongtro tự hào có lượng dữ liệu bài đăng lớn nhất trong lĩnh vực cho thuê phòng trọ.</p>
                    </div>
                    <div className='basis-1/3 px-2'>
                        <ul>
                            <li className='font-bold text-sm'>Về PHONGTRO</li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Giới thiệu
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline' >
                                <Link to="/">
                                    Blog
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Quy chế hoạt động
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Quy định sử dụng
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Chính sách bảo mật
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='basis-1/3 px-2'>
                       <ul>
                            <li className='font-bold text-sm'>Hỗ trợ khách hàng</li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Câu hỏi thường gặp
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Hướng dẫn đăng tin
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Bảng giá dịch vụ
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Quy định đăng tin
                                </Link>
                            </li>
                            <li className='text-sm py-1 hover:underline'>
                                <Link to="/">
                                    Giải quyết khiếu nại
                                </Link>
                            </li>
                       </ul>
                    </div>
                    <div className='basis-1/3 px-2'>
                        <ul>
                            <li className='font-bold text-sm'>Liên hệ với chúng tôi</li>
                            <li className='mt-3'>
                                <div className='flex items-center justify-center md:justify-start gap-2'>
                                    <div className='w-[35px] h-[35px] object-contain'>
                                        <img src="images/icon_facebook.svg" alt="" />
                                    </div>
                                    <div className='w-[35px] h-[35px] object-contain'>
                                        <img src="images/icon_youtube.svg" alt="" />
                                    </div>
                                    <div className='w-[35px] h-[35px] object-contain'>
                                        <img src="images/icon_zalo.svg" alt="" />
                                    </div>
                                    <div className='w-[35px] h-[35px] object-contain'>
                                        <img src="images/icon_twitter.svg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li className='font-bold text-sm mt-3'>Phương thức thanh toán</li>
                            <li className='mt-3'>
                                <img src="images/method-payment-icon.jpg" alt="" />
                            </li>
                        </ul>
                    </div>
                </div>  
                <div className='flex-col flex gap-2 items-center text-center mt-5 py-5 text-sm'>
                    <h1 className='font-medium'>CÔNG TY TNHH LBKCORP</h1>
                    <h2 className='font-medium'>Tổng đài CSKH: 0917686101</h2>
                    <p>Copyright © 2015 - 2023 Phongtro</p>
                    <p>Email: cskh.phongtro123@gmail.com</p>
                    <p>Địa chỉ: LE-4.07, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh</p>
                    <p>Giấy phép đăng ký kinh doanh số 0313588502 do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp ngày 24 tháng 12 năm 2015.</p>
                    <div className='flex items-center gap-3 mt-2'>
                        <div className='w-[140px]'>
                            <img src="images/bo-cong-thuong.png" alt="" />
                        </div>
                        <div className='w-[110px]'>
                            <img src="images/dmca-badge-w250-2x1-04.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default Footer;
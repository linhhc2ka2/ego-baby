/* eslint-disable array-callback-return */
/* eslint-disable no-useless-concat */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import * as request from '~/untils/httpRequest';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/css/grid';
import { Navigation, Grid } from 'swiper';

import styles from './HomePage.module.scss';
import CardProduct from '~/components/CardProduct';
import CategoryList from '~/components/Category';
import Button from '~/components/Button';
import Blog from '~/components/Blog';
import Service from '~/components/Service';

import imgSlider from '~/assets/upload/slider_1.jpg';
import imgBanner from '~/assets/upload/bannerlarge.jpg';
import imgCam1 from '~/assets/upload/bgcam_1.jpg';
import imgCam2 from '~/assets/upload/bgcam_2.jpg';
import imgBestSale from '~/assets/upload/bestseler.jpg';
import imgVertical from '~/assets/upload/banner_vertical2.jpg';
import imgHori1 from '~/assets/upload/banner_hori01.jpg';
import imgHori2 from '~/assets/upload/banner_hori02.jpg';

const cx = classNames.bind(styles);

function HomePage() {
    const [timeLeft, setTimeLeft] = useState({});
    const [arrProduct, setArrProduct] = useState([]);
    const [arrCategory, setArrCategory] = useState([{}]);
    const [arrBlog, setArrBlog] = useState([]);
    const [arrService, setArrService] = useState([]);
    const timerComponents = [];

    useEffect(() => {
        // API Product
        const fetchApiProduct = async () => {
            try {
                const response = await request.get('/products');

                return setArrProduct(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiProduct();

        // API Category
        const fetchApiCategory = async () => {
            try {
                const response = await request.get('/categories');

                setArrCategory(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiCategory();

        // API Blog
        const fetchApiBlog = async () => {
            try {
                const response = await request.get('/blogs');

                setArrBlog(response.slice(0, 2));
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiBlog();

        // API Service
        const fetchApiService = async () => {
            try {
                const response = await request.get('/services');

                setArrService(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiService();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    Object.keys(timeLeft).forEach((interval, index) => {
        const index2 = index + 999;

        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={index} className={cx('time-in-day')}>
                {timeLeft[interval]}
            </span>,
            <span key={index2} className={cx('dot')}>
                :
            </span>,
        );
    });

    // Count down
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(`10/01/${year}`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        if (timeLeft.hours < 10) {
            timeLeft.hours = '0' + timeLeft.hours;
        }

        if (timeLeft.minutes < 10) {
            timeLeft.minutes = '0' + timeLeft.minutes;
        }

        if (timeLeft.seconds < 10) {
            timeLeft.seconds = '0' + timeLeft.seconds;
        }
        return timeLeft;
    };

    return (
        <>
            {/* Slider */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-slider')}>
                    <Swiper spaceBetween={50} slidesPerView={1}>
                        <SwiperSlide>
                            <Link to={'/product-page/' + `@all` + '/' + `Tất cả sản phẩm`} className={cx('img-slider')}>
                                <img src={imgSlider} alt="slider" />
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            {/* Flash Sale */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-flash')}>
                    <div className={cx('inner')}>
                        <div className={cx('title-sale')}>
                            <div className={cx('timer')}>
                                <h2 className={cx('title')}>
                                    <Link
                                        to={'/product-page/' + `@promotion` + '/' + `Sản phẩm khuyến mãi`}
                                        className={cx('text-main')}
                                    >
                                        Deal sốc mỗi ngày
                                    </Link>
                                </h2>
                                <div className={cx('count-down')}>
                                    {timerComponents.length ? timerComponents : <span>Count Down!</span>}
                                </div>
                            </div>
                        </div>

                        <Swiper
                            spaceBetween={20}
                            slidesPerView={5}
                            navigation={true}
                            modules={[Navigation]}
                            breakpoints={{
                                360: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 10,
                                },
                                992: {
                                    slidesPerView: 5,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {arrProduct.map(
                                (result) =>
                                    result.flash && (
                                        <SwiperSlide key={result.id}>
                                            <CardProduct data={result} typeDefault={false} checkData="flash" />
                                        </SwiperSlide>
                                    ),
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* Product Outstanding */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-outstanding')}>
                    <div className={cx('d-flex', 'block-title')}>
                        <Button
                            to={'/product-page/' + `@outstanding` + '/' + `Sản phẩm nổi bật`}
                            primary
                            rounded
                            className={cx('btn-category')}
                        >
                            <span className={cx('fw-bold')}>Mẫu mới về</span>
                        </Button>

                        <ul className={cx('tab-list')}>
                            {arrCategory.map(
                                (result) =>
                                    result.new && <CategoryList key={result.id} data={result} checkData="small" />,
                            )}
                        </ul>
                    </div>

                    <Swiper
                        slidesPerView={5}
                        grid={{
                            fill: 'row',
                            rows: 2,
                        }}
                        spaceBetween={10}
                        navigation
                        modules={[Grid, Navigation]}
                        breakpoints={{
                            360: {
                                slidesPerView: 1.5,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3.5,
                                spaceBetween: 10,
                            },
                            992: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {arrProduct.map(
                            (result) =>
                                !result.flash && (
                                    <SwiperSlide key={result.id}>
                                        <CardProduct data={result} typeDefault={true} />
                                    </SwiperSlide>
                                ),
                        )}
                    </Swiper>
                </div>
            </div>
            {/* Banner */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-banner')}>
                    <Swiper spaceBetween={50} slidesPerView={1}>
                        <SwiperSlide>
                            <Link to={'/product-page/' + `@all` + '/' + `Tất cả sản phẩm`} className={cx('img-banner')}>
                                <img src={imgBanner} alt="Banner" />
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            {/* Top */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-top')}>
                    <h2 className={cx('title-module')}>Top danh mục</h2>

                    <ul className={cx('d-flex align-items-center', 'wrapper')}>
                        {arrCategory.map((result, index) => (
                            <CategoryList key={index} data={result} checkData="large" />
                        ))}
                    </ul>
                </div>
            </div>
            {/* Deal */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-deal')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-6 col-12 mb-3')}>
                            <div className={cx('item')} style={{ backgroundImage: `url(${imgCam1})` }}>
                                <h2>Giá sốc mỗi ngày</h2>
                                <h5>Số lượng có hạn</h5>
                                <div className={cx('deal-content')}>
                                    <h6>Bộ sưu tập mùa hè cho bé Thiết kế mới</h6>
                                    <p>
                                        Giá chỉ từ <span>125K</span>
                                    </p>
                                    <div className={cx('time-map')}>
                                        <p>Nhanh tay kẻo hết!</p>
                                        <div className={cx('count-down')}>
                                            {timerComponents.length ? timerComponents : <span>Count Down!</span>}
                                        </div>
                                        <Button
                                            to={'/product-page/' + `@outstanding` + '/' + `Sản phẩm nổi bật`}
                                            className={'w-fit-content'}
                                            outlineWhite
                                            rounded
                                        >
                                            Xem ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-6 col-12 mb-3')}>
                            <div className={cx('item')} style={{ backgroundImage: `url(${imgCam2})` }}>
                                <h2>Bé chơi bé khỏe</h2>
                                <h5>Số lượng rất ít</h5>
                                <div className={cx('deal-content')}>
                                    <h6>Bộ sưu tập đồ chơi trí tuệ cho bé</h6>
                                    <p>
                                        Chỉ từ <span>250K</span>
                                    </p>
                                    <div className={cx('time-map')}>
                                        <p>Mua ngay kẻo hết!</p>
                                        <div className={cx('count-down')}>
                                            {timerComponents.length ? timerComponents : <span>Count Down!</span>}
                                        </div>
                                        <Button
                                            to={'/product-page/' + `@outstanding` + '/' + `Sản phẩm nổi bật`}
                                            className={'w-fit-content'}
                                            outlineWhite
                                            rounded
                                        >
                                            Xem ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Coupon */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-coupon')}>
                    <div className={cx('module-body')}>
                        <Link to={'/product-page/' + `@outstanding` + '/' + `Sản phẩm nổi bật`}>
                            <span className={cx('purchase-text')}>
                                Siêu ưu đãi cho <strong>đơn hàng đầu tiên.</strong>
                            </span>
                            <span className={cx('purchase-code')}>EgoKIDSU</span>
                            <span className={cx('purchase-description')}>Sử dụng mã khi thanh toán!</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Best Sale */}
            <div className={cx('row', 'section-best')}>
                <div className={cx('container-app')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-3 col-12 d-md-none d-lg-block d-block')}>
                            <Link to={'/product-page/' + `@all` + '/' + `Tất cả sản phẩm`}>
                                <img src={imgBestSale} alt={imgBestSale} />
                            </Link>
                        </div>
                        <div className={cx('col-lg-9 col-12')}>
                            <Link to={'/product-page/' + `@outstanding` + '/' + `Sản phẩm nổi bật`}>
                                <h2 className={cx('title-module')}>Bán chạy của Tháng</h2>
                            </Link>

                            <Swiper
                                spaceBetween={20}
                                slidesPerView={4}
                                navigation={true}
                                modules={[Navigation]}
                                breakpoints={{
                                    360: {
                                        slidesPerView: 2,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 3.5,
                                        spaceBetween: 10,
                                    },
                                    992: {
                                        slidesPerView: 4,
                                        spaceBetween: 10,
                                    },
                                }}
                            >
                                {arrProduct.map(
                                    (result) =>
                                        result.sold >= 500 && (
                                            <SwiperSlide key={result.id}>
                                                <CardProduct data={result} typeDefault={true} checkData="top" />
                                            </SwiperSlide>
                                        ),
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            {/* News */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-news')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-6 col-12')}>
                            <Link to={'/product-page/' + `@all` + '/' + `Tất cả sản phẩm`}>
                                <h2 className={cx('title-module')}>Tin mới cập nhật</h2>
                            </Link>

                            <div className={cx('blog-wrapper')}>
                                {arrBlog.map((result) => (
                                    <Blog key={result.id} data={result} />
                                ))}
                            </div>
                        </div>
                        <div className={cx('col-lg-6 col-12')}>
                            <div className={cx('row')}>
                                <div className={cx('col-md-6')}>
                                    <Link to={'/product-page/' + `@all` + '/' + `Tất cả sản phẩm`}>
                                        <img
                                            src={imgVertical}
                                            alt="banner-blog"
                                            className={cx('mb-md-0 mb-3', 'img-blog')}
                                        />
                                    </Link>
                                </div>
                                <div className={cx('col-md-6')}>
                                    <Link to={'/product-page/' + `@all` + '/' + `Tất cả sản phẩm`}>
                                        <img src={imgHori1} alt="banner-blog" className={cx('mb-3', 'img-blog')} />
                                    </Link>
                                    <Link to={'/product-page/' + `@all` + '/' + `Tất cả sản phẩm`}>
                                        <img src={imgHori2} alt="banner-blog" className={cx('mb-3', 'img-blog')} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Services */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-services')}>
                    <div className={cx('row')}>
                        {arrService.map((result) => (
                            <div key={result.id} className={cx('col-lg-3 col-md-6 col-12')}>
                                <Service data={result} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;

import { useCallback, useEffect, useRef, useState } from 'react';
import category from '~/assets/fake-data/category';
import colors from '~/assets/fake-data/product-color';
import size from '~/assets/fake-data/product-size';
import productData from '~/assets/fake-data/products';
import Button from '~/components/Button/Button';
import CheckBox from '~/components/CheckBox/CheckBox';
import Helmet from '~/components/Helmet';
import InfinityList from '~/components/InfinityList';
import './catalog-page.scss';
import { BiLeftArrowAlt } from 'react-icons/bi';

const initFilter = {
    category: [],
    colors: [],
    size: [],
};

export default function CatalogPage() {
    const productList = productData.getAllProducts();

    const [products, setProducts] = useState(productList);

    const [filter, setFilter] = useState(initFilter);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'COLORS':
                    setFilter({ ...filter, colors: [...filter.colors, item.color] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'COLORS':
                    const newColors = filter.colors.filter((e) => e !== item.color);
                    setFilter({ ...filter, colors: newColors });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
            }
        }
    };

    const clearFilter = () => setFilter(initFilter);

    const updateProducts = useCallback(() => {
        let temp = productList;
        if (filter.category.length > 0) {
            temp = temp.filter((e) => filter.category.includes(e.categorySlug));
        }

        if (filter.colors.length > 0) {
            temp = temp.filter((e) => {
                const check = e.colors.find((color) => filter.colors.includes(color));
                return check !== undefined;
            });
        }

        if (filter.size.length > 0) {
            temp = temp.filter((e) => {
                const check = e.size.find((size) => filter.size.includes(size));
                return check !== undefined;
            });
        }

        setProducts(temp);
    }, [filter, productList]);

    useEffect(() => {
        updateProducts();
    }, [updateProducts]);

    const filterRef = useRef(null);

    const showHideFilter = () => filterRef.current.classList.toggle('active');

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div ref={filterRef} className="catalog__filter">
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <BiLeftArrowAlt />
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">Danh mục sản phẩm</div>
                        <div className="catalog__filter__widget__content">
                            {category.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">Màu sắc</div>
                        <div className="catalog__filter__widget__content">
                            {colors.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('COLORS', input.checked, item)}
                                        checked={filter.colors.includes(item.color)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">Kích cỡ</div>
                        <div className="catalog__filter__widget__content">
                            {size.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('SIZE', input.checked, item)}
                                        checked={filter.size.includes(item.size)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>
                                Xoá bộ lọc
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>
                        Bộ lọc
                    </Button>
                </div>

                <div className="catalog__content">
                    <InfinityList data={products} />
                </div>
            </div>
        </Helmet>
    );
}

import { BiShoppingBag, BiCreditCard, BiDiamond, BiDonateHeart } from 'react-icons/bi';

const policy = [
    {
        name: 'Miễn phí giao hàng',
        description: 'Miễn phí ship với đơn hàng > 239K',
        icon: <BiShoppingBag />,
    },
    {
        name: 'Thanh toán COD',
        description: 'Thanh toán khi nhận hàng (COD)',
        icon: <BiCreditCard />,
    },
    {
        name: 'Khách hàng VIP',
        description: 'Ưu đãi dành cho khách hàng VIP',
        icon: <BiDiamond />,
    },
    {
        name: 'Hỗ trợ bảo hành',
        description: 'Đổi, sửa đồ tại tất cả store',
        icon: <BiDonateHeart />,
    },
];

export default policy;

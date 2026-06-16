export const catalogProducts = [
  {
    name: 'T-shirt with Tape Details',
    image: '/images/shio/product-tape-tee.jpg',
    price: '$120',
    rating: '4.5/5',
    size: 'Large',
    color: 'Black',
  },
  {
    name: 'Skinny Fit Jeans',
    image: '/images/shio/product-skinny-jeans.jpg',
    price: '$240',
    oldPrice: '$260',
    discount: '-20%',
    rating: '3.5/5',
    size: 'Large',
    color: 'Blue',
  },
  {
    name: 'Checkered Shirt',
    image: '/images/shio/product-checkered-shirt.jpg',
    price: '$180',
    rating: '4.5/5',
    size: 'Medium',
    color: 'Red',
  },
  {
    name: 'Sleeve Striped T-shirt',
    image: '/images/shio/product-sleeve-striped-tee.jpg',
    price: '$130',
    oldPrice: '$160',
    discount: '-30%',
    rating: '4.5/5',
    size: 'Large',
    color: 'Orange',
  },
  {
    name: 'Vertical Striped Shirt',
    image: '/images/shio/product-vertical-shirt.jpg',
    price: '$212',
    oldPrice: '$232',
    discount: '-20%',
    rating: '5.0/5',
    size: 'Medium',
    color: 'Green',
  },
  {
    name: 'Courage Graphic T-shirt',
    image: '/images/shio/product-courage-tee.jpg',
    price: '$145',
    rating: '4.0/5',
    size: 'Large',
    color: 'Orange',
  },
  {
    name: 'Loose Fit Bermuda Shorts',
    image: '/images/shio/product-bermuda-shorts.jpg',
    price: '$80',
    rating: '3.0/5',
    size: 'Medium',
    color: 'Blue',
  },
  {
    name: 'Faded Skinny Jeans',
    image: '/images/shio/product-faded-jeans.jpg',
    price: '$210',
    rating: '4.5/5',
    size: 'Large',
    color: 'Black',
  },
];

export const detailProduct = {
  name: 'One Life Graphic T-shirt',
  image: '/images/shio/product-gradient-tee-large.jpg',
  price: '$260',
  oldPrice: '$300',
  discount: '-40%',
  rating: '4.5/5',
  description:
    'This graphic T-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
};

export const cartItems = [
  catalogProducts[0],
  catalogProducts[2],
  catalogProducts[1],
];

export const adminProducts = [
  { ...detailProduct, drop: 'Drop Grace', stock: '45 UN.', status: 'available' },
  { ...catalogProducts[2], drop: 'Drop Grace', stock: '0 UN.', status: 'empty' },
  { ...catalogProducts[1], drop: 'Drop Grace', stock: '45 UN.', status: 'available' },
];

export const adminOrders = [
  { id: 'SH-00042', customer: 'Joao Silva', total: '$ 539,80', status: 'Aguardando' },
  { id: 'SH-00043', customer: 'Maria Santos', total: '$ 467,00', status: 'Pago' },
  { id: 'SH-00044', customer: 'Ana Costa', total: '$ 212,00', status: 'Enviado' },
  { id: 'SH-00045', customer: 'Pedro Lima', total: '$ 180,00', status: 'Aguardando' },
];

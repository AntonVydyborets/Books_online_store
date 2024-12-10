import SliderBooks from '../../components/sliderBooks/SliderBooks';

const Home = () => {
  const sale = [
    {
      id: 1,
      title: 'Закохані в життя, одружені на смерті 1',
      cover:
        'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '150',
      stock: true,
    },
    {
      id: 2,
      title: 'Закохані в життя, одружені на смерті 2',
      cover:
        'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '50',
      stock: true,
    },
    {
      id: 3,
      title: 'Закохані в життя, одружені на смерті 3',
      cover:
        'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '280',
      stock: true,
    },
    {
      id: 4,
      title: 'Закохані в життя, одружені на смерті 4',
      cover:
        'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '350',
      stock: true,
    },
    {
      id: 5,
      title: 'Закохані в життя, одружені на смерті 5',
      cover:
        'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '490',
      stock: true,
    },
    {
      id: 6,
      title: 'Закохані в життя, одружені на смерті 6',
      cover:
        'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '140',
      stock: true,
    },
    {
      id: 7,
      title: 'Закохані в життя, одружені на смерті 7',
      cover:
        'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '650',
      stock: true,
    },
  ];
  const newBook = [
    {
      id: 1,
      title: 'За Перекопом є земля 1',
      cover:
        'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '470',
      stock: true,
    },
    {
      id: 2,
      title: 'За Перекопом є земля 2',
      cover:
        'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '400',
      stock: true,
    },
    {
      id: 3,
      title: 'За Перекопом є земля 3',
      cover:
        'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '670',
      stock: true,
    },
    {
      id: 4,
      title: 'За Перекопом є земля 4',
      cover:
        'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '470',
      stock: true,
    },
    {
      id: 5,
      title: 'За Перекопом є земля 5',
      cover:
        'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '370',
      stock: true,
    }
  ];
  return (
    <div>
      <h1>Home</h1>
      <SliderBooks data={sale} title='РОЗПРОДАЖ' />
      <SliderBooks data={newBook} title='НОВИНКИ' />
    </div>
  )
}

export default Home

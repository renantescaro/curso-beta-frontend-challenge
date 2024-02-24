import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsPage = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const productsPerPage = 25;

    useEffect(() => {
        filterProducts(searchTerm);
    }, [searchTerm]);

    const filterProducts = (term) => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Produtos</h1>
            <a className='btn btn-primary' href='/products/new'>
                Cadastrar Novo Produto
            </a>
            <br /><br />

            <input
                type="text"
                placeholder="Buscar produtos..."
                className='form-control'
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Marca</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.brand}</td>
                            <td>
                                <a className='btn btn-primary' href={'/products/' + product.id}>
                                    Editar
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={nextPage} disabled={indexOfLastProduct >= filteredProducts.length}>Próxima</button>
            </div>
        </div >
    );
};

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/products');
    const products = await res.json();

    return {
        props: {
            products,
        },
    };
}

export default ProductsPage;

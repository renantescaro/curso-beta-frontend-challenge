import { useState, useEffect } from 'react';
import Navbar from '../navbar';

const API_URL = process.env.REACT_APP_API_URL;

const ProductsPage = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const productsPerPage = 5;

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

    const handleDelete = async (productId) => {
        const isConfirmed = window.confirm('Tem certeza de que deseja excluir este produto?');
        if (isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/products?id=${productId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Produto excluído com sucesso!');
                } else {
                    alert('Erro ao excluir o produto. Por favor, tente novamente.');
                }
            } catch (error) {
                console.error('Erro ao excluir o produto:', error);
                alert('Erro ao excluir o produto. Por favor, tente novamente.');
            }
        }
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div style={{ padding: "30px" }}>
            <Navbar />

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
                                <a className='btn btn-primary' href={'/products/edit?id=' + product.id}>
                                    Editar
                                </a>
                                <button className='btn btn-danger' onClick={() => handleDelete(product.id)}>
                                    Excluir
                                </button>
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
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();

    return {
        props: {
            products,
        },
    };
}

export default ProductsPage;

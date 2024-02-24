import { useState, useEffect } from 'react';
import Link from 'next/link'
import Navbar from '../navbar';

const API_URL = process.env.REACT_APP_API_URL || 'https://curso-beta-71fca35041cf.herokuapp.com';

const CategoriesPage = ({ categories }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const categoriesPerPage = 5;

    useEffect(() => {
        filterCategories(searchTerm);
    }, [searchTerm]);

    const filterCategories = (term) => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (categoryId) => {
        const isConfirmed = window.confirm('Tem certeza de que deseja excluir este categoria?');
        if (isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/categories?id=${categoryId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Categoria excluída com sucesso!');
                } else {
                    alert('Erro ao excluir a categoria. Por favor, tente novamente.');
                }
            } catch (error) {
                console.error('Erro ao excluir a categoria:', error);
                alert('Erro ao excluir a categoria. Por favor, tente novamente.');
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

            <h1>Categorias</h1>
            <Link className='btn btn-primary' href='/categories/new'>
                Cadastrar Nova Categoria
            </Link>
            <br /><br />

            <input
                type="text"
                placeholder="Buscar categoria..."
                className='form-control'
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentCategories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Link className='btn btn-primary' href={'/categories/edit?id=' + category.id}>
                                    Editar
                                </Link>
                                <button className='btn btn-danger' onClick={() => handleDelete(category.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={nextPage} disabled={indexOfLastCategory >= filteredCategories.length}>Próxima</button>
            </div>
        </div >
    );
};

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/categories`);
    const categories = await res.json();

    return {
        props: {
            categories,
        },
    };
}

export default CategoriesPage;

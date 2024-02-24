import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar';

const API_URL = process.env.REACT_APP_API_URL || 'https://curso-beta-71fca35041cf.herokuapp.com';

const EditCategoryPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/categories/?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    setCategory(data);
                })
                .catch(error => console.error('Erro ao buscar detalhes da categoria:', error));
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategory(prevCategory => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/categories?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category),
            });

            if (response.ok) {
                alert('Categoria atualizada com sucesso!');
                router.push(`/categories`);
            } else {
                alert('Erro ao atualizar a categoria. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao atualizar a categoria:', error);
            alert('Erro ao atualizar a categoria. Por favor, tente novamente.');
        }
    };

    return (
        <div>
            <Navbar />
            <br />

            <div style={{ padding: "20px" }}>
                <h1>Editar Categoria</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3 col-sm-6">
                        <label htmlFor="name">Título:</label>
                        <input type="text" id="name" name="name"
                            className="form-control"
                            value={category.name} onChange={handleChange} required />
                    </div>
                    <div className="row mb-3 col-sm-6">
                        <label htmlFor="description">Descrição:</label>
                        <textarea id="description" name="description"
                            className="form-control"
                            value={category.description} onChange={handleChange} required />
                    </div>
                    <button type="submit" className='btn btn-primary'>
                        Atualizar Categoria
                    </button>
                    <Link className='btn btn-warning' href='/categories'>
                        Cancelar
                    </Link>
                </form>
            </div>

        </div>
    );
};

export default EditCategoryPage;

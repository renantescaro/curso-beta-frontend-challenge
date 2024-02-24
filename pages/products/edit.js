import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar';

const API_URL = process.env.REACT_APP_API_URL;

const EditProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState({
        title: '',
        brand: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/products/?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    setProduct(data);
                })
                .catch(error => console.error('Erro ao buscar detalhes do produto:', error));
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/products?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                router.push(`/products`);
            } else {
                alert('Erro ao atualizar o produto. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            alert('Erro ao atualizar o produto. Por favor, tente novamente.');
        }
    };

    return (
        <div>
            <Navbar />
            <br />

            <div style={{ padding: "20px" }}>
                <h1>Editar Produto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3 col-sm-6">
                        <label htmlFor="title">Título:</label>
                        <input type="text" id="title" name="title"
                            className="form-control"
                            value={product.title} onChange={handleChange} required />
                    </div>
                    <div className="row mb-3 col-sm-6">
                        <label htmlFor="brand">Marca:</label>
                        <input type="text" id="brand" name="brand"
                            className="form-control"
                            value={product.brand} onChange={handleChange} required />
                    </div>
                    <div className="row mb-3 col-sm-6">
                        <label htmlFor="description">Descrição:</label>
                        <textarea id="description" name="description"
                            className="form-control"
                            value={product.description} onChange={handleChange} required />
                    </div>
                    <button type="submit" className='btn btn-primary'>
                        Atualizar Produto
                    </button>
                </form>
            </div>

        </div>
    );
};

export default EditProductPage;

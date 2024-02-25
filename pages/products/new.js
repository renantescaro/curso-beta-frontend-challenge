import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar';

const API_URL = process.env.REACT_APP_API_URL || 'https://curso-beta-71fca35041cf.herokuapp.com';

const NewProductForm = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        description: '',
    });

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.error('Erro ao buscar categorias:', error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCategoryChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const productResponse = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!productResponse.ok) {
                throw new Error('Erro ao cadastrar o produto');
            }

            const productData = await productResponse.json();
            const productId = productData.id;

            const categoryPromises = selectedCategories.map(categoryId =>
                fetch(`${API_URL}/productsCategories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId,
                        categoryId,
                    }),
                })
            );
            const categoryResponses = await Promise.all(categoryPromises);
            const categorySuccess = categoryResponses.every(response => response.ok);
            if (!categorySuccess) {
                throw new Error('Erro ao associar categorias ao produto');
            }

            setFormData({
                title: '',
                brand: '',
                description: '',
            });
            setSelectedCategories([]);
            alert('Produto cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
            alert('Erro ao cadastrar o produto. Por favor, tente novamente.');
        }
    };

    return (
        <div>
            <Navbar />

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div style={{ padding: "20px" }} className="mb-12 col-sm-6">
                        <div className="row mb-12 col-sm-12">
                            <label htmlFor="title">Titulo:</label>
                            <input type="text" id="title" name="title"
                                className="form-control"
                                value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="row mb-12 col-sm-12">
                            <label htmlFor="brand">Marca:</label>
                            <input type="text" id="brand" name="brand"
                                className="form-control"
                                value={formData.brand} onChange={handleChange} required />
                        </div>
                        <div className="row mb-12 col-sm-12">
                            <label htmlFor="description">Descrição:</label>
                            <textarea id="description" name="description"
                                className="form-control"
                                value={formData.description} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Cadastrar Produto
                        </button>
                        <Link className='btn btn-warning' href='/products'>
                            Cancelar
                        </Link>
                    </div>
                    <div className="mb-12 col-sm-6">
                        <label>Selecione as categorias:</label>
                        {categories.map(category => (
                            <div key={category.id}>
                                <input
                                    type="checkbox"
                                    id={category.id}
                                    value={category.id}
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                />
                                <label htmlFor={category.id}>{category.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewProductForm;

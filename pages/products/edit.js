import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar';

const API_URL = process.env.REACT_APP_API_URL || 'https://curso-beta-71fca35041cf.herokuapp.com';

const EditProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState({
        title: '',
        brand: '',
        description: '',
    });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/products/?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    setProduct(data);
                })
                .catch(error => console.error('Erro ao buscar detalhes do produto:', error));

            fetch(`${API_URL}/productsCategories?productId=${id}`)
                .then(response => response.json())
                .then(data => {
                    const selectedIds = data.map(item => item.category_id);
                    setSelectedCategories(selectedIds);
                })
                .catch(error => console.error('Erro ao buscar categorias do produto:', error));
        }

        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.error('Erro ao buscar categorias:', error));
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleCategoryChange = (categoryId) => {
        // remove categoryId if this in selectedCategories
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        }

        // add categoryId in selectedCategories
        else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const productResponse = await fetch(`${API_URL}/products?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...product,
                }),
            });
            if (!productResponse.ok) {
                throw new Error('Erro ao atualizar o produto');
            }

            const categoriesResponse = await fetch(`${API_URL}/productsCategories?productId=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categories: selectedCategories.filter((item, index) => selectedCategories.indexOf(item) === index),
                }),
            });
            if (!categoriesResponse.ok) {
                throw new Error('Erro ao atualizar as categorias do produto');
            }

            alert('Produto atualizado com sucesso!');
            router.push(`/products`);
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
                    <div className="row">
                        <div style={{ padding: "20px" }} className="mb-12 col-sm-6">
                            <div className="row mb-12 col-sm-12">
                                <label htmlFor="title">Título:</label>
                                <input type="text" id="title" name="title"
                                    className="form-control"
                                    value={product.title} onChange={handleChange} required />
                            </div>
                            <div className="row mb-12 col-sm-12">
                                <label htmlFor="brand">Marca:</label>
                                <input type="text" id="brand" name="brand"
                                    className="form-control"
                                    value={product.brand} onChange={handleChange} required />
                            </div>
                            <div className="row mb-12 col-sm-12">
                                <label htmlFor="description">Descrição:</label>
                                <textarea id="description" name="description"
                                    className="form-control"
                                    value={product.description} onChange={handleChange} required />
                            </div>
                            <button type="submit" className='btn btn-primary'>
                                Atualizar Produto
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
        </div>
    );
};

export default EditProductPage;

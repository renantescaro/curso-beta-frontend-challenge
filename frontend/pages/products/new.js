import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewProductForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log(response)
            if (response.ok) {
                setFormData({
                    title: '',
                    brand: '',
                    description: '',
                });
                alert('Produto cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar o produto. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
            alert('Erro ao cadastrar o produto. Por favor, tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ padding: "20px" }}>
                <div className="row mb-3 col-sm-6">
                    <label htmlFor="title">Titulo:</label>
                    <input type="text" id="title" name="title"
                        className="form-control"
                        value={formData.title} onChange={handleChange} required />
                </div>
                <div className="row mb-3 col-sm-6">
                    <label htmlFor="brand">Marca:</label>
                    <input type="text" id="brand" name="brand"
                        className="form-control"
                        value={formData.brand} onChange={handleChange} required />
                </div>
                <div className="row mb-3 col-sm-6">
                    <label htmlFor="description">Descrição:</label>
                    <textarea id="description" name="description"
                        className="form-control"
                        value={formData.description} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">
                    Cadastrar Produto
                </button>
                <a className='btn btn-warning' href='/products'>
                    Cancelar
                </a>
            </div>
        </form >
    );
};

export default NewProductForm;

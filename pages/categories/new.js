import { useState } from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar';

const API_URL = process.env.REACT_APP_API_URL || 'https://curso-beta-71fca35041cf.herokuapp.com';

const NewCategoryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch(`${API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log(response)
            if (response.ok) {
                setFormData({
                    name: '',
                    description: '',
                });
                alert('Categoria cadastrada com sucesso!');
            } else {
                alert('Erro ao cadastrar a categoria. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar a categoria:', error);
            alert('Erro ao cadastrar a categoria. Por favor, tente novamente.');
        }
    };

    return (
        <div>
            <Navbar />

            <form onSubmit={handleSubmit}>
                <div style={{ padding: "20px" }}>
                    <div className="row mb-3 col-sm-6">
                        <label htmlFor="name">Nome:</label>
                        <input type="text" id="name" name="name"
                            className="form-control"
                            value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="row mb-3 col-sm-6">
                        <label htmlFor="description">Descrição:</label>
                        <textarea id="description" name="description"
                            className="form-control"
                            value={formData.description} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Cadastrar categoria
                    </button>
                    <Link className='btn btn-warning' href='/categories'>
                        Cancelar
                    </Link>
                </div>
            </form >
        </div>
    );
};

export default NewCategoryForm;

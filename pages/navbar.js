import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#"
                                    role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Cadastros
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/products">Produtos</Link></li>
                                    <li><Link className="dropdown-item" href="/categories">Categorias</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" async></script>
        </div>
    );
}

export default Navbar;

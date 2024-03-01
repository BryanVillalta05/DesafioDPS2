"use client"
import React from 'react';

const Navbar = ({ vercar }) => {
    return (
        <nav className="navbar">
            <div className="logo">Cafe Himalaya</div>
            <button className="cart-toggle" onClick={vercar}>
                Carrito
            </button>
        </nav>
    );
};

export default Navbar;

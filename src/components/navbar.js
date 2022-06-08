import React from "react";

import NavbarItem from "./navbarItem";

import AuthService from "../app/services/authService";

const deslogar = () => {
    AuthService.removerUsuarioAutenticado();
    refreshPage();
}

const isUsuarioAutenticado = () => {
    return AuthService.isUsuarioAutenticado();
}

const refreshPage = () => {
    window.location.reload(false);
};

function Navbar() {
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                       
                        <NavbarItem render={true} href="#/cadastro-usuarios" label="Cadastre-se" />
                        <NavbarItem render={isUsuarioAutenticado()} href="#/consulta-lancamentos" label="Lançamentos" />
                        <NavbarItem render={isUsuarioAutenticado()} href="#/login" label="Sair" onClick={deslogar} />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
/*
 <NavbarItem render={isUsuarioAutenticado()} href="#/home" label="Home" />
*/
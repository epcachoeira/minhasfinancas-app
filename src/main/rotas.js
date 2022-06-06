import React from "react";

import { Route, Switch, HashRouter } from 'react-router-dom';

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuarios";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

function Rotas() {
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} /> 
            </Switch>
        </HashRouter>
    );
}

export default Rotas;

/*
NOTA: O ponto de interrogação em uma rota indica que o parâmetro é opcional
        <HashRouter>
            <Switch>
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
            </Switch>
        </HashRouter>
*/
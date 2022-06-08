import React from "react";

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuarios";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import AuthService from "../app/services/authService";
//import { AuthConsumer } from '../main/provedorAutenticacao';

//function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
function RotaAutenticada({ component: Component, ...props }) {
    return(
        <Route {...props} render={(componentProps) => {
            if(AuthService.isUsuarioAutenticado()) {
//            if(isUsuarioAutenticado) {
                return(
                    <Component { ...componentProps } />
                )
            } else {
                return(
                    <Redirect to={ { pathname: '/login', state : { from : componentProps.location } } } />
                )
            }
        }} />
    )
}

function Rotas(props) {
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" component={Login} />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <RotaAutenticada path="/home" component={Home} />
                <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} /> 
            </Switch>
        </HashRouter>
    );
}

export default Rotas;
/*
export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)

        }
    </AuthConsumer>
)
*/

/*
NOTA: O ponto de interrogação em uma rota indica que o parâmetro é opcional
        <HashRouter>
            <Switch>
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
            </Switch>
        </HashRouter>
*/
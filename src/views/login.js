import React from "react";

import Card from '../components/card';
import FormGroup from "../components/form-group";
import { createBrowserHistory } from 'history';

import { withRouter } from 'react-router-dom';

import { mensagemErro } from '../components/toastr';

import UsuarioService from "../app/services/usuarioService";
import LocalStorageService from "../app/services/localStorageService";

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    };

    constructor() {
        super();
        this.service = new UsuarioService();
    };

    history = createBrowserHistory();

    // Função REFRESHPAGE introduzida para forçar a recarga da URL. O React parou de fazer isto sozinho
    refreshPage() {
        window.location.reload(false);
    };

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        })
        .then(response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data);
            this.props.history.push('/home');
            this.refreshPage();
        }).catch(erro => {
            mensagemErro(erro.response.data);
        })
    }

    cadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
        this.refreshPage();
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">

                                    <fieldset>
                                        <FormGroup htmlFor="exampleInputEmail1" label="Email: *">
                                            <input type="email" value={this.state.email} 
                                            onChange={e => this.setState({email: e.target.value})}
                                            className="form-control" id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" placeholder="Digite o Email" />
                                        </FormGroup>
                                        
                                        <FormGroup htmlFor="exampleInputPassword1" label="Senha: *">   
                                            <input type="password" className="form-control" 
                                            value={this.state.senha} 
                                            onChange={e => this.setState({senha: e.target.value})}
                                            id="exampleInputPassword1" 
                                            placeholder="Digite sua senha" />
                                        </FormGroup>
                    
                                        <button onClick={() => this.entrar()} type="button" 
                                            className="btn btn-success">Entrar</button>

                                        <button onClick={() => this.cadastrar()} type="button" 
                                            className="btn btn-danger">Cadastre-se</button>
                    
                                    </fieldset>

                                </div>
                            </div>
                        </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter( Login ); 
/*
                                        <button onClick={() => this.cadastrar()} type="button" 
                                            className="btn btn-danger">Cadastrar</button>

    <Link to='cadastro-usuarios'>
                                            <div className="btn btn-danger">Cadastrar</div>
                                        </Link>
*/
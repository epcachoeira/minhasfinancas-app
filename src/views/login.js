import React from "react";

import Card from '../components/card';
import FormGroup from "../components/form-group";

import { withRouter } from 'react-router-dom';

import { mensagemErro } from '../components/toastr';

import UsuarioService from "../app/services/usuarioService";
import ProvedorAutenticacao, { AuthContext } from "../main/provedorAutenticacao";

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    };

    constructor() {
        super();
        this.service = new UsuarioService();
        this.authContext = new ProvedorAutenticacao();
    };

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
            this.authContext.iniciarSessao(response.data);
            this.props.history.push('/home');
//            this.refreshPage();
//            this.forceUpdate();
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
                                        <br/>
                                        <button onClick={() => this.entrar()} type="button" 
                                            className="btn btn-success">
                                            <i className="pi pi-sign-in"></i> Entrar</button>

                                        <button onClick={() => this.cadastrar()} type="button" 
                                            className="btn btn-danger"> 
                                            <i className="pi pi-user-plus"></i> Cadastre-se</button>
                    
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

Login.contextType = AuthContext;

export default withRouter( Login ); 

/*
                                        <button onClick={() => this.cadastrar()} type="button" 
                                            className="btn btn-danger">Cadastrar</button>

    <Link to='cadastro-usuarios'>
                                            <div className="btn btn-danger">Cadastrar</div>
                                        </Link>
*/
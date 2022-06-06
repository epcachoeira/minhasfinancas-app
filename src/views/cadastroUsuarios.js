import React from "react";

import Card from '../components/card';
import FormGroup from "../components/form-group";

import UsuarioService from "../app/services/usuarioService";
import { mensagemErro, mensagemSucesso } from '../components/toastr';

import { withRouter } from 'react-router-dom';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaR: '',
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    // Função REFRESHPAGE introduzida para forçar a recarga da URL. O React parou de fazer isto sozinho
    refreshPage() {
        window.location.reload(false);
    }

    validar() {
        const msgs = [];

        if(!this.state.nome) {
            msgs.push('É obrigatória a informação de um nome');
        }

        if(!this.state.email) {
            msgs.push('É obrigatória a informação de um e-mail');
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('O e-mail informado não é válido');
        }

        if(!this.state.senha || !this.state.senhaR) {
            msgs.push('É obrigatória a informação da senha duas vezes');
        }else if(this.state.senha !== this.state.senhaR) {
            msgs.push('As senhas devem ser iguais');
        }

        return msgs;
    }

    salvar = () => {

        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvarUsuario(usuario)
            .then(response => {
                mensagemSucesso('Usuario cadastrado com sucesso! Faça login para acessar o sistema');
                this.props.history.push('/login');
                this.refreshPage();
            })
            .catch(error => {
                mensagemErro(error.response.data)
            });
    }

    voltar = () => {
        this.props.history.push('/login');
        this.refreshPage();
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Cadastro de Usuário">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">

                                    <fieldset>
                                        <FormGroup htmlFor="inputNome" label="Nome: *">
                                            <input type="text" value={this.state.nome} 
                                            onChange={e => this.setState({nome: e.target.value})}
                                            className="form-control" id="inputNome" name="nome"
                                            placeholder="Informe o seu nome" />
                                        </FormGroup>

                                        <FormGroup htmlFor="inputEmail" label="Email: *">
                                            <input type="email" value={this.state.email} 
                                            onChange={e => this.setState({email: e.target.value})}
                                            className="form-control" id="inputEmail" name="email"
                                            aria-describedby="emailHelp" placeholder="Digite o Email" />
                                        </FormGroup>
                                        
                                        <FormGroup htmlFor="inputPassword1" label="Senha: *">   
                                            <input type="password" className="form-control" 
                                            value={this.state.senha} 
                                            onChange={e => this.setState({senha: e.target.value})}
                                            id="inputPassword1" name="senha"
                                            placeholder="Digite sua senha" />
                                        </FormGroup>
                                        
                                        <FormGroup htmlFor="inputPassword2" label="Repita a Senha: *">   
                                            <input type="password" className="form-control" 
                                            value={this.state.senhaR} 
                                            onChange={e => this.setState({senhaR: e.target.value})}
                                            id="inputPassword2" name="senha"
                                            placeholder="Digite sua senha" />
                                        </FormGroup>
                                        <br/>
                                        <button onClick={() => this.salvar()} type="button" 
                                            className="btn btn-success">Salvar</button>
                                        <button onClick={() => this.voltar()} type="button" 
                                            className="btn btn-danger">Cancelar</button>
                    
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

export default withRouter( CadastroUsuario );
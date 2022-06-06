import React from "react";

import UsuarioService from "../app/services/usuarioService";
import LocalStorageService from "../app/services/localStorageService";

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogadoStr = localStorage.getItem('_usuario_logado');
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        JSON.parse(usuarioLogadoStr);

        this.usuarioService.obterSaldoPorId(usuarioLogado.id)
            .then(response => {this.setState({saldo: response.data})})
            .catch(error => {console.log(error.response)});
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section"></div>
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {Intl.NumberFormat().format( this.state.saldo)}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                        href="#/cadastro-usuarios" 
                        role="button"><i className="fa fa-users"></i>  
                        Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg" 
                        href="#/consulta-lancamentos" 
                        role="button"><i className="fa fa-users"></i>  
                        Lançamentos
                    </a>
                </p>
            </div>
            </div>
            </div>
        )
    }
}

export default Home;
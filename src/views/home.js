import React from "react";

import UsuarioService from "../app/services/usuarioService";
import LocalStorageService from "../app/services/localStorageService";

import { AuthContext } from "../main/provedorAutenticacao";
import AuthService from "../app/services/authService";

class Home extends React.Component{

    state = {
        saldo: 0,
        xref: false
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
        this.authservice = new AuthService();
    }

    componentDidMount() {
/*
        if(AuthService.isUsuarioAutenticado) {
            this.setState({xref : true})
        } else {
            this.setState({xref : false})
        }
*/

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
//        const usuarioLogado = this.context.usuarioLogado;   

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
                                role="button"><i className="pi pi-users">  </i> Cadastrar Usuário </a>
                            <a className="btn btn-danger btn-lg" 
                                href="#/consulta-lancamentos"
                                role="button"><i className="pi pi-money-bill"> .</i> 
                                Lançamentos
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

Home.contextType = AuthContext;   // Usado em componentes de classe

export default Home;

/*
                            <button onClick={() => this.redirecionar("C")} type="button" 
                                    className="btn btn-primary btn-lg">
                                    <i className="pi pi-user-plus"></i> Cadastrar Usuário</button>

                            <button onClick={() => this.redirecionar("L")} type="button" 
                                className="btn btn-danger btn-lg"> 
                                <i className="pi pi-money-bill"></i> Cadastre-se</button>
*/
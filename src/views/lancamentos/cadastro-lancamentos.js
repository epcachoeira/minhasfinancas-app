import React from "react";
import { withRouter } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/services/lancamentoService";
import LocalStorageService from "../../app/services/localStorageService";

class CadastroLancamentos extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        id: null,
        descricao: "",
        mes: '',
        ano: '',
        valor: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    componentDidMount() {
        const params = this.props.match.params;
        if(params.id) {
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState( {...response.data} );
                    this.setState({id: response.data.body.id});
                    this.setState({descricao: response.data.body.descricao});
                    this.setState({mes: response.data.body.mes});
                    this.setState({ano: response.data.body.ano});
                    this.setState({valor: response.data.body.valor});
                    this.setState({tipo: response.data.body.tipo});
                    this.setState({status: response.data.body.status});
                    this.setState({usuario: response.data.body.usuario});
                    this.setState({atualizando: true});
                })
                .catch(error => {
                    mensagemErro(error.response.data);
                })
        }
        
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name] : value });
    }

    validarLancto() {
        const erros = [];

        if(!this.state.descricao) {
            erros.push('?? obrigat??ria a informa????o de uma descri????o');
        }

        if(!this.state.ano) {
            erros.push('?? obrigat??ria a informa????o de um ano');
        } else if(this.state.ano.length !== 4) {
            erros.push('O campo Ano deve ter 4 (quantro) posi????es');
        }

        if(!this.state.mes) {
            erros.push('?? obrigat??ria a informa????o de um m??s');
        }

        if(!this.state.valor) {
            erros.push('?? obrigat??ria a informa????o de um valor');
        } else if (this.state.valor === 0) {
            erros.push('O valor tem de ser maior do que 0 (zero)');
        }

        if(!this.state.tipo) {
            erros.push('?? obrigat??ria a informa????o de um tipo');
        }

        return erros;

    }

    salvar = () => {
        
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const { descricao, mes, ano, valor, tipo } = this.state;

        // Se a propriedade tem o mesmo nome da constante, o comando pode ser otimizado/reduzido
        const lancamento = { descricao, mes, ano, valor, tipo, usuario: usuarioLogado.id };

        const msgs = this.validarLancto();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        this.service.salvar(lancamento)
            .then(response => { 
                mensagemSucesso('Lancamento cadastrado com sucesso!');
//                this.props.history.push('/consulta-lancamentos');
//                window.location.reload(false);
                this.setState({
                    id: null,
                    descricao: "",
                    mes: '',
                    ano: '',
                    valor: '',
                    tipo: '',
                    status: '',
                    usuario: null,
                    atualizando: false
                });
            })
            .catch(error => {
                mensagemErro(error.response.data);
            })
        
    }

    atualizar = () => {
        
        const msgs = this.validarLancto();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const { id, descricao, mes, ano, valor, tipo, status, usuario } = this.state;

        // Se a propriedade tem o mesmo nome da constante, o comando pode ser otimizado/reduzido
        const lancamento = { id, descricao, mes, ano, valor, tipo, status, usuario };

        this.service.atualizar(lancamento)
            .then(response => { 
                mensagemSucesso('Lancamento autalizado com sucesso!');
//                this.props.history.push('/consulta-lancamentos');
//                window.location.reload(false);
                this.setState({
                    id: null,
                    descricao: "",
                    mes: '',
                    ano: '',
                    valor: '',
                    tipo: '',
                    status: '',
                    usuario: null,
                    atualizando: false
                });
            })
            .catch(error => {
                mensagemErro(error.response.data);
            })
    }

    cancelar = () => {
        this.props.history.push('/consulta-lancamentos');
        window.location.reload(false);
    }

    render() {
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        return(
            <Card title= {this.state.atualizando ? "Atualiza????o de Lan??amento" : "Cadastro de Lan??amento"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inoutDesc" label="Descri????o: *">
                            <input type="text" className="form-control" id="inoutDesc" 
                                    value={this.state.descricao} 
                                    name='descricao'
                                    onChange={this.handleChange}
                                    placeholder="Obrigat??rio informar a descri????o" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text" value={this.state.ano} 
                                    onChange={this.handleChange}
                                    name="ano"
                                    className="form-control" id="inputAno"
                                    placeholder="Obrigat??rio informar o Ano" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="M??s: *">
                            <SelectMenu className="form-control" lista={meses} id="inputMes" 
                                        value={this.state.mes}
                                        name="mes"
                                        onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input type="text" value={this.state.valor} 
                                    name="valor"
                                    onChange={this.handleChange}
                                    className="form-control" id="inputValor"
                                    placeholder="Obrigat??rio informar o Valor" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: ">
                        <SelectMenu className="form-control" lista={tipos} id="inputTipo" 
                                    value={this.state.tipo} 
                                    name="tipo"
                                    onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Situa??????o: ">
                            <input type="text" value={this.state.status} 
                                    disabled
                                    className="form-control" id="inputStatus"
                                    placeholder="Situa????o do lan??amento" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    {this.state.atualizando ? 
                        (   <button type="button" className="btn btn-success" 
                            onClick={this.atualizar}><i className="pi pi-refresh"></i>  Atualizar</button>
                        ) : (
                            <button type="button" className="btn btn-success" 
                            onClick={this.salvar}><i className="pi pi-save"></i>  Salvar</button> )
                    }
                    <button type="button" className="btn btn-danger" 
                            onClick={this.cancelar}><i className="pi pi-times"></i>  Cancelar/Sair</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter( CadastroLancamentos );
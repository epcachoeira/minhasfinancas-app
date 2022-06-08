import React from "react";

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LocalStorageService from "../../app/services/localStorageService";
import AuthService from "../../app/services/authService";

import LancamentoService from "../../app/services/lancamentoService";

import { withRouter } from 'react-router-dom';

import { mensagemErro, mensagemSucesso, mensagemAlerta } from '../../components/toastr';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        lancDeletar: {},
        showConfirmDialog: false
    };

    cadastrar = () => {
        this.props.history.push('/cadastro-lancamentos');
        window.location.reload(false);
    }

    buscar = () => {

        if(!this.state.ano) {
            mensagemErro('O preenchimento do campo Ano é obrigatório');
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
            .then(response => {
                if(response.data.length < 1) {
                    mensagemAlerta('Nenhum registro foi recuperado para os parâmetros de pesquisa')
                }
                this.setState({lancamentos: response.data})})
            .catch(error => {console.log(error.response)});
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`);
        window.location.reload(false);
    }

    abrirConfirmação = (lancamento) => {
        this.setState({showConfirmDialog: true, lancDeletar: lancamento});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancDeletar: {} });
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamento);
                mensagemSucesso('Status atualizado com sucesso');
                if(index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamentos});
                } else {
                    this.buscar();
                }
            })
            .catch(error => {
                mensagemErro('Ocorreu um erro ao atualizar o status');
            })
    }

    deletar = () => {
        this.service.deletar(this.state.lancDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancDeletar);
                lancamentos.splice(index, 1);
                this.setState(lancamentos);
                this.setState({showConfirmDialog: false, lancDeletar: {} });
                mensagemSucesso('Lançamento deletado com sucesso!');
            })
            .catch(error => {
                mensagemErro('Ocorreu um erro ao tentar deletar o lançamento');
            })
    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return(
            <div className=" ">
                <div className="col-md-10" style={ {position: 'relative', left: '100px'}}>
                    <Card title="Consulta Lançamentos">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="bs-component">
                                <form>
                                    <fieldset>
                                        <FormGroup htmlFor="inputAno" label="Ano: *">
                                            <input type="ano" value={this.state.ano} 
                                                   onChange={e => this.setState({ano: e.target.value})}
                                                   className="form-control" id="inputAno"
                                                   placeholder="Digite o Ano" />
                                        </FormGroup>

                                        <FormGroup htmlFor="inputMes" label="Mês: ">
                                            <SelectMenu className="form-control" lista={meses} id="inputMes" 
                                            value={this.state.mes} 
                                            onChange={e => this.setState({mes: e.target.value})} />
                                        </FormGroup>

                                        <FormGroup htmlFor="inputDescr" label="Descrição: ">
                                            <input type="descricao" value={this.state.descricao} 
                                                   onChange={e => this.setState({descricao: e.target.value})}
                                                   className="form-control" id="inputDescr" 
                                                   placeholder="Digite uma descrição" />
                                        </FormGroup>

                                        <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                                            <SelectMenu className="form-control" lista={tipos} id="inputTipo" 
                                            value={this.state.tipo} 
                                            onChange={e => this.setState({tipo: e.target.value})} />
                                        </FormGroup>
                                        
                                        <button type="button" onClick={this.buscar} 
                                                className="btn btn-success">
                                                <i className="pi pi-search"></i> Buscar</button>
                                        <button type="button" onClick={this.cadastrar} 
                                                className="btn btn-danger">
                                                <i className="pi pi-plus"></i> Cadastrar</button>
                                    </fieldset>
                                </form>
                                </div>
                            </div>
                        </div>
                        </div>
                    </Card>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <LancamentosTable lancamentos={this.state.lancamentos}
                                                      deleteAction={this.abrirConfirmação} 
                                                      editAction={this.editar} 
                                                      statusAction={this.alterarStatus}/>
                                </div>
                            </div>
                        </div>
                        <div>
                        <Dialog header="Confirmação de Ação" visible={this.state.showConfirmDialog} 
                                style={{ width: '50vw' }} 
                                modal={true} footer={confirmDialogFooter}
                                onHide={() => this.setState({showConfirmDialog: false})}>
                            <p>Você confirma a exclusão deste lançamento?</p>
                        </Dialog>
                        </div>
                    <br/>

                </div>
            </div>

        )
    }

}

export default withRouter( ConsultaLancamentos );
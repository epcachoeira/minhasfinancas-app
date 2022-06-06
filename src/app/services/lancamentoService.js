import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

export default class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos')
    }

    obterListaMeses() {
        return [
            {label: 'Selecione o Mês...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12},
        ]

    }

    obterListaTipos() {
        return [
            {label: 'Selecione o Tipo de Lançamento...', value: ''},
            {label: 'Receita', value: 'RECEITA'},
            {label: 'Despesa', value: 'DESPESA'}
        ]
    }

    obterPorId(id) {
        return this.get(`/${id}`);
    }

    salvar(lancamento) {
        return this.post('/', lancamento);
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }

    alterarStatus(id, status) {
        return this.put(`/${id}/atualliza-status`, {status});
    }

    validarLancto(lancamento) {
        const erros = [];

        if(!this.state.descrição) {
            erros.push('É obrigatória a informação de uma descrição');
        }

        if(!this.state.ano) {
            erros.push('É obrigatória a informação de um ano');
        } else if(this.state.ano.length !== 4) {
            erros.push('O campo Ano deve ter 4 (quantro) posições');
        }

        if(!this.state.mes) {
            erros.push('É obrigatória a informação de um mês');
        }

        if(!this.state.valor) {
            erros.push('É obrigatória a informação de um valor');
        } else if (this.state.valor === 0) {
            erros.push('O valor tem de ser maior do que 0 (zero)');
        }

        if(!this.state.tipo) {
            erros.push('É obrigatória a informação de um tipo');
        }

        if(erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
        
    }

    consultar(lancamentoFiltro) {
        let params = `?ano=${lancamentoFiltro.ano}`;

        if(lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`;
        }

        if(lancamentoFiltro.tipo) {
            params = `${params}&tipo=${lancamentoFiltro.tipo}`;
        }
        
        if(lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`;
        }

        if(lancamentoFiltro.status) {
            params = `${params}&status=${lancamentoFiltro.status}`;
        }

        if(lancamentoFiltro.usuario) {
            params = `${params}&usuario=${lancamentoFiltro.usuario}`;
        }

        return this.get(params);
    }

    deletar(id) {
        return this.delete(`/${id}`);
    }
}
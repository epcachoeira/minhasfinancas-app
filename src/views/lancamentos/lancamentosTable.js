import React from "react";

export default props => {

    const rows = props.lancamentos.map( lancamento => {
        return(

            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>R$ {Intl.NumberFormat().format(lancamento.valor)}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" className="btn btn-success" title="Efetivar"
                        disabled={ lancamento.status !== 'PENDENTE' }
                        onClick={e => props.statusAction(lancamento, 'EFETIVADO')}>
                        <i className="pi pi-check"></i>
                    </button>
                    <button type="button" className="btn btn-warning"  title="Cancelar"
                        disabled={ lancamento.status !== 'PENDENTE' }
                        onClick={e => props.statusAction(lancamento, 'CANCELADO')}>
                        <i className="pi pi-times"></i>
                    </button>
                    <button type="button" className="btn btn-primary" title="Editar Lançamento"
                        onClick={e => props.editAction(lancamento.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" className="btn btn-danger"  title="Excluir Lançamento"
                        onClick={e => props.deleteAction(lancamento)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
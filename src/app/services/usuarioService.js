import ApiService from "../apiservice";

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorId(id) {
        return this.get(`/${id}/saldo`);
    }

    salvarUsuario(usuario) {
        return this.post('/', usuario);
    }
}

export default UsuarioService;
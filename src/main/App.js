import React from 'react';
import 'toastr/build/toastr.min.js';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';

import Rotas from './rotas';
import Navbar from '../components/navbar';
import ProvedorAutenticacao from './provedorAutenticacao';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

class App extends React.Component {

  render(){
    return(
      <ProvedorAutenticacao>
        <Navbar />
        <div className='container'>
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;

/*
class App extends React.Component {

  state = {
    nome : '',
    numero1: 0,
    numero2: 0,
    resultado: 0
  }

  somar = () => {
    const result = parseInt(this.state.numero1) + parseInt(this.state.numero2);
    this.setState({resultado: result});
    console.log(result);
  }

  render(){
    return(
      <div>
        <label>Nome: </label>
        <input type="text" value = {this.state.nome} onChange={(e) => this.setState({nome : e.target.value})} />
        <h1>Olá Mundo!!</h1>
        <h2>O nome digitado foi {this.state.nome}</h2>
        <label>Primeiro número: </label>
        <input type="text" value = {this.state.numero1} onChange={(e) => this.setState({numero1 : e.target.value})} /> <br/>
        <label>Segundo número: </label>
        <input type="text" value = {this.state.numero2} onChange={(e) => this.setState({numero2 : e.target.value})} /> <br/>
        <button onClick={this.somar}>
        Somar</button> <br/>
        O resultado é {this.state.resultado}
      </div>
    )
  }
}

export default App;

function App() {
  return (
    <div className="App">
      <h1>
      Hello World!!!
      </h1>
    </div>
  );
}

export default App;
*/

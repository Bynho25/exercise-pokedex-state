import React from 'react';
import pokemons from './data';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemon: 0,
      selectedType: null,
    };
  }

  /* Função que passa de Pokemon em Pokemon e verifica que quando chega no último pokemon
     seta o estado da quantidade novamente com 0 para reiniciar a lista */
  nextPokemon(list) {
    const { selectedPokemon } = this.state;
    if(selectedPokemon < list.length - 1){
      this.setState(prevState => ({
        selectedPokemon: prevState.selectedPokemon + 1,
      }));
    } else {
      this.setState({
        selectedPokemon: 0,
      });
    }
    
  }

  /* Função que retira os botões dos tipos repetidos que foram criados pelo map */
  listOfTypes() {
    return pokemons.map((pokemon) => pokemon.type)
      .filter((type, index, self) => {
        return self.indexOf(type) === index
      })
  }

  /* Função que muda o estado dos pokemons selecionados a partir do typo passado */
  filterTypes(type) {
    this.setState({
      selectedPokemon: 0,
      selectedType: type,
    });
  }

  listOfPokemons() {
    const { selectedType } = this.state;
    const filteredPokemons = pokemons.filter(pokemon => {
      return selectedType ? selectedType === pokemon.type : true;
    });
    return filteredPokemons;
  }

  render() {
    const { selectedPokemon } = this.state;
    const types = this.listOfTypes();
    const list = this.listOfPokemons();
    return (
      <div className="pokedex">
        <Pokemon pokemon={list[selectedPokemon]} />
        <button
          onClick={() => this.nextPokemon(list)}
          disabled={list.length === 1}
        >
            Next Pokemon
        </button>
        {types.map((type, index) =>
          <button
            key={index}
            onClick={() => this.filterTypes(type)}>
              {type}
          </button>)}
          <button onClick={() => this.filterTypes(null)}>All Pokemons</button>
      </div>
    );
  }
}

export default Pokedex;

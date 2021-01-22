
class Api {
  static data = null
  static baseUrl = `https://pokeapi.co/api/v2/pokemon/`
  static fetchData = async () => {
    const response = await fetch(Api.baseUrl)
    const parseResponse = await response.json()
    Api.data = parseResponse;
    
  }
 static timerData = ()=>{
    Api.fetchData().then(setTimeout(() => {
        alert('Llamada api realizada con exito')
        let listo = document.querySelector('#listo')
        listo.textContent = `Ahora puedes usar los metodos`
         },2000))
}
  
}

class PokemonFunctions {
  constructor() {
    this.div_pokemon = document.querySelector("#pokemon");
    this.div_url = document.querySelector("#url");
    this.div_matchend = document.querySelector("#matchend")
    this.div_matchstart = document.querySelector("#matchstart")
    this.div_findpokemon = document.querySelector('#findpokemon')
    this.div_findurl = document.querySelector('#findurl')
    this.div_reduce = document.querySelector('#reduce')
    this.div_localstore = document.querySelector('#localstore')
  
  }

  
  // Muestra por html el listado de pokemones 
  listadoPokemons() {
    const { results } = Api.data
    results.map((names) => {
      const nombre = document.createElement('li');
      nombre.innerHTML = names.name
      this.div_pokemon.appendChild(nombre);
    })
  }
  // Muestra por html el listado de url de cada pokemon
  listadoUrl() {
    const { results } = Api.data
    results.map((names) => {
      let url = document.createElement('li');
      url.innerHTML = names.url
      this.div_url.appendChild(url);
    })
  }

  // filtra pokemones terminados en 
  filterPokemonesEnd = (pokemonend) => {
    localStorage.setItem(pokemonend,pokemonend);
    const { results } = Api.data
    const result = results.filter(pokemon => pokemon.name.endsWith(pokemonend));
    if (pokemonend.length >=1){
    result.map((match) => {
      let find = document.createElement('li');
      find.innerHTML = match.name;
      this.div_matchend.appendChild(find);
    })}else{
      this.div_matchend.textContent = `Ingresa un string`
    }
  }
  // Filtra pokemones que empiecen con un caracter o string
  filterPokemonesStart = (pokemonstart) => {
    
    localStorage.setItem(pokemonstart,pokemonstart);
    const { results } = Api.data
    const result = results.filter(pokemon => pokemon.name.startsWith(pokemonstart));
    if (pokemonstart.length >=1){
    result.map((match) => {
      let find = document.createElement('li');
      find.innerHTML = match.name;
      this.div_matchstart.appendChild(find);
    })}else{
       this.div_matchstart.textContent = `Ingresa un string`
     }
    
  }

  // Encuentra un pokemon en especifico

  findPokemon = (name) => {
    const { results } = Api.data
    this.div_localstore.textContent= localStorage.setItem(name,name);
    const found = results.find(pokemon => pokemon.name === name)
    if (found) {
      const { name } = found;
      this.div_findpokemon.textContent = `El pokemón ${name} sí esta en la lista`;
    } else {
      this.div_findpokemon.textContent = `El nombre ${name} ingresado no existe en esta lista`;
    }
  }
 reducePokemon(pokemon){
  localStorage.setItem(pokemon,pokemon);
    const { results}= Api.data;
const found = results.reduce((acc,el) =>({
...acc,
[el.name]:el

}),{})
if (found[pokemon] != undefined) {
  this.div_reduce.textContent = `El pokemón ${JSON.stringify(found[pokemon].name)} sí esta en la lista`;
} else {
  this.div_reduce.textContent = `El nombre ${pokemon} no existe en esta lista`;
}
}
  // Encuentra un url en especifico

  findUrl = (url) => {
    localStorage.setItem(url,url);
    const { results } = Api.data
    const found = results.find(pokemon => pokemon.url === url)
    console.log(found)
    if (found) {
      const { url } = found;
      let find = document.createElement('li');
      find.innerHTML = `El url ${url} sí esta en la lista`;;
      this.div_findurl.appendChild(find);
    } else {
      let not_found = document.createElement('li');
      not_found.innerHTML = `El url ${url} ingresado no existe en esta lista`;
      this.div_findurl.appendChild(not_found);
    }
  }
}
const instancia = new PokemonFunctions();

//Api de 150 pokemones
class NewApi {
constructor(){
this.image = document.querySelector("#pokemon_image");
this.name = document.querySelector("#pokemon_nombre");
this.abilities1 = document.querySelector("#abilities1")
this.abilities2 = document.querySelector("#abilities2")
this.types = document.querySelector("#type")
this.div3 =document.querySelector('#parte3')
this.error =document.querySelector('#error')
}
fetchDataId = async (id) =>{

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await response.json();
  return data
}
findId = async (id)=>{
  if (id>151 || id<=0 ){
this.error.textContent = `Ingresa un numero entre 1 y 150`
 throw Error('Ingresa un numero entre 1 y 150')
  }else{
    const foundPokemon = await this.fetchDataId(id)
    const {name,sprites,abilities,types} = foundPokemon
    this.name.textContent =name ;
    this.div3 = document.getElementById('root');
        this.abilities1.textContent = abilities[0].ability.name 
      this.abilities2.textContent = abilities[1].ability.name
      this.types.textContent = types[0].type.name
    this.image.setAttribute('src',sprites.front_default)
  }

}

    
    
}
const newapi = new NewApi();
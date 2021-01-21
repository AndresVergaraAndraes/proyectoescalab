
class Api{
  static data = null
  static baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
 static fetchData = async () =>{
   const response = await fetch(Api.baseUrl)
   const parseResponse = await response.json()
   Api.data = parseResponse;
 }
}

class PokemonFunctions{
constructor(){
  this.div_pokemon = document.querySelector("#pokemon");
  this.div_url = document.querySelector("#url");
  this.div_matchend = document.querySelector("#matchend")
  this.div_matchstart = document.querySelector("#matchstart")
  this.div_findpokemon = document.querySelector('#findpokemon')
  this.div_findurl = document.querySelector('#findurl')

}
  // Muestra por html el listado de pokemones 
  listadoPokemons(){
  
    const {results} = Api.data
    results.map((names)=>{
  
        const nombre = document.createElement('h4');
        nombre.innerHTML = names.name
        this.div_pokemon.appendChild(nombre);
       
    })
    
}
// Muestra por html el listado de url de cada pokemon
listadoUrl(){
  const {results} = Api.data
    results.map((names)=>{
        let url = document.createElement('h4');
        url.innerHTML = names.url
        this.div_url.appendChild(url);

    })
}

// filtra pokemones terminados en 
filterPokemonesEnd = (pokemonend) => {
  
  const {results} = Api.data
 
  const result = results.filter(pokemon => pokemon.name.endsWith(pokemonend));
console.log(result)
 return  result.map(  (match,i)  =>{
  let find = document.createElement('h3');

  find.innerHTML = match.name ;
    
    this.div_matchend.appendChild(find);
      })

}
// Filtra pokemones que empiecen con un caracter o string
filterPokemonesStart = (pokemonstart) => {
  
  const {results} = Api.data
 
  const result = results.filter(pokemon => pokemon.name.startsWith(pokemonstart));
console.log(result)
 return  result.map(  (match)  =>{
  let find = document.createElement('h3');

  find.innerHTML = match.name ;
    this.div_matchstart.appendChild(find);
      })

}

// Encuentra un pokemon en especifico

findPokemon = (name) => {
  
  const {results} = Api.data
       const found = results.find(pokemon => pokemon.name === name)
       
       if(found){
         const {name}= found;
         let find = document.createElement('h3');
find.innerHTML =`El pokemón ${name} sí esta en la lista` ;
    this.div_findpokemon.appendChild(find);
       }else {
        let not_found = document.createElement('h3');
not_found.innerHTML = `El nombre ${name} ingresado no existe en esta lista` ;
this.div_findpokemon.appendChild(not_found);
       }
          
   
 }
 // Encuentra un url en especifico

 findUrl = (url) => {
  
  const {results} = Api.data
       const found = results.find(pokemon => pokemon.url === url)
       console.log(found)
       if(found){
         const {url}= found;
         let find = document.createElement('h3');
find.innerHTML = `El url ${url} sí esta en la lista` ; ;
    this.div_findurl.appendChild(find);
       }else {
        let not_found = document.createElement('h3');
not_found.innerHTML = `El url ${url} ingresado no existe en esta lista` ;
this.div_findurl.appendChild(not_found);
       }
          
   
 }


}

const instancia = new PokemonFunctions();

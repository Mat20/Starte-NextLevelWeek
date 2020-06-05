function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {
      for( const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`     
      }
  })
}

populateUFs()

function getCities(event) {
   const citySelect =  document.querySelector("[name=city]")
   const stateInput =  document.querySelector("[name=state]")

   const  ufValue = event.target.value
   
   const indexOfSelectedState = event.target.selectedIndex
   stateInput.value = event.target.options[indexOfSelectedState].text
    
   const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/mesorregioes`

   citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
   citySelect.disabled  = true


   fetch(url)
  .then( res => res.json() )
  .then( cities => {
      for( const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`     
      }

      citySelect.disabled = false
  })

}

document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)


        // Items de coleta
        // pega todos os lis

        const itemsToCollect = document.querySelectorAll(".items-grid li")

        for (const item of itemsToCollect) {
               item.addEventListener("click", handleSelectedItem)
        }

           // atualizar o campo escodindo com os items selecionados
           const collectedItems = document.querySelector("input[name=items")

        let selectedItems = []

        function handleSelectedItem(event) {
          const itemLi = event.target
              
          // add e remove de um class com js
          itemLi.classList.toggle("selected")

          const itemId = itemLi.dataset.id
        

          //verificar items selecionados
          //se sim pega os items selecionados

          const alreadySelected = selectedItems.findIndex( item => {
                 const itemFound = item == itemID // true or false
                 return itemFound 
          }) 

          //se ja estiver selecionado tira da selecao
          if ( alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item => {
              const itemIsDifferent = item != itemId // false    
              return itemIsDifferent
            })

            selectedItems = filteredItems
          } else {
              //se nao estver selecionado , add a selecao
              // adicionar a selecao 
              selectedItems.push(itemId)
          }
          
          collectedItems.value = selectedItems

        }
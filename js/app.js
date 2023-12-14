const foundFruits = document.querySelector('.found-fruits')
const notFound = document.querySelector('.not-found')
const article = document.querySelector('article')
notFound.style.display = "none"

//SEARCH
document.querySelector('.header-search').addEventListener("input", (e)=>{
    e.preventDefault();
    foundFruits.innerHTML = ""
    find_by_name()
})

document.querySelector('.header-search').addEventListener("submit", (e)=>{
    e.preventDefault();
    document.querySelector('input').value = ""
    foundFruits.innerHTML = "" 
    find_all()
})

//FIND BY NAME
const find_by_name = ()=>{
    let searchQuery = document.querySelector('input').value
    fetch(`https://www.fruityvice.com/api/fruit/${searchQuery}`)
    .then((response)=>data=response.json())
    .then((data)=>{
        console.log(data)
        notFound.style.display = "none"
        if (searchQuery == 'all'){
            get_fruits(data)
        }
        else if (!data.error){
            create_article(data)
            foundFruits.className = "found-fruits row row-cols-1 row-cols-lg-1 g-3 g-lg-3"
        }
        else{
            notFound.style.display = "block"
        }
    })
}

// #FIND ALL
const find_all = ()=>{
    fetch(`https://www.fruityvice.com/api/fruit/all`)
    .then((response)=>data=response.json())
    .then((data)=>{
        if (!data.error){
            get_fruits(data)
        }
    })
}

const get_fruits = (fruits)=>{
    if (fruits != null){
        foundFruits.className = "found-fruits row row-cols-1 row-cols-lg-3 g-3 g-lg-3"
        for (let fruit of fruits){
            create_article(fruit)
        }
    }
}

const create_article = (fruit)=>{
    const article = document.createElement('article')
    article.className = "col"
    article.innerHTML = `
    <div class="fruit p-3">
        <div class="container">
            <h3 class="fruit-name">${fruit.name}</h3>
            <p class="fruit-family">family: ${fruit.family}</p>
            <ul class="nutritions row row-cols-5 g-2">
                <li class="col">Calories <br><span>${fruit.nutritions.calories}g</span></li>
                <li class="col">Fat <br><span>${fruit.nutritions.fat}g</span></li>
                <li class="col">Sugar <br><span>${fruit.nutritions.sugar}g</span></li>
                <li class="col">Carbs <br><span>${fruit.nutritions.carbohydrates}g</span></li>
                <li class="col">Protein <br><span>${fruit.nutritions.protein}g</span></li>
            </ul>
        </div>
    </div>
    `
    foundFruits.appendChild(article)
}
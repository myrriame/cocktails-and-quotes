

var button = document.getElementById('button-addon2')
var firstDiv = document.getElementById('box1')
var drinkbox = document.getElementById('drinkContainer')

alert('We do not support underage drinking, excessive drinking, binge drinking or any other unsafe drinking behavior. Always drink responsibly. Also DO NOT drink and drive. Enjoy!')


button.addEventListener("click", function (event) {

    event.preventDefault();

    var drinkName = document.getElementById("search").value;
    console.log(drinkName);

    var replaced = drinkName.split(' ').join('+');
    // console.log(replaced);

    var addDrink = (data) => {
        var drinkVariations = data.drinks.length
        console.log(data)


        for (let i = 0; i < drinkVariations; i++) {

            var drinkCardDiv = document.createElement('div')

            drinkCardDiv.className = 'drinkcard col-sm'

            var photo = document.createElement('img')
            photo.className = 'responsive';
            photo.src = data.drinks[i].strDrinkThumb
            drinkCardDiv.appendChild(photo)

            var drinkName = document.createElement('h5')
            drinkName.className = 'responsive';
            drinkName.innerHTML = data.drinks[i].strDrink
            drinkCardDiv.appendChild(drinkName)

            for (let j = 0; j < 16; j++) {
                let measure = '';
                if (data.drinks[i]['strMeasure' + j]) {
                    measure = (data.drinks[i]['strMeasure' + j])
                }
                if ((data.drinks[i]['strIngredient' + j])) {
                    var ingredients = document.createElement('p')
                    ingredients.innerHTML = `${measure} ${data.drinks[i][`strIngredient${j}`]}`
                    ingredients.className = 'responsive'
                    drinkCardDiv.appendChild(ingredients)
                }
            }

            drinkbox.appendChild(drinkCardDiv)
        }
    }


    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + replaced)

        // .then(reply => console.log(reply)) used to check status
        .then(reply => reply.json())
        // .then(data => console.log(data)) to get url info
        .then(data => addDrink(data))
        // unable to get .catch to work
        // .then(stuff => fetch('http://api.giphy.com/v1/gifs/search'))
        .catch(err => console.log('no drink found'))
});



cardbutton = document.getElementById('quotecard')

cardbutton.addEventListener("click", function (event) {

    event.preventDefault();


    var addQuote = (data) => {
        var pQuote = document.getElementById('quote')
        console.log(data)
        pQuote.innerHTML = data[0]

    }


    fetch("http://ron-swanson-quotes.herokuapp.com/v2/quotes")

        // .then(reply => console.log(reply)) used to check status
        .then(reply => reply.json())
        // .then(data => console.log(data)) to get url info
        .then(data => addQuote(data))
        // unable to get .catch to work
        .catch(err => console.log('very libertarian'))
});


function rotateFunction() {
    var min = 1024;
    var max = 9999;
    var deg = Math.floor(Math.random() * (max - min)) + min;
    document.getElementById('box').style.transform = "rotate(" + deg + "deg)";

    var element = document.getElementById('mainbox');
    element.classList.remove('animate');
    setTimeout(function () {
        element.classList.add('animate');
    }, 5000);

}




var button = document.getElementById('button-addon2')
var firstDiv = document.getElementById('box1')
var drinkbox = document.getElementById('drinkContainer')

alert('We do not support underage drinking, excessive drinking, binge drinking or any other unsafe drinking behavior. Always drink responsibly. Also DO NOT drink and drive. Enjoy!')

// collapsible instructions

var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {

    coll[i].addEventListener("click", function () {

        this.classList.toggle("active");
        var content = this.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

var errorclose = document.getElementById('errorclose')

// how to close error message that comes up when incorrect drink is typed in

errorclose.addEventListener('click', function (event) {

    event.preventDefault();

    document.getElementById('error').style.visibility = 'hidden';
})

// drink search button, places all the drinks with that name on the page

button.addEventListener("click", function (event) {

    event.preventDefault();

    while (drinkContainer.firstChild) {

        drinkContainer.removeChild(drinkContainer.firstChild)
    }

    var drinkName = document.getElementById("search").value;
    console.log(drinkName);

    var replaced = drinkName.split(' ').join('+');

    // function that's called in the 2nd .then that adds the drink content to the page

    var addDrink = (data) => {
        var drinkVariations = data.drinks.length
        console.log(data)


        for (let i = 0; i < drinkVariations; i++) {

            var drinkCardDiv = document.createElement('div')

            drinkCardDiv.className = 'drinkcard'

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

        .catch(err => {
            console.log('no drink found')
            document.getElementById('error').style.visibility = 'visible';
        })
});

// this part is when the user clicks on card to get a new quote

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

        .catch(err => console.log('failed to generate quote'))
});

// function that makes the wheel spin

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


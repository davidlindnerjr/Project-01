//---------------------------------- CURRENT DATE --------------------------------------------------//
document.addEventListener('DOMContentLoaded', currentDate);

function currentDate(){
    //current day
    let today = new Date();
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    $('#current-date').append(' '+date);
    $('#day-one').html((today.getMonth()+1)+'/'+(today.getDate()+1)+'/'+today.getFullYear());
    $('#day-two').html((today.getMonth()+1)+'/'+(today.getDate()+2)+'/'+today.getFullYear());
    $('#day-three').html((today.getMonth()+1)+'/'+(today.getDate()+3)+'/'+today.getFullYear());
    $('#day-four').html((today.getMonth()+1)+'/'+(today.getDate()+4)+'/'+today.getFullYear());
    $('#day-five').html((today.getMonth()+1)+'/'+(today.getDate()+5)+'/'+today.getFullYear());
}

//---------------------------------- FOOD DIARY ---------------------------------------------------//
const nutritionKey = "8b489e46941fc44c6f10c9bd16bbee51";
const appId = "0c03ca25";
const foodSearchOutput = $('#food-search-output');
let calTotal = 0;

//FOOD CONSTRUCTOR
class Food{
    constructor(key,food){
        this.key = key;
        this.food = food;
    }
}
//UI CLASS
class UI{
    static displayFoods(){
        const foods = Store.getFoods();
        foods.forEach((food) => UI.addFoodToList(food));
    }
    static addFoodToList(food){
        const list = $('#food-list');
        const row = $('<tr>');

        row.html(`<td>${food.food}</td><td><a href="#" class="btn btn-danger btn-sm delete" style="margin-left:10px;">X</a></td>`);
        list.append(row);
    }
    static deleteFood(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}
//STORE FOOD
class Store{
    static getFoods(){
        let foods;
        if(localStorage.getItem('foods') === null){
            foods = [];
        }
        else{
            foods = JSON.parse(localStorage.getItem('foods'));
        }
        return foods;
    }
    static addFood(food){
        const foods = Store.getFoods();
        foods.push(food);
        localStorage.setItem('foods', JSON.stringify(foods));
    }
    static removeFood(test){
        const foods = Store.getFoods();
        foods.forEach((food, index)=>{
            if(food.food === test){
                foods.splice(index,1);
            }
        });
        localStorage.setItem('foods',JSON.stringify(foods));
    }
}
//EVENT: REMOVE FOOD
$('#food-list').click(function(e){
    UI.deleteFood(e.target);
    Store.removeFood(e.target.parentElement.previousElementSibling.textContent);
});
//EVENT: DISPLAY FOODS
document.addEventListener('DOMContentLoaded', UI.displayFoods);

document.addEventListener('DOMContentLoaded', function(){
//EVENT: GENERATE SEARCHED FOODS AND ADD TO LIST    
$('#food-search-button').on('click',function(e){
    e.preventDefault();
    let search = $('#food-search').val();
    let url = `https://api.nutritionix.com/v1_1/search/${search}?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=${appId}&appKey=${nutritionKey}`;
    $.ajax({
        method:'GET',
        url: url,
        dataType:'json'
    }).done(function(data){
        foodSearchOutput.html('');
        for(let i = 0; i < data.hits.length; i++){
            console.log(data.hits[i].fields.item_name);
            let newDiv = $('<tr>');
            let btn = $('<a>')
            btn.attr('class', 'btn');
            newDiv.append(btn);
            newDiv.attr('class', 'food row');
            foodSearchOutput.append(newDiv);
            newDiv.html(' - '+data.hits[i].fields.item_name+' ('+data.hits[i].fields.brand_name +') - '+Math.round(data.hits[i].fields.nf_calories)+' cal'+'<button class="btn add-food"><i class="fas fa-plus"></i></button>');
        }
      //ADD FOOD
        $('.add-food').off().on('click',function(){
            let writeFood = $(this).parent().text();
            const food = new Food(writeFood, writeFood);
            UI.addFoodToList(food);
            Store.addFood(food);
            let test = writeFood.substr(writeFood.length-7);
            let test2 = test.match(/\d/g);
            test2 = test2.join('');
            calTotal += parseInt(test2);
            $('.total').html('Total: '+calTotal);
            localStorage.setItem('calTotal', calTotal); 

    
            $('.delete').off().on('click',function(){
                let writeFood = $(this).parent().parent().text();
                let test3 = writeFood.substr(writeFood.length-8);
                test4 = test3.match(/\d/g);
                test4 = test4.join('');
                test5 = parseInt(test4)
                calTotal = calTotal - test5;
                $('.total').html('Total: '+calTotal);
                localStorage.setItem('calTotal', calTotal);
            });
        });       
    });
});
});

document.addEventListener('DOMContentLoaded', function(){

    let getCalTotal = localStorage.getItem('calTotal');

    $('.delete').on('click',function(){
        let writeFood = $(this).parent().parent().text();
        let test3 = writeFood.substr(writeFood.length-8);
        test4 = test3.match(/\d/g);
        test4 = test4.join('');
        test5 = parseInt(test4);
        getCalTotal = getCalTotal - test5;
        $('.total').html('Total: '+getCalTotal);
        localStorage.setItem('calTotal', getCalTotal);
    });

    $('.total').html('Total: '+getCalTotal);
    $('#total-cals').html(getCalTotal+' Cal');
});

//---------------------------------------- WEATHER ----------------------------------------------//
window.addEventListener('load', ()=>{
    let longitude;
    let latitude;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            let APIKey = "2fd3203014efb5bb2fa2f7d3334d6056";
            let weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${APIKey}`;

            fetch(weather)
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data);
                $('#display-todays-weather').html(Math.floor((data.current.temp - 273.15)*1.80+32)+ ' &deg;F');
                $('#display-temp').html(`${Math.floor((data.current.temp - 273.15)*1.80+32)} &deg;F`);
                $('#display-weather').html(data.current.weather[0].main);

                $('#wind-speed').html(`Wind: ${data.current.wind_speed} mph`);
                $('#humidity').html(`Humidity: ${data.current.humidity}%`);

                $('#day-one-temp').html(`<div>${Math.round((data.daily[0].temp.day-273.15)*1.80+32)}&deg;F`);
                $('#day-two-temp').html(`<div>${Math.round((data.daily[1].temp.day-273.15)*1.80+32)}&deg;F`);
                $('#day-three-temp').html(`<div>${Math.round((data.daily[2].temp.day-273.15)*1.80+32)}&deg;F`);
                $('#day-four-temp').html(`<div>${Math.round((data.daily[3].temp.day-273.15)*1.80+32)}&deg;F`);
                $('#day-five-temp').html(`<div>${Math.round((data.daily[4].temp.day-273.15)*1.80+32)}&deg;F`);
            
                let rain = "rain_cloud_emoji_sticker";
                let sun = "sunny_emoji_sticker";
                let cloud = "happy day cloud sticker";
                let wind = "space wave wind sticker";
                let giphy = "https://api.giphy.com/v1/gifs/search?api_key=bq5DOUxnP24dyoOh0cz9ZC4tEw49ka1L&limit=1&q=";
                
                //Graphic for main
                if(data.current.weather[0].main === 'Clear'){
                    fetch(giphy+sun)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src',data.data[0].images.downsized.url);
                        $('#display-weather').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else if(data.current.weather[0].main === 'Rain'){
                    fetch(giphy+rain)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#display-weather').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    });
                }
                else if(data.current.wind_speed >= 10){
                    fetch(giphy+wind)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#display-weather').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else{
                    fetch(giphy+cloud)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#display-weather').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    }); 
                }
                //Graphic for Day One
                if(data.daily[1].weather[0].main === 'Clear'){
                    fetch(giphy+sun)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src',data.data[0].images.downsized.url);
                        $('#day-one').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else if(data.daily[1].weather[0].main === 'Rain'){
                    fetch(giphy+rain)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-one').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    });
                }
                else if(data.daily[1].wind_speed >= 10){
                    fetch(giphy+wind)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-one').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else{
                    fetch(giphy+cloud)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-one').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    }); 
                }
                //Graphic for Day Two
                if(data.daily[2].weather[0].main === 'Clear'){
                    fetch(giphy+sun)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src',data.data[0].images.downsized.url);
                        $('#day-two').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else if(data.daily[2].weather[0].main === 'Rain'){
                    fetch(giphy+rain)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-two').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    });
                }
                else if(data.daily[2].wind_speed >= 10){
                    fetch(giphy+wind)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-two').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else{
                    fetch(giphy+cloud)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-two').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    }); 
                }
                //Graphic for Day Three
                if(data.daily[3].weather[0].main === 'Clear'){
                    fetch(giphy+sun)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src',data.data[0].images.downsized.url);
                        $('#day-three').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else if(data.daily[3].weather[0].main === 'Rain'){
                    fetch(giphy+rain)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-three').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    });
                }
                else if(data.daily[3].wind_speed >= 10){
                    fetch(giphy+wind)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-three').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else{
                    fetch(giphy+cloud)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-three').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    }); 
                }
                //Graphic for Day Four
                if(data.daily[4].weather[0].main === 'Clear'){
                    fetch(giphy+sun)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src',data.data[0].images.downsized.url);
                        $('#day-four').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else if(data.daily[4].weather[0].main === 'Rain'){
                    fetch(giphy+rain)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-four').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    });
                }
                else if(data.daily[4].wind_speed >= 10){
                    fetch(giphy+wind)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-four').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else{
                    fetch(giphy+cloud)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-four').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    }); 
                }
                //Graphic for Day Five
                if(data.daily[5].weather[0].main === 'Clear'){
                    fetch(giphy+sun)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src',data.data[0].images.downsized.url);
                        $('#day-five').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else if(data.daily[5].weather[0].main === 'Rain'){
                    fetch(giphy+rain)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-five').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    });
                }
                else if(data.daily[5].wind_speed >= 10){
                    fetch(giphy+wind)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-five').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"></div>`);
                    });
                }
                else{
                    fetch(giphy+cloud)
                    .then((response)=>response.json())
                    .then((data)=>{
                        $('#weather-image').attr('src', data.data[0].images.downsized.url);
                        $('#day-five').append(`<div><img  id="display-weather-image" src="${data.data[0].images.downsized.url}"><div>`);
                    }); 
                }
            });
        });
    }
});


/************************************************************ TODOs *************************************************************/


  
        // If stored data were retrieved from localStorage, update the Array.
        function todoDisplay(){

            var notCompStoredData = JSON.parse(localStorage.getItem("Stored-Not-Completed-List"));

        if (notCompStoredData !== null) {
            var notCompletedArr = notCompStoredData;
            console.log(notCompletedArr)

            $("#to-do").html(notCompletedArr.length + " Pending Task(s)");
        } else {
	    $("#to-do").html("0 Pending Task(s)");
		}
		
    }

    todoDisplay();






//---------------------------------------------Budgeting--------------------------------------------------//

var enterMoney=document.getElementById('enter_money');

var money;

//Grab the error message

var error=document.getElementById('error');
var errorManage=document.getElementById('error_manage');

//get all manage inputs like (roomrent,accessories,emergency & saving)
var roomrent=document.getElementById('RoomRent');
var accessories=document.getElementById('Accessories');
var emergency=document.getElementById('Emergency');
var saving=document.getElementById('Saving');



//get all output getelement

var showRoom = document.getElementById('show_room');
var showAccessories = document.getElementById('show_access');
var showEmergency = document.getElementById('show_emergency');
var showSaving = document.getElementById('show_saving');


//get loader gif file

var loader =document.getElementById('loader');
//get the evaluate button
var evaluate=document.getElementById('evaluate');

//get the Reset button
var resetButton=document.getElementById('reset_button');
//get the manage_div
var manageDiv=document.getElementById('manage_div');

//get result section

var resultSection=document.getElementById("result_section");


//create an event
enterMoney.addEventListener('keyup',showManageMoney);
evaluate.addEventListener('click',showloader);
resetButton.addEventListener('click',reload);


//function to show gif loader image
function showloader(){
	loader.classList.remove("hidden");
	setTimeout(validateManage,1000);
}


//function to validate input amount and show the manage section

function showManageMoney(e)
{

//check whether the key entered is ENTER key or not
if(e.keyCode==13){

money = e.target.value;

//validate the Input value

if(isNaN(money) || money==0){

	//display error message
	error.classList.remove("hidden");
}
else{
//move ahead & show the manage section div
error.classList.add("hidden");
manageDiv.classList.remove("hidden");

}
}

}

function validateManage(){

	//hide loader image
	loader.classList.add("hidden");
	//validate input fields
if (roomrent.value=="" || accessories.value=="" || emergency.value=="" || saving.value==""){
	errorManage.innerHTML="*Value for input fields is not given. please provide the value for all inputs";
}else{
	errorManage.innerHTML="";

	//parse the value to integer

	var room_per = parseInt(roomrent.value);
	var access_per = parseInt(accessories.value);
	var emer_per = parseInt(emergency.value);
	var save_per = parseInt(saving.value);

	var total= room_per + access_per + emer_per + save_per;

	if(total> 100){
		errorManage.innerHTML="*The Total Percentage is exceeding 100%. Please make sure that is does not exceed 100.";

	}else{
		//validation is complete now calculate the percentage
		calculate(room_per, access_per, emer_per, save_per);
	}
}

}

//calculate percentage
function calculate(roomrent, accessories, emergency, saving){
	var roomrentMoney = ( roomrent/100) * money;
	var accessproesMoney = ( accessories/100) * money;
	var emergencyMoney = ( emergency/100) * money;
	var savingMoney = ( saving/100) * money;


	showRoom.innerHTML="$"+ roomrentMoney;
	showAccessories.innerHTML= "$"+accessproesMoney;
	showEmergency.innerHTML= "$"+emergencyMoney;
	showSaving.innerHTML= "$"+savingMoney;

	resultSection.classList.remove("hidden");
}


//reload the page

function reload(){
	location.reload();
}







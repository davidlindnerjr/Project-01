//---------------------------------- CURRENT DATE --------------------------------------------------//
document.addEventListener('DOMContentLoaded', currentDate);

function currentDate(){
    //current day
    let today = new Date();
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    $('#current-date').append(' '+date);
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



# Life Organizer

Life organizer is an application that allows the user to do just that - organize their life. Life Organizer is packed with four different functions to keep you on track and enable you to take charge of our day! Life Organizer allows the user to keep track of the weather, budget their finances, keep track of your daily caloric intake, and create a list of daily tasks to accomplish. 

__FUNCTIONALITY__

TO-DO list:

* Create a to-do item and save to a list.
* When to-do item is complete the user checks the checkmark icon and the item
 relocates to 'Completed' section.
* User can delete a to-do item entirely by clicking the trash icon.
* User's current number of pending tasks will be displayed on the home screen.

Weather:

* Weather is based on the user's timezone and is accessed throught the 'navigator' object.
* Weather will display:
  * Current day's temperature
  * Current day's weather (rain, cloud, clear, etc.)
  * Current day's wind speed and humidity percentage
* Weather functionality will also display the temperature for the future five days.
* Icons will also be displayed indicating the weather (giphs of cloud, sun, rain, etc.)
* Today's current weather will be displayed in the screen.

Budgeting:

* Budgeting allows the user to enter an amount of money and split it into four 
 different percentage catergories (Life Expense, Extra/Fun, Food, and Savings)
* The function output's the amount of money to be split among the four categories and 
the dollar amount will appear at the top of the screen, as well as appearing on the main
home page.

Food Diary:

* Food Diary allows the user to search any food their heart desires from anywhere.
* List of searched foods will be displayed on the right.
* The user clicks the 'plus' icon to add foor to their diary.
* Calories for that food will be added to the total.
* User is able to delete a food from the diary and the calories from the total by clicking
 the red 'X' icon. 
* Total calories for the day will be displayed on the home page.
 
 __DEVELOPER REMARKS__
  
  (Shalpreet Kaur):
  
  (Caleb Wilburn):
  
  (David Lindner):
  In this application  was tasked with creating the Weather and Food Diary components of Life Organizer. When my teammates and I were brainstorming ideas on what to create     for our application we kept coming up withideas that are day to day occurences, like a to-do list. On the daily I personally use a calorie tracker and I thought that would   be a perfect addition and would be would fit the theme of our project well. I leanred a lot about using different third party APIs and how to manipulate them to get the       information that I desired. I used Nutritionix API in my Food Diary to get the calorie values of searched food by the user. The hardest part of this portion was figuring     out how to remove calories from the total once the user deletes it from the diary. I ended up having to use a '.off().on()' click event listener and that fixed all the       problems that I was coming across. Secondly, I tasked myself with creating the weather feature. It was not too difficult to figure out, as I had done it before; but I did     not want to do it the same way. I used the built in 'navigator' method to allow me to get the timezone of the user and use that to insert into the API and then display       stats from there. Altogether, it was a great time and a great experience with the team.
  
  __SCREENSHOTS OF DEPLOYED APPLICATION__
  
![Food Diary - Google Chrome 8_15_2020 2_06_52 PM](https://user-images.githubusercontent.com/65383133/90321679-ad608780-df00-11ea-870a-85778428985b.png)
![Food Diary - Google Chrome 8_15_2020 2_06_38 PM](https://user-images.githubusercontent.com/65383133/90321680-adf91e00-df00-11ea-9c42-0d3a958699d4.png)
![Todo Planner](./assets/todoList.gif)
  
  

MIT License

Copyright (c) 2020 David Lindner, Shalpreet Kaur, Caleb Wilburn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

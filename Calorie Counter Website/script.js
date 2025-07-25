const budget = document.getElementById('budget');
const form = document.getElementById('form');
const dropdown = document.getElementById('dropdown');
const entryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanString(str){
    const regex = /[\+\s-]/g;
    return str.replace(regex, '');
}

function isInvalidInput(str){
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

function addEntry(){
    const entryNumber = document.querySelectorAll(`#${dropdown.value.toLowerCase()} .input-container input[type="text"]`).length+1;
    const HTMLString =
    `
        <label for="${dropdown.value.toLowerCase()}${entryNumber}-name">Entry ${entryNumber} Name:</label>
        <input id="${dropdown.value.toLowerCase()}${entryNumber}-name" type="text" placeholder="Name">
        <label for="${dropdown.value.toLowerCase()}${entryNumber}-calories">Entry ${entryNumber} Calories:</label>
        <input id="${dropdown.value.toLowerCase()}${entryNumber}-calories" type="number" placeholder="Calories">
    `;
    const inputContainer = document.querySelector(`#${dropdown.value.toLowerCase()} .input-container`);
    inputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(list){
    let totalCalories = 0;
    isError = false;

    for(let i = 0; i < list.length; i++){
        if(isInvalidInput(cleanString(list[i].value))){
            alert('Invalid Calorie Input!')
            isError = true;
            return null;
        }
        totalCalories += Number(cleanString(list[i].value));
    }
    return totalCalories;
}

function calculateRemainingCalories(e){
    e.preventDefault();
    let consumedCalories = 0;

    if (isInvalidInput(budget.value)){
        alert('Invalid input for budget');
        return;
    }

    if (Number(budget.value<0)){
        alert('Budget cannot be negative');
        return;
    }
    const budgetCalories = Number(cleanString(budget.value));

    const breakfastList = document.querySelectorAll('#breakfast input[type="number"]');
    const lunchList = document.querySelectorAll('#lunch input[type="number"]');
    const dinnerList = document.querySelectorAll('#dinner input[type="number"]');
    const snacksList = document.querySelectorAll('#snacks input[type="number"]');
    const exerciseList = document.querySelectorAll('#exercise input[type="number"]');

    const breakfastCalories = calculateCalories(breakfastList);
    if(isError){
        return;
    }
    const lunchCalories = calculateCalories(lunchList);
    if(isError){
        return;
    }
    const dinnerCalories = calculateCalories(dinnerList);
    if(isError){
        return;
    }
    const snacksCalories = calculateCalories(snacksList);
    if(isError){
        return;
    }
    const exerciseCalories = calculateCalories(exerciseList);
    if(isError){
        return;
    }
    consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

    const surplusOrDeficit = remainingCalories > 0 ? 'Deficit' : 'Surplus';
    
    output.innerHTML = 
    `
        <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calories ${surplusOrDeficit}</span>
    `
    output.classList.remove('hide');
}

function clear(){
    output.classList.add('hide');
    output.innerHTML = '';
    const entryList = document.querySelectorAll('.input-container');
    for (const item of entryList){
        item.innerHTML = '';
    }
    budget.value = '';
}

entryButton.addEventListener('click', addEntry);
form.addEventListener('submit', calculateRemainingCalories);
clearButton.addEventListener('click', clear);
const budget = document.getElementById('budget') as HTMLInputElement;
const form = document.getElementById('form') as HTMLFormElement;
const dropdown = document.getElementById('dropdown') as HTMLInputElement;
const entryButton = document.getElementById('add-entry') as HTMLButtonElement;
const clearButton = document.getElementById('clear') as HTMLButtonElement;
const output = document.getElementById('output') as HTMLElement;
let isError: boolean = false;

function cleanString(str: string): string{
    const regex = /[\+\s-]/g;
    return str.replace(regex, '');
}

function isInvalidInput(str: string): RegExpMatchArray | null{
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

function addEntry(): void{
    const entryNumber: number = document.querySelectorAll(`#${dropdown.value.toLowerCase()} .input-container input[type="text"]`).length+1;
    const HTMLString =
    `
        <label for="${dropdown.value.toLowerCase()}${entryNumber}-name">Entry ${entryNumber} Name:</label>
        <input id="${dropdown.value.toLowerCase()}${entryNumber}-name" type="text" placeholder="Name">
        <label for="${dropdown.value.toLowerCase()}${entryNumber}-calories">Entry ${entryNumber} Calories:</label>
        <input id="${dropdown.value.toLowerCase()}${entryNumber}-calories" type="number" placeholder="Calories">
    `;
    const inputContainer = document.querySelector(`#${dropdown.value.toLowerCase()} .input-container`) as HTMLElement;
    inputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(list: HTMLInputElement[]): number{
    let totalCalories = 0;
    isError = false;

    for(let i = 0; i < list.length; i++){
        if(isInvalidInput(cleanString(list[i].value))){
            alert('Invalid Calorie Input!')
            isError = true;
            return 0;
        }
        totalCalories += Number(cleanString(list[i].value));
    }
    return totalCalories;
}

function calculateRemainingCalories(e: any): void{
    e.preventDefault();
    let consumedCalories: number = 0;

    if (isInvalidInput(budget.value)){
        alert('Invalid input for budget');
        return;
    }

    if (Number(budget.value) < 0){
        alert('Budget cannot be negative');
        return;
    }

    const budgetCalories: number = Number(cleanString(budget.value));

    const breakfastList = document.querySelectorAll('#breakfast input[type="number"]') as unknown as HTMLInputElement[];
    const lunchList = document.querySelectorAll('#lunch input[type="number"]') as unknown as HTMLInputElement[];
    const dinnerList = document.querySelectorAll('#dinner input[type="number"]') as unknown as HTMLInputElement[];
    const snacksList = document.querySelectorAll('#snacks input[type="number"]') as unknown as HTMLInputElement[];
    const exerciseList = document.querySelectorAll('#exercise input[type="number"]') as unknown as HTMLInputElement[];

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

    const remainingCalories: number = budgetCalories - consumedCalories + exerciseCalories;

    const surplusOrDeficit: string = remainingCalories > 0 ? 'Deficit' : 'Surplus';
    
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
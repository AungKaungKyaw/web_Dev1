let selectedButtons = {
    red: false,
    green: false,
    blue: false
};

function handleButtonClick(color) {
    // flip the selectedButtons like if the value is true, make it false
    selectedButtons[color] = !selectedButtons[color];
    console.log(selectedButtons);
    displaySelections();
}

function handleCheckboxChange(car) {
    let checkbox = document.getElementById(car + "Checkbox");
    // checkbox.checked က checked လုပ်ထားရင် true ဖြစ်
    console.log("Selected car: " + car + " - Checked : " + checkbox.checked);
    displaySelections();
}

function displaySelections() {
    // Array to store selected colors based on button clicks
    let selectedCars = [];

    // selectedButton ထဲမှာ true ဖြစ်တဲ့ button တွေကို selectedCars ထဲ ထည့်မယ်
    for (let button in selectedButtons) { // button is key and selectedButtons[button] is value
        // If the button is selected(true), add its color to selectedCars array
        if (selectedButtons[button] === true) {
            console.log("inside something : " + button);
            console.log("inside something2 : " + selectedButtons[button]);
            selectedCars.push(button);
        }
    }

    // Array to store selected cars based on checkbox selections
    let selectedCarsCheckboxes = ["volvo", "saab", "opel", "audi"].filter((car) =>  {
         return document.getElementById(car + "Checkbox").checked;
    });

    // Log the selected colors and cars to the console
    console.log("Selected colors: " + selectedCars.join(", "));
    console.log("Selected cars: " + selectedCarsCheckboxes.join(", "));
}
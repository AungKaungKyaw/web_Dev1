


let selectSize = {
    19:false,
    20:false,
    21:false,
    22:false,
    23:false
}
let selectColor = {
    red:false,
    black:false,
    pink:false,
    white:false,
    mix:false,
    yellow:false
}
let selectPrice={
    100:false,
    200:false,
    300:false,
    400:false
}
function handleSizeChange(size){
    selectSize[size] = !selectSize[size];
    displaySelections();
}
function handleColorChange(color){
    for (let key in selectColor){
        selectColor[key] = false;
    }
    selectColor[color] = !selectColor[color];
    displaySelections();
    let color1 = document.getElementById(color).style.backgroundColor;
    console.log("the background color is :"+ color1);
    //https://stackoverflow.com/questions/23608856/convert-rgb-color-value-to-rgba-at-0-75-alpha
    //rgb = (123,123,123)
    //rgba =(123,123,123,0.5)
    /*if (color1.includes(0.5)) {
        let new_col = color1.replace(/,0.5\)/i, ')');
        console.log("fetch color from css with 0.5"+new_col);
        // Apply the new color to an element with the id "color"
        document.getElementById("color").style.backgroundColor = new_col;
    } else{

    }*/
    let new_col = color1.replace(/rgb/i, "rgba");
    new_col = new_col.replace(/\)/i, ',0.5)');
    console.log("fetch color from css without 0.5 : "+new_col);
    console.log("type of new_col : "+typeof new_col);
    // Apply the new color to an element with the id "color"
    document.getElementById(color).style.backgroundColor = new_col;
}
function handlePriceChange(){
// https://stackoverflow.com/questions/53052925/using-queryselector-with-a-variable-to-get-radio-button-values
    document.querySelectorAll('input[type="radio"][name="price"]').forEach(function(radioButton) {
        // radioButton = <input type="radio" id="price300-400" name="price" value="400">
        // radioButton will take the whole element
        radioButton.addEventListener("change", function() {
            // console.log("Selected price range: " + this.value + " dollars");
            displaySelections();
        });
    });
}
handlePriceChange();

function displaySelections(){
    let selectedSize = [];
    let selectedColor = [];
    let selectedPrice= [];


    for(let size in selectSize){
        if(selectSize[size] === true){
            selectedSize.push(size);
        }
    }
    for(let color in selectColor){
        if(selectColor[color] === true){
            selectedColor.push(color);
        }
    }
    // for (let price in selectPrice) {
    //     if (selectPrice[price] === true) {
    //         selectedPrice.push(price);
    //     }
    // }

    console.log(selectedSize);
    console.log(selectedColor);
    // console.log(selectedPrice);
    var radios = document.getElementsByName('price');
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            selectedPrice.push(radios[i].value);
            console.log(selectedPrice);
        }
    }
    displayValues(selectedSize,selectedPrice,selectedColor);

}


function displayValues(val1,val2,val3){
    document.getElementById("value1").innerHTML = val1;
    console.log("value 1 : " + typeof val1);
    document.getElementById("value2").innerHTML = val2;
    console.log("value 1 : " + typeof val2);
    document.getElementById("value3").innerHTML = val3;
    console.log("value 1 : " + typeof val3);
    val1 = JSON.stringify(val1);
    val2 = JSON.stringify(val2);
    val3 = JSON.stringify(val3);
    reqjs(val1,val2,val3,function (data) {
        if(!data){
            return 0;
        }else{
            console.log("data : "+data);
            document.getElementById("value4").innerText = data;
            console.log("type of -----------" + typeof data + "---------------");
            data = JSON.parse(data);
            console.log(data);
            console.log("type of -----------" + typeof data + "---------------");
            console.log(data);
            data.forEach(item=>{
                console.log(item.id);
            })
            deleteLoadedShoes();
            data.forEach(item =>{
                load(item.name,item.price,item.imgurl);
            })
        }
    });
}

function reqjs(value1, value2, value3,callback) {
    // Sanitize input
    value1 = sanitizeInput(value1);
    value2 = sanitizeInput(value2);
    value3 = sanitizeInput(value3);


    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/pp2/p5/control/reqdata.php';
    xhr.open('POST', url, true);

    //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // No need to set content-type explicitly when using FormData

    // Pass origin as a custom header
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // console.log("xhr.responseText");
                // console.log(xhr.responseText);
                callback(xhr.responseText);
            } else {
                console.error("Request Failed: " + xhr.status);
                return 0;
            }
        }
    };
    const jsonData = JSON.stringify({
        value1: value1,
        value2: value2,
        value3: value3
    });
    xhr.send(jsonData);


}
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return input;
    } else {
        input = input
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/\//g, "&#x2F;")
            .replace(/'/g, "&#x27;");
        return input;
    }
}

function deleteLoadedShoes(){
    let checkDivExist = document.getElementById("createdivs");
    while (checkDivExist.firstChild){
        checkDivExist.removeChild(checkDivExist.firstChild);
    }
}




    function load(val1,val2,val3) {

        let createRow = document.createElement("div");
        createRow.className = "row";

        let createCol = document.createElement("div");
        createCol.className = "col-lg-4";

        //create card div
        let cardDiv = document.createElement("div");
        cardDiv.className = "card w-100";
        // cardDiv.style.width = "18rem";

        //create image
        let img = document.createElement("img");
        img.className = "card-img-top";
        img.src = val3;

        // create card body
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // create card title
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = val1;

        //create card-text
        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = val2;

        // create card button
        let cardBtn = document.createElement("a");
        cardBtn.className = "btn btn-primary";
        cardBtn.textContent = "Go somewhere";

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardBtn);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        createCol.appendChild(cardDiv);
        document.getElementById("createdivs").appendChild(createCol);
    }

    window.onload = function () {
        // use callback function and assign value to jsonDataFinalResult
        reqjs(0, 0, 0,function (callbackValue){
            //string json data into json object
            callbackValue = JSON.parse(callbackValue);
            console.log("length of callback Value : " + callbackValue.length);

            callbackValue.forEach(item =>{
                load(item.name,item.price,item.imgurl);
            })
        });
    }




/// start of handle request sidebar data size, price, color






/// end of handle request sidebar data size, price, color







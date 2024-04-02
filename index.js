function click1(){
    const url = 'http://localhost/pp2/untitled/testing.php';
    xhr = new XMLHttpRequest();
    xhr.open("GET", "");
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            document.getElementById("demo").innerHTML = xhr.responseText;
        }
    }
}
const output = document.getElementById('output');

const link = document.querySelectorAll(".linkPaginating");
let currentpage = 1;
let currentWholepage = 1;

function activeLink(val){
    output.innerHTML = val;
    currentpage = val;
    setActive();
}
function setActive(){

}
function activeLinkPage(val){
    if(val === "next"){
        console.log(currentpage);
        if(currentpage > 0 && currentpage % 3 == 0){
            /*link.forEach(link=>link.classList.remove('active'));
            link[0].setAttribute('value',4);
            link[0].innerHTML = 4;
            link[1].setAttribute('value',5);
            link[1].innerHTML = 5;
            link[2].setAttribute('value',6);
            link[2].innerHTML = 6;*/

            for(let i = 0; i < 3; i++){
                // link[i].classList.add('active');
                link[i].setAttribute('value', currentpage + i);
                link[i].innerHTML = currentpage + i;
            }
        }
        currentpage++;
    }else if(val === "prev"){
        if(currentpage < 1){
            console.log("do nothing");
        }else{
            currentpage--;
        }
    }
    output.innerHTML = "currentpage" + currentpage;
}

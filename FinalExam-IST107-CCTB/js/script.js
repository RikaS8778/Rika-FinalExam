/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start
    };

    // Change color every 2 seconds with a smooth transition
    setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById("enter");
let input = document.getElementById("userInput");
//let ul = document.querySelector("ul");
let ul = document.getElementById("ul");
let item = document.getElementsByTagName("li");
let showModal = document.getElementById('enter-prompt');

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}


function createListElement(param=null) {
    let li = document.createElement("li"); // creates an element "li"
    if(!param){
        li.appendChild(document.createTextNode(input.value)); //makes text from input field the li text
    } else if(param){
        li.appendChild(document.createTextNode(param));
    }
    ul.appendChild(li); //adds li to ul
    input.value = ""; //Reset text input field


    //START STRIKETHROUGH
    // because it's in the function, it only adds it for new items
    function crossOut() {
        li.classList.toggle("done");
    }

    li.addEventListener("click", crossOut);
    //END STRIKETHROUGH


    // START ADD DELETE BUTTON
    let dBtn = document.createElement("button");
    let liId = listLength();
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    li.setAttribute('id', liId);
}


function checkExistValues(param){
    let reternV = true;
    for(i=0; i<item.length;i++){
        let existTask = item[i].firstChild.data;
        console.log('input task: ' + param + ' List item[' + i + '] :' + existTask);
        if(param == existTask){
            alert(`Task: ${param} is already exsit in the list. Please set a new task.`);
            return reternV = false;
        }
    }
    return reternV;
} 

function addListAfterClick() {
    if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
        let reternV = checkExistValues(input.value);
        if(reternV){
            createListElement();
        }   else {
            return input.value = '';
        }
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) { //this now looks to see if you hit "enter"/"return"
        //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
        let reternV = checkExistValues(input.value);
        if(reternV){
            createListElement();
        }   else {
            return input.value = '';
        }
    }
}

function addTasks(){
    let promValue = '';
    do{
        promValue = prompt('input pending tasks. When you want to stop input, type [Escape]!');
        if(promValue == 'Escape'){
            return;
        } else if (promValue.length > 0){
            let reternV = checkExistValues(promValue);
            if(reternV){
                createListElement(promValue);
                promValue = '';
            } else {
                promValue = '';
            }
        }
    }while(!promValue)
    
}


enterButton.addEventListener("click", addListAfterClick);
showModal.addEventListener('click', addTasks);

input.addEventListener("keypress", addListAfterKeypress);


setInterval(getTarget, 2000)

function getTarget(){
    const listItems = document.querySelectorAll('li');

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            // クリックされた <li> 要素を削除
            if (ul.contains(item)) {
                console.log(item);
                ul.removeChild(item);
            } 
        });
    });
}

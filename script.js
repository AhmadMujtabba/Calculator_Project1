let finalExpres='';
(function(){document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (event) => {
        if(event.target.value !== 'clear')
        {
            finalExpres.concat(event.target.value)
            console.log("You clicked:", event.target.value);
        }
        else
        {
            document.querySelector('.input').value=''
        }
    });
  })}());

function expression(input){
    let expresion=input;
    console.log(expresion);
}

function setValue(){
    document.querySelector('.input').value=finalExpres
}
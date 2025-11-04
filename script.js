let finalExpres='';
let legalCharArr=['+','-','/','*','**',')','('];

(function(){document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (event) => {
        if(event.target.value !== 'clear' && event.target.value !== 'equal')
        {
            finalExpres+=event.target.value
            setValue(finalExpres)
            breakString(finalExpres)
        }else if(event.target.value == 'equal'){
            console.log("start calculation");

        }
        else
        {
            setValue('')
        }
    });
  })}());


function setValue(value){
    document.querySelector('.screen').value=value
    if(value=='')
    {
        finalExpres=''
    }
}

function calculate(){

}

function breakString(str){
    console.log(str.split(''))
}
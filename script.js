let finalExpres='';

(function(){
    document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (event) => {
        if(event.target.value !== 'clear' && event.target.value !== 'equal')
        {
            finalExpres+=event.target.value
            setScreenValue(finalExpres)
        }else if(event.target.value == 'equal'){
            calculate(finalExpres)

        }
        else
        {
            finalExpres=''
        }
    });
  })}());

function handleInputChange(event){
    finalExpres=event.target.value
    setScreenValue(finalExpres)
}

function setScreenValue(value){
    document.querySelector('.screen').value=value
    inputValidator(value)
}

function calculate(expr){
    if(inputValidator(expr))
    {   
    return result=eval(expr)
    }
    else{
        
    }
}

function inputValidator(input){
    //Check for illegal char
    let legalCharArr=['0','1','2','3','4','5','6','7','8','9','+','-','*','^','/','(',')','.']
    for(let i=0;i<input.length;i++)
    {
        let char=input[i]
        if(!legalCharArr.includes(char))
        {
            return false;
        }
    }
    //Check for illegal expression
    
    return true
}
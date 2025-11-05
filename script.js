let finalExpres='';
let history=new Array
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
        else if(event.target.value == 'clear')
        {
            finalExpres=''
            setScreenValue('')
            clearDisplayResult()
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
    if(inputValidator(expr)!==false)
    {
    let calculatedResult=eval(inputValidator(expr));
    displayResult(calculatedResult)
    addToHistory(expr,calculatedResult)  
    displayHistory(history) 
    }
    else{
        console.log('error');
    }
}

function inputValidator(input){
    //Check for illegal char
    // let legalCharArr=['0','1','2','3','4','5','6','7','8','9','+','-','*','^','/','(',')','.']
    // for(let i=0;i<input.length;i++)
    // {
    //     let char=input[i]
    //     if(!legalCharArr.includes(char))
    //     {
    //         return false;
    //     }
    // }
    //Check for illegal expression
    
    // return true
    const regex =/^(?!.*[+\-*/^]{2})(?![+\-*/^])(?!.*[+\-*/^]$)(?!.*\([+\-*/^])(?:(?:\d+)|(sin|cos|tan|sqrt)\([^()]+\)|[+\-*/^]|\(|\))*$/i
    if(regex.test(input))
    {
        const converted = input.replace(/\b(sin|cos|tan|sqrt|log|ln)\(/gi, "Math.$1(");
        return converted
    }
    else return false
}
function displayResult(result){
    document.querySelector('.result-screen').value=result
}

function clearDisplayResult(){
    document.querySelector('.result-screen').value=''
}

function addToHistory(expr,result){
    history.push({expr:expr,result:result})
    console.log(history)
}

function displayHistory(history){
    let historydiv=document.querySelector('.history')
    historydiv.innerHTML=''
    for(let i=1;i<history.length;i++)
    {
        historydiv.innerHTML+=`<p onclick="setHistoryToDisplay(${i})">${history[i].expr}=${history[i].result}</p><button class="delete" onclick=deleteHistoryItem(${i})>Delete</buttom>`
    }
}

function deleteHistoryItem(index){
    history.splice(index,1)
    displayHistory(history)
}

function setHistoryToDisplay(index){
    setScreenValue(history[index].expr)
    finalExpres=history[index].expr
    displayResult(history[index].result)
}
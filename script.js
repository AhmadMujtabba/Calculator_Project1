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
        if(expr!=='')
        {
            let calculatedResult=eval(inputValidator(expr));
            displayResult(calculatedResult)
            addToHistory(expr,calculatedResult)  
            displayHistory(history) 
        }
        else{
        alert('There is nothing to calculate')
        }
    }
    else{
        alert('Invalid character or expression')
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
    // const regex =/^(?!.*[+\-*/^]{2})(?![+\-*/^])(?!.*[+\-*/^]$)(?!.*\([+\-*/^])(?:(?:\d+)|(sin|cos|tan|sqrt|log|pow)\([^()]+\)|[+\-*/^]|\(|\))*$/i
    const regex=/^(?!.*(?<!\*)[+\-/^]{2})(?!.*\*\*{2,})(?![+\-*/^])(?!.*[+\-*/^]$)(?!.*\([+\-*/^])(?!.*\/0+(?!\.))(?!.*\(\s*\))(?:(?:\d+)|(sin|cos|tan|sqrt|log|pow)\([^()]+\)|[+\-*/^]|\(|\))*$/i
    if(regex.test(input))
    {
        const converted = input.replace(/\b(sin|cos|tan|sqrt|log|pow)\(/gi, "Math.$1(");
        // exponentHandler(converted)
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
        historydiv.innerHTML+=`<p onclick=setHistoryToDisplay(${i})>${history[i].expr}=${history[i].result}</p><button class="delete" onclick=deleteHistoryItem(${i})>Delete</buttom>`
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

// function exponentHandler(expr){
//     let newExpr=expr;
//     if(expr.includes('^'))
//     {
//     indexofpow=expr.indexOf('^')
//     const firstvalue=expr[indexofpow-1]
//     const secondvalue=expr[indexofpow+1]
//     if(firstvalue&&secondvalue)
//     {
//         newExpr.index[indexofpow-1]='Math.pow'
//         newExpr.index[indexofpow]=`(${firstvalue}`
//         newExpr.index[indexofpow+1]=`,${secondvalue})`
//         console.log(newExpr);
//         return newExpr
//     }
//     }
// }

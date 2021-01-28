var height = document.getElementById('height');
var weight = document.getElementById('weight');
var getResultBtn = document.getElementById('getResult');
var resetBtn = document.querySelector('.reset');
var seeResText = document.querySelector('.seeRes')
var historyRecord = document.querySelector('.record');
var level = document.querySelector('.level');
var resultText = document.querySelector('.resultText')

var historyResult = JSON.parse(localStorage.getItem('bmiResult')) || []
render(historyResult)
getResultBtn.addEventListener('click', getResult)
resetBtn.addEventListener('click', reset)

function getResult() {
    var bmi = (weight.value / ((height.value/100)**2)).toFixed(2);
    // 按鈕顏色變換
    var colorLevel = colorResult(bmi).split(',')
    var getDate = new Date
    var dayDetail = getDate.getDate() +"-"+ (getDate.getMonth() + 1) + "-" + getDate.getFullYear()
    var result ={
        bmi: bmi,
        kg: weight.value,
        cm: height.value,
        userlevel: colorLevel[2],
        recordColor: colorLevel[3],
        recordDate: dayDetail
    }
    historyResult.push(result)
    localStorage.setItem('bmiResult', JSON.stringify(historyResult))
    //框框內結果
    getResultBtn.className = `${colorLevel[0]} rounded-circle w-100 h-100 d-flex align-items-center position-relative`
    seeResText.className = 'd-none'
    resultText.className = `${colorLevel[1]} mb-0 text-center w-100 font-lg `
    resultText.innerHTML = bmi
    //判斷是否有輸入正確
    if(height.value=='' || weight.value ==''){
        alert('請輸入正確內容')
    }
    resetBtn.className= `reset d-block ${colorLevel[3]}`
    level.innerHTML = `<p class="mb-0 ${colorLevel[1]}">${colorLevel[2]}</p>`
    render(historyResult)
}
// resetBtn
function reset(e){
    e.stopPropagation()
    bmi = 0
    height.value = ''
    weight.value = ''
    while(level.firstChild){
        level.removeChild(level.firstChild)
    }
    getResultBtn.className ='bg-primary rounded-circle font-xl w-100 h-100 d-flex align-items-center'
    seeResText.className = 'd-block mb-0 text-center w-100'
    resultText.className = 'resultText d-none'
    resetBtn.className = 'reset d-none'
    console.log(e.target.nodeName)
}

function render (reocrd) {
    var str = ''
    reocrd.forEach((item) => {
    str +=  `<li class="w-100 d-flex bg-white mt-5"><div class="bar ${item.recordColor}"></div><ul class="content list-unstyled w-100 w-100">
    <li class="w-100 py-4 mb-0 ml-4 font-lg">${item.userlevel}</li>
    <li class="w-100 py-4 mb-0 font-lg"><span class="font-sm pr-2">BMI</span>${item.bmi}</li>
    <li class="w-100 py-4 mb-0 font-lg"><span class="font-sm pr-2">weight</span>${item.kg}</li>
    <li class="w-100 py-4 mb-0 font-lg"><span class="font-sm pr-2">height</span>${item.cm}</li>
    <li class="w-100 py-4 mb-0 font-lg mr-4">${item.recordDate}</li>
    </ul></li>`
    });
    
    historyRecord.innerHTML = str
}
function colorResult(bmi){
    if(bmi <18.5){
        return 'border-sky-lg,text-sky,過輕,bg-sky'
    }else if(bmi>=18.5 && bmi<24){
        return 'border-success-lg,text-success,理想,bg-success'  
    }else if(bmi>=24 && bmi<27){
        return 'border-warning-lg,text-warning,過重,bg-warning' 
    }else if(bmi>=27 && bmi<30){
        return 'border-warning-darken-lg,text-warning-darken,輕度肥胖,bg-warning-darken' 
    }else if(bmi>=30 && bmi<35){
        return  'border-warning-darken-lg,text-warning-darken,中度肥胖,bg-warning-darken'
    }else if(bmi>=35){
        return 'border-danger-lg,text-danger,重度肥胖,bg-danger'
    }else{
        return
    }
}
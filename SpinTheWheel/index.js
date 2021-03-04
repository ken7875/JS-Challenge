let data = [
    {
        "text": "Movie",
        "icon": "movie_filter",
        "num": 1
    },
    {
        "text": "Wish",
        "icon": "cake",
        "num": 1
    },
    {
        "text": "Anything",
        "icon": "star",
        "num": 1
    },
    {
        "text": "Child",
        "icon": "child_care",
        "num": 1
    },
    {
        "text": "Flight",
        "icon": "flight",
        "num": 1
    },
    {
        "text": "wifi",
        "icon": "wifi",
        "num": 1
    }
]

const wheel = document.querySelector('.wheel');
const pressBtn = document.getElementById('pressBtn');
const pointer = document.getElementById('pointerContainer');
const restartBtn = document.getElementById('restartBtn');
const resultBar = document.querySelector('.resultBar');
const getPrizeName = document.querySelector('.prizeName')
// set init
let prizes = data;
let nums = []; // 獎品的 index 值
let index = 0; // 隨機取得產品
let fanItemAngle;
let duration = 3000; // 旋轉時間
let runNum = 4; // 圈數
let prizeAngle = []; // 各獎品的角度
let starDeg = 0; // 開始角度
let finalDeg = 0;
let pointerSpeed;
let fanAngle
let starAngle = 0
let remaining_times = 6;

// 取得資料

//初始化轉盤變數
const initPrize = async () => {  
    fanAngle = 360 / prizes.length
    createPie()
    degree()   
};
initPrize()
// 計算幾筆資料並加入扇形與內容
function createPie() {
    prizes.map((item, i) => {
        let fan = document.createElement('div');
        let fanContain = document.createElement('div');
        let icon = document.createElement('i')
        let category = document.createElement('p')
        let prizeRemain = document.createElement('p')
        fan.classList.add('wheelInner')
        // 每個扇形的角度
        fan.style.transform = `rotate(${fanAngle * (i + 1)}deg) skewY(-30deg)`;
        // 放入內容
        icon.classList.add('material-icons')
        icon.innerHTML = `${item.icon}`
        category.innerHTML = `${item.text}`
        prizeRemain.innerHTML = `${item.num}`
        fanContain.classList.add('fanContain')
        // 放入個扇形與內容
        wheel.appendChild(fan)
        fan.append(fanContain)
        fanContain.appendChild(icon)
        fanContain.appendChild(category)
        fanContain.appendChild(prizeRemain)
        // 扇形顏色
        if (i % 2 === 0) {
            fan.style.backgroundColor = '#F0BEFF'
            fan.style.color = '#343BAA'
        }
    })
}
// 各獎品的角度
function degree() {
    prizes.map((item, i) => {
        eachPriceAngle = fanAngle * (i + 1)
        prizeAngle.push(eachPriceAngle)
        // 並同時生產產品編號
        nums.push(i)
        // 中獎時的 style

    });
};
// 重新開始
function restart() {
    remaining_times = 6
    reset()
    initPrize()
}
function reset() {    
    nums = [];
    index = 0;
    starDeg = 0;
    finalDeg = 0;   
    pressBtn.disabled = false;
};
function startGaming() {
    resultBar.classList.remove('visible')
    // 隨機取出任一產品編號
    index = nums[Math.floor(Math.random() * nums.length)]
    let degree
    // 初始角度 + 選轉圈數 + 獎品角度[隨機數] - 初始角度餘數
    degree = starDeg + runNum * 360 + prizeAngle[index] - starDeg % 360
    // 更新初始角度
    starDeg = degree;
    // 指針旋轉角度
    finalDeg = degree;
    pointer.style.transform = `rotate(${finalDeg}deg)`;
    pointer.style.transition = `all ${duration / 1000}s ease-in-out`;
    // 計算 restart 剩餘次數
    remaining_times--;
    // 計算出各獎品剩餘數量
    let prize = prizes[index];
    prize.num--;
};
function resultIcon() {
    resultBar.createElement('div')

}
function delNone() {
    // 刪去數量為 0 的項目
    prizes.filter((prize, i) => {
        let filterNone; // 重新初始化
        if (prize.num <= 0) {
            let filterNone = nums.filter((num) => {
                return num !== i
            })
            nums = filterNone
        }
    })
};
function handleStart() {   
    pressBtn.disabled = true;    
    delNone()
    if(remaining_times > 0) {
        startGaming()
    }else if(remaining_times === 0) {        
        alert('抽獎結束')
        pressBtn.disabled = true;
    }
}
pressBtn.addEventListener('click', handleStart)
// 讓畫面執行完能夠直接更新數字
pointer.addEventListener('transitionend', () => {
    initPrize();
    resultBar.classList.add('visible')
    pressBtn.disabled = false
    getPrizeName.innerHTML=`<p>${prizes[index].text}</p>`
})

const zoneResult = document.querySelector('.zone')
const zones = [
    {country:'New York', timeZone: 'America/New_York'},
    {country:'London', timeZone: 'Europe/London'},
    {country:'Bangkok', timeZone: 'Asia/Bangkok'},
    {country:'Taipei', timeZone: 'Asia/Taipei'},
    {country:'Sydney', timeZone: 'Australia/Sydney'},
]

getDate()
function getDate(){   
    const date = new Date()
    var str = ''
    zones.forEach(zone=> {
        if(date.toLocaleString('en-US', {timeZone:`${zone.timeZone}`,hour:'numeric',hour12:false})>=18 || date.toLocaleString('en-US', {timeZone:`${zone.timeZone}`,hour:'numeric',hour12:false})<=5){
            var night = 'night'
        }
        str+= `<li class=${night}>
                        <div class="d-flex justify-content-center column">
                            <p class="text-lg">${zone.country}</p>
                            <p class="date text-md"> ${date.toLocaleString('en-US', {timeZone:`${zone.timeZone}`,year:'numeric',month: 'short',day:'numeric'})}</p>
                        </div>
                        <p>${date.toLocaleString('en-US', {timeZone:`${zone.timeZone}`,hour:'numeric',minute:'numeric',hour12:false})}</p>
                   </li>`
    })
    zoneResult.innerHTML = str  
}

setInterval("getDate()", 1000)

const fs = require('fs');
let dayLog = []

function parseDate(dateTime) {
  let d = dateTime.substring(0, 8)
  d = d.split('/')
  console.log(d);
  return '20' + d[2]  + '-' + d[0] + '-' + d[1] 
}

fs.readFile('steps/steps-2020-06-28.json', 'utf8', (err, data) => {
    if (err) throw err;
    let stepsTotal  = 0;
    let object = JSON.parse(data);
    let currentDay = 0;
    object.forEach((m, index, arr) => {
        let date = new Date(m.dateTime);
        let dateISO =  parseDate(m.dateTime);
        if(currentDay === 0) {
            currentDay = dateISO;
        } else {
            if(currentDay !== dateISO || index === arr.length - 1){
                let day = {
                    'date': currentDay,
                    'steps': stepsTotal,
                }
                dayLog.push(day);
                currentDay = dateISO;
                stepsTotal = 0
            }
        }
        stepsTotal = stepsTotal + parseInt(m.value);
    })
    console.log(dayLog);
  })
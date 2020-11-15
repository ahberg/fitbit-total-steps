const fs = require("fs");
let stepsFolder = "steps/";
let dayLog = [];
let currentDay = 0;
let objects = [];

function parseDate(dateTime) {
  let d = dateTime.substring(0, 8);
  d = d.split("/");
  return "20" + d[2] + "-" + d[0] + "-" + d[1];
}

let files = fs.readdirSync(stepsFolder);
files.forEach((jsonFile) => {
  let content = fs.readFileSync(stepsFolder + jsonFile, "utf8");
  objects.push(...JSON.parse(content));
});

stepsTotal = 0;
objects.forEach((m, index, arr) => {
  let dateISO = parseDate(m.dateTime);
  if (currentDay === 0) {
    currentDay = dateISO;
  } else {
    if (currentDay !== dateISO || index === arr.length - 1) {
      let day = {
        date: currentDay,
        steps: stepsTotal,
      };
      dayLog.push(day);
      currentDay = dateISO;
      stepsTotal = 0;
    }
  }
  stepsTotal = stepsTotal + parseInt(m.value);
});
console.log(objects.length)
//console.log(JSON.stringify(dayLog));

return;
fs.readdir(stepsFolder)
  .forEach((jsonFile) => {
    fs.readFile(stepsFolder + jsonFile, "utf8", (err, data) => {
      if (err) throw err;
      let stepsTotal = 0;
      let object = JSON.parse(data);
      object.forEach((m, index, arr) => {
        let dateISO = parseDate(m.dateTime);
        if (currentDay === 0) {
          currentDay = dateISO;
        } else {
          if (currentDay !== dateISO || index === arr.length - 1) {
            let day = {
              date: currentDay,
              steps: stepsTotal,
            };
            dayLog.push(day);
            currentDay = dateISO;
            stepsTotal = 0;
          }
        }
        stepsTotal = stepsTotal + parseInt(m.value);
      });
      console.log(dayLog);
    });
    return 0;
  })
  .then(() => console.log(dayLog));

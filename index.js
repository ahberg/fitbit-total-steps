const fs = require('fs')

const activityFolder = 'Physical Activity/'
const dayLog = []
let currentDay = 0
const objects = []

function parseDate (dateTime) {
  let d = dateTime.substring(0, 8)
  d = d.split('/')
  return `20${d[2]}-${d[0]}-${d[1]}`
}

let files = fs.readdirSync(activityFolder)
files = files.filter(f => f.startsWith('steps-'))

files.forEach((jsonFile) => {
  const content = fs.readFileSync(activityFolder + jsonFile, 'utf8')
  objects.push(...JSON.parse(content))
})

let stepsTotal = 0
objects.forEach((m, index, arr) => {
  const dateISO = parseDate(m.dateTime)
  if (currentDay === 0) {
    currentDay = dateISO
  } else if (currentDay !== dateISO || index === arr.length - 1) {
    const day = {
      date: currentDay,
      steps: stepsTotal
    }
    dayLog.push(day)
    currentDay = dateISO
    stepsTotal = 0
  }
  stepsTotal += parseInt(m.value, 10)
})

dayLog.sort((a, b) => b.steps - a.steps)

const csvArray = dayLog.map((obj) =>
  Object.keys(obj).reduce((arr, current) => {
    arr.push(obj[current])
    return arr
  }, [])
)
csvArray.unshift(['Dates', 'Steps'])

const CSV = csvArray.join('\n')
fs.writeFileSync('allDaysSteps.json', JSON.stringify(dayLog))
fs.writeFileSync('allDaysSteps.csv', CSV)

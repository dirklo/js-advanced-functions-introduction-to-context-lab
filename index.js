function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map((array) => createEmployeeRecord(array));
}

function createTimeInEvent(record, date) {
     return timeEvent(record, date, "in")
}

function createTimeOutEvent(record, date) {
    return timeEvent(record, date, "out")
}

function timeEvent(record, date, type) {
    const { newDate, newHour } = parseDate(date)
    if (type === "in") {
        record.timeInEvents.push({type: "TimeIn", hour: newHour, date: newDate})
    } else {
        record.timeOutEvents.push({type: "TimeOut", hour: newHour, date: newDate})
    }
    return record
}

function hoursWorkedOnDate(record, date) {
    const { newDate } = parseDate(date)
    const startHour = record.timeInEvents.find((x) => x.date === newDate).hour
    const endHour = record.timeOutEvents.find((x) => x.date === newDate).hour
    return (endHour - startHour)/100
}

function parseDate(date) {
    return {
        newDate: `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}`,
        newHour: parseInt(`${date.slice(11, 13)}00`)
    }
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
    let wages = record.timeInEvents.map((clockIn) => wagesEarnedOnDate(record, clockIn.date))
    return wages.reduce((x, sum) => sum += x)
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(record => record.firstName === firstName)
}

function calculatePayroll(records) {
    return records.map(record => allWagesFor(record)).reduce((x, sum) => sum += x)
}


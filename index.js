// Your code here
function createEmployeeRecord(array) {
    let employee = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents:  [],
      timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array) {
    let  employees = []
    array.forEach(el => { 
        let newEmp = createEmployeeRecord(el)
        employees.push(newEmp)
    });
    return employees
}

function createTimeInEvent(employee, dateStamp) {
    let newTime = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    }
    employee.timeInEvents.push(newTime)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let newTime = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    }
    employee.timeOutEvents.push(newTime)
    return employee
}

function hoursWorkedOnDate(employee, dateToFind) {

    let timeInDate  = employee.timeInEvents.find( event => { return event.date === dateToFind })

    let hourIn = timeInDate.hour
    
    let timeOutDate  = employee.timeOutEvents.find( function(event) { 
        return event.date === dateToFind
    })
    
    let hourOut =  timeOutDate.hour
    
    return (hourOut - hourIn) / 100
} 

function wagesEarnedOnDate(employee, dateToFind) {

    let timeInDate  = employee.timeInEvents.find( event => { return event.date === dateToFind })

    let hourIn = timeInDate.hour
    
    let timeOutDate  = employee.timeOutEvents.find( function(event) { 
        return event.date === dateToFind
    })
    
    let hourOut =  timeOutDate.hour
    let hours = (hourOut - hourIn) / 100
    return hours * employee.payPerHour
} 

function allWagesFor(employee) {

    let earningsArray = [];

    employee.timeInEvents.forEach ( inEvent => {
      let outDateObj = employee.timeOutEvents.find( outEvent => {
        return outEvent.date === inEvent.date 
        })
      let hourIn = inEvent.hour  
      let hourOut = outDateObj.hour
      earningsArray.push(
        ( (hourOut - hourIn) / 100) * employee.payPerHour )
      })
      
      return earningsArray.reduce(function(total, element){ return element + total}, 0)
       
}

function calculatePayroll(array) {
    let checks = array.map(employee => { return allWagesFor(employee)})
    return checks.reduce(function(total, element){ return element + total}, 0)
}

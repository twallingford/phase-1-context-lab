//Takes a four-element array of three strings and a number (first name, family name, title, rate per hour)
//Returns an object with the keys firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents
function createEmployeeRecord(employeeArray){
    return {firstName: employeeArray[0], familyName: employeeArray[1], 
        title: employeeArray[2], payPerHour: employeeArray[3], timeInEvents: [], timeOutEvents: []}
}

//Takes array of arrays
//Returns array of objects
//Converts each nested array into an employee record using createEmployeeRecord and puts it in a new array
function createEmployeeRecords(array){
    const employeeRecords =[];
    for(const employee in array){
        employeeRecords.push(createEmployeeRecord(array[employee]));
    }

    return employeeRecords;
}

//Takes a date stamp ("YYYY-MM-DD HHMM") where the time is expressed in 24-hour standard
//Returns an updated record where an object was added to timeInEvents. The object should have the keys type (which is "TimeIn"), hour, and date
function createTimeInEvent(dateStamp){
    const workHour = Number(dateStamp.slice(11));
    const workDate = dateStamp.slice(0,10);

    this.timeInEvents.push({type: "TimeIn", hour: workHour, date: workDate})

    return this
}

//Takes a date stamp ("YYYY-MM-DD HHMM") where the time is expressed in 24-hour standard
//Returns an updated record where an object was added to timeOutEvents. The object should have the keys type (which is "TimeIn"), hour, and date
function createTimeOutEvent(dateStamp){
    const workHour = Number(dateStamp.slice(11));
    const workDate = dateStamp.slice(0,10);

    this.timeOutEvents.push({type: "TimeOut", hour: workHour, date: workDate})

    return this

}

//Takes a date in the form "YYYY-MM-DD"
//Returns hours worked
function hoursWorkedOnDate(workDate){
    let punchIn = 0;
    let punchOut = 0;

    for(const punches in this.timeInEvents){
        if(this.timeInEvents[punches].date === workDate){
            punchIn = this.timeInEvents[punches].hour;
        }
    }
    for(const punches in this.timeOutEvents){
        if(this.timeOutEvents[punches].date === workDate){
            punchOut = this.timeOutEvents[punches].hour;
        }
    }
    return (punchOut-punchIn)/100;
}

//Takes a date in the form "YYYY-MM-DD"
//Returns pay owed
function wagesEarnedOnDate(workDate){
    const hoursWorked = hoursWorkedOnDate.bind(this)
    return hoursWorked(workDate) * this.payPerHour;
}

//Take array of employee records
//Returns sum of pay owed for all employees for all dates
function calculatePayroll(employeeRecords){
    let totalWages = 0;

    for(const employee in employeeRecords){
        totalWages += allWagesFor.call(employeeRecords[employee])
    }
    return totalWages;
}

//Takes an array of employee records and the first name being searched
//Returns matching record or undefined
function findEmployeeByFirstName(srcArray, firstName){
    for(const employee in srcArray){
        if(srcArray[employee].firstName === firstName){
            return srcArray[employee]
        }
        else{
            return undefined 
        }
    }

}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


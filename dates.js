function calculateDate(date, month, year, length){
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate()
    }
    function decrementMonth(amount){
        if(month-amount == 0){
            return 12
        }
        else if ((month-amount) < 10) {
            return '0' + (month-amount)
        }
        else{
            return month-amount
        }
    }
    var monthLength = daysInMonth(month, year)
    var returnDate = date - length

    if (returnDate > 0) {
        returnDate = returnDate > 9 ? month + '-' + returnDate : month + '-0' + returnDate
    }
    else if (returnDate == 0) {
        returnDate = decrementMonth(1) + '-' + daysInMonth(decrementMonth(1), year)
    }
    else if (returnDate < 0) {
        // in case startDate is a negative number add it to monthlength in order to get the correct date
        if (length > 30) {
            // I know this kinda overwrites the fancy code in the rest of the class, but i could not get it the work 
            // when you tried to go back more than 30 days any other way
            var tempDay = parseInt(date)
            var tempMonth = parseInt(month)
            var tempYear = year
            var remainder = length
            var amountToDecrement = 1

            while (remainder > 0) {
                if (remainder > tempDay) {
                    remainder -= tempDay
                    tempDay = daysInMonth(decrementMonth(amountToDecrement), tempYear)
                    amountToDecrement++
                    if (tempMonth == 1) {
                        tempMonth = 12
                        tempYear--
                    }
                    else{
                        tempMonth--
                    }
                }
                else{
                    tempDay -= remainder
                    remainder = 0
                    if (tempDay < 10) {
                        if (tempDay < 1) {
                            tempDay = daysInMonth(decrementMonth(1), tempYear)
                            tempMonth--
                        }
                        else{
                            tempDay = '0' + tempDay
                        }
                    }

                    if (tempMonth < 10) {
                        if (tempMonth < 1) {
                            tempMonth = 12
                            tempYear--
                        }
                        else{
                            tempMonth = '0' + tempMonth
                        }
                    }

                    returnDate = tempMonth + '-' + tempDay
                }
            }
        }
        else{
            if (monthLength + returnDate == 0) {
                returnDate = decrementMonth(1) + '-' + daysInMonth(decrementMonth(1), year)
            }
            returnDate = (monthLength + returnDate) < 10 ? 
                decrementMonth(1) + '-0' + (monthLength + returnDate) : 
                decrementMonth(1) + '-' + (daysInMonth(decrementMonth(1), year) + returnDate)
        }
    }
    // year should only be decremented if we are looking in december
    if (month == 1 && length >= date) {
        return year-1 + '-' + returnDate
    }
    return year + '-' + returnDate
}

module.exports = calculateDate
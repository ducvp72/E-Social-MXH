/**
 * Date from day / month / year
 *
 * @param day    The day of the date
 * @param month  The month of the date
 * @param year   The year of the date
 */
function dateFromDayMonthYear(day, month, year) {
    return new Date(year, month - 1, day, 0, 0, 0, 0);
}

/**
 * Get the years from now
 *
 * @param date  The date to get the years from now
 */
function yearsFromNow(date) {
    return (new Date() - date) / 1000 / 60 / 60 / 24 / 365;
}

/**
 * Gets the age of a person
 *
 * @param birthDate  The date when the person was born
 */
function age(birthDate) {
    return Math.floor(yearsFromNow(birthDate));
}

// console.log(age(dateFromDayMonthYear(7, 12, 2008))); // 10
// console.log(age(dateFromDayMonthYear(17, 12, 2008))); // 9
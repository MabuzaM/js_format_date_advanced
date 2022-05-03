'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromFormatCopy = [...fromFormat];
  const toFormatCopy = [...toFormat];
  const fromSeparator = fromFormatCopy.pop();
  const toSeparator = toFormatCopy.pop();
  const dateToArr = date.split(fromSeparator);
  const newDate = [];
  let year, month, dayNumber;

  for (let i = 0; i < fromFormatCopy.length; i++) {
    switch (fromFormatCopy[i]) {
      case 'YY':
        if (+dateToArr[i] < 30) {
          year = dateToArr[i].padStart(4, '20');
        } else {
          year = dateToArr[i].padStart(4, '19');
        }
        break;

      case 'YYYY':
        year = dateToArr[i];
        break;

      case 'MM':
        month = dateToArr[i];
        break;

      case 'DD':
        dayNumber = dateToArr[i];
        break;

      default:
        throw Error('Date format invalid!');
    }
  }

  for (let i = 0; i < toFormatCopy.length; i++) {
    switch (toFormatCopy[i]) {
      case 'YY':
        newDate.push(year.slice(2));
        break;

      case 'YYYY':
        newDate.push(year);
        break;

      case 'MM':
        newDate.push(month);
        break;

      case 'DD':
        newDate.push(dayNumber);
        break;

      default:
        throw Error('Date format invalid!');
    }
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;

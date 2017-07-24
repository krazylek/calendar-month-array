/**
 * Returns an array of weeks, each containing an array of dates
 *
 * date: Date
 * opts: object {
 *   weekStartDay: int,
 *   formatDate: function(currentDate: Date, info: Object {
 *     dayOfMonth: int, 
 *     siblingMonth:  int,
 *     week: int,
 *     position: int
 *   })
 *   formatSiblingMonthDate: function(currentDate: Date, info: Object)
 *   formatHeader: function(currentDate: Date, position: int)
 * }
 */

module.exports = function (date, opts) {
  if (typeof date === 'string') date = new Date(date)
  if (!date) date = new Date()
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    opts = date
    date = new Date()
  }
  if (!opts) opts = {}

  var first = new Date(date)
  first.setHours(0)
  first.setMinutes(0)
  first.setSeconds(0)
  first.setDate(1)

  var last = new Date(date)
  last.setHours(0)
  last.setMinutes(0)
  last.setSeconds(0)
  last.setMonth(last.getMonth()+1)
  last.setDate(0)

  var weekStartDay = opts.weekStartDay || 0
  var formatDate = opts.formatDate || function (date) { return date }
  var formatSiblingMonthDate = opts.formatSiblingMonthDate || formatDate
  var day = 1 - (7 + first.getDay() - weekStartDay) % 7
  var weeks = Math.ceil((last.getDate() - day) / 7)
  var lines = []
  var headers = []

  for (var w = 0; w < weeks; w++) {
    var row = []
    for (var d = 0; d < 7; d++) {
      var currentDay = day + d
      var currentDate = createDateOffset(first, currentDay)
      var siblingMonth = checkSiblingMonth(currentDay) 
      var format = siblingMonth ? formatSiblingMonthDate : formatDate

      row.push(format(currentDate, {
        dayOfMonth: currentDay, 
        siblingMonth: siblingMonth,
        week: w,
        position: d
      }))

      if(opts.formatHeader && w === 0)
        headers.push(opts.formatHeader(currentDate, d)) 
    }
    day += 7
    lines.push(row)
  }

  if(opts.formatHeader)
    lines.unshift(headers)

  return lines

  function createDateOffset(date, offset) {
    var newDate = new Date(date)
    newDate.setDate(offset)
    return newDate
  }
  
  function checkSiblingMonth(day) {
    return day <= 0 ? -1 :
      day > last.getDate() ? 1 :
      0
  }
}

module.exports = function (monthDate, opts) {
  if (typeof monthDate === 'string') monthDate = new Date(monthDate)
  if (!monthDate) monthDate = new Date()
  if (Object.prototype.toString.call(monthDate) !== '[object Date]') {
    opts = monthDate
    monthDate = new Date()
  }
  if (!opts) opts = {}
  var formatDate = opts.formatDate || function (date) { return date }
  var formatSiblingMonthDate = opts.formatSiblingMonthDate || formatDate
  var weekStartDay = opts.weekStartDay || 0

  var first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  var last = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)

  var monthFirstDayPosition = (7 + first.getDay() - weekStartDay) % 7
  var calendarLastDay =  last.getDate() + monthFirstDayPosition
  var weeks = Math.ceil(calendarLastDay / 7)
  var lines = new Array(weeks)
  var headers = new Array(7)
  var dayOfMonth = 1 - monthFirstDayPosition

  for (var w = 0; w < weeks; w++) {
    var row = new Array(7)
    for (var d = 0; d < 7; d++) {
      var date = offsetDate(first, dayOfMonth)
      var siblingMonth = checkSiblingMonth(dayOfMonth, last.getDate()) 
      var format = siblingMonth ? formatSiblingMonthDate : formatDate

      row[d] = format(date, {
        dayOfMonth: dayOfMonth, 
        siblingMonth: siblingMonth,
        week: w,
        position: d
      })

      if(opts.formatHeader && w === 0)
        headers[d] = opts.formatHeader(date, d)

      dayOfMonth++
    }
    lines[w] = row
  }

  if(opts.formatHeader)
    lines.unshift(headers)

  return lines
  
}

function checkSiblingMonth(day, lastDay) {
  return day <= 0 ? -1 :
    day > lastDay ? 1 :
    0
}

function offsetDate(date, offset) {
  var newDate = new Date(date)
  newDate.setDate(offset)
  return newDate
}


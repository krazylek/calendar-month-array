var calendar = require('../')
var test = require('tape')

var calendarDate = new Date('1995-01-01 00:00:00')
var lastCell = 6

test('proper first day and last day are found', function (t) {
  var date = new Date('2019-01-01 00:00:00')
  var expectedFirstDay = new Date('2018-12-30 00:00:00')
  var expectedLastDay = new Date('2019-02-02 00:00:00')
  var cal = calendar(date)
  t.deepEqual(cal[0][0], expectedFirstDay, 'first cell is 30th of dec')
  t.deepEqual(cal[cal.length-1][6], expectedLastDay, 'last day is 2nd of feb')
  t.end()
})

test('calendar starts on Sunday (default)', function (t) {
  var expectedDay = new Date('1995-01-01 00:00:00') // it's a Sunday
  var expectedCell = 0
  var expectedRow = 0 
  var cal = calendar(calendarDate)
  t.deepEqual(cal[expectedRow][expectedCell], expectedDay, 'default week starts on Sunday')
  t.end()
})

test('calendar starts on Monday with opts.weekStartDay = 1', function (t) {
  var startDay = 1
  var expectedFirstDay = new Date('1994-12-26 00:00:00')
  var firstMonday = new Date('1995-01-02 00:00:00') // it's a Monday
  var expectedCell = 0 
  var expectedRow = 1 // as there is a day before, it comes in second row
  var cal = calendar(calendarDate, { weekStartDay: startDay })
  t.equal(cal[0][0].getDay(), startDay)
  t.deepEqual(cal[0][0], expectedFirstDay, 'first cell is previous month')
  t.deepEqual(cal[expectedRow][expectedCell], firstMonday, 'Mondays are in first col')
  t.end()
})

test('calendar take into account weekStartDay for weeks row', function (t) {
  var startDay = 1
  var expectedRows = 6
  var cal = calendar(new Date(2017, 9), { weekStartDay: startDay })
  t.equal(cal.length, expectedRows)
  t.end()
})

test('calendar last cell contains next month (sometimes)', function (t) {
  var expectedDay = new Date('1995-02-04 00:00:00')
  var cal = calendar(calendarDate)
  var lastRow = cal.length - 1
  t.deepEqual(cal[lastRow][lastCell], expectedDay)
  t.end()
})

test('calendar first row contains headers if formatHeaders is set', function (t) {
  var expectedRows = 6
  var formatHeader = date => date.toString().slice(0,2)
  var expectedDayName = 'Su'
  var cal = calendar(calendarDate, { formatHeader })
  t.equal(cal[0][0], expectedDayName)
  t.equal(cal.length, expectedRows)
  t.end()
})

test('header position is returned', function (t) {
  var expectedRow = [0,1,2,3,4,5,6]
  var formatHeader = (date, pos) => pos
  var cal = calendar(calendarDate, { formatHeader })
  t.deepEqual(cal[0], expectedRow)
  t.end()
})

test('calendar first row does not contains headers if formatHeaders is NOT set', function (t) {
  var expectedRows = 5
  var cal = calendar(calendarDate)
  t.equal(cal.length, expectedRows)
  t.notDeepEqual(cal[0][0], cal[1][0])
  t.end()
})

test('formatDate alters result', function (t) {
  var expectedFirstDayFormatting = '1-1'
  var cal = calendar(calendarDate, { formatDate: date => [date.getMonth() + 1, date.getDate()].join('-') })
  t.equal(cal[0][0], expectedFirstDayFormatting)
  t.end()
})

test('formatDate and formatSiblingMonthDate alters their respective dates', function (t) {
  var expectedFirstDayFormatting = '1-1'
  var expectedLastDayFormatting = 'na'
  var cal = calendar(calendarDate, { 
    formatDate: date => [date.getMonth() + 1, date.getDate()].join('-'),
    formatSiblingMonthDate: () => 'na'
  })
  t.equal(cal[0][0], expectedFirstDayFormatting)
  t.equal(cal[cal.length -1][lastCell], expectedLastDayFormatting)
  t.end()
})

test('formatDate works for sibling month as well if formatSiblingMonthDate is not defined', function (t) {
  var expectedLastDayFormatting = '2-4'
  var cal = calendar(calendarDate, { formatDate: date => [date.getMonth() + 1, date.getDate()].join('-') })
  t.equal(cal[cal.length -1][lastCell], expectedLastDayFormatting)
  t.end()
})

test('formatDate info object is correct', function (t) {
  var expectedFirstDayInfo = {
    dayOfMonth: 1, 
    siblingMonth: 0,
    week: 0,
    position: 0
  }
  var expectedLastDayInfo = { 
    dayOfMonth: 35, 
    siblingMonth: 1,
    week: 4,
    position: 6
  }
  var cal = calendar(calendarDate, { formatDate: (date, info) => info })
  t.deepEqual(cal[0][0], expectedFirstDayInfo)
  t.deepEqual(cal[cal.length -1][lastCell], expectedLastDayInfo)
  t.end()
})

test('formatHeader position is correct', function (t) {
  var expectedFirstDayPosition = 0
  var expectedLastDayPosition = 6
  var cal = calendar(calendarDate, { formatHeader: (date, pos) => pos })
  t.equal(cal[0][0], expectedFirstDayPosition)
  t.equal(cal[0][lastCell], expectedLastDayPosition)
  t.end()
})

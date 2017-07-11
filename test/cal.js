var calendar = require('../')
var test = require('tape')

var calendarDate = new Date('1995-01-01 00:00:00')

test('calendar starts on Sunday (default)', function (t) {
  var expectedDay = new Date('1995-01-01 00:00:00') // it's a Sunday
  var expectedCell = 0
  var expectedRow = 0 
  var cal = calendar(calendarDate)
  t.equal(cal[expectedRow][expectedCell].toISOString(), expectedDay.toISOString(), 'default week starts on Sunday')
  t.end()
})

test('calendar starts on opts.weekStartDay = 1 (Monday), 1st cell could be in previous month', function (t) {
  var expectedFirstDay = new Date('1994-12-26 00:00:00')
  var firstMonday = new Date('1995-01-02 00:00:00') // it's a Monday
  var expectedCell = 0 
  var expectedRow = 1 // as there is a day before, it comes in second row 
  var cal = calendar(calendarDate, { weekStartDay: 1 })
  t.equal(cal[0][0].toISOString(), expectedFirstDay.toISOString(), 'first cell is previous month')
  t.equal(cal[expectedRow][expectedCell].toISOString(), firstMonday.toISOString(), 'Mondays are in first col')
  t.end()
})

test('calendar last cell contains next month (sometimes)', function (t) {
  var expectedDay = new Date('1995-02-04 00:00:00')
  var cal = calendar(calendarDate)
  var lastRow = cal.length - 1
  var lastCell = 6
  t.equal(cal[lastRow][lastCell].toISOString(), expectedDay.toISOString())
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

test('calendar first row does not contains headers if formatHeaders is NOT set', function (t) {
  var expectedRows = 5
  var cal = calendar(calendarDate)
  t.equal(cal.length, expectedRows)
  t.notEqual(cal[0][0].toISOString(), cal[1][0].toISOString(), expectedRows)
  t.end()
})

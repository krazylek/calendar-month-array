var sprintf = require('sprintf')
var calendar = require('../')

var weeks = calendar(new Date(2017, 5), { 
  weekStartDay: 1,
  formatHeader: (date, p) => date.toString().slice(0, 2),
  formatDate: (date, dm, sm) => sprintf('%2d', date.getDate()),
  formatSiblingMonthDate: () => '  '
})

console.log(weeks)

# calendar-month-array

Generates a calendar array with the days of a single month, organized by week.

This is a fork of module [calendar-month-string](https://github.com/substack/calendar-month-string) by Substack. 
The goal is to return a basic date array in place of a formatted string.


# example

``` js
var calendar = require('calendar-month-array')
var weeks = calendar()
console.log(weeks)
```

output:

```
[ [ 2017-05-27T22:00:00.109Z,
    2017-05-28T22:00:00.109Z,
    2017-05-29T22:00:00.109Z,
    2017-05-30T22:00:00.109Z,
    2017-05-31T22:00:00.109Z,
    2017-06-01T22:00:00.109Z,
    2017-06-02T22:00:00.109Z ],
  [ 2017-06-03T22:00:00.109Z,
    2017-06-04T22:00:00.109Z,
    ...
```

NOTE: event if you can't see it on the console, they are `Date` objects, not ISO date strings!


With some formatting and optional headers:

``` js
var sprintf = require('sprintf')
var weeks = calendar(new Date(2017, 5), { 
  weekStartDay: 1,
  formatHeader: date => date.toString().slice(0, 2),
  formatDate: date => sprintf('%2d', date.getDate()),
  formatSiblingMonthDate: () => '  '
})
console.log(weeks)
```

output:

```
[ [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su' ],
  [ '  ', '  ', '  ', ' 1', ' 2', ' 3', ' 4' ],
  [ ' 5', ' 6', ' 7', ' 8', ' 9', '10', '11' ],
  [ '12', '13', '14', '15', '16', '17', '18' ],
  [ '19', '20', '21', '22', '23', '24', '25' ],
  [ '26', '27', '28', '29', '30', '  ', '  ' ] ]
```


# api

``` js
var calendar = require('calendar-month-array')
```

## var weeks = calendar(date, opts)

Return an array of weeks `weeks` for the month given in `date`, a `Date` instance.

* `opts.weekStartDay` - set the first day of week, default 0 (Sunday). Monday would be 1.
* `opts.formatDate(currentDate, dayOfMonth, siblingMonth)` - specify how to format each cell, default is returning Date object.
  * `currentDate` - the date object.
  * `dayOfMonth` - the relative day in the month.
  * `siblingMonth` - the month offset, `-1` for previous, `0` is current, `1` is next.
* `opts.formatSiblingMonthDate(currentDate, dayOfMonth, dayIndex)` - specify how to format cells for sibling month, default use `opts.formatDate`.
* `opts.formatHeader(currentDate, position)` - specify how to format an optional header row (added only if `opts.formatHeader` is defined)
  *  `currentDate` - date object similar to first row of days
  *  `position` - int, cell index


# license

BSD


# install

```
npm install calendar-month-array
```


# See also

- https://github.com/substack/calendar-month-string Original work
- https://github.com/kiltjs/month A list of days in a month
- https://github.com/spatie/calendar-months similar work, requires moment.js
- https://github.com/diegoteixeir4/purecalendar.js

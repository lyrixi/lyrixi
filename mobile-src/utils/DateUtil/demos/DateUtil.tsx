import React from 'react'
import { Page, Card, Divider, DateUtil } from 'lyrixi-mobile'

export default function DateUtilDemo() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>toDate</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              console.log(DateUtil.toDate('2023-10-01 12:01:36'))
              console.log(DateUtil.toDate('12:01:36'))
              console.log(DateUtil.toDate('12:01'))
            }}
          >
            Click to Date
          </div>
        </Card>

        <Card>
          <Divider>Get UTC</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              let zone = DateUtil.timeZonePlaceName()
              console.log('zone:', zone)
              let utcOffset = DateUtil.utcOffset()
              console.log('utcOffset:', utcOffset)
              let utcDescription = DateUtil.stringifyUtcOffset(utcOffset)
              console.log('utcDescription:', utcDescription)
              const sample = new Date('2025-05-09 01:01:36')
              let currentUtcDate = DateUtil.utcToTimeZone(sample, utcOffset)
              console.log('Current date:', DateUtil.format(currentUtcDate, 'YYYY-MM-DD hh:mm:ss'))
              const off8 = DateUtil.parseUtcOffset('UTC+08:00') ?? 0
              const off9 = DateUtil.parseUtcOffset('UTC+09:00') ?? 0
              let utcToTimeZone = DateUtil.utcToTimeZone(sample, off8)
              console.log(
                'Utc to Timezone UTC+8:',
                DateUtil.format(utcToTimeZone, 'YYYY-MM-DD hh:mm:ss')
              )
              let utcToDate2 = DateUtil.timeZoneToTimeZone(sample, off8, off9)
              console.log(
                'Between TimeZones UTC+8 To UTC+9:',
                DateUtil.format(utcToDate2, 'YYYY-MM-DD hh:mm:ss')
              )
              let dateToUtc = DateUtil.timeZoneToUtc(sample, off8)
              console.log('Timezone to Utc:', DateUtil.format(dateToUtc, 'YYYY-MM-DD hh:mm:ss'))
            }}
          >
            Click to get UTC infomation
          </div>
        </Card>

        <Card>
          <Divider>startOrEnd 年/月/周 首末日</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              const base = new Date()
              const yStart = DateUtil.startOrEnd(new Date(base), 'year', 'start')
              const yEnd = DateUtil.startOrEnd(new Date(base), 'year', 'end')
              const mStart = DateUtil.startOrEnd(new Date(base), 'month', 'start')
              const mEnd = DateUtil.startOrEnd(new Date(base), 'month', 'end')
              const wStart = DateUtil.startOrEnd(new Date(base), 'week', 'start')
              const wEnd = DateUtil.startOrEnd(new Date(base), 'week', 'end')
              console.log('Year start:', DateUtil.format(yStart, 'YYYY-MM-DD'))
              console.log('Year end:', DateUtil.format(yEnd, 'YYYY-MM-DD'))
              console.log('Month start:', DateUtil.format(mStart, 'YYYY-MM-DD'))
              console.log('Month end:', DateUtil.format(mEnd, 'YYYY-MM-DD'))
              console.log('Week start (ISO Monday):', DateUtil.format(wStart, 'YYYY-MM-DD'))
              console.log('Week end (ISO Sunday):', DateUtil.format(wEnd, 'YYYY-MM-DD'))
            }}
          >
            Click to test startOrEnd
          </div>
        </Card>

        <Card>
          <Divider>previousWeek / nextWeek</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              const base = new Date()
              const prev = DateUtil.previousWeek(base)
              const next = DateUtil.nextWeek(base)
              console.log('Base:', DateUtil.format(base, 'YYYY-MM-DD'))
              console.log('Previous Week:', DateUtil.format(prev, 'YYYY-MM-DD'))
              console.log('Next Week:', DateUtil.format(next, 'YYYY-MM-DD'))
            }}
          >
            Click to test previousWeek & nextWeek
          </div>
        </Card>

        <Card>
          <Divider>previousMonth / nextMonth</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              const base = new Date('2025-03-31 12:34:56')
              const prev = DateUtil.previousMonth(base)
              const next = DateUtil.nextMonth(base)
              console.log('Base:', DateUtil.format(base, 'YYYY-MM-DD'))
              console.log('Previous Month:', DateUtil.format(prev, 'YYYY-MM-DD'))
              console.log('Next Month:', DateUtil.format(next, 'YYYY-MM-DD'))
            }}
          >
            Click to test previousMonth & nextMonth (edge at month-end)
          </div>
        </Card>

        <Card>
          <Divider>getWeekDates（周起始：周一/周日）</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              const base = new Date()
              const mondayStart = DateUtil.getWeekDates(base, 'Monday')
              const sundayStart = DateUtil.getWeekDates(base)
              console.log(
                'Week (Monday start):',
                (mondayStart ?? []).map((d) => DateUtil.format(d, 'YYYY-MM-DD'))
              )
              console.log(
                'Week (Sunday start):',
                (sundayStart ?? []).map((d) => DateUtil.format(d, 'YYYY-MM-DD'))
              )
            }}
          >
            Click to test getWeekDates
          </div>
        </Card>

        <Card>
          <Divider>getMonthDates（42天网格）</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              const base = new Date()
              const rows = DateUtil.getMonthDates(base, 'Monday')
              console.log(
                'Month grid (first row):',
                rows[0].map(
                  (d) => `${DateUtil.format(d, 'YYYY-MM-DD')}(${d.isCurrent ? 'cur' : 'oth'})`
                )
              )
              console.log('Rows count:', rows.length)
            }}
          >
            Click to test getMonthDates
          </div>
        </Card>

        <Card>
          <Divider>add / compare / diff</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              const base = new Date('2025-05-09 12:00:00')
              const addMonth = DateUtil.add(base, 1, 'month')
              const minusDays = DateUtil.add(base, -3, 'date')
              console.log('Add +1 month:', DateUtil.format(addMonth, 'YYYY-MM-DD'))
              console.log('Add -3 days:', DateUtil.format(minusDays, 'YYYY-MM-DD'))

              const d1 = new Date('2025-05-01 00:00:00')
              const d2 = new Date('2025-05-09 00:00:00')
              console.log('Compare date (d1 vs d2):', DateUtil.compare(d1, d2, 'date'))
              console.log('Compare month (d1 vs d2):', DateUtil.compare(d1, d2, 'month'))

              console.log('Diff days (d1 -> d2):', DateUtil.diff(d1, d2, 'date'))
              console.log('Diff months (d1 -> d2):', DateUtil.diff(d1, d2, 'month'))
            }}
          >
            Click to test add / compare / diff
          </div>
        </Card>

        <Card>
          <Divider>getDaysInMonth / quarter</Divider>
          <div
            style={{ margin: '0 12px' }}
            onClick={() => {
              const base = new Date()
              console.log('Days in month:', DateUtil.getDaysInMonth(base))
              console.log('Quarter:', DateUtil.quarter(base))
            }}
          >
            Click to test getDaysInMonth & quarter
          </div>
        </Card>
      </Page.Main>
    </Page>
  )
}

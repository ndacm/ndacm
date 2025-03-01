<template>
  <div>
    <h1>Upcoming Events</h1>
    <br>
    <ul>
      <li v-for="event in events" :key="event.id">
        <div class = "eventSummary">{{ event.summary }}</div>
        <div class = "eventTime" v-if="event.start && event.end">
          {{ formatEventTime(event.start.dateTime || event.start.date, event.end.dateTime || event.end.date) }}
        </div>
        
        <div v-else>
          No valid start/end date
        </div>
        <br>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY
const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID

const events = ref([])

// format event start/end times.
// given startStr and endStr (ISO strings or date strings),
// returns a string "Monday, March 3, 5:00 – 5:45pm"
function formatEventTime(startStr, endStr) {
  const startDate = new Date(startStr)
  const endDate = new Date(endStr)
  
  // format the date part
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
  const datePart = startDate.toLocaleDateString('en-US', dateOptions)
  
  // format the time parts:
  const timeOptions = { hour: 'numeric', minute: '2-digit' }
  let startTime = startDate.toLocaleTimeString('en-US', timeOptions)
  let endTime = endDate.toLocaleTimeString('en-US', timeOptions)
  
  // remove extra space and convert "PM" to lowercase
  startTime = startTime.replace(' ', '').toLowerCase()
  endTime = endTime.replace(' ', '').toLowerCase()
  
  return `${datePart}, ${startTime} – ${endTime}`
}

onMounted(async () => {
  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}`
    const { data } = await axios.get(url)
    const now = new Date()
    
    // filter out past events and events includes "board" (case-insensitive)
    const upcoming = data.items

      .filter((event) => {
        // exclude events that have "board" in the summary
        if (event.summary && event.summary.toLowerCase().includes('board')) {
          return false
        }

        // for the date/time, use dateTime for timed events or date for all-day events
        const startStr = event.start?.dateTime || event.start?.date
        if (!startStr) return false
        const startDate = new Date(startStr)
        return startDate >= now

      })

      .sort((a, b) => {
        const aStart = new Date(a.start?.dateTime || a.start?.date)
        const bStart = new Date(b.start?.dateTime || b.start?.date)
        return aStart - bStart
      })
      
    events.value = upcoming
  } catch (err) {
    console.error('Error fetching events:', err)
  }
})
</script>

<style scoped>
.eventSummary {
  font-size: 1.5em;
}
.eventTime {
  font-size: 1em;
  font-style: italic;
}
</style>

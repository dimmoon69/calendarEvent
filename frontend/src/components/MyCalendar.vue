<template>
  <div class="calendar">
    <DatePicker
      v-model="date"
      mode="date"
      @dayclick="updateDay"
      is24hr
      :model-config="modelConfig"
    >
    </DatePicker>

  </div>
</template>

<script>
// import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

export default {
  name: 'MyCalendar',
  props: ['events', 'changeDate'],

  data() {
    return {
      date: new Date(),
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
    };
  },
  components: {
    // Calendar,
    DatePicker,
  },
  methods: {
    updateDay() {
      this.changeDate(this.date);
    },
  },

};
</script>

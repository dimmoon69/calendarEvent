<template>
  <div class="home">
          <h4>Current Events</h4>
    <div class="left-block">
    <MyCalendar :events="reqAllEvents()"
                :changeDate="changeDate"
    />
    </div>
    <div class="right-block">
      <ListDateEvents :deleteEvents="deleteEvents" :events="filteredEvents()"/>
      <CreateEventForm :changeDate="selectedDay"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import CreateEventForm from '@/components/CreateEventForm.vue';
import MyCalendar from '@/components/MyCalendar.vue';
import ListDateEvents from '@/components/ListDateEvents.vue';

export default {
  name: 'Home',
  data() {
    return {
      selectedDay: new Date(),
    };
  },
  components: {
    ListDateEvents,
    MyCalendar,
    CreateEventForm,
  },
  mounted() {
    this.$store.dispatch('requestAllEvents');
  },
  methods: {
    reqAllEvents() {
      return this.$store.state.calendarEvents;
    },
    changeDate(data) {
      this.selectedDay = data;
    },
    filteredEvents() {
      return this.$store.getters.filterDate(this.selectedDay);
    },
    deleteEvents(data) {
      this.$store.dispatch('deleteEvent', data);
    },

  },
};
</script>

<style lang="scss">
.home {
  width: 600px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  padding: 45px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
h4 {
  position: absolute;
  margin: 0;
  top: 40px;
}

.right-block {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
}
</style>

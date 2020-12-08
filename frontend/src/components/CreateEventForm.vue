<template>
  <form ref="create_event" class="create_event">
    <ul class="wrapper">
      <li class="form-row">
        <label>название</label>
        <input type="text"
               name="name_event"
               placeholder="Название мероприятия"
               v-model="eventName"
        />
      </li>
      <li class="form-row">
        <label>дата</label>
        <input type="date"
               name="date_start"
               v-model="startDate"/>
      </li>
      <li class="form-row">
        <label>начало</label>
        <input type="time"
               name="time_start"
               v-model="startTime"
        />
      </li>
      <li class="form-row">
        <label>конец</label>
        <input type="time"
               name="time_end"
               v-model="endTime"/>
      </li>
      <li class="form-row">
        <button @click.prevent="saveEvent()">Сохранить мероприятие</button>
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  name: 'CreateEventForm',
  props: ['changeDate'],
  data() {
    return {
      eventName: '',
      startDate: '',
      startTime: '',
      endTime: '',
    };
  },
  watch: {
    changeDate: {
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        this.startDate = val;
      },
    },
  },
  methods: {
    saveEvent() {
      const formData = {
        title: this.eventName,
        date_start: this.startDate,
        start_time: this.startTime,
        end_time: this.endTime,
      };
      this.$store.dispatch('createEvent', formData);
      this.eventName = '';
      this.startDate = '';
      this.startTime = '';
      this.endTime = '';
    },
    updateDay(date) {
      this.startDate = date;
    },

  },

};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #f5f5f5;
  list-style-type: none;
  padding: 0;
  border-radius: 3px;
}

.form-row {
  display: flex;
  justify-content: flex-end;
  padding: .1em;
}

.form-row > label {
  padding: .1em 4em .1em 1em;
  flex: 1;
}

.form-row > input {
  flex: 2;
}

.form-row > input,
.form-row > button {
  padding: .1em .5em;
}

.form-row > button {
  background: #3182ce;
  border-radius: 3px;
  color: white;
  border: 0;
}
</style>

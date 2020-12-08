import http from '@/api';
import Vue from 'vue';
import Vuex from 'vuex';
import {
  EVENTS_REQUEST,
  EVENTS_FAILURE,
  EVENTS_SUCCESS,
  EVENT_REQUEST,
  EVENT_DELETE_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAILURE, EVENT_DONE,
} from './mutation_types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    calendarEvents: [],
    createdEvent: {},
    statusLoading: false,
    eventErrors: [],
    cleanForm: false,
  },
  mutations: {
    [EVENTS_REQUEST](state) {
      state.statusLoading = true;
    },
    [EVENTS_SUCCESS](state, events) {
      state.calendarEvents = events;
      state.statusLoading = false;
    },
    [EVENTS_FAILURE](state, errors) {
      state.eventErrors = errors;
      state.statusLoading = false;
    },
    [EVENT_REQUEST](state) {
      state.statusLoading = true;
    },
    [EVENT_SUCCESS](state, updateEvents) {
      state.createdEvent = updateEvents;
      state.calendarEvents.push(updateEvents);
      state.cleanForm = true;
    },
    [EVENT_DONE](state) {
      state.cleanForm = true;
      state.statusLoading = false;
    },
    [EVENT_FAILURE](state, errors) {
      state.eventErrors = errors;
      state.statusLoading = false;
    },
    // eslint-disable-next-line no-unused-vars
    [EVENT_DELETE_REQUEST](state, e) {
      state.calendarEvents.splice(state.calendarEvents.indexOf(e), 1);
      state.statusLoading = false;
    },

  },
  actions: {
    requestAllEvents({ commit }) {
      commit(EVENTS_REQUEST);
      http.get('/api/planning/')
        .then((response) => {
          const { data } = response;
          commit(EVENTS_SUCCESS, data);
        })
        .catch((errors) => {
          console.log(errors);
          commit(EVENTS_FAILURE);
        });
    },
    createEvent({ commit }, setData) {
      commit(EVENT_REQUEST);
      http.post('/api/planning/', setData)
        .then((response) => {
          const { data } = response;
          commit(EVENT_SUCCESS, data);
          commit(EVENT_DONE);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    deleteEvent({ commit }, event) {
      commit(EVENT_REQUEST);
      http.delete(`/api/planning/${event.id}/`)
        .then((response) => {
          if (response.status === 204) {
            commit(EVENT_DELETE_REQUEST, event);
            commit(EVENTS_REQUEST);
          }
        });
    },
  },
  getters: {
    allEvents(state) {
      return state.calendarEvents;
    },
    filterDate: (state) => (date) => state.calendarEvents.filter((e) => e.date_start === date),
  },
  modules: {},
});

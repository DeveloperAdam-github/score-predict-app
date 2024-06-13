import axios from 'axios';

import { useFetch, useAsyncData } from '#app';

export const useTopGoalScorers = defineStore('topScorers', {
  state: () => ({
    topScorers: [],
    league: 4,
    season: 2020,
  }),
  actions: {
    async fetchTopScorers() {
      try {
        const response = await $fetch('https://api-football-v1.p.rapidapi.com/v3/players/topscorers', {
          method: 'GET',
          params: {
            league: this.league,
            season: this.season,
          },
          headers: {
            'x-rapidapi-key': 'c69655757emshbcbfee81712eaf4p1144bajsnbf04355c2f8e',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          },
        });
        this.topScorers = response.response;
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
  },
});
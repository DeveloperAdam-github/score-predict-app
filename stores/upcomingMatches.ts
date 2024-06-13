import { defineStore } from 'pinia';

export const useUpcomingMatches = defineStore('upcomingMatches', {
  state: () => ({
    upcomingGames: [],
    previousGames: [],
    description: ''
  }),
  actions: {
    async fetchUpcomingFixtures() {
      try {
        const response = await $fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
          method: 'GET',
          params: { league: '4', next: '10', season: '2024' },
          headers: {
            'X-RapidAPI-Key': 'c69655757emshbcbfee81712eaf4p1144bajsnbf04355c2f8e',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
        });

        this.upcomingGames = response.response;
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
    async fetchPreviousFixtures() {
      try {
        const response = await $fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
          method: 'GET',
          params: { league: '4', last: '10', season: '2020' },
          headers: {
            'X-RapidAPI-Key': 'c69655757emshbcbfee81712eaf4p1144bajsnbf04355c2f8e',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
        });
        this.previousGames = response.response;
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  }
});

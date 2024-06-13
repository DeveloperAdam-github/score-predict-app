import axios from 'axios';

import { useFetch, useAsyncData } from '#app';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    gameData: {},
  }),
  actions: {
    async fetchGameData(id) {
        try {
          const response = await $fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${id}`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'c69655757emshbcbfee81712eaf4p1144bajsnbf04355c2f8e',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
          });
  
          this.gameData = response.response[0];
          console.log('getting data?', response.response[0])
        } catch (error) {
          console.error('Fetch error:', error);
        }
      },
  },
});
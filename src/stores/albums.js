import { defineStore } from 'pinia';

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: [],
    photos: [],
    loading: false,
  }),
  actions: {
    async fetchAlbumsAndPhotos() {
      this.loading = true;
      try {
        const [albumsResponse, photosResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/albums'),
          fetch('https://jsonplaceholder.typicode.com/photos')
        ]);

        this.albums = await albumsResponse.json();
        this.photos = await photosResponse.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
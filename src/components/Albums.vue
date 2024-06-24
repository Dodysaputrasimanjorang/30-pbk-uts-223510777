<template>
    <div>
      <h2 class="text-center mt-5">Albums</h2>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-if="!loading && albums.length === 0" class="text-center">No albums available</div>
  
      <ul v-if="!loading && albums.length > 0" class="list-unstyled mt-4">
        <li v-for="album in albums" :key="album.id" class="mb-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title" @click="openAlbum(album.id)">{{ album.title }}</h3>
              <div v-if="activeAlbumId === album.id" class="photos">
                <img 
                  v-for="photo in getPhotos(album.id)" 
                  :key="photo.id" 
                  :src="photo.thumbnailUrl" 
                  :alt="photo.title" 
                  @click="openPhoto(photo.url)"
                  class="thumbnail"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
  
      <q-dialog v-model="isPhotoDialogOpen">
        <q-card>
          <q-card-section>
            <img :src="selectedPhotoUrl" alt="Selected photo" class="full-size-photo">
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
  import { useAlbumsStore } from '../stores/albums';
  
  export default {
    name: 'Albums',
    setup() {
      const albumsStore = useAlbumsStore();
  
      return {
        albums: albumsStore.albums,
        photos: albumsStore.photos,
        loading: albumsStore.loading,
        fetchAlbumsAndPhotos: albumsStore.fetchAlbumsAndPhotos,
        getPhotos: (albumId) => albumsStore.photos.filter(photo => photo.albumId === albumId),
      };
    },
    data() {
      return {
        isPhotoDialogOpen: false,
        selectedPhotoUrl: '',
        activeAlbumId: null
      };
    },
    methods: {
      openAlbum(albumId) {
        this.activeAlbumId = this.activeAlbumId === albumId ? null : albumId;
      },
      openPhoto(url) {
        this.selectedPhotoUrl = url;
        this.isPhotoDialogOpen = true;
      }
    },
    created() {
      this.fetchAlbumsAndPhotos();
    },
  };
  </script>
  
  <style scoped>
  .card-title {
    cursor: pointer;
    color: #007bff;
    text-decoration: underline;
  }
  
  .card-title:hover {
    color: #0056b3;
  }
  
  .photos {
    display: flex;
    flex-wrap: wrap;
  }
  
  .photos img {
    width: 100px;
    height: 100px;
    margin: 5px;
    cursor: pointer;
  }
  
  .full-size-photo {
    width: 100%;
    height: auto;
  }
  </style>
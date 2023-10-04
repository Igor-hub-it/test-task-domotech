<template>
  <div class="content">
    <main>
      <div class="search">
        <input type="text" class="search__input" v-model="searchQuery" placeholder="Поиск">
        <div class="search__icon">
          <img src="search-icon.svg" alt="">
        </div>
      </div>
      <div class="news">
        <div 
          class="post" 
          v-for="post in filteredNews" 
          :key="post.id" 
        >
          <img class="post__img" v-if="post.image" :src="post.image" alt="Post image" />
          <div class="post__text">{{ post.shortText }}</div>
          <div class="post__info">
            <div class="post__icon">icon</div>
            <div class="post__date"
              :style="{ color: post.color }"
            >
            {{ post.datePublish }}</div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="buttons__btn green-btn" @click="() => handleButtonClick('green')">
          <p>Загрузить</p>
          <img src="" alt="">
        </button>
        <button class="buttons__btn pink-btn" @click="() => handleButtonClick('pink')">
          <p>Загрузить</p>
          <img src="pig.svg" alt="">
        </button>
        <button class="buttons__btn orange-btn" @click="() => handleButtonClick('orange')">
          <p>Загрузить</p>
          <img src="pig.svg" alt="">
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import axios from 'axios';

const NEWS_API = "https://domotekhnika.ru/api/v1/news?page=";
const news: Ref<PostType[]> = ref([]);
const pagesLoaded: Ref<number[]> = ref([]); // Массив для хранения номеров загруженных страниц
const searchQuery = ref("");

type PostType = {
  id: number;
  shortText: string;
  page: string;
  image: string;
  datePublish: string;
  color: string;
};

const filteredNews = computed(() => {
  if (searchQuery.value) {
    return news.value.filter((item: any) => 
      item.shortText.includes(searchQuery.value)
    );
  }
  return news.value;
});

const fetchNews = async (page: number, color: string) => {
  try {
    const response = await axios.get(NEWS_API + page);
    const newData = response.data.data.news.map((item: any) => ({
      ...item,
      page: page,
      color: color
    }));

    if (pagesLoaded.value.includes(page)) {
      // Если страница уже была загружена, обновляем цвет
      news.value = news.value.map(item => {
        if (Number(item.page) === page) {
          item.color = color;
        }
        return item;
      });
    } else {
      // Иначе добавляем новые данные
      pagesLoaded.value.push(page);
      pagesLoaded.value.sort((a, b) => a - b);

      let pageIndex = pagesLoaded.value.indexOf(page);

      if (pageIndex === 0) {
        news.value = [...newData, ...news.value];
      } else {
        let prevPage = pagesLoaded.value[pageIndex - 1];
        let foundItem = news.value.find(item => Number(item.page) === prevPage);
        let prevPageLastIndex = foundItem ? news.value.lastIndexOf(foundItem) : -1;
        // let prevPageLastIndex = news.value.lastIndexOf(news.value.find(item => item.page === prevPage));
        news.value = [...news.value.slice(0, prevPageLastIndex + 1), ...newData, ...news.value.slice(prevPageLastIndex + 1)];
      }
    }
  } catch (error) {
    // игнорируем ошибки
  }
};

const handleButtonClick = (color: string) => {
  const page = Math.floor(Math.random() * 10) + 1;
  fetchNews(page, color);
};

// const getPostClass = (color: string) => {
//   // Возвращает класс на основе цвета
//   return `${color}-text`;
// };

// Загрузить 7 страницу при инициализации
fetchNews(7, 'green');
</script>

<style lang="scss" scoped>
.content {
  width: 75%;
  margin: 0 auto;
  @media screen and (max-width: 1347px) {
    width: 90%;
  }
}
main {
  margin-top: 48px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.search {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 2px solid #4D4D4D;
  border-radius: 12px;
  &__input {
    width: 100%;
    padding: 16px 18px;
  }
  &__icon {
    position: absolute;
    right: 16px;
    top: 14px;
  }
}
.news {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 19% 19% 19% 19% 19%;
  column-gap: calc(5%/4);
  @media screen and (max-width: 1092px) {
    grid-template-columns: 24% 24% 24% 24%;
  }
  @media screen and (max-width: 837px) {
    grid-template-columns: 32% 32% 32%;
  }
  @media screen and (max-width: 582px) {
    grid-template-columns: 48% 48%;
    column-gap: 4%;
  }
}
.post {
  margin-top: 15px;
  border: 1px solid #4D4D4D;
  border-radius: 16px;
  @media screen and (max-width: 582px) {
    row-gap: 0;
    margin-bottom: 20px;
  }
  &__img {
    height: 200px;
    width: 100%;
    background: #000;
    border-radius: 15px 15px 0 0;
  }
  &__text {
    max-height: 4.2em;
    padding: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2em;
    box-sizing: border-box;
    font-weight: bold;
  }
  &__info {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  // &__icon {
    
  // }
  &__date {
    font-weight: bold;
  }
}
.buttons {
  width: 100%;
  margin: 26px 0;
  display: flex;
  justify-content: center;
  gap: 2%;
  @media screen and (max-width: 480px) {
    
  }
  &__btn {
    width: 11%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 36px;
    border-radius: 36px;
    color: white;
    font-size: 16px;
  }
  &__btn > p {
    font-size: 16px;
  }
}
.green-btn {
  background: #378B60;
}
.pink-btn {
  background: #FF00B8;
}
.orange-btn {
  background: #FB9600;
}
</style>
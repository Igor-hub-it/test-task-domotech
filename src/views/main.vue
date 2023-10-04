<template>
  <div class="content">
    <main>
      <div class="search">
        <input type="text" class="search__input" v-model="searchQuery" placeholder="Поиск" name="input">
        <div class="search__icon">
          <img src="@/../public/imgs/search-icon.svg" alt="">
        </div>
      </div>
      <div class="news">
        <div 
          class="post" 
          v-for="post in filteredNews" 
          :key="post.id"
          v-show="post.image"
        >
          <img class="post__img" :src="post.image" alt="Post image" />
          <div class="post__text">{{ post.shortText }}</div>
          <div class="post__info">
            <div
              class="post__icon"
              :style="{ color: post.color }"
            >
              <img v-if="post.color == GREEN" src="@/../public/imgs/pigColor.svg" alt="">
              <img v-if="post.color == PINK" src="@/../public/imgs/shockColor.svg" alt="">
              <img v-if="post.color == ORANGE" src="@/../public/imgs/flameColor.svg" alt="">
            </div>
            <div
              class="post__date"
              :style="{ color: post.color }"
            >
            {{ post.datePublish }}</div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="buttons__btn green-btn" @click="() => handleButtonClick(GREEN)">
          <p>Загрузить</p>
          <img src="@/../public/imgs/pigWhite.svg"  alt="">
        </button>
        <button class="buttons__btn pink-btn" @click="() => handleButtonClick(PINK)">
          <p>Загрузить</p>
          <img src="@/../public/imgs/shockWhite.svg" alt="">
        </button>
        <button class="buttons__btn orange-btn full-width" @click="() => handleButtonClick(ORANGE)">
          <p>Загрузить</p>
          <img src="@/../public/imgs/flameWhite.svg" alt="">
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import axios from 'axios';

const GREEN = '#378B60'
const PINK = '#FF00B8'
const ORANGE = '#FB9600'

const NEWS_API = "https://domotekhnika.ru/api/v1/news?page=";
const news: Ref<PostType[]> = ref([]);
const pagesLoaded: Ref<number[]> = ref([]);
const searchQuery = ref<string>("");
const filteredNews = ref<PostType[]>([]);

type PostType = {
  id: number;
  shortText: string;
  page: string;
  image: string;
  datePublish: string;
  color: string;
};

let searchTimeout: number | null = null;

const fetchNews = async (page: number, color: string) => {
  try {
    const response = await axios.get(NEWS_API + page);
    const newData = response.data.data.news.map((item: any) => ({
      ...item,
      page: page,
      color: color,
    }));

    if (pagesLoaded.value.includes(page)) {
      news.value = news.value.map(item => {
        if (Number(item.page) === page) {
          item.color = color;
        }
        return item;
      });
    } else {
      pagesLoaded.value.push(page);
      pagesLoaded.value.sort((a, b) => a - b);
    }

    let rebuiltNews = [];
    for (let loadedPage of pagesLoaded.value) {
      let itemsFromPage = news.value.filter(item => Number(item.page) === loadedPage);
      if (loadedPage === page) {
        itemsFromPage = newData;
      }
      rebuiltNews.push(...itemsFromPage);
    }
    news.value = rebuiltNews;

  } catch (error) {
    console.log(error);
  }
  filteredNews.value = filterNews(searchQuery.value);
};


const handleButtonClick = (color: string) => {
  const page = Math.floor(Math.random() * 10) + 1;
  fetchNews(page, color);
};

function filterNews(query: string) {
  if (query != '') {
    return news.value.filter((item: PostType) => 
      item.shortText.includes(query)
    );
  }
  return news.value;
}

watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  searchTimeout = setTimeout(() => {
    filteredNews.value = filterNews(searchQuery.value);
  }, 200);
});

async function init() {
  await fetchNews(7, GREEN);
  filteredNews.value = filterNews(searchQuery.value);
}

init();

</script>

<style lang="scss" scoped>
.content {
  width: 75%;
  margin: 0 auto;
  @media screen and (max-width: 1347px) {
    width: 90%;
  }
  @media screen and (max-width: 480px) {
    width: 95%;
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
  @media screen and (max-width: 480px) {
    grid-template-columns: 49% 49%;
    column-gap: 2%;
  }
}
.post {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #F5F5F5;
  border: 1px solid #4D4D4D;
  border-radius: 16px;
  @media screen and (max-width: 1092px) {
    margin-top: 12px;
  }
  @media screen and (max-width: 837px) {
    margin-top: 10px;
  }
  @media screen and (max-width: 582px) {
    margin-top: 20px;
  }
  @media screen and (max-width: 480px) {
    margin-top: 10px;
  }
  &__img {
    height: 200px;
    width: 100%;
    background: #000;
    border-radius: 15px 15px 0 0;
  }
  &__text {
    max-height: 4.5em;
    padding: 15px;
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
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__date {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
}
.buttons {
  width: 100%;
  margin: 26px 0;
  display: flex;
  justify-content: center;
  gap: 1.6%;
  &__btn {
    width: 15%;
    padding: 16px 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 36px;
    color: white;
    font-size: 16px;
    @media screen and (max-width: 1092px) {
      width: 18%;
    }
    @media screen and (max-width: 837px) {
      width: 25%;
    }
    @media screen and (max-width: 582px) {
      width: 33%;
    }
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
    gap: 8px;
    &__btn.full-width {
      grid-column: span 2; 
    }
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
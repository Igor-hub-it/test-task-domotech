<template>
  <div class="content">
    <main>
      <div class="search">
        <input type="text" class="search__input" placeholder="Поиск">
        <div class="search__icon">
          <img src="search-icon.svg" alt="">
        </div>
      </div>
      <div class="news">
        <div class="post">
          <div class="post__img"></div>
          <div class="post__text">Lorem ipsum dol reiciendis vitae reprehenderit! Corrupti beatae eaque pariatur praesentium.</div>
          <div class="post__info">
            <div class="post__icon">icon</div>
            <div class="post__date">12-12-2012</div>
          </div>
        </div>
        <div class="post">
          <div class="post__img"></div>
          <div class="post__text">Lorem ipsum dol reiciendis vitae reprehenderit! Corrupti beatae eaque pariatur praesentium.</div>
          <div class="post__info">
            <div class="post__icon">icon</div>
            <div class="post__date">12-12-2012</div>
          </div>
        </div>
        <div class="post">
          <div class="post__img"></div>
          <div class="post__text">Lorem ipsum dol reiciendis vitae reprehenderit! Corrupti beatae eaque pariatur praesentium.</div>
          <div class="post__info">
            <div class="post__icon">icon</div>
            <div class="post__date">12-12-2012</div>
          </div>
        </div>
        <div class="post">
          <div class="post__img"></div>
          <div class="post__text">Lorem ipsum dol reiciendis vitae reprehenderit! Corrupti beatae eaque pariatur praesentium.</div>
          <div class="post__info">
            <div class="post__icon">icon</div>
            <div class="post__date">12-12-2012</div>
          </div>
        </div>
        <div class="post">
          <div class="post__img"></div>
          <div class="post__text">Lorem ipsum dol reiciendis vitae reprehenderit! Corrupti beatae eaque pariatur praesentium.</div>
          <div class="post__info">
            <div class="post__icon">icon</div>
            <div class="post__date">12-12-2012</div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="buttons__btn green-btn">
          <p>Загрузить</p>
          <img src="" alt="">
        </button>
        <button class="buttons__btn pink-btn">
          <p>Загрузить</p>
          <img src="pig.svg" alt="">
        </button>
        <button class="buttons__btn orange-btn">
          <p>Загрузить</p>
          <img src="pig.svg" alt="">
        </button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
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
  gap: calc(5%/4);
  @media screen and (max-width: 1092px) {
    grid-template-columns: 24% 24% 24% 24%;
    gap: calc(4%/3);
  }
  @media screen and (max-width: 837px) {
    grid-template-columns: 32% 32% 32%;
    gap: 2%;
  }
  @media screen and (max-width: 582px) {
    grid-template-columns: 48% 48%;
    column-gap: 4%;
    row-gap: 0;
  }
}
.post {
  border: 1px solid #4D4D4D;
  border-radius: 16px;
  @media screen and (max-width: 582px) {
    grid-template-columns: 48% 48%;
    margin-bottom: 20px;
  }
  &__img {
    height: 100px;
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
    justify-content: space-around;
  }
  &__icon {
    
  }
  &__date {
    font-weight: bold;
  }
}
.buttons {
  width: 100%;
  margin-top: 26px;
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
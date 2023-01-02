export const TEAM_TEXT = {
  artem: {
    prevNameText: `Наш mentor`,
    name: `Артём`,
    gitLink: `https://github.com/RockStar666by`,
    gitImg: `https://avatars.githubusercontent.com/u/52502654?v=4`,
    text: `
      Занимался ревью кода, советы при реализации функционала, координацией команды.
      `,
  },
  dima: {
    prevNameText: `Front-end разработчик и team-leader`,
    name: "Дмитрий",
    gitLink: `https://github.com/OstapchelaEst`,
    gitImg: `https://avatars.githubusercontent.com/u/90386861?v=4`,
    text: `            
      Занимался разработкой гланой страницы, компонентов header и footer, адаптив приложения, авторизация пользователя, общая страница мини-игр, статистика правильных/неправильных ответов в учебнике. Разработал игру аудиовызов.
      Координация команды, ревью кода и фикс багов.  `,
  },
  lena: {
    prevNameText: `Front-end разработчик`,
    name: `Елена`,
    gitLink: `https://github.com/LenaStask`,
    gitImg: "https://avatars.githubusercontent.com/u/96074310?v=4",
    text: `
      Занималась созданием учебника, раздела сложные слова и страницы статистики, написанием запросов на сервер, фикс багов.
      `,
  },
  kirill: {
    prevNameText: `Front-end разработчик`,
    name: "Кирилл",
    gitLink: `https://github.com/teame92`,
    gitImg: `https://avatars.githubusercontent.com/u/50177907?v=4`,
    text: `
      Занимался разработкой игры спринт, запросов на сервер и написанием интерфейсов, фикс багов.
      `,
  },
};

export const FUNCTIONAL_TEXT = {
  vocabulary: {
    authorization: false,
    title: `Учебник`,
    text: `    Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки с удобной
      навигацией.`,
    link: `/vocabulary`,
  },
  statistics: {
    authorization: true,
    title: `Статистика`,
    text: `       
      Отслеживай свой прогресс в индивидуальной статистике, ставь цели и вдохновляйся на достижение
      новых результатов каждый день!
      `,
    link: `/statistics`,
  },
  difficult: {
    authorization: true,
    title: `Словарь`,
    text: ` Создай свой персональный словарь для изучения слов - добавляй слова, которым хочешь уделить
      особое внимание и удаляй, если слово тебе уже известно.`,
    link: `/vocabulary`,
  },
  games: {
    authorization: false,
    title: `Игры`,
    text: `2 увлекательных игры на развитие запоминания слов и восприятия на слух.`,
    link: `/all-games`,
  },
};

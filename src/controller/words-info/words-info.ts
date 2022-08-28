// //import { UserWord } from "../../interfaces/interfaceServerAPI";
// import { UserWord, UserWordContent } from "../../interfaces/interfaceServerAPI";
// import { AUDIO_CALL_GAME } from "../audio-call-game/audio-call-game";
// import { LOCAL_STORAGE } from "../local-storage/local-storage";
// import usersWords from "../services/usersWords";

// class WordsInfo {
//   async uppdateWordInfo(choise: string, nameGame: string) {
//     const NUMBER_WORD = AUDIO_CALL_GAME.wordNumber;
//     const WORD_ID = AUDIO_CALL_GAME.data[NUMBER_WORD].id;
//     const USER_INFO = LOCAL_STORAGE.getDataUser();
//     const ALL_WORDS = await usersWords.getUserWords({
//       token: USER_INFO.token,
//       id: USER_INFO.userId,
//       wordId: WORD_ID,
//     });
//     if (ALL_WORDS.length == 0) {
//       usersWords.createUserWord({
//         token: USER_INFO.token,
//         id: USER_INFO.userId,
//         wordId: WORD_ID,
//         difficulty: choise,
//         // optional: {
//         //   [nameGame]: {
//         //     true: choise === "true" ? 1 : 0,
//         //     false: choise === "true" ? 0 : 1,
//         //   },
//         // },
//       });
//       return;
//     }
//     const IF = this.foundWord(ALL_WORDS, WORD_ID);

//     if (IF) {
//      // this.setOptional(IF, choise, nameGame);
//     } else {
//       usersWords.createUserWord({
//         token: USER_INFO.token,
//         id: USER_INFO.userId,
//         wordId: WORD_ID,
//       });
//       return;
//     }
//   }

//   // setOptional(word: UserWordContent, choise: string, gameName: string) {
//   //   word.difficulty = choise;
//   //   console.log(word);
//   //   //const IF = word.optional;
//   //   // if(IF){
//   //   //   word.optional![gameName as keyof typeof word.optional] = {
//   //   //     true: choise === "true" ? (TRUE_CHOISE ? ++TRUE_CHOISE : 1) :(TRUE_CHOISE ? TRUE_CHOISE : 0) ,
//   //   //     false:choise === "false" ? (FALSE_CHOISE ? ++FALSE_CHOISE : 1) :(FALSE_CHOISE ? FALSE_CHOISE : 0),
//   //   //   }
//   //   // }
//   //   // else{
//   //   //   word.optional[gameName as keyof typeof word.optional] = {
//   //   //     true: choise === "true" ? 1 : 0 ,
//   //   //     false:choise === "false" ? 1 : 0,
//   //   //   }
//   //   // }
//   //   console.log(word);
//   // }

//   foundWord(
//     words: { id: string; wordId: string }[],
//     id: string
//   ): UserWordContent | undefined {
//     for (const word of words) {
//       if (word.wordId === id) return word;
//     }
//     return undefined;
//   }
// }

// export const WORDS_INFO = new WordsInfo();

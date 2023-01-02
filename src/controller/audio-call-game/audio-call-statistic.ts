import { AuthorizationContent } from "../../interfaces/interfaceServerAPI";
import statistic from "../services/usersStatistic";

class AudioCallStatistic {
  async setStatistic(
    UserData: AuthorizationContent,
    bestStreak: number,
    totalCount: number,
    trueCount: number,
    choise: string
  ) {
    const DATE_NOW = new Date().toLocaleDateString("en-US");
    const OPTIONAL = {
      sprint: {
        bestStreak: 0,
        totalCount: 0,
        trueCount: 0,
      },
      audioCall: {
        bestStreak: bestStreak,
        totalCount: totalCount,
        trueCount: trueCount,
      },
    };

    await statistic
      .getStatistics({
        token: UserData.token,
        id: UserData.userId,
      })
      .then((data) => {
        data;
        const RESPONS_OPTIONAL = data.optional;
        const HAS_THIS_DAY = DATE_NOW in RESPONS_OPTIONAL;

        if (HAS_THIS_DAY) {
          RESPONS_OPTIONAL[DATE_NOW].audioCall.bestStreak =
            RESPONS_OPTIONAL[DATE_NOW].audioCall.bestStreak > bestStreak
              ? RESPONS_OPTIONAL[DATE_NOW].audioCall.bestStreak
              : bestStreak;
          RESPONS_OPTIONAL[DATE_NOW].audioCall.totalCount += 1;
          if (choise === "true")
            RESPONS_OPTIONAL[DATE_NOW].audioCall.trueCount += 1;

          statistic.createStatistics({
            token: UserData.token,
            id: UserData.userId,
            optional: RESPONS_OPTIONAL,
          });
        } else {
          RESPONS_OPTIONAL[DATE_NOW] = OPTIONAL;
          statistic.createStatistics({
            token: UserData.token,
            id: UserData.userId,
            optional: RESPONS_OPTIONAL,
          });
        }
      })
      .catch(() => {
        statistic.createStatistics({
          token: UserData.token,
          id: UserData.userId,
          optional: { [DATE_NOW]: OPTIONAL },
        });
      });
  }
}

export const AUDIO_CALL_STATISTIC = new AudioCallStatistic();

import { useState, useEffect } from "react";
import { requestGet } from "../actions/actions";

export type ICurrentUser = {
  id: number;
  role: string;
  hasAcceptedTerms: boolean;
  hasPassedSurvey: boolean;
};

let globalCurrentUser: ICurrentUser | null = null; // сохраняет данные
let hasFetched: boolean = false; // смотрит брался ли запрос уже

export const useCurrentUser = (without?: boolean) => {
  const [tvIds, setTvIds] = useState<ICurrentUser | null>(globalCurrentUser);

  useEffect(() => {
    if (hasFetched) {
      setTvIds(globalCurrentUser);
      return;
    }

    const fetch = async () => {
      try {
        const newCurrentUser: ICurrentUser = await requestGet(`currentUser`);

        if (!newCurrentUser.hasPassedSurvey && !without) {
          const win: Window = window;
          win.location = `${window.location.origin}/survey`;
        } else {
          globalCurrentUser = newCurrentUser;
          setTvIds(newCurrentUser);
          hasFetched = true;
        }
      } catch (error) {
        console.error("Ошибка при выполнении currentUser:", error);
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [without]);

  return tvIds;
};

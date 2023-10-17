import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    handleSecondsPassedChange,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutesAmountFormatted = String(minutesAmount).padStart(2, "0");
  const secondsAmountFormatted = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesAmountFormatted}:${secondsAmountFormatted} | Pomodoro`;
    }
  }, [minutesAmountFormatted, secondsAmountFormatted, activeCycle]);

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDiff >= totalSeconds) {
          markCurrentCycleAsFinished();

          handleSecondsPassedChange(0);

          clearInterval(interval);
        } else {
          handleSecondsPassedChange(secondsDiff);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    handleSecondsPassedChange,
  ]);

  return (
    <CountdownContainer>
      <span>{minutesAmountFormatted[0]}</span>
      <span>{minutesAmountFormatted[1]}</span>
      <Separator>:</Separator>
      <span>{secondsAmountFormatted[0]}</span>
      <span>{secondsAmountFormatted[1]}</span>
    </CountdownContainer>
  );
}

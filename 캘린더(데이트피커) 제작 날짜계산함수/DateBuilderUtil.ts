/***
 * 캘린더 내부 데이터를 만드는데 사용되는 타입 입니다.
 */
type calendarType = {
  date: Dayjs;
  stringFormat: string;
  dayString: string;
  monthString: string;
  dayOfWeek: string;
  type: string;
};
import dayjs, { Dayjs } from "dayjs"; //yarn add dayjs

const TOTAL_SIZE = 42; //한 화면에 보여줄 캘린더 날짜 수
export const DAT_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const DAT_OF_WEEK_KOR = ["일", "월", "화", "수", "목", "금", "토"];

/**
 * 현재 일자를 받아서 1개의 달력 데이터를 완성 합니다.
 * @param dayArray 데이터를 담을 배열 입니다
 * @param arg 입력된 현재 날짜 데이터 입니다.
 */
export const calculateDay = (dayArray: Array<calendarType>, arg?: Dayjs) => {
  //해당 월의 시작요일(숫자값)
  let staticDay = arg?.startOf("month") || dayjs().startOf("month"); //기준일
  let startCursor = staticDay.startOf("month").day();
  const lastDay = Number(staticDay.endOf("month").format("DD")); //해당 월의 마지막 일

  let cursor = 0; //반복문을 돌아야 하는 커서 값
  const lastSize = lastDay + startCursor; //마지막요일 커서에 시작커서를 더해서 총 동작해야되는 횟수

  dayArray.splice(0, dayArray.length);

  //#1. 앞부분 데이터 만들어주기 시작~
  while (cursor < lastSize) {
    const reDay = staticDay.add(-startCursor + cursor, "day");
    dayArray.push({
      date: reDay,
      stringFormat: reDay.format("YYYY-MM-DD"),
      dayString: `${reDay.format("DD")}`,
      monthString: `${reDay.format("MM")}`,
      dayOfWeek: DAT_OF_WEEK[cursor % 7],
      type: -startCursor + cursor < 0 ? "past" : "current",
    });
    cursor += 1;
  }
  //#2. 끝부분 데이터 만들어주기 시작~
  let tailCursor = 0;
  const tailSize = TOTAL_SIZE - dayArray.length;
  let tailDay = staticDay.add(1, "month").startOf("month");
  while (tailSize > 0 && tailCursor < tailSize) {
    const reDay = tailDay.add(tailCursor, "day");

    dayArray.push({
      date: reDay,
      stringFormat: reDay.format("YYYY-MM-DD"),
      dayString: `${reDay.format("DD")}`,
      monthString: `${reDay.format("MM")}`,
      dayOfWeek: DAT_OF_WEEK[(cursor + tailCursor) % 7],
      type: "future",
    });
    tailCursor += 1;
  }
  //console.log(dayArray)
};

import { isEmpty, padStart } from "lodash";
import { Reservation } from "../types/Reservation";
import moment from "moment";
import { DATE_FORMAT } from "./constants";

export const getRange = (fromTime: string, toTime: string) => {
  const fromHour = Number(fromTime.substring(0, 2));
  const toHour = Number(toTime.substring(0, 2));

  const range = [];
  for (let h = fromHour; h < toHour; h++) {
    range.push(padStart(h.toString(), 2, "0"));
  }

  return range;
}

export const getPeriodOfTimes = (reservations: Reservation[] = [], reserveDate: Date | null): string[] => {

  const alreadyReservedTime = new Set();

  if (reserveDate && !isEmpty(reservations)) {
    const formattedReserveDate = moment(reserveDate).format(DATE_FORMAT);
    const filteredReservationPeriodOfTimes = reservations.filter(item => item.reserveDate === formattedReserveDate);

    filteredReservationPeriodOfTimes.forEach(reservation => {
      const range = getRange(reservation.fromTime, reservation.toTime);
      range.forEach(item => alreadyReservedTime.add(item));
    });
  }

  const reserveDateMoment = moment(reserveDate);
  const now = moment();
  const currentHour = reserveDateMoment.get("days") === now.get("days")
    ? now.get("hours") + 1
    : 0;

  const periodOfTimes = [];
  for (let h = (currentHour); h < 24; h++) {
    const fromTime = padStart(h.toString(), 2, "0");

    if (!alreadyReservedTime.has(fromTime)) {
      const endTime = padStart((h + 1).toString(), 2, "0");
      periodOfTimes.push(`${fromTime}:00 ~ ${endTime}:00`);
    }
  }

  return periodOfTimes;
}

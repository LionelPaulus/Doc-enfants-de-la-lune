export class RythmAlarm {
  constructor() {
    this.date = new Date();
    this.day = this.getDay();

    setInterval(() => {
      this.getTime();
    }, 1000);

  }

  getTime() {
    const date = this.date;
    const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    const time = `${date.getHours()}:${minutes}`;

    return time;
  }

  getDay() {
    const date = this.date;
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Dimanche'];
    const months = ['Janvier', 'Février', 'Mars', 'Apvil', 'Mai', 'Juin', 'juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

    return {
      month: date.getMonth() + 1,
      montName: months[date.getMonth()],
      weekDay: date.getDate(),
      weekDayName: days[date.getDay()],
      year: date.getFullYear(),
    };
  }

}

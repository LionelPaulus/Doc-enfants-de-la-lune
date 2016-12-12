export class RythmAlarm {
  constructor(DomNode) {
    const date = new Date();
    this.day = this.getDay(date);
    this.time = this.getTime(date);
    this.$ = this.renderAlarm(DomNode);

    this.interval = setInterval(() => {
      const dateUpdate = new Date();
      this.updateClock(dateUpdate);
    }, 1000);

    this.$.stopBtn.interval = this.interval;
  }

  renderAlarm(DomNode) {
    const alarm = document.createElement('div');
    alarm.className = 'alarm__container';

    const time = document.createElement('div');
    time.className = 'alarm__time';
    time.innerHTML = this.time;

    const day = document.createElement('div');
    day.className = 'alarm__day';
    day.innerHTML = this.day;


    const icon = document.createElement('div');
    icon.className = 'alarm__clock';
    icon.innerHTML = '<img src="dist/media/img/clock_icon.svg">';

    alarm.appendChild(time);
    alarm.appendChild(day);
    alarm.appendChild(icon);




    const stopBtn = document.createElement('button');
    stopBtn.className = 'alarm__stop';
    stopBtn.innerHTML = 'arrêter l’alarme';
    stopBtn.addEventListener('click', this.stopClock);

    alarm.day = day;
    alarm.time = time;
    alarm.icon = icon;
    alarm.stopBtn = stopBtn;

    DomNode.appendChild(alarm);
    DomNode.appendChild(stopBtn);

    return alarm;
  }

  getTime(date) {
    const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    const time = `${date.getHours()}:${minutes}`;

    return time;
  }

  getDay(date) {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Dimanche'];
    const months = ['Janvier', 'Février', 'Mars', 'Apvil', 'Mai', 'Juin', 'juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

    const d = {
      month: date.getMonth() + 1,
      montName: months[date.getMonth()],
      weekDay: date.getDate(),
      weekDayName: days[date.getDay()],
      year: date.getFullYear(),
    };

    return `${d.weekDayName}, ${d.montName} ${d.weekDay}, ${d.year}`;
  }


  updateClock(date) {
    this.$.time.innerHTML = this.getTime(date);
    this.$.day.innerHTML = this.getDay(date);
  }

  stopClock() {
    const interval = this.interval;
    clearInterval(interval);
  }
}

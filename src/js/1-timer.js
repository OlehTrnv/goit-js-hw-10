import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMins = document.querySelector("[data-minutes]");
const dataSecs = document.querySelector("[data-seconds]");

let userSelectedData;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedData = selectedDates[0];
        const currentDate = new Date();
        if (!userSelectedData) {
            startBtn.disabled = true;
            return;
        }
        else if (userSelectedData <= currentDate) {
            iziToast.show({
                message: "Please choose a date in the future",
                timeout: 2000,
                position: "topRight",
                color: 'red'
            });
            startBtn.disabled = true;
            return;
        }
        else if (userSelectedData >= currentDate) {
            startBtn.disabled = false;
            console.log("Choosed date:", userSelectedData);
        }
  },
};

flatpickr(dateTimePicker, options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

startBtn.addEventListener("click", handleClick);

function handleClick(event) {
    startBtn.disabled = true;
    dateTimePicker.disabled = true;

    const intervalId = setInterval(() => {
        const currentDT = new Date();
        let msResult = userSelectedData - currentDT;
        if (msResult <= 0) {
            clearInterval(intervalId);
            dateTimePicker.disabled = false;
            const time = convertMs(msResult);
            updateUI(time);
            return;
        }
        else {
            const time = convertMs(msResult);
            updateUI(time);
        }
    }, 1000)
}

function updateUI(time) {
    dataDays.textContent = addLeadingZero(time.days);
    dataHours.textContent = addLeadingZero(time.hours);    
    dataMins.textContent = addLeadingZero(time.minutes);    
    dataSecs.textContent = addLeadingZero(time.seconds);    
}
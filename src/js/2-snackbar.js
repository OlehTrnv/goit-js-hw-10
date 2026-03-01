import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const formDelay = Number(form.elements.delay.value);
    const radioBtn = form.elements.state.value;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radioBtn === "fulfilled") {
                resolve(formDelay);
            }
            else if (radioBtn === "rejected") {
                reject(formDelay);
            }
        }, formDelay)
    })
        .then((formDelay) => iziToast.show({
            message: `✅ Fulfilled promise in ${formDelay}ms`,
            color: "green",
            position: 'topRight'
        }))
        .catch((formDelay) => iziToast.show({
            message: `❌ Rejected promise in ${formDelay}ms`,
            color: "red",
            position: 'topRight'
    }))
}
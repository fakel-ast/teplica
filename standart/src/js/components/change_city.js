import Modal from "./modal";

class changeCity {
    constructor(citiesList) {
        this.cities  = citiesList.querySelectorAll('.modal__item');
        this.url     = citiesList.dataset.url;

        this.initEvents();

    }

    async initEvents() {
        this.cities.forEach(item => {
           item.addEventListener('click', event => {
               event.preventDefault();
               this.makeChange(event.target);
           })
        });
    }

    async makeChange(city) {
        const newCity = city.dataset.city;
        const phone = city.dataset.phone;
        const address = city.dataset.address;

        document.querySelectorAll('[data-change="city"]').forEach(item => {
            item.innerText = newCity;
        });
        document.querySelectorAll('[data-change="phone"]').forEach(item => {
            item.innerText = phone;
        });
        document.querySelectorAll('[data-change="address"]').forEach(item => {
            item.innerText = address;
        });
        document.querySelectorAll('[data-phone-change]').forEach(item => {
            item.href = `tel:${phone.replaceAll('-', '')}`;
        });

        let modal = document.querySelector('.modal.open');
        modal = new Modal(modal);
        modal.closeModal();
    }
}


const modalCity = document.querySelector('#modal-city');
const citiesList = modalCity.querySelector('.modal__list');


new changeCity(citiesList);



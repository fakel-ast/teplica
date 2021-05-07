const map = document.querySelector('#map');

if (map) {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        let initMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.76, 37.64],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 10,
            controls: ['typeSelector', 'zoomControl']
        });

        let coord = map.dataset.coords;
        let address = map.dataset.address;
        let phone = map.dataset.phone;

        let myPlacemark = new ymaps.Placemark([...coord.split(',')], {
            balloonContentHeader:  `Адрес: ${address}`,
            balloonContentBody: `Телефон: ${phone}`,
            // balloonContentFooter: '8-985-344-76-46',
        });

        window.initMap = initMap

        initMap.geoObjects.add(myPlacemark);
        changeMap();
        // Балун откроется в точке «привязки» балуна — т. е. над меткой.

    }

    window.addEventListener('resize', changeMap)

    function changeMap (event) {
        if (window.screen.width <= 768) {
            window.initMap.controls.remove('zoomControl');
            window.initMap.controls.remove('typeSelector');
        } else {
            window.initMap.controls.add('zoomControl');
            window.initMap.controls.add('typeSelector');
        }
    }

}
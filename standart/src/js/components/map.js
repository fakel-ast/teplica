const map = document.querySelector('#map');

if (map) {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.

    const center = map.dataset.coords.split(',');

    ymaps.ready(init);

    function init() {
        // Создание карты.
        let initMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [...center],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 10,
            controls: ['typeSelector', 'zoomControl']
        });

        let address = map.dataset.address;
        let coords = map.dataset.coords.split(',');
        let balloonText = map.dataset.balloon;

        let myPlacemark = new ymaps.Placemark([...coords], {
            balloonContentHeader: address,
            balloonContentBody: balloonText,
        });

        window.initMap = initMap

        initMap.geoObjects.add(myPlacemark);
        changeMap();
        // Балун откроется в точке «привязки» балуна — т. е. над меткой.

    }

    window.addEventListener('resize', changeMap)

    function changeMap(event) {
        if (window.screen.width <= 768) {
            window.initMap.controls.remove('zoomControl');
            window.initMap.controls.remove('typeSelector');
        } else {
            window.initMap.controls.add('zoomControl');
            window.initMap.controls.add('typeSelector');
        }
    }

}
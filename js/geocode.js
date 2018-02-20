var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
  // Создание экземпляра карты и его привязка к контейнеру с
  // заданным id ("map").
  myMap = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center:[53.906312, 27.557368], // Минск
      zoom:6
  }); 
  
//  function geoHuman(humanWord){
//    var myGeocoder = ymaps.geocode(humanWord);
//    myGeocoder.then(
//      function (res) {
//        alert(res.geoObjects.get(0));
//        myMap.geoObjects.add(res.geoObjects.get(0))
//      },
//      function (err) {
//        alert('Ошибка');
//      });
//  }
  

}


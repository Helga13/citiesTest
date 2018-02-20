$(document).ready(function(){
    
  var citiesList = 'бобруйск, барановичи, борисов, барань, белоозерск, береза, березино, березовка, браслав, брест, быхов, василевичи, верхнедвинск, ветка, вилейка, витебск, волковыск, воложин, высокое, ганцевичи, глубокое, гомель, горки, городок, гродно, дзержинск, дисна, добруш, докшицы, дрогичин, дубровно, дятлово, ельск, жодино, жабинка, житковичи, жлобин, заславль, иваново, ивацевичи, ивье, калинковичи, каменец, кировск, клецк, климовичи, кличев, кобрин, копыль, коссово, костюковичи, кричев, крупки, лепель, лида, логойск, лунинец, любань, ляховичи, мозырь, малорита, микашевичи, минск, миоры, могилев, молодечно, мосты, мстиславль, мядель, новополоцк, наровля, несвиж, новогрудок, новолукомль, орша, осиповичи, ошмяны, пинск, полоцк, петриков, поставы, пружаны, речица, рогачев, светлогорск, свислочь, сенно, скидель, славгород, слоним, слуцк, смолевичи, сморгонь, солигорск, столбцы, столин, толочин, туров, узда, фаниполь, хойники, чаусы, чашники, червень, чериков, чечерск, шклов, щучин';
  
  var citiesArray = citiesList.split(', ');
    
  $('#get_cities').on('click',function(){
    $(this).fadeOut(10);
    $('#cities_available').fadeIn(10);
    var i,
        html = '';
    for(i=0; i<citiesArray.length; i++){
//        console.log(citiesArray[i]);
      html+='<p>'+citiesArray[i]+'</p>'; 
    }
    $('#cities_available').append(html);
  });
  
  var humanList    = [],
      computerList = [];
  
  var humanWord,
      lastChar,
      computerWord,
      availableChar;
  
  $('#step').on('click',function(){
    humanWordFunction();
    computerWordFunction(citiesArray);
    $('#human_city').val('');
  });
  
  function unique(citiesArray) {
    var obj = {};
    for (var n = 0; n < citiesArray.length; n++) {
      var str = citiesArray[n].charAt(0);
      obj[str] = true; // запомнить строку в виде свойства объекта
    }
    return Object.keys(obj);
  }
  
  function humanWordFunction(){ 
    
    // получаем все доступные первые буквы массива citiesArray
    humanWord = $('#human_city').val();
//    console.log(humanWord);
    if (humanWord.length < 2 || humanWord.search(/[\sa-z0-9\!\\"\№\;\%\:\?\*\(\)\_\+\/\\=]+/g) != -1){
      error('Вы ввели неверные данные');
    } else {
      var i;
      for(i=0; i<citiesArray.length; i++){
        if (humanWord === citiesArray[i]) {
          
          help('Следующий ход компьютера');
          humanList.push(humanWord);
          $('#human_list').append(humanWord + '<br>');
          geoHuman();
//          citiesArray.indexOf(humanWord);
//          console.log(citiesArray.indexOf(humanWord));
          citiesArray.splice(citiesArray.indexOf(humanWord), 1);
//          console.log(citiesArray);
          lastChar = humanWord.charAt(humanWord.length-1);
          if(lastChar == 'ё' || lastChar == 'й' || lastChar == 'ъ' || lastChar == 'ы' || lastChar == 'ь' || lastChar == 'э'){
            lastChar = humanWord.charAt(humanWord.length-2);
          } 
          if (unique(citiesArray).indexOf(lastChar) == -1 ){
            gameOver();
          }
          unique(citiesArray);
//          console.log(unique(citiesArray));
          break;
        } else {
          error('Введите город из списка');
        }
        
      }
      
//      console.log(humanList);
//      console.log(computerList);
    }
    return citiesArray;
  }
  
  function computerWordFunction(){
//    console.log(lastChar);
    for(var j=0; j<citiesArray.length; j++){
      var firstChar = citiesArray[j].slice(0,1);
      if ( firstChar == lastChar ){
        computerWord = citiesArray[j];
        computerList.push(computerWord);
        $('#computer_list').append(computerWord + '<br>');
        geoComp();
        help('Ваш ход');
        var lastCharComp = computerWord.charAt(computerWord.length-1);
        if(lastCharComp == 'ё' || lastCharComp == 'й' || lastCharComp == 'ъ' || lastCharComp == 'ы' || lastCharComp == 'ь' || lastCharComp == 'э'){
          lastCharComp = computerWord.charAt(computerWord.length-2);
        }
//        console.log(lastCharComp);
        break;
      } 
    }
  }
  
  function geoHuman(){
    var myGeocoder = ymaps.geocode(humanWord);
    myGeocoder.then(
      function (res) {
        myMap.geoObjects.add(res.geoObjects.get(0))
      },
      function (err) {
        alert('Ошибка');
      });
  }
  
  function geoComp(){
    var myGeocoder = ymaps.geocode(computerWord);
    myGeocoder.then(
      function (res) {
        myMap.geoObjects.add(res.geoObjects.get(0))
      },
      function (err) {
        alert('Ошибка');
      });
  }
  
  $('#game_over').on('click', function(){
    gameOver();
  });
  
  function gameOver(){
    $('.playing_data').fadeOut(10);
    $('#result').fadeIn(10);
    $('.human_result').text(humanList);
    $('.computer_result').text(computerList);

    var hNum = humanList.length,
        cNum = computerList.length;

    $('.human_num').text(hNum);
    $('.computer_num').text(cNum);


    if (hNum > cNum){
      $('.result_message').text('Вы выиграли!');
    } else if (hNum === cNum){
      $('.result_message').text('Ничья!');
    } else {
      $('.result_message').text('Компьютер победил!');
    }
  }
  
  function error(textError){
    textError = textError + ''
    $('#message').html('<span style="color: red">'+textError+'</span>').hide().fadeIn(100)
  }
  
  function help(textHelp){
    textHelp = textHelp + ''
    $('#message').html('<span style="color: green">'+textHelp+'</span>').hide().fadeIn(100)
  }
    


}) //readyend 
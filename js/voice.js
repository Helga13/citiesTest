if (!('webkitSpeechRecognition' in window)){
  console.log("Ваш браузер не поддерживает Web Speech API");
} else {
  console.log("Все гуд");
  
//  создаем объект 
  var voice = new webkitSpeechRecognition();
//   базовые настройки объекта
  voice.lang = 'ru-Ru'; // язык, который будет распозноваться. Значение - lang code
  voice.continuous = true; // не хотим чтобы когда пользователь прикратил говорить, распознование закончилось
  voice. interimResults = true; // хотим видеть промежуточные результаты. Т.е. мы можем некоторое время видеть слова, которые еще не были откорректированы
    voice.onstart = function() {
      console.log("Говорите!");
      $('#button').unbind('click');
      $('#button').bind('click', function(){
        voice.stop();
      });
      $('#button')[0].value = "Остановить распознавание";
    }
    
    voice.stop = function() {
      $('#button').unbind('click');
      $('#button').bind('click', function(){
        voice.start();
      });
      $('#button')[0].value = "Начать распознавание";
    }
    
    voice.onresult = function() {
      
    }
    
//    обработчик ошибок
    
    voice.error = function() {
      console.log("Error!");
    }
    
//    voice.onerror = function(event) {
//      if (event.error == 'no-speech') {
//        console.log('Речь не опознается');
//      }
//      if (event.error == 'audio-capture') {
//        console.log('Отсутствует микрофон!');
//      }
//      if (event.error == 'not-allowed') {
//        console.log('Нет доступа к устройству');
//      }
//      if (event.error == 'aborted') {
//        console.log('Сигнал прерван!');
//      }
//      if (event.error == 'network') {
//        console.log('отсутствует сетевое подключение');
//      }
//      if (event.error == 'service-not-allowed') {
//        console.log('Сервис не доступен');
//      }
//      if (event.error == 'language-not-supported') {
//        console.log('Язык не поддерживается');
//      }
//      if (event.error == 'bad-grammar') {
//        console.log('В школу, неуч!');
//      }
//    };
    
    (function(){
      $('#button').bind( 'click', function(){ 
        voice.start();
        voice.onresult = function(event) {
          var messages = '';
          for(var i = 0; i < event.results.length; i++) {
            messages += event.results[i][0]. transcript;
          }
          $("#messageList").text(messages);
        }
      });
    });
    

  
}

//// Создаем распознаватель
//var recognizer = new webkitSpeechRecognition();
//
//// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
//recognizer.interimResults = true;
//
//// Какой язык будем распознавать?
//recognizer.lang = 'ru-Ru';
//
//// Используем колбек для обработки результатов
//recognizer.onresult = function (event) {
//  var result = event.results[event.resultIndex];
//  if (result.isFinal) {
//    alert('Вы сказали: ' + result[0].transcript);
//  } else {
//    console.log('Промежуточный результат: ', result[0].transcript);
//  }
//};
//
//function speech () {
//  // Начинаем слушать микрофон и распознавать голос
//  recognizer.start();
//}
//
//var synth = window.speechSynthesis;
//var utterance = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');
//
//function talk () {
//  synth.speak (utterance);
//}
//
//function stop () {
//  synth.pause();
//}
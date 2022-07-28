
  Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

  camera = document.getElementById("camera");

Webcam.attach( '#camera' );

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-nn7516Vr/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
      
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    
    document.getElementById("result_object_name").innerHTML = results[0].label;

    gesture = results[0].label;
    
    toSpeak = "";
    
    if(gesture == "thumbs up")
    {
      toSpeak = "That is good";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
    }
    else if(gesture == "wave")
    {
      toSpeak = "hello or goodbye";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128075;";
    }
    else if(gesture == "point")
    {
      toSpeak = "look over there";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#9754;";
    }
    else if(gesture == "okay")
    {
      toSpeak = "I am fine";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
    }
    else if(gesture == "thumbs down")
    {
      toSpeak = "That is bad";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128078;";
    }
    speak();
  }
}


function speak(){
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

}

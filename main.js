Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

Webcam.attach(' #camera ')

function take_snapShot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById('image_result').innerHTML = "<img id='captured_image' src='"+data_uri+"'/>";
    })
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/3S0i5pMPs/model.json", modelLoaded())

function modelLoaded()
{
    console.log("Model Loaded")
}

function check()
{
    img = document.getElementById("image_result");
    classifier.classify(img, gotResult);
    console.log("result");
}

function gotResult(error, results)
{
    if(error) {
        console.log("error")
    }
    else{
        console.log(results)
        document.getElementById("prediction1").innerHTML = results[0].label;
        document.getElementById("prediction2").innerHTML = results[1].label;
        prediction_1 = results[0].label; 
        prediction_2 = results[1].label; 
        speak();
        if(results[0].label == "amazing")
        {
            document.getElementById("emoji1").innerHTML = "👌"
        }
        if(results[0].label == "best")
        {
            document.getElementById("emoji1").innerHTML = "👍"
        }
        if(results[0].label == "victory")
        {
            document.getElementById("emoji1").innerHTML = "✌️"
        }
        if(results[1].label == "amazing")
        {
            document.getElementById("emoji1").innerHTML = "👌"
        }
        if(results[1].label == "best")
        {
            document.getElementById("emoji1").innerHTML = "👍"
        }
        if(results[1].label == "victory")
        {
            document.getElementById("emoji1").innerHTML = "✌️"
        }
    
    }
}

function speak()
{
var synth = window.speechSynthesis;
speak_data1 = "The first prediction is " + prediction_1;
speak_data2 = "And the second prediction is " + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
synth.speak(utterThis);
}
video = "";
var status = "";
objects = [];
results = [];
function preload()
{}
function setup()
{
    canvas = createCanvas(500,400);
    canvas.center();
    video  = createCapture(VIDEO);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_detection").innerHTML = "Status : Detecting Objects ";
    object_name = document.getElementById("name").value;
}
function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}
function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0 , 0 , 500 , 400);
    if(status != "")
    {
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) 
    {
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status_detection").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            noFill();
            stroke("#FF0000");
           
    if(objects[i].label == object_name)
    {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status_detected").innerHTML = object_name + "  has been Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "has been Found");
            synth.speak(utterThis);
    }
    else
    {
            document.getElementById("status_detected").innerHTML = object_name + " has not been Found";
    }          
    }
}
}





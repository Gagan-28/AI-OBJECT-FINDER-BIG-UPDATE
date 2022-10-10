status = "";
NOO = "";
objects = [];

function preload()
{
    
}

function setup()
{
    canvas = createCanvas(480, 360);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    NOO = document.getElementById("name_of_object");
}

function modelLoaded()
{
    console.log("Model is loaded!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
}

function draw()
{
    image(video, 0, 0, 480, 360);
    if(status != "")
    {
        for(i = 0; i > objects.length; i++)
        {
            fill("#FF0000");
            stroke("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == NOO)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(NOO + "found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("found_object").innerHTML = "Object not found";
            }
        }
    }
}
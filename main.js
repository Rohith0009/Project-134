loaded = false;
music = "music.mp3";
objects = []

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
}

function modelloaded() {
  loaded = true;
}

function Start() {
  object_detector = ml5.objectDetector("cocossd", modelloaded);
}

function gotresult(error, results) {
  objects = results;
  console.log(objects);
  console.log(results);
  console.log(error);

}

function draw() {
  image(video, 0, 0, 380, 380);
  if (loaded) {
    object_detector.detect(video, gotresult);
    console.log(objects);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Objects Are Detected!";
      document.getElementById("num_of_obj").innerText = "No Of Objects Detected Are " + objects.length;
      fill("#23aaf2");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke("#23aaf2");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    if (objects[0].label != "person") {
      document.getElementById("baby_status").innerText = "Baby Not Found!";
      music.play();
    } else {
      document.getElementById("baby_status").innerText = "Baby Found!";
      music.pause();
    }
  }
}

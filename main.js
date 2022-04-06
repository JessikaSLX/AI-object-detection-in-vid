video = "";
status1 = "";
objects = [];

function preload() {
  video = createVideo("video.mp4");
  video.hide();

}

function draw() {
  image(video, 0, 0, 350, 300);

  if (status1 != "") {
    objectDetector.detect(video, gotResult);

    for (i=0; i<objects.length; i++) {
      document.getElementById("status").innerHTML="status: objects detected...";
      document.getElementById("noOfObjects").innerHTML="number of objects detected are: " + objects.length;

      fill("#e30048");
      percent = floor(objects[i].confidence*100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke("#6840b8");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }

  console.log(results);
  objects = results;
}

function setup() {
  canvas = createCanvas(350, 300);
  canvas.center();
  
}

function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML="status: Detecting Objects...";
}

function modelLoaded() {
  console.log('Model is loaded...');
  status1 = true;
  video.loop();
  video.speed(1);
  video.volume(1);
}
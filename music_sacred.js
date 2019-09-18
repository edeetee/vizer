// vocal, drum, bass, and other are volumes ranging from 0 to 100
var firstRun = true

const gradients = Array(20).fill(0)
const ellipses = Array(10).fill([0,0])

let maxArr = [90,90,90,80]

function draw_one_frame(vocal, drum, bass, other, count) {
  if(firstRun){
    windowResized()
    firstRun = false;
  }
  colorMode(HSB)
  background(255)
  strokeJoin(ROUND)
  
  let vArr = [vocal, drum, bass, other]
  // maxArr = maxArr.map((oldMax, i) => max(oldMax, vArr[i]))
  let [vocalP, drumP, bassP, otherP] = vArr.map((val, i) => Math.min(1, val/maxArr[i]))

  let cutOff = 0.3
  otherP = Math.max(cutOff, otherP*(1+cutOff))-cutOff

  gradients.push(drumP)
  gradients.shift()
  gradient()


  noFill()
  translate(width/2, height/2)


  let zoomDiff = 0.3
  let expDiff = 0.5
  let rotsDiff = count*0.0003

  console.log(1+rotsDiff*rotsDiff)

  push()
  stroke(255, 0.7)
  scale(1.5)
  sacred(otherP, 4.5+rotsDiff)

  scale(zoomDiff)
  sacred(otherP, -(2.5+Math.pow(rotsDiff, 1+expDiff)))

  scale(zoomDiff)
  sacred(otherP, 1.5+Math.pow(rotsDiff, 1+expDiff*2))

  // scale(zoomDiff)
  // sacred(otherP, -(2+rotsDiff))
  pop()


  ellipses.push([bassP*width*0.8, vocalP*height])
  ellipses.shift()

  stroke(330, 100, 40, 0.6)
  ellipses.forEach((ellipSize,i) => {
    let p = i/ellipses.length
    strokeWeight(p*30)
    ellipse(0, 0, ellipSize[0], ellipSize[1])
  })
}

function sacred(sacredP, rotations, fullRot){
  let size = min(width, height)/2*(1-0.1*sacredP)

  strokeWeight(2*sacredP)
  ellipse(0,0,size*2)

  // strokeWeight(2*sacredP)
  // let size = min(width,height)/2
  // let rotations = floor(count*0.001)+2
  let absRot = Math.abs(rotations)

  push()
  for(let i = 0; i < absRot; i++){
    // line(0,-size, size,0)
    // line(0,-size, -size,0)
    let extendP = sacredP
    triangle(-size,-size, 0,size*extendP, size,-size)
    rotate((fullRot ? rotations : 1/rotations)*360)
  }
  pop()
}

function gradient(){
  noStroke()
  for(let i = 0; i < gradients.length; i++){
    let p = i/gradients.length
    let gradient = gradients[i]
    let hue = map(gradient, 0,1, 30,0)
    let sat = map(gradient, 0,1, 50,90)
    let bright = map(gradient, 0,1, 20, 90)
    fill(hue, sat, bright, 0.9)

    let totHeight = height*(1+2/gradients.length)
    let barHeight = Math.ceil(2*totHeight/gradients.length)
    let barY = totHeight*(1-p)
    rect(0, barY-barHeight, width, barHeight)
  }
}
 
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}
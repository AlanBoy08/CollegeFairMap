// function showFloorDropdown(){
//   var loc = document.getElementById("attend").value
//   document.getElementById("parentdropdown").style.display = "block"
//   document.getElementById("o").style.display = "block"
//   if (loc === "University classes"){
//     document.getElementById("parentdropdown").style.display = "block"
//     document.getElementById("o").style.display = "block"
//     showDaughterDropdown()
//   }
//   else if (loc === "Speaker Session"){
//     document.getElementById("parentdropdown").style.display = "block"
//     document.getElementById("o").style.display = "block"
//     var selectedValue = document.getElementById("parentdropdown").value;
//     var ddropdown = document.getElementById("Downstairs");
//     var udropdown = document.getElementById("Upstairs");
  
//     if (selectedValue === "Downstairs Floor") {
//       ddropdown.style.display = "flex";
//       udropdown.style.display = "none";
//       loadCanvas('GFImage', 'GFFloorCanvas');
//     } else if (selectedValue === "Upstairs Floor") {
//       ddropdown.style.display = "none";
//       udropdown.style.display = "flex";
//       loadCanvas('FFImage', 'FFFloorCanvas');
//     } else {
//       ddropdown.style.display = "none";
//       udropdown.style.display = "none";
//     }
  
//     document.getElementById("result").innerHTML = "";
//     document.getElementById("resultuni").innerHTML = "";
//     document.getElementById("resultf").innerHTML = "Current Floor: " + selectedValue;
//   }
// }
function showDaughterDropdown() {
  // var selectedValue = document.getElementById("parentdropdown").value;
  var ddropdown = document.getElementById("Downstairs");
  // var udropdown = document.getElementById("Upstairs");
  document.getElementById("DD").value = ""
  document.getElementById("UNIV").value = ""
  // if (selectedValue === "Downstairs Floor") {
  ddropdown.style.display = "flex";
    // udropdown.style.display = "none";
  loadCanvas('GFImage', 'GFFloorCanvas');
  // } else if (selectedValue === "Upstairs Floor") {
  //   ddropdown.style.display = "none";
  //   udropdown.style.display = "flex";
  //   loadCanvas('FFImage', 'FFFloorCanvas');
  // } else {
  //   ddropdown.style.display = "none";
  //   udropdown.style.display = "none";
  // }

  document.getElementById("result").innerHTML = "";
  document.getElementById("resultuni").innerHTML = "";
}

function loadCanvas(imageId, canvasId) {
  const img = document.getElementById(imageId);
  const canvas = document.getElementById(canvasId);

  // Set canvas size to match the image size
  canvas.width = img.width;
  canvas.height = img.height;

  const context = canvas.getContext('2d');

  // Clear any previous drawing
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function animateLine(canvasId, startX, startY, endX, endY) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const headLength = 4.389
  const angle = Math.atan2(endY - startY, endX - startX);
  const originalWidth = 1260
  const originalHeight = 858
  const CurrentWidth = canvas.width
  const CurrentHeight = canvas.height
  const scaleX = CurrentWidth/originalWidth
  const scaleY = CurrentHeight/originalHeight
  startX = startX*scaleX
  startY = startY*scaleY
  endX = endX*scaleX
  endY = endY*scaleY
  const distance = Math.hypot(endX - startX, endY - startY);
  const stepSize = 3; // Adjust step size for smoother or faster animation
  let progress = 0;

  function draw() {
    // Clear previous frame
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update progress
    progress += stepSize;

    // Calculate the new endpoint based on progress
    const currentProgress = Math.min(progress / distance, 1);
    const newX = startX + (endX - startX) * currentProgress;
    const newY = startY + (endY - startY) * currentProgress;

    // Draw the line
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(newX, newY);
    context.strokeStyle = 'orange';
    context.lineWidth = 2;
    context.stroke();

    // If the line is fully drawn, draw the arrowhead
    if (currentProgress === 1) {
      context.beginPath();
      context.moveTo(endX, endY);
      context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
      context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
      context.lineTo(endX, endY);
      context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
      context.strokeStyle = 'orange';
      context.stroke();
      context.fillStyle = 'black';
      context.fill();
    }

    // Continue drawing if not done
    if (currentProgress < 1) {
      requestAnimationFrame(draw);
    }
  }

  // Start the animation
  requestAnimationFrame(draw);
}

function animateLinet1(canvasId, startX, startY, tX, tY, endX, endY) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const headLength = 4.389
  const originalWidth = 1260
  const originalHeight = 858
  const CurrentWidth = canvas.width
  const CurrentHeight = canvas.height
  const scaleX = CurrentWidth/originalWidth
  const scaleY = CurrentHeight/originalHeight
  startX = startX*scaleX
  startY = startY*scaleY
  endX = endX*scaleX
  endY = endY*scaleY
  tX = tX*scaleX
  tY = tY*scaleY

  const totalDistance1 = Math.hypot(tX - startX, tY - startY); // Distance for the first segment
  const totalDistance2 = Math.hypot(endX - tX, endY - tY);     // Distance for the second segment

  const stepSize = 3; // You can adjust this for smoother/faster animations
  let progress = 0;
  let phase = 1; // Controls which segment is being drawn

  // Start Animation
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before each frame

    if (phase === 1) {
      // Draw the first segment from (startX, startY) to (tX, tY)
      progress += stepSize;
      const currentProgress = Math.min(progress / totalDistance1, 1);

      const currentX1 = startX + (tX - startX) * currentProgress;
      const currentY1 = startY + (tY - startY) * currentProgress;

      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(currentX1, currentY1);
      context.strokeStyle = 'orange';
      context.lineWidth = 2;;
      context.stroke();

      if (currentProgress >= 1) {
        phase = 2; // Move to the second segment
        progress = 0; // Reset progress for the next segment
      }

    } else if (phase === 2) {
      // Draw the second segment from (tX, tY) to (endX, endY)
      progress += stepSize;
      const currentProgress = Math.min(progress / totalDistance2, 1);

      context.beginPath();
      context.moveTo(startX, startY); // Draw full first segment
      context.lineTo(tX, tY);

      const currentX2 = tX + (endX - tX) * currentProgress;
      const currentY2 = tY + (endY - tY) * currentProgress;

      context.lineTo(currentX2, currentY2);
      context.strokeStyle = 'orange';
      context.lineWidth = 2;;
      context.stroke();

      // If the line is fully drawn, draw the arrowhead
      if (currentProgress === 1) {
        const angle = Math.atan2(endY - tY, endX - tX);

        context.beginPath();
        context.moveTo(endX, endY);
        context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
        context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
        context.lineTo(endX, endY);
        context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
        context.strokeStyle = 'orange';
        context.stroke();
        context.fillStyle = 'black';
        context.fill();
      }
    }

    // Continue drawing if not done
    if (phase === 1 || (phase === 2 && progress / totalDistance2 < 1)) {
      requestAnimationFrame(draw);
    }
  }

  requestAnimationFrame(draw); // Start animation
}
function animateLinet2(canvasId, startX, startY, t1X, t1Y, t2X, t2Y, endX, endY) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const headLength = 4.389
  const originalWidth = 1260
  const originalHeight = 858
  const CurrentWidth = canvas.width
  const CurrentHeight = canvas.height
  const scaleX = CurrentWidth/originalWidth
  const scaleY = CurrentHeight/originalHeight
  startX = startX*scaleX
  startY = startY*scaleY
  endX = endX*scaleX
  endY = endY*scaleY
  t1X = t1X*scaleX
  t1Y = t1Y*scaleY
  t2X = t2X*scaleX
  t2Y = t2Y*scaleY

  const totalDistance1 = Math.hypot(t1X - startX, t1Y - startY); // Distance for the first segment
  const totalDistance2 = Math.hypot(t2X - t1X, t2Y - t1Y);       // Distance for the second segment
  const totalDistance3 = Math.hypot(endX - t2X, endY - t2Y);     // Distance for the third segment

  const stepSize = 3; // You can adjust this for smoother/faster animations
  let progress = 0;
  let phase = 1; // Controls which segment is being drawn

  // Start Animation
  function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before each frame

      if (phase === 1) {
          // Draw the first segment from (startX, startY) to (t1X, t1Y)
          progress += stepSize;
          const currentProgress = Math.min(progress / totalDistance1, 1);

          const currentX1 = startX + (t1X - startX) * currentProgress;
          const currentY1 = startY + (t1Y - startY) * currentProgress;

          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(currentX1, currentY1);
          context.strokeStyle = 'orange';
          context.lineWidth = 2;;
          context.stroke();

          if (currentProgress >= 1) {
              phase = 2; // Move to the second segment
              progress = 0; // Reset progress for the next segment
          }

      } else if (phase === 2) {
          // Draw the second segment from (t1X, t1Y) to (t2X, t2Y)
          progress += stepSize;
          const currentProgress = Math.min(progress / totalDistance2, 1);

          context.beginPath();
          context.moveTo(startX, startY); // Draw full first segment
          context.lineTo(t1X, t1Y);

          const currentX2 = t1X + (t2X - t1X) * currentProgress;
          const currentY2 = t1Y + (t2Y - t1Y) * currentProgress;

          context.lineTo(currentX2, currentY2);
          context.strokeStyle = 'orange';
          context.lineWidth = 2;;
          context.stroke();

          if (currentProgress >= 1) {
              phase = 3; // Move to the third segment
              progress = 0; // Reset progress for the next segment
          }

      } else if (phase === 3) {
          // Draw the third segment from (t2X, t2Y) to (endX, endY)
          progress += stepSize;
          const currentProgress = Math.min(progress / totalDistance3, 1);

          context.beginPath();
          context.moveTo(startX, startY); // Draw full first and second segments
          context.lineTo(t1X, t1Y);
          context.lineTo(t2X, t2Y);

          const currentX3 = t2X + (endX - t2X) * currentProgress;
          const currentY3 = t2Y + (endY - t2Y) * currentProgress;

          context.lineTo(currentX3, currentY3);
          context.strokeStyle = 'orange';
          context.lineWidth = 2;;
          context.stroke();

          // If the line is fully drawn, draw the arrowhead
          if (currentProgress === 1) {
              const angle = Math.atan2(endY - t2Y, endX - t2X);

              context.beginPath();
              context.moveTo(endX, endY);
              context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
              context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
              context.lineTo(endX, endY);
              context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
              context.strokeStyle = 'orange';
              context.stroke();
              context.fillStyle = 'black';
              context.fill();
          }
      }

      // Continue drawing if not done
      if (phase === 1 || phase === 2 || (phase === 3 && progress / totalDistance3 < 1)) {
          requestAnimationFrame(draw);
      }
  }

  requestAnimationFrame(draw); // Start animation
}
function animateLinet3(canvasId, startX, startY, t1X, t1Y, t2X, t2Y, t3X, t3Y, endX, endY) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const headLength = 4.389;
  const originalWidth = 1260;
  const originalHeight = 858;
  const currentWidth = canvas.width;
  const currentHeight = canvas.height;
  const scaleX = currentWidth / originalWidth;
  const scaleY = currentHeight / originalHeight;

  // Scale points
  startX *= scaleX;
  startY *= scaleY;
  t1X *= scaleX;
  t1Y *= scaleY;
  t2X *= scaleX;
  t2Y *= scaleY;
  t3X *= scaleX;
  t3Y *= scaleY;
  endX *= scaleX;
  endY *= scaleY;

  // Calculate total distances for each segment
  const totalDistance1 = Math.hypot(t1X - startX, t1Y - startY);
  const totalDistance2 = Math.hypot(t2X - t1X, t2Y - t1Y);
  const totalDistance3 = Math.hypot(t3X - t2X, t3Y - t2Y);
  const totalDistance4 = Math.hypot(endX - t3X, endY - t3Y);

  const stepSize = 3; // Adjust for smoother/faster animations
  let progress = 0;
  let phase = 1; // Controls which segment is being drawn

  // Start animation
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before each frame

    if (phase === 1) {
      // Draw the first segment from (startX, startY) to (t1X, t1Y)
      progress += stepSize;
      const currentProgress = Math.min(progress / totalDistance1, 1);
      const currentX1 = startX + (t1X - startX) * currentProgress;
      const currentY1 = startY + (t1Y - startY) * currentProgress;

      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(currentX1, currentY1);
      context.strokeStyle = 'orange';
      context.lineWidth = 2;
      context.stroke();

      if (currentProgress >= 1) {
        phase = 2; // Move to the second segment
        progress = 0; // Reset progress for the next segment
      }
    } else if (phase === 2) {
      // Draw the second segment from (t1X, t1Y) to (t2X, t2Y)
      progress += stepSize;
      const currentProgress = Math.min(progress / totalDistance2, 1);
      const currentX2 = t1X + (t2X - t1X) * currentProgress;
      const currentY2 = t1Y + (t2Y - t1Y) * currentProgress;

      context.beginPath();
      context.moveTo(startX, startY); // Draw full first segment
      context.lineTo(t1X, t1Y);
      context.lineTo(currentX2, currentY2);
      context.strokeStyle = 'orange';
      context.lineWidth = 2;
      context.stroke();

      if (currentProgress >= 1) {
        phase = 3; // Move to the third segment
        progress = 0; // Reset progress for the next segment
      }
    } else if (phase === 3) {
      // Draw the third segment from (t2X, t2Y) to (t3X, t3Y)
      progress += stepSize;
      const currentProgress = Math.min(progress / totalDistance3, 1);
      const currentX3 = t2X + (t3X - t2X) * currentProgress;
      const currentY3 = t2Y + (t3Y - t2Y) * currentProgress;

      context.beginPath();
      context.moveTo(startX, startY); // Draw full first and second segments
      context.lineTo(t1X, t1Y);
      context.lineTo(t2X, t2Y);
      context.lineTo(currentX3, currentY3);
      context.strokeStyle = 'orange';
      context.lineWidth = 2;
      context.stroke();

      if (currentProgress >= 1) {
        phase = 4; // Move to the fourth segment
        progress = 0; // Reset progress for the next segment
      }
    } else if (phase === 4) {
      // Draw the fourth segment from (t3X, t3Y) to (endX, endY)
      progress += stepSize;
      const currentProgress = Math.min(progress / totalDistance4, 1);
      const currentX4 = t3X + (endX - t3X) * currentProgress;
      const currentY4 = t3Y + (endY - t3Y) * currentProgress;

      context.beginPath();
      context.moveTo(startX, startY); // Draw full first, second, and third segments
      context.lineTo(t1X, t1Y);
      context.lineTo(t2X, t2Y);
      context.lineTo(t3X, t3Y);
      context.lineTo(currentX4, currentY4);
      context.strokeStyle = 'orange';
      context.lineWidth = 2;
      context.stroke();

      // If the line is fully drawn, draw the arrowhead
      if (currentProgress === 1) {
        const angle = Math.atan2(endY - t3Y, endX - t3X);
        context.beginPath();
        context.moveTo(endX, endY);
        context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
        context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
        context.lineTo(endX, endY);
        context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
        context.strokeStyle = 'orange';
        context.stroke();
        context.fillStyle = 'black';
        context.fill();
      }
    }

    // Continue drawing if not done
    if (phase <= 4 && (phase < 4 || progress / totalDistance4 < 1)) {
      requestAnimationFrame(draw);
    }
  }

  requestAnimationFrame(draw); // Start animation
}


function confirmDownstairsSelection() {
  var selectedfloorval = document.getElementById("DD").value;
  var unidowndropdown = document.getElementById("UNI")
  // var unidropdown = document.getElementById("UP")
  unidowndropdown.style.display = "flex"
  // unidropdown.style.display = "none"
  document.getElementById("resultuni").innerHTML = "";
  document.getElementById("result").innerHTML = "You are near: " + selectedfloorval;
  const canvas = document.getElementById("GFFloorCanvas");
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}
function navigateRoomToRoom(startRoom, endRoom) {
  const canvasId = "GFFloorCanvas";

  const roomCoordinates = {
    "Kiosk 1":{x:499,y:152, corridor:"C2"},
    "Kiosk 2":{x:499,y:363, corridor:"C3"},
    "Kiosk 3":{x:499,y:720, corridor:"C2"},
    "R16":  {x: 464, y: 152, corridor: "C1"},
    "R18":  {x: 420, y: 152, corridor: "C1"},
    "R20":  {x: 376, y: 152, corridor: "C1"},
    "R21":  {x: 330, y: 152, corridor: "C1"},
    "R22":  {x: 285, y: 152, corridor: "C1"},
    "R23":  {x: 1112, y: 109, corridor: "C5"},
    "R24":  {x: 1112, y: 200, corridor: "C5"},
    "Cli":  {x: 721, y: 152, corridor: "C1"},
    "R19":  {x: 376, y: 152, corridor: "C1"},
    "R17": {x: 420, y: 152, corridor: "C1"},
    "R15": {x: 540, y: 152, corridor: "C1"},
    "R14": {x: 540, y: 152, corridor: "C1"},
    "R9": {x: 499, y: 324, corridor: "C2"},
    "R8": {x: 499, y: 401, corridor: "C2"},
    "R6": {x: 499, y: 526, corridor: "C2"},
    "R4": {x: 499, y: 574, corridor: "C2"},
    "R2": {x: 499, y: 657, corridor: "C2"},
    "R1": {x: 499, y: 720, corridor: "C2"},
    "R3": {x: 499, y: 657, corridor: "C2"},
    "R5": {x: 499, y: 574, corridor: "C2"},
    "R7": {x: 499, y: 526, corridor: "C2"},
    "R10": {x: 459, y: 363, corridor: "C3"},
    "R11": {x: 401, y: 363, corridor: "C3"},
    "R12": {x: 343, y: 363, corridor: "C3"},
    "R28": {x: 887, y: 152, corridor: "C1"},
    "R29": {x: 938, y: 152, corridor: "C1"},
    "R13": {x: 343, y: 363, corridor: "C3"},
    "R31": {x: 985, y: 152, corridor: "C1"},
    "R32": {x: 985, y: 152, corridor: "C1"},
    "R33": {x: 1066, y: 152, corridor: "C1"},
    "R34": {x: 1066, y: 152, corridor: "C1"},
    "R25": {x: 845, y: 152, corridor: "C1"},
    "R26": {x: 845, y: 152, corridor: "C1"},
    "R27": {x: 887, y: 152, corridor: "C1"},
    "R30": {x: 938, y: 152, corridor: "C1"},
    "The Staircase":{x: 586, y: 133, corridor: "C4"}
  };

  const turningPoints = {
      "C1_C2": {x: 499, y: 152},  
      "C2_C3": {x: 499, y: 363},  
      "C1_C3_T1": {x: 499, y: 152}, 
      "C1_C3_T2": {x: 499, y: 363},
      "C2_C1": {x: 499, y: 152},
      "C3_C2": {x: 499, y: 363},
      "C1_C4": {x: 586, y: 152},
      "C4_C1": {x: 586, y: 152},
      "C1_C5": {x: 1112, y: 152},
      "C5_C1": {x: 1112, y: 152},
      "C2_C4_T1":{x: 499, y: 152},
      "C2_C4_T2":{x: 586, y: 152},
      "C2_C5_T1":{x: 499, y: 152},
      "C2_C5_T2":{x: 1112, y: 152},
      "C3_C4_T1":{x: 499, y: 363},
      "C3_C4_T2":{x: 499, y: 152},
      "C3_C4_T3":{x: 586, y: 152},
      "C3_C5_T1":{x: 499, y: 363},
      "C3_C5_T2":{x: 499, y: 152},
      "C3_C5_T3":{x: 1112, y: 152},
      "C4_C5_T1":{x: 586, y: 152},
      "C4_C5_T2":{x: 1112, y: 152},

  };

  const start = roomCoordinates[startRoom];
  const end = roomCoordinates[endRoom];

  if (start.corridor === end.corridor) {
      animateLine(canvasId, start.x, start.y, end.x, end.y);
  } else if (
      (start.corridor === "C1" && end.corridor === "C2") || 
      (start.corridor === "C2" && end.corridor === "C1") ||
      (start.corridor === "C2" && end.corridor === "C3") ||
      (start.corridor === "C3" && end.corridor === "C2") ||
      (start.corridor === "C4" && end.corridor === "C1") ||
      (start.corridor === "C1" && end.corridor === "C4") || 
      (start.corridor === "C5" && end.corridor === "C1") ||
      (start.corridor === "C1" && end.corridor === "C5")
  ) {
      
      const turningPoint = turningPoints[`${start.corridor}_${end.corridor}`];
      animateLinet1(canvasId, start.x, start.y, turningPoint.x, turningPoint.y, end.x, end.y);
  } else if (
      (start.corridor === "C1" && end.corridor === "C3")  || (start.corridor === "C2" && end.corridor === "C4") || (start.corridor === "C2" && end.corridor === "C5") || (start.corridor === "C4" && end.corridor === "C5")
  ) {
      
      const turningPoint1 = turningPoints[`${start.corridor}_${end.corridor}_T1`];
      const turningPoint2 = turningPoints[`${start.corridor}_${end.corridor}_T2`];
      animateLinet2(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, end.x, end.y);
  }
    else if(
      (start.corridor === "C3" && end.corridor === "C1") ||  (start.corridor === "C4" && end.corridor === "C2") ||  (start.corridor === "C5" && end.corridor === "C2") || (start.corridor === "C5" && end.corridor === "C4")
    ){
      const turningPoint1 = turningPoints[`${end.corridor}_${start.corridor}_T2`];
      const turningPoint2 = turningPoints[`${end.corridor}_${start.corridor}_T1`];
      animateLinet2(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, end.x, end.y);
  } 
    else if(
      (start.corridor === "C3" && end.corridor === "C4") || (start.corridor === "C3" && end.corridor === "C5")
    ){
      const turningPoint1 = turningPoints[`${start.corridor}_${end.corridor}_T1`];
      const turningPoint2 = turningPoints[`${start.corridor}_${end.corridor}_T2`];
      const turningPoint3 = turningPoints[`${start.corridor}_${end.corridor}_T3`];
      animateLinet3(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, turningPoint3.x, turningPoint3.y, end.x, end.y);
  }
  else if(
    (start.corridor === "C4" && end.corridor === "C3") || (start.corridor === "C5" && end.corridor === "C3")
    ){
      const turningPoint1 = turningPoints[`${end.corridor}_${start.corridor}_T3`];
      const turningPoint2 = turningPoints[`${end.corridor}_${start.corridor}_T2`];
      const turningPoint3 = turningPoints[`${end.corridor}_${start.corridor}_T1`];
      animateLinet3(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, turningPoint3.x, turningPoint3.y, end.x, end.y);
    }
}

// function confirmUpstairsSelection(){
//   var selectedfloorval = document.getElementById("UD").value;
//   var unidowndropdown = document.getElementById("UNI")
//   var unidropdown = document.getElementById("UP")
//   unidowndropdown.style.display = "none"
//   unidropdown.style.display = "flex"
//   document.getElementById("resultuni").innerHTML = "";
//   document.getElementById("result").innerHTML = "You are near: " + selectedfloorval;
//   const canvas = document.getElementById("FFFloorCanvas");
//   const context = canvas.getContext('2d');
//   context.clearRect(0, 0, canvas.width, canvas.height);
// }
// function navigateRoomToRoomup(startRoom,endRoom){
//   const canvasId = "FFFloorCanvas";

//   const roomCoordinates = {
//     "Kiosk 1":{x:499,y:152, corridor:"C2"},
//     "Kiosk 2":{x:499,y:363, corridor:"C3"},
//     "Kiosk 3":{x:499,y:720, corridor:"C2"},
//     "R1":  {x: 464, y: 152, corridor: "C1"},
//     "R2":  {x: 420, y: 152, corridor: "C1"},
//     "R3":  {x: 376, y: 152, corridor: "C1"},
//     "R4":  {x: 330, y: 152, corridor: "C1"},
//     "R5":  {x: 285, y: 152, corridor: "C1"},
//     "R6":  {x: 241, y: 152, corridor: "C1"},
//     "R7":  {x: 195, y: 152, corridor: "C1"},
//     "R8":  {x: 195, y: 152, corridor: "C1"},
//     "R9":  {x: 499, y: 152, corridor: "C1"},
//     "R10": {x: 420, y: 152, corridor: "C1"},
//     "R11": {x: 464, y: 152, corridor: "C1"},
//     "R12": {x: 540, y: 152, corridor: "C1"},
//     "R13": {x: 540, y: 152, corridor: "C1"},
//     "R14": {x: 499, y: 324, corridor: "C2"},
//     "R15": {x: 499, y: 401, corridor: "C2"},
//     "R16": {x: 499, y: 526, corridor: "C2"},
//     "R17": {x: 499, y: 574, corridor: "C2"},
//     "R18": {x: 499, y: 657, corridor: "C2"},
//     "R19": {x: 499, y: 720, corridor: "C2"},
//     "R20": {x: 499, y: 720, corridor: "C2"},
//     "R21": {x: 499, y: 657, corridor: "C2"},
//     "R22": {x: 499, y: 574, corridor: "C2"},
//     "R23": {x: 499, y: 526, corridor: "C2"},
//     "R24": {x: 499, y: 450, corridor: "C2"},
//     "R25": {x: 459, y: 363, corridor: "C3"},
//     "R26": {x: 401, y: 363, corridor: "C3"},
//     "R27": {x: 343, y: 363, corridor: "C3"},
//     "R28": {x: 229, y: 363, corridor: "C3"},
//     "R29": {x: 167, y: 363, corridor: "C3"},
//     "R30": {x: 343, y: 363, corridor: "C3"},
//     "R31": {x: 289, y: 363, corridor: "C3"},
//     "R32": {x: 229, y: 363, corridor: "C3"},
//     "R33": {x: 167, y: 363, corridor: "C3"}
//   };

  
//   const turningPoints = {
//       "C1_C2": {x: 499, y: 152}, 
//       "C2_C3": {x: 499, y: 363},  
//       "C1_C3_T1": {x: 499, y: 152},
//       "C1_C3_T2": {x: 499, y: 363},
//       "C2_C1": {x: 499, y: 152},
//       "C3_C2": {x: 499, y: 363},
//       "C3_C1_T1": {x: 499, y: 363},
//       "C3_C1_T2": {x: 499, y: 152}
//   };

//   const start = roomCoordinates[startRoom];
//   const end = roomCoordinates[endRoom];

//   if (start.corridor === end.corridor) {
     
//       animateLine(canvasId, start.x, start.y, end.x, end.y);
//   } else if (
//       (start.corridor === "C1" && end.corridor === "C2") || 
//       (start.corridor === "C2" && end.corridor === "C1") ||
//       (start.corridor === "C2" && end.corridor === "C3") ||
//       (start.corridor === "C3" && end.corridor === "C2")
//   ) {
      
//       const turningPoint = turningPoints[`${start.corridor}_${end.corridor}`];
//       animateLinet1(canvasId, start.x, start.y, turningPoint.x, turningPoint.y, end.x, end.y);
//   } else if (
//       (start.corridor === "C1" && end.corridor === "C3") 
//   ) {
      
//       const turningPoint1 = turningPoints["C1_C3_T1"];
//       const turningPoint2 = turningPoints["C1_C3_T2"];
//       animateLinet2(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, end.x, end.y);
//   }
//     else if(
//       (start.corridor === "C3" && end.corridor === "C1")
//     ){
//       const turningPoint1 = turningPoints["C3_C1_T1"];
//       const turningPoint2 = turningPoints["C3_C1_T2"];
//       animateLinet2(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, end.x, end.y);
//   }
// }
function confirmUNISelection(){
  var start = document.getElementById("DD").value;
  var end = document.getElementById("UNIV").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}
// function confirmUNIupSelection(){
//   var start = document.getElementById("UD").value;
//   var end = document.getElementById("UPuni").value;
//   document.getElementById("resultuni").innerHTML = start + " to: " + end;
// }
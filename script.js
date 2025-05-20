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

function animateLineT4(canvasId, startX, startY, t1X, t1Y, t2X, t2Y, t3X, t3Y, t4X, t4Y, endX, endY) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const headLength = 4.389;
  const originalWidth = 1260;
  const originalHeight = 858;
  const scaleX = canvas.width / originalWidth;
  const scaleY = canvas.height / originalHeight;

  [startX, t1X, t2X, t3X, t4X, endX] = [startX, t1X, t2X, t3X, t4X, endX].map(x => x * scaleX);
  [startY, t1Y, t2Y, t3Y, t4Y, endY] = [startY, t1Y, t2Y, t3Y, t4Y, endY].map(y => y * scaleY);

  const points = [[startX, startY], [t1X, t1Y], [t2X, t2Y], [t3X, t3Y], [t4X, t4Y], [endX, endY]];
  const distances = [];
  for (let i = 0; i < points.length - 1; i++) {
    distances.push(Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]));
  }

  let progress = 0;
  let phase = 1;
  const stepSize = 3;

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let drawnPoints = [points[0]];

    for (let i = 1; i < phase; i++) {
      drawnPoints.push(points[i]);
    }

    progress += stepSize;
    const currDist = distances[phase - 1];
    const pct = Math.min(progress / currDist, 1);
    const [x1, y1] = points[phase - 1];
    const [x2, y2] = points[phase];
    drawnPoints.push([
      x1 + (x2 - x1) * pct,
      y1 + (y2 - y1) * pct
    ]);

    context.beginPath();
    context.moveTo(drawnPoints[0][0], drawnPoints[0][1]);
    for (let i = 1; i < drawnPoints.length; i++) {
      context.lineTo(drawnPoints[i][0], drawnPoints[i][1]);
    }
    context.strokeStyle = 'orange';
    context.lineWidth = 2;
    context.stroke();

    if (pct >= 1) {
      phase++;
      progress = 0;
    }

    if (phase <= 5) {
      requestAnimationFrame(draw);
    } else if (pct >= 1) {
      const angle = Math.atan2(endY - t4Y, endX - t4X);
      context.beginPath();
      context.moveTo(endX, endY);
      context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
      context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
      context.closePath();
      context.strokeStyle = 'orange';
      context.stroke();
      context.fillStyle = 'black';
      context.fill();
    }
  }

  requestAnimationFrame(draw);
}

function animateLineT5(canvasId, startX, startY, t1X, t1Y, t2X, t2Y, t3X, t3Y, t4X, t4Y, t5X, t5Y, endX, endY) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const headLength = 4.389;
  const originalWidth = 1260;
  const originalHeight = 858;
  const scaleX = canvas.width / originalWidth;
  const scaleY = canvas.height / originalHeight;

  [startX, t1X, t2X, t3X, t4X, t5X, endX] = [startX, t1X, t2X, t3X, t4X, t5X, endX].map(x => x * scaleX);
  [startY, t1Y, t2Y, t3Y, t4Y, t5Y, endY] = [startY, t1Y, t2Y, t3Y, t4Y, t5Y, endY].map(y => y * scaleY);

  const points = [[startX, startY], [t1X, t1Y], [t2X, t2Y], [t3X, t3Y], [t4X, t4Y], [t5X, t5Y], [endX, endY]];
  const distances = [];
  for (let i = 0; i < points.length - 1; i++) {
    distances.push(Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]));
  }

  let progress = 0;
  let phase = 1;
  const stepSize = 3;

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let drawnPoints = [points[0]];

    for (let i = 1; i < phase; i++) {
      drawnPoints.push(points[i]);
    }

    progress += stepSize;
    const currDist = distances[phase - 1];
    const pct = Math.min(progress / currDist, 1);
    const [x1, y1] = points[phase - 1];
    const [x2, y2] = points[phase];
    drawnPoints.push([
      x1 + (x2 - x1) * pct,
      y1 + (y2 - y1) * pct
    ]);

    context.beginPath();
    context.moveTo(drawnPoints[0][0], drawnPoints[0][1]);
    for (let i = 1; i < drawnPoints.length; i++) {
      context.lineTo(drawnPoints[i][0], drawnPoints[i][1]);
    }
    context.strokeStyle = 'orange';
    context.lineWidth = 2;
    context.stroke();

    if (pct >= 1) {
      phase++;
      progress = 0;
    }

    if (phase <= 6) {
      requestAnimationFrame(draw);
    } else if (pct >= 1) {
      const angle = Math.atan2(endY - t5Y, endX - t5X);
      context.beginPath();
      context.moveTo(endX, endY);
      context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
      context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
      context.closePath();
      context.strokeStyle = 'orange';
      context.stroke();
      context.fillStyle = 'black';
      context.fill();
    }
  }

  requestAnimationFrame(draw);
}


function animateLineT6(canvasId, startX, startY, t1X, t1Y, t2X, t2Y, t3X, t3Y, t4X, t4Y, t5X, t5Y, t6X, t6Y, endX, endY) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const headLength = 4.389;
  const originalWidth = 1260;
  const originalHeight = 858;
  const scaleX = canvas.width / originalWidth;
  const scaleY = canvas.height / originalHeight;

  [startX, t1X, t2X, t3X, t4X, t5X, t6X, endX] = [startX, t1X, t2X, t3X, t4X, t5X, t6X, endX].map(x => x * scaleX);
  [startY, t1Y, t2Y, t3Y, t4Y, t5Y, t6Y, endY] = [startY, t1Y, t2Y, t3Y, t4Y, t5Y, t6Y, endY].map(y => y * scaleY);

  const points = [[startX, startY], [t1X, t1Y], [t2X, t2Y], [t3X, t3Y], [t4X, t4Y], [t5X, t5Y], [t6X, t6Y], [endX, endY]];
  const distances = [];
  for (let i = 0; i < points.length - 1; i++) {
    distances.push(Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]));
  }

  let progress = 0;
  let phase = 1;
  const stepSize = 3;

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let drawnPoints = [points[0]];

    for (let i = 1; i < phase; i++) {
      drawnPoints.push(points[i]);
    }

    progress += stepSize;
    const currDist = distances[phase - 1];
    const pct = Math.min(progress / currDist, 1);
    const [x1, y1] = points[phase - 1];
    const [x2, y2] = points[phase];
    drawnPoints.push([
      x1 + (x2 - x1) * pct,
      y1 + (y2 - y1) * pct
    ]);

    context.beginPath();
    context.moveTo(drawnPoints[0][0], drawnPoints[0][1]);
    for (let i = 1; i < drawnPoints.length; i++) {
      context.lineTo(drawnPoints[i][0], drawnPoints[i][1]);
    }
    context.strokeStyle = 'orange';
    context.lineWidth = 2;
    context.stroke();

    if (pct >= 1) {
      phase++;
      progress = 0;
    }

    if (phase <= 7) {
      requestAnimationFrame(draw);
    } else if (pct >= 1) {
      const angle = Math.atan2(endY - t6Y, endX - t6X);
      context.beginPath();
      context.moveTo(endX, endY);
      context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
      context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
      context.closePath();
      context.strokeStyle = 'orange';
      context.stroke();
      context.fillStyle = 'black';
      context.fill();
    }
  }

  requestAnimationFrame(draw);
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
    "R1":  {x: 1083, y: 286, corridor: "C1"},
    "R2":  {x: 1083, y: 286, corridor: "C1"},
    "R3":  {x: 1007, y: 286, corridor: "C1"},
    "R4":  {x: 1007, y: 286, corridor: "C1"},
    "R5":  {x: 957, y: 286, corridor: "C1"},
    "R6":  {x: 957, y: 286, corridor: "C1"},
    "R7":  {x: 911, y: 286, corridor: "C1"},
    "R8":  {x: 911, y: 286, corridor: "C1"},
    "R9":  {x: 863, y: 286, corridor: "C1"},
    "R10":  {x: 863, y: 286, corridor: "C1"},
    "R11":  {x: 804, y: 286, corridor: "C1"},
    "R12":  {x: 718, y: 286, corridor: "C1"},
    "R13":  {x: 718, y: 286, corridor: "C1"},
    "R14":  {x: 688, y: 286, corridor: "C1"},
    "R15":  {x: 630, y: 286, corridor: "C1"},
    "R16":  {x: 706, y: 286, corridor: "C1"},
    "R17":  {x: 554, y: 286, corridor: "C1"},
    "R18":  {x: 300, y: 286, corridor: "C1"},
    "R19":  {x: 346, y: 286, corridor: "C1"},
    "R20":  {x: 392, y: 286, corridor: "C1"},
    "R21":  {x: 392, y: 286, corridor: "C1"},
    "R22":  {x: 436, y: 286, corridor: "C1"},
    "R23":  {x: 436, y: 286, corridor: "C1"},
    "R24":  {x: 466, y: 286, corridor: "C1"},
    "R25":  {x: 554, y: 286, corridor: "C1"},
    "R26":  {x: 466, y: 286, corridor: "C1"},
    "R27":  {x: 300, y: 286, corridor: "C1"},
    "R28":  {x: 257, y: 286, corridor: "C1"},
    "R29":  {x: 206, y: 286, corridor: "C1"},
    "R30":  {x: 206, y: 286, corridor: "C1"},
    "R31":  {x: 1120, y: 260, corridor: "C5"},
    "R32":  {x: 1120, y: 317, corridor: "C5"},
    "R33":  {x: 1120, y: 189, corridor: "C5"},
    "R34":  {x: 1120, y: 163, corridor: "C5"},
    "R35":  {x: 1120, y: 163, corridor: "C5"},
    "R36":  {x: 1120, y: 140, corridor: "C5"},
    "R37":  {x: 1120, y: 140, corridor: "C5"},
    "R38":  {x: 1120, y: 110, corridor: "C5"},
    "R39":  {x: 1120, y: 110, corridor: "C5"},
    "R40":  {x: 1120, y: 73, corridor: "C5"},
    "R41":  {x: 1120, y: 73, corridor: "C5"},
    "R42":  {x: 1120, y: 42, corridor: "C5"},
    "R43":  {x: 1120, y: 452, corridor: "C5"},
    "R44":  {x: 1120, y: 452, corridor: "C5"},
    "R45":  {x: 1120, y: 493, corridor: "C5"},
    "R46":  {x: 1120, y: 493, corridor: "C5"},
    "R47":  {x: 1120, y: 539, corridor: "C5"},
    "R48":  {x: 1120, y: 539, corridor: "C5"},
    "R49":  {x: 1120, y: 607, corridor: "C5"},
    "R50":  {x: 1120, y: 607, corridor: "C5"},
    "R51":  {x: 1120, y: 648, corridor: "C5"},
    "R52":  {x: 1120, y: 648, corridor: "C5"},
    "R53":  {x: 1120, y: 707, corridor: "C5"},
    "R54":  {x: 1120, y: 707, corridor: "C5"},
    "R55":  {x: 1120, y: 750, corridor: "C5"},
    "R56":  {x: 1120, y: 750, corridor: "C5"},
    "R57":  {x: 524, y: 430, corridor: "C2"},
    "R58":  {x: 524, y: 499, corridor: "C2"},
    "R59":  {x: 524, y: 499, corridor: "C2"},
    "R60":  {x: 524, y: 540, corridor: "C2"},
    "R61":  {x: 524, y: 540, corridor: "C2"},
    "R62":  {x: 524, y: 605, corridor: "C2"},
    "R63":  {x: 524, y: 605, corridor: "C2"},
    "R64":  {x: 524, y: 644, corridor: "C2"},
    "R65":  {x: 524, y: 644, corridor: "C2"},
    "R66":  {x: 524, y: 710, corridor: "C2"},
    "R67":  {x: 524, y: 710, corridor: "C2"},
    "R68":  {x: 524, y: 746, corridor: "C2"},
    "R69":  {x: 524, y: 746, corridor: "C2"},
    "R70":  {x: 488, y: 456, corridor: "C3"},
    "R71":  {x: 442, y: 456, corridor: "C3"},
    "R72":  {x: 398, y: 456, corridor: "C3"},
    "R73":  {x: 398, y: 456, corridor: "C3"},
    "R74":  {x: 356, y: 456, corridor: "C3"},
    "R75":  {x: 306, y: 456, corridor: "C3"},
    "R76":  {x: 306, y: 456, corridor: "C3"},
    "R77":  {x: 261, y: 456, corridor: "C3"},
    "R78":  {x: 261, y: 456, corridor: "C3"},
    "R79": {x: 455, y: 596, corridor: "C6"},
    "R80": {x: 455, y: 682, corridor: "C6"},
    "R81": {x: 366, y: 674, corridor: "C7"},
    "R82": {x: 366, y: 719, corridor: "C7"},
    "R83": {x: 336, y: 745, corridor: "C8"},
    "R84": {x: 180, y: 745, corridor: "C8"},
    "R85": {x: 145, y: 745, corridor: "C9"},
    "R86": {x: 145, y: 720, corridor: "C9"},
    "R87": {x: 145, y: 720, corridor: "C9"},
    "R88": {x: 145, y: 675, corridor: "C9"},
    "R89": {x: 145, y: 646, corridor: "C9"},
  };

  const turningPoints = {
      "C1_C2": {x: 515, y: 286},  
      "C2_C3": {x: 524, y: 455},  
      "C1_C3_T1": {x: 515, y: 286}, 
      "C1_C3_T2": {x: 524, y: 455},
      "C2_C1": {x: 515, y: 286},
      "C3_C2": {x: 524, y: 455},
      "C1_C4": {x: 586, y: 152},
      "C4_C1": {x: 586, y: 152},
      "C1_C5": {x: 1120, y: 286},
      "C5_C1": {x: 1120, y: 286},
      "C2_C4_T1":{x: 499, y: 152},
      "C2_C4_T2":{x: 586, y: 152},
      "C2_C5_T1":{x: 515, y: 286},
      "C2_C5_T2":{x: 1120, y: 286},
      "C3_C4_T1":{x: 499, y: 363},
      "C3_C4_T2":{x: 499, y: 152},
      "C3_C4_T3":{x: 586, y: 152},
      "C3_C5_T1":{x: 524, y: 455},
      "C3_C5_T2":{x: 515, y: 286},
      "C3_C5_T3":{x: 1120, y: 286},
      "C4_C5_T1":{x: 586, y: 152},
      "C4_C5_T2":{x: 1112, y: 152},
      "C1_C6_T1":{x: 515, y: 286},
      "C1_C6_T2":{x: 524, y: 455},
      "C1_C6_T3":{x: 453, y: 455 },
      "C6_C1_T1":{x: 453, y: 455 },
      "C6_C1_T2":{x: 524, y: 455},
      "C6_C1_T3":{x: 515, y: 286},
      "C2_C6_T1":{x: 524 , y: 775},
      "C2_C6_T2":{x: 455, y: 775 },
      "C6_C2_T2":{x: 524 , y: 775},
      "C6_C2_T1":{x: 455, y: 775 },
      "C3_C6":{x: 453 , y: 455},
      "C6_C3":{x: 453 , y: 455},
      "C7_C6_T1":{x:366, y:775},
      "C7_C6_T2":{x: 455, y: 775},
      "C6_C7_T1":{x: 455, y: 775},
      "C6_C7_T2":{x:366, y:775},
      "C8_C6_T1":{x:366, y:740},
      "C8_C6_T2":{x:366, y:775},
      "C8_C6_T3":{x: 455, y: 775},
      "C6_C8_T1":{x: 455, y: 775},
      "C6_C8_T2":{x:366, y:775},
      "C6_C8_T3":{x:366, y:740},
      "C9_C6_T1":{x:145, y:744},
      "C9_C6_T2":{x:366, y:740},
      "C9_C6_T3":{x:366, y:775},
      "C9_C6_T4":{x: 455, y: 775},
      "C6_C9_T4":{x:145, y:744},
      "C6_C9_T3":{x:366, y:740},
      "C6_C9_T2":{x:366, y:775},
      "C6_C9_T1":{x: 455, y: 775},
      "C1_C7_T1":{x: 515, y: 286},
      "C1_C7_T2":{x: 524 , y: 775 },
      "C1_C7_T3":{x:366, y:775 },
      "C7_C1_T1":{x:366, y:775 },
      "C7_C1_T2":{x: 524 , y: 775 },
      "C7_C1_T3":{x: 515, y: 286},
      "C2_C7_T1":{x: 524 , y: 775 },
      "C2_C7_T2":{x:366, y:775 },
      "C7_C2_T1":{x:366, y:775 },
      "C7_C2_T2":{x: 524 , y: 775 },
      "C3_C7_T1":{x: 453 , y: 455},
      "C3_C7_T2":{x: 455, y: 775},
      "C3_C7_T3":{x:366, y:775},
      "C7_C3_T3":{x: 453 , y: 455},
      "C7_C3_T2":{x: 455, y: 775},
      "C7_C3_T1":{x:366, y:775},
      "C8_C7":{x:366, y:740},
      "C7_C8":{x:366, y:740},
      "C9_C7_T1":{x:145, y:744},
      "C9_C7_T2":{x:366, y:740},
      "C7_C9_T1":{x:366, y:740},
      "C7_C9_T2":{x:145, y:744},
      "C1_C8_T1":{x: 515, y: 286},
      "C1_C8_T2":{x: 524 , y: 775},
      "C1_C8_T3":{x:366, y:775},
      "C1_C8_T4":{x:366, y:740},
      "C8_C1_T1":{x:366, y:740},
      "C8_C1_T2":{x:366, y:775},
      "C8_C1_T3":{x: 524 , y: 775},
      "C8_C1_T4":{x: 515, y: 286},
      "C2_C8_T1":{x: 524 , y: 775},
      "C2_C8_T2":{x:366, y:775},
      "C2_C8_T3":{x:366, y:740},
      "C8_C2_T1":{x:366, y:740},
      "C8_C2_T2":{x:366, y:775},
      "C8_C2_T3":{x: 524 , y: 775},
      "C3_C8_T1":{x: 453 , y: 455},
      "C3_C8_T2":{x: 455, y: 775},
      "C3_C8_T3":{x:366, y:775},
      "C3_C8_T4":{x:366, y:740},
      "C8_C3_T1":{x:366, y:740},
      "C8_C3_T2":{x:366, y:775},
      "C8_C3_T3":{x: 455, y: 775},
      "C8_C3_T4":{x: 453 , y: 455},
      "C9_C8":{x:145, y:744},
      "C8_C9":{x:145, y:744},
      "C1_C9_T1":{x: 515, y: 286},
      "C1_C9_T2":{x: 524 , y: 775},
      "C1_C9_T3":{x:366, y:775},
      "C1_C9_T4":{x:366, y:740},
      "C1_C9_T5":{x:145, y:744},
      "C9_C1_T1":{x:145, y:744},
      "C9_C1_T2":{x:366, y:740},
      "C9_C1_T3":{x:366, y:775},
      "C9_C1_T4":{x: 524 , y: 775},
      "C9_C1_T5":{x: 515, y: 286  },
      "C3_C9_T1":{x: 453 , y: 455},
      "C3_C9_T2":{x: 455, y: 775},
      "C3_C9_T3":{x:366, y:775},
      "C3_C9_T4":{x:366, y:740},
      "C3_C9_T5":{x:145, y:744},
      "C9_C3_T1":{x:145, y:744},
      "C9_C3_T2":{x:366, y:740},
      "C9_C3_T3":{x:366, y:775},
      "C9_C3_T4":{x: 455, y: 775},
      "C9_C3_T5":{x: 453 , y: 455},
      "C2_C9_T1":{x: 524 , y: 775},
      "C2_C9_T2":{x:366, y:775},
      "C2_C9_T3":{x:366, y:740},
      "C2_C9_T4":{x:145, y:744},
      "C9_C2_T1":{x:145, y:744},
      "C9_C2_T2":{x:366, y:740},
      "C9_C2_T3":{x:366, y:775},
      "C9_C2_T4":{x: 524 , y: 775},
      "C5_C6_T1":{x: 1120, y: 286},
      "C5_C6_T2":{x: 515, y: 286},
      "C5_C6_T3":{x: 524, y: 455},
      "C5_C6_T4":{x: 453 , y: 455},
      "C6_C5_T1":{x: 453 , y: 455},
      "C6_C5_T2":{x: 524, y: 455},
      "C6_C5_T3":{x: 515, y: 286},
      "C6_C5_T4":{x: 1120, y: 286},
      "C5_C7_T1":{x: 1120, y: 286},
      "C5_C7_T2":{x: 515, y: 286},
      "C5_C7_T3":{x: 524 , y: 775},
      "C5_C7_T4":{x:366, y:775},
      "C7_C5_T1":{x:366, y:775},
      "C7_C5_T2":{x: 524 , y: 775},
      "C7_C5_T3":{x: 515, y: 286},
      "C7_C5_T4":{x: 1120, y: 286},
      "C5_C8_T1":{x: 1120, y: 286},
      "C5_C8_T2":{x: 515, y: 286},
      "C5_C8_T3":{x: 524 , y: 775},
      "C5_C8_T4":{x:366, y:775},
      "C5_C8_T5":{x:366, y:740},
      "C8_C5_T1":{x:366, y:740},
      "C8_C5_T2":{x:366, y:775},
      "C8_C5_T3":{x: 524 , y: 775},
      "C8_C5_T4":{x: 515, y: 286},
      "C8_C5_T5":{x: 1120, y: 286},
      "C5_C9_T1":{x: 1120, y: 286},
      "C5_C9_T2":{x: 515, y: 286},
      "C5_C9_T3":{x: 524 , y: 775},
      "C5_C9_T4":{x:366, y:775},
      "C5_C9_T5":{x:366, y:740},
      "C5_C9_T6":{x:145, y:744},
      "C9_C5_T1":{x:145, y:744},
      "C9_C5_T2":{x:366, y:740},
      "C9_C5_T3":{x:366, y:775},
      "C9_C5_T4":{x: 524 , y: 775},
      "C9_C5_T5":{x: 515, y: 286},
      "C9_C5_T6":{x: 1120, y: 286},

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
      (start.corridor === "C1" && end.corridor === "C5") ||
      (start.corridor === "C8" && end.corridor === "C9") ||
      (start.corridor === "C9" && end.corridor === "C8") ||
      (start.corridor === "C8" && end.corridor === "C7") ||
      (start.corridor === "C7" && end.corridor === "C8") ||
      (start.corridor === "C3" && end.corridor === "C6") ||
      (start.corridor === "C6" && end.corridor === "C3") 
  ) {
      
      const turningPoint = turningPoints[`${start.corridor}_${end.corridor}`];
      animateLinet1(canvasId, start.x, start.y, turningPoint.x, turningPoint.y, end.x, end.y);
  } else if (
      (start.corridor === "C1" && end.corridor === "C3")  || (start.corridor === "C2" && end.corridor === "C4") || (start.corridor === "C2" && end.corridor === "C5") || (start.corridor === "C4" && end.corridor === "C5") || (start.corridor === "C2" && end.corridor === "C6")  || (start.corridor === "C6" && end.corridor === "C2") || (start.corridor === "C7" && end.corridor === "C6") || (start.corridor === "C6" && end.corridor === "C7") || (start.corridor === "C7" && end.corridor === "C2")  || (start.corridor === "C2" && end.corridor === "C7") || (start.corridor === "C9" && end.corridor === "C7") || (start.corridor === "C7" && end.corridor === "C9")|| (start.corridor === "C3" && end.corridor === "C1") ||  (start.corridor === "C4" && end.corridor === "C2") ||  (start.corridor === "C5" && end.corridor === "C2") || (start.corridor === "C5" && end.corridor === "C4")
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
      (start.corridor === "C3" && end.corridor === "C4") || (start.corridor === "C3" && end.corridor === "C5") || (start.corridor === "C1" && end.corridor === "C6") || (start.corridor === "C6" && end.corridor === "C1") || (start.corridor === "C6" && end.corridor === "C8") || (start.corridor === "C8" && end.corridor === "C6") || (start.corridor === "C1" && end.corridor === "C7") || (start.corridor === "C7" && end.corridor === "C1") || (start.corridor === "C3" && end.corridor === "C7") || (start.corridor === "C7" && end.corridor === "C3") || (start.corridor === "C2" && end.corridor === "C8") || (start.corridor === "C8" && end.corridor === "C2")
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
    else if(
      (start.corridor === "C1" && end.corridor === "C8") || (start.corridor === "C8" && end.corridor === "C1") || (start.corridor === "C6" && end.corridor === "C9") || (start.corridor === "C9" && end.corridor === "C6") || (start.corridor === "C3" && end.corridor === "C8") || (start.corridor === "C8" && end.corridor === "C3") || (start.corridor === "C2" && end.corridor === "C9") || (start.corridor === "C9" && end.corridor === "C2") || (start.corridor === "C5" && end.corridor === "C6") || (start.corridor === "C6" && end.corridor === "C5") || (start.corridor === "C5" && end.corridor === "C7") || (start.corridor === "C7" && end.corridor === "C5") 
    ){
      const turningPoint1 = turningPoints[`${start.corridor}_${end.corridor}_T1`];
      const turningPoint2 = turningPoints[`${start.corridor}_${end.corridor}_T2`];
      const turningPoint3 = turningPoints[`${start.corridor}_${end.corridor}_T3`];
      const turningPoint4 = turningPoints[`${start.corridor}_${end.corridor}_T4`];
      animateLineT4(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, turningPoint3.x, turningPoint3.y,turningPoint4.x,turningPoint4.y, end.x, end.y);
    }
    else if(
      (start.corridor === "C1" && end.corridor === "C9") || (start.corridor === "C9" && end.corridor === "C1") || (start.corridor === "C3" && end.corridor === "C9") || (start.corridor === "C9" && end.corridor === "C3") || (start.corridor === "C5" && end.corridor === "C8") || (start.corridor === "C8" && end.corridor === "C5")
    ){
      const turningPoint1 = turningPoints[`${start.corridor}_${end.corridor}_T1`];
      const turningPoint2 = turningPoints[`${start.corridor}_${end.corridor}_T2`];
      const turningPoint3 = turningPoints[`${start.corridor}_${end.corridor}_T3`];
      const turningPoint4 = turningPoints[`${start.corridor}_${end.corridor}_T4`];
      const turningPoint5 = turningPoints[`${start.corridor}_${end.corridor}_T5`];
      animateLineT5(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, turningPoint3.x, turningPoint3.y,turningPoint4.x,turningPoint4.y,turningPoint5.x,turningPoint5.y, end.x, end.y);
    }
    else if(
      (start.corridor === "C5" && end.corridor === "C9") || (start.corridor === "C9" && end.corridor === "C5") 
    ){
      const turningPoint1 = turningPoints[`${start.corridor}_${end.corridor}_T1`];
      const turningPoint2 = turningPoints[`${start.corridor}_${end.corridor}_T2`];
      const turningPoint3 = turningPoints[`${start.corridor}_${end.corridor}_T3`];
      const turningPoint4 = turningPoints[`${start.corridor}_${end.corridor}_T4`];
      const turningPoint5 = turningPoints[`${start.corridor}_${end.corridor}_T5`];
      const turningPoint6 = turningPoints[`${start.corridor}_${end.corridor}_T6`];
      animateLineT6(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, turningPoint3.x, turningPoint3.y,turningPoint4.x,turningPoint4.y,turningPoint5.x,turningPoint5.y,turningPoint6.x,turningPoint6.y, end.x, end.y);
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
function showDaughterDropdown() {
  var selectedValue = document.getElementById("parentdropdown").value;
  var ddropdown = document.getElementById("Downstairs");
  var udropdown = document.getElementById("Upstairs");

  if (selectedValue === "Downstairs Floor") {
    ddropdown.style.display = "block";
    udropdown.style.display = "none";
    loadCanvas('GFImage', 'GFFloorCanvas');
  } else if (selectedValue === "Upstairs Floor") {
    ddropdown.style.display = "none";
    udropdown.style.display = "block";
    loadCanvas('FFImage', 'FFFloorCanvas');
  } else {
    ddropdown.style.display = "none";
    udropdown.style.display = "none";
  }

  document.getElementById("result").innerHTML = "";
  document.getElementById("resultuni").innerHTML = "";
  document.getElementById("resultf").innerHTML = "Current Floor: " + selectedValue;
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
  const headLength = 10;
  const angle = Math.atan2(endY - startY, endX - startX);

  let currentX = startX;
  let currentY = startY;
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
  const headLength = 10;

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
      context.lineWidth = 2;
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
      context.lineWidth = 2;
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
  const headLength = 10;

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

          context.beginPath();
          context.moveTo(startX, startY); // Draw full first segment
          context.lineTo(t1X, t1Y);

          const currentX2 = t1X + (t2X - t1X) * currentProgress;
          const currentY2 = t1Y + (t2Y - t1Y) * currentProgress;

          context.lineTo(currentX2, currentY2);
          context.strokeStyle = 'orange';
          context.lineWidth = 2;
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
          context.lineWidth = 2;
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


function confirmDownstairsSelection() {
  var selectedfloorval = document.getElementById("DD").value;

  // Get all kiosk dropdowns (Kiosk 1 to Kiosk 6)
  var kioskDropdowns = [];
  for (let i = 1; i <= 6; i++) {
      kioskDropdowns.push(document.getElementById("Kiosk" + i));
  }

  // Hide all kiosk dropdowns
  for (let i = 0; i < kioskDropdowns.length; i++) {
      kioskDropdowns[i].style.display = "none";
  }

  // Get all room dropdowns (Room 1 to Room 33)
  var roomDropdowns = [];
  for (let i = 1; i <= 33; i++) {
      roomDropdowns.push(document.getElementById("Room" + i));
  }

  // // Hide all room dropdowns
  for (let i = 0; i < roomDropdowns.length; i++) {
      roomDropdowns[i].style.display = "none";
  }

  // Show the appropriate kiosk based on the selectedfloorval
  if (selectedfloorval === "Kiosk 1") {
      kioskDropdowns[0].style.display = "block";
  } else if (selectedfloorval === "Kiosk 2") {
      kioskDropdowns[1].style.display = "block";
  } else if (selectedfloorval === "Kiosk 3") {
      kioskDropdowns[2].style.display = "block";
  } else if (selectedfloorval === "Kiosk 4") {
      kioskDropdowns[3].style.display = "block";
  } else if (selectedfloorval === "Kiosk 5") {
      kioskDropdowns[4].style.display = "block";
  } else if (selectedfloorval === "Kiosk 6") {
      kioskDropdowns[5].style.display = "block";
  }

  // Show the appropriate room based on the selectedfloorval
  for (let i = 1; i <= 33; i++) {
      if (selectedfloorval === "R" + i) {
          roomDropdowns[i - 1].style.display = "block"; // Show the corresponding room dropdown
          break; // Exit the loop once the correct room is found
      }
  }

  // Canvas code stays the same
  const canvas = document.getElementById("GFFloorCanvas");
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("result").innerHTML = "";
  document.getElementById("result").innerHTML = "You are near: " + selectedfloorval;
}
function navigateRoomToRoom(startRoom, endRoom) {
  const canvasId = "GFFloorCanvas";
  
  // Define room coordinates
  const roomCoordinates = {
    "R1":  {x: 464, y: 152, corridor: "C1"},
    "R2":  {x: 420, y: 152, corridor: "C1"},
    "R3":  {x: 376, y: 152, corridor: "C1"},
    "R4":  {x: 330, y: 152, corridor: "C1"},
    "R5":  {x: 285, y: 152, corridor: "C1"},
    "R6":  {x: 241, y: 152, corridor: "C1"},
    "R7":  {x: 195, y: 152, corridor: "C1"},
    "R8":  {x: 195, y: 152, corridor: "C1"},
    "R9":  {x: 499, y: 152, corridor: "C1"},
    "R10": {x: 420, y: 152, corridor: "C1"},
    "R11": {x: 464, y: 152, corridor: "C1"},
    "R12": {x: 540, y: 152, corridor: "C1"},
    "R13": {x: 540, y: 152, corridor: "C1"},
    "R14": {x: 499, y: 324, corridor: "C2"},
    "R15": {x: 499, y: 401, corridor: "C2"},
    "R16": {x: 499, y: 526, corridor: "C2"},
    "R17": {x: 499, y: 574, corridor: "C2"},
    "R18": {x: 499, y: 657, corridor: "C2"},
    "R19": {x: 499, y: 720, corridor: "C2"},
    "R20": {x: 499, y: 720, corridor: "C2"},
    "R21": {x: 499, y: 657, corridor: "C2"},
    "R22": {x: 499, y: 574, corridor: "C2"},
    "R23": {x: 499, y: 526, corridor: "C2"},
    "R24": {x: 499, y: 450, corridor: "C2"},
    "R25": {x: 459, y: 363, corridor: "C3"},
    "R26": {x: 401, y: 363, corridor: "C3"},
    "R27": {x: 343, y: 363, corridor: "C3"},
    "R28": {x: 229, y: 363, corridor: "C3"},
    "R29": {x: 167, y: 363, corridor: "C3"},
    "R30": {x: 343, y: 363, corridor: "C3"},
    "R31": {x: 289, y: 363, corridor: "C3"},
    "R32": {x: 229, y: 363, corridor: "C3"},
    "R33": {x: 167, y: 363, corridor: "C3"}
  };

  // Define turning points between corridors
  const turningPoints = {
      "C1_C2": {x: 499, y: 152},  // Turning point between Corridor 1 and Corridor 2
      "C2_C3": {x: 499, y: 363},  // Turning point between Corridor 2 and Corridor 3
      "C1_C3_T1": {x: 499, y: 152}, // First turning point between Corridor 1 and Corridor 3
      "C1_C3_T2": {x: 499, y: 363},
      "C2_C1": {x: 499, y: 152},
      "C3_C2": {x: 499, y: 363},
      "C3_C1_T1": {x: 499, y: 363},
      "C3_C1_T2": {x: 499, y: 152}
  };

  const start = roomCoordinates[startRoom];
  const end = roomCoordinates[endRoom];

  if (start.corridor === end.corridor) {
      // Rooms in the same corridor
      animateLine(canvasId, start.x, start.y, end.x, end.y);
  } else if (
      (start.corridor === "C1" && end.corridor === "C2") || 
      (start.corridor === "C2" && end.corridor === "C1") ||
      (start.corridor === "C2" && end.corridor === "C3") ||
      (start.corridor === "C3" && end.corridor === "C2")
  ) {
      // Rooms in adjacent corridors with 1 turning point
      const turningPoint = turningPoints[`${start.corridor}_${end.corridor}`];
      animateLinet1(canvasId, start.x, start.y, turningPoint.x, turningPoint.y, end.x, end.y);
  } else if (
      (start.corridor === "C1" && end.corridor === "C3") 
  ) {
      // Rooms in non-adjacent corridors with 2 turning points
      const turningPoint1 = turningPoints["C1_C3_T1"];
      const turningPoint2 = turningPoints["C1_C3_T2"];
      animateLinet2(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, end.x, end.y);
  }
    else if(
      (start.corridor === "C3" && end.corridor === "C1")
    ){
      const turningPoint1 = turningPoints["C3_C1_T1"];
      const turningPoint2 = turningPoints["C3_C1_T2"];
      animateLinet2(canvasId, start.x, start.y, turningPoint1.x, turningPoint1.y, turningPoint2.x, turningPoint2.y, end.x, end.y);
  }
}


function confirmUpstairsSelection(){
  var selectedfloorval = document.getElementById("UD").value
  var k1dropdown = document.getElementById("Kiosk1")
  var k2dropdown = document.getElementById("Kiosk2")
  var k3dropdown = document.getElementById("Kiosk3")
  var k4dropdown = document.getElementById("Kiosk4")
  var k5dropdown = document.getElementById("Kiosk5")
  var k6dropdown = document.getElementById("Kiosk6")
  if(selectedfloorval === "Kiosk 4"){
    k1dropdown.style.display = "none";
    k2dropdown.style.display = "none";
    k3dropdown.style.display = "none";
    k4dropdown.style.display = "block";
    k5dropdown.style.display = "none";
    k6dropdown.style.display = "none";
  }
  else if(selectedfloorval === "Kiosk 5"){
    k1dropdown.style.display = "none";
    k2dropdown.style.display = "none";
    k3dropdown.style.display = "none";
    k4dropdown.style.display = "none";
    k5dropdown.style.display = "block";
    k6dropdown.style.display = "none";
  }
  else if(selectedfloorval === "Kiosk 6"){
    k1dropdown.style.display = "none";
    k2dropdown.style.display = "none";
    k3dropdown.style.display = "none";
    k4dropdown.style.display = "none";
    k5dropdown.style.display = "none";
    k6dropdown.style.display = "block";
  }
  else{
    k1dropdown.style.display = "none";
    k2dropdown.style.display = "none";
    k3dropdown.style.display = "none";
    k4dropdown.style.display = "none";
    k5dropdown.style.display = 'none';
    k6dropdown.style.display = 'none';
  }
  const canvas = document.getElementById("FFFloorCanvas");
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("resultuni").innerHTML = ""
  document.getElementById("result").innerHTML = "You are near: " + selectedfloorval
}
function confirmK1Selection(){
  var selecteduni = document.getElementById("K1").value
  document.getElementById("resultuni").innerHTML = "Kiosk 1 to: " + selecteduni
  if (selecteduni === "R1" || selecteduni === "R11") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,152,464,152)
  } else if (selecteduni === "R2" || selecteduni === "R10") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,152,420,152)
  } else if (selecteduni === "R3" || selecteduni === "R9") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,152,376,152)
  } else if (selecteduni === "R4") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,152,330,152)  
  } else if (selecteduni === "R5") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,152,285,152)  
  } else if (selecteduni === "R6") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,152,241,152)  
  } else if (selecteduni === "R7"|| selecteduni === "R8") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,152,195,152)  
  } else if (selecteduni === "R12" || selecteduni === "R13") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas", 499, 152, 540, 152) 

  } else if (selecteduni === "R14") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas", 499, 152, 499, 324)

  } else if (selecteduni === "R15") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas", 499, 152, 499, 401)

  } else if (selecteduni === "R16" || selecteduni === "R23") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas", 499, 152, 499, 526)

  } else if (selecteduni === "R17" || selecteduni === "R22") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas", 499, 152, 499, 574)

  } else if (selecteduni === "R18" || selecteduni === "R21") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas", 499, 152, 499, 657)

  } else if (selecteduni === "R19" || selecteduni === "R20") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas", 499, 152, 499, 720)

  } else if (selecteduni === "R24") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499, 152,499,450)

  } else if (selecteduni === "R25") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499, 152,499,363,459,363)

  } else if (selecteduni === "R26") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499, 152,499,363,401,363)

  } else if (selecteduni === "R27" || selecteduni === "R30") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499, 152,499,363,343,363)

  } else if (selecteduni === "R28" || selecteduni === "R32") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499, 152,499,363,229,363)

  } else if (selecteduni === "R29" || selecteduni === "R33") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499, 152,499,363,167,363)

  } else if (selecteduni === "R31") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499, 152,499,363,289,363)   
  }
}
function confirmK2Selection(){
  var selecteduni = document.getElementById("K2").value
  document.getElementById("resultuni").innerHTML = "Kiosk 2 to: " + selecteduni
  if (selecteduni === "R1"|| selecteduni === "R11") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,363,499,152,464,152)

  } else if (selecteduni === "R2" || selecteduni === "R10") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');  
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,363,499,152,420,152)

  } else if (selecteduni === "R3" || selecteduni === "R9") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,363,499,152,376,152)

  } else if (selecteduni === "R4") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,363,499,152,330,152)

  } else if (selecteduni === "R5") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,363,499,152,285,152)

  } else if (selecteduni === "R6") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,363,499,152,241,152)

  } else if (selecteduni === "R7" || selecteduni === "R8") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,363,499,152,195,152)

  } else if (selecteduni === "R12" || selecteduni === "R13") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,363,499,152,540,152)

  }  else if (selecteduni === "R14") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,499,324)

  } else if (selecteduni === "R15") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,499,401)

  } else if (selecteduni === "R16" || selecteduni === "R23") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,499,526)

  } else if (selecteduni === "R17" || selecteduni === "R22") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,499,574)
  } else if (selecteduni === "R18"|| selecteduni === "R21") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,499,657)

  } else if (selecteduni === "R19" || selecteduni === "R20") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,499,720)

  } else if (selecteduni === "R24") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,499,450)

  } else if (selecteduni === "R25") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,459,363)

  } else if (selecteduni === "R26") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,401,363)

  } else if (selecteduni === "R27" || selecteduni === "R30") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,343,363)

  } else if (selecteduni === "R28" || selecteduni === "R32") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,229,363)

  } else if (selecteduni === "R29" || selecteduni === "R33") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,167,363)

  } else if (selecteduni === "R31") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,363,289,363)

  }
}
function confirmK3Selection(){
  var selecteduni = document.getElementById("K3").value
  document.getElementById("resultuni").innerHTML = "Kiosk 3 to: " + selecteduni
  if (selecteduni === "R1" || selecteduni === "R11") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,152,464,152)

  } else if (selecteduni === "R2" || selecteduni === "R10") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,152,420,152)

  } else if (selecteduni === "R3" || selecteduni === "R9") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,152,376,152)

  } else if (selecteduni === "R4") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,152,330,152)

  } else if (selecteduni === "R5") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,152,285,152)

  } else if (selecteduni === "R6") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,152,241,152)

  } else if (selecteduni === "R7" || selecteduni === "R8") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,152,195,152)

  } else if (selecteduni === "R12" || selecteduni === "R13") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,152,540,152)

  } else if (selecteduni === "R14") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,720,499,324)

  } else if (selecteduni === "R15") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,720,499,401)

  } else if (selecteduni === "R16" || selecteduni === "R23") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,720,499,526)

  } else if (selecteduni === "R17" || selecteduni === "R22") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,720,499,574)

  } else if (selecteduni === "R18" || selecteduni === "R21") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,720,499,657)

  } else if (selecteduni === "R19" || selecteduni === "R20") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,720,499,723)

  } else if (selecteduni === "R24") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLine("GFFloorCanvas",499,720,499,453)

  } else if (selecteduni === "R25") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,363,459,363)

  } else if (selecteduni === "R26") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,363,401,363)

  } else if (selecteduni === "R27" || selecteduni === "R30") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,363,343,363)

  } else if (selecteduni === "R28" || selecteduni === "R32") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,363,229,363)

  } else if (selecteduni === "R29" || selecteduni === "R33") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,363,167,363)

  } else if (selecteduni === "R31") {
    const canvas = document.getElementById("GFFloorCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    animateLinet1("GFFloorCanvas",499,720,499,363,289,363)

  }
}
function confirmK4Selection(){
  var selecteduni = document.getElementById("K4").value
  document.getElementById("resultuni").innerHTML = "Kiosk 4 to: " + selecteduni
}
function confirmK5Selection(){
  var selecteduni = document.getElementById("K5").value
  document.getElementById("resultuni").innerHTML = "Kiosk 5 to: " + selecteduni
}
function confirmK6Selection(){
  var selecteduni = document.getElementById("K6").value
  document.getElementById("resultuni").innerHTML = "Kiosk 6 to: " + selecteduni
}
function confirmR1Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r1").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR2Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r2").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR3Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r3").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR4Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r4").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR5Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r5").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR6Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r6").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR7Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r7").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR8Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r8").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR9Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r9").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR10Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r10").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR11Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r11").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR12Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r12").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR13Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r13").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR14Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r14").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR15Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r15").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR16Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r16").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR17Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r17").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR18Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r18").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR19Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r19").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR20Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r20").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR21Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r21").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR22Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r22").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR23Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r23").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR24Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r24").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR25Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r25").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR26Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r26").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR27Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r27").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR28Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r28").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR29Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r29").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR30Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r30").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR31Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r31").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR32Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r32").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}

function confirmR33Selection() {
  var start = document.getElementById("DD").value;
  var end = document.getElementById("r33").value;
  document.getElementById("resultuni").innerHTML = start + " to: " + end;
  navigateRoomToRoom(start, end);
}


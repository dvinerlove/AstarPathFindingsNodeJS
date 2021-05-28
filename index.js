var pathFinder = function(StartLocation, maze) {
  var distanceFromTop = StartLocation[0];
  var distanceFromLeft = StartLocation[1];


  var location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'A'
  };

  var queue = [location];

  while (queue.length > 0) {
    var currentLocation = queue.shift();

    var newLocation = exploreInDirection(currentLocation, 'up', maze);
    if (newLocation.status === 'B') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, 'right', maze);
    if (newLocation.status === 'B') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, 'down', maze);
    if (newLocation.status === 'B') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, 'left', maze);
    if (newLocation.status === 'B') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
  }

  return false;

};

var locationStatus = function(location, maze) {
  var mazeSize = maze.length;
  var dft = location.distanceFromTop;
  var dfl = location.distanceFromLeft;

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= mazeSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= mazeSize) {

    return 'Invalid';
  } else if (maze[dft][dfl] === 'B') {
    return 'B';
  } else if (maze[dft][dfl] !== '+') {
    return 'Blocked';
  } else {
    return 'Valid';
  }
};

var exploreInDirection = function(currentLocation, direction, maze) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'up') {
    dft -= 1;
  } else if (direction === 'right') {
    dfl += 1;
  } else if (direction === 'down') {
    dft += 1;
  } else if (direction === 'left') {
    dfl -= 1;
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  };
  newLocation.status = locationStatus(newLocation, maze);

  if (newLocation.status === 'Valid') {
    maze[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
};


var mazeSize = 8;
var maze =   [

  ['#','#','#','#','2','#','#','#','#'],
  ['#','+','+','+','#','+','+','+','#'],
  ['+','+','#','+','#','+','#','+','#'],
  ['*','+','#','+','0','+','#','+','2'],
  ['#','#','#','+','#','#','#','#','#'],
  ['#','#','+','+','#','#','#','#','#'],
  ['#','#','+','#','#','#','#','#','#'],
  ['#','#','#','#','2','#','#','#','#'],

];

var startLocation ;
for (var i = 0; i < maze.length; i++) {
for (var j = 0; j < maze.length; j++) {
    if (maze[i][j]=='0') {
      maze[i][j]='B'
    }
}
}

for (var i = 0; i < maze.length; i++) {
  if (maze[i][0]=='+') {
      startLocation = [i,0];
      break;
  }
  if (maze[i][maze.length]=='+') {
      startLocation = [i,maze.length];
      break;
  }
  if (maze[0][i]=='+') {
      startLocation = [0,i];
      break;
  }
  if (maze[maze.length-1][i]=='+') {
      startLocation = [maze.length-1,i];
      break;
  }
}
console.log("\n path: "+pathFinder(startLocation, maze));

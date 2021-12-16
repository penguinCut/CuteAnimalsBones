window.onload = function () {
    // Define draggable items and drag's data
    var draggables = {
      init: function () {
        this.cacheDOM();
        this.bindEvents();
      },
      cacheDOM: function () {
        this.parent_puzzlePieces = document.getElementById("tray");
      },
      bindEvents: function () {
        this.parent_puzzlePieces.addEventListener("mousedown", this.addAttr);
        this.parent_puzzlePieces.addEventListener("dragstart", this.dragStart);
      },
      addAttr: function (e) {
        if (e.target && e.target.nodeName === "IMG") {
          e.target.setAttribute("draggable","true");
        }
      },
      dragStart: function (e) {
        e.dataTransfer.setData("image/png", e.target.id);
        e.dataTransfer.dropEffect = "move";
      }
    };
    
    // Define drop zones
    var dropZone = {
      count: 0,
      init: function () {
        this.cacheDOM();
        this.bindEvents();
      },
      cacheDOM: function () {
        this.puzzleBoard = document.getElementById("puzzleboard");
        this.plopAudio = document.getElementById("plop-sound");
      },
      bindEvents: function () {
        this.puzzleBoard.addEventListener("dragover",this.dragItem);
        this.puzzleBoard.addEventListener("drop",this.dropItem);
      },
      dragItem: function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      },
      dropItem: function (e) {
        e.preventDefault();
        var pieceData = e.dataTransfer.getData("image/png");
        // Only drop if the cell matches the pieces
        if (pieceData === e.target.getAttribute("data-cell")) {
          e.target.appendChild(document.getElementById(pieceData));
          dropZone.plopAudio.play();
          dropZone.count++;
        }
        // Once all the pieces are placed, call completedPuzzle.init() to play music and animation
        if (dropZone.count === 3) {
          completedPuzzle.init();
          btnShuffle.btn.style.display = "none";
          btnReset.btn.style.display = "block";
        }
      }
    };
    
    var completedPuzzle = {
      timerArray: [],
      init: function () {
        this.cacheDOM();
        this.applyClass();
        this.hideBoard();
        this.wishXMasSong();
      },
      cacheDOM: function () {
        this.puzzlePieces = document.querySelectorAll("img[id*=p]");
        this.board = document.querySelectorAll("img[src*=puzzleboard]");
        this.piece1 = document.getElementById("p1");
        this.piece2 = document.getElementById("p2");
        this.piece3 = document.getElementById("p3");
        this.xmasAudio = document.getElementById("song-sound");
        this.bellAudio = document.getElementById("bell-sound");
      },
      applyClass: function () {
        for (var i = 0; i < completedPuzzle.puzzlePieces.length; i++) {
          completedPuzzle.puzzlePieces[i].setAttribute("class","xmas");
        }
      },
      hideBoard: function () {
        for (var i = 0; i < this.board.length; i++) {
          this.board[i].style.opacity = "0";
        }
      },
      wishXMasSong: function () {
        this.xmasAudio.play();
        this.setTimers();
      },
      setTimers: function () {
        this.timerArray = [
          window.setTimeout(this.piece1State, 9000),
          window.setTimeout(this.piece2State, 9100),
          window.setTimeout(this.piece3State, 9300),
          // window.setTimeout(this.ring, 10700)
        ];
      },
      piece1State: function () {
        completedPuzzle.piece1.setAttribute("data-twirl","true");
      },
      piece2State: function () {
        completedPuzzle.piece2.setAttribute("data-twirl","true");
      },
      piece3State: function () {
        completedPuzzle.piece3.setAttribute("data-twirl","true");
      },
      // piece4State: function () {
      //   completedPuzzle.piece4.setAttribute("data-twirl","true");
      // },
      // piece5State: function () {
      //   completedPuzzle.piece5.setAttribute("data-twirl","true");
      // },
      // ring: function () {
      //   completedPuzzle.bellAudio.play();
      // }
    };
    
    var btnShuffle =  {
      init: function () {
        this.cacheDOM();
        this.bindEvents();
      },
      cacheDOM: function () {
        this.btn = document.getElementById("shuffle-btn");
      },
      bindEvents: function () {
        this.btn.addEventListener("click", this.startShuffle);
      },
      startShuffle: function () {
        shuffler.init();
      }
    };
    
    var btnReset =  {
      init: function () {
        this.cacheDOM();
        this.bindEvents();
      },
      cacheDOM: function () {
        this.btn = document.getElementById("reset-btn");
      },
      bindEvents: function () {
        this.btn.addEventListener("click", this.start);
      },
      start: function () {
        startOver.init();
      }
    };
    
    var startOver = {
      init: function () {
        this.cacheDOM();
        this.resetPuzzle();
        this.removeAttr();
        shuffler.init();
      },
      cacheDOM: function () {
        this.puzzlePieces = document.querySelectorAll("img[id*=p]");
        this.board = document.querySelectorAll("img[src*=puzzleboard]");
        this.audio = document.getElementsByTagName("audio");
      },
      removeAttr: function () {
        for (var i = 0; i < this.puzzlePieces.length; i++) {
          this.puzzlePieces[i].removeAttribute("class","xmas");
          this.puzzlePieces[i].removeAttribute("data-twirl","true");
        }
      },
      resetPuzzle: function () {
        for (var i = 0; i < this.board.length; i++) {
          this.board[i].style.opacity = "1";
        }
        btnShuffle.btn.style.display = "block";
        btnReset.btn.style.display = "none";
        this.clearTimers();
        this.resetAudio();
        dropZone.count = 0;
        dropZone.init();
      },
      clearTimers: function () {
        for (var i = 0; i < completedPuzzle.timerArray.length; i++) {
          window.clearTimeout(completedPuzzle.timerArray[i]);
        }
      },
      resetAudio: function () {
        var i = 2;
        while (i > 0) {
          this.audio[i].pause();
          this.audio[i].currentTime = 0;
          i--;
        }
      }
    };
    
    var shuffler = {
      init: function () {
        this.cacheDOM();
        this.convertToArr();
      },
      cacheDOM: function () {
        this.puzzlePieces = document.querySelectorAll("img[id*=p]");
        this.parent_puzzlePieces = document.getElementById("tray");
      },
      convertToArr: function () {
        var nodesArray = Array.prototype.slice.call(this.puzzlePieces);
        this.shuffleIt(nodesArray);
      },
      shuffleIt: function (arr) {
        var length = arr.length,
            randomN,
            beShuffled;
        while (length) {
          randomN = Math.floor(Math.random() * length);
          beShuffled = arr.splice(randomN,1);
          arr.push(beShuffled[0]);
          --length;
        }
        this.shuffleTray(arr);
      },
      randomPosition: function (top, left) {
        if (top) {
          return Math.floor(Math.random() * 1 + 2);
        } else {
          return Math.floor(Math.random() * 75 + 5);
        }
      },
      shuffleTray: function (arr) {
        for (var i = 0; i < arr.length; i++) {
          this.parent_puzzlePieces.appendChild(arr[i]);
          arr[i].style.left = this.randomPosition(0,1) + "%";
          arr[i].style.top = this.randomPosition(1,0) + "em";
        }
      }
    };
    
    draggables.init();
    dropZone.init();
    btnShuffle.init();
    btnReset.init();
    shuffler.init();
    };
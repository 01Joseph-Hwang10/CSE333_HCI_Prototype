const removeWebgazerVideoContainer = async () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const videoFeedback = document.querySelector("#webgazerVideoContainer");
      if (videoFeedback) {
        videoFeedback.style.display = "none";
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
};

const initialize = async () => {
  // webgazer
  //   .setGazeListener(function (data, elapsedTime) {
  //     console.log(data);
  //     if (data == null) {
  //       return;
  //     }
  //     let xprediction = data.x;
  //     let yprediction = data.y;
  //     updateCursor(xprediction, yprediction);
  //   })
  //   .begin();
  // await removeWebgazerVideoContainer();
  attachMousemoveListener();
  populateDots();
  animate();
};

const everythingLoaded = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(everythingLoaded);
    initialize();
  }
}, 100);

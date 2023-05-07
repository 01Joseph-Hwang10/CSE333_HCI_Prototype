const attachGazeListener = async () => {
  await webgazer
    .showVideoPreview(false)
    .showPredictionPoints(false)
    .setGazeListener(function (data, elapsedTime) {
      console.log(data);
      if (data == null) {
        return;
      }
      let xprediction = data.x;
      let yprediction = data.y;
      updateCursor(xprediction, yprediction);
    })
    .saveDataAcrossSessions(true)
    .begin();
};

const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const SCROLL_AMOUNT = 150; // px
const SCROLL_DELAY = 1 * 1000; // 1s

const attachScrollListener = () => {
  const top = document.querySelector("#top");
  // Scroll to up when the mouse cursor is inside the top div
  top.addEventListener("mouseenter", async () => {
    window.scrollBy({
      top: -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  });

  const bottom = document.querySelector("#bottom");
  // Scroll to down when the mouse cursor is inside the bottom div
  bottom.addEventListener("mouseenter", async () => {
    window.scrollBy({
      top: SCROLL_AMOUNT,
      behavior: "smooth",
    });
  });
};

const initialize = async () => {
  // await attachGazeListener();
  attachMousemoveListener();
  // attachScrollListener();
  populateDots();
  animate();
  window.onbeforeunload = function () {
    webgazer.end();
  };
};

const everythingLoaded = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(everythingLoaded);
    initialize();
  }
}, 100);

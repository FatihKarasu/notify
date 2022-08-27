const CSSTRANSITION = 300;

const notify = ({
  x = "center",
  y = "top",
  title = "Title",
  text = "",
  duration = 3000,
  enter = "bottom",
  exit = "top",
  variant = "success",
}) => {
  let removeTimeout;
  let isClosing = false;

  if (duration != 0 && duration < 1000) {
    duration = 1000;
  }

  let container = document.querySelector(`.notify-container.${x}.${y}`);
  if (container == null) {
    container = document.createElement("div");
    container.classList.add("notify-container", x, y);
    document.getElementsByTagName("body")[0].appendChild(container);
  }
  // Create Notify
  const notifyDiv = document.createElement("div");
  notifyDiv.classList.add("notify", enter, variant);
  const close = document.createElement("div");
  close.classList.add("close");
  close.addEventListener("click", () => {
    removeNotify();
    clearTimeout(removeTimeout);
  });
  notifyDiv.appendChild(close);
  const header = document.createElement("div");
  header.classList.add("title");
  header.innerText = title;
  notifyDiv.appendChild(header);
  if (text != "") {
    const body = document.createElement("div");
    body.classList.add("body");
    body.innerText = text;
    notifyDiv.appendChild(body);
  }

  if (y == "top") {
    container.appendChild(notifyDiv);
  } else {
    container.prepend(notifyDiv);
  }
  notifyDiv.style.height = `${notifyDiv.getBoundingClientRect().height}px`;
  setTimeout(() => {
    notifyDiv.classList.remove(enter);
  }, 10);

  if (duration != 0) {
    removeTimeout = setTimeout(() => {
      removeNotify();
    }, duration);

    notifyDiv.addEventListener("mouseenter", () => {
      clearTimeout(removeTimeout);
      removeTimeout = null;
    });

    notifyDiv.addEventListener("mouseleave", () => {
      if (!removeTimeout && !isClosing) {
        removeTimeout = setTimeout(() => {
          removeNotify();
        }, duration / 2);
      }
    });
  }

  const removeNotify = () => {
    if (isClosing) return;
    isClosing = true;
    notifyDiv.classList.add(exit);
    setTimeout(() => {
      notifyDiv.classList.add("remove");
      setTimeout(() => {
        try {
          container.removeChild(notifyDiv);
          if (!container.hasChildNodes()) {
            document.getElementsByTagName("body")[0].removeChild(container);
          }
        } catch (error) {}
      }, 1000);
    }, CSSTRANSITION);
  };
};

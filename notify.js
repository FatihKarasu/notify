const CSSTRANSITION = 300;

const notify = ({
  x = "left",
  y = "top",
  title = "Title",
  text = "",
  delay = 3000,
  direction = "move-up",
  out = "move-down",
  variant = "success",
}) => {
  let removeTimeout;
  let closed = false;
  let container = document.querySelector(`.notify-container.${x}.${y}`);
  if (container == null) {
    container = document.createElement("div");
    container.classList.add("notify-container", x, y);
    document.getElementsByTagName("body")[0].appendChild(container);
  }
  // Create Notify
  const notifyDiv = document.createElement("div");
  notifyDiv.classList.add("notify", direction, variant);
  const close = document.createElement("div");
  close.classList.add("close");
  close.addEventListener("click", () => {
    removeNotify(container, notifyDiv, out);
    clearTimeout(removeTimeout);
    closed = true;
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

  notifyDiv.addEventListener("mouseenter", () => {
    clearTimeout(removeTimeout);
    removeTimeout = null;
  });
  notifyDiv.addEventListener("mouseleave", () => {
    if (!removeTimeout && !closed) {
      removeTimeout = setTimeout(() => {
        removeNotify(container, notifyDiv, out);
      }, delay / 2);
    }
  });

  if (y == "top") {
    container.appendChild(notifyDiv);
  } else {
    container.prepend(notifyDiv);
  }
  notifyDiv.style.height = `${notifyDiv.getBoundingClientRect().height}px`;
  setTimeout(() => {
    notifyDiv.classList.remove(direction);
  }, 10);

  removeTimeout = setTimeout(() => {
    removeNotify(container, notifyDiv, out);
  }, delay);
};

const removeNotify = (container, el, direction) => {
  el.classList.add(direction);
  setTimeout(() => {
    el.classList.add(`remove`);
    setTimeout(() => {
      container.removeChild(el);
      if (!container.hasChildNodes()) {
        document.getElementsByTagName("body")[0].removeChild(container);
      }
    }, 1000);
  }, CSSTRANSITION);
};

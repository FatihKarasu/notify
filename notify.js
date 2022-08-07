const CSSTRANSITION = 300;

const notify = (
  pos,
  title,
  text,
  delay = 3000,
  direction = "move-up",
  out = "move-up",
  variant = "success"
) => {
  let removeTimeout;
  let container = document.querySelector(`.notify-container.${pos.x}.${pos.y}`);
  if (container == null) {
    container = document.createElement("div");
    container.classList.add("notify-container", pos.x, pos.y);
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
  });

  const header = document.createElement("div");
  header.classList.add("header");
  header.innerText = title;
  const body = document.createElement("div");
  body.classList.add("body");
  body.innerText = text;

  notifyDiv.appendChild(close);
  notifyDiv.appendChild(header);
  notifyDiv.appendChild(body);

  if (pos.y == "top") {
    container.appendChild(notifyDiv);
  } else {
    container.prepend(notifyDiv);
  }
  setTimeout(() => {
    notifyDiv.classList.remove(direction);
  }, 0);

  removeTimeout = setTimeout(() => {
    removeNotify(container, notifyDiv, out);
  }, delay);
};

const removeNotify = (container, el, direction) => {
  el.classList.add(direction);
  setTimeout(() => {
    el.classList.add(`remove`);
  }, CSSTRANSITION);
    setTimeout(() => {
      container.removeChild(el);
      if (!container.hasChildNodes()) {
        document.getElementsByTagName("body")[0].removeChild(container);
      }
    }, 1000);
};

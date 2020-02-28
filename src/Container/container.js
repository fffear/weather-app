import containerClass from "./container.css";

const Container = (() => {
  const container = document.createElement("div");
  container.classList.add(containerClass.container);
  document.body.appendChild(container);
})();

export default Container;

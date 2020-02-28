import inputClasses from "./Input.css";

const input = attributes => {
  let inputElement = null;

  let inputDiv = document.createElement("div");

  let inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", attributes.id);

  if (attributes.inputtype === "input") {
    inputElement = document.createElement("input");
    inputElement.classList.add(inputClasses.searchBar);
    Object.assign(inputElement, {
      id: attributes.id,
      type: attributes.type,
      name: attributes.name,
      placeholder: attributes.placeholder,
      required: true
    });
  }

  inputLabel.appendChild(inputElement);
  inputDiv.appendChild(inputLabel);

  return inputDiv;
};

export default input;

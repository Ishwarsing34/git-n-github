let count = 0;

const countElement = document.getElementById("count");
const incrementButton = document.getElementById("incrementBtn");

incrementButton.addEventListener("click", () => {
  count++;
  countElement.textContent = count;
});

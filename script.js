const walnut = document.getElementById("walnut");
const slider = document.getElementById("slider");

slider.addEventListener("input", (event) => {
	const sliderValue = event.target.value;
	walnut.style.opacity = sliderValue;
});

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("h1, input, div, button").forEach((el, i) => {
		el.style.opacity = "0";
		el.style.animation = "fadeUp 0.8s ease forwards";
		el.style.animationDelay = `${i * 0.12}s`;
	});
});

export function alertFunction(text, color) {
    const alertElement = document.querySelector('.alert-element');
    alertElement.style.display = "flex";
    alertElement.textContent = text;
    alertElement.style.background = color ? "green" : "red";
    alertElement.style.color = color ? "#fff" : "#fff";
    setTimeout(() => {
        alertElement.style.display = "none";
    }, 1500);
}

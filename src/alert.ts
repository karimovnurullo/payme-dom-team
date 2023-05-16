
export function alertFunction(text: string, color: true | false) {
   const alertElement = document.querySelector('.alert-element') as HTMLDivElement;
   alertElement.style.display = "flex";
   alertElement.textContent = text;
   alertElement.style.background = color ? "green" : "red";
   alertElement.style.color = color ? "#fff" : "#fff";
   setTimeout(() => {
      alertElement.style.display = "none";

   }, 1500);
}
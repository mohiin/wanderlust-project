(() =>{
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
        form.addEventListener("submit", (event) =>{
            if(!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add("was-validated");
        }, false);
    });
})();

//tax
let taxToggle = document.querySelector("#flexSwitchCheckDefault");
    taxToggle.addEventListener("click", () =>{
        let taxInfo = document.querySelectorAll(".tax-info");
        for(let info of taxInfo){
            if(info.style.display !== "inline"){
                info.style.display = "inline";
            }else{
                info.style.display = "none";
            }
        }
    });
document.getElementById("proceed").addEventListener('click', ()=>{
        const firstName = document.getElementById("firstName").value;
        const middleName = document.getElementById("middleName").value || '';
        const surName = document.getElementById("surname").value;
        const dateOfBirth = document.getElementById("dateOfBirth").value;
        const gender = document.getElementById("gender").value;

        localStorage.setItem("personalInfo", JSON.stringify({
            firstName,
            middleName,
            surName,
            dateOfBirth,
            gender
        }));

        console.log(localStorage);

        window.location.href = "../../html/register/register_crucial.html"; 
});
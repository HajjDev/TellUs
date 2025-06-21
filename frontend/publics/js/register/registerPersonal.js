document.getElementById("proceed").addEventListener('click', async ()=>{
    try{
        const url = "";
        const firstName = document.getElementById("firstName").value;
        const middleName = document.getElementById("middleName").value || '';
        const surName = document.getElementById("surName").value;
        const dateOfBirth = document.getElementById("dateOfBirth").value;
        const gender = document.getElementById("gender").value;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                     'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    firstName: firstName,
                    middleName: middleName,
                    surName: surName,
                    dateOfBirth: dateOfBirth,
                    gender: gender
                })
            });

            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`);
            };

            const json = await response.json();
            console.log(json);

            localStorage.setItem("personalInfo", JSON.stringify({
                firstName,
                middleName,
                surName,
                dateOfBirth,
                gender
            }));
            window.location.href = "/register-crucial-info"; 
            
        } catch(error) {
            console.log(error.message);
        }
    } catch(error) {
        console.error(error.message);
    };

    console.log("registered");
});
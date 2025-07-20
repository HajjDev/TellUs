const registerPersonal = (firstName, middleName, surName, dateOfBirth, gender) => {
    localStorage.setItem("personalInfo", JSON.stringify({
        firstName,
        middleName,
        surName,
        dateOfBirth,
        gender
    }));
}

export default registerPersonal;
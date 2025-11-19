function calculateAge(dateString) {
    const today = new Date();
    const birth = new Date(dateString);

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

export default calculateAge;
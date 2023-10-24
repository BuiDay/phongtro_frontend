export const validatePhone = (phone:string) =>{
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const validate = phone.match(regexPhoneNumber) ? true : false;
    return validate;
}
// (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})
export const validatePassword = (pass:string) =>{
    const regexPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const validate = pass.match(regexPass) ? true : false;
    return validate;
}
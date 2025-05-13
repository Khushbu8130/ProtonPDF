import ForgetPassword from "../components/auth/ForgetPassword";

const apis = ()=> {
    const local = 'http://localhost:5555/';

    const list = {
        registerUser:`${local}user/register`,
        loginUser:`${local}user/login`,
        ForgetPassword:`${local}user/forget/password`,
        otpVerify:`${local}user/otp/verify`,
        getOtpTime:`${local}user/otp/time`,
        updatePassword:`${local}user/password/update`,
        getAccess: `${local}user/get/access`,

    }
    return list
}
export default apis;
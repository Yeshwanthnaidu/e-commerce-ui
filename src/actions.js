import { toast } from "react-toastify";
import { mainSliceActions } from "./Store/MainSlice"

const proxy = 'http://172.16.10.169:8000' // REACT_APP_PROXY

export const signupSubmit = async (userData, dispatch) => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('username', userData.username);
    formData.append('password', userData.password);
    formData.append('email', userData.email);
    if (userData.profileImage) formData.append('profileImage', userData.profileImage);

    try {
        const response = await fetch(`${proxy}/register`, {
            method: 'POST',
            body: formData
        })

        let resResult;
        await response.json().then(result => resResult = result)

        if (!response.ok) {
            throw resResult.message;
        } else {
            toast.success('Registration Successful')
            setTimeout(() => {
                toast.info('Please Login')
                dispatch(mainSliceActions.showLogin(true))
            }, 1000)
        }
    } catch (error) {
        toast.error(error);
        console.error('Error:', error)
    }
}

export const loginSubmit = async (loginData, dispatch) => {
    const formData = new FormData();
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);

    try {
        const response = await fetch(`${proxy}/login`, {
            method: 'POST',
            body: formData
        })

        let resResult;
        await response.json().then(result => resResult = result)

        if (!response.ok) {
            throw resResult.message;
        } else {
            localStorage.setItem('token', resResult?.token)
            console.log("resResult?.userDetails ==>", resResult?.userDetails)
            dispatch(mainSliceActions.loggedUserData(resResult?.userDetails))
            toast.success('Login Successful')
            setTimeout(() => {
                dispatch(mainSliceActions.showLogin(false))
            }, 1000)
        }

    } catch (error) {
        toast.error(error);
        console.error('Error:', error)
    }
}

export const forgotPasswordSubmit = async (username) => {
    try {
        const formData = new FormData();
        formData.append('username', username.toLowerCase());

        const response = await fetch(`${proxy}/forgot-Password`, {
            method: 'POST',
            body: formData
        })

        let resResult;
        await response.json().then(result => resResult = result)

        if (!response.ok) {
            throw resResult.message;
        } else {
            return resResult
        }
    } catch (error) {
        toast.error(error);
        console.error('Error:', error)
    }
}


export const oAuthVerification = async (email, dispatch) => {
    try {
        const formData = new FormData();
        formData.append('email', email.toLowerCase());
        const response = await fetch(`${proxy}/user-verification`, {
            method: 'POST',
            body: formData
        })

        let resResult;
        await response.json().then(result => resResult = result)

        if (!response.ok) {
            throw resResult.message;
        } else {
            localStorage.setItem('token', resResult?.token)
            dispatch(mainSliceActions.loggedUserData(resResult?.userDetails))
            toast.success('Login Successful')
            setTimeout(() => {
                dispatch(mainSliceActions.showLogin(false))
            }, 1000)
        }
    } catch (error) {
        toast.error(error);
        console.error('Error:', error)
    }
}

export const forgotUsernameSubmit = async (email) => {
    try {
        const formData = new FormData();
        formData.append('email', email.toLowerCase());

        const response = await fetch(`${proxy}/forgot-username`, {
            method: 'POST',
            body: formData
        })

        let resResult;
        await response.json().then(result => resResult = result)

        if (!response.ok) {
            throw resResult.message;
        } else {
            return resResult
        }
    } catch (error) {
        toast.error(error);
        console.error('Error:', error)
    }
}
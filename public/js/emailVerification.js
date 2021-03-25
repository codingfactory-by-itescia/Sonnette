function sendVerificationEmail(userData) {
    const options = {
        username: userData.username,
        userEmail: userData.email,
        confirmationLink: `http://localhost:3001/html/temp.html?username=${userData.username}&email=${userData.email}&password=${userData.password}`
    }

    emailjs.send('service_hd70jhg', 'template_bl9e5q7', options, 'user_fKOFTHNVkZuzqNqHfz7Yw')
    .catch((err) => console.log(err))
}

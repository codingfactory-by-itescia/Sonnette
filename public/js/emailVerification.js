function sendVerificationEmail(username, userEmail, userId) {
    const options = {
        username: username,
        userEmail: userEmail,
        confirmationLink: `http://localhost:3001/html/temp.html?id=${userId}`
    }

    emailjs.send('service_hd70jhg', 'template_bl9e5q7', options, 'user_fKOFTHNVkZuzqNqHfz7Yw')
    .then(() => console.log('Email send'))
    .catch((err) => console.log(err))
}

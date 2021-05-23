class USER {
    constructor(birthDate, phoneNumber, password) {

        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}

// TO HANDLE UI TASKS 
class UI {
    static showAlert(msg, name) {

        //Create a div
        const div = document.createElement('div');
        div.className = `alert ${name}`;

        //Add alert message
        div.appendChild(document.createTextNode(msg));

        //Grub the place where i want to put this
        const container = document.querySelector('.card');
        const form = document.querySelector('#ID_FORM');

        container.insertBefore(div, form);

        //Vanish in 3 sec
        setTimeout(()=>document.querySelector('.alert')
                .remove(), 3000);
    }

    static clearField() {
        document.querySelector('#birthDate').value = '';
        document.querySelector('#phoneNumber').value = '';
        document.querySelector('#password').value = '';
    }
}

// TO COMMUNICATE WITH SERVER 
class SERVE {
    static async postData(user) {
        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                birthdate: user.birthDate, 
                phonenumber: user.phoneNumber, 
                password: user.password
                })
            }
            const req = await fetch('/api/0/people/login', options)
            const data = await req.json();

            if (data.success === false ) {
                UI.showAlert(`ERROR: ${data.error}`, 'alert-danger')
                }

            if (data.success === true ) {
                UI.showAlert('Logged Successfully.', 'alert-primary')
                
                location.replace('/landing.html')

                // CLEAR FIELDS 
                // UI.clearField();


            }
    }
}

// EVENTS 
document.querySelector('#submitBtn').addEventListener('click', (event)=>{
    event.preventDefault();

    // GET VALUES FROM FORM 
    const birthDate = document.querySelector('#birthDate').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const password = document.querySelector('#password').value;

    // VALIDATION 

    if( birthDate === ''|| phoneNumber === ''|| password === '') {
            UI.showAlert('Please fill all the fields', 'alert-warning')
    
    } else {
        const user = new USER(birthDate, phoneNumber, password);

        SERVE.postData(user);
    }

})
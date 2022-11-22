class UI{
    hidePreLoader() {
        document.querySelector('.preLoader').style.display = "none";
    }
    showNav(){
        document.querySelector('.nav').classList.toggle('nav--show')
    }
    videoControls() {
        let btn = document.querySelector('.video_switch-btn');
        if (!btn.classList.contains('btnSlide')) {
            btn.classList.add('btnSlide');
        }
        else {
            btn.classList.remove('btnSlide');
        }

    }
    checkEmpty(name,lastname,email) {
        let res;
        if (name === '' || lastname === '' || email === '') {
            res = false;
        }
        else
            res = true;
        
        return res;
    }
    showFeedback(text,type) {
        if (type === 'success') {
            let feedback = document.querySelector('.drink-form_feedback');
            feedback.classList.add('success');
            feedback.innerText = text;
            this.removeAlert('success');
        } else if (type === 'error') {
            let feedback = document.querySelector('.drink-form_feedback');
            feedback.classList.add('error');
            feedback.innerText = text;
            this.removeAlert('error');
        }
    }
    removeAlert(type) {
        setTimeout(function () {
            document.querySelector('.drink-form_feedback').classList.remove(type);
        },3000)
    }
    //add customer
    addCustomer(customer) {
        const images = [1, 2, 3, 4, 5];
        let random = Math.floor(Math.random()*images.length);
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML=`
        <img src="images/person-${random}.jpeg"
            alt="person" class="person_thumbnail">
        <h4 class="person_name">${customer.name}</h4>
        <h4 class="person_lname">${customer.lastname}</h4>`
        document.querySelector('.drink-card_list').appendChild(div);

   
    }
    //clear field
    clearFields() {
        document.querySelector('.input-name').value='';
        document.querySelector('.input-lastname').value='';
        document.querySelector('.input-email').value='';
    }
    showModel(event) {
        event.preventDefault();
        if (event.target.parentElement.classList.contains('work-item_icon')) {
            let id = event.target.parentElement.dataset.id;
            console.log(id)
            const model = document.querySelector('.work-model');
            const modelItem = document.querySelector('.work-model_item');
            model.classList.add('work-model--show');
            modelItem.style.backgroundImage = `url(work/work-${id}.jpeg)`;
       }
    }
    closeModel() {
        document.querySelector('.work-model').classList.remove('work-model--show');
    }
}
function Customer(name, lastname, email) {
    this.name = name,
    this.lastname = lastname,
    this.email = email;
}
eventListeners();
function eventListeners(){
    const ui = new UI();
    //pre-loader
    window.addEventListener('load', function () {
        ui.hidePreLoader();
    })

    //navBtn
    document.querySelector('.navBtn').addEventListener('click', function () {
        ui.showNav();
    })
    
    //control the video
    document.querySelector('.video_switch').addEventListener('click', function () {
        ui.videoControls();
    })
    //submi the form
    document.querySelector('.drink-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastname = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastname, email);
        if (value) {
            let customer = new Customer(name, lastname, email);
            ui.addCustomer(customer);
            ui.showFeedback('Customer successfully added', 'success'); 
            ui.clearFields();
        } else {
            ui.showFeedback('Some of the form values are empty', 'error');
        }
        

    })
    //display model
    const links = document.querySelectorAll('.work-item_icon');
    links.forEach(function (item) {
        item.addEventListener('click', function (event) {
            ui.showModel(event);
        })
    })
    //hide model
    document.querySelector('.work-model_close').addEventListener('click', () => {
        ui.closeModel();
    })
}















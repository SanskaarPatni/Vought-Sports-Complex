class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait);
        this.type();
        this.isDeleting = false;
    }
    type() {
        //current index of word
        const current = this.wordIndex % this.words.length;
        //Get full text of current word
        const fullTxt = this.words[current];

        //Check if deleting
        if (this.isDeleting) {
            //remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            //add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        //Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        //Initial Type Speed
        let typeSpeed = 300;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        //If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            //3 second pause at end
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            //Move to the next word
            this.wordIndex++;
            //Pause before start typing
            typeSpeed = 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}
//Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWrite
    new TypeWriter(txtElement, words, wait);
}

// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal(e) {
    e.preventDefault();
    var form = document.getElementById('BookPackageForm');
    var fname = form.elements[0].value;
    var lname = form.elements[1].value;
    var email = form.elements[2].value;
    var mobile = form.elements[3].value;
    var noOfMembers = form.elements[4].value;
    var duration = form.elements[5].value;
    var muaid = form.elements[6].value;
    var package = form.elements[7].value;
    document.querySelector('.modal-body').innerHTML = '';
    var cost = 0;
    var costAfterDiscount = 0;
    if (package === 'Basic') {
        cost = 25;
    } else if (package === 'Standard') {
        cost = 50;
    } else {
        cost = 70;
    }
    costAfterDiscount = noOfMembers > 1 ? noOfMembers * (cost - 2) : cost;
    if (!fname || !lname || !email || !mobile || !noOfMembers || !duration || !muaid || !package) alert('Fill all values!')
    else {
        document.querySelector('.modal-body').innerHTML += '<p>Vought Sports Complex ' + package + ' Membership<p>';
        document.querySelector('.modal-body').innerHTML += '<p>Hey ' + fname + ' ' + lname;
        document.querySelector('.modal-body').innerHTML += '<p>A PDF of this receipt has been sent to your registered mobile number ' + mobile + ' and has been also mailed to ' + email + '.<p>';
        document.querySelector('.modal-body').innerHTML += '<p>Cost of ' + package + ' membership per person $' + cost + ' K per month.<p>';
        document.querySelector('.modal-body').innerHTML += '<p>Number of members enrolled: ' + noOfMembers + '</p>';
        if (noOfMembers > 1) document.querySelector('.modal-body').innerHTML += '<p>Discount applicable: Number of members * 2 = $' + noOfMembers * 2 + ' K per month.</p>';
        document.querySelector('.modal-body').innerHTML += '<p>Amount for ' + noOfMembers + ' member/s after applying discount: $' + costAfterDiscount + ' K per month.</p>';
        document.querySelector('.modal-body').innerHTML += '<p>Total Amount for ' + duration + ' month/s after applying discount: $' + costAfterDiscount * duration + ' K</p>';
        modal.style.display = 'block';
        for (i = 0; i < form.elements.length; i++) {
            form.elements[i].value = null;
        }
        form.elements[7].value = 'Basic';
        form.elements[8].value = 'Submit';
    }
}

// Close
function closeModal() {
    modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}
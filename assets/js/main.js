function redirectPortfolio(link) {
    if (link) {
        window.open(link, '__blank');
    }
}

let swiper = new Swiper('.swiper', {
    speed: 700,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 48,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    autoHeight: true
});

const sections = document.querySelectorAll("section[id]")

function scrollActive() {
    sections.forEach(section => {
        const sectionHeight = section.clientHeight;
        const sectionOffsetTop = section.offsetTop - 5;
        const id = section.getAttribute('id');
        if (window.scrollY > sectionOffsetTop && window.scrollY <= sectionHeight + sectionOffsetTop) {
            document.querySelector(`.nav__menu a[href*=${id}]`).classList.add('active-link')
        } else {
            document.querySelector(`.nav__menu a[href*=${id}]`).classList.remove('active-link')
        }
    })
}

function scrollHeader() {
    if (window.scrollY >= 80) {
        $(".nav").addClass('shadow')
    } else {
        $(".nav").removeClass('shadow')
    }
}

function scrollTop() {
    if (window.scrollY >= 350) {
        $(".scrollup").addClass('show-scrollup');
    } else {
        $(".scrollup").removeClass('show-scrollup');
    }
}

function submitForm() {
    let error = '';
    const inputNameVal = document.querySelector('input[id="name"]').value,
        inputEmailVal = document.querySelector('input[id="email"]').value,
        inputMessageVal = document.querySelector('textarea[id="message"]').value;

    if (!inputNameVal.match(/^[A-Za-z ]{2,}$/)) {
        error = "Name must be alphabet and contais minimal two chars";
    } else if (!inputEmailVal.match(/^.+@[a-zA-Z.]{2,}\.[a-zA-Z]{2,3}$/)) {
        error = "Please insert valid email format";
    } else if (inputMessageVal.trim().length < 3) {
        error = "Message must have minimal three characters";
    }

    if (error) {
        alert(error);
        return false;
    }

    return true;
}

let form = document.getElementById("contact__form");
async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Thanks for your submission!");
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form");
                }
            })
        }
    }).catch(error => {
        alert("Oops! There was a problem submitting your form");
    });
}

$(document).ready(function () {
    $('#nav__toggle').click(() => {
        $('#nav__toggle').toggleClass("rotate");
        $('#nav__menu').slideToggle();
    });

    $('.nav__link').click(() => {
        if(window.innerWidth < 768){
            $('#nav__toggle').toggleClass("rotate");
            $('#nav__menu').slideToggle();
        }
    })

    $('.home__other-button').click(() => {
        window.location.href = "#aboutme";
    })

    $('.aboutme__button').click(() => {
        window.open("assets/pdf/CV_VinkyGuivano.pdf", '__blank');
    })

    $('.scrollup').click(() => {
        window.location.href = "#";
    })

    window.addEventListener('scroll', scrollActive);
    window.addEventListener('scroll', scrollHeader);
    window.addEventListener('scroll', scrollTop);
    form.addEventListener("submit", handleSubmit)
})





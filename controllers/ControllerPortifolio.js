class ControllerPortifolio {

    constructor(formID, btnMenuID, menu) {
        this.formEl = document.getElementById(formID);
        this.btnMenuEl = document.getElementById(btnMenuID)
        this.menuEl = document.querySelector(menu).classList;

        this.onSubmit();
        this.carregarMenu();
        this.onButtonCarroussel();
    }

    onButtonCarroussel() {
        const control = document.querySelectorAll('.control');
        let currentItem = 0;
        const items = document.querySelectorAll('.item-img')
        const maxItems = items.length;


        control.forEach(control => {
            control.addEventListener('click', () => {
                const isleft = control.classList.contains("arrow-left");

                if (isleft) {
                    currentItem -= 1
                } else {
                    currentItem += 1
                }

                if (currentItem >= maxItems) {
                    currentItem = 0
                }

                if (currentItem < 0) {
                    currentItem = maxItems - 1
                }

                items.forEach(item => {
                    item.classList.remove('current-item');

                    items[currentItem].scrollIntoView({
                        inline: "center",
                        behavior: "smooth",
                    });

                    items[currentItem].classList.add("current-item");
                })

            })
        })
    }

    carregarMenu() {

        this.btnMenuEl.addEventListener('click', () => {
            const result = this.menuEl.toggle("active");
        })

        const itemMenu = document.querySelectorAll('.item-menu');

        itemMenu.forEach(item=>{
            item.addEventListener("click",()=>{
                let mn = document.querySelector('.list-menu').classList
                mn.toggle("active");
            })
})

    }


    onSubmit() {
        this.formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            let mail = this.getValues();

            this.enviarNewsletter(mail);
            this.formEl.reset();
        });

    }

    getValues() {
        let email = {};

        [...this.formEl.elements].forEach((field, index) => {

            if (field.type != 'submit') {
                email[field.name] = field.value;

            }

        })


        return new Newsletter(
            email.nome,
            email.email,
            email.assunto,
            email.telefone,
            email.conteudo
        )

    }

    enviarNewsletter(email) {
        let url = "https://savio-newsletter.herokuapp.com/";
        $.post(url, { n: email });

    }
}

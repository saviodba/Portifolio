class ControllerPortifolio {

    constructor(formID, btnMenuID, menu) {
        this.formEl = document.getElementById(formID);
        this.btnMenuEl = document.getElementById(btnMenuID)
        this.menuEl = document.querySelector(menu).classList;

        this.onSubmit();
        this.carregarMenu()
    }

    carregarMenu() {

        this.btnMenuEl.addEventListener('click', () => {
            const result = this.menuEl.toggle("active");
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

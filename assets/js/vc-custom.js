(($) => {

    let doc = document,
        submitMessage = doc.querySelector('#form-submit'),
        inputName =  doc.querySelector('#name'),
        inputPhone =  doc.querySelector('#phone'),
        inputEmail =  doc.querySelector('#email'),
        inputSubject =  doc.querySelector('#subject'),
        inputMessage =  doc.querySelector('#message'),
        msgError = $('.msg-error'),
        msgSuccess = $('.msg-success'),
        formData = new FormData();

    let formValidation = () => {

        let addError = (input) => {
            $(input).closest('fieldset').find('.error').removeClass('no-display');
        }, removeError = (input) => {
            $(input).closest('fieldset').find('.error').addClass('no-display');
        }

        [...doc.querySelectorAll('#name, #subject, #message, #phone')].map((input) => {
            if(input.value.length > 0) { removeError(input); }
            else addError(input);
        });
        
        if(!inputEmail.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            addError(inputEmail);
        }else removeError(inputEmail);

        if(doc.querySelectorAll('span.error.no-display').length < 4) return false;

        return true;
    }

    let showMessage = (messageEl) => {
        messageEl.removeClass('no-display');
        setTimeout(() => {
            messageEl.addClass('no-display');
        }, 2000)
    }

    submitMessage.addEventListener('click', (ev) => {

        ev.preventDefault();

        if(!formValidation()) return;

        submitMessage.disabled = true;

        formData.append('Nome', inputName.value);
        formData.append('Celular', inputPhone.value);
        formData.append('Email', inputEmail.value);
        formData.append('Assunto', inputSubject.value);
        formData.append('Mensagem', inputMessage.value);
        formData.append('_subject', 'Nova mensagem de cliente no site');
        formData.append('_captcha', 'false');
    
        const options = {
            method: 'POST',
            body: formData
        };

        fetch('https://formsubmit.co/ajax/rossinicriativa@gmail.com', options)
        .then(data => data.json())
        .then(response => {
            if(!response.success) throw false;
            if(response.success) {
                showMessage(msgSuccess);
            }
        })
        .catch(() => {
            showMessage(msgError);
        });
        
    })

})(window.jQuery);

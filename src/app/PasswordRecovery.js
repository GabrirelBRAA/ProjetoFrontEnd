'use client'
import { useState } from "react";
import { invalidEmail } from "./Utils";

export default function PasswordRecovery({ open, closeDialog, openDialogReset}) {

    const [emailSent, setSent] = useState(false);

    const [inputFields, setInputFields] = useState({
        email: "",
    });

    const [errors, setErrors] = useState({});

    const validateValues = (inputValues) => {
        let errors = {};
        if (invalidEmail(inputValues.email)) {
            console.log("Error");
            errors.email = "E-mail inválido. Insira um endereço de e-mail no formato correto.";
        }
        console.log(errors)
        return errors;
    };

    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = validateValues(inputFields);
        setErrors(errors);
        if (!errors.hasOwnProperty('email')) {
            setSent(true);
            //sendEmail(inputFields.email)
            openDialogReset();
        }
    };

    const sendEmail = (email) => {
        fetch('api/emails', {
            method: 'POST',
            body: JSON.stringify({email: email})
        }).then(response => response.json())
    }

    /*
    function sendEmail(email) {
        console.log(email)
        Email.send({
            Host: "sandbox.smtp.mailtrap.io:2525",
            Username: "b7f6042adcfffe",
            Password: "0e937f8030f15b",
            To: email,
            From: "meuteste@example.com",
            Subject: "Test Email",
            Body: "This is a test email sent using SMTP.js"
        })
        .then(function (message) {
            alert("Mail sent successfully") // Alert message on successful email delivery
        });
    }
        */

    return <dialog open={open} onClose={closeDialog} class="overflow-y-auto overflow-x-hidden px-4 fixed top-0 right-0 left-0 z-50 justify-center items-center rounded-lg md:inset-0 w-96 h-80 bg-gray-300">
        <div class="flex items-center justify-between p-4 md:p-5 rounded-t ">
            <h3 class="text-xl font-semibold text-black ">
                Recuperar Senha
            </h3>
            <button onClick={closeDialog} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Fechar Modal</span>
            </button>
        </div>
        {emailSent ? (<p className="px-4 mt-24">Email enviado com sucesso!</p>) : (
            <form onSubmit={handleSubmit}>
                <p class="mb-2">Para recuperar a sua senha, digite o email cadastrado</p>
                <label> Email
                    <input
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-solid border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400"
                        type="text"
                        name="email"
                        value={inputFields.email}
                        onChange={handleChange}
                        placeholder="Ex: exemplo@email.com" />
                </label>
                {errors.email ? (
                    <p class="text-red-500">
                        {errors.email}
                    </p>
                ) : <div class="mb-8"></div>}
                <button type="submit" class="px-2.5 pb-2 pt-2 mt-4 bg-green-500 rounded-3xl w-full text-white">Enviar</button>
            </form>
        )}
    </dialog>;
}
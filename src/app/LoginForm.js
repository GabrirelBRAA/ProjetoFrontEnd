'use client'
import { useState } from "react";
import PasswordRecovery from "./PasswordRecovery";
import PasswordReset from "./PasswordReset";
import { invalidEmail, invalidPassword } from "./Utils";

export default function LoginForm() {

    const [open, setOpen] = useState();

    const closeDialog = () => {
        setOpen("");
    }

    const openDialog = () => {
        setOpen("true");
    }

    const [openReset, setOpenReset] = useState();

    const closeDialogReset = () => {
        setOpenReset("");
    }

    const openDialogReset = () => {
        setOpenReset("true");
    }

    const [inputFields, setInputFields] = useState({
        email: "",
        password: "",
        age: null,
        hello_world:""
    });

    const [errors, setErrors] = useState({});

    const [submitting, setSubmitting] = useState(false);

    const validateValues = (inputValues) => {
        let errors = {};
        if (invalidEmail(inputValues.email)) {
            errors.email = "E-mail inválido. Insira um endereço de e-mail no formato correto.";
        }
        if (invalidPassword(inputValues.password)) {
            errors.password = "Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras\
maiúsculas, minúsculas, números e caracteres especiais.";
        }
        return errors;
    };

    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true);
    };

    return (
        <div>
            <div class="bg-pink-200 p-6 place-content-center">
                {Object.keys(errors).length === 0 && submitting ? (
                    <span className="success">Successfully submitted ✓</span>
                ) : null}
                <form class="place-content-center" onSubmit={handleSubmit}>
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
                    ) : <div class="mb-6"></div>}
                    <label>Senha
                        <input class="block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-solid border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400"
                            type="password"
                            name="password"
                            value={inputFields.password}
                            onChange={handleChange}
                            placeholder="Senha" />
                    </label>
                    {errors.password ? (
                        <p class="text-red-500">
                            {errors.password}
                        </p>
                    ) : <div class="mb-6"></div>}
                    <a href="#" onClick={openDialog} class="text-blue-400 hover:text-blue-500">Esqueci minha senha</a>
                    <button type="submit" class="px-2.5 pb-2 pt-2 bg-green-500 rounded-3xl w-full border-2 border-gray-300 text-white">Entrar</button>
                </form>
            </div>
            <PasswordRecovery open={open} closeDialog={closeDialog} openDialogReset={openDialogReset}/>
            <PasswordReset open={openReset} closeDialog={closeDialogReset}/>
        </div>
    );
}
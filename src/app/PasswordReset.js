
'use client'
import { useState } from "react";
import { invalidPassword } from "./Utils";

export default function PasswordReset({ open, closeDialog }) {

    const [resetDone, setResetDone] = useState(false);

    const [inputFields, setInputFields] = useState({
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({});

    const validateValues = (inputValues) => {
        let errors = {};
        if (invalidPassword(inputValues.password)) {
            errors.password = "Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras\
            maiúsculas, minúsculas, números e caracteres especiais.";
        }
        if (inputValues.password != inputValues.confirm_password) {
            errors.confirm_password = "As senhas devem ser iguais.";
        }
        return errors;
    };

    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
        setResetDone(true);
    };

    return <dialog open={open} onClose={closeDialog} class="overflow-y-auto overflow-x-hidden px-4 fixed top-0 right-0 left-0 z-50 justify-center items-center rounded-lg md:inset-0 w-96 h-2/4 bg-gray-300">
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
        {resetDone? <p class="px-8 mt-40 text-green-500">Senha redefinida com sucesso!</p> : (
        <form onSubmit={handleSubmit}>
            <p class="mb-2">Redefina sua senha com no mínimo 8 caracteres</p>
            <label> Senha
                <input
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-solid border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400"
                    type="password"
                    name="password"
                    value={inputFields.password}
                    onChange={handleChange}
                    placeholder="Ex: Minhanovesenha123@" />
            </label>
            {errors.password ? (
                <p class="text-red-500">
                    {errors.password}
                </p>
            ) : <div class="mb-8"></div>}
            <label> Confirmar Senha
                <input
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-solid border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400"
                    type="password"
                    name="confirm_password"
                    value={inputFields.confirm_password}
                    onChange={handleChange}
                    placeholder="Ex: minha senha denovo" />
            </label>
            {errors.confirm_password ? (
                <p class="text-red-500">
                    {errors.confirm_password}
                </p>
            ) : <div class="mb-8"></div>}
            <button type="submit" class="px-2.5 pb-2 pt-2 mt-4 bg-green-500 rounded-3xl w-full text-white">Redefinir Senha</button>
            <ul class="list-disc px-4">
                <li>Use letras maiúsculas e minúsculas</li>
                <li>Não use informações pessoais</li>
                <li>Não use uma senha igual a anterior</li>
            </ul>
        </form> 
    )}
    </dialog>;
}

/*
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
            */
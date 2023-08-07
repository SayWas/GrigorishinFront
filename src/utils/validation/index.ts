import { bool, object, ref, string } from 'yup'

const config = {
  passwordMin: 8,
  passwordMax: 1024
}

const errorMessages= {
  required: "Поле не заполнено.",
  email: "E-mail заполнен некорретно.",
  passwordMin: `Пароль должен состоять минимум из ${config.passwordMin} символов.`,
  passwordMax: `Пароль превышает максимально допустимое количество символов.`,
  passwordMatches: "Пароль должен содержать как минимум одну букву латинского алфавита, цифру, и символ из !, #, $, %, &, ?",
  passwordConfirm: "Пароли не совпадают.",
  policyConfirmation: "Необходимо ваше согласие."
}

interface registerFormSchema {
  email: string,
  firstName: string,
  lastName: string,
  password1: string,
  password2: string,
  policyConfirmation: boolean
}
export type {registerFormSchema}

export const registerSchema = object({
  email: string().required(errorMessages.required).email(errorMessages.email),
  firstName: string().required(errorMessages.required),
  lastName: string().required(errorMessages.required),
  password1: string().required(errorMessages.required)
    .min(config.passwordMin, errorMessages.passwordMin)
    .max(config.passwordMax, errorMessages.passwordMax)
    .matches(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$/, errorMessages.passwordMatches),
  password2: string().required(errorMessages.required).oneOf([ref('password1')], errorMessages.passwordConfirm),
  policyConfirmation: bool().required(errorMessages.policyConfirmation).oneOf([true], errorMessages.policyConfirmation)
});

interface loginFormSchema {
  email: string,
  password: string
}
export type {loginFormSchema}

export const loginSchema = object({
  email: string().required(errorMessages.required).email(errorMessages.email),
  password: string().required(errorMessages.required)
    .min(config.passwordMin, errorMessages.passwordMin)
    .max(config.passwordMax, errorMessages.passwordMax)
});

interface forgotPasswordFormSchema {
  email: string
}
export type {forgotPasswordFormSchema}

export const forgotPasswordSchema = object({
  email: string().required(errorMessages.required).email(errorMessages.email)
});

interface resetPasswordFormSchema {
  password1: string,
  password2: string
}
export type {resetPasswordFormSchema}

export const resetPasswordSchema = object({
  password1: string().required(errorMessages.required)
    .min(config.passwordMin, errorMessages.passwordMin)
    .max(config.passwordMax, errorMessages.passwordMax)
    .matches(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$/, errorMessages.passwordMatches),
  password2: string().required(errorMessages.required).oneOf([ref('password1')], errorMessages.passwordConfirm)
})

interface commentFormSchema {
  commentText: string
}

export type {commentFormSchema}

export const commentSchema = object({
  commentText: string().required(errorMessages.required)
})

interface changePersonalDataFormSchema {
  firstName: string,
  lastName: string,
  email: string
}

export type {changePersonalDataFormSchema}

export const changePersonalDataSchema = object({
  firstName: string().required(errorMessages.required),
  lastName: string().required(errorMessages.required),
  email: string().required(errorMessages.required).email(errorMessages.email)
})

interface changePasswordFormSchema {
  oldPassword: string,
  password1: string,
  password2: string
}

export type {changePasswordFormSchema}

export const changePasswordSchema = object({
  oldPassword: string().required(errorMessages.required),
  password1: string().required(errorMessages.required)
    .min(config.passwordMin, errorMessages.passwordMin)
    .max(config.passwordMax, errorMessages.passwordMax)
    .matches(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$/, errorMessages.passwordMatches),
  password2: string().required(errorMessages.required).oneOf([ref('password1')], errorMessages.passwordConfirm)
})
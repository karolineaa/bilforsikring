import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import "./Form.css";

interface IFormInput {
  registreringsnummer: string;
  bonus: number;
  fødselsnummer: string;
  fornavn: string;
  etternavn: string;
  epost: string;
}

export const Form: React.FC = () => {
  const schema = yup.object().shape({
    registreringsnummer: yup
      .string()
      .required("Registreringsnummer må fylles ut")
      .matches(
        /^[A-Z]{2}\s+[1-9]{1}\d{4}$/,
        "Registreringsnummer er ugyldig. Bruk store bokstaver og mellomrom mellom bokstaver og tall"
      ),
    bonus: yup.number().required("Velg en bonus fra listen"),
    fødselsnummer: yup
      .string()
      .typeError("Fødselsnummer må fylles ut")
      .required("Fødselsnummer må fylles ut")
      .matches(
        /^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])\d{7}$/,
        "Fødselsnummer er ugyldig"
      ),
    fornavn: yup
      .string()
      .min(2, "Fornavn må være minst to bokstaver")
      .max(40, "Fornavn kan ikke være lengre enn 40 bokstaver")
      .required("Fornavn må fylles ut"),
    etternavn: yup
      .string()
      .min(2, "Etternavn må være minst to bokstaver")
      .max(40, "Etternavn kan ikke være lengre enn 40 bokstaver")
      .required("Etternavn må fylles ut"),
    epost: yup
      .string()
      .email("Skriv en gyldig e-postadresse")
      .required("E-post må fylles ut"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onBlur", resolver: yupResolver(schema) });

  const [pris, setPris] = useState(0);

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    console.log("Pris: ", pris);
    const grunnpris = 600;
    setPris(data.bonus * grunnpris);
  };

  const [visPopup, setVisPopup] = useState(false);

  const togglePopup = () => {
    setVisPopup(!visPopup);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Bilens registreringsnummer</label>
      <input
        placeholder="F. eks. AB 12345"
        className={`w-full md:w-1/3 text-sm h-8 px-2.5 focus:outline-none focus:ring-2 focus:border-transparent ${
          errors.registreringsnummer
            ? "focus:ring-red-700"
            : "focus:ring-neutral-300"
        }`}
        {...register("registreringsnummer")}
      />
      {errors.registreringsnummer && (
        <p>{errors.registreringsnummer.message}</p>
      )}

      <span className="inline-flex items-center">
        <label>Din bonus</label>{" "}
        <button
          type="button"
          className="p-2.5 relative flex items-center mt-3.5"
          onClick={togglePopup}
        >
          <svg
            className="w-6 h-6 text-gray-800 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="sr-only">Mer info om bonus</span>
          {visPopup && (
            <span className="absolute top-full left-1/2 transform -translate-x-1/3 bg-neutral-100 p-4 w-72 shadow-md rounded-sm z-100">
              Bonus er en 'belønning' du får i form av redusert forsikringspris
              hvis du ikke bruker forsikringen. Du får høyere bonus for hvert år
              du kjører skadefritt, inntil du har nådd toppbonus på 75 prosent.
            </span>
          )}
        </button>
      </span>

      <select
        className={
          "w-full md:w-1/3 text-sm h-8 px-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
        }
        defaultValue={1}
        {...register("bonus")}
      >
        <option value={0.8}>75 prosent 5 år</option>
        <option value={0.8}>75 prosent 4 år</option>
        <option value={0.8}>75 prosent 3 år</option>
        <option value={0.8}>75 prosent 2 år</option>
        <option value={0.8}>75 prosent 1 år</option>
        <option value={0.8}>75 prosent</option>
        <option value={0.9}>70 prosent 4 år</option>
        <option value={0.9}>70 prosent 3 år</option>
        <option value={0.9}>70 prosent 2 år</option>
        <option value={0.9}>70 prosent 1 år</option>
        <option value={0.9}>70 prosent</option>
        <option value={1}>60 prosent</option>
        <option value={1.1}>50 prosent</option>
        <option value={1.2}>40 prosent</option>
        <option value={1.3}>30 prosent</option>
        <option value={1.4}>20 prosent</option>
        <option value={1.5}>10 prosent</option>
        <option value={1.6}>0 prosent</option>
        <option value={1.7}>-10 prosent</option>
        <option value={1.8}>-20 prosent</option>
        <option value={1.9}>-30 prosent</option>
        <option value={2}>-40 prosent</option>
        <option value={2.1}>-50 prosent</option>
      </select>
      {errors.bonus && <p>{errors.bonus.message}</p>}

      <label>Fødselsnummer</label>
      <input
        placeholder="11 siffer"
        type="text"
        maxLength={11}
        className={`w-full md:w-1/3 text-sm h-8 px-2.5 focus:outline-none focus:ring-2 focus:border-transparent ${
          errors.fødselsnummer ? "focus:ring-red-700" : "focus:ring-neutral-300"
        }`}
        {...register("fødselsnummer")}
      />
      {errors.fødselsnummer && <p>{errors.fødselsnummer.message}</p>}

      <div className="flex flex-col md:flex-row">
        <div className="input-field mr-0 md:mr-4 w-full md:w-1/3">
          <label>Fornavn</label>
          <input
            className={`text-sm h-8 px-2.5 focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.fornavn ? "focus:ring-red-700" : "focus:ring-neutral-300"
            }`}
            {...register("fornavn")}
          />
          {errors.fornavn && <p>{errors.fornavn.message}</p>}
        </div>
        <div className="input-field ml-0 md:ml-4 w-full md:w-1/3">
          <label>Etternavn</label>
          <input
            className={`text-sm h-8 px-2.5 focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.etternavn ? "focus:ring-red-700" : "focus:ring-neutral-300"
            }`}
            {...register("etternavn")}
          />
          {errors.etternavn && <p>{errors.etternavn.message}</p>}
        </div>
      </div>
      <label>E-post</label>
      <input
        className={`w-full md:w-1/3 text-sm h-8 px-2.5 focus:outline-none focus:ring-2 focus:border-transparent ${
          errors.epost ? "focus:ring-red-700" : "focus:ring-neutral-300"
        }`}
        {...register("epost")}
      />
      {errors.epost && <p>{errors.epost.message}</p>}

      <div className="flex mb-6">
        <input
          type="submit"
          value="Beregn pris"
          className="mt-8 bg-black text-white font-bold rounded-full text-lg md:text-sm px-8 md:px-4 mr-3 md:mr-2 h-14 md:h-8 cursor-pointer"
        />
        <input
          type="button"
          value="Avbryt"
          className="mt-8 border-1 border-black text-black font-bold rounded-full text-lg md:text-sm px-8 md:px-4 ml-3 md:ml-2 h-14 md:h-8 cursor-pointer"
        />
      </div>
      {pris !== 0 && (
        <div className="text-md">
          Basert på din bonus er prisen på forsikringen beregnet til {pris} kr i
          måneden.
        </div>
      )}
      <DevTool control={control} />
    </form>
  );
};

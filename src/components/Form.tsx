import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import "./Form.css";
import Button from "./Button";
import Label from "./Label";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import InfoButton from "./InfoButton";

export interface IFormInput {
  registreringsnummer: string;
  bonus: number;
  fødselsnummer: string;
  fornavn: string;
  etternavn: string;
  epost: string;
}

export const Form: React.FC = () => {
  /* Yup validering av inputfelt */
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

  const form = useForm<IFormInput>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  /* For å tømme skjemaet og beregning av pris når man trykker på "Avbryt" */
  const [showText, setShowText] = useState(true);
  const handleCancel = () => {
    form.reset();
    if (pris) {
      setShowText(false);
    }
  };

  /* For å håndtere og regne ut pris basert på bonus når man trykker på "Beregn pris" */
  const [pris, setPris] = useState(0);

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    const grunnpris = 600;
    console.log("Pris: ", data.bonus * grunnpris);
    setPris(data.bonus * grunnpris);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <Label value="Bilens registreringsnummer" />
        <InputField
          name="registreringsnummer"
          maxLength={8}
          placeholder="F. eks. AB 12345"
        />

        <span className="inline-flex items-center relative">
          <Label value="Din bonus" />
          <InfoButton
            title="Mer info om bonus"
            text="Bonus er en 'belønning' du får i form av redusert forsikringspris
            hvis du ikke bruker forsikringen. Du får høyere bonus for hvert år
            du kjører skadefritt, inntil du har nådd toppbonus på 75 prosent."
          />
        </span>
        <Dropdown name="bonus" />

        <Label value="Fødselsnummer" />
        <InputField
          placeholder={"Fødselsnummer"}
          type={"number"}
          maxLength={11}
          name={"fødselsnummer"}
        />

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col mr-0 md:mr-4 w-full md:w-1/3">
            <Label value="Fornavn" />
            <InputField name={"fornavn"} maxLength={40} />
          </div>
          <div className="flex flex-col ml-0 md:ml-4 w-full md:w-1/3">
            <Label value="Etternavn" />
            <InputField name={"etternavn"} maxLength={40} />
          </div>
        </div>

        <Label value="E-post" />
        <InputField type={"email"} name={"epost"} maxLength={80} />

        <div className="flex mb-6">
          <Button value="Beregn pris" type="submit" />
          <Button value="Avbryt" onClick={handleCancel} />
        </div>

        {showText && pris !== 0 && (
          <p className="text-lg md:text-md hover:animate-pulse">
            Basert på din bonus er prisen på forsikringen beregnet til {pris}
            kr i måneden.
          </p>
        )}
        {/* DevTool for validering av input */}
        <DevTool control={form.control} />
      </form>
    </FormProvider>
  );
};

import React from "react";
import { Form } from "./components/Form";

function App() {
  return (
    <div className="m-6 md:m-12">
      <h1 className="text-6xl md:text-5xl leading-snug font-regular mb-4 md:mb-6">
        Kjøp bilforsikring
      </h1>

      <p className="text-lg md:text-md leading-normal mb-6 w-full md:w-1/2">
        Det er fire forskjellige forsikringer å velge mellom.
        Ansvarsforsikringer er lovpålagt om kjøretøyet er registrert og skal
        brukes på veien. I tillegg kan du utvide forsikringen avhengig av hvor
        gammel bilen din er og hvordan du bruker den.
      </p>

      <Form />
    </div>
  );
}

export default App;

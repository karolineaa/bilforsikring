import React from "react";
import { Form } from "./components/Form";

function App() {
  return (
    <div className="m-4 md:m-12">
      <h1 className="text-4xl font-regular mb-4">Kjøp bilforsikring</h1>
      <div className="text-md mb-8 w-full md:w-1/2">
        Det er fire forskjellige forsikringer å velge mellom.
        Ansvarsforsikringer er lovpålagt om kjøretøyet er registrert og skal
        brukes på veien. I tillegg kan du utvide forsikringen avhengig av hvor
        gammel bilen din er og hvordan du bruker den.
      </div>
      <Form />
    </div>
  );
}

export default App;

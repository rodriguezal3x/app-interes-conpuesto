import { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from 'yup';
import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Balance from "./components/Balance";

const CompoundInterest = (deposit, contribution, year, rate) => {
  let total = deposit
  for (let i = 0; i < year; i++) {
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function App() {
  const [balance, setBalance] = useState('');
  const handleSubmit = ({ deposit, contribution, year, rate }) => {
    const val = CompoundInterest(Number(deposit), Number(contribution), Number(year), Number(rate))
    setBalance(formatter.format(val))
  }

  return (
    <Container>
      <Section>
        <Formik
          initialValues = {{
            deposit:'',
            contribution:'',
            year:'',
            rate:'',
          }}
          onSubmit ={ handleSubmit }
          validationSchema={yup.object({
            deposit: yup.number().required('Obligatorio').typeError('Debe de Ser un Numero'),
            contribution: yup.number().required('Obligatorio').typeError('Debe de Ser un Numero'),
            year: yup.number().required('Obligatorio').typeError('Debe de Ser un Numero'),
            rate: yup
              .number()
              .required('Obligatorio')
              .typeError('Debe de Ser un Numero')
              .min(0, 'El valor minimo es 0')
              .max(1, 'el valor maximo es 1'),
          })}
        >
          <Form>
            <Input name='deposit' label='Deposito Inicial'/>
            <Input name='contribution' label='Contribucion Anual'/>
            <Input name='year' label='Años'/>
            <Input name='rate' label='Interés Estimado'/>
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance final: {balance} </Balance> : null}
      </Section>
    </Container>
  );
}

export default App;

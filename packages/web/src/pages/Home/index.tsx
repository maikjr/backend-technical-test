import React, { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

import { api } from '@backend-technical-test/axios-config'

import CurrencyInput from 'react-currency-input-field'
import {
  Container,
  FormCalculator,
  FormCalculatorRow,
  ChartContainer,
  PriceContainer
} from './styles'

import LineChart from '../../components/LineChart'

const App: React.FC = () => {
  const [investmentDate, setInvestmentDate] = useState()
  const [cdbRate, setCdbRate] = useState()
  const [currentDate, setCurrentDate] = useState()

  const [getLoading, setLoading] = useState(false)
  const [getCdbPrices, setCdbPrices] = useState([])

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault()
      setLoading(true)
      try {
        const fetchCdbUnitPrices = await api.post('/cdb-unit-prices', {
          investmentDate,
          cdbRate: cdbRate.replace(',', '.'),
          currentDate
        })
        const { cdbPrices } = fetchCdbUnitPrices.data

        setCdbPrices(cdbPrices)
      } catch (err) {}
      setLoading(false)
    }
  }

  return (
    <Container>
      <header>
        <img
          src="https://gorila.com.br/wp-content/uploads/LogoGorila.svg"
          alt="logo gorila invest"
          title="logo gorila invest"
          width="180"
        />
      </header>

      <FormCalculator onSubmit={handleSubmit}>
        <FormCalculatorRow>
          <p>Data Inicial</p>
          <input
            type="date"
            name="investmentDate"
            value={investmentDate}
            onChange={event => setInvestmentDate(event.target.value)}
            required
          />
        </FormCalculatorRow>
        <FormCalculatorRow>
          <p>Data Atual</p>
          <input
            type="date"
            name="currentDate"
            value={currentDate}
            onChange={event => setCurrentDate(event.target.value)}
            required
          />
        </FormCalculatorRow>
        <FormCalculatorRow>
          <p>Taxa do CDB</p>
          <CurrencyInput
            name="cdbRate"
            required
            fixedDecimalLength={2}
            value={cdbRate}
            onValueChange={(value, name) => setCdbRate(value)}
          />
        </FormCalculatorRow>
        <FormCalculatorRow>
          {getLoading ? (
            <p>carregando...</p>
          ) : (
            <button type="submit">CALCULAR</button>
          )}
        </FormCalculatorRow>
      </FormCalculator>

      {!getLoading && getCdbPrices.length && (
        <PriceContainer>
          <p>Valor Calculado:</p>
          <h4>
            {new Intl.NumberFormat('pt-BR', {
              maximumSignificantDigits: 6
            }).format(getCdbPrices.pop().unitPrice)}
          </h4>
        </PriceContainer>
      )}

      <ChartContainer>
        {getLoading ? (
          <div className="loading">
            <ClipLoader color={'#10c0c6'} loading={true} size={30} />
          </div>
        ) : (
          !!getCdbPrices.length && <LineChart CdbPrices={getCdbPrices} />
        )}
      </ChartContainer>
    </Container>
  )
}

export default App

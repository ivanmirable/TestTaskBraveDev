'use client'
import { useActiveContext } from '@/Context/context'
import { IOperator } from '@/models'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

interface OperatorProps {
  operator: IOperator
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: 0.5s;
`
const ContainerActive = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  transition: 0.5s;
`

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;
  background-color: white;
`
const Div = styled.div`
  height: 100%;
  width: 100%;
`
const Input = styled.input`
  margin-top: 15px;
  display: block;
  width: 90%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`
const InputSucess = styled.input`
  margin-top: 15px;
  display: block;
  width: 90%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid green;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`
const InputError = styled.input`
  margin-top: 15px;
  display: block;
  width: 90%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid red;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: all ease 0.3s;
  cursos: pointer;
  margin-top: 20px;
  &:hover {
    background: black;
    color: white;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const P = styled.p`
  font-size: 10px;
  margin-top: 2px;
`
const PSucces = styled.p`
  font-size: 10px;
  color: green;
  margin-top: 2px;
`
const PError = styled.p`
  font-size: 10px;
  color: red;
  margin-top: 2px;
`
const Succes = styled.div`
  margin-top: 6px;
  font-size: 10px;
  color: green;
  transition: all 5s ease;
  text-align: center;
`

const UnSucces = styled.div`
  color: red;
  margin-top: 6px;
  font-size: 10px;
  text-align: center;
`
const Img = styled.img`
  height: 30px;
  width: 30px;
`

export default function PayForm({ actives, setActives }: any) {
  const { setActive, operatore } = useActiveContext()
  const [invalid, setinValid] = useState(false)
  const [invalidSum, setInvalidSum] = useState(Boolean)
  const [succesTransaction, setSuccesTransaction] = useState(false)
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [response, setResponse] = useState('')
  const mock = new MockAdapter(axios)

  const handleButtonClick = async () => {
    try {
      const res = await axios.get('/api/data')
      setResponse(res.data)
    } catch (error) {
      setSuccesTransaction(false)
      setResponse('Что то пошло не так, перезагрузите страницу')
    }
  }
  function Timer() {
    setActive(false)
  }
  // Эмуляция успешного и неуспешного ответа при нажатии на кнопку
  const handleMockButtonClick = () => {
    const responseCode = Math.random() < 0.5 ? 200 : 500
    mock.onGet('/api/data').reply(responseCode, 'Оплата прошла успешно!')
    if (mock.onGet('/api/data').reply(responseCode, 'Оплата прошла успешно!')) {
      setSuccesTransaction(true)
    }
    handleButtonClick()
  }

  const handlePhoneChange = (e: any) => {
    const input = e.target.value.replace(/\D/g, '')
    const formattedPhone = formatPhone(input)
    setinValid(true)
    setPhone(formattedPhone)
  }
  // маска номера телефона
  const formatPhone = (phone: any) => {
    if (phone.length < 4) {
      return phone
    } else if (phone.length < 7) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3)}`
    } else if (phone.length < 10) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`
    } else {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(
        6,
        8,
      )}-${phone.slice(8, 10)}`
    }
  }

  const validatePhone = () => {
    return /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)
  }

  const handleInputChange = (event: any) => {
    const input = event.target.value
    setInvalidSum(true)

    // Оставляем только цифры
    const filteredInput = input.replace(/[^0-9]/g, '')

    // Устанавливаем максимальную сумму 1000 рублей
    if (filteredInput > 1000) {
      setAmount('1000')
    } else {
      setAmount(filteredInput)
    }
  }
  const sumValidate = () => {
    return /^.{1,1000}$/.test(amount)
  }
  function Validate() {
    if (!validatePhone()) {
      setinValid(true)
    }
    if (!sumValidate()) {
      setInvalidSum(true)
    }
    if (validatePhone()) {
      setinValid(false)
    }
    if (sumValidate()) {
      setInvalidSum(false)
    }
    let flag = !invalid && !invalidSum
    if (flag) {
      handleMockButtonClick()
    }
  }

  return (
    <Div>
      {actives ? (
        <ContainerActive onClick={() => setActives(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Img src={operatore.image} />
            <div>{operatore.title}</div>
            <Form
              onSubmit={(e) => {
                e.preventDefault()
              }}>
              {validatePhone() ? (
                <div>
                  <InputSucess
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  <PSucces>Номер телефона валидный</PSucces>
                </div>
              ) : (
                <div>
                  {!invalid ? (
                    <>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                      />
                      <P>Введите свой номер телефона</P>
                    </>
                  ) : (
                    <div>
                      <InputError
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                      />
                      <PError>Введите свой номер телефона</PError>
                    </div>
                  )}
                </div>
              )}
              {sumValidate() ? (
                <>
                  <InputSucess
                    type="tel"
                    value={amount}
                    onChange={handleInputChange}
                  />
                  <PSucces>Cумма валидна</PSucces>
                </>
              ) : (
                <div>
                  {!invalidSum ? (
                    <>
                      <Input
                        type="tel"
                        value={amount}
                        onChange={handleInputChange}
                      />
                      <P>Введите сумму от 1 до 1000 руб.</P>
                    </>
                  ) : (
                    <div>
                      <InputError
                        type="tel"
                        value={amount}
                        onChange={handleInputChange}
                      />
                      <PError>Введите сумму от 1 до 1000 руб.</PError>
                    </div>
                  )}
                </div>
              )}
              <>
                {validatePhone() && sumValidate() ? (
                  <Button onClick={() => Validate()}>Оплатить</Button>
                ) : (
                  <Button disabled={true}>Оплатить</Button>
                )}
              </>

              {!invalid && !invalidSum && response && (
                <>
                  {succesTransaction ? (
                    <>
                      <Succes>{JSON.stringify(response)}</Succes>
                    </>
                  ) : (
                    <>
                      <UnSucces>{JSON.stringify(response)}</UnSucces>
                    </>
                  )}
                </>
              )}
            </Form>
          </ModalContent>
        </ContainerActive>
      ) : (
        <Container>
          <ModalContent onClick={(e) => e.stopPropagation()}></ModalContent>
        </Container>
      )}
    </Div>
  )
}

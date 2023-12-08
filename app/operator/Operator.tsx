'use client'
import { useActiveContext } from '@/Context/context'
import { IOperator } from '@/models'
import Image from 'next/image'
import styled from 'styled-components'

interface OperatorProps {
  operator: IOperator
}

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  width: 90%;
  flex-direction: column;
  min-height: 150px;

  background: white;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 3px;
  border: 2px solid black;

  @media (max-width: 440px) {
    height: 100;
    width: 70%;
  }
`
const Title = styled.p`
  font-size: 15px;
  @media (max-width: 550px) {
    font-size: 10px;
    text-align: center;
  }
  @media (max-width: 440px) {
    font-size: 8px;
    text-align: center;
  }
`
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  display: inline-block;
  border: 2px solid black;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: all ease 0.3s;
  margin-top: 10px;
  &:hover {
    background: black;
    color: white;
  }
`
const Img = styled.img`
  @media (max-width: 440px) {
    height: 50px;
    width: 50px;
  }
`

export default function Operator({ operator }: OperatorProps) {
  const { active, setActive, operatore, setOperator } = useActiveContext()
  function addInContext() {
    setActive((prev) => !prev)
    setOperator(operator)
  }
  return (
    <div>
      <Container>
        <Img src={operator.image} className="w-1/6" alt="" />
        <Title>{operator.title}</Title>
        <Button onClick={() => addInContext()}>
          <Title>Оплатить</Title>
        </Button>
      </Container>
    </div>
  )
}

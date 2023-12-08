'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { IOperator } from '@/models'
import styled from 'styled-components'
import { operators } from '@/data/operator'
import Operator from './operator/Operator'
import { useMemo, useState } from 'react'
import PayForm from './payForm/PayForm'
import { useActiveContext } from '@/Context/context'

const OperProd = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width:100%;
  padding 0 20px;
  margin: 300px auto;
  flex-direction: row;
  justify-content: center;
  column-gap: 30px;
  row-gap:30px;
  flex-wrap: wrap;

`

export default function Home() {
  const [actives, setActives] = useState(false)
  const { active, setActive } = useActiveContext()
  useMemo(() => {
    setActives(active)
  }, [active])
  return (
    <div>
      <OperProd>
        {operators.map((operator) => (
          <Operator operator={operator} key={operator.id} />
        ))}
      </OperProd>

      <PayForm actives={actives} setActives={setActive} />
    </div>
  )
}

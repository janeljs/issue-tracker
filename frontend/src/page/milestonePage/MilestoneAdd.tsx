import styled from 'styled-components'
import Title from 'components/atom/Title'

export default function MilestoneAdd(){

  return (
    <MilestoneAddBlock>
      <Title className='milestone__add'>새로운 마일스톤 추가</Title>
      <input type='text' className='milestone__name' placeholder='마일스톤 이름'/>
      <input type='text' className='milestone__due-date' placeholder='완료일(선택) ex.YYYY-MM-DD'/>
      <input type='text' className='milestone__due-date' placeholder='설명(선택)'/>
      
      
      
    </MilestoneAddBlock>
  )
}

const MilestoneAddBlock = styled.div`
margin: 24px 0;
padding: 32px;
border-radius: 16px;
border: 1px solid ${({ theme }) => theme.color.lineGrey};
input{
  border: none;
  background-color: ${({ theme }) => theme.color.inputBg};
  font-size: ${({ theme }) => theme.size.md}px;
  border: 11px;
  height: 56px;
  &:focus {
    text-decoration: none;
    background-color: ${({ theme }) => theme.color.white};
  }
}`
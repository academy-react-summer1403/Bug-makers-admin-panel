// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Col } from 'reactstrap'
import avatar from '../../../../assets/images/avatars/1-small.png'
// ** Images
import medal from '@src/assets/images/illustration/badge.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../../../../@core/api/user/getUserById'
import { useEffect } from 'react'
import { setRolePage } from '../../../../redux/rolePage'

const CardMedal = () => {

  const userId = useSelector((state) => state.userId.userId)
  const { data } = useQuery({
    queryKey:['getUserByIdPage'],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  })

  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRolePage(data))
  }, [data])
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>خوش آمدید 🎉 {data?.fName}</h5>
        <CardText className='font-small-3'></CardText>

        <img className='congratulation-medal' src={medal} alt='Medal Pic' />
        <Col >
          <img src={data?.currentPictureAddress} onError={(e) => {e.target.src = avatar}} ></img>
        </Col>
      </CardBody>
    </Card>
  )
}

export default CardMedal

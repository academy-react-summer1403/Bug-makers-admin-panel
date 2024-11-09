// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown, User } from 'react-feather'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getComments } from '../../../../redux/comments'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Label Images
import xdLabel from '@src/assets/images/icons/brands/xd-label.png'
import vueLabel from '@src/assets/images/icons/brands/vue-label.png'
import htmlLabel from '@src/assets/images/icons/brands/html-label.png'
import reactLabel from '@src/assets/images/icons/brands/react-label.png'
import sketchLabel from '@src/assets/images/icons/brands/sketch-label.png'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import EditCommentModal from '../../../../components/common/modal/editComment'
import { getUser } from '../store'
import EditCommentForm from '../../../../components/common/modal/editComment'

// const CustomEditCommentDetail = ({  onEdit }) => {
//   return (

//   )
// }

const UserProjectsList = () => {
  const [commentState, setCommentState] = useState([]) // State to hold the comments
  const dispatch = useDispatch()
  const comment = useSelector(state => state.comment.selectUser)
  const user = useSelector(state => state.user.selectUser)

  useEffect(() => {
    const id = user.id;
    if (id) {
      dispatch(getComments(id))
    }
  }, [dispatch, user.id])

  useEffect(() => {
    if (comment?.comments) {
      setCommentState(comment.comments) // Set the comments when available
    }
  }, [comment])


  const columns = [
    {
      name: 'نام دوره',
      selector: row => row.courseTitle 
    },
    {
      name: 'متن کامنت',
      selector: row => row.commentTitle 
    },
    {
      name: 'وضعیت کامنت',
      selector: row => row.accept ? 'تاییده شده' : 'رد شده' 
    },
    {
      name: 'جزییات بیشتر',
      minWidth: '20px',
      cell: row => {
        return(
        <div >
          <EditCommentForm size={'14px'} onClick={() => dispatch(getComments(row.userId))} selectedComment={row} />
      </div>              
      )}
    }
  ]
  if(comment.totalCount > 0) {
  return (
    <Card>
      <CardHeader tag='h4'>کامنت‌های کاربر  </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={commentState} 
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )}
}

export default UserProjectsList

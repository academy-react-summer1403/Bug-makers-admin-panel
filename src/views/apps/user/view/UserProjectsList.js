// ** Reactstrap Imports
import { Badge, Button, Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown, Edit, Menu, User } from 'react-feather'
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
import UpdateComment from '../../../../components/common/modal/updateComment'
import { replayComment } from '../../../../@core/api/course/commentMng/replyComment'
import { acceptComment, deleteCommentApi, deleteCommentApiFull, updatingComment } from '../../../../@core/api/course/commentMng/acceptComment'
import { Skeleton, Tooltip } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ShowReplay from '../../../../components/common/modal/showReplay'
import { Dropdown } from 'react-bootstrap'
import {GetUserCommentId} from '../../../../@core/api/course/commentMng/user'
// const CustomEditCommentDetail = ({  onEdit }) => {
//   return (

//   )
// }

const UserProjectsList = () => {
  const [commentState, setCommentState] = useState([]) // State to hold the comments
  const dispatch = useDispatch()
  const comment = useSelector(state => state.comment.selectUser)
  const user = useSelector(state => state.user.selectUser)

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getComments(id))
  //   }
  // }, [dispatch, user.id])
    const id = user.id;

  const {data} = useQuery({
    queryKey:['getComment', id],
    queryFn: () => GetUserCommentId(id)
  })

  const queryClient = useQueryClient();
  // accept commet 
  const acceptCommentShowAll = useMutation({
    mutationKey: ['acceptingComment'],
    mutationFn: ({ commentId }) => {
      return acceptComment( commentId);

    },onSuccess: () => {
        queryClient.invalidateQueries('getComment')
      }
  });
  // reject comment 
  const deleteComment = useMutation({
    mutationKey: ['rejectComment'],
    mutationFn: ({ commentId }) => {
      return deleteCommentApi( commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getComment')
    }
  });
  // delete comment 
  const deleteCommentFull = useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: ({ commentId }) => {
      return deleteCommentApiFull(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getComment')
    }
  });
  const handleAccept = (row) => {
    acceptCommentShowAll.mutate({ commentId:row.commentId})
  }
  const handleDelete = (row) => {
    deleteComment.mutate({ commentId:row.commentId})
  }
  const handleDeleteFull = (row) => {
    deleteCommentFull.mutate({ commentId:row.commentId})
  }
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
      selector: row => row.accept,
      sortTable: true, 
      cell : row => (
        <Badge color={row.accept ? 'success' : 'warning'} >{row.accept ? 'تایید شده' : 'در انتظار تایید'}</Badge>
      ) 
    },
    {
      name: 'عملیات',
      cell: row => (
<div className='d-flex justify-content-center align-items-center gap-1'>
    <Dropdown>
  <Tooltip title='منو عملیات ' placement='top'>
      <Dropdown.Toggle 
        variant="transparent" 
        id="dropdown-basic" 
        style={{ padding: '5px', marginRight: '5px', border: 'none', background: 'transparent' }}          
      >
        <Menu size={'14px'} />
      </Dropdown.Toggle>
  </Tooltip>


      <Dropdown.Menu>
        {row.replyCount ? (
          <ShowReplay 
            deleteCommentApiFull={deleteCommentFull} 
            acceptCommentShowAll={acceptCommentShowAll} 
            deleteComment={deleteComment} 
            commentId={row.commentId}  
            courseId={row.courseId} 
          />
        ) : (
          <Tooltip title='ریپلای وجود ندارد' placement='top'>
            <Button color='transparent' >ریپلای ندارد</Button>
          </Tooltip>
        )}
        
        <Dropdown.Item onClick={() => handleAccept(row)}>تایید کامنت</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(row)}>رد کامنت</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDeleteFull(row)}>حذف کامنت</Dropdown.Item>

        <UpdateComment 
          CommentId={row.commentId}  
          CourseId={row.courseId} 
          Title={row.commentTitle} 
          Describe={row.describe} 
          topic='ویرایش'
          color='transparent'
          Api={updatingComment}
          KeyMutate={'updateComment'}
          icon={
            <Edit 
              size={'14px'} 
              className='m-2 cursor-pointer' 
              style={{ marginTop: '2px' }} 
            />
          } 
        />
        <UpdateComment 
            Api={replayComment} 
            CommentId={row.commentId} 
            CourseId={row.courseId}
            topic='پاسخ'  
            color='transparent'
            icon={
              <Button KeyMutate={'replayComment'} color='primary' >پاسخ</Button>
            }
          />
      </Dropdown.Menu>
    </Dropdown>
</div>)}
  ]
  return (
    <Card>
      <CardHeader tag='h4'>کامنت‌های کاربر  </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data?.comments} 
          className='react-dataTable'
          noDataComponent={
            <div >
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
        </div>
          }
          pagination
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default UserProjectsList

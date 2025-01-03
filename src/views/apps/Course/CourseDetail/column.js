import { Link, NavLink } from 'react-router-dom';
import Avatar from '@components/avatar';
import EditUserExample from '../../../../components/common/modal/edituser';
import AddRole from '../../../../components/common/modal/addRole';
import { store } from '@store/store';
import { getUser, deleteUser } from '../../user/store/index';
import { Slack, User, Settings, Database, Edit2, FileText, Trash2, MoreVertical, UserPlus, Menu, Edit } from 'react-feather';
import { Badge, Button } from 'reactstrap';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteCourseReserve } from '../../../../@core/api/course/courseReserve';
import { Dropdown } from 'react-bootstrap';
import { Tooltip } from '@mui/material';

// Custom Menu component
const CustomMenu = ({ user, onEdit, onDelete, rowId , id }) => {

  console.log(id);
  const mutation = useMutation({
    mutationKey:['deleteReserve'],
    mutationFn: (id) => deleteCourseReserve(id)
  })
  const [open, setOpen] = useState(false);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-custom-components">
        <Menu />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="div" className="d-flex align-items-center">
          <Tooltip title="جزییات کاربر" placement="top">
            <Link to={`/apps/user/view/${rowId}`} className="d-flex align-items-center">
              <FileText size={14} />
              <span className="ms-2">جزییات کاربر</span>
            </Link>
          </Tooltip>
        </Dropdown.Item>

        <Dropdown.Item as="div" className="d-flex align-items-center gap-2">
          <Edit size={14} />
          <Link to={'/EditUser'} size={14} user={user}  onClick={onEdit} >ویرایش کاربر</Link>
          
        </Dropdown.Item>

        <Dropdown.Item as="div" className="d-flex align-items-center" onClick={onDelete}>
          <Trash2 size={14} />
          <span className="ms-2">حذف کاربر</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
const CustomAddRole = ({ user, onEdit } ) => {
  const [open, setOpen] = useState(false);

  return (
          <div  onClick={onEdit}>
            <AddRole size={'14px'} user={user} /> 
          </div>
  );
};


const styles = `
.custom-menu-container {
  position: relative;
  display: inline-block;
}
.custom-menu {
  position: absolute;
  background-color: white; /* تغییر رنگ پس‌زمینه به سفید */
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 1000;
}
.custom-menu-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  width: 100%;
  border: none;
  background: transparent; 
  text-align: left;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.custom-menu-item:hover {
  background-color: #6f42c1; /* رنگ بنفش برای هاور */
  color: white; /* تغییر رنگ متن در هاور به سفید */
}
`;


const renderClient = row => {
  if (row.pictureAddress) {
    return <Avatar className="me-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.avatarColor || 'light-primary'}
        content={row.fullName || 'John Doe'}
      />
    );
  }
};

const renderRole = row => {
  const roleObj = {
    subscriber: { class: 'text-primary', icon: User },
    maintainer: { class: 'text-success', icon: Database },
    editor: { class: 'text-info', icon: Edit2 },
    author: { class: 'text-warning', icon: Settings },
    admin: { class: 'text-danger', icon: Slack },
  };

  const Icon = roleObj[row.userRoles] ? roleObj[row.userRoles].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon size={18} className={`${roleObj[row.userRoles] ? roleObj[row.userRoles].class : ''} me-50`} />
      {row.userRoles ? row.userRoles : 'کاربر هیچ دسترسی ندارد'}
    </span>
  );
};

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary',
};

export const columns = [
  {
    name: 'کاربران',
    sortable: true,
    width: '330px',
    sortField: 'fullName',
    selector: row => row.studentName,
    cell: row => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <NavLink
            to={`/apps/user/view/${row.studentId}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.studentId))}
          >
            <span className="fw-bolder">{row.studentName}</span>
          </NavLink>
        </div>
      </div>
    ),
  },
  {
    name: 'پرداختی',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.peymentDone ? 'پرداخت شده' : 'پرداخت نشده',
  },
  {
    name: 'نوتیفیکیشن',
    minWidth: '10px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.notification ? 'فعال' : 'غیرفعال',
  },
  {
    name: 'دسترسی',
    minWidth: '0px',
    sortable: true,
    sortField: 'status',
    selector: row => row.active,
    cell: row => (
      <CustomAddRole
        user={row} 
        onEdit={() => store.dispatch(getUser(row.studentId))}
      /> 
    )
  },
  {
    name: 'ویرایش',
    minWidth: '20px',
    cell: row => (
      <CustomMenu
      user={row} 
      onEdit={() => store.dispatch(getUser(row.studentId))}
      id={row.courseUserId}
      rowId={row.studentId}
      />
    ),
  },
  
];

// Add styles dynamically
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


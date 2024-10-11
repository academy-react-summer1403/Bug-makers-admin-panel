import { Link, NavLink } from 'react-router-dom';
import Avatar from '@components/avatar';
import EditUserExample from '../../../../components/common/modal/edituser';
import { store } from '@store/store';
import { getUser, deleteUser } from '../store';
import { Slack, User, Settings, Database, Edit2, FileText, Trash2, MoreVertical } from 'react-feather';
import { Badge, Button } from 'reactstrap';
import { useState } from 'react';

// Custom Menu component
const CustomMenu = ({ user, onEdit, onDelete, viewLink }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="custom-menu-container">
      <div
        className="btn btn-sm"
        onClick={() => setOpen(!open)}
      >
        <MoreVertical size={14} className="cursor-pointer" />
      </div>
      {open && (
        <div className="custom-menu" style={{ width: '140px' }}>
          <Link to={viewLink} className="custom-menu-item">
            <FileText size={14} className="me-50" />
            <span className="align-middle">Details</span>
          </Link>
          <button className="custom-menu-item" onClick={onEdit}>
            <EditUserExample user={user} /> {/* Pass user to EditUserExample */}
          </button>
          <button className="custom-menu-item" onClick={onDelete}>
            <Trash2 size={14} className="me-50" />
            <span className="align-middle">Delete</span>
          </button>
        </div>
      )}
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
      {row.userRoles}
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
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.userRoles.split(',')[0],
    cell: row => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <NavLink
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.fname + ' ' + row.lname}</span>
          </NavLink>
          <small className="text-truncate text-muted mb-0">{row.gmail}</small>
        </div>
      </div>
    ),
  },
  {
    name: 'نقش ',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.userRoles,
    cell: row => renderRole(row),
  },
  {
    name: 'تلفن همراه',
    minWidth: '10px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.phoneNumber,
    cell: row => <span className="text-capitalize">{row.phoneNumber}</span>,
  },
  {
    name: 'وضعیت',
    minWidth: '20px',
    sortable: true,
    sortField: 'status',
    selector: row => row.active,
    cell: row => (
      <Badge className="text-capitalize" color={statusObj[row.active]} pill>
        {row.active === 'True' ? 'فعال' : 'غیرفعال'}
      </Badge>
    ),
  },
  {
    name: 'ویرایش',
    minWidth: '20px',
    cell: row => (
      <CustomMenu
        user={row} // Pass the entire user object
        onEdit={() => store.dispatch(getUser(row.id))}
        onDelete={() => store.dispatch(deleteUser(row.id))}
        viewLink={`https://classapi.sepehracademy.ir/api/User/UserDetails/${row.id}`}
      />
    ),
  },
  
];

// Add styles dynamically
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

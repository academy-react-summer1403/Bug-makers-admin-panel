import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { addActive } from '../../../@core/api/course/activeCourse';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'; 
import { Tooltip } from '@mui/material';

const Active = ({ isActive, id, styled, api, method, text, text2 , keyword , payment}) => {
    const [isActived, setIsActived] = useState(isActive);
    
    const mutation = useMutation({
        mutationFn: ({ id, active }) => addActive({ id, active, method, api , keyword , payment}), 
        onSuccess: () => {
            setIsActived(prev => !prev); 
        },
        onError: (error) => {
            console.error('Error updating status:', error);
        }
    });
    const handleBadgeClick = () => {
        Swal.fire({
            title: "آیا مطمئن هستید؟",
            text: "آیا می‌خواهید این تغییر را انجام دهید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "کنسل",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate({ id, active: !isActived, method: 'put' });
            }
        });
    };
    

    const modalStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '30px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        width: '400px', 
        position: 'relative',
        height:'200px'
    };


    return (
        <>
        <Tooltip placement='top' title='برای تغییر وضعیت کلیک کنید'>
            <Badge 
                className={isActived ? 'bg-success' : 'bg-danger'} 
                style={styled} 
                onClick={handleBadgeClick} 
            >
                {isActived ? text2 : text}
            </Badge>
        </Tooltip>
        </>
    );
};

export default Active;

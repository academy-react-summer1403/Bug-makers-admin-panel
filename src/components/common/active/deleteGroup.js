import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { deleteGroup } from '../../../@core/api/course/deleteGroup';

const DeleteGroup = ({ isActive, Id, styled, api, text, text2 }) => {
    const [isActived, setIsActived] = useState(isActive);
    const mutation = useMutation({
        mutationFn: (formData) => deleteGroup(formData),
        onSuccess: () => {
            setIsActived(prev => !prev);
        },
        onError: (error) => {
            console.error('Error updating status:', error);
        }
    });

    const handleBadgeClick = () => {
        const formData = new FormData();
        formData.append('Id', Id);
        mutation.mutate(formData);
    };

    return (
        <>
            <Badge 
                className={isActived ? 'bg-success' : 'bg-danger'} 
                style={styled} 
                onClick={handleBadgeClick}
            >
                {isActived ? text2 : text}
            </Badge>
        </>
    );
};

export default DeleteGroup;

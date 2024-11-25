import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup } from '../../../@core/api/course/deleteGroup';
import { Button } from 'reactstrap';

const DeleteGroup = ({ isActive, Id, styled, api, text, text2  , id , teacherId}) => {

    const queryClient = useQueryClient();
    const [isActived, setIsActived] = useState(isActive);
    const mutation = useMutation({
        mutationFn: (formData) => deleteGroup(formData),
        onSuccess: () => {
            setIsActived(prev => !prev);
            queryClient.invalidateQueries(['getGroup',teacherId ,id]);
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
            <Button
                color='transparent' 
                style={styled} 
                onClick={handleBadgeClick}
            >
                {isActived ? text2 : text}
            </Button>
        </>
    );
};

export default DeleteGroup;

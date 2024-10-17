import React,{useState} from 'react'
import { Badge } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query';
import { addActive } from '../../../@core/api/course/activeCourse';

const Active = ({isActive , id , styled , api , method , text ,text2}) => {
    const [isActived, setIsActived] = useState(isActive);
    const mutation = useMutation({
        mutationFn: ({ id, active }) => addActive({ id, active, method ,api }), 
        onSuccess: () => {
            setIsActived(prev => !prev); 
        },
        onError: (error) => {
            console.error('Error updating status:', error);
        }
    });
    const handleBadgeClick = () => {
        mutation.mutate({ id, active: !isActived , method:'put' }); 
    };
  return (
    <>
        <Badge 
            className={isActived ? 'bg-success' : 'bg-danger'} 
            style={styled} 
            onClick={handleBadgeClick} 
         >
            {isActived === true ? text2 : text}
        </Badge>
    </>
)
}

export default Active
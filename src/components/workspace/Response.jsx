import React, { useEffect } from 'react'
import { getFormResponses } from '../../services/response';

export default function Response({form}) {
    useEffect(() => {
        getFormResponses(form._id).then((data) => {
            console.log(data);
        });
        console.log(form);
    }, []);

  return (
    <div>Response</div>
  )
}

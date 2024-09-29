import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { handleUpstoxCallback } from '../slices/upstoxAuthSlice';

function UpstoxCallback() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    console.log(code);

    if (code) {
      dispatch(handleUpstoxCallback(code));
    }
  }, [dispatch, location]);

  return <div>Handling Upstox Callback...</div>;
}

export default UpstoxCallback;
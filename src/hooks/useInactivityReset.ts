import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { updateStatus } from '../features/members/membersSlice';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export const useInactivityReset = () => {
  const dispatch = useDispatch();
  const { currentUserId } = useSelector((state: RootState) => state.role);
  const currentUser = useSelector((state: RootState) => 
    state.members.entities[currentUserId]
  );
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = () => {
    lastActivityRef.current = Date.now();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (currentUser && currentUser.status !== 'Offline') {
        dispatch(updateStatus({
          id: currentUserId,
          status: 'Offline'
        }));
      }
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetTimer();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page became hidden, start timeout immediately
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          if (currentUser && currentUser.status !== 'Offline') {
            dispatch(updateStatus({
              id: currentUserId,
              status: 'Offline'
            }));
          }
        }, INACTIVITY_TIMEOUT);
      } else {
        // Page became visible, reset timer
        resetTimer();
      }
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initialize timer
    resetTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentUserId, currentUser, dispatch]);
};
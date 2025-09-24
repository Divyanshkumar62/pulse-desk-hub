import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { updateStatus } from '../features/members/membersSlice';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export const useInactivityReset = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.role);
  const members = useSelector((state: RootState) => state.members.members);

  // Find current user by name match
  const currentUserMember = members.find(member =>
    member.name.toLowerCase().includes(currentUser.toLowerCase().split(' ')[0])
  ) || members[0]; // fallback to first member if not found

  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = () => {
    lastActivityRef.current = Date.now();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (currentUserMember && currentUserMember.status !== 'Offline') {
        dispatch(updateStatus({
          memberId: currentUserMember.id,
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
          if (currentUserMember && currentUserMember.status !== 'Offline') {
            dispatch(updateStatus({
              memberId: currentUserMember.id,
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
  }, [currentUser, currentUserMember, dispatch]);
};

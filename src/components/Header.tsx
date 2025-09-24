import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { toggleRole } from '../features/role/roleSlice';
import { toggleTaskModal } from '../features/ui/uiSlice';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Plus, Bell } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state: RootState) => state.role);

  return (
    <header className="bg-card border-b border-dashboard-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Badge variant={currentRole === 'teamLead' ? 'default' : 'secondary'}>
          {currentRole === 'teamLead' ? 'Team Lead' : 'Team Member'}
        </Badge>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Team Member</span>
          <Switch
            checked={currentRole === 'teamLead'}
            onCheckedChange={() => dispatch(toggleRole())}
          />
          <span className="text-sm text-muted-foreground">Team Lead</span>
        </div>

        {currentRole === 'teamLead' && (
          <Button
            onClick={() => dispatch(toggleTaskModal())}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Assign Task
          </Button>
        )}

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
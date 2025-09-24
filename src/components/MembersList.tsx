import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { selectAllMembers, updateStatus, MemberStatus } from '../features/members/membersSlice';
import { setSelectedMember, toggleTaskModal, setMemberFilter, setSortBy, setSortOrder } from '../features/ui/uiSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, MessageSquare, Filter, ArrowUpDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MembersListProps {
  variant?: 'default' | 'compact';
}

const MembersList = ({ variant = 'default' }: MembersListProps) => {
  const dispatch = useDispatch();
  const allMembers = useSelector(selectAllMembers);
  const { currentRole } = useSelector((state: RootState) => state.role);
  const { memberFilter, sortBy, sortOrder } = useSelector((state: RootState) => state.ui);
  
  // Filter and sort members
  const members = allMembers
    .filter(member => memberFilter === 'all' || member.status === memberFilter)
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortBy === 'lastActive') {
        comparison = b.lastActiveAt - a.lastActiveAt;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const statusColors = {
    Working: 'bg-status-working text-white',
    Break: 'bg-status-break text-white',
    Meeting: 'bg-status-meeting text-white',
    Offline: 'bg-status-offline text-white',
  };

  const handleAssignTask = (memberId: string) => {
    dispatch(setSelectedMember(memberId));
    dispatch(toggleTaskModal());
  };

  const handleStatusChange = (memberId: string, status: MemberStatus) => {
    dispatch(updateStatus({ id: memberId, status }));
  };

  if (variant === 'compact') {
    return (
      <Card className="bg-card border border-dashboard-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Team Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.slice(0, 6).map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(member.lastActiveAt)} ago
                    </p>
                  </div>
                </div>
                <Badge className={`text-xs ${statusColors[member.status]}`}>
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border border-dashboard-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
          {currentRole === 'teamLead' && (
            <div className="flex items-center gap-2">
              <Select value={memberFilter} onValueChange={(value) => dispatch(setMemberFilter(value as MemberStatus | 'all'))}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Working">Working</SelectItem>
                  <SelectItem value="Break">Break</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value) => dispatch(setSortBy(value as 'name' | 'status' | 'lastActive'))}>
                <SelectTrigger className="w-32">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="lastActive">Last Active</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member) => (
            <div key={member.id} className="p-4 border border-dashboard-border rounded-lg bg-gradient-to-r from-card to-card/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Active {formatDistanceToNow(member.lastActiveAt)} ago
                    </p>
                  </div>
                </div>
                <Badge className={statusColors[member.status]}>
                  {member.status}
                </Badge>
              </div>

              {currentRole === 'teamLead' ? (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAssignTask(member.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Assign Task
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {(['Working', 'Break', 'Meeting', 'Offline'] as MemberStatus[]).map((status) => (
                    <Button
                      key={status}
                      variant={member.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(member.id, status)}
                      className="text-xs"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MembersList;
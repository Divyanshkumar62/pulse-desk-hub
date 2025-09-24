import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { selectAllMembers, addTaskToMember } from '../features/members/membersSlice';
import { addTask } from '../features/tasks/tasksSlice';
import { toggleTaskModal, setSelectedMember } from '../features/ui/uiSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';

const TaskModal = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { showTaskModal, selectedMemberId } = useSelector((state: RootState) => state.ui);
  const members = useSelector(selectAllMembers);

  const [formData, setFormData] = useState({
    title: '',
    assignedTo: selectedMemberId || '',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.assignedTo || !formData.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create the task
    const taskAction = dispatch(addTask(formData));
    const taskId = taskAction.payload.id;

    // Add task to member
    dispatch(addTaskToMember({ memberId: formData.assignedTo, taskId }));

    toast({
      title: "Success",
      description: "Task assigned successfully!",
    });

    // Reset form and close modal
    setFormData({ title: '', assignedTo: '', dueDate: '' });
    dispatch(toggleTaskModal());
    dispatch(setSelectedMember(null));
  };

  const handleClose = () => {
    dispatch(toggleTaskModal());
    dispatch(setSelectedMember(null));
    setFormData({ title: '', assignedTo: '', dueDate: '' });
  };

  return (
    <Dialog open={showTaskModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title..."
              required
            />
          </div>

          <div>
            <Label htmlFor="assignedTo">Assign To *</Label>
            <Select 
              value={formData.assignedTo} 
              onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date *</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Assign Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
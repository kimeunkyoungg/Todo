import { useState, useMemo, useCallback } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import CalendarPanel from '@/components/dashboard/CalendarPanel'
import TodoPanel from '@/components/dashboard/TodoPanel'
import { mockWorkspaces, mockTasks } from '@/lib/mock-data'

export default function DashboardPage() {
    const [currentWorkspaceId, setCurrentWorkspaceId] = useState('team-project')
    const [selectedDate, setSelectedDate] = useState(null)
    const [tasks, setTasks] = useState(mockTasks)

    const currentWorkspace = mockWorkspaces.find((w) => w.id === currentWorkspaceId)

    const calendarTasks = useMemo(
        () => tasks.filter((t) => t.workspaceId === currentWorkspaceId),
        [tasks, currentWorkspaceId]
    )

    const filteredTasks = useMemo(() => {
        const byWorkspace = tasks.filter((t) => t.workspaceId === currentWorkspaceId)
        if (!selectedDate) return byWorkspace
        return byWorkspace.filter((t) => {
            const d = new Date(t.dueDate)
            return (
                d.getFullYear() === selectedDate.getFullYear() &&
                d.getMonth() === selectedDate.getMonth() &&
                d.getDate() === selectedDate.getDate()
            )
        })
    }, [tasks, currentWorkspaceId, selectedDate])

    const handleDateSelect = useCallback((date) => {
        setSelectedDate((prev) =>
            prev && prev.toDateString() === date.toDateString() ? null : date
        )
    }, [])

    const handleStatusChange = useCallback((taskId, status) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, status } : t))
        )
    }, [])

    return (
        <div className="flex h-full overflow-hidden">
            <Sidebar
                workspaces={mockWorkspaces}
                currentWorkspaceId={currentWorkspaceId}
                onWorkspaceChange={setCurrentWorkspaceId}
            />
            <CalendarPanel
                tasks={calendarTasks}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                workspace={currentWorkspace}
            />
            <TodoPanel
                tasks={filteredTasks}
                selectedDate={selectedDate}
                onStatusChange={handleStatusChange}
            />
        </div>
    )
}

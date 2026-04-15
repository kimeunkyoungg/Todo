import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

function buildCalendarDays(currentDate, tasks) {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const start = new Date(firstDay)
    start.setDate(start.getDate() - firstDay.getDay())

    const end = new Date(lastDay)
    end.setDate(end.getDate() + (6 - lastDay.getDay()))

    const todayStr = new Date().toDateString()
    const days = []
    const cur = new Date(start)

    while (cur <= end) {
        const d = new Date(cur)
        const dayTasks = tasks.filter((t) => {
            const td = new Date(t.dueDate)
            return (
                td.getFullYear() === d.getFullYear() &&
                td.getMonth() === d.getMonth() &&
                td.getDate() === d.getDate()
            )
        })
        days.push({
            date: d,
            isCurrentMonth: d.getMonth() === month,
            isToday: d.toDateString() === todayStr,
            tasks: dayTasks,
        })
        cur.setDate(cur.getDate() + 1)
    }

    return days
}

export default function CalendarPanel({ tasks, selectedDate, onDateSelect, workspace }) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const calendarDays = useMemo(
        () => buildCalendarDays(currentDate, tasks),
        [currentDate, tasks]
    )

    const navigate = (dir) => {
        setCurrentDate((prev) => {
            const d = new Date(prev)
            d.setMonth(d.getMonth() + (dir === 'next' ? 1 : -1))
            return d
        })
    }

    const isSelected = (date) =>
        selectedDate && date.toDateString() === selectedDate.toDateString()

    return (
        <section className="flex-1 flex flex-col min-w-0 p-4 lg:p-6 overflow-hidden">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-foreground">
                        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                    </h2>
                    {workspace && (
                        <span
                            className={cn(
                                'text-xs px-2 py-0.5 rounded-full font-medium',
                                workspace.isShared
                                    ? 'bg-info/20 text-info'
                                    : 'bg-primary/20 text-primary'
                            )}
                        >
                            {workspace.isShared ? '팀' : '개인'}
                        </span>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(new Date())}
                    >
                        오늘
                    </Button>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => navigate('prev')}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => navigate('next')}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 border-b border-border shrink-0">
                {DAYS_OF_WEEK.map((day, idx) => (
                    <div
                        key={day}
                        className={cn(
                            'py-2 text-center text-xs font-medium',
                            idx === 0 ? 'text-destructive' : idx === 6 ? 'text-info' : 'text-muted-foreground'
                        )}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="flex-1 grid grid-cols-7 auto-rows-fr min-h-0">
                {calendarDays.map((day, idx) => (
                    <button
                        key={idx}
                        onClick={() => onDateSelect(day.date)}
                        className={cn(
                            'relative flex flex-col p-1.5 border-b border-r border-border text-left transition-colors hover:bg-secondary/50 overflow-hidden',
                            !day.isCurrentMonth && 'bg-muted/20',
                            isSelected(day.date) && 'bg-primary/10 ring-1 ring-inset ring-primary',
                            day.isToday && !isSelected(day.date) && 'bg-accent/5'
                        )}
                    >
                        {/* 날짜 숫자 */}
                        <span
                            className={cn(
                                'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium shrink-0',
                                day.isToday && 'bg-primary text-primary-foreground',
                                !day.isToday && !day.isCurrentMonth && 'text-muted-foreground/40',
                                !day.isToday && day.isCurrentMonth && day.date.getDay() === 0 && 'text-destructive',
                                !day.isToday && day.isCurrentMonth && day.date.getDay() === 6 && 'text-info',
                                !day.isToday && day.isCurrentMonth && day.date.getDay() !== 0 && day.date.getDay() !== 6 && 'text-foreground'
                            )}
                        >
                            {day.date.getDate()}
                        </span>

                        {/* 태스크 칩 */}
                        <div className="flex-1 mt-0.5 space-y-0.5 overflow-hidden">
                            {day.tasks.slice(0, 3).map((task) => (
                                <div
                                    key={task.id}
                                    onClick={(e) => e.stopPropagation()}
                                    className={cn(
                                        'truncate rounded px-1 py-0.5 text-[10px] leading-tight font-medium',
                                        task.status === 'done' && 'bg-success/20 text-success line-through',
                                        task.status === 'in-progress' && 'bg-warning/20 text-warning',
                                        task.status === 'todo' && task.priority === 'high' && 'bg-destructive/20 text-destructive',
                                        task.status === 'todo' && task.priority !== 'high' && 'bg-muted text-muted-foreground'
                                    )}
                                >
                                    {task.title}
                                </div>
                            ))}
                            {day.tasks.length > 3 && (
                                <span className="text-[10px] text-muted-foreground px-1">
                                    +{day.tasks.length - 3}
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </section>
    )
}

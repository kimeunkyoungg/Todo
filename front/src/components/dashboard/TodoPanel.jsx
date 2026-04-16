import { Circle, CheckCircle2, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_CONFIG = {
    'in-progress': {
        label: '진행 중',
        Icon: Clock,
        colorClass: 'text-warning',
    },
    todo: {
        label: '할 일',
        Icon: Circle,
        colorClass: 'text-muted-foreground',
    },
    done: {
        label: '완료',
        Icon: CheckCircle2,
        colorClass: 'text-success',
    },
}

const STATUS_ORDER = ['in-progress', 'todo', 'done']

const PRIORITY_CONFIG = {
    high: { label: '높음', className: 'bg-destructive/10 text-destructive' },
    medium: { label: '중간', className: 'bg-warning/10 text-warning' },
    low: { label: '낮음', className: 'bg-muted text-muted-foreground' },
}

function formatHeader(date) {
    if (!date) return '모든 할 일'
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const target = new Date(date)
    target.setHours(0, 0, 0, 0)
    const diff = Math.round((target - today) / 86400000)
    const label = `${date.getMonth() + 1}월 ${date.getDate()}일`
    if (diff === 0) return `오늘 (${label})`
    if (diff === 1) return `내일 (${label})`
    if (diff === -1) return `어제 (${label})`
    return label
}

function TaskCard({ task, onStatusChange }) {
    const { Icon, colorClass } = STATUS_CONFIG[task.status]
    const priority = PRIORITY_CONFIG[task.priority]
    const isDone = task.status === 'done'

    const cycleStatus = () => {
        const next = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' }
        onStatusChange(task.id, next[task.status])
    }

    return (
        <div className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer">
            {/* 상태 아이콘 (클릭으로 상태 변경) */}
            <button
                onClick={cycleStatus}
                className={cn('mt-0.5 shrink-0 hover:opacity-70 transition-opacity', colorClass)}
            >
                <Icon className="h-4 w-4" />
            </button>

            {/* 내용 */}
            <div className="flex-1 min-w-0">
                <p
                    className={cn(
                        'text-sm font-medium leading-snug',
                        isDone ? 'line-through text-muted-foreground' : 'text-foreground'
                    )}
                >
                    {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                    {priority && (
                        <span className={cn('text-xs px-1.5 py-0.5 rounded font-medium', priority.className)}>
                            {priority.label}
                        </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                        {new Date(task.dueDate).getMonth() + 1}월{' '}
                        {new Date(task.dueDate).getDate()}일
                    </span>
                </div>
            </div>
        </div>
    )
}

function StatusSection({ statusKey, tasks, onStatusChange }) {
    const { label, Icon, colorClass } = STATUS_CONFIG[statusKey]
    if (tasks.length === 0) return null

    return (
        <div>
            {/* 섹션 헤더 */}
            <div className="flex items-center gap-2 px-4 py-2.5 sticky top-0 bg-card z-10 border-b border-border/50">
                <Icon className={cn('h-4 w-4', colorClass)} />
                <span className="text-sm font-medium text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground ml-0.5">({tasks.length})</span>
            </div>

            {/* 태스크 목록 */}
            <div className="divide-y divide-border/30">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
                ))}
            </div>
        </div>
    )
}

export default function TodoPanel({ tasks, selectedDate, onStatusChange }) {
    const grouped = STATUS_ORDER.reduce((acc, key) => {
        acc[key] = tasks.filter((t) => t.status === key)
        return acc
    }, {})

    const isEmpty = tasks.length === 0

    return (
        <aside className="w-80 shrink-0 flex flex-col h-full border-l border-border bg-card">
            {/* 패널 헤더 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <h3 className="text-sm font-semibold text-foreground">
                    {formatHeader(selectedDate)}
                </h3>
                {!isEmpty && (
                    <span className="text-xs text-muted-foreground">{tasks.length}개</span>
                )}
            </div>

            {/* 본문 */}
            <div className="flex-1 overflow-y-auto">
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
                        <div className="rounded-full bg-muted p-4 mb-3">
                            <Circle className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            {selectedDate ? '이 날짜에 할 일이 없습니다' : '할 일이 없습니다'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            새로운 할 일을 추가해보세요
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {STATUS_ORDER.map((key) => (
                            <StatusSection
                                key={key}
                                statusKey={key}
                                tasks={grouped[key]}
                                onStatusChange={onStatusChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </aside>
    )
}

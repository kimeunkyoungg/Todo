package com.back.domain.todo.entity;


import com.back.domain.user.entity.User;
import com.back.domain.workspace.entity.Workspace;
import com.back.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "todos")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime dueDate;

    @Column(nullable = false)
    private LocalDateTime startAt;

    @Column(nullable = false)
    private LocalDateTime endAt;

    private LocalDateTime deletedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TodoStatus status;

    // 등록자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    // 담당자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Builder
    public Todo(String title, String content, LocalDateTime dueDate, LocalDateTime startAt,
                LocalDateTime endAt, Priority priority, TodoStatus status, User creator,
                User assignee, Workspace workspace) {
        this.title = title;
        this.content = content;
        this.dueDate = dueDate;
        this.startAt = startAt;
        this.endAt = endAt;
        this.priority = priority;
        this.status = status;
        this.creator = creator;
        this.assignee = assignee;
        this.workspace = workspace;
    }









}

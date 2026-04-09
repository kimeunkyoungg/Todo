package com.back.domain.todo.entity;

import com.back.domain.workspace.entity.Workspace;
import com.back.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tags")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(length = 30)
    private String color;

    @Builder
    public Tag(Workspace workspace, String name, String color) {
        this.workspace = workspace;
        this.name = name;
        this.color = color;
    }


}

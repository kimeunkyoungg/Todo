package com.back.domain.todo.repository;

import com.back.domain.todo.entity.TodoTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoTagRepository extends JpaRepository<TodoTag, Long> {
}

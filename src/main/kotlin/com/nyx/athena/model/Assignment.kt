package com.nyx.athena.model

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import org.hibernate.validator.constraints.NotEmpty
import java.util.*
import javax.persistence.*

@Entity
@Table
class Assignment(@NotEmpty(message = "{assignments.course.notEmpty}")
                 @ManyToOne
                 var course: Course,
                 @NotEmpty(message = "{assignments.student.notEmpty}")
                 @ManyToOne
                 var student: Student,
                 @NotEmpty(message = "{assignments.due.notEmpty}")
                 var due: Date,
                 val result: Int) {
    @Id
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    @Type(type = "pg-uuid")
    @Suppress("unused")
    val id: UUID = UUID.randomUUID()
}

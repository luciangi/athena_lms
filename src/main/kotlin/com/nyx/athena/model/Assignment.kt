package com.nyx.athena.model

import org.hibernate.validator.constraints.NotEmpty
import java.util.*
import javax.persistence.*

@Entity
@Table
class Assignment(@NotEmpty(message = "{assignments.course.notEmpty}")
                 @ManyToOne
                 var course: Course,
                 @NotEmpty(message = "{assignments.student.notEmpty}")
                 @ManyToMany(cascade = [(CascadeType.ALL)])
                 @JoinTable
                 var solutions: Set<Solution>,
                 @NotEmpty(message = "{assignments.due.notEmpty}")
                 var due: Date) : CoreEntity()

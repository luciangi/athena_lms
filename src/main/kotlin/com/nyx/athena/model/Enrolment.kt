package com.nyx.athena.model

import org.hibernate.validator.constraints.NotEmpty
import java.util.*
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table
class Enrolment(@NotEmpty(message = "{enrolment.student.notEmpty}")
                @ManyToOne
                var student: Student,
                @NotEmpty(message = "{enrolment.course.notEmpty}")
                @ManyToOne
                var course: Course,
                @NotEmpty(message = "{enrolment.enrolmentDate.notEmpty}")
                var enrolmentDate: Date = Date(),
                val competionDate: Date?) : CoreEntity()

package com.nyx.athena.model

import java.util.*
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table
class Enrolment(@ManyToOne(cascade = [(CascadeType.ALL)])
                @NotNull
                var student: Student,
                @ManyToOne(cascade = [(CascadeType.ALL)])
                @NotNull
                var course: Course,
                @NotNull
                var enrolmentDate: Date = Date(),
                val completionDate: Date? = null)
    : CoreEntity()

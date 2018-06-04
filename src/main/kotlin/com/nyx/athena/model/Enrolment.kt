package com.nyx.athena.model

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.validator.constraints.NotEmpty
import java.util.*
import javax.persistence.*

@Entity
@Table
@TypeDef(name = "uuid-custom", typeClass = UUIDCustomType::class)
class Enrolment(@NotEmpty(message = "{enrolment.student.notEmpty}")
                @ManyToOne
                var student: Student,
                @NotEmpty(message = "{enrolment.course.notEmpty}")
                @ManyToOne
                var course: Course,
                @NotEmpty(message = "{enrolment.enrolmentDate.notEmpty}")
                var enrolmentDate: Date = Date(),
                val competionDate: Date?) {
    @Id
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    @Type(type = "uuid-custom")
    @Suppress("unused")
    val id: UUID = UUID.randomUUID()
}

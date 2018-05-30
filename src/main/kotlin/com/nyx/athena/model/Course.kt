package com.nyx.athena.model

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import org.hibernate.validator.constraints.NotEmpty
import java.util.*
import javax.persistence.*

@Entity
@Table
class Course(@NotEmpty(message = "{course.author.notEmpty}")
             @ManyToOne
             val author: Tutor,
             @NotEmpty(message = "{course.subject.notEmpty}")
             @ManyToOne
             var subject: Subject,
             @NotEmpty(message = "{course.name.notEmpty}")
             var name: String,
             var content: String?,
             var description: String?) {
    @Id
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    @Type(type = "pg-uuid")
    @Suppress("unused")
    val id: UUID = UUID.randomUUID()
}

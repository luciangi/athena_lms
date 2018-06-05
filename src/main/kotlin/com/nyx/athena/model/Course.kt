package com.nyx.athena.model

import org.hibernate.validator.constraints.NotEmpty
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table

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
             var description: String?) : CoreEntity()

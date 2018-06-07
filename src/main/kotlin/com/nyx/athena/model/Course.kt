package com.nyx.athena.model

import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table
class Course(@ManyToOne(cascade = [(CascadeType.ALL)])
             @NotNull
             val author: Tutor,
             @ManyToOne(cascade = [(CascadeType.ALL)])
             @NotNull
             var subject: Subject,
             @NotNull
             var name: String,
             var content: String?,
             var description: String?)
    : CoreEntity()

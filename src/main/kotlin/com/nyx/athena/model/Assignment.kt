package com.nyx.athena.model

import java.util.*
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table
import javax.validation.constraints.Future
import javax.validation.constraints.NotNull

@Entity
@Table
class Assignment(@ManyToOne(cascade = [(CascadeType.ALL)])
                 @NotNull
                 var course: Course,
                 @NotNull
                 var name: String,
                 var content: String?,
                 var description: String?,
                 @NotNull
                 @Future
                 var due: Date)
    : CoreEntity()

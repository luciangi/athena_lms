package com.nyx.athena.model

import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table
class Solution(@ManyToOne(cascade = [(CascadeType.ALL)])
               @NotNull
               val student: Student,
               @ManyToOne(cascade = [(CascadeType.ALL)])
               @NotNull
               var assignment: Assignment,
               val grade: Int?,
               val content: String?,
               val tutorComments: String?)
    : CoreEntity()

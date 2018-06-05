package com.nyx.athena.model

import javax.persistence.Entity
import javax.persistence.OneToOne
import javax.persistence.Table

@Entity
@Table
class Solution(
        @OneToOne
        val student: Student,
        val grade: Int?,
        val content: String?,
        val comments: String?) : CoreEntity()

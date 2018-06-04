package com.nyx.athena.model

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import java.util.*
import javax.persistence.*

@Entity
@Table
class Solution(
        @OneToOne
        val student: Student,
        val grade: Int?,
        val content: String?,
        val comments: String?) {
    @Id
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    @Type(type = "pg-uuid")
    @Suppress("unused")
    val id: UUID = UUID.randomUUID()
}

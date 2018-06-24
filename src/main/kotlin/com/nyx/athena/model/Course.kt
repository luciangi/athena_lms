package com.nyx.athena.model

import javax.persistence.*
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
             @Lob
             @Column
             var image: ByteArray? = null,
             @Column(columnDefinition = "text")
             var courseContent: String? = null,
             var description: String?)
    : CoreEntity()

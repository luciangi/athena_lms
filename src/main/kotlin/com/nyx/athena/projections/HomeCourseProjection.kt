package com.nyx.athena.projections

import com.nyx.athena.model.Course
import org.springframework.data.rest.core.config.Projection

@Projection(name = "homeCourseProjection", types = [Course::class])
interface HomeCourseProjection {
    fun getId(): Int
    //    fun getSubject(): Course
    fun getName(): String

    //    fun getContent(): String
    fun getDescription(): String
}

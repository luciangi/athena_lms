package com.nyx.athena.repository

import com.nyx.athena.model.Course
import com.nyx.athena.projections.HomeCourseProjection
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.stereotype.Repository
import java.util.*

@Repository
@RepositoryRestResource(excerptProjection = HomeCourseProjection::class)
interface CourseRepository : PagingAndSortingRepository<Course, UUID>

package com.nyx.athena.repository

import com.nyx.athena.domain.Course
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import java.util.*

@RepositoryRestResource(collectionResourceRel = "courses", path = "courses")
interface CourseRepository : CrudRepository<Course, UUID>
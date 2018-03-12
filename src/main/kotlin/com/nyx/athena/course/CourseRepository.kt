package com.nyx.athena.course

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import java.util.*

@RepositoryRestResource(collectionResourceRel = "courses", path = "courses")
interface CourseRepository : CrudRepository<Course, UUID>
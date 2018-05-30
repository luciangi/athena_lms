package com.nyx.athena.repository

import com.nyx.athena.model.Course
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface CourseRepository : PagingAndSortingRepository<Course, UUID>

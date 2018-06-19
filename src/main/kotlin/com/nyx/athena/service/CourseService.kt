package com.nyx.athena.service

import com.nyx.athena.model.Course
import com.nyx.athena.repository.CourseRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class CourseService {
    @Autowired
    private lateinit var courseRequestMapping: CourseRepository

    fun findAll(): Set<Course> = courseRequestMapping.findAll().iterator().asSequence().toSet()
}

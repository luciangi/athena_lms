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
    private lateinit var courseRepository: CourseRepository

    fun findAll(): Set<Course> = courseRepository.findAll().iterator().asSequence().toSet()

    fun save(course: Course) {
        courseRepository.save(course)
    }
}

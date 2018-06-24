package com.nyx.athena.service

import com.nyx.athena.model.Course
import com.nyx.athena.model.Enrolment
import com.nyx.athena.model.Student
import com.nyx.athena.repository.CourseRepository
import com.nyx.athena.repository.EnrolmentRepository
import com.nyx.athena.repository.StudentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
@Transactional
class CourseService {
    @Autowired
    private lateinit var courseRepository: CourseRepository

    @Autowired
    private lateinit var studentRepository: StudentRepository

    @Autowired
    private lateinit var enrolmentRepository: EnrolmentRepository

    fun findAll(): Set<Course> = courseRepository.findAll().iterator().asSequence().toSet()

    fun save(course: Course) {
        courseRepository.save(course)
    }

    fun getEnrolCourses(): Set<Course> {
        val student: Student = studentRepository.findByUsername((SecurityContextHolder.getContext().authentication.principal as User).username)
        val enrolments: Set<Enrolment> = enrolmentRepository.findByStudent(student)
        return courseRepository.findAll(enrolments.fold(ArrayList<UUID>(), { accumulator, item -> accumulator.add(item.course.id); accumulator }))
                .iterator().asSequence().toSet()
    }
}

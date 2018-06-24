package com.nyx.athena.service

import com.nyx.athena.model.Course
import com.nyx.athena.model.Enrolment
import com.nyx.athena.model.Student
import com.nyx.athena.repository.CourseRepository
import com.nyx.athena.repository.EnrolmentRepository
import com.nyx.athena.repository.StudentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
@Transactional
class EnrolmentService {
    @Autowired
    private lateinit var courseRepository: CourseRepository
    @Autowired
    private lateinit var studentRepository: StudentRepository
    @Autowired
    private lateinit var enrolmentRepository: EnrolmentRepository

    fun findAll(pageable: Pageable): Page<Enrolment> = enrolmentRepository.findAll(pageable)

    fun enrol(courseId: UUID) {
        val course: Course = courseRepository.findOne(courseId)
        val student: Student = studentRepository.findByUsername((SecurityContextHolder.getContext().authentication.principal as User).username)

        enrolmentRepository.save(Enrolment(student = student, course = course))
    }
}

package com.nyx.athena.repository

import com.nyx.athena.model.Enrolment
import com.nyx.athena.model.Student
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface EnrolmentRepository : PagingAndSortingRepository<Enrolment, UUID> {
    fun findByStudent(student: Student): Set<Enrolment>
}

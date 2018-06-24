package com.nyx.athena.repository

import com.nyx.athena.model.Student
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StudentRepository : PagingAndSortingRepository<Student, UUID> {
    fun findByUsername(username: String): Student
}

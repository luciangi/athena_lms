package com.nyx.athena.repository

import com.nyx.athena.model.Assignment
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface AssignmentRepository : PagingAndSortingRepository<Assignment, UUID>

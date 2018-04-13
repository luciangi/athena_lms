package com.nyx.athena.repository

import com.nyx.athena.model.Subject
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface SubjectRepository : PagingAndSortingRepository<Subject, UUID>

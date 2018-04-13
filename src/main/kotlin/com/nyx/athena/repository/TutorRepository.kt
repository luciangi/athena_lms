package com.nyx.athena.repository

import com.nyx.athena.model.Tutor
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TutorRepository : PagingAndSortingRepository<Tutor, UUID>

package com.nyx.athena.repository

import com.nyx.athena.model.Subject
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface SubjectRepository : CrudRepository<Subject, UUID>

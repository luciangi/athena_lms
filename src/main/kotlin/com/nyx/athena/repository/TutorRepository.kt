package com.nyx.athena.repository

import com.nyx.athena.model.Tutor
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TutorRepository : CrudRepository<Tutor, UUID>

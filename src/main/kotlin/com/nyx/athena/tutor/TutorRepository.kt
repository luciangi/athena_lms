package com.nyx.athena.tutor

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TutorRepository : CrudRepository<Tutor, UUID>

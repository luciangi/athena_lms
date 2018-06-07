package com.nyx.athena.repository

import com.nyx.athena.model.AthenaUser
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface AthenaUserRepository : CrudRepository<AthenaUser, UUID> {
    fun findByUsername(username: String): AthenaUser
}
